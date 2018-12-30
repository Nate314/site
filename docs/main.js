(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

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
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes */ "./src/app/routes.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(_routes__WEBPACK_IMPORTED_MODULE_0__["routes"])],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
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
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _components_pages_home_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/pages/home/home.component */ "./src/app/components/pages/home/home.component.ts");
/* harmony import */ var _components_pages_videos_videos_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/pages/videos/videos.component */ "./src/app/components/pages/videos/videos.component.ts");
/* harmony import */ var _components_application_structure_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/application-structure/index */ "./src/app/components/application-structure/index.ts");
/* harmony import */ var _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/pages/applications/index */ "./src/app/components/pages/applications/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_pages_applications_typing_test_typing_test_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/pages/applications/typing-test/typing-test.component */ "./src/app/components/pages/applications/typing-test/typing-test.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _components_application_structure_index__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
                _components_application_structure_index__WEBPACK_IMPORTED_MODULE_7__["NavbarComponent"],
                _components_application_structure_index__WEBPACK_IMPORTED_MODULE_7__["NotFoundComponent"],
                _components_pages_home_home_component__WEBPACK_IMPORTED_MODULE_5__["HomeComponent"],
                _components_application_structure_index__WEBPACK_IMPORTED_MODULE_7__["FooterComponent"],
                _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_8__["ApplicationsComponent"],
                _components_pages_videos_videos_component__WEBPACK_IMPORTED_MODULE_6__["VideosComponent"],
                _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_8__["MultiplicationTableComponent"],
                _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_8__["FinalGradeCalculatorComponent"],
                _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_8__["BettingCalculatorComponent"],
                _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_8__["Say2Component"],
                _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_8__["GroupCreatorComponent"],
                _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_8__["HtmlSandboxComponent"],
                _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_8__["ColorFluxComponent"],
                _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_8__["FlappyFinchComponent"],
                _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_8__["FloatyStarsComponent"],
                _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_8__["GradeCalculatorComponent"],
                _components_pages_applications_typing_test_typing_test_component__WEBPACK_IMPORTED_MODULE_10__["TypingTestComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"]
            ],
            providers: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]],
            bootstrap: [_components_application_structure_index__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/application-structure/app-component/app.component.css":
/*!**********************************************************************************!*\
  !*** ./src/app/components/application-structure/app-component/app.component.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/application-structure/app-component/app.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/components/application-structure/app-component/app.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!webapplication\">\n    <app-navbar></app-navbar>\n    <br /><br />\n    <div style=\"height:10px;\"></div>\n    <div class=\"container\">\n        <router-outlet></router-outlet>\n    </div>\n    <br /><br />\n    <br /><br />\n    <app-footer></app-footer>\n</div>\n<div *ngIf=\"webapplication\">\n    <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "./src/app/components/application-structure/app-component/app.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/components/application-structure/app-component/app.component.ts ***!
  \*********************************************************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/@angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _node_modules_angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/@angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(router, location) {
        this.router = router;
        this.location = location;
        this.webapplication = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            if (event instanceof _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]) {
                if (event.url.toLocaleLowerCase().includes("webapplications")
                    && !event.url.toLocaleLowerCase().includes("nathangawithwebsite"))
                    _this.webapplication = true;
            }
        });
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-root",
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/components/application-structure/app-component/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/components/application-structure/app-component/app.component.css")]
        }),
        __metadata("design:paramtypes", [_node_modules_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _node_modules_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/components/application-structure/footer/footer.component.css":
/*!******************************************************************************!*\
  !*** ./src/app/components/application-structure/footer/footer.component.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/application-structure/footer/footer.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/components/application-structure/footer/footer.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"border\" style=\"position:fixed; left:0; bottom:0; width: 100%; background-color:#343a40\">\n  <span class=\"w3-text-white\">&nbsp;&nbsp;nate314.github.io{{ url() }}</span>\n</footer>\n"

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
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FooterComponent = /** @class */ (function () {
    function FooterComponent(router, location) {
        this.router = router;
        this.location = location;
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent.prototype.url = function (url) {
        return this.router.url;
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-footer",
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/components/application-structure/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/components/application-structure/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/components/application-structure/index.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/application-structure/index.ts ***!
  \***********************************************************/
/*! exports provided: NotFoundComponent, AppComponent, FooterComponent, NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not-found/not-found.component */ "./src/app/components/application-structure/not-found/not-found.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotFoundComponent", function() { return _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_0__["NotFoundComponent"]; });

/* harmony import */ var _app_component_app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-component/app.component */ "./src/app/components/application-structure/app-component/app.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return _app_component_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]; });

/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/components/application-structure/footer/footer.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return _footer_footer_component__WEBPACK_IMPORTED_MODULE_2__["FooterComponent"]; });

/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/components/application-structure/navbar/navbar.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_3__["NavbarComponent"]; });







/***/ }),

