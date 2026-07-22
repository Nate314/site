import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DatabaseService } from "src/app/services";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionYear {
  year: string;
  total: number;
  weeks: (ContributionDay | null)[][];
}

@Component({
  standalone: false,
  selector: "app-github-projects",
  templateUrl: "./github-projects.component.html",
  styleUrls: ["./github-projects.component.css"]
})
export class GithubProjectsComponent implements OnInit, AfterViewInit, OnDestroy {

  projects: any[];

  // Order and display labels for grouping the projects list below by category.
  private readonly projectCategoryOrder = ["personal", "school", "hackathon"];
  private readonly projectCategoryLabels: Record<string, string> = {
    personal: "Personal Projects",
    school: "School Projects",
    hackathon: "Hackathon Projects"
  };

  // WellSky contribution graph (NathanGawithMediware), one grid per year.
  contributionYears: ContributionYear[] = [];
  private readonly contributionLevelColors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

  // Whether two years' graphs actually fit side by side. Derived from the real
  // rendered width of the graphs' container vs. the graphs' own (computed)
  // width, rather than a viewport-width breakpoint like Helper.isScreenSmall().
  contribGraphsFitTwoPerRow = true;
  @ViewChild("contribYears") private contribYearsRef?: ElementRef<HTMLElement>;
  private contribResizeObserver?: ResizeObserver;
  private readonly contribCellSize = 10;
  private readonly contribCellGap = 3;
  private readonly contribRowGap = 24;

