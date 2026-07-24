import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { MarkdownModule } from "ngx-markdown";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  // application-structure
  AppComponent, NavbarComponent, FooterComponent, NotFoundComponent,
  // pages
  HomeComponent, VideosComponent, GithubProjectsComponent,
  // applications
  BettingCalculatorComponent, DtoConvertComponent, FinalGradeCalculatorComponent,
  GroupCreatorComponent, HtmlSandboxComponent, MidiLooperComponent, MultiplicationTableComponent,
  PianoRollComponent, Say2Component, TrackListComponent, TypingTestComponent,
  VirtualKeyboardComponent, IFrameAppComponent, ApplicationsComponent
} from "./components/index";
import { MaterialModule } from "./material.module";
import { DatabaseService } from "./services";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    HomeComponent,
    FooterComponent,
    ApplicationsComponent,
    VideosComponent,
    GithubProjectsComponent,
    IFrameAppComponent,
    MultiplicationTableComponent,
    FinalGradeCalculatorComponent,
    BettingCalculatorComponent,
    Say2Component,
    GroupCreatorComponent,
    HtmlSandboxComponent,
    TypingTestComponent,
    DtoConvertComponent,
    MidiLooperComponent,
    PianoRollComponent,
    TrackListComponent,
    VirtualKeyboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    MarkdownModule.forRoot()
  ],
  providers: [
    HttpClient,
    DatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