/***/ "./src/app/components/application-structure/navbar/navbar.component.css":
/*!******************************************************************************!*\
  !*** ./src/app/components/application-structure/navbar/navbar.component.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/application-structure/navbar/navbar.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/components/application-structure/navbar/navbar.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-sm bg-dark w3-text-white\" style=\"position:fixed; left:0; top:0; width:100%;\">\n<a class=\"navbar-brand w3-text-white\">NathanGawith</a>\n<button class=\"navbar-toggler navbar-dark\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\" style=\"color:white\">\n    <span class=\"navbar-toggler-icon\"></span>\n</button>\n    <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n        <ul class=\"navbar-nav mr-auto\">\n            <li *ngFor=\"let page of pages\" class=\"nav-item\" [ngClass]=\"isSelected(page) ? 'w3-blue' : ''\">\n                <a class=\"nav-link w3-text-white w3-hover-gray w3-hover-text-black\" (click)=\"goTo(page.link)\" style=\"cursor:pointer;\">\n                    &nbsp;&nbsp;{{ page.name }}&nbsp;&nbsp;\n                </a>\n            </li>\n        </ul>\n    </div>\n</nav>\n"

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
/* harmony import */ var _modules_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../modules/Helper */ "./src/app/modules/Helper.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
        this.pages.push({ link: "/videos", name: "Videos" });
    };
    NavbarComponent.prototype.goTo = function (url) {
        _modules_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].navigate(this.router, this.location, url);
        // location.href = url;
    };
    NavbarComponent.prototype.isSelected = function (page) {
        if (_modules_Helper__WEBPACK_IMPORTED_MODULE_3__["Constants"].currentPageURL.includes(page.link))
            return true;
        else
            return false;
    };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-navbar",
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/components/application-structure/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.css */ "./src/app/components/application-structure/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/components/application-structure/not-found/not-found.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/components/application-structure/not-found/not-found.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/application-structure/not-found/not-found.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/components/application-structure/not-found/not-found.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"loaded\">\n  ¯\\_(ツ)_/¯ NOT FOUND\n</div>\n"

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
/* harmony import */ var _node_modules_angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/@angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/@angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent(router, location) {
        this.router = router;
        this.location = location;
        this.loaded = false;
    }
    NotFoundComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.loaded = true; }, 200);
    };
    NotFoundComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-not-found",
            template: __webpack_require__(/*! ./not-found.component.html */ "./src/app/components/application-structure/not-found/not-found.component.html"),
            styles: [__webpack_require__(/*! ./not-found.component.css */ "./src/app/components/application-structure/not-found/not-found.component.css")]
        }),
        __metadata("design:paramtypes", [_node_modules_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _node_modules_angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"]])
    ], NotFoundComponent);
    return NotFoundComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/applications.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/components/pages/applications/applications.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/pages/applications/applications.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/components/pages/applications/applications.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--Applications-->\n<div *ngIf=\"!webAppURL && apps.length == 0\" class=\"container\">\n  <div *ngFor=\"let page of subpages\" class=\"border border-top-0 border-left-0 border-right-0\">\n    <h1>{{ page.name }}</h1>\n    <span [innerHTML]=\"page.description\"></span>\n    <a class=\"hyperlink w3-hover-text-purple\" [routerLink]=\"[page.link]\">here</a>.\n    <br />\n    <span *ngFor=\"let app of page.apps; let i = index\">\n      <a *ngIf=\"page.name.toUpperCase().startsWith('JAVA')\" (click)=\"openJavaApp(app)\"\n      class=\"hyperlink w3-hover-text-purple\">{{ app.name }}</a>\n      <a *ngIf=\"page.name.toUpperCase().startsWith('WEB')\" (click)=\"openWebApp(app, true)\"\n      class=\"hyperlink w3-hover-text-purple\">{{ app.name }}</a>\n      <a *ngIf=\"page.name.toUpperCase().startsWith('ANDROID')\" (click)=\"openAndroidApp(app)\"\n      class=\"hyperlink w3-hover-text-purple\">{{ app.name }}</a>\n      <span *ngIf=\"i !== page.apps.length - 1 && i != page.apps.length - 2\">, </span>\n      <span *ngIf=\"i === page.apps.length - 2\">, and </span>\n      <span *ngIf=\"i === page.apps.length - 1\">. </span>\n    </span>\n  </div>\n</div>\n<!--/Applications-->\n\n<!--Applications/Subpage-->\n<div *ngIf=\"!webAppOpen && pageName != null\">\n  <h1 class=\"border border-top-0 border-left-0 border-right-0\">{{ pageName }}</h1>\n  <div *ngFor=\"let app of apps\" class=\"border border-top-0 border-left-0 border-right-0\">\n    <h3>{{ app.name }}</h3>\n    <span [innerHtml]=\"app.description\"></span>\n    <br />\n    <span *ngIf=\"pageName.toUpperCase().startsWith('JAVA')\">\n      <b>Download</b>&nbsp;\n      <a class=\"hyperlink w3-hover-text-purple\" (click)=\"openJavaApp(app)\">{{ app.name }}</a>\n    </span>\n    <span *ngIf=\"pageName.toUpperCase().startsWith('WEB')\">\n      <b>Go to</b>&nbsp;\n      <a class=\"hyperlink w3-hover-text-purple\" (click)=\"openWebApp(app, true)\">{{ app.name }}</a>\n    </span>\n    <span *ngIf=\"pageName.toUpperCase().startsWith('ANDROID')\">\n      <b>Download</b>&nbsp;\n      <a class=\"hyperlink w3-hover-text-purple\" (click)=\"openAndroidApp(app)\">{{ app.name }}</a>\n    </span>\n  </div>\n</div>\n<!--/Applications/Subpage-->\n\n<!--Applications/Subpage/App-->\n<div id=\"appContent\"></div>\n<div id=\"appDescription\"></div>\n<!--Applications/Subpage/App-->\n"

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
/* harmony import */ var _modules_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../modules/Helper */ "./src/app/modules/Helper.ts");
/* harmony import */ var _modules_DB__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../modules/DB */ "./src/app/modules/DB.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
    function ApplicationsComponent(router, location, activatedRoute) {
        this.router = router;
        this.location = location;
        this.activatedRoute = activatedRoute;
        // Applications
        this.subpages = [];
        this.apps = [];
        // Applications/Subpage/App
        this.webAppOpen = false;
    }
    ApplicationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // load information about all applications from the database
        this.javaApplications = _modules_DB__WEBPACK_IMPORTED_MODULE_4__["DB"].dbApplications.getJavaApplications();
        this.webApplications = _modules_DB__WEBPACK_IMPORTED_MODULE_4__["DB"].dbApplications.getWebApplications();
        this.androidApplications = _modules_DB__WEBPACK_IMPORTED_MODULE_4__["DB"].dbApplications.getAndroidApplications();
        this.subpages.push({
            name: this.javaApplications["name"],
            link: "../" + this.javaApplications["link"],
            description: this.javaApplications["description"],
            apps: this.javaApplications["apps"]
        });
        this.subpages.push({
            name: this.webApplications["name"],
            link: "../" + this.webApplications["link"],
            description: this.webApplications["description"],
            apps: this.webApplications["apps"]
        });
        this.subpages.push({
            name: this.androidApplications["name"],
            link: "../" + this.androidApplications["link"],
            description: this.androidApplications["description"],
            apps: this.androidApplications["apps"]
        });
        // load different sections of the page based on the url
        var validSubpages = ["java", "web", "android"];
        this.activatedRoute.url.subscribe(function (response) {
            // get the subpage
            var validSubpage = response.filter(function (x) { return lodash__WEBPACK_IMPORTED_MODULE_5__["includes"](validSubpages, x.path); });
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
        if (!_modules_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].equalsNull(this.webApp))
            this.openWebApp(this.getApp(this.webApplications["apps"], this.webApp.name), false);
        // initialize page
        var pageTitle = String(_modules_Helper__WEBPACK_IMPORTED_MODULE_3__["PageNames"].APPLICATIONS);
        if (!_modules_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].equalsNull(this.pageName))
            pageTitle += " | " + this.pageName;
        if (!_modules_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].equalsNull(this.webApp))
            pageTitle += " | " + this.webApp.name;
        _modules_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].initializePage(this, this.router.url, pageTitle);
    };
    ApplicationsComponent.prototype.getApp = function (appList, appName) {
        var appToOpen = appList.filter(function (application) { return application.name.toLowerCase() === appName.toLowerCase(); });
        if (appToOpen.length > 0)
            return appToOpen[0];
        return null;
    };
    ApplicationsComponent.prototype.open = function (url) {
        _modules_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].navigate(this.router, this.location, url);
    };
    ApplicationsComponent.prototype.openWebApp = function (app, href) {
        if (href) {
            _modules_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].navigate(this.router, this.location, "/applications/web/" + app.name);
            // location.href = "/applications/web/" + app.name;
        }
        else {
            if (!_modules_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].equalsNull(app)) {
                // set url
                var iFrameURL = app.file;
                if (!iFrameURL.includes("https://nate314.github.io/"))
                    iFrameURL = "https://nate314.github.io/site/" + app.file;
                // iFrameURL = "http://localhost:4200/" + app.file;
                // // send to app
                // if (Helper.equalsNull(this.webApp.name))
                //   Helper.navigateTo(this.router, this.location, ["/applications"],
                //     { queryParams: { subpage: "web", appName: app.name }});
                // open app
                this.webApp.file = iFrameURL;
                this.webAppOpen = true;
                var iframe = "<iframe src=\"" + iFrameURL + "\" frameborder=\"0\" style=\"width:100%; height:60vh;\"></iframe>";
                document.getElementById("appContent").innerHTML = iframe;
                document.getElementById("appDescription").innerHTML = app.description;
            }
        }
    };
    ApplicationsComponent.prototype.openJavaApp = function (app) {
        var url = app.file;
        if (!url.includes("https://nate314.github.io/nathangawith/applications/javaApplications/"))
            url = "https://nate314.github.io/nathangawith/applications/javaApplications/" + app.file;
        location.href = url;
    };
    ApplicationsComponent.prototype.openAndroidApp = function (app) {
        var url = app.file;
        if (!url.includes("https://nate314.github.io/nathangawith/applications/androidApplications/"))
            url = "https://nate314.github.io/nathangawith/applications/androidApplications/" + app.file;
        location.href = url;
    };
    ApplicationsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-applications",
            template: __webpack_require__(/*! ./applications.component.html */ "./src/app/components/pages/applications/applications.component.html"),
            styles: [__webpack_require__(/*! ./applications.component.css */ "./src/app/components/pages/applications/applications.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], ApplicationsComponent);
    return ApplicationsComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/betting-calculator/betting-calculator.component.css":
/*!***************************************************************************************************!*\
  !*** ./src/app/components/pages/applications/betting-calculator/betting-calculator.component.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/pages/applications/betting-calculator/betting-calculator.component.html":
/*!****************************************************************************************************!*\
  !*** ./src/app/components/pages/applications/betting-calculator/betting-calculator.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<br />\n<div class=\"row\">\n  <div class=\"col-2\">\n    There&nbsp;are\n  </div>\n  <div class=\"col-5\">\n    <input type=\"number\" [(ngModel)]=\"players\" style=\"width:100%;\"\n      (keyup)=\"setUpTable()\" (change)=\"setUpTable()\" value=\"2\" />\n  </div>\n  <div class=\"col-4\">\n    <input type=\"text\" [(ngModel)]=\"playerName\" style=\"width:100%;\"\n      (keyup)=\"setUpTable()\" (change)=\"setUpTable()\" value=\"Horse\" />\n  </div>\n  <div class=\"col-1\">\n    s\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-2\">\n    There&nbsp;are\n  </div>\n  <div class=\"col-5\">\n    <input type=\"number\" [(ngModel)]=\"humans\" style=\"width:100%;\"\n      (keyup)=\"setUpTable()\" (change)=\"setUpTable()\" value=\"2\" />\n  </div>\n  <div class=\"col-5\">\n    Humans\n  </div>\n</div>\n<br />\n<!-- Top row (Horse Labels) -->\n<div class=\"row\">\n  <div class=\"col-2\">\n    &nbsp;\n  </div>\n  <div class=\"col-2\" *ngFor=\"let i of playerIndecies\">\n    {{ playerName + \"&nbsp;\" + i }}\n  </div>\n</div>\n<!-- Middle rows (Human Labels and textboxes) -->\n<div class=\"row border border-secondary\" *ngFor=\"let i of humanIndecies\">\n  <div class=\"col-2\">\n    {{ \"Human&nbsp;\" + i }}\n  </div>\n  <div class=\"col-2\" *ngFor=\"let j of playerIndecies\">\n    <input type=\"number\" style=\"width:100%;\" [(ngModel)]=\"grid[i - 1][j - 1]\"/>\n  </div>\n</div>\n<!-- Bottom row (Buttons) -->\n<div class=\"row\">\n  <div class=\"col-2\">\n    &nbsp;\n  </div>\n  <div class=\"col-2\" *ngFor=\"let i of playerIndecies\">\n    <button class=\"btn\" (click)=\"playerWon(i)\">\n      {{ playerName + \"&nbsp;\" + i + \"&nbsp;\" + \"won\" }}\n    </button>\n  </div>\n</div>\n<p [innerHtml]=\"output\"></p>\n"

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
            template: __webpack_require__(/*! ./betting-calculator.component.html */ "./src/app/components/pages/applications/betting-calculator/betting-calculator.component.html"),
            styles: [__webpack_require__(/*! ./betting-calculator.component.css */ "./src/app/components/pages/applications/betting-calculator/betting-calculator.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], BettingCalculatorComponent);
    return BettingCalculatorComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/color-flux/color-flux.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/components/pages/applications/color-flux/color-flux.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/pages/applications/color-flux/color-flux.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/components/pages/applications/color-flux/color-flux.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  color-flux works!\n</p>\n"

/***/ }),

/***/ "./src/app/components/pages/applications/color-flux/color-flux.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/components/pages/applications/color-flux/color-flux.component.ts ***!
  \**********************************************************************************/
/*! exports provided: ColorFluxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorFluxComponent", function() { return ColorFluxComponent; });
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

var ColorFluxComponent = /** @class */ (function () {
    function ColorFluxComponent() {
    }
    ColorFluxComponent.prototype.ngOnInit = function () {
    };
    ColorFluxComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-color-flux",
            template: __webpack_require__(/*! ./color-flux.component.html */ "./src/app/components/pages/applications/color-flux/color-flux.component.html"),
            styles: [__webpack_require__(/*! ./color-flux.component.css */ "./src/app/components/pages/applications/color-flux/color-flux.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ColorFluxComponent);
    return ColorFluxComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/final-grade-calculator/final-grade-calculator.component.css":
/*!***********************************************************************************************************!*\
  !*** ./src/app/components/pages/applications/final-grade-calculator/final-grade-calculator.component.css ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/pages/applications/final-grade-calculator/final-grade-calculator.component.html":
/*!************************************************************************************************************!*\
  !*** ./src/app/components/pages/applications/final-grade-calculator/final-grade-calculator.component.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<br />\n<div class=\"row\">\n  <div class=\"col-6\">\n    Current Grade:\n  </div>\n  <div class=\"col-6\">\n    <input type=\"text\" [(ngModel)]=\"currentGrade\" />\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-6\">\n    Percentage Final is Worth:\n  </div>\n  <div class=\"col-6\">\n    <input type=\"text\" [(ngModel)]=\"finalPercentage\" />\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-6\">\n    Percentage you want in the Class:\n  </div>\n  <div class=\"col-6\">\n    <input type=\"text\" [(ngModel)]=\"goal\" />\n  </div>\n</div>\n<div style=\"height:10px;\"></div>\n<div class=\"row\">\n  <div class=\"col-7\">\n    &nbsp;\n  </div>\n  <div class=\"col-5\">\n    <button type=\"button\" class=\"btn\" (click)=\"calculate()\">Submit</button>\n  </div>\n</div>\n<p [innerHtml]=\"label\"></p>\n<p [innerHtml]=\"error\" class=\"w3-text-red\"></p>\n"

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
/* harmony import */ var _modules_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../modules/Helper */ "./src/app/modules/Helper.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FinalGradeCalculatorComponent = /** @class */ (function () {
    function FinalGradeCalculatorComponent() {
    }
    FinalGradeCalculatorComponent.prototype.ngOnInit = function () {
    };
    FinalGradeCalculatorComponent.prototype.calculate = function () {
        this.label = "";
        this.error = "";
        if (_modules_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(this.currentGrade)
            || _modules_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(this.finalPercentage)
            || _modules_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(this.goal))
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
            template: __webpack_require__(/*! ./final-grade-calculator.component.html */ "./src/app/components/pages/applications/final-grade-calculator/final-grade-calculator.component.html"),
            styles: [__webpack_require__(/*! ./final-grade-calculator.component.css */ "./src/app/components/pages/applications/final-grade-calculator/final-grade-calculator.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FinalGradeCalculatorComponent);
    return FinalGradeCalculatorComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/flappy-finch/flappy-finch.component.css":
/*!***************************************************************************************!*\
  !*** ./src/app/components/pages/applications/flappy-finch/flappy-finch.component.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/pages/applications/flappy-finch/flappy-finch.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/components/pages/applications/flappy-finch/flappy-finch.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  flappy-finch works!\n</p>\n"

/***/ }),

/***/ "./src/app/components/pages/applications/flappy-finch/flappy-finch.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/components/pages/applications/flappy-finch/flappy-finch.component.ts ***!
  \**************************************************************************************/
/*! exports provided: FlappyFinchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlappyFinchComponent", function() { return FlappyFinchComponent; });
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

var FlappyFinchComponent = /** @class */ (function () {
    function FlappyFinchComponent() {
    }
    FlappyFinchComponent.prototype.ngOnInit = function () {
    };
    FlappyFinchComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-flappy-finch",
            template: __webpack_require__(/*! ./flappy-finch.component.html */ "./src/app/components/pages/applications/flappy-finch/flappy-finch.component.html"),
            styles: [__webpack_require__(/*! ./flappy-finch.component.css */ "./src/app/components/pages/applications/flappy-finch/flappy-finch.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FlappyFinchComponent);
    return FlappyFinchComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/floaty-stars/floaty-stars.component.css":
/*!***************************************************************************************!*\
  !*** ./src/app/components/pages/applications/floaty-stars/floaty-stars.component.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/pages/applications/floaty-stars/floaty-stars.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/components/pages/applications/floaty-stars/floaty-stars.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  floaty-stars works!\n</p>\n"

/***/ }),

/***/ "./src/app/components/pages/applications/floaty-stars/floaty-stars.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/components/pages/applications/floaty-stars/floaty-stars.component.ts ***!
  \**************************************************************************************/
/*! exports provided: FloatyStarsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FloatyStarsComponent", function() { return FloatyStarsComponent; });
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

var FloatyStarsComponent = /** @class */ (function () {
    function FloatyStarsComponent() {
    }
    FloatyStarsComponent.prototype.ngOnInit = function () {
    };
    FloatyStarsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-floaty-stars",
            template: __webpack_require__(/*! ./floaty-stars.component.html */ "./src/app/components/pages/applications/floaty-stars/floaty-stars.component.html"),
            styles: [__webpack_require__(/*! ./floaty-stars.component.css */ "./src/app/components/pages/applications/floaty-stars/floaty-stars.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FloatyStarsComponent);
    return FloatyStarsComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/grade-calculator/grade-calculator.component.css":
/*!***********************************************************************************************!*\
  !*** ./src/app/components/pages/applications/grade-calculator/grade-calculator.component.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/pages/applications/grade-calculator/grade-calculator.component.html":
/*!************************************************************************************************!*\
  !*** ./src/app/components/pages/applications/grade-calculator/grade-calculator.component.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<br />\n<div class=\"row\">\n  <div class=\"col-6\">\n    Attendance:\n  </div>\n  <div class=\"col-6\">\n    <input type=\"text\" [(ngModel)]=\"attendanceGrade\" />\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-6\">\n    Homework:\n  </div>\n  <div class=\"col-6\">\n    <input type=\"text\" [(ngModel)]=\"homeworkGrade\" />\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-6\">\n    Lab:\n  </div>\n  <div class=\"col-6\">\n    <input type=\"text\" [(ngModel)]=\"labGrade\" />\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-6\">\n    Exam1:\n  </div>\n  <div class=\"col-6\">\n    <input type=\"text\" [(ngModel)]=\"exam1Grade\" />\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-6\">\n    Exam2:\n  </div>\n  <div class=\"col-6\">\n    <input type=\"text\" [(ngModel)]=\"exam2Grade\" />\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-6\">\n    Exam3:\n  </div>\n  <div class=\"col-6\">\n    <input type=\"text\" [(ngModel)]=\"exam3Grade\" />\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-6\">\n    Exam4:\n  </div>\n  <div class=\"col-6\">\n    <input type=\"text\" [(ngModel)]=\"exam4Grade\" />\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-6\">\n    Exam5:\n  </div>\n  <div class=\"col-6\">\n    <input type=\"text\" [(ngModel)]=\"exam5Grade\" />\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-6\">\n    Percentage you want in the Class:\n  </div>\n  <div class=\"col-6\">\n    <input type=\"text\" [(ngModel)]=\"goal\" />\n  </div>\n</div>\n<div style=\"height:10px;\"></div>\n<div class=\"row\">\n  <div class=\"col-7\">\n    &nbsp;\n  </div>\n  <div class=\"col-5\">\n    <button type=\"button\" class=\"btn\" (click)=\"calculate()\">Submit</button>\n  </div>\n</div>\n<p [innerHtml]=\"label\"></p>\n<p [innerHtml]=\"error\" class=\"w3-text-red\"></p>\n"

/***/ }),

/***/ "./src/app/components/pages/applications/grade-calculator/grade-calculator.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/components/pages/applications/grade-calculator/grade-calculator.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: GradeCalculatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GradeCalculatorComponent", function() { return GradeCalculatorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _modules_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../modules/Helper */ "./src/app/modules/Helper.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GradeCalculatorComponent = /** @class */ (function () {
    function GradeCalculatorComponent() {
        this.attendanceGrade = 100;
        this.homeworkGrade = 86.4;
        this.labGrade = 90;
        this.exam1Grade = 106;
        this.exam2Grade = 84.5;
        this.exam3Grade = 77.25;
        this.exam4Grade = 81;
        this.exam5Grade = 55;
        this.goal = 80;
    }
    GradeCalculatorComponent.prototype.ngOnInit = function () {
        this.calculate();
    };
    GradeCalculatorComponent.prototype.calculate = function () {
        this.label = "";
        this.error = "";
        if (_modules_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(this.attendanceGrade)
            || _modules_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(this.homeworkGrade)
            || _modules_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(this.labGrade)
            || _modules_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(this.exam1Grade)
            || _modules_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(this.exam2Grade)
            || _modules_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(this.exam3Grade)
            || _modules_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(this.exam4Grade)
            || _modules_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(this.exam5Grade)
            || _modules_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].equalsNull(this.goal))
            this.error = "Please fill out all three textboxes before pressing the Submit button.";
        else {
            var currentGrade = (0.05 * this.attendanceGrade)
                + (0.1 * this.homeworkGrade) + (0.2 * this.labGrade)
                + (0.1 * this.exam1Grade)
                + (0.1 * this.exam2Grade)
                + (0.1 * this.exam3Grade)
                + (0.1 * this.exam4Grade)
                + (0.1 * this.exam5Grade);
            var requiredFinalGrade = (this.goal - currentGrade) / 0.15;
            var toGetGrade = (currentGrade + (requiredFinalGrade * 0.15));
            if ((requiredFinalGrade + "") === "NaN" || (toGetGrade + "") === "NaN")
                this.error = "Please enter only numbers.";
            else
                this.label = "You need a " + this.round(requiredFinalGrade) / 100 + "% on the final"
                    + (" to get a grade of " + this.round(toGetGrade) / 100 + "% in the class");
        }
    };
    GradeCalculatorComponent.prototype.round = function (num) {
        return Math.round(10000 * num) / 100;
    };
    GradeCalculatorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-grade-calculator",
            template: __webpack_require__(/*! ./grade-calculator.component.html */ "./src/app/components/pages/applications/grade-calculator/grade-calculator.component.html"),
            styles: [__webpack_require__(/*! ./grade-calculator.component.css */ "./src/app/components/pages/applications/grade-calculator/grade-calculator.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], GradeCalculatorComponent);
    return GradeCalculatorComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/group-creator/group-creator.component.css":
/*!*****************************************************************************************!*\
  !*** ./src/app/components/pages/applications/group-creator/group-creator.component.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/pages/applications/group-creator/group-creator.component.html":
/*!******************************************************************************************!*\
  !*** ./src/app/components/pages/applications/group-creator/group-creator.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>Please enter a list of Names separated by commas:\n  <br>\n  (ex: <b>Steve Jobs,Bill Gates,Stephen Hawking,Morgan Freeman</b>)\n  <br>\n  <input type=\"text\" [(ngModel)]=\"list\" (change)=\"generateList()\" (keyup)=\"generateList()\" size=\"50%\" placeholder=\"Steve Jobs,Bill Gates,Stephen Hawking,Morgan Freeman\">\n</p>\n<p>\n  Number of people per group:<br>Random Number between\n  <input type=\"number\" [(ngModel)]=\"minPeople\" (change)=\"generateList()\" (keyup)=\"generateList()\" value=\"1\" /> and\n  <input type=\"number\" [(ngModel)]=\"maxPeople\" (change)=\"generateList()\" (keyup)=\"generateList()\" value=\"3\" />\n</p>\n<p>\n  <button type=\"button\" class=\"btn\" (click)=\"generateList()\">Submit</button>\n</p>\n<p [innerHtml]=\"output\"></p>\n"

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
        while (j > 0) {
            var groupsize = Math.round(Math.random() * (maxsize - minsize)) + minsize; // Picks a group size based on the preset values
            console.log("Group size = " + groupsize + ", j = " + j); // Logs some stuff
            if (j - groupsize < 0) {
                groupsize = j; // Sets the size of the group to the amount of remaining names
            }
            j -= groupsize; // Subtracts the size of the group from the list of names
            result += "<strong>Group " + groupnumber + ":</strong> "; // Writes the name of the group to the result string
            for (var i = 0; i < groupsize; i++) {
                result += splitnames[j + i]; // Adds the name to the result string
                if (i < groupsize - 1) {
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
            template: __webpack_require__(/*! ./group-creator.component.html */ "./src/app/components/pages/applications/group-creator/group-creator.component.html"),
            styles: [__webpack_require__(/*! ./group-creator.component.css */ "./src/app/components/pages/applications/group-creator/group-creator.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], GroupCreatorComponent);
    return GroupCreatorComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/html-sandbox/html-sandbox.component.css":
/*!***************************************************************************************!*\
  !*** ./src/app/components/pages/applications/html-sandbox/html-sandbox.component.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/pages/applications/html-sandbox/html-sandbox.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/components/pages/applications/html-sandbox/html-sandbox.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-6\">\n      <textarea id=\"text\" [(ngModel)]=\"html\"\n        font-family=\"monospace\" style=\"width:100%; min-height:100%;\">\n      </textarea>\n    </div>\n    <div class=\"col-6\">\n        <div [innerHtml]=\"html\"></div>\n    </div>\n</div>\n"

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
            template: __webpack_require__(/*! ./html-sandbox.component.html */ "./src/app/components/pages/applications/html-sandbox/html-sandbox.component.html"),
            styles: [__webpack_require__(/*! ./html-sandbox.component.css */ "./src/app/components/pages/applications/html-sandbox/html-sandbox.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HtmlSandboxComponent);
    return HtmlSandboxComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/index.ts":
/*!********************************************************!*\
  !*** ./src/app/components/pages/applications/index.ts ***!
  \********************************************************/
/*! exports provided: BettingCalculatorComponent, ColorFluxComponent, FinalGradeCalculatorComponent, FlappyFinchComponent, FloatyStarsComponent, GradeCalculatorComponent, GroupCreatorComponent, HtmlSandboxComponent, MultiplicationTableComponent, Say2Component, TypingTestComponent, ApplicationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _betting_calculator_betting_calculator_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./betting-calculator/betting-calculator.component */ "./src/app/components/pages/applications/betting-calculator/betting-calculator.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BettingCalculatorComponent", function() { return _betting_calculator_betting_calculator_component__WEBPACK_IMPORTED_MODULE_0__["BettingCalculatorComponent"]; });

/* harmony import */ var _color_flux_color_flux_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color-flux/color-flux.component */ "./src/app/components/pages/applications/color-flux/color-flux.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColorFluxComponent", function() { return _color_flux_color_flux_component__WEBPACK_IMPORTED_MODULE_1__["ColorFluxComponent"]; });

/* harmony import */ var _final_grade_calculator_final_grade_calculator_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./final-grade-calculator/final-grade-calculator.component */ "./src/app/components/pages/applications/final-grade-calculator/final-grade-calculator.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FinalGradeCalculatorComponent", function() { return _final_grade_calculator_final_grade_calculator_component__WEBPACK_IMPORTED_MODULE_2__["FinalGradeCalculatorComponent"]; });

/* harmony import */ var _flappy_finch_flappy_finch_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./flappy-finch/flappy-finch.component */ "./src/app/components/pages/applications/flappy-finch/flappy-finch.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FlappyFinchComponent", function() { return _flappy_finch_flappy_finch_component__WEBPACK_IMPORTED_MODULE_3__["FlappyFinchComponent"]; });

/* harmony import */ var _floaty_stars_floaty_stars_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./floaty-stars/floaty-stars.component */ "./src/app/components/pages/applications/floaty-stars/floaty-stars.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FloatyStarsComponent", function() { return _floaty_stars_floaty_stars_component__WEBPACK_IMPORTED_MODULE_4__["FloatyStarsComponent"]; });

/* harmony import */ var _grade_calculator_grade_calculator_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./grade-calculator/grade-calculator.component */ "./src/app/components/pages/applications/grade-calculator/grade-calculator.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GradeCalculatorComponent", function() { return _grade_calculator_grade_calculator_component__WEBPACK_IMPORTED_MODULE_5__["GradeCalculatorComponent"]; });

/* harmony import */ var _group_creator_group_creator_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./group-creator/group-creator.component */ "./src/app/components/pages/applications/group-creator/group-creator.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupCreatorComponent", function() { return _group_creator_group_creator_component__WEBPACK_IMPORTED_MODULE_6__["GroupCreatorComponent"]; });

/* harmony import */ var _html_sandbox_html_sandbox_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./html-sandbox/html-sandbox.component */ "./src/app/components/pages/applications/html-sandbox/html-sandbox.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HtmlSandboxComponent", function() { return _html_sandbox_html_sandbox_component__WEBPACK_IMPORTED_MODULE_7__["HtmlSandboxComponent"]; });

/* harmony import */ var _multiplication_table_multiplication_table_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./multiplication-table/multiplication-table.component */ "./src/app/components/pages/applications/multiplication-table/multiplication-table.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiplicationTableComponent", function() { return _multiplication_table_multiplication_table_component__WEBPACK_IMPORTED_MODULE_8__["MultiplicationTableComponent"]; });

/* harmony import */ var _say2_say2_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./say2/say2.component */ "./src/app/components/pages/applications/say2/say2.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Say2Component", function() { return _say2_say2_component__WEBPACK_IMPORTED_MODULE_9__["Say2Component"]; });

/* harmony import */ var _typing_test_typing_test_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./typing-test/typing-test.component */ "./src/app/components/pages/applications/typing-test/typing-test.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypingTestComponent", function() { return _typing_test_typing_test_component__WEBPACK_IMPORTED_MODULE_10__["TypingTestComponent"]; });

/* harmony import */ var _applications_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./applications.component */ "./src/app/components/pages/applications/applications.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApplicationsComponent", function() { return _applications_component__WEBPACK_IMPORTED_MODULE_11__["ApplicationsComponent"]; });















/***/ }),

