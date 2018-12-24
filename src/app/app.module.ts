import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./components/pages/home/home.component";
import { VideosComponent } from "./components/pages/videos/videos.component";
import { AppComponent, NavbarComponent, FooterComponent,
  NotFoundComponent } from "./components/application-structure/index";
import { BettingCalculatorComponent, ColorFluxComponent, FinalGradeCalculatorComponent,
  FlappyFinchComponent, FloatyStarsComponent, GradeCalculatorComponent,
  GroupCreatorComponent, HtmlSandboxComponent, MultiplicationTableComponent,
  Say2Component, ApplicationsComponent } from "./components/pages/applications/index";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    HomeComponent,
    FooterComponent,
    ApplicationsComponent,
    VideosComponent,
    MultiplicationTableComponent,
    FinalGradeCalculatorComponent,
    BettingCalculatorComponent,
    Say2Component,
    GroupCreatorComponent,
    HtmlSandboxComponent,
    ColorFluxComponent,
    FlappyFinchComponent,
    FloatyStarsComponent,
    GradeCalculatorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }