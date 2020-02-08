(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/application-structure/app-component/app.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/application-structure/app-component/app.component.html ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div *ngIf=\"!webapplication\">\n  <app-navbar></app-navbar>\n  <br /><br />\n  <div style=\"height:10px;\"></div>\n  <div [@routeAnimations]=\"prepareRoute(outlet)\" class=\"container\" style=\"position:relative;\">\n    <router-outlet #outlet=\"outlet\"></router-outlet>\n  </div>\n  <br /><br />\n  <br /><br />\n  <app-footer></app-footer>\n</div>\n<div *ngIf=\"webapplication\">\n  <router-outlet></router-outlet>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/application-structure/footer/footer.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/application-structure/footer/footer.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<footer class=\"border\" style=\"position:fixed; left:0; bottom:0; width: 100%; background-color:#343a40\">\n  <span class=\"w3-text-white\">&nbsp;&nbsp;{{ url }}</span>\n</footer>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/application-structure/navbar/navbar.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/application-structure/navbar/navbar.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nav class=\"navbar navbar-expand-sm bg-dark w3-text-white\"\n  style=\"position:fixed; left:0; top:0; width:100%; z-index:1;\">\n  <a class=\"navbar-brand w3-text-white\">NathanGawith</a>\n  <button class=\"navbar-toggler navbar-dark\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\"\n    aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\" style=\"color:white\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n    <ul class=\"navbar-nav mr-auto\">\n      <li *ngFor=\"let page of pages\" class=\"nav-item\" [ngClass]=\"isSelected(page) ? 'w3-blue' : ''\">\n        <a class=\"nav-link w3-text-white w3-hover-gray w3-hover-text-black\" (click)=\"goTo(page.link)\"\n          style=\"cursor:pointer;\">\n          &nbsp;&nbsp;{{ page.name }}&nbsp;&nbsp;\n        </a>\n      </li>\n    </ul>\n  </div>\n</nav>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/applications.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/applications.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--Applications-->\n<div *ngIf=\"apps.length == 0\" class=\"container\">\n  <br />\n  <div *ngFor=\"let page of subpages\">\n    <mat-card class=\"mat-elevation-z4\">\n      <h1>{{ page.name }}</h1>\n      <span [innerHTML]=\"page.description\"></span>\n      <a class=\"hyperlink w3-hover-text-purple\" [routerLink]=\"[page.link]\">here</a>.\n      <br />\n      <span *ngFor=\"let app of page.apps; let i = index\">\n        <a *ngIf=\"page.name.toUpperCase().startsWith('JAVA')\" (click)=\"openJavaApp(app)\"\n          class=\"hyperlink w3-hover-text-purple\">{{ app.name }}</a>\n        <a *ngIf=\"page.name.toUpperCase().startsWith('WEB')\" (click)=\"openWebApp(app, true)\"\n          class=\"hyperlink w3-hover-text-purple\">{{ app.name }}</a>\n        <a *ngIf=\"page.name.toUpperCase().startsWith('ANDROID')\" (click)=\"openAndroidApp(app)\"\n          class=\"hyperlink w3-hover-text-purple\">{{ app.name }}</a>\n        <span *ngIf=\"i !== page.apps.length - 1 && i != page.apps.length - 2\">, </span>\n        <span *ngIf=\"i === page.apps.length - 2\">, and </span>\n        <span *ngIf=\"i === page.apps.length - 1\">. </span>\n      </span>\n    </mat-card>\n    <br />\n  </div>\n</div>\n<!--/Applications-->\n\n<!--Applications/Subpage-->\n<div *ngIf=\"!webAppOpen && pageName != null\">\n  <h1>{{ pageName }}</h1>\n  <div *ngFor=\"let app of apps\">\n    <mat-card class=\"mat-elevation-z4\">\n      <h3>{{ app.name }}</h3>\n      <span [innerHtml]=\"app.description\"></span>\n      <br />\n      <span *ngIf=\"pageName.toUpperCase().startsWith('JAVA')\">\n        <b>Download</b>&nbsp;\n        <a class=\"hyperlink w3-hover-text-purple\" (click)=\"openJavaApp(app)\">{{ app.name }}</a>\n      </span>\n      <span *ngIf=\"pageName.toUpperCase().startsWith('WEB')\">\n        <b>Go to</b>&nbsp;\n        <a class=\"hyperlink w3-hover-text-purple\" (click)=\"openWebApp(app, true)\">{{ app.name }}</a>\n      </span>\n      <span *ngIf=\"pageName.toUpperCase().startsWith('ANDROID')\">\n        <b>Download</b>&nbsp;\n        <a class=\"hyperlink w3-hover-text-purple\" (click)=\"openAndroidApp(app)\">{{ app.name }}</a>\n      </span>\n    </mat-card>\n    <br />\n  </div>\n</div>\n<!--/Applications/Subpage-->\n\n<!--Applications/Subpage/App-->\n<div *ngIf=\"webApp\">\n  <br />\n  <mat-card class=\"mat-elevation-z4\">\n    <div *ngIf=\"webApp\">\n      <app-iframe-app *ngIf=\"useIFrame(webApp.file)\" [src]=\"webApp.file\"></app-iframe-app>\n      <app-betting-calculator *ngIf=\"webApp.selector === 'app-betting-calculator'\"></app-betting-calculator>\n      <app-dto-convert *ngIf=\"webApp.selector === 'app-dto-convert'\"></app-dto-convert>\n      <app-final-grade-calculator *ngIf=\"webApp.selector === 'app-final-grade-calculator'\"></app-final-grade-calculator>\n      <app-group-creator *ngIf=\"webApp.selector === 'app-group-creator'\"></app-group-creator>\n      <app-html-sandbox *ngIf=\"webApp.selector === 'app-html-sandbox'\"></app-html-sandbox>\n      <app-multiplication-table *ngIf=\"webApp.selector === 'app-multiplication-table'\"></app-multiplication-table>\n      <app-root *ngIf=\"webApp.selector === 'app-root'\"></app-root>\n      <app-say2 *ngIf=\"webApp.selector === 'app-say2'\"></app-say2>\n      <app-typing-test *ngIf=\"webApp.selector === 'app-typing-test'\"></app-typing-test>\n    </div>\n  </mat-card>\n  <br />\n  <mat-card class=\"mat-elevation-z4\">\n    {{appDescription}}\n  </mat-card>\n</div>\n<!--Applications/Subpage/App-->\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/betting-calculator/betting-calculator.component.html":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/betting-calculator/betting-calculator.component.html ***!
  \******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<br />\n<div class=\"row\">\n  <div class=\"col-2\">\n    There&nbsp;are\n  </div>\n  <div class=\"col-5\">\n    <input type=\"number\" [(ngModel)]=\"players\" style=\"width:100%;\"\n      (keyup)=\"setUpTable()\" (change)=\"setUpTable()\" value=\"2\" />\n  </div>\n  <div class=\"col-4\">\n    <input type=\"text\" [(ngModel)]=\"playerName\" style=\"width:100%;\"\n      (keyup)=\"setUpTable()\" (change)=\"setUpTable()\" value=\"Horse\" />\n  </div>\n  <div class=\"col-1\">\n    s\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-2\">\n    There&nbsp;are\n  </div>\n  <div class=\"col-5\">\n    <input type=\"number\" [(ngModel)]=\"humans\" style=\"width:100%;\"\n      (keyup)=\"setUpTable()\" (change)=\"setUpTable()\" value=\"2\" />\n  </div>\n  <div class=\"col-5\">\n    Humans\n  </div>\n</div>\n<br />\n<!-- Top row (Horse Labels) -->\n<div class=\"row\">\n  <div class=\"col-2\">\n    &nbsp;\n  </div>\n  <div class=\"col-2\" *ngFor=\"let i of playerIndecies\">\n    {{ playerName + \"&nbsp;\" + i }}\n  </div>\n</div>\n<!-- Middle rows (Human Labels and textboxes) -->\n<div class=\"row border border-secondary\" *ngFor=\"let i of humanIndecies\">\n  <div class=\"col-2\">\n    {{ \"Human&nbsp;\" + i }}\n  </div>\n  <div class=\"col-2\" *ngFor=\"let j of playerIndecies\">\n    <input type=\"number\" style=\"width:100%;\" [(ngModel)]=\"grid[i - 1][j - 1]\"/>\n  </div>\n</div>\n<!-- Bottom row (Buttons) -->\n<div class=\"row\">\n  <div class=\"col-2\">\n    &nbsp;\n  </div>\n  <div class=\"col-2\" *ngFor=\"let i of playerIndecies\">\n    <button class=\"btn\" (click)=\"playerWon(i)\">\n      {{ playerName + \"&nbsp;\" + i + \"&nbsp;\" + \"won\" }}\n    </button>\n  </div>\n</div>\n<p [innerHtml]=\"output\"></p>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/dto-convert/dto-convert.component.html":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/dto-convert/dto-convert.component.html ***!
  \****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n  <div class=\"row\">\n    <div class=\"col-1\">\n        Please enter text in the format shown in the placeholder text.\n    </div>\n    <div class=\"col-5\">\n      <div class=\"row\">C#</div>\n      <div class=\"row\">\n        <textarea [placeholder]=\"dto_csharp\" [(ngModel)]=\"csharp_text\"\n          style=\"width: 100%\" rows=\"15\"></textarea>\n      </div>\n    </div>\n    <div class=\"col-1\">\n      <div class=\"row\">&nbsp;</div>\n      <div class=\"row\">\n        <button class=\"btn btn-white\" style=\"width:100%;\"\n          (click)=\"csharp_to_typescript()\">\n          &gt;\n        </button>\n      </div>\n      <br />\n      <div class=\"row\">\n        <button class=\"btn btn-white\" style=\"width:100%;\"\n          (click)=\"typescript_to_csharp()\">\n          &lt;\n        </button>\n      </div>\n    </div>\n    <div class=\"col-5\">\n      <div class=\"row\">Typescript</div>\n      <div class=\"row\">\n        <textarea [placeholder]=\"dto_typescript\" [(ngModel)]=\"typescript_text\"\n          style=\"width: 100%\" rows=\"15\"></textarea>\n      </div>\n    </div>\n  </div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/final-grade-calculator/final-grade-calculator.component.html":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/final-grade-calculator/final-grade-calculator.component.html ***!
  \**************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<br />\n<div class=\"row\">\n  <div class=\"col-6\">\n    Current Grade:\n  </div>\n  <div class=\"col-6\">\n    <input type=\"text\" [(ngModel)]=\"currentGrade\" />\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-6\">\n    Percentage Final is Worth:\n  </div>\n  <div class=\"col-6\">\n    <input type=\"text\" [(ngModel)]=\"finalPercentage\" />\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-6\">\n    Percentage you want in the Class:\n  </div>\n  <div class=\"col-6\">\n    <input type=\"text\" [(ngModel)]=\"goal\" />\n  </div>\n</div>\n<div style=\"height:10px;\"></div>\n<div class=\"row\">\n  <div class=\"col-7\">\n    &nbsp;\n  </div>\n  <div class=\"col-5\">\n    <button type=\"button\" class=\"btn\" (click)=\"calculate()\">Submit</button>\n  </div>\n</div>\n<p [innerHtml]=\"label\"></p>\n<p [innerHtml]=\"error\" class=\"w3-text-red\"></p>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/group-creator/group-creator.component.html":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/group-creator/group-creator.component.html ***!
  \********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>Please enter a list of Names separated by commas:\n  <br>\n  (ex: <b>Steve Jobs,Bill Gates,Stephen Hawking,Morgan Freeman</b>)\n  <br>\n  <input type=\"text\" [(ngModel)]=\"list\" (change)=\"generateList()\" (keyup)=\"generateList()\" size=\"50%\" placeholder=\"Steve Jobs,Bill Gates,Stephen Hawking,Morgan Freeman\">\n</p>\n<p>\n  Number of people per group:<br>Random Number between\n  <input type=\"number\" [(ngModel)]=\"minPeople\" (change)=\"generateList()\" (keyup)=\"generateList()\" value=\"1\" /> and\n  <input type=\"number\" [(ngModel)]=\"maxPeople\" (change)=\"generateList()\" (keyup)=\"generateList()\" value=\"3\" />\n</p>\n<p>\n  <button type=\"button\" class=\"btn\" (click)=\"generateList()\">Submit</button>\n</p>\n<p [innerHtml]=\"output\"></p>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/html-sandbox/html-sandbox.component.html":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/html-sandbox/html-sandbox.component.html ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\">\n    <div class=\"col-6\">\n      <textarea id=\"text\" [(ngModel)]=\"html\"\n        font-family=\"monospace\" style=\"width:100%; min-height:100%;\">\n      </textarea>\n    </div>\n    <div class=\"col-6\">\n        <div [innerHtml]=\"html\"></div>\n    </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/multiplication-table/multiplication-table.component.html":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/multiplication-table/multiplication-table.component.html ***!
  \**********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<span>Size of Table: </span>\n<input type=\"text\" (keyup)=\"loadTable()\" [(ngModel)]=\"size\" />\n<span> (max: 120)</span>\n<br />\n<span>Traditional: </span>\n<input type=\"checkbox\" [(ngModel)]=\"traditionalOption\" (change)=\"loadTable()\" />\n\n<div *ngIf=\"loading\">\n  Loading . . .\n</div>\n<div *ngIf=\"!loading\">\n  <div style=\"display:block; width:100%; height:400px; overflow-x:scroll; overflow-y:scroll;\">\n    <table>\n      <tr *ngFor=\"let row of multTable; let i = index;\" style=\"white-space:nowrap; padding:0;\">\n        <span *ngFor=\"let num of row; let j = index;\" style=\"width:100px; padding:0;\">\n            <td *ngIf=\"num != 'asdf'\" style=\"width:50px; padding:0;\" class=\"border border-secondary\"\n              [ngClass]=\"getClass(i, j)\">\n              {{ num }}\n            </td>\n            <td *ngIf=\"num == 'asdf'\" style=\"width:50px; padding:0;\" class=\"border border-secondary\">\n              &nbsp;\n            </td>\n        </span>\n      </tr>\n    </table>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/say2/say2.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/say2/say2.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\" style=\"margin:0;\">\n  <div class=\"row\">\n    Please enter a number between -999,999,999,999,999 and 999,999,999,999,999:\n  </div>\n  <div class=\"row\">\n    <input type=\"number\" [(ngModel)]=\"input\" (change)=\"calculate()\" (keyup)=\"calculate()\">\n  </div>\n  <div class=\"row\">\n      {{ numberLabel }}\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/typing-test/typing-test.component.html":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/typing-test/typing-test.component.html ***!
  \****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<p *ngIf=\"paragraph === ''\">\n  Paste Text to use for typing test below:\n  <textarea [(ngModel)]=\"customparagraph\" style=\"width:100%;\" rows=\"10\" [placeholder]=\"dummyparagraph\"></textarea>\n  <br />\n  <button class=\"btn btn-black\" (click)=\"submit()\">Submit</button>\n</p>\n\n<div *ngIf=\"paragraph !== ''\">\n  <p>\n    <span style=\"color:green;\"><b>{{typedText}}</b></span>\n    <span style=\"color:red;\"><u>{{wrongtypedText}}</u></span>\n    <span><u>{{cursorText}}</u></span>\n    <span>{{untypedText}}</span>\n  </p>\n  <textarea [disabled]=\"disableTextBox\" onpaste=\"return false;\" style=\"width:100%;\" rows=\"10\" [(ngModel)]=\"typingparagraph\" id=\"asdf\" (keyup)=\"typingparagraphchanged()\"></textarea>\n  <p>{{timerMinutes}}:{{pad(timerSeconds)}}</p>\n  <p *ngIf=\"outputText !== ''\">\n    {{outputText}}\n    <br />\n    <button class=\"btn btn-black\" (click)=\"restart()\">Restart</button>\n  </p>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/github-projects/github-projects.component.html":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/github-projects/github-projects.component.html ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<br />\r\n<mat-card class=\"mat-elevation-z4\" [innerHTML]=\"description\">\r\n</mat-card>\r\n<br />\r\n<mat-accordion>\r\n  <div *ngFor=\"let project of projects\">\r\n    <mat-expansion-panel class=\"mat-elevation-z4\">\r\n      <mat-expansion-panel-header>\r\n        <mat-panel-title>\r\n          {{project.title}}\r\n        </mat-panel-title>\r\n        <mat-panel-description>\r\n          <a [href]=\"project.link\">{{project.link}}</a>\r\n        </mat-panel-description>\r\n      </mat-expansion-panel-header>\r\n\r\n      <markdown [src]=\"project.description\" lineNumbers [start]=\"5\"></markdown>\r\n    </mat-expansion-panel>\r\n    <br />\r\n  </div>\r\n</mat-accordion>\r\n<br />\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/home/home.component.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/home/home.component.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<br />\n<mat-card class=\"mat-elevation-z4\">\n  <div>\n    <h1>\n      Welcome!\n    </h1>\n    <mat-divider></mat-divider>\n    <p>\n      This is a website I put together to feature work I have done on\n      various applications including\n      <a (mouseup)=\"openPage($event, 'applications/java')\" class=\"hyperlink w3-hover-text-purple\">Java Applications</a>,\n      <a (mouseup)=\"openPage($event, 'applications/web')\" class=\"hyperlink w3-hover-text-purple\">Web Applications</a>,\n      and\n      <a (mouseup)=\"openPage($event, 'applications/android')\" class=\"hyperlink w3-hover-text-purple\">Android\n        Applications</a>.\n      I also have a few videos that I made that are featured\n      <a (mouseup)=\"openPage($event, 'videos')\" class=\"hyperlink w3-hover-text-purple\">here</a>.\n    </p>\n    <mat-divider></mat-divider>\n    <h3>An introduction to me:</h3>\n    <p>\n      I am currently a Computer Science student at the\n      <a (mouseup)=\"openLink($event, 'https://sce.umkc.edu/')\" class=\"hyperlink w3-hover-text-purple\">School of\n        Computing and Engineering</a>\n      at\n      <a (mouseup)=\"openLink($event, 'https://www.umkc.edu/')\" class=\"hyperlink w3-hover-text-purple\">UMKC</a>\n      and a software development intern at\n      <a (mouseup)=\"openLink($event, 'https://wellsky.com/')\" class=\"hyperlink w3-hover-text-purple\">WellSky</a>.\n    </p>\n    <p>\n      I love coding becuase I love learning, and I am a logical thinker.\n      The first programming language I learned was Java through\n      <a (mouseup)=\"openLink($event, 'https://www.firstinspires.org/robotics/frc')\"\n        class=\"hyperlink w3-hover-text-purple\">FRC</a>\n      in high school. This experience in robotics was great, and made me\n      realize that Computer Science could be a possible career path that I\n      could enjoy.\n    </p>\n    <p *ngIf=\"languageLinks && toolLinks\">\n      I have experience coding in many different languages including\n      <app-list-of-links [links]=\"languageLinks\" (click)=\"openLink($event.key, $event.value)\"></app-list-of-links>.\n      Some of the resources I use most often to learn coding on my own are\n      <app-list-of-links [links]=\"toolLinks\" (click)=\"openLink($event.key, $event.value)\"></app-list-of-links>.\n    </p>\n    <p *ngIf=\"youtubeLinks\">\n      Some of my favorite youtube channels include\n      <app-list-of-links [links]=\"youtubeLinks\" (click)=\"openLink($event.key, $event.value)\"></app-list-of-links>.\n    </p>\n    <mat-divider></mat-divider>\n    <div *ngIf=\"friendLinks\">\n      <h3>Check out Some of my Friend's websites:</h3>\n      <app-list-of-links [links]=\"friendLinks\" (click)=\"openLink($event.key, $event.value)\"></app-list-of-links>\n      all have websites where you can download or use software as well!\n    </div>\n  </div>\n</mat-card>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/home/list-of-links/list-of-links.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/home/list-of-links/list-of-links.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<span *ngFor=\"let link of links; let i = index;\">\r\n  <a (mouseup)=\"openLink($event, link.url)\" class=\"hyperlink w3-hover-text-purple\">{{link.name}}</a>\r\n  <span [ngSwitch]=\"i\">\r\n    <span *ngSwitchCase=\"links.length - 1\"></span>\r\n    <span *ngSwitchCase=\"links.length - 2\">, and </span>\r\n    <span *ngSwitchDefault>, </span>\r\n  </span>\r\n</span>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/videos/videos.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/videos/videos.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<br />\n<mat-grid-list [cols]=\"getColumns()\" rowHeight=\"450px\" gutterSize=\"15px\" id=\"videoGrid\">\n  <mat-grid-tile *ngFor=\"let video of videos\" [colspan]=\"1\" [rowspan]=\"1\">\n    <mat-card class=\"mat-elevation-z4\" style=\"height:450px\">\n      <h3>{{ video.title }}</h3>\n      <img *ngIf=\"!video.enabled\" [src]=\"video.preview\" style=\"width:100%;\" (click)=\"btnThumbnail(video)\"/>\n      <iframe *ngIf=\"video.enabled\" [src]=\"video.link\" frameborder=\"1\" allow=\"autoplay; encrypted-media\" style=\"width:100%; height:25vh;\"\n        allowfullscreen></iframe>\n      <p>{{ video.description }}</p>\n      <p>Click <a [href]=\"getYoutubeLink(video.link)\">here</a> to watch on Youtube.</p>\n    </mat-card>\n  </mat-grid-tile>\n</mat-grid-list>\n");

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: routes, AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_application_structure_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/application-structure/not-found/not-found.component */ "./src/app/components/application-structure/not-found/not-found.component.ts");
/* harmony import */ var _components_pages_home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/pages/home/home.component */ "./src/app/components/pages/home/home.component.ts");
/* harmony import */ var _components_pages_videos_videos_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/pages/videos/videos.component */ "./src/app/components/pages/videos/videos.component.ts");
/* harmony import */ var _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/pages/applications/index */ "./src/app/components/pages/applications/index.ts");
/* harmony import */ var _components_pages_github_projects_github_projects_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/pages/github-projects/github-projects.component */ "./src/app/components/pages/github-projects/github-projects.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: _components_pages_home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"],
        data: { animation: "0" } },
    { path: "videos", component: _components_pages_videos_videos_component__WEBPACK_IMPORTED_MODULE_4__["VideosComponent"],
        data: { animation: "3" } },
    { path: "github-projects", component: _components_pages_github_projects_github_projects_component__WEBPACK_IMPORTED_MODULE_6__["GithubProjectsComponent"],
        data: { animation: "2" } },
    { path: "applications", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__["ApplicationsComponent"],
        data: { animation: "1" } },
    { path: "applications/java/:application", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__["ApplicationsComponent"],
        data: { animation: "1" } },
    { path: "applications/web/:application", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__["ApplicationsComponent"],
        data: { animation: "1" } },
    { path: "applications/android/:application", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__["ApplicationsComponent"],
        data: { animation: "1" } },
    { path: "applications/:subpage", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__["ApplicationsComponent"],
        data: { animation: "1" } },
    { path: "webapplications/bettingcalculator", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__["BettingCalculatorComponent"],
        data: { animation: "1" } },
    { path: "webapplications/colorflux", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__["IFrameAppComponent"],
        data: { animation: "1" } },
    { path: "webapplications/dtoconvert", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__["DtoConvertComponent"],
        data: { animation: "1" } },
    { path: "webapplications/finalgradecalculator", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__["FinalGradeCalculatorComponent"],
        data: { animation: "1" } },
    { path: "webapplications/flappyfinch", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__["IFrameAppComponent"],
        data: { animation: "1" } },
    { path: "webapplications/floatystars", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__["IFrameAppComponent"],
        data: { animation: "1" } },
    { path: "webapplications/groupcreator", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__["GroupCreatorComponent"],
        data: { animation: "1" } },
    { path: "webapplications/htmlsandbox", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__["HtmlSandboxComponent"],
        data: { animation: "1" } },
    { path: "webapplications/multiplicationtable", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__["MultiplicationTableComponent"],
        data: { animation: "1" } },
    { path: "webapplications/nathangawithwebsite", component: _components_pages_home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"],
        data: { animation: "1" } },
    { path: "webapplications/say2", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__["Say2Component"],
        data: { animation: "1" } },
    { path: "webapplications/typingtest", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_5__["TypingTestComponent"],
        data: { animation: "1" } },
    { path: "**", component: _components_application_structure_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_2__["NotFoundComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_markdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-markdown */ "./node_modules/ngx-markdown/fesm5/ngx-markdown.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _components_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/index */ "./src/app/components/index.ts");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/fire */ "./node_modules/@angular/fire/index.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var angularfire2_database__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! angularfire2/database */ "./node_modules/angularfire2/database/index.js");
/* harmony import */ var angularfire2_database__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(angularfire2_database__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./material.module */ "./src/app/material.module.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services */ "./src/app/services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _components_index__WEBPACK_IMPORTED_MODULE_8__["AppComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["NavbarComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["NotFoundComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["HomeComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["FooterComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["ApplicationsComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["VideosComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["GithubProjectsComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["IFrameAppComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["MultiplicationTableComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["FinalGradeCalculatorComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["BettingCalculatorComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["Say2Component"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["GroupCreatorComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["HtmlSandboxComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["TypingTestComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["DtoConvertComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_8__["ListOfLinksComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _material_module__WEBPACK_IMPORTED_MODULE_13__["MaterialModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                ngx_markdown__WEBPACK_IMPORTED_MODULE_5__["MarkdownModule"].forRoot(),
                _angular_fire__WEBPACK_IMPORTED_MODULE_9__["AngularFireModule"].initializeApp(src_environments_environment__WEBPACK_IMPORTED_MODULE_10__["environment"].firebase, "nate314"),
                _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_11__["AngularFirestoreModule"],
                angularfire2_database__WEBPACK_IMPORTED_MODULE_12__["AngularFireDatabaseModule"]
            ],
            providers: [
                _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClient"],
                _services__WEBPACK_IMPORTED_MODULE_14__["DatabaseService"]
            ],
            bootstrap: [_components_index__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/application-structure/app-component/app.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/components/application-structure/app-component/app.component.ts ***!
  \*********************************************************************************/
/*! exports provided: slideTo, AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slideTo", function() { return slideTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_helpers_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/helpers/Helper */ "./src/app/helpers/Helper.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




// inspired by Fireship https://www.youtube.com/watch?v=7JA90VI9fAI
function slideTo(from, to) {
    var _a, _b, _c, _d;
    var direction = from < to ? "right" : "left";
    var distance = 100 * Math.abs(from - to);
    var optional = { optional: true };
    var animationTime = "1000ms ease";
    return [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(":enter, :leave", [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])((_a = {
                    position: "absolute",
                    top: 0
                },
                _a[direction] = 0,
                _a.width = "100%",
                _a.opacity = 1,
                _a))
        ], optional),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(":enter", [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])((_b = {}, _b[direction] = "-" + distance + "%", _b.opacity = 0, _b))
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["group"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(":leave", [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])(animationTime, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])((_c = {}, _c[direction] = distance + "%", _c.opacity = 0, _c)))
            ], optional),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(":enter", [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])(animationTime, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])((_d = {}, _d[direction] = "0%", _d.opacity = 1, _d)))
            ])
        ])
    ];
}
var nums = Array(4).fill(null).map(function (_, i) { return i; });
var slider = Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])("routeAnimations", src_app_helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].flatten2dArray(nums.map(function (from) { return nums.map(function (to) {
    return Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(from + " => " + to, slideTo(from, to));
}); })));
var AppComponent = /** @class */ (function () {
    function AppComponent(router) {
        this.router = router;
        this.webapplication = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]) {
                if (event.url.toLocaleLowerCase().includes("webapplications")
                    && !event.url.toLocaleLowerCase().includes("nathangawithwebsite"))
                    _this.webapplication = true;
            }
        });
    };
    AppComponent.prototype.prepareRoute = function (outlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData["animation"];
    };
    AppComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }
    ]; };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-root",
            template: __importDefault(__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/application-structure/app-component/app.component.html")).default,
            animations: [slider]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/components/application-structure/footer/footer.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/components/application-structure/footer/footer.component.ts ***!
  \*****************************************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var FooterComponent = /** @class */ (function () {
    function FooterComponent(router) {
        this.router = router;
    }
    Object.defineProperty(FooterComponent.prototype, "url", {
        get: function () {
            return "" + window.location.host + this.router.url;
        },
        enumerable: true,
        configurable: true
    });
    FooterComponent.prototype.ngOnInit = function () { };
    FooterComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }
    ]; };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-footer",
            template: __importDefault(__webpack_require__(/*! raw-loader!./footer.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/application-structure/footer/footer.component.html")).default
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/components/application-structure/index.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/application-structure/index.ts ***!
  \***********************************************************/
/*! exports provided: NotFoundComponent, slideTo, AppComponent, FooterComponent, NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not-found/not-found.component */ "./src/app/components/application-structure/not-found/not-found.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotFoundComponent", function() { return _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_0__["NotFoundComponent"]; });

/* harmony import */ var _app_component_app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-component/app.component */ "./src/app/components/application-structure/app-component/app.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "slideTo", function() { return _app_component_app_component__WEBPACK_IMPORTED_MODULE_1__["slideTo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return _app_component_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]; });