/***/ "./src/app/components/pages/applications/multiplication-table/multiplication-table.component.css":
/*!*******************************************************************************************************!*\
  !*** ./src/app/components/pages/applications/multiplication-table/multiplication-table.component.css ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/pages/applications/multiplication-table/multiplication-table.component.html":
/*!********************************************************************************************************!*\
  !*** ./src/app/components/pages/applications/multiplication-table/multiplication-table.component.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span>Size of Table: </span>\n<input type=\"text\" (keyup)=\"loadTable()\" [(ngModel)]=\"size\" />\n<span> (max: 120)</span>\n<br />\n<span>Traditional: </span>\n<input type=\"checkbox\" [(ngModel)]=\"traditionalOption\" (change)=\"loadTable()\" />\n\n<div *ngIf=\"loading\">\n  Loading . . .\n</div>\n<div *ngIf=\"!loading\">\n  <div style=\"display:block; width:100%; height:400px; overflow-x:scroll; overflow-y:scroll;\">\n    <table>\n      <tr *ngFor=\"let row of multTable; let i = index;\" style=\"white-space:nowrap; padding:0;\">\n        <span *ngFor=\"let num of row; let j = index;\" style=\"width:100px; padding:0;\">\n            <td *ngIf=\"num != 'asdf'\" style=\"width:50px; padding:0;\" class=\"border border-secondary\"\n              [ngClass]=\"getClass(i, j)\">\n              {{ num }}\n            </td>\n            <td *ngIf=\"num == 'asdf'\" style=\"width:50px; padding:0;\" class=\"border border-secondary\">\n              &nbsp;\n            </td>\n        </span>\n      </tr>\n    </table>\n  </div>\n</div>\n"

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
            template: __webpack_require__(/*! ./multiplication-table.component.html */ "./src/app/components/pages/applications/multiplication-table/multiplication-table.component.html"),
            styles: [__webpack_require__(/*! ./multiplication-table.component.css */ "./src/app/components/pages/applications/multiplication-table/multiplication-table.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MultiplicationTableComponent);
    return MultiplicationTableComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/say2/say2.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/components/pages/applications/say2/say2.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/pages/applications/say2/say2.component.html":
/*!************************************************************************!*\
  !*** ./src/app/components/pages/applications/say2/say2.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"margin:0;\">\n  <div class=\"row\">\n    Please enter a number between -999,999,999,999,999 and 999,999,999,999,999:\n  </div>\n  <div class=\"row\">\n    <input type=\"number\" [(ngModel)]=\"input\" (change)=\"calculate()\" (keyup)=\"calculate()\">\n  </div>\n  <div class=\"row\">\n      {{ numberLabel }}\n  </div>\n</div>\n"

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
    Say2Component = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-say2",
            template: __webpack_require__(/*! ./say2.component.html */ "./src/app/components/pages/applications/say2/say2.component.html"),
            styles: [__webpack_require__(/*! ./say2.component.css */ "./src/app/components/pages/applications/say2/say2.component.css")]
        }),
        __metadata("design:paramtypes", [_node_modules_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _node_modules_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], Say2Component);
    return Say2Component;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/typing-test/typing-test.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/components/pages/applications/typing-test/typing-test.component.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/pages/applications/typing-test/typing-test.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/components/pages/applications/typing-test/typing-test.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<p *ngIf=\"paragraph === ''\">\n  Paste Text to use for typing test below:\n  <textarea [(ngModel)]=\"customparagraph\" style=\"width:100%;\" rows=\"10\" [placeholder]=\"dummyparagraph\"></textarea>\n  <br />\n  <button class=\"btn btn-black\" (click)=\"submit()\">Submit</button>\n</p>\n\n<div *ngIf=\"paragraph !== ''\">\n  <p>\n    <span style=\"color:green;\"><b>{{typedText}}</b></span>\n    <span style=\"color:red;\"><u>{{wrongtypedText}}</u></span>\n    <span><u>{{cursorText}}</u></span>\n    <span>{{untypedText}}</span>\n  </p>\n  <textarea [disabled]=\"disableTextBox\" onpaste=\"return false;\" style=\"width:100%;\" rows=\"10\" [(ngModel)]=\"typingparagraph\" id=\"asdf\" (keyup)=\"typingparagraphchanged()\"></textarea>\n  <p>{{timerMinutes}}:{{pad(timerSeconds)}}</p>\n  <p *ngIf=\"outputText !== ''\">\n    {{outputText}}\n    <br />\n    <button class=\"btn btn-black\" (click)=\"restart()\">Restart</button>\n  </p>\n</div>\n"

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
/* harmony import */ var src_app_modules_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/Helper */ "./src/app/modules/Helper.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
    }
    TypingTestComponent.prototype.ngOnInit = function () {
    };
    TypingTestComponent.prototype.replaceSpaces = function (str) {
        var typescript_non_breaking_space = String.fromCharCode(160);
        return src_app_modules_Helper__WEBPACK_IMPORTED_MODULE_1__["Helper"].replaceAll(str, "  ", " ");
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
            setInterval(function () {
                if (_this.timerStarted) {
                    _this.clockTick();
                }
            }, 1000);
        }
        this.correctPart();
    };
    TypingTestComponent.prototype.submit = function () {
        this.paragraph = this.customparagraph + " ";
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
            template: __webpack_require__(/*! ./typing-test.component.html */ "./src/app/components/pages/applications/typing-test/typing-test.component.html"),
            styles: [__webpack_require__(/*! ./typing-test.component.css */ "./src/app/components/pages/applications/typing-test/typing-test.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TypingTestComponent);
    return TypingTestComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/home/home.component.css":
/*!**********************************************************!*\
  !*** ./src/app/components/pages/home/home.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/pages/home/home.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/pages/home/home.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container border border-top-0 border-left-0 border-right-0\">\n  <h1 class=\"border border-top-0 border-left-0 border-right-0\">\n    Welcome!\n  </h1>\n  <p class=\"border border-top-0 border-left-0 border-right-0\">\n    This is a website I put together to feature work I have done on\n    various applications including\n    <a (mouseup)=\"openPage($event, 'applications/java')\"\n      class=\"hyperlink w3-hover-text-purple\">Java Applications</a>,\n    <a (mouseup)=\"openPage($event, 'applications/web')\"\n      class=\"hyperlink w3-hover-text-purple\">Web Applications</a>, and\n    <a (mouseup)=\"openPage($event, 'applications/android')\"\n      class=\"hyperlink w3-hover-text-purple\">Android Applications</a>.\n    I also have a few videos that I made that are featured\n    <a (mouseup)=\"openPage($event, 'videos')\"\n      class=\"hyperlink w3-hover-text-purple\">here</a>.\n  </p>\n  <h3>An introduction to me:</h3>\n  <p>\n    I am currently a Computer Science student at the\n    <a (mouseup)=\"openLink($event, 'https://sce.umkc.edu/')\"\n      class=\"hyperlink w3-hover-text-purple\">School of Computing and Engineering</a>\n    at\n    <a (mouseup)=\"openLink($event, 'https://www.umkc.edu/')\"\n      class=\"hyperlink w3-hover-text-purple\">UMKC</a>\n    and a software development intern at\n    <a (mouseup)=\"openLink($event, 'https://wellsky.com/')\"\n      class=\"hyperlink w3-hover-text-purple\">WellSky</a>.\n  </p>\n  <p>\n    I love coding becuase I love learning, and I am a logical thinker.\n    The first programming language I learned was Java through\n    <a (mouseup)=\"openLink($event, 'https://www.firstinspires.org/robotics/frc')\"\n      class=\"hyperlink w3-hover-text-purple\">FRC</a>\n    in high school. This experience in robotics was great, and made me\n    realize that Computer Science could be a possible career path that I\n    could enjoy.\n  </p>\n  <p>\n    I have experience coding in many different languages including\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/Angular_(application_platform)')\"\n      class=\"hyperlink w3-hover-text-purple\">Angular</a> (\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/HTML')\"\n      class=\"hyperlink w3-hover-text-purple\">HTML</a>,\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/Cascading_Style_Sheets')\"\n      class=\"hyperlink w3-hover-text-purple\">CSS</a>, and\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/TypeScript')\"\n      class=\"hyperlink w3-hover-text-purple\">TypeScript</a> ),\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/C%2B%2B')\"\n      class=\"hyperlink w3-hover-text-purple\">C++</a>,\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/C_Sharp_(programming_language)')\"\n      class=\"hyperlink w3-hover-text-purple\">C#</a>,\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/Java')\"\n      class=\"hyperlink w3-hover-text-purple\">Java</a>,\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/Python_(programming_language)')\"\n      class=\"hyperlink w3-hover-text-purple\">Python</a>,\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/SQL')\"\n      class=\"hyperlink w3-hover-text-purple\">SQL</a>, and\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/Visual_Basic_.NET')\"\n      class=\"hyperlink w3-hover-text-purple\">VB.net</a>.\n    Some of the resources I use most often to learn coding on my own are\n    <a (mouseup)=\"openLink($event, 'https://stackoverflow.com/')\"\n      class=\"hyperlink w3-hover-text-purple\">Stack Overflow</a>,\n    <a (mouseup)=\"openLink($event, 'https://www.w3schools.com/')\"\n      class=\"hyperlink w3-hover-text-purple\">W3 Schools</a>, and\n    <a (mouseup)=\"openLink($event, 'https://developers.google.com/web/tools/chrome-devtools/console/')\"\n      class=\"hyperlink w3-hover-text-purple\">F12</a>.\n  </p>\n  <p class=\"border border-top-0 border-left-0 border-right-0\">\n    Some of my favorite youtube channels include\n    <a (mouseup)=\"openLink($event, 'https://www.youtube.com/channel/UCpIafFPGutTAKOBHMtGen7g')\"\n      class=\"hyperlink w3-hover-text-purple\">Gus Johnson</a>,\n    <a (mouseup)=\"openLink($event, 'https://www.youtube.com/user/HelloInternetPodcast')\"\n      class=\"hyperlink w3-hover-text-purple\">Hello Internet</a>,\n    <a (mouseup)=\"openLink($event, 'https://www.youtube.com/channel/UCxUycBeiK8TcU6WBRkTXRlg')\"\n      class=\"hyperlink w3-hover-text-purple\">Julian Smith</a>,\n    <a (mouseup)=\"openLink($event, 'https://www.youtube.com/channel/UCsXVk37bltHxD1rDPwtNM8Q')\"\n      class=\"hyperlink w3-hover-text-purple\">Kurzgesagt – In a Nutshell</a>,\n    <a (mouseup)=\"openLink($event, 'https://www.youtube.com/channel/UCSju5G2aFaWMqn-_0YBtq5A')\"\n      class=\"hyperlink w3-hover-text-purple\">standupmaths</a>,\n    <a (mouseup)=\"openLink($event, 'https://www.youtube.com/channel/UCEIwxahdLz7bap-VDs9h35A')\"\n      class=\"hyperlink w3-hover-text-purple\">Steve Mould</a>,\n    <a (mouseup)=\"openLink($event, 'https://www.youtube.com/channel/UCd0ZD4iCXRXf18p3cA7EQfg')\"\n      class=\"hyperlink w3-hover-text-purple\">Taran Van Hemert</a>, and\n    <a (mouseup)=\"openLink($event, 'https://www.youtube.com/user/Vsauce')\"\n      class=\"hyperlink w3-hover-text-purple\">Vsauce</a>.\n  </p>\n  <h3>Check out Some of my Friend's websites:</h3>\n  <a (mouseup)=\"openLink($event, 'https://alexwebberfrc.github.io/')\"\n    class=\"hyperlink w3-hover-text-purple\">Alex</a>,\n  <a (mouseup)=\"openLink($event, 'https://codymoose.github.io/')\"\n    class=\"hyperlink w3-hover-text-purple\">Cody</a>,\n  <a (mouseup)=\"openLink($event, 'http://thekuhnbros.com/hanavan/')\"\n    class=\"hyperlink w3-hover-text-purple\">Hanavan</a>,\n  <a (mouseup)=\"openLink($event, 'https://xyzen.github.io/')\"\n    class=\"hyperlink w3-hover-text-purple\">Tyler</a>, and\n  <a (mouseup)=\"openLink($event, 'https://zachdeibert.github.io/')\"\n    class=\"hyperlink w3-hover-text-purple\">Zach</a>\n  all have websites where you can download or use software as well!\n</div>\n"

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
/* harmony import */ var _modules_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../modules/Helper */ "./src/app/modules/Helper.ts");
/* harmony import */ var _node_modules_angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/@angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomeComponent = /** @class */ (function () {
    function HomeComponent(router, location, http) {
        this.router = router;
        this.location = location;
        this.http = http;
    }
    HomeComponent.prototype.ngOnInit = function () {
        _modules_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].initializePage(this, this.router.url, _modules_Helper__WEBPACK_IMPORTED_MODULE_3__["PageNames"].HOME);
    };
    HomeComponent.prototype.openLink = function (event, url) {
        console.log(event.which);
        if (event.which === 1) {
            location.href = url;
        }
        if (event.which === 2) {
            window.open(url);
        }
    };
    HomeComponent.prototype.openPage = function (event, page) {
        console.log(page);
        if (event.which === 1) {
            _modules_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].navigate(this.router, this.location, page);
        }
        if (event.which === 2) {
            window.open(page);
        }
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-home",
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/components/pages/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/components/pages/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"], _node_modules_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/videos/videos.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/pages/videos/videos.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/pages/videos/videos.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/pages/videos/videos.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 class=\"border border-top-0 border-left-0 border-right-0\">Videos</h1>\n<div *ngFor=\"let video of videos\">\n  <h3>{{ video.title }}</h3>\n  <iframe [src]=\"video.link\" frameborder=\"1\"\n    allow=\"autoplay; encrypted-media\" style=\"width:100%; height:25vh;\" allowfullscreen></iframe>\n  <p class=\"border border-top-0 border-left-0 border-right-0\">\n    {{ video.description }}\n  </p>\n</div>\n"

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
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _modules_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../modules/Helper */ "./src/app/modules/Helper.ts");
/* harmony import */ var _modules_DB__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../modules/DB */ "./src/app/modules/DB.ts");
/* harmony import */ var _node_modules_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../node_modules/@angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Video = /** @class */ (function () {
    function Video() {
    }
    return Video;
}());
var VideosComponent = /** @class */ (function () {
    function VideosComponent(router, location, sanitizer) {
        this.router = router;
        this.location = location;
        this.sanitizer = sanitizer;
        this.videos = [];
    }
    VideosComponent.prototype.ngOnInit = function () {
        _modules_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].initializePage(this, this.router.url, _modules_Helper__WEBPACK_IMPORTED_MODULE_3__["PageNames"].VIDEOS);
        var dbVideos = _modules_DB__WEBPACK_IMPORTED_MODULE_4__["DB"].dbVideos.getVideos();
        this.videos = [];
        for (var i = 0; i < dbVideos.length; i++) {
            this.videos.push({
                title: dbVideos[i]["title"],
                link: this.sanitizer.bypassSecurityTrustResourceUrl(dbVideos[i]["link"]),
                description: dbVideos[i]["description"]
            });
        }
    };
    VideosComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-videos",
            template: __webpack_require__(/*! ./videos.component.html */ "./src/app/components/pages/videos/videos.component.html"),
            styles: [__webpack_require__(/*! ./videos.component.css */ "./src/app/components/pages/videos/videos.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"], _node_modules_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"]])
    ], VideosComponent);
    return VideosComponent;
}());



