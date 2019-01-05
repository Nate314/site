import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./components/pages/home/home.component";
import { VideosComponent } from "./components/pages/videos/videos.component";
import { AppComponent, NavbarComponent, FooterComponent,
  NotFoundComponent } from "./components/application-structure/index";
import { BettingCalculatorComponent, DtoConvertComponent, FinalGradeCalculatorComponent,
  GroupCreatorComponent, HtmlSandboxComponent, MultiplicationTableComponent, Say2Component,
  TypingTestComponent, IFrameAppComponent, ApplicationsComponent } from "./components/pages/applications/index";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    HomeComponent,
    FooterComponent,
    ApplicationsComponent,
    VideosComponent,
    IFrameAppComponent,
    MultiplicationTableComponent,
    FinalGradeCalculatorComponent,
    BettingCalculatorComponent,
    Say2Component,
    GroupCreatorComponent,
    HtmlSandboxComponent,
    TypingTestComponent,
    DtoConvertComponent
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