/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/components/application-structure/footer/footer.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return _footer_footer_component__WEBPACK_IMPORTED_MODULE_2__["FooterComponent"]; });

/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/components/application-structure/navbar/navbar.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_3__["NavbarComponent"]; });

var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






/***/ }),

/***/ "./src/app/components/application-structure/navbar/navbar.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/components/application-structure/navbar/navbar.component.ts ***!
  \*****************************************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../helpers/Helper */ "./src/app/helpers/Helper.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




var Page = /** @class */ (function () {
    function Page() {
    }
    return Page;
}());
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(router, location) {
        this.router = router;
        this.location = location;
        this.pages = [];
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.pages.push({ link: "/home", name: "Home" });
        this.pages.push({ link: "/applications", name: "Applications" });
        this.pages.push({ link: "/github-projects", name: "Github Projects" });
        this.pages.push({ link: "/videos", name: "Videos" });
    };
    NavbarComponent.prototype.goTo = function (url) {
        _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].navigate(this.router, this.location, url);
        // location.href = url;
    };
    NavbarComponent.prototype.isSelected = function (page) {
        if (_helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Constants"].currentPageURL.includes(page.link))
            return true;
        else
            return false;
    };
    NavbarComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"] }
    ]; };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-navbar",
            template: __importDefault(__webpack_require__(/*! raw-loader!./navbar.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/application-structure/navbar/navbar.component.html")).default
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/components/application-structure/not-found/not-found.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/components/application-structure/not-found/not-found.component.ts ***!
  \***********************************************************************************/
/*! exports provided: NotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFoundComponent", function() { return NotFoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services */ "./src/app/services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent(db) {
        this.db = db;
        this.loaded = false;
        this.content = "¯\\_(ツ)_/¯ NOT FOUND";
    }
    NotFoundComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.db.connection().subscribe(function (db) {
            var path = window.location.pathname;
            var redirects = db.getRedirects();
            if (redirects.map(function (x) { return x.title; }).includes(path)) {
                var route_1 = redirects.find(function (x) { return x.title === path; });
                _this.content = "Redirecting to " + route_1.description;
                _this.dots();
                setTimeout(function () {
                    window.location.href = route_1.link;
                }, 1200);
            }
            _this.loaded = true;
        });
    };
    NotFoundComponent.prototype.dots = function () {
        var _this = this;
        setTimeout(function () {
            _this.content += " .";
            _this.dots();
        }, 200);
    };
    NotFoundComponent.ctorParameters = function () { return [
        { type: src_app_services__WEBPACK_IMPORTED_MODULE_1__["DatabaseService"] }
    ]; };
    NotFoundComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-not-found",
            template: "\n  <div *ngIf=\"loaded\">\n    {{ content }}\n  </div>\n"
        }),
        __metadata("design:paramtypes", [src_app_services__WEBPACK_IMPORTED_MODULE_1__["DatabaseService"]])
    ], NotFoundComponent);
    return NotFoundComponent;
}());