/***/ }),

/***/ "./src/app/modules/DB.ts":
/*!*******************************!*\
  !*** ./src/app/modules/DB.ts ***!
  \*******************************/
/*! exports provided: DB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DB", function() { return DB; });
var DBApplications = /** @class */ (function () {
    function DBApplications() {
    }
    DBApplications.prototype.getApplications = function () {
        return db.nate314.home.pages[0];
    };
    DBApplications.prototype.getJavaApplications = function () {
        return db.nate314.home.pages[0].subpages[0];
    };
    DBApplications.prototype.getWebApplications = function () {
        return db.nate314.home.pages[0].subpages[1];
    };
    DBApplications.prototype.getAndroidApplications = function () {
        return db.nate314.home.pages[0].subpages[2];
    };
    return DBApplications;
}());
var DBVideos = /** @class */ (function () {
    function DBVideos() {
    }
    DBVideos.prototype.getVideos = function () {
        return db.nate314.home.pages[1].subpages[0]["videos"];
    };
    return DBVideos;
}());
var DB = /** @class */ (function () {
    function DB() {
    }
    DB.getDB = function () {
        return db;
    };
    DB.getHome = function () {
        return db.nate314.home;
    };
    DB.getPages = function () {
        return db.nate314.home.pages;
    };
    DB.dbApplications = new DBApplications();
    DB.dbVideos = new DBVideos();
    return DB;
}());

