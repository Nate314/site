import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  // application-structure
  AppComponent, NavbarComponent, FooterComponent, NotFoundComponent,
  // pages
  HomeComponent, VideosComponent,
  // applications
  BettingCalculatorComponent, DtoConvertComponent, FinalGradeCalculatorComponent,
  GroupCreatorComponent, HtmlSandboxComponent, MultiplicationTableComponent, Say2Component,
  TypingTestComponent, IFrameAppComponent, ApplicationsComponent
} from "./components/index";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from "angularfire2/database";

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
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, "nate314"),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