  // Set (from a "project" query param) when navigating in from a video's
  // "View the code" link, and cleared after the highlight-pulse animation
  // finishes so the CSS class can retrigger on a later visit.
  highlightedProjectTitle: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: DatabaseService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    Helper.initializePage(this, this.router.url, PageNames.GITHUB_PROJECTS);
    this.db.connection().subscribe(db => {
      const githubProjects = db.getGithubProjects();
      this.projects = githubProjects.subpages;
      this.applyLinkedProjectHighlight();
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
    this.loadWellSkyContributions();
  }

  // Switches to the linked project's category tab and schedules a scroll +
  // highlight-pulse once the tab's content has rendered. No-ops (page loads
  // exactly as it does with no query param) if there's no "project" param or
  // it doesn't match any known project title.
  private applyLinkedProjectHighlight() {
    const title = this.route.snapshot.queryParamMap.get("project");
    if (!title) return;
    const project = this.projects.find(p => p.title === title);
    if (!project) return;
    this.activeTab = project.category;
    setTimeout(() => {
      document.getElementById(this.projectElementId(project.title))
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      this.highlightedProjectTitle = project.title;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.highlightedProjectTitle = null;
        this.cdr.detectChanges();
      }, 2000);
    }, 0);
  }

  // Turns a project title into a DOM-safe id for scrollIntoView targeting.
  projectElementId(title: string): string {
    return "gh-project-" + title.replace(/[^a-zA-Z0-9]+/g, "-");
  }

  ngAfterViewInit() {
    if (typeof ResizeObserver === "undefined" || !this.contribYearsRef) return;
    this.contribResizeObserver = new ResizeObserver(entries => {
      this.updateContribLayout(entries[0].contentRect.width);
    });
    this.contribResizeObserver.observe(this.contribYearsRef.nativeElement);
  }

  ngOnDestroy() {
    this.contribResizeObserver?.disconnect();
  }

  isScreenSmall(): boolean {
    return Helper.isScreenSmall();
  }

  // MatExpansionPanel/MatAccordion's internal expand/collapse coordination
  // (animation + single-open bookkeeping) caused a runaway feedback loop under
  // this app's zoneless setup (the tab froze). Replaced with a fully manual
  // collapsible card: we own the single boolean, toggle it ourselves on
  // click, and force exactly one render - no Material expansion internals
  // involved, so there's no internal mechanism left to loop.
  toggleProject(project: any) {
    project.expanded = !project.expanded;
    if (project.expanded && project.description && !project.readmeContent && !project.readmeError) {
      this.loadReadme(project);
    }
    this.cdr.detectChanges();
  }

  // Fetches the README ourselves (rather than letting <markdown [src]> fetch
  // it directly) so relative image paths in it - e.g. GitHub READMEs commonly
  // use "./client/img/foo.jpg" - can be rewritten to absolute
  // raw.githubusercontent.com URLs before rendering. Left as-is, the browser
  // would resolve those relative paths against this site's own URL instead of
  // the repo's, and the images would 404.
  private loadReadme(project: any) {
    this.http.get(project.description, { responseType: "text" }).subscribe({
      next: text => {
        project.readmeContent = this.resolveRelativeImagePaths(text, project.description);
        this.cdr.detectChanges();
      },
      error: () => {
        project.readmeError = true;
        this.cdr.detectChanges();
      }
    });
  }

  private resolveRelativeImagePaths(markdown: string, readmeUrl: string): string {
    const baseUrl = readmeUrl.substring(0, readmeUrl.lastIndexOf("/") + 1);
    const isRelative = (path: string) => !/^(https?:)?\/\//i.test(path);
    markdown = markdown.replace(/(!\[[^\]]*\]\()([^)\s]+)/g,
      (match, prefix, path) => isRelative(path) ? `${prefix}${baseUrl}${path}` : match);
    markdown = markdown.replace(/(<img[^>]+src=["'])([^"']+)(["'])/g,
      (match, prefix, path, suffix) => isRelative(path) ? `${prefix}${baseUrl}${path}${suffix}` : match);
    return markdown;
  }

  // MatTabGroup/MatTabHeader has the exact same problem: its internal
  // pagination/scroll-alignment logic (_checkPaginationEnabled -> _scrollTo ->
  // _checkScrollingControls -> markForCheck -> realign -> ...) gets stuck in
  // an infinite notification loop under zoneless change detection (Angular
  // throws NG0103 once it detects this). Replaced with a plain, manually
  // rendered tab strip - no Material tabs component involved.
  activeTab = "wellsky";

  selectTab(key: string) {
    this.activeTab = key;
    this.cdr.detectChanges();
  }

  // The tab strip: WellSky first, then one tab per non-empty project category.
  get pageTabs(): { key: string; label: string }[] {
    return [{ key: "wellsky", label: "WellSky" }, ...this.projectGroups.map(g => ({ key: g.category, label: g.label }))];
  }

  // Groups the flat projects list into labeled sections (personal/school/
  // hackathon), in a fixed display order, omitting any empty category.
  // Within each category, featured/awarded projects sort first; order is
  // otherwise preserved (stable sort keyed on original index).
  get projectGroups(): { category: string; label: string; projects: any[] }[] {
    if (!this.projects) return [];
    return this.projectCategoryOrder
      .map(category => ({
        category,
        label: this.projectCategoryLabels[category] || category,
        projects: this.projects
          .filter(p => p.category === category)
          .map((p, i) => ({ p, i }))
          .sort((a, b) => Number(this.isFeatured(b.p)) - Number(this.isFeatured(a.p)) || a.i - b.i)
          .map(({ p }) => p)
      }))
      .filter(group => group.projects.length > 0);
  }

  // A project with an award is featured-worthy even without an explicit
  // "featured" flag.
  isFeatured(project: any): boolean {
    return !!(project.featured || project.award);
  }

  // Groups the years two-per-row so the template can lay them out side by side
  // and place a divider after each row.
  get contributionYearRows(): ContributionYear[][] {
    const rows: ContributionYear[][] = [];
    for (let i = 0; i < this.contributionYears.length; i += 2) {
      rows.push(this.contributionYears.slice(i, i + 2));
    }
    return rows;
  }

  contributionColor(level: number): string {
    return this.contributionLevelColors[level] || this.contributionLevelColors[0];
  }

  private loadWellSkyContributions() {
    this.http.get<{ total: Record<string, number>; contributions: ContributionDay[] }>(
      "https://github-contributions-api.jogruber.de/v4/NathanGawithMediware?y=all"
    ).subscribe(resp => {
      this.contributionYears = Object.keys(resp.total)
        .filter(year => Number(year) >= 2019 && Number(year) <= 2026)
        .sort()
        .map(year => {
          const days = resp.contributions.filter(d => d.date.startsWith(year));
          return {
            year,
            total: resp.total[year],
            weeks: this.buildWeeks(days)
          };
        });
      this.cdr.detectChanges();
      // Recheck now that the real week counts (and therefore the graphs' real
      // width) are known, in case the container was measured before this.
      if (this.contribYearsRef) {
        this.updateContribLayout(this.contribYearsRef.nativeElement.clientWidth);
      }
    });
  }

  // Compares the container's real rendered width against the graphs' own
  // (computed) width to decide whether two fit side by side.
  private updateContribLayout(containerWidth: number) {
    const weekCounts = this.contributionYears.map(y => y.weeks.length);
    const maxWeeks = Math.max(1, ...weekCounts);
    const graphWidth = maxWeeks * this.contribCellSize + (maxWeeks - 1) * this.contribCellGap;
    const fitsTwo = containerWidth >= graphWidth * 2 + this.contribRowGap;
    if (fitsTwo !== this.contribGraphsFitTwoPerRow) {
      this.contribGraphsFitTwoPerRow = fitsTwo;
      this.cdr.detectChanges();
    }
  }

  // Groups a year's days into GitHub-style weeks (columns of 7 days, Sun-Sat),
  // padding the first week so each day lands in its correct day-of-week row.
  private buildWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
    const weeks: (ContributionDay | null)[][] = [];
    if (days.length === 0) return weeks;
    let week: (ContributionDay | null)[] = [];
    const firstDayOfWeek = new Date(`${days[0].date}T00:00:00`).getDay();
    for (let i = 0; i < firstDayOfWeek; i++) week.push(null);
    for (const day of days) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(null);
      weeks.push(week);
    }
    return weeks;
  }
}