var db = {
    nate314: {
        home: {
            title: "Nathan Gawith",
            subtitle: "my github website",
            name: "Home",
            sections: ["Site Map", "Other Websites"],
            otherwebsites: "Check out my friend's websites. They have also have lotsof cool software that you can download."
                + "<ul><li>Hanavan's <a href=\"http://thekuhnbros.com/hanavan/\">website</a></li><li>Cody's <a href=\""
                + "https://codymoose.github.io\">website</a></li><li>Alex's <a href=\"http://alexwebber.org/\">website</a></li></ul>>",
            pages: [{
                    title: "Applications",
                    name: "Applications",
                    subpages: [{
                            name: "JavaApplications",
                            description: "You can downlad any of these java applications by clicking on the name "
                                + "of the application below, or you can view a list of all of the applications and descriptions ",
                            link: "applications/java",
                            apps: [
                                {
                                    name: "Clock",
                                    file: "Clock.jar",
                                    description: "This is a Clock prgram written in Java. This application is pretty self "
                                        + "explanitory. When launched, an analog clock will be displayed with the current time. "
                                        + "If you prefer digital, just click on the clock to toggle between analog and digital."
                                },
                                {
                                    name: "DinoGame1920x1080",
                                    file: "DinoGame1920x1080.jar",
                                    description: "This is a game playing bot written in Java. This program jumps over most "
                                        + "cacti in the Dinosaur Game that can be played in Google Chrome when you don't have an"
                                        + " internet connection. Sadly, it only currently works on a screen resolution of 1920x1080"
                                        + " when Chrome is maximized in windows. It doesn't yet duck under the pterodactyls yet, so"
                                        + " you will have to take care of that part of the game yourself."
                                },
                                {
                                    name: "FlappyBird",
                                    file: "FlappyBird1.1.zip",
                                    description: "This is my verion of Flappy Bird written in Java. Controls are listed below: "
                                        + "<br>space: flap<br /><code>p: play/pause<br>d: toggle developer mode<br>r: restart <br>"
                                        + "left/right: slow down/speed up game</code>"
                                },
                                {
                                    name: "Minesweeper",
                                    file: "Minesweeper1.2.jar",
                                    description: "This is my verion of Microsoft's Minesweeper written in Java. You can flag a"
                                        + " square by right clicking, or attack by left clicking."
                                },
                                {
                                    name: "NathaNOS",
                                    file: "NathaNOS1.1.zip",
                                    description: "This is my \"OS\" written in Java. When you open it, the easiest way to close"
                                        + " it is to use the Shut Down button found by clicking on the menu in the bottom left hand"
                                        + " corner. This \"OS\" was written to run Java applications inside of it. The only application"
                                        + " that I have included with this version of NathaNOS is my clock application. To run a java"
                                        + " program inside of it, drag and drop the jar file into the NathaNOS1.1/assets and you should"
                                        + " be ready to go!</p> <p>Note: if you want to add one of your own java programs to NathaNOS,"
                                        + " then you will have to make the main class extend a JFrame, and you will have to make the"
                                        + " constructor of your main class have one parameter that is a Boolean for visibility. You can"
                                        + " see an example below:<pre><code>package clock;\n\nimport javax.swing.JFrame;\n\npublic"
                                        + " class Main extends JFrame\n{\n\tpublic Main(Boolean visibility)\t{\n\t\tthis.setVisible"
                                        + "(visibility.booleanValue());\n\t}\n}\n</code></pre>"
                                },
                                {
                                    name: "RubiksCube2D",
                                    file: "RubiksCube2D_3.jar",
                                    description: "This is a 2D Rubik's Cube written in Java. To rotate, click on a square and"
                                        + " then use wasd to rotate in the correlated direction."
                                },
                                {
                                    name: "ScreenSaver",
                                    file: "ScreenSaver0.1.jar",
                                    description: "This is a Screen Saver written in Java. It should close if you move your mouse."
                                },
                                {
                                    name: "SpriteFloatyStars",
                                    file: "SpriteFloatyStars1.0.jar",
                                    description: "This is a background program written in Java. Check out each of the cool"
                                        + " modes. My personal favorite is Mode 3."
                                },
                                {
                                    name: "UltimateTicTacToe",
                                    file: "UltimateTicTacToe1.1.jar",
                                    description: "This is an UltimateTicTacToe game written in Java. If you don't know how"
                                        + " to play, you can check out the rules <a href=\"https://www.youtube.com/watch?v=37PC0bGMiTI\""
                                        + ">here</a>"
                                }
                            ]
                        },
                        {
                            name: "WebApplications",
                            description: "You can use any of these web applications by clicking on the name "
                                + "of the application below, or you can view a list of all of the applications and descriptions ",
                            link: "applications/web",
                            apps: [{
                                    name: "BettingCalculator",
                                    file: "webapplications/bettingcalculator",
                                    description: "Betting Calculator can be used if you want to place bets on things and don't want"
                                        + " to have to worry about the math. You can set up the number of things you are btting on and"
                                        + " the number of humans that are placing bets, and then the winnings will be split"
                                        + " proportionally between the palyers that placed bets on the thing that actually won."
                                },
                                {
                                    name: "ColorFlux",
                                    file: "https://nate314.github.io/nathangawith/applications/webApplications/colorFlux.html",
                                    description: "Color Flux is an application that you could possibly use as a live background"
                                        + " written in javascript. It just pulses between different colors continuously."
                                },
                                {
                                    name: "FinalGradeCalculator",
                                    file: "webapplications/finalgradecalculator",
                                    description: "Final Grade Caclculator is a useful tool for when you are in a crunch and want"
                                        + " to prioritize study time. Enter your current grade in the class, the percentage of your"
                                        + " grade the final is worth, and the percentage you want to finish the class with. Once"
                                        + " you submit, this application will tell you the percentage you need in order to achieve"
                                        + " your goal."
                                },
                                // {
                                //     name: "GradeCalculator",
                                //     file: "webapplications/gradecalculator",
                                //     description: "Currently, this calculator is hard coded to work for Jacob Pursley's Physics"
                                //     + " 240 class, but I plan on de-hardcoding it in the future."
                                // },
                                {
                                    name: "FlappyFinch",
                                    file: "https://nate314.github.io/nathangawith/applications/webApplications/flappyFinch.html",
                                    description: "Flappy Finch is a spin off of Flappy Bird created using javascipt. There is"
                                        + " currently no collision code in place, so there is no way for the game to end. I wrote"
                                        + " this to learn how to do an animation using a javscript canvas."
                                },
                                {
                                    name: "FloatyStars",
                                    file: "https://nate314.github.io/nathangawith/applications/webApplications/floatyStars.html",
                                    description: "Floaty Stars is a simple application that I built to learn how to do 2D"
                                        + " animations in javascript."
                                },
                                {
                                    name: "GroupCreator",
                                    file: "webapplications/groupcreator",
                                    description: "Group Creator is a great application to use if you want to create random"
                                        + " groups of people and want to do it in an efficient way using pure computer randomness."
                                },
                                {
                                    name: "HTMLSandbox",
                                    file: "webapplications/htmlsandbox",
                                    description: "HTML Sandbox is a great application to use if you want to learn how to code"
                                        + " in HTML but don't have a way of editing code on your computer or just want to try"
                                        + " something out real quick in your browser."
                                },
                                {
                                    name: "MultiplicationTable",
                                    file: "webapplications/multiplicationtable",
                                    description: "Multiplication Table is pretty much self explanitory. Enter a number between"
                                        + " 0 and 120 and a multiplication table will be generated with that size."
                                },
                                {
                                    name: "NathanGawithWebsite",
                                    file: "webapplications/nathangawithwebsite",
                                    description: "This website is technically a web application, so I included it in this list."
                                },
                                {
                                    name: "Say2",
                                    file: "webapplications/say2",
                                    description: "Say2 is a simple program that takes a number as input and outputs the english"
                                        + " text for that number. For example: if you type in \"123\", the program will output \"one"
                                        + " hundred twenty three\". Say2 was originally a challenge that many of the programmers on"
                                        + " my robotics team completed as part of java training. Say2 is the first web application"
                                        + " that I have written in JavaScript, which even though JavaScript sounds like Java, the"
                                        + " two languages are almost just as similar to each other as a car is to carpet."
                                },
                                {
                                    name: "TypingTest",
                                    file: "webapplications/typingtest",
                                    description: "Test how many words per minute you can type"
                                },
                            ]
                        },
                        {
                            name: "AndroidApplications",
                            description: "You can downlad any of these java applications by clicking on the name "
                                + "of the application below, or you can view a list of all of the applications and descriptions ",
                            link: "applications/android",
                            "apps": [{
                                    name: "LiveWallpaper",
                                    file: "LiveWallpaper.apk",
                                    description: "Live Wallpaper is my first fully functional android application that I have written."
                                        + " This live wallpaper changes color based on what direction your phone is facing using all three"
                                        + " angles available (pitch, roll, and azmuth) from the standard accelerometer found in most phones."
                                        + " You can use this live wallpaper by downloading and installing the apk file and then selecting"
                                        + " \"Live Wallpaper\" as your live wallpaper for your phone or tablet."
                                }]
                        }
                    ]
                },
                {
                    name: "OtherPages",
                    subpages: [{
                            name: "Videos",
                            videos: [
                                {
                                    title: "Timelapse - Cube",
                                    link: "https://www.youtube.com/embed/eBCUe4jSPQQ",
                                    description: "This is my favorite timelapse I have made. It shows a 3x3x3 puzzle cube \"solving"
                                        + " itself\". I accomplished this by taking a picture of the cube every quarter turn."
                                },
                                {
                                    title: "Timelapse - Rubik's",
                                    link: "https://www.youtube.com/embed/EtycVB_mPnQ",
                                    description: "This is the first timelapse video I ever made. This is also a video of a cube"
                                        + " solving itself, but this one doesn't look as nice as the one above because I only took"
                                        + " one picture for each turn. I also thought it would be a good idea to show the clock so"
                                        + " that you can see how long it took."
                                },
                                {
                                    title: "Mosaic - MVTV",
                                    link: "https://www.youtube.com/embed/hD42xobUROM",
                                    description: "I was interviewed about my puzzle cube collection and hobby while in high school,"
                                        + " so I made this mosaic for the high school broadcasting class to use as a nice outro for the"
                                        + " interview."
                                },
                                {
                                    title: "Mosaic - US Flag",
                                    link: "https://www.youtube.com/embed/V4cVGX8jyfI",
                                    description: "This was probably the easiest mosaic I made as stripes are easy for anyone to make"
                                        + " with cubes whether or not you know how to solve a puzzle cube."
                                },
                                {
                                    title: "Dream Home - Ground Floor",
                                    link: "https://www.youtube.com/embed/9rEE0PjNMA4",
                                    description: "In my \"Architectural Design\" course in high school, we designed our dream home"
                                        + " in autocad and then made a 3D rendering. This is a video showing walking around the ground floor."
                                },
                                {
                                    title: "Dream Home - Basement",
                                    link: "https://www.youtube.com/embed/cDsXrYSNA8c",
                                    description: "In my \"Architectural Design\" course in high school, we designed our dream home"
                                        + " in autocad and then made a 3D rendering. This is a video showing walking around the basement."
                                },
                                {
                                    title: "Typling Bot",
                                    link: "https://www.youtube.com/embed/UzCBnGSdWAE",
                                    description: "As a computer science student, a friend of mine challenged me to a typing contest."
                                        + " I lost, so I thought it would be fun to code a bot to play for me. As you can see in this"
                                        + " video, it isn't actually very fast."
                                },
                                {
                                    title: "Clash Royale Strategy",
                                    link: "https://www.youtube.com/embed/gLKssL0FN98",
                                    description: "I used to play Clash Royale a lot, and this was my favorite strategy to use in a"
                                        + " two on two battle."
                                }
                            ],
                        }]
                },
                {
                    name: "How I Created This Website",
                    description: "Here you can view the code behind this website."
                }
            ]
        }
    }
};


