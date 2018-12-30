import { Routes } from "@angular/router";
import { NotFoundComponent } from "./components/application-structure/not-found/not-found.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { VideosComponent } from "./components/pages/videos/videos.component";
import { BettingCalculatorComponent, ColorFluxComponent, FinalGradeCalculatorComponent,
  FlappyFinchComponent, FloatyStarsComponent, GradeCalculatorComponent,
  GroupCreatorComponent, HtmlSandboxComponent, MultiplicationTableComponent,
  Say2Component, TypingTestComponent, ApplicationsComponent } from "./components/pages/applications/index";

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "videos", component: VideosComponent },
  { path: "applications", component: ApplicationsComponent },
  { path: "applications/java/:application", component: ApplicationsComponent },
  { path: "applications/web/:application", component: ApplicationsComponent },
  { path: "applications/android/:application", component: ApplicationsComponent },
  { path: "applications/:subpage", component: ApplicationsComponent },
  { path: "webapplications/bettingcalculator", component: BettingCalculatorComponent },
  { path: "webapplications/colorflux", component: ColorFluxComponent },
  { path: "webapplications/finalgradecalculator", component: FinalGradeCalculatorComponent },
  { path: "webapplications/flappyfinch", component: FlappyFinchComponent },
  { path: "webapplications/floatystars", component: FloatyStarsComponent },
  // { path: "webapplications/gradecalculator", component: GradeCalculatorComponent },
  { path: "webapplications/groupcreator", component: GroupCreatorComponent },
  { path: "webapplications/htmlsandbox", component: HtmlSandboxComponent },
  { path: "webapplications/multiplicationtable", component: MultiplicationTableComponent },
  { path: "webapplications/nathangawithwebsite", component: HomeComponent },
  { path: "webapplications/say2", component: Say2Component },
  { path: "webapplications/typingtest", component: TypingTestComponent },
  { path: "**", component: NotFoundComponent }
];