/***/ }),

/***/ "./src/app/components/index.ts":
/*!*************************************!*\
  !*** ./src/app/components/index.ts ***!
  \*************************************/
/*! exports provided: NotFoundComponent, slideTo, AppComponent, FooterComponent, NavbarComponent, HomeComponent, ListOfLinksComponent, VideosComponent, GithubProjectsComponent, BettingCalculatorComponent, DtoConvertComponent, FinalGradeCalculatorComponent, GroupCreatorComponent, HtmlSandboxComponent, MultiplicationTableComponent, Say2Component, TypingTestComponent, IFrameAppComponent, ApplicationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _application_structure_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./application-structure/index */ "./src/app/components/application-structure/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotFoundComponent", function() { return _application_structure_index__WEBPACK_IMPORTED_MODULE_0__["NotFoundComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "slideTo", function() { return _application_structure_index__WEBPACK_IMPORTED_MODULE_0__["slideTo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return _application_structure_index__WEBPACK_IMPORTED_MODULE_0__["AppComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return _application_structure_index__WEBPACK_IMPORTED_MODULE_0__["FooterComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return _application_structure_index__WEBPACK_IMPORTED_MODULE_0__["NavbarComponent"]; });

/* harmony import */ var _pages_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/index */ "./src/app/components/pages/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["HomeComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ListOfLinksComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["ListOfLinksComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideosComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["VideosComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GithubProjectsComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["GithubProjectsComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BettingCalculatorComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["BettingCalculatorComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DtoConvertComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["DtoConvertComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FinalGradeCalculatorComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["FinalGradeCalculatorComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupCreatorComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["GroupCreatorComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HtmlSandboxComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["HtmlSandboxComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiplicationTableComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["MultiplicationTableComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Say2Component", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["Say2Component"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypingTestComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["TypingTestComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IFrameAppComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["IFrameAppComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApplicationsComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["ApplicationsComponent"]; });

var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




/***/ }),

/***/ "./src/app/components/pages/applications/applications.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/components/pages/applications/applications.component.ts ***!
  \*************************************************************************/
/*! exports provided: ApplicationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationsComponent", function() { return ApplicationsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../helpers/Helper */ "./src/app/helpers/Helper.ts");
/* harmony import */ var src_app_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services */ "./src/app/services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





var Page = /** @class */ (function () {
    function Page() {
    }
    return Page;
}());
var App = /** @class */ (function () {
    function App() {
    }
    return App;
}());
var ApplicationsComponent = /** @class */ (function () {
    function ApplicationsComponent(router, location, activatedRoute, db) {
        this.router = router;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this.db = db;
        this.appSelector = "<app-dto-convert></app-dto-convert>";
        this.animationState = "out";
        // Applications
        this.subpages = [];
        this.apps = [];
        // Applications/Subpage/App
        this.webAppOpen = false;
    }
    ApplicationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.db.connection().subscribe(function (db) {
            // load information about all applications from the database
            _this.javaApplications = db.getJavaApplications();
            _this.webApplications = db.getWebApplications();
            _this.androidApplications = db.getAndroidApplications();
            _this.subpages = [
                {
                    name: _this.javaApplications["name"],
                    link: "../" + _this.javaApplications["link"],
                    description: _this.javaApplications["description"],
                    apps: _this.javaApplications["apps"]
                }, {
                    name: _this.webApplications["name"],
                    link: "../" + _this.webApplications["link"],
                    description: _this.webApplications["description"],
                    apps: _this.webApplications["apps"]
                }, {
                    name: _this.androidApplications["name"],
                    link: "../" + _this.androidApplications["link"],
                    description: _this.androidApplications["description"],
                    apps: _this.androidApplications["apps"]
                }
            ];
            // load different sections of the page based on the url
            var validSubpages = ["java", "web", "android"];
            _this.activatedRoute.url.subscribe(function (response) {
                // get the subpage
                var validSubpage = response.filter(function (x) { return validSubpages.includes(x.path); });
                if (validSubpage.length > 0) {
                    _this.subpage = validSubpage[0].path;
                    // get the subpage object
                    var routeSubpage = _this.subpages.filter(function (page) {
                        return page.name.toUpperCase().includes(_this.subpage.toUpperCase());
                    });
                    if (routeSubpage.length > 0) {
                        var thisPage = routeSubpage[0];
                        _this.pageName = thisPage["name"];
                        _this.apps = thisPage["apps"];
                        // get the web application
                        if (response.length === 3)
                            _this.webApp = _this.getApp(_this.webApplications["apps"], response[2].path);
                    }
                }
            });
            // if a web app is being passed through the url, then open that web app
            if (!_helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].equalsNull(_this.webApp))
                _this.openWebApp(_this.getApp(_this.webApplications["apps"], _this.webApp.name), false);
            // initialize page
            var pageTitle = String(_helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["PageNames"].APPLICATIONS);
            if (!_helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].equalsNull(_this.pageName))
                pageTitle += " | " + _this.pageName;
            if (!_helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].equalsNull(_this.webApp))
                pageTitle += " | " + _this.webApp.name;
            _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].initializePage(_this, _this.router.url, pageTitle);
        });
    };
    ApplicationsComponent.prototype.getApp = function (appList, appName) {
        var appToOpen = appList.filter(function (application) { return application.name.toLowerCase() === appName.toLowerCase(); });
        if (appToOpen.length > 0)
            return appToOpen[0];
        return null;
    };
    ApplicationsComponent.prototype.useIFrame = function (file) {
        return file.includes("nate314.github.io") || file.includes("nathangawith.com");
    };
    ApplicationsComponent.prototype.open = function (url) {
        _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].navigate(this.router, this.location, url);
    };
    ApplicationsComponent.prototype.openWebApp = function (app, href) {
        if (href) {
            _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].navigate(this.router, this.location, "/applications/web/" + app.name);
        }
        else {
            if (!_helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].equalsNull(app)) {
                this.webAppOpen = true;
                this.appDescription = app.description;
            }
        }
    };
    ApplicationsComponent.prototype.openLink = function (url, ext) {
        if (!url.includes("firebasestorage.googleapis.com")) {
            if (!url.includes("https://nate314.github.io/nathangawith/applications/" + ext + "/"))
                url = "https://nate314.github.io/nathangawith/applications/" + ext + "/" + url;
        }
        location.href = url;
    };
    ApplicationsComponent.prototype.openJavaApp = function (app) {
        this.openLink(app.file, "javaApplications");
    };
    ApplicationsComponent.prototype.openAndroidApp = function (app) {
        this.openLink(app.file, "androidApplications");
    };
    ApplicationsComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: src_app_services__WEBPACK_IMPORTED_MODULE_4__["DatabaseService"] }
    ]; };
    ApplicationsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-applications",
            template: __importDefault(__webpack_require__(/*! raw-loader!./applications.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/applications.component.html")).default
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            src_app_services__WEBPACK_IMPORTED_MODULE_4__["DatabaseService"]])
    ], ApplicationsComponent);
    return ApplicationsComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/betting-calculator/betting-calculator.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/components/pages/applications/betting-calculator/betting-calculator.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: BettingCalculatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BettingCalculatorComponent", function() { return BettingCalculatorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var BettingCalculatorComponent = /** @class */ (function () {
    function BettingCalculatorComponent() {
        this.houseAccount = 0;
        this.players = 2;
        this.playerName = "Horse";
        this.humans = 2;
        this.playerIndecies = [];
        this.humanIndecies = [];
        // grid[human][player]
        this.grid = [];
        this.output = "";
    }
    BettingCalculatorComponent.prototype.ngOnInit = function () {
        this.setUpTable();
    };
    BettingCalculatorComponent.prototype.setUpTable = function () {
        this.playerIndecies = [];
        this.humanIndecies = [];
        this.grid = [];
        this.output = "";
        for (var i = 0; i < this.humans; i++) {
            this.humanIndecies.push(i + 1);
            var tempList = [];
            for (var j = 0; j < this.players; j++) {
                if (i === 0)
                    this.playerIndecies.push(j + 1);
                tempList.push(0);
            }
            tempList = tempList;
            this.grid.push(tempList);
        }
    };
    BettingCalculatorComponent.prototype.playerWon = function (winnerID) {
        winnerID--;
        var totalLoot = this.houseAccount;
        var winningPot = 0;
        var loosingPot = 0;
        var winnings = [];
        var totalWinnings = 0;
        for (var i = 0; i < this.humans; i++) {
            for (var j = 0; j < this.players; j++) {
                totalLoot += this.grid[i][j];
                if (j === winnerID)
                    winningPot += this.grid[i][j];
                else
                    loosingPot += this.grid[i][j];
            }
        }
        this.output = "TotalLoot: " + totalLoot + " "
            + ("(House: " + this.houseAccount + ", ")
            + ("WinningPot: " + winningPot + ", ")
            + ("LoosingPot: " + loosingPot + ")<br />");
        for (var i = 0; i < this.humans; i++) {
            if (this.grid[i][winnerID] !== 0)
                winnings.push(parseInt(((this.grid[i][winnerID] / winningPot) * totalLoot) + "", 10));
            else
                winnings.push(0);
        }
        winnings = winnings;
        this.output += "<div class=\"row border border-left-0 border-right-0\"><div class=\"col-12\">";
        for (var i = 0; i < this.humans; i++) {
            if (winnings[i] !== 0)
                this.output += "<b>Human " + (i + 1) + ": " + winnings[i] + "</b><br />";
            else
                this.output += "Human " + (i + 1) + ": " + winnings[i] + "<br />";
            totalWinnings += winnings[i];
        }
        this.output += "</div></div>";
        this.houseAccount = Math.round(100 * (totalLoot - totalWinnings)) / 100;
        this.output += "House: " + this.houseAccount + "<br />";
    };
    BettingCalculatorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-betting-calculator",
            template: __importDefault(__webpack_require__(/*! raw-loader!./betting-calculator.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/betting-calculator/betting-calculator.component.html")).default
        }),
        __metadata("design:paramtypes", [])
    ], BettingCalculatorComponent);
    return BettingCalculatorComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/dto-convert/dto-convert.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/components/pages/applications/dto-convert/dto-convert.component.ts ***!
  \************************************************************************************/
/*! exports provided: DtoConvertComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DtoConvertComponent", function() { return DtoConvertComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_helpers_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/helpers/Helper */ "./src/app/helpers/Helper.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var DtoConvertComponent = /** @class */ (function () {
    function DtoConvertComponent() {
        this.dto_csharp = "class User {\n"
            + "\tpublic string username { get; set; }\n"
            + "\tpublic string password { get; set; }\n"
            + "}";
        this.dto_typescript = "class User {\n"
            + "\tusername: string;\n"
            + "\tpassword: string;\n"
            + "}";
    }
    DtoConvertComponent.prototype.ngOnInit = function () {
    };
    DtoConvertComponent.prototype.csharp_to_typescript = function () {
        var result = this.csharp_text;
        result = src_app_helpers_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].replaceAll(result, "  ", " ");
        var getset_list = ["{get;set;}", "{ get;set;}", "{ get; set;}", "{ get; set; }",
            "{get;set; }", "{get; set; }", "{get; set;}"];
        for (var _i = 0, getset_list_1 = getset_list; _i < getset_list_1.length; _i++) {
            var getset = getset_list_1[_i];
            result = src_app_helpers_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].replaceAll(result, getset, "");
        }
        var result_lines = result.split("\n");
        result = "";
        for (var _a = 0, result_lines_1 = result_lines; _a < result_lines_1.length; _a++) {
            var line = result_lines_1[_a];
            if (!src_app_helpers_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(line)) {
                if (line.indexOf("{") !== -1 || line.indexOf("}") !== -1) {
                    result += line + "\n";
                }
                else {
                    var variable = line.split(" ")[2];
                    var type = line.split(" ")[1];
                    result += "\t" + variable + ": " + type + ";\n";
                }
            }
        }
        this.typescript_text = result;
    };
    DtoConvertComponent.prototype.typescript_to_csharp = function () {
        var result = this.typescript_text;
        result = src_app_helpers_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].replaceAll(result, "  ", " ");
        var result_lines = result.split("\n");
        result = "";
        for (var _i = 0, result_lines_2 = result_lines; _i < result_lines_2.length; _i++) {
            var line = result_lines_2[_i];
            if (!src_app_helpers_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(line)) {
                if (line.indexOf("{") !== -1 || line.indexOf("}") !== -1) {
                    result += line + "\n";
                }
                else {
                    var scope = "public";
                    var type = src_app_helpers_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].replaceAll(line, " ", "").split(":")[1].split(";")[0];
                    var variable = src_app_helpers_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].replaceAll(line, "\t", "").split(":")[0];
                    result += "\t" + scope + " " + type + " " + variable + " { get; set; }\n";
                }
            }
        }
        this.csharp_text = result;
    };
    DtoConvertComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-dto-convert",
            template: __importDefault(__webpack_require__(/*! raw-loader!./dto-convert.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/dto-convert/dto-convert.component.html")).default
        }),
        __metadata("design:paramtypes", [])
    ], DtoConvertComponent);
    return DtoConvertComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/final-grade-calculator/final-grade-calculator.component.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/app/components/pages/applications/final-grade-calculator/final-grade-calculator.component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: FinalGradeCalculatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FinalGradeCalculatorComponent", function() { return FinalGradeCalculatorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _helpers_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../helpers/Helper */ "./src/app/helpers/Helper.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var FinalGradeCalculatorComponent = /** @class */ (function () {
    function FinalGradeCalculatorComponent() {
    }
    FinalGradeCalculatorComponent.prototype.ngOnInit = function () {
    };
    FinalGradeCalculatorComponent.prototype.calculate = function () {
        this.label = "";
        this.error = "";
        if (_helpers_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(this.currentGrade)
            || _helpers_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(this.finalPercentage)
            || _helpers_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(this.goal))
            this.error = "Please fill out all three textboxes before pressing the Submit button.";
        else {
            var requiredFinalGrade = this.finalGradeRequired(this.currentGrade * 0.01, this.finalPercentage * 0.01, this.goal * 0.01);
            var toGetGrade = this.finalGrade(this.currentGrade * 0.01, this.finalPercentage * 0.01, requiredFinalGrade * 0.0001);
            if ((requiredFinalGrade + "") === "NaN" || (toGetGrade + "") === "NaN")
                this.error = "Please enter only numbers.";
            else
                this.label = "You need a " + requiredFinalGrade / 100 + "% on the final"
                    + (" to get a grade of " + toGetGrade / 100 + "% in the class");
        }
    };
    FinalGradeCalculatorComponent.prototype.finalGradeRequired = function (currentGrade, finalPercentage, goal) {
        return Math.round(10000 * ((goal - (currentGrade * (1 - finalPercentage))) / finalPercentage));
    };
    FinalGradeCalculatorComponent.prototype.finalGrade = function (currentGrade, finalPercentage, requiredFinalGrade) {
        return Math.round(10000 * ((currentGrade * (1 - finalPercentage)) + (requiredFinalGrade * finalPercentage)));
    };
    FinalGradeCalculatorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-final-grade-calculator",
            template: __importDefault(__webpack_require__(/*! raw-loader!./final-grade-calculator.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/final-grade-calculator/final-grade-calculator.component.html")).default
        }),
        __metadata("design:paramtypes", [])
    ], FinalGradeCalculatorComponent);
    return FinalGradeCalculatorComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/group-creator/group-creator.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/components/pages/applications/group-creator/group-creator.component.ts ***!
  \****************************************************************************************/
/*! exports provided: GroupCreatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupCreatorComponent", function() { return GroupCreatorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var GroupCreatorComponent = /** @class */ (function () {
    function GroupCreatorComponent() {
        this.list = "";
        this.minPeople = 1;
        this.maxPeople = 3;
    }
    GroupCreatorComponent.prototype.ngOnInit = function () {
    };
    GroupCreatorComponent.prototype.shuffleArray = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };
    GroupCreatorComponent.prototype.myParseInt = function (num) {
        for (var i = 0; i < 500; i++) {
            if (num === i + "") {
                return i;
            }
        }
        return -1;
    };
    GroupCreatorComponent.prototype.generateList = function () {
        this.group();
    };
    // Written by Hanavan Kuhn
    // Copyright 2016
    GroupCreatorComponent.prototype.group = function () {
        // Initialize variables
        var names = this.list; // String of names from the names textbox
        var minsize = this.minPeople; // Minimum size of the group from the minsize textbox
        var maxsize = this.maxPeople; // Maximum size of the group from the maxsize textbox
        var result = ""; // Empty result string which is populated by the code and sent to the div tag
        var splitnames = names.split(","); // Split names by comma
        splitnames = this.shuffleArray(splitnames); // the one line added by Nathan Gawith
        var nameamount = splitnames.length; // Gets the length of the splitnames array
        var j = nameamount; // Temporary variable that stores the amount of names
        var groupnumber = 1; // Stores the current group number
        result += "<strong>Total names:</strong> " + nameamount + "<br /><br />"; // Writes some information to the result string
        while (j > 0) { // Continues looping until there are no names left
            var groupsize = Math.round(Math.random() * (maxsize - minsize)) + minsize; // Picks a group size based on the preset values
            console.log("Group size = " + groupsize + ", j = " + j); // Logs some stuff
            if (j - groupsize < 0) { // Checks if the random group size is larger than the amount of names left
                groupsize = j; // Sets the size of the group to the amount of remaining names
            }
            j -= groupsize; // Subtracts the size of the group from the list of names
            result += "<strong>Group " + groupnumber + ":</strong> "; // Writes the name of the group to the result string
            for (var i = 0; i < groupsize; i++) { // Iterates through the group members and writes them to the result string
                result += splitnames[j + i]; // Adds the name to the result string
                if (i < groupsize - 1) { // Checks if there needs to be a comma (for every name except for the last one)
                    result += ", "; // Adds a comma
                }
            }
            result += "<br />"; // Writes a new line to the result string
            groupnumber++; // Increases the group number by 1
        }
        this.output = result; // Writes the result to the page
    };
    GroupCreatorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-group-creator",
            template: __importDefault(__webpack_require__(/*! raw-loader!./group-creator.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/group-creator/group-creator.component.html")).default
        }),
        __metadata("design:paramtypes", [])
    ], GroupCreatorComponent);
    return GroupCreatorComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/html-sandbox/html-sandbox.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/components/pages/applications/html-sandbox/html-sandbox.component.ts ***!
  \**************************************************************************************/
/*! exports provided: HtmlSandboxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HtmlSandboxComponent", function() { return HtmlSandboxComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var HtmlSandboxComponent = /** @class */ (function () {
    function HtmlSandboxComponent() {
        this.html = "<html>\n\t<body>\n\t\t"
            + "<h1>this is a heading</h1>\n\t\t"
            + "<p>this is a paragraph</p>\n\t"
            + "<body>\n<html>";
    }
    HtmlSandboxComponent.prototype.ngOnInit = function () {
    };
    HtmlSandboxComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-html-sandbox",
            template: __importDefault(__webpack_require__(/*! raw-loader!./html-sandbox.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/html-sandbox/html-sandbox.component.html")).default
        }),
        __metadata("design:paramtypes", [])
    ], HtmlSandboxComponent);
    return HtmlSandboxComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/iframe-app.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/components/pages/applications/iframe-app.component.ts ***!
  \***********************************************************************/
/*! exports provided: IFrameAppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IFrameAppComponent", function() { return IFrameAppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var IFrameAppComponent = /** @class */ (function () {
    function IFrameAppComponent() {
    }
    IFrameAppComponent.prototype.ngOnInit = function () {
        document.getElementById("iframediv").innerHTML = "\n      <iframe src=\"" + this.src + "\" frameborder=\"0\" style=\"width:100%; height:60vh;\"></iframe>\n    ";
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], IFrameAppComponent.prototype, "src", void 0);
    IFrameAppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-iframe-app",
            template: "\n  <div id=\"iframediv\"></div>\n  <div>\n    You can open this application on it's own\n    <a [href]=\"src\">here</a>\n  </div>\n"
        }),
        __metadata("design:paramtypes", [])
    ], IFrameAppComponent);
    return IFrameAppComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/index.ts":
/*!********************************************************!*\
  !*** ./src/app/components/pages/applications/index.ts ***!
  \********************************************************/
/*! exports provided: BettingCalculatorComponent, DtoConvertComponent, FinalGradeCalculatorComponent, GroupCreatorComponent, HtmlSandboxComponent, MultiplicationTableComponent, Say2Component, TypingTestComponent, IFrameAppComponent, ApplicationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _betting_calculator_betting_calculator_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./betting-calculator/betting-calculator.component */ "./src/app/components/pages/applications/betting-calculator/betting-calculator.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BettingCalculatorComponent", function() { return _betting_calculator_betting_calculator_component__WEBPACK_IMPORTED_MODULE_0__["BettingCalculatorComponent"]; });

/* harmony import */ var _dto_convert_dto_convert_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dto-convert/dto-convert.component */ "./src/app/components/pages/applications/dto-convert/dto-convert.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DtoConvertComponent", function() { return _dto_convert_dto_convert_component__WEBPACK_IMPORTED_MODULE_1__["DtoConvertComponent"]; });

/* harmony import */ var _final_grade_calculator_final_grade_calculator_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./final-grade-calculator/final-grade-calculator.component */ "./src/app/components/pages/applications/final-grade-calculator/final-grade-calculator.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FinalGradeCalculatorComponent", function() { return _final_grade_calculator_final_grade_calculator_component__WEBPACK_IMPORTED_MODULE_2__["FinalGradeCalculatorComponent"]; });

/* harmony import */ var _group_creator_group_creator_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./group-creator/group-creator.component */ "./src/app/components/pages/applications/group-creator/group-creator.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupCreatorComponent", function() { return _group_creator_group_creator_component__WEBPACK_IMPORTED_MODULE_3__["GroupCreatorComponent"]; });

/* harmony import */ var _html_sandbox_html_sandbox_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./html-sandbox/html-sandbox.component */ "./src/app/components/pages/applications/html-sandbox/html-sandbox.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HtmlSandboxComponent", function() { return _html_sandbox_html_sandbox_component__WEBPACK_IMPORTED_MODULE_4__["HtmlSandboxComponent"]; });

/* harmony import */ var _multiplication_table_multiplication_table_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./multiplication-table/multiplication-table.component */ "./src/app/components/pages/applications/multiplication-table/multiplication-table.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiplicationTableComponent", function() { return _multiplication_table_multiplication_table_component__WEBPACK_IMPORTED_MODULE_5__["MultiplicationTableComponent"]; });

/* harmony import */ var _say2_say2_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./say2/say2.component */ "./src/app/components/pages/applications/say2/say2.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Say2Component", function() { return _say2_say2_component__WEBPACK_IMPORTED_MODULE_6__["Say2Component"]; });

/* harmony import */ var _typing_test_typing_test_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./typing-test/typing-test.component */ "./src/app/components/pages/applications/typing-test/typing-test.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypingTestComponent", function() { return _typing_test_typing_test_component__WEBPACK_IMPORTED_MODULE_7__["TypingTestComponent"]; });

/* harmony import */ var _iframe_app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./iframe-app.component */ "./src/app/components/pages/applications/iframe-app.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IFrameAppComponent", function() { return _iframe_app_component__WEBPACK_IMPORTED_MODULE_8__["IFrameAppComponent"]; });

