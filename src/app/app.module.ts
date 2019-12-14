import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
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
  GroupCreatorComponent, HtmlSandboxComponent, MultiplicationTableComponent, Say2Component,
  TypingTestComponent, IFrameAppComponent, ApplicationsComponent,
  // general components
  ListOfLinksComponent
} from "./components/index";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from "angularfire2/database";
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
    ListOfLinksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, "nate314"),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [
    HttpClient,
    DatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