/***/ }),

/***/ "./src/app/modules/Helper.ts":
/*!***********************************!*\
  !*** ./src/app/modules/Helper.ts ***!
  \***********************************/
/*! exports provided: Constants, Helper, PageNames, StatusCodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Helper", function() { return Helper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageNames", function() { return PageNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusCodes", function() { return StatusCodes; });
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.currentComponent = null;
    Constants.currentPageURL = "";
    Constants.currentPage = "";
    Constants.appToOpen = "";
    return Constants;
}());

var Helper = /** @class */ (function () {
    function Helper() {
    }
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

var PageNames;
(function (PageNames) {
    PageNames["SITE_TITLE"] = "NathanGawith";
    PageNames["HOME"] = "Home";
    PageNames["APPLICATIONS"] = "Applications";
    PageNames["APPLICATIONS_JAVA"] = "Java Applications";
    PageNames["APPLICATIONS_WEB"] = "Web Applications";
    PageNames["APPLICATIONS_ANDROID"] = "Android Applications";
    PageNames["VIDEOS"] = "Videos";
})(PageNames || (PageNames = {}));
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["OK"] = 200] = "OK";
    StatusCodes[StatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
})(StatusCodes || (StatusCodes = {}));


/***/ }),

/***/ "./src/app/routes.ts":
/*!***************************!*\
  !*** ./src/app/routes.ts ***!
  \***************************/