/* harmony import */ var _applications_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./applications.component */ "./src/app/components/pages/applications/applications.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApplicationsComponent", function() { return _applications_component__WEBPACK_IMPORTED_MODULE_9__["ApplicationsComponent"]; });

var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};












/***/ }),

/***/ "./src/app/components/pages/applications/multiplication-table/multiplication-table.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/components/pages/applications/multiplication-table/multiplication-table.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: MultiplicationTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiplicationTableComponent", function() { return MultiplicationTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var MultiplicationTableComponent = /** @class */ (function () {
    function MultiplicationTableComponent() {
        this.traditionalOption = true;
        this.loading = false;
        this.multTableTraditional = [];
        this.multTableOther = [];
        this.multTable = [];
    }
    MultiplicationTableComponent.prototype.ngOnInit = function () {
        this.size = 12;
        this.generateTable(true);
        this.generateTable(false);
        this.loadTable();
    };
    MultiplicationTableComponent.prototype.getClass = function (i, j) {
        return (i === 0 || j === 0) ? "w3-gray" : ((i === j) ? "w3-gray" : "w3-light-gray");
    };
    MultiplicationTableComponent.prototype.loadTable = function () {
        this.loading = true;
        if (this.size <= 120) {
            this.multTable = [];
            for (var i = 0; i < Number(this.size) + (this.traditionalOption ? 2 : 0); i++) {
                var tempList = [];
                for (var j = 0; j < Number(this.size) + (this.traditionalOption ? 2 : 0); j++) {
                    if (this.traditionalOption)
                        tempList.push(this.multTableTraditional[i][j]);
                    else
                        tempList.push(this.multTableOther[i][j]);
                }
                tempList = tempList;
                this.multTable.push(tempList);
            }
            this.lastsize = this.size;
        }
        else if (this.size > 120) {
            this.size = 120;
            this.loadTable();
        }
        else {
            this.size = this.lastsize;
        }
        this.loading = false;
    };
    MultiplicationTableComponent.prototype.generateTable = function (traditional) {
        if (traditional)
            this.multTableTraditional = [];
        else
            this.multTableOther = [];
        for (var i = -1; i < 120 + 1; i++) {
            var tempList = [];
            for (var j = -1; j < 120 + 1; j++) {
                if (i === -1 && j === -1) {
                    if (traditional)
                        tempList.push("asdf");
                    else
                        tempList.push(1);
                }
                else if (i === 0 || j === 0 || i === 1 || j === 1) {
                    if (traditional) {
                        if (i === -1 || j === -1) {
                            if (i === -1)
                                tempList.push(j);
                            else if (j === -1)
                                tempList.push(i);
                        }
                        else
                            tempList.push(i * j);
                    }
                }
                else if (i === -1 || j === -1) {
                    if (i === -1)
                        tempList.push(j);
                    else if (j === -1)
                        tempList.push(i);
                }
                else
                    tempList.push(i * j);
            }
            tempList = tempList;
            if (tempList.length !== 0) {
                if (traditional)
                    this.multTableTraditional.push(tempList);
                else
                    this.multTableOther.push(tempList);
            }
        }
    };
    MultiplicationTableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-multiplication-table",
            template: __importDefault(__webpack_require__(/*! raw-loader!./multiplication-table.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/multiplication-table/multiplication-table.component.html")).default
        }),
        __metadata("design:paramtypes", [])
    ], MultiplicationTableComponent);
    return MultiplicationTableComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/say2/say2.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/components/pages/applications/say2/say2.component.ts ***!
  \**********************************************************************/
/*! exports provided: Say2Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Say2Component", function() { return Say2Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../node_modules/@angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _node_modules_angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/@angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



var Say2Component = /** @class */ (function () {
    function Say2Component(router, location) {
        this.router = router;
        this.location = location;
        this.numberLabel = "";
        this.t = ["", " one", " two", " three", " four", " five", " six", " seven",
            " eight", " nine", " ten", " eleven", " twelve", " thirteen", " fourteen",
            " fifteen", " sixteen", " seventeen", " eighteen", " nineteen", "", " ten",
            " twenty", " thirty", " fourty", " fifty", " sixty", " seventy", " eighty",
            " ninety", " hundred", "", " thousand", " million", " billion", " trillion"];
    }
    Say2Component.prototype.ngOnInit = function () {
    };
    Say2Component.prototype.log10 = function (val) {
        return Math.log(val) / Math.LN10;
    };
    Say2Component.prototype.calculate = function () {
        if (this.input > 999999999999999) {
            this.numberLabel = "number is too big";
        }
        else if (this.input < -999999999999999) {
            this.numberLabel = "number is too small";
        }
        else {
            this.numberLabel = ((this.input < 0) ? "negative" : "") + ((this.input === 0) ?
                "zero" : ((this.input < 0) ? this.say2(-1 * this.input) : this.say2(this.input)));
        }
    };
    Say2Component.prototype.say = function (num) {
        var resault = "";
        if (num > 19) {
            if (num > 99)
                resault += this.t[Math.floor(num / 100)] + " hundred";
            if (num % 100 < 20 && num % 100 > 0)
                resault += this.t[Math.floor(num % 100)];
            else {
                resault += this.t[(Math.floor((num % 100) / 10)) + 20];
                resault += this.t[Math.floor(num % 10)];
            }
        }
        else
            resault += this.t[num];
        return resault;
    };
    Say2Component.prototype.say2 = function (num) {
        var resault = "";
        var digits = Math.floor(this.log10(num)) + 1;
        var iterations = Math.floor(digits / 3) + ((digits % 3 === 0) ? 0 : 1);
        var parts = new Array(iterations);
        var divisor = Math.floor(Math.pow(10, ((iterations - 1) * 3)));
        for (var i = 0; i < iterations; i++) {
            parts[i] = Math.floor((num / divisor) % 1000);
            var part = this.say(parts[i]);
            resault += part + ((parts[i] === 0) ? "" : this.t[30 + iterations - i]);
            divisor /= 1000;
        }
        return resault;
    };
    Say2Component.ctorParameters = function () { return [
        { type: _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _node_modules_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"] }
    ]; };
    Say2Component = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-say2",
            template: __importDefault(__webpack_require__(/*! raw-loader!./say2.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/say2/say2.component.html")).default
        }),
        __metadata("design:paramtypes", [_node_modules_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _node_modules_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], Say2Component);
    return Say2Component;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/typing-test/typing-test.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/components/pages/applications/typing-test/typing-test.component.ts ***!
  \************************************************************************************/
/*! exports provided: TypingTestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypingTestComponent", function() { return TypingTestComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_helpers_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/helpers/Helper */ "./src/app/helpers/Helper.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var TypingTestComponent = /** @class */ (function () {
    function TypingTestComponent() {
        this.dummyparagraph = "Lorem ipsum dolor sit amet, consectetur adipiscing"
            + " elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            + " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi"
            + " ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
            + " in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur"
            + " sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt"
            + " mollit anim id est laborum.";
        this.customparagraph = "";
        this.paragraph = "";
        this.timerMinutes = 1;
        this.timerSeconds = 0;
        this.typingparagraph = "";
        this.disableTextBox = false;
        this.outputText = "";
        this.timerStarted = false;
        this.typedText = "";
        this.wrongtypedText = "";
        this.cursorText = "";
        this.untypedText = "";
        this.firstTry = true;
    }
    TypingTestComponent.prototype.ngOnInit = function () {
    };
    TypingTestComponent.prototype.replaceSpaces = function (str) {
        var typescript_non_breaking_space = String.fromCharCode(160);
        return src_app_helpers_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].replaceAll(str, "  ", " ");
    };
    TypingTestComponent.prototype.clockTick = function () {
        if (this.timerMinutes > 0 && this.timerSeconds === 0) {
            this.timerMinutes--;
            this.timerSeconds = 59;
        }
        else if (this.timerSeconds > 0) {
            this.timerSeconds--;
        }
        if (this.timerMinutes === 0 && this.timerSeconds === 0) {
            this.disableTextBox = true;
            var wpm = this.typedText.split(" ").length;
            if (this.cursorText !== " ")
                wpm -= 1;
            this.outputText = "You typed at " + wpm + " words per minute";
        }
    };
    TypingTestComponent.prototype.pad = function (num) {
        if (num < 10) {
            return "0" + num;
        }
        else
            return "" + num;
    };
    TypingTestComponent.prototype.correctPart = function () {
        var temp_typingparagraph = "";
        var temp_typedText = "";
        var temp_wrongtypedText = "";
        var wrongTextHit = false;
        this.typingparagraph = this.replaceSpaces(this.typingparagraph);
        for (var i = 0; i < this.typingparagraph.length; i++) {
            temp_typingparagraph += this.typingparagraph[i];
            if (!wrongTextHit && this.paragraph.startsWith(temp_typedText + this.typingparagraph[i])) {
                temp_typedText += this.typingparagraph[i];
            }
            else {
                wrongTextHit = true;
                temp_wrongtypedText += this.typingparagraph[i];
            }
        }
        this.typedText = temp_typedText;
        this.wrongtypedText = temp_wrongtypedText;
        this.untypedText = this.paragraph.substr(this.typedText.length + 1, this.paragraph.length);
        this.cursorText = this.paragraph[this.typedText.length];
    };
    TypingTestComponent.prototype.typingparagraphchanged = function () {
        var _this = this;
        if (!this.timerStarted) {
            this.timerStarted = true;
            if (this.firstTry) {
                this.firstTry = false;
                setInterval(function () {
                    if (_this.timerStarted) {
                        _this.clockTick();
                    }
                }, 1000);
            }
        }
        this.correctPart();
    };
    TypingTestComponent.prototype.submit = function () {
        this.paragraph = this.replaceSpaces(this.customparagraph + " ");
        this.untypedText = this.paragraph;
    };
    TypingTestComponent.prototype.restart = function () {
        this.typingparagraph = "";
        this.timerMinutes = 1;
        this.timerSeconds = 0;
        this.outputText = "";
        this.cursorText = "";
        this.typedText = "";
        this.wrongtypedText = "";
        this.untypedText = this.paragraph;
        this.timerStarted = false;
        this.disableTextBox = false;
    };
    TypingTestComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-typing-test",
            template: __importDefault(__webpack_require__(/*! raw-loader!./typing-test.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/applications/typing-test/typing-test.component.html")).default
        }),
        __metadata("design:paramtypes", [])
    ], TypingTestComponent);
    return TypingTestComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/github-projects/github-projects.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/components/pages/github-projects/github-projects.component.ts ***!
  \*******************************************************************************/
/*! exports provided: GithubProjectsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GithubProjectsComponent", function() { return GithubProjectsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helpers_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../helpers/Helper */ "./src/app/helpers/Helper.ts");
/* harmony import */ var src_app_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services */ "./src/app/services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




var GithubProjectsComponent = /** @class */ (function () {
    function GithubProjectsComponent(router, db) {
        this.router = router;
        this.db = db;
    }
    GithubProjectsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.db.connection().subscribe(function (db) {
            _helpers_Helper__WEBPACK_IMPORTED_MODULE_2__["Helper"].initializePage(_this, _this.router.url, _helpers_Helper__WEBPACK_IMPORTED_MODULE_2__["PageNames"].GITHUB_PROJECTS);
            var githubProjects = db.getGithubProjects();
            _this.description = githubProjects.description;
            _this.projects = githubProjects.subpages;
        });
    };
    GithubProjectsComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: src_app_services__WEBPACK_IMPORTED_MODULE_3__["DatabaseService"] }
    ]; };
    GithubProjectsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-github-projects",
            template: __importDefault(__webpack_require__(/*! raw-loader!./github-projects.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/github-projects/github-projects.component.html")).default
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            src_app_services__WEBPACK_IMPORTED_MODULE_3__["DatabaseService"]])
    ], GithubProjectsComponent);
    return GithubProjectsComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/home/home.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/pages/home/home.component.ts ***!
  \*********************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../helpers/Helper */ "./src/app/helpers/Helper.ts");
/* harmony import */ var src_app_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services */ "./src/app/services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





var HomeComponent = /** @class */ (function () {
    function HomeComponent(router, location, db) {
        this.router = router;
        this.location = location;
        this.db = db;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.db.connection().subscribe(function (db) {
            _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].initializePage(_this, _this.router.url, _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["PageNames"].HOME);
            var otherwebsites = db.getHome().otherwebsites;
            _this.friendLinks = otherwebsites.friends;
            _this.youtubeLinks = otherwebsites.youtube;
            _this.languageLinks = otherwebsites.languages;
            _this.toolLinks = otherwebsites.tools;
        });
    };
    HomeComponent.prototype.openLink = function (event, url) {
        if (event.which === 1) {
            location.href = url;
        }
        if (event.which === 2) {
            window.open(url);
        }
    };
    HomeComponent.prototype.openPage = function (event, page) {
        if (event.which === 1) {
            _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].navigate(this.router, this.location, page);
        }
        if (event.which === 2) {
            window.open(page);
        }
    };
    HomeComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"] },
        { type: src_app_services__WEBPACK_IMPORTED_MODULE_4__["DatabaseService"] }
    ]; };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-home",
            template: __importDefault(__webpack_require__(/*! raw-loader!./home.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/home/home.component.html")).default
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            src_app_services__WEBPACK_IMPORTED_MODULE_4__["DatabaseService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/home/list-of-links/list-of-links.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/components/pages/home/list-of-links/list-of-links.component.ts ***!
  \********************************************************************************/
/*! exports provided: ListOfLinksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListOfLinksComponent", function() { return ListOfLinksComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var ListOfLinksComponent = /** @class */ (function () {
    function ListOfLinksComponent() {
        this.click = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    ListOfLinksComponent.prototype.ngOnInit = function () { };
    ListOfLinksComponent.prototype.openLink = function (event, url) {
        this.click.next({ key: event, value: url });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], ListOfLinksComponent.prototype, "links", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"])
    ], ListOfLinksComponent.prototype, "click", void 0);
    ListOfLinksComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-list-of-links",
            template: __importDefault(__webpack_require__(/*! raw-loader!./list-of-links.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/home/list-of-links/list-of-links.component.html")).default
        })
    ], ListOfLinksComponent);
    return ListOfLinksComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/index.ts":
/*!*******************************************!*\
  !*** ./src/app/components/pages/index.ts ***!
  \*******************************************/
/*! exports provided: HomeComponent, ListOfLinksComponent, VideosComponent, GithubProjectsComponent, BettingCalculatorComponent, DtoConvertComponent, FinalGradeCalculatorComponent, GroupCreatorComponent, HtmlSandboxComponent, MultiplicationTableComponent, Say2Component, TypingTestComponent, IFrameAppComponent, ApplicationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _applications_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applications/index */ "./src/app/components/pages/applications/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BettingCalculatorComponent", function() { return _applications_index__WEBPACK_IMPORTED_MODULE_0__["BettingCalculatorComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DtoConvertComponent", function() { return _applications_index__WEBPACK_IMPORTED_MODULE_0__["DtoConvertComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FinalGradeCalculatorComponent", function() { return _applications_index__WEBPACK_IMPORTED_MODULE_0__["FinalGradeCalculatorComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupCreatorComponent", function() { return _applications_index__WEBPACK_IMPORTED_MODULE_0__["GroupCreatorComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HtmlSandboxComponent", function() { return _applications_index__WEBPACK_IMPORTED_MODULE_0__["HtmlSandboxComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiplicationTableComponent", function() { return _applications_index__WEBPACK_IMPORTED_MODULE_0__["MultiplicationTableComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Say2Component", function() { return _applications_index__WEBPACK_IMPORTED_MODULE_0__["Say2Component"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypingTestComponent", function() { return _applications_index__WEBPACK_IMPORTED_MODULE_0__["TypingTestComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IFrameAppComponent", function() { return _applications_index__WEBPACK_IMPORTED_MODULE_0__["IFrameAppComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApplicationsComponent", function() { return _applications_index__WEBPACK_IMPORTED_MODULE_0__["ApplicationsComponent"]; });

/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home/home.component */ "./src/app/components/pages/home/home.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return _home_home_component__WEBPACK_IMPORTED_MODULE_1__["HomeComponent"]; });

/* harmony import */ var _home_list_of_links_list_of_links_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home/list-of-links/list-of-links.component */ "./src/app/components/pages/home/list-of-links/list-of-links.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ListOfLinksComponent", function() { return _home_list_of_links_list_of_links_component__WEBPACK_IMPORTED_MODULE_2__["ListOfLinksComponent"]; });

/* harmony import */ var _videos_videos_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./videos/videos.component */ "./src/app/components/pages/videos/videos.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideosComponent", function() { return _videos_videos_component__WEBPACK_IMPORTED_MODULE_3__["VideosComponent"]; });

/* harmony import */ var _github_projects_github_projects_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./github-projects/github-projects.component */ "./src/app/components/pages/github-projects/github-projects.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GithubProjectsComponent", function() { return _github_projects_github_projects_component__WEBPACK_IMPORTED_MODULE_4__["GithubProjectsComponent"]; });

var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







/***/ }),

/***/ "./src/app/components/pages/videos/videos.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/pages/videos/videos.component.ts ***!
  \*************************************************************/
/*! exports provided: VideosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideosComponent", function() { return VideosComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helpers_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../helpers/Helper */ "./src/app/helpers/Helper.ts");
/* harmony import */ var _node_modules_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/@angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var src_app_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services */ "./src/app/services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





var Video = /** @class */ (function () {
    function Video() {
    }
    return Video;
}());
var VideosComponent = /** @class */ (function () {
    function VideosComponent(router, sanitizer, db) {
        this.router = router;
        this.sanitizer = sanitizer;
        this.db = db;
        this.videos = [];
    }
    VideosComponent.prototype.ngOnInit = function () {
        var _this = this;
        var getSanatized = function (link) { return _this.sanitizer.bypassSecurityTrustResourceUrl(link); };
        this.db.connection().subscribe(function (db) {
            _helpers_Helper__WEBPACK_IMPORTED_MODULE_2__["Helper"].initializePage(_this, _this.router.url, _helpers_Helper__WEBPACK_IMPORTED_MODULE_2__["PageNames"].VIDEOS);
            var dbVideos = db.getVideos();
            console.log("dbVideos");
            console.log(dbVideos);
            _this.videos = dbVideos.map(function (v) {
                return {
                    title: v["title"],
                    link: getSanatized("https://www.youtube.com/embed/" + v["link"]),
                    description: v["description"],
                    preview: v["preview"],
                    enabled: false
                };
            });
        });
    };
    VideosComponent.prototype.getColumns = function () {
        var el = document.getElementById("videoGrid");
        var width = el ? el.offsetWidth : window.innerWidth;
        var result = Math.max(Math.floor(width / 340), 1);
        return result;
    };
    VideosComponent.prototype.getYoutubeLink = function (sanatizedLink) {
        var link = sanatizedLink["changingThisBreaksApplicationSecurity"];
        var urlParts = (link + "/").split("/");
        var id = urlParts[urlParts.length >= 2 ? urlParts.length - 2 : urlParts.length - 1];
        var result = "https://www.youtube.com/watch?v=" + id;
        return result;
    };
    VideosComponent.prototype.btnThumbnail = function (video) {
        this.videos.forEach(function (x) { return x.enabled = false; });
        video.enabled = true;
    };
    VideosComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _node_modules_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"] },
        { type: src_app_services__WEBPACK_IMPORTED_MODULE_4__["DatabaseService"] }
    ]; };
    VideosComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-videos",
            template: __importDefault(__webpack_require__(/*! raw-loader!./videos.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/pages/videos/videos.component.html")).default
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _node_modules_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"],
            src_app_services__WEBPACK_IMPORTED_MODULE_4__["DatabaseService"]])
    ], VideosComponent);
    return VideosComponent;
}());



/***/ }),

/***/ "./src/app/helpers/DB.ts":
/*!*******************************!*\
  !*** ./src/app/helpers/DB.ts ***!
  \*******************************/
/*! exports provided: DB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DB", function() { return DB; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var DB = /** @class */ (function () {
    function DB(afdb, database) {
        this.afdb = afdb;
        this.database = database;
        if (database) {
            this.db = database;
            this.applications = this.db.home.pages[0];
            this.videos = this.db.home.pages[1].subpages[0]["videos"];
            this.githubProjects = this.db.home.pages[1].subpages[1];
            console.log(database);
        }
    }
    DB.prototype.getDB = function () {
        var _this = this;
        return this.afdb.list("/").valueChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (resp) {
            return new DB(_this.afdb, resp[0]);
        }));
    };
    // public getFile(): Observable<any> {
    //  return this.
    // }
    DB.prototype.getRedirects = function () {
        return this.db.home.otherwebsites.redirects;
    };
    DB.prototype.getHome = function () {
        return this.db.home;
    };
    DB.prototype.getPages = function () {
        return this.db.home.pages;
    };
    DB.prototype.getApplications = function () {
        return this.applications;
    };
    DB.prototype.getJavaApplications = function () {
        return this.applications.subpages[0];
    };
    DB.prototype.getWebApplications = function () {
        return this.applications.subpages[1];
    };
    DB.prototype.getAndroidApplications = function () {
        return this.applications.subpages[2];
    };
    DB.prototype.getVideos = function () {
        return this.videos;
    };
    DB.prototype.getGithubProjects = function () {
        return this.githubProjects;
    };
    return DB;
}());

var ApplicationType = /** @class */ (function () {
    function ApplicationType() {
    }
    return ApplicationType;
}());
var ResourceType = /** @class */ (function () {
    function ResourceType() {
    }
    return ResourceType;
}());
var PageType = /** @class */ (function () {
    function PageType() {
    }
    return PageType;
}());
var DBtype = /** @class */ (function () {
    function DBtype() {
    }
    return DBtype;
}());


/***/ }),

/***/ "./src/app/helpers/Helper.ts":
/*!***********************************!*\
  !*** ./src/app/helpers/Helper.ts ***!
  \***********************************/
/*! exports provided: Constants, PageNames, StatusCodes, Helper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageNames", function() { return PageNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusCodes", function() { return StatusCodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Helper", function() { return Helper; });
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.currentComponent = null;
    Constants.currentPageURL = "";
    Constants.currentPage = "";
    Constants.appToOpen = "";
    Constants.dev = false;
    return Constants;
}());

var PageNames;
(function (PageNames) {
    PageNames["SITE_TITLE"] = "NathanGawith";
    PageNames["HOME"] = "Home";
    PageNames["APPLICATIONS"] = "Applications";
    PageNames["APPLICATIONS_JAVA"] = "Java Applications";
    PageNames["APPLICATIONS_WEB"] = "Web Applications";
    PageNames["APPLICATIONS_ANDROID"] = "Android Applications";
    PageNames["GITHUB_PROJECTS"] = "Github Projects";
    PageNames["VIDEOS"] = "Videos";
})(PageNames || (PageNames = {}));
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["OK"] = 200] = "OK";
    StatusCodes[StatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
})(StatusCodes || (StatusCodes = {}));
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.flatten2dArray = function (array) {
        var result = [];
        array.forEach(function (arr) { return arr.forEach(function (val) { return result.push(val); }); });
        return result;
    };
    Helper.replaceAll = function (str, replace, replacement) {
        if (str.indexOf(replace) !== -1) {
            return this.replaceAll(str.replace(replace, replacement), replace, replacement);
        }
        return str;
    };
    Helper.equalsNull = function (obj) {
        if (obj === null || obj === undefined || obj === "")
            return true;
        else
            return false;
    };
    Helper.initializePage = function (component, pageURL, page) {
        Constants.currentComponent = component;
        Constants.currentPageURL = pageURL;
        Constants.currentPage = page;
        document.title = PageNames.SITE_TITLE + " | " + page;
    };
    Helper.navigateTo = function (router, location, url, queryparams) {
        if (url === ["/"]) {
            url = ["/home"];
        }
        /*if(url[0].includes("application")
        && queryparams["queryParams"]["subpage"] != undefined
        && queryparams["queryParams"]["appName"] == undefined
        && Constants.currentPageURL.includes("application")) {*/
        setTimeout(function () {
            router.navigate(["/not-found"]);
        }, 0);
        /*}*/
        setTimeout(function () {
            router.navigate(url, queryparams);
        }, 0);
        /*
        router.navigate(["/not-found"]);
        router.navigate(url, queryparams);
        */
    };
    Helper.navigate = function (router, location, url) {
        router.navigate([url]);
    };
    return Helper;
}());



/***/ }),

/***/ "./src/app/material.module.ts":
/*!************************************!*\
  !*** ./src/app/material.module.ts ***!
  \************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm5/tabs.es5.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/esm5/expansion.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatMenuModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatToolbarModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDividerModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginatorModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSortModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatAutocompleteModule"],
                _angular_material_expansion__WEBPACK_IMPORTED_MODULE_2__["MatExpansionModule"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_1__["MatTabsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatListModule"]
            ],
            exports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatMenuModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatToolbarModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDividerModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginatorModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSortModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatAutocompleteModule"],
                _angular_material_expansion__WEBPACK_IMPORTED_MODULE_2__["MatExpansionModule"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_1__["MatTabsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatListModule"]
            ]
        })
    ], MaterialModule);
    return MaterialModule;
}());



/***/ }),

/***/ "./src/app/services/database.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/database.service.ts ***!
  \**********************************************/
/*! exports provided: DatabaseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatabaseService", function() { return DatabaseService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _helpers_DB__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/DB */ "./src/app/helpers/DB.ts");
/* harmony import */ var angularfire2_database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angularfire2/database */ "./node_modules/angularfire2/database/index.js");
/* harmony import */ var angularfire2_database__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angularfire2_database__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



var DatabaseService = /** @class */ (function () {
    function DatabaseService(afdb) {
        this.afdb = afdb;
    }
    DatabaseService.prototype.connection = function () {
        return new _helpers_DB__WEBPACK_IMPORTED_MODULE_1__["DB"](this.afdb).getDB();
    };
    DatabaseService.ctorParameters = function () { return [
        { type: angularfire2_database__WEBPACK_IMPORTED_MODULE_2__["AngularFireDatabase"] }
    ]; };
    DatabaseService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [angularfire2_database__WEBPACK_IMPORTED_MODULE_2__["AngularFireDatabase"]])
    ], DatabaseService);
    return DatabaseService;
}());



/***/ }),

/***/ "./src/app/services/index.ts":
/*!***********************************!*\
  !*** ./src/app/services/index.ts ***!
  \***********************************/
/*! exports provided: DatabaseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _database_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./database.service */ "./src/app/services/database.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatabaseService", function() { return _database_service__WEBPACK_IMPORTED_MODULE_0__["DatabaseService"]; });

var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
var environment = {
    production: true,
    firebase: {
        apiKey: "AIzaSyBe2_w07h5GQebC9wuUJUOQgyTptX59XnY",
        authDomain: "nate314-5a6e0.firebaseapp.com",
        databaseURL: "https://nate314-5a6e0.firebaseio.com",
        projectId: "nate314-5a6e0",
        storageBucket: "nate314-5a6e0.appspot.com",
        messagingSenderId: "22304061185",
        appId: "1:22304061185:web:3950005c3b6f0b5f9f0d00",
        measurementId: "G-WS28NLT2KP"
    }
};
/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Natha\Documents\Development\Angular\site\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map