import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { NotFoundComponent } from "./components/application-structure/not-found/not-found.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { VideosComponent } from "./components/pages/videos/videos.component";
import { BettingCalculatorComponent, DtoConvertComponent, FinalGradeCalculatorComponent,
  GroupCreatorComponent, HtmlSandboxComponent, MultiplicationTableComponent,
  Say2Component, TypingTestComponent, ApplicationsComponent,
  IFrameAppComponent } from "./components/pages/applications/index";
import { GithubProjectsComponent } from "./components/pages/github-projects/github-projects.component";

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent,
    data: { animation: "0" } },
  { path: "videos", component: VideosComponent,
    data: { animation: "3" } },
  { path: "github-projects", component: GithubProjectsComponent,
    data: { animation: "2" } },
  { path: "applications", component: ApplicationsComponent,
    data: { animation: "1" } },
  { path: "applications/java/:application", component: ApplicationsComponent,
    data: { animation: "1" } },
  { path: "applications/web/:application", component: ApplicationsComponent,
    data: { animation: "1" } },
  { path: "applications/android/:application", component: ApplicationsComponent,
    data: { animation: "1" } },
  { path: "applications/:subpage", component: ApplicationsComponent,
    data: { animation: "1" } },
  { path: "webapplications/bettingcalculator", component: BettingCalculatorComponent,
    data: { animation: "1" } },
  { path: "webapplications/colorflux", component: IFrameAppComponent,
    data: { animation: "1" } },
  { path: "webapplications/dtoconvert", component: DtoConvertComponent,
    data: { animation: "1" } },
  { path: "webapplications/finalgradecalculator", component: FinalGradeCalculatorComponent,
    data: { animation: "1" } },
  { path: "webapplications/flappyfinch", component: IFrameAppComponent,
    data: { animation: "1" } },
  { path: "webapplications/floatystars", component: IFrameAppComponent,
    data: { animation: "1" } },
  { path: "webapplications/groupcreator", component: GroupCreatorComponent,
    data: { animation: "1" } },
  { path: "webapplications/htmlsandbox", component: HtmlSandboxComponent,
    data: { animation: "1" } },
  { path: "webapplications/multiplicationtable", component: MultiplicationTableComponent,
    data: { animation: "1" } },
  { path: "webapplications/nathangawithwebsite", component: HomeComponent,
    data: { animation: "1" } },
  { path: "webapplications/say2", component: Say2Component,
    data: { animation: "1" } },
  { path: "webapplications/typingtest", component: TypingTestComponent,
    data: { animation: "1" } },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