/*! exports provided: routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony import */ var _components_application_structure_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/application-structure/not-found/not-found.component */ "./src/app/components/application-structure/not-found/not-found.component.ts");
/* harmony import */ var _components_pages_home_home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/pages/home/home.component */ "./src/app/components/pages/home/home.component.ts");
/* harmony import */ var _components_pages_videos_videos_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/pages/videos/videos.component */ "./src/app/components/pages/videos/videos.component.ts");
/* harmony import */ var _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/pages/applications/index */ "./src/app/components/pages/applications/index.ts");




var routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: _components_pages_home_home_component__WEBPACK_IMPORTED_MODULE_1__["HomeComponent"] },
    { path: "videos", component: _components_pages_videos_videos_component__WEBPACK_IMPORTED_MODULE_2__["VideosComponent"] },
    { path: "applications", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["ApplicationsComponent"] },
    { path: "applications/java/:application", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["ApplicationsComponent"] },
    { path: "applications/web/:application", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["ApplicationsComponent"] },
    { path: "applications/android/:application", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["ApplicationsComponent"] },
    { path: "applications/:subpage", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["ApplicationsComponent"] },
    { path: "webapplications/bettingcalculator", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["BettingCalculatorComponent"] },
    { path: "webapplications/colorflux", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["ColorFluxComponent"] },
    { path: "webapplications/finalgradecalculator", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["FinalGradeCalculatorComponent"] },
    { path: "webapplications/flappyfinch", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["FlappyFinchComponent"] },
    { path: "webapplications/floatystars", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["FloatyStarsComponent"] },
    // { path: "webapplications/gradecalculator", component: GradeCalculatorComponent },
    { path: "webapplications/groupcreator", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["GroupCreatorComponent"] },
    { path: "webapplications/htmlsandbox", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["HtmlSandboxComponent"] },
    { path: "webapplications/multiplicationtable", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["MultiplicationTableComponent"] },
    { path: "webapplications/nathangawithwebsite", component: _components_pages_home_home_component__WEBPACK_IMPORTED_MODULE_1__["HomeComponent"] },
    { path: "webapplications/say2", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["Say2Component"] },
    { path: "webapplications/typingtest", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["TypingTestComponent"] },
    { path: "**", component: _components_application_structure_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_0__["NotFoundComponent"] }
];


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
var environment = {
    production: true
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

module.exports = __webpack_require__(/*! C:\Users\Natha\Documents\Development\Angular\NathanGawith\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
