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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _components_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/index */ "./src/app/components/index.ts");
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
                _components_index__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_6__["NavbarComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_6__["NotFoundComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_6__["FooterComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_6__["ApplicationsComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_6__["VideosComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_6__["IFrameAppComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_6__["MultiplicationTableComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_6__["FinalGradeCalculatorComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_6__["BettingCalculatorComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_6__["Say2Component"],
                _components_index__WEBPACK_IMPORTED_MODULE_6__["GroupCreatorComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_6__["HtmlSandboxComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_6__["TypingTestComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_6__["DtoConvertComponent"],
                _components_index__WEBPACK_IMPORTED_MODULE_6__["CodeViewerComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"]
            ],
            providers: [_angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"]],
            bootstrap: [_components_index__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



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
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/components/application-structure/app-component/app.component.html")
        }),
        __metadata("design:paramtypes", [_node_modules_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _node_modules_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], AppComponent);
    return AppComponent;
}());



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
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/components/application-structure/footer/footer.component.html")
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
        _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].navigate(this.router, this.location, url);
        // location.href = url;
    };
    NavbarComponent.prototype.isSelected = function (page) {
        if (_helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Constants"].currentPageURL.includes(page.link))
            return true;
        else
            return false;
    };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-navbar",
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/components/application-structure/navbar/navbar.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



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
            template: __webpack_require__(/*! ./not-found.component.html */ "./src/app/components/application-structure/not-found/not-found.component.html")
        }),
        __metadata("design:paramtypes", [_node_modules_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _node_modules_angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"]])
    ], NotFoundComponent);
    return NotFoundComponent;
}());



/***/ }),

/***/ "./src/app/components/index.ts":
/*!*************************************!*\
  !*** ./src/app/components/index.ts ***!
  \*************************************/
/*! exports provided: NotFoundComponent, AppComponent, FooterComponent, NavbarComponent, HomeComponent, VideosComponent, BettingCalculatorComponent, CodeViewerComponent, DtoConvertComponent, FinalGradeCalculatorComponent, GroupCreatorComponent, HtmlSandboxComponent, MultiplicationTableComponent, Say2Component, TypingTestComponent, IFrameAppComponent, ApplicationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _application_structure_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./application-structure/index */ "./src/app/components/application-structure/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotFoundComponent", function() { return _application_structure_index__WEBPACK_IMPORTED_MODULE_0__["NotFoundComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return _application_structure_index__WEBPACK_IMPORTED_MODULE_0__["AppComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return _application_structure_index__WEBPACK_IMPORTED_MODULE_0__["FooterComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return _application_structure_index__WEBPACK_IMPORTED_MODULE_0__["NavbarComponent"]; });

/* harmony import */ var _pages_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/index */ "./src/app/components/pages/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["HomeComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideosComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["VideosComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BettingCalculatorComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["BettingCalculatorComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CodeViewerComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["CodeViewerComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DtoConvertComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["DtoConvertComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FinalGradeCalculatorComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["FinalGradeCalculatorComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupCreatorComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["GroupCreatorComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HtmlSandboxComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["HtmlSandboxComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiplicationTableComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["MultiplicationTableComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Say2Component", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["Say2Component"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypingTestComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["TypingTestComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IFrameAppComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["IFrameAppComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApplicationsComponent", function() { return _pages_index__WEBPACK_IMPORTED_MODULE_1__["ApplicationsComponent"]; });





/***/ }),

/***/ "./src/app/components/pages/applications/applications.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/components/pages/applications/applications.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--Applications-->\n<div *ngIf=\"!webAppURL && apps.length == 0\" class=\"container\">\n  <div *ngFor=\"let page of subpages\" class=\"border border-top-0 border-left-0 border-right-0\">\n    <h1>{{ page.name }}</h1>\n    <span [innerHTML]=\"page.description\"></span>\n    <a class=\"hyperlink w3-hover-text-purple\" [routerLink]=\"[page.link]\">here</a>.\n    <br />\n    <span *ngFor=\"let app of page.apps; let i = index\">\n      <a *ngIf=\"page.name.toUpperCase().startsWith('JAVA')\" (click)=\"openJavaApp(app)\"\n      class=\"hyperlink w3-hover-text-purple\">{{ app.name }}</a>\n      <a *ngIf=\"page.name.toUpperCase().startsWith('WEB')\" (click)=\"openWebApp(app, true)\"\n      class=\"hyperlink w3-hover-text-purple\">{{ app.name }}</a>\n      <a *ngIf=\"page.name.toUpperCase().startsWith('ANDROID')\" (click)=\"openAndroidApp(app)\"\n      class=\"hyperlink w3-hover-text-purple\">{{ app.name }}</a>\n      <span *ngIf=\"i !== page.apps.length - 1 && i != page.apps.length - 2\">, </span>\n      <span *ngIf=\"i === page.apps.length - 2\">, and </span>\n      <span *ngIf=\"i === page.apps.length - 1\">. </span>\n    </span>\n  </div>\n</div>\n<!--/Applications-->\n\n<!--Applications/Subpage-->\n<div *ngIf=\"!webAppOpen && pageName != null\">\n  <h1 class=\"border border-top-0 border-left-0 border-right-0\">{{ pageName }}</h1>\n  <div *ngFor=\"let app of apps\" class=\"border border-top-0 border-left-0 border-right-0\">\n    <h3>{{ app.name }}</h3>\n    <span [innerHtml]=\"app.description\"></span>\n    <br />\n    <span *ngIf=\"pageName.toUpperCase().startsWith('JAVA')\">\n      <b>Download</b>&nbsp;\n      <a class=\"hyperlink w3-hover-text-purple\" (click)=\"openJavaApp(app)\">{{ app.name }}</a>\n    </span>\n    <span *ngIf=\"pageName.toUpperCase().startsWith('WEB')\">\n      <b>Go to</b>&nbsp;\n      <a class=\"hyperlink w3-hover-text-purple\" (click)=\"openWebApp(app, true)\">{{ app.name }}</a>\n    </span>\n    <span *ngIf=\"pageName.toUpperCase().startsWith('ANDROID')\">\n      <b>Download</b>&nbsp;\n      <a class=\"hyperlink w3-hover-text-purple\" (click)=\"openAndroidApp(app)\">{{ app.name }}</a>\n    </span>\n  </div>\n</div>\n<!--/Applications/Subpage-->\n\n<!--Applications/Subpage/App-->\n<div class=\"border border-secondary border-top-0 border-left-0 border-right-0\">\n  <app-iframe-app *ngIf=\"webApp && webApp.file.includes('nate314')\" [src]=\"webApp.file\"></app-iframe-app>\n  <app-betting-calculator *ngIf=\"webApp && webApp.selector === 'app-betting-calculator'\"></app-betting-calculator>\n  <app-dto-convert *ngIf=\"webApp && webApp.selector === 'app-dto-convert'\"></app-dto-convert>\n  <app-final-grade-calculator *ngIf=\"webApp && webApp.selector === 'app-final-grade-calculator'\"></app-final-grade-calculator>\n  <app-group-creator *ngIf=\"webApp && webApp.selector === 'app-group-creator'\"></app-group-creator>\n  <app-html-sandbox *ngIf=\"webApp && webApp.selector === 'app-html-sandbox'\"></app-html-sandbox>\n  <app-multiplication-table *ngIf=\"webApp && webApp.selector === 'app-multiplication-table'\"></app-multiplication-table>\n  <app-root *ngIf=\"webApp && webApp.selector === 'app-root'\"></app-root>\n  <app-say2 *ngIf=\"webApp && webApp.selector === 'app-say2'\"></app-say2>\n  <app-typing-test *ngIf=\"webApp && webApp.selector === 'app-typing-test'\"></app-typing-test>\n  <br *ngIf=\"webApp\"/>\n</div>\n<div id=\"appDescription\"></div>\n<!--Applications/Subpage/App-->\n"

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
/* harmony import */ var _helpers_DB__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../helpers/DB */ "./src/app/helpers/DB.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
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
    function ApplicationsComponent(router, location, activatedRoute, http) {
        this.router = router;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this.http = http;
        this.appSelector = "<app-dto-convert></app-dto-convert>";
        // Applications
        this.subpages = [];
        this.apps = [];
        // Applications/Subpage/App
        this.webAppOpen = false;
    }
    ApplicationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        new _helpers_DB__WEBPACK_IMPORTED_MODULE_4__["DB"](this.http).getDB().subscribe(function (db) {
            // load information about all applications from the database
            _this.javaApplications = db.getJavaApplications();
            _this.webApplications = db.getWebApplications();
            _this.androidApplications = db.getAndroidApplications();
            _this.subpages.push({
                name: _this.javaApplications["name"],
                link: "../" + _this.javaApplications["link"],
                description: _this.javaApplications["description"],
                apps: _this.javaApplications["apps"]
            });
            _this.subpages.push({
                name: _this.webApplications["name"],
                link: "../" + _this.webApplications["link"],
                description: _this.webApplications["description"],
                apps: _this.webApplications["apps"]
            });
            _this.subpages.push({
                name: _this.androidApplications["name"],
                link: "../" + _this.androidApplications["link"],
                description: _this.androidApplications["description"],
                apps: _this.androidApplications["apps"]
            });
            // load different sections of the page based on the url
            var validSubpages = ["java", "web", "android"];
            _this.activatedRoute.url.subscribe(function (response) {
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
            template: __webpack_require__(/*! ./applications.component.html */ "./src/app/components/pages/applications/applications.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"]])
    ], ApplicationsComponent);
    return ApplicationsComponent;
}());



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
            template: __webpack_require__(/*! ./betting-calculator.component.html */ "./src/app/components/pages/applications/betting-calculator/betting-calculator.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], BettingCalculatorComponent);
    return BettingCalculatorComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/code-viewer/code-viewer.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/components/pages/applications/code-viewer/code-viewer.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<a (click)=\"clickFolderName()\">{{dir.name}}</a>\r\n<br />\r\n<a *ngFor=\"let foler of dir.folders\" (click)=\"clickSubFolderName()\">{{folder.name}}</a>\r\n<br />\r\n<a *ngFor=\"let file of dir.files\" (click)=\"clickFileName()\">{{file.name}}</a>\r\n<br />\r\n<a *ngFor=\"let comp of dir.components\" (click)=\"clickComponentName()\">{{comp.name}}</a>"

/***/ }),

/***/ "./src/app/components/pages/applications/code-viewer/code-viewer.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/components/pages/applications/code-viewer/code-viewer.component.ts ***!
  \************************************************************************************/
/*! exports provided: CodeViewerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeViewerComponent", function() { return CodeViewerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _helpers_FileStructure__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../helpers/FileStructure */ "./src/app/helpers/FileStructure.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CodeViewerComponent = /** @class */ (function () {
    function CodeViewerComponent() {
    }
    CodeViewerComponent.prototype.ngOnInit = function () {
        Object(_helpers_FileStructure__WEBPACK_IMPORTED_MODULE_1__["getSiteFiles"])();
    };
    CodeViewerComponent.prototype.clickFolderName = function () {
    };
    CodeViewerComponent.prototype.clickSubFolderName = function () {
    };
    CodeViewerComponent.prototype.clickFileName = function () {
    };
    CodeViewerComponent.prototype.clickComponentName = function () {
    };
    CodeViewerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-code-viewer",
            template: __webpack_require__(/*! ./code-viewer.component.html */ "./src/app/components/pages/applications/code-viewer/code-viewer.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], CodeViewerComponent);
    return CodeViewerComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/applications/dto-convert/dto-convert.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/components/pages/applications/dto-convert/dto-convert.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n  <div class=\"row\">\n    <div class=\"col-1\">\n        Please enter text in the format shown in the placeholder text.\n    </div>\n    <div class=\"col-5\">\n      <div class=\"row\">C#</div>\n      <div class=\"row\">\n        <textarea [placeholder]=\"dto_csharp\" [(ngModel)]=\"csharp_text\"\n          style=\"width: 100%\" rows=\"15\"></textarea>\n      </div>\n    </div>\n    <div class=\"col-1\">\n      <div class=\"row\">&nbsp;</div>\n      <div class=\"row\">\n        <button class=\"btn btn-white\" style=\"width:100%;\"\n          (click)=\"csharp_to_typescript()\">\n          &gt;\n        </button>\n      </div>\n      <br />\n      <div class=\"row\">\n        <button class=\"btn btn-white\" style=\"width:100%;\"\n          (click)=\"typescript_to_csharp()\">\n          &lt;\n        </button>\n      </div>\n    </div>\n    <div class=\"col-5\">\n      <div class=\"row\">Typescript</div>\n      <div class=\"row\">\n        <textarea [placeholder]=\"dto_typescript\" [(ngModel)]=\"typescript_text\"\n          style=\"width: 100%\" rows=\"15\"></textarea>\n      </div>\n    </div>\n  </div>\n"

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
            template: __webpack_require__(/*! ./dto-convert.component.html */ "./src/app/components/pages/applications/dto-convert/dto-convert.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], DtoConvertComponent);
    return DtoConvertComponent;
}());



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
            template: __webpack_require__(/*! ./final-grade-calculator.component.html */ "./src/app/components/pages/applications/final-grade-calculator/final-grade-calculator.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], FinalGradeCalculatorComponent);
    return FinalGradeCalculatorComponent;
}());



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
            template: __webpack_require__(/*! ./group-creator.component.html */ "./src/app/components/pages/applications/group-creator/group-creator.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], GroupCreatorComponent);
    return GroupCreatorComponent;
}());



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
            template: __webpack_require__(/*! ./html-sandbox.component.html */ "./src/app/components/pages/applications/html-sandbox/html-sandbox.component.html")
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

var IFrameAppComponent = /** @class */ (function () {
    function IFrameAppComponent() {
    }
    IFrameAppComponent.prototype.ngOnInit = function () {
        document.getElementById("iframediv").innerHTML = "<iframe src=\"" + this.src + "\"\n    frameborder=\"0\" style=\"width:100%; height:60vh;\"></iframe>";
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], IFrameAppComponent.prototype, "src", void 0);
    IFrameAppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-iframe-app",
            template: "<div id=\"iframediv\"></div>"
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
/*! exports provided: BettingCalculatorComponent, CodeViewerComponent, DtoConvertComponent, FinalGradeCalculatorComponent, GroupCreatorComponent, HtmlSandboxComponent, MultiplicationTableComponent, Say2Component, TypingTestComponent, IFrameAppComponent, ApplicationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _betting_calculator_betting_calculator_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./betting-calculator/betting-calculator.component */ "./src/app/components/pages/applications/betting-calculator/betting-calculator.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BettingCalculatorComponent", function() { return _betting_calculator_betting_calculator_component__WEBPACK_IMPORTED_MODULE_0__["BettingCalculatorComponent"]; });

/* harmony import */ var _code_viewer_code_viewer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./code-viewer/code-viewer.component */ "./src/app/components/pages/applications/code-viewer/code-viewer.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CodeViewerComponent", function() { return _code_viewer_code_viewer_component__WEBPACK_IMPORTED_MODULE_1__["CodeViewerComponent"]; });

/* harmony import */ var _dto_convert_dto_convert_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dto-convert/dto-convert.component */ "./src/app/components/pages/applications/dto-convert/dto-convert.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DtoConvertComponent", function() { return _dto_convert_dto_convert_component__WEBPACK_IMPORTED_MODULE_2__["DtoConvertComponent"]; });

/* harmony import */ var _final_grade_calculator_final_grade_calculator_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./final-grade-calculator/final-grade-calculator.component */ "./src/app/components/pages/applications/final-grade-calculator/final-grade-calculator.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FinalGradeCalculatorComponent", function() { return _final_grade_calculator_final_grade_calculator_component__WEBPACK_IMPORTED_MODULE_3__["FinalGradeCalculatorComponent"]; });

/* harmony import */ var _group_creator_group_creator_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./group-creator/group-creator.component */ "./src/app/components/pages/applications/group-creator/group-creator.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupCreatorComponent", function() { return _group_creator_group_creator_component__WEBPACK_IMPORTED_MODULE_4__["GroupCreatorComponent"]; });

/* harmony import */ var _html_sandbox_html_sandbox_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./html-sandbox/html-sandbox.component */ "./src/app/components/pages/applications/html-sandbox/html-sandbox.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HtmlSandboxComponent", function() { return _html_sandbox_html_sandbox_component__WEBPACK_IMPORTED_MODULE_5__["HtmlSandboxComponent"]; });

/* harmony import */ var _multiplication_table_multiplication_table_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./multiplication-table/multiplication-table.component */ "./src/app/components/pages/applications/multiplication-table/multiplication-table.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiplicationTableComponent", function() { return _multiplication_table_multiplication_table_component__WEBPACK_IMPORTED_MODULE_6__["MultiplicationTableComponent"]; });

/* harmony import */ var _say2_say2_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./say2/say2.component */ "./src/app/components/pages/applications/say2/say2.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Say2Component", function() { return _say2_say2_component__WEBPACK_IMPORTED_MODULE_7__["Say2Component"]; });

/* harmony import */ var _typing_test_typing_test_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./typing-test/typing-test.component */ "./src/app/components/pages/applications/typing-test/typing-test.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypingTestComponent", function() { return _typing_test_typing_test_component__WEBPACK_IMPORTED_MODULE_8__["TypingTestComponent"]; });

/* harmony import */ var _iframe_app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./iframe-app.component */ "./src/app/components/pages/applications/iframe-app.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IFrameAppComponent", function() { return _iframe_app_component__WEBPACK_IMPORTED_MODULE_9__["IFrameAppComponent"]; });

/* harmony import */ var _applications_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./applications.component */ "./src/app/components/pages/applications/applications.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApplicationsComponent", function() { return _applications_component__WEBPACK_IMPORTED_MODULE_10__["ApplicationsComponent"]; });

/* empty/unused harmony star reexport */













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
            template: __webpack_require__(/*! ./multiplication-table.component.html */ "./src/app/components/pages/applications/multiplication-table/multiplication-table.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], MultiplicationTableComponent);
    return MultiplicationTableComponent;
}());



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
            template: __webpack_require__(/*! ./say2.component.html */ "./src/app/components/pages/applications/say2/say2.component.html")
        }),
        __metadata("design:paramtypes", [_node_modules_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _node_modules_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], Say2Component);
    return Say2Component;
}());



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
            template: __webpack_require__(/*! ./typing-test.component.html */ "./src/app/components/pages/applications/typing-test/typing-test.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], TypingTestComponent);
    return TypingTestComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/home/home.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/pages/home/home.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container border border-secondary border-top-0 border-left-0 border-right-0\">\n  <h1 class=\"border border-top-0 border-left-0 border-right-0\">\n    Welcome!\n  </h1>\n  <p class=\"border border-top-0 border-left-0 border-right-0\">\n    This is a website I put together to feature work I have done on\n    various applications including\n    <a (mouseup)=\"openPage($event, 'applications/java')\"\n      class=\"hyperlink w3-hover-text-purple\">Java Applications</a>,\n    <a (mouseup)=\"openPage($event, 'applications/web')\"\n      class=\"hyperlink w3-hover-text-purple\">Web Applications</a>, and\n    <a (mouseup)=\"openPage($event, 'applications/android')\"\n      class=\"hyperlink w3-hover-text-purple\">Android Applications</a>.\n    I also have a few videos that I made that are featured\n    <a (mouseup)=\"openPage($event, 'videos')\"\n      class=\"hyperlink w3-hover-text-purple\">here</a>.\n  </p>\n  <h3>An introduction to me:</h3>\n  <p>\n    I am currently a Computer Science student at the\n    <a (mouseup)=\"openLink($event, 'https://sce.umkc.edu/')\"\n      class=\"hyperlink w3-hover-text-purple\">School of Computing and Engineering</a>\n    at\n    <a (mouseup)=\"openLink($event, 'https://www.umkc.edu/')\"\n      class=\"hyperlink w3-hover-text-purple\">UMKC</a>\n    and a software development intern at\n    <a (mouseup)=\"openLink($event, 'https://wellsky.com/')\"\n      class=\"hyperlink w3-hover-text-purple\">WellSky</a>.\n  </p>\n  <p>\n    I love coding becuase I love learning, and I am a logical thinker.\n    The first programming language I learned was Java through\n    <a (mouseup)=\"openLink($event, 'https://www.firstinspires.org/robotics/frc')\"\n      class=\"hyperlink w3-hover-text-purple\">FRC</a>\n    in high school. This experience in robotics was great, and made me\n    realize that Computer Science could be a possible career path that I\n    could enjoy.\n  </p>\n  <p>\n    I have experience coding in many different languages including\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/Angular_(application_platform)')\"\n      class=\"hyperlink w3-hover-text-purple\">Angular</a> (\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/HTML')\"\n      class=\"hyperlink w3-hover-text-purple\">HTML</a>,\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/Cascading_Style_Sheets')\"\n      class=\"hyperlink w3-hover-text-purple\">CSS</a>, and\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/TypeScript')\"\n      class=\"hyperlink w3-hover-text-purple\">TypeScript</a> ),\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/C%2B%2B')\"\n      class=\"hyperlink w3-hover-text-purple\">C++</a>,\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/C_Sharp_(programming_language)')\"\n      class=\"hyperlink w3-hover-text-purple\">C#</a>,\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/Java')\"\n      class=\"hyperlink w3-hover-text-purple\">Java</a>,\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/Python_(programming_language)')\"\n      class=\"hyperlink w3-hover-text-purple\">Python</a>,\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/SQL')\"\n      class=\"hyperlink w3-hover-text-purple\">SQL</a>, and\n    <a (mouseup)=\"openLink($event, 'https://en.wikipedia.org/wiki/Visual_Basic_.NET')\"\n      class=\"hyperlink w3-hover-text-purple\">VB.net</a>.\n    Some of the resources I use most often to learn coding on my own are\n    <a (mouseup)=\"openLink($event, 'https://stackoverflow.com/')\"\n      class=\"hyperlink w3-hover-text-purple\">Stack Overflow</a>,\n    <a (mouseup)=\"openLink($event, 'https://www.w3schools.com/')\"\n      class=\"hyperlink w3-hover-text-purple\">W3 Schools</a>, and\n    <a (mouseup)=\"openLink($event, 'https://developers.google.com/web/tools/chrome-devtools/console/')\"\n      class=\"hyperlink w3-hover-text-purple\">F12</a>.\n  </p>\n  <p class=\"border border-top-0 border-left-0 border-right-0\">\n    Some of my favorite youtube channels include\n    <a (mouseup)=\"openLink($event, 'https://www.youtube.com/channel/UCpIafFPGutTAKOBHMtGen7g')\"\n      class=\"hyperlink w3-hover-text-purple\">Gus Johnson</a>,\n    <a (mouseup)=\"openLink($event, 'https://www.youtube.com/user/HelloInternetPodcast')\"\n      class=\"hyperlink w3-hover-text-purple\">Hello Internet</a>,\n    <a (mouseup)=\"openLink($event, 'https://www.youtube.com/channel/UCxUycBeiK8TcU6WBRkTXRlg')\"\n      class=\"hyperlink w3-hover-text-purple\">Julian Smith</a>,\n    <a (mouseup)=\"openLink($event, 'https://www.youtube.com/channel/UCsXVk37bltHxD1rDPwtNM8Q')\"\n      class=\"hyperlink w3-hover-text-purple\">Kurzgesagt – In a Nutshell</a>,\n    <a (mouseup)=\"openLink($event, 'https://www.youtube.com/channel/UCSju5G2aFaWMqn-_0YBtq5A')\"\n      class=\"hyperlink w3-hover-text-purple\">standupmaths</a>,\n    <a (mouseup)=\"openLink($event, 'https://www.youtube.com/channel/UCEIwxahdLz7bap-VDs9h35A')\"\n      class=\"hyperlink w3-hover-text-purple\">Steve Mould</a>,\n    <a (mouseup)=\"openLink($event, 'https://www.youtube.com/channel/UCd0ZD4iCXRXf18p3cA7EQfg')\"\n      class=\"hyperlink w3-hover-text-purple\">Taran Van Hemert</a>, and\n    <a (mouseup)=\"openLink($event, 'https://www.youtube.com/user/Vsauce')\"\n      class=\"hyperlink w3-hover-text-purple\">Vsauce</a>.\n  </p>\n  <h3>Check out Some of my Friend's websites:</h3>\n  <a (mouseup)=\"openLink($event, 'https://alexwebberfrc.github.io/')\"\n    class=\"hyperlink w3-hover-text-purple\">Alex</a>,\n  <a (mouseup)=\"openLink($event, 'https://codymoose.github.io/')\"\n    class=\"hyperlink w3-hover-text-purple\">Cody</a>,\n  <a (mouseup)=\"openLink($event, 'http://thekuhnbros.com/hanavan/')\"\n    class=\"hyperlink w3-hover-text-purple\">Hanavan</a>,\n  <a (mouseup)=\"openLink($event, 'https://xyzen.github.io/')\"\n    class=\"hyperlink w3-hover-text-purple\">Tyler</a>, and\n  <a (mouseup)=\"openLink($event, 'https://zachdeibert.github.io/')\"\n    class=\"hyperlink w3-hover-text-purple\">Zach</a>\n  all have websites where you can download or use software as well!\n</div>\n"

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
        _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].initializePage(this, this.router.url, _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["PageNames"].HOME);
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
            _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].navigate(this.router, this.location, page);
        }
        if (event.which === 2) {
            window.open(page);
        }
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-home",
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/components/pages/home/home.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"], _node_modules_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/index.ts":
/*!*******************************************!*\
  !*** ./src/app/components/pages/index.ts ***!
  \*******************************************/
/*! exports provided: HomeComponent, VideosComponent, BettingCalculatorComponent, CodeViewerComponent, DtoConvertComponent, FinalGradeCalculatorComponent, GroupCreatorComponent, HtmlSandboxComponent, MultiplicationTableComponent, Say2Component, TypingTestComponent, IFrameAppComponent, ApplicationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _applications_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applications/index */ "./src/app/components/pages/applications/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BettingCalculatorComponent", function() { return _applications_index__WEBPACK_IMPORTED_MODULE_0__["BettingCalculatorComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CodeViewerComponent", function() { return _applications_index__WEBPACK_IMPORTED_MODULE_0__["CodeViewerComponent"]; });

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

/* harmony import */ var _videos_videos_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./videos/videos.component */ "./src/app/components/pages/videos/videos.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideosComponent", function() { return _videos_videos_component__WEBPACK_IMPORTED_MODULE_2__["VideosComponent"]; });






/***/ }),

/***/ "./src/app/components/pages/videos/videos.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/pages/videos/videos.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container border border-secondary border-top-0 border-left-0 border-right-0\">\n  <h1 class=\"border border-top-0 border-left-0 border-right-0\">Videos</h1>\n  <div *ngFor=\"let video of videos\">\n    <h3>{{ video.title }}</h3>\n    <iframe [src]=\"video.link\" frameborder=\"1\"\n      allow=\"autoplay; encrypted-media\" style=\"width:100%; height:25vh;\" allowfullscreen></iframe>\n    <p class=\"border border-top-0 border-left-0 border-right-0\">\n      {{ video.description }}\n    </p>\n  </div>\n</div>\n"

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
/* harmony import */ var _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../helpers/Helper */ "./src/app/helpers/Helper.ts");
/* harmony import */ var _helpers_DB__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../helpers/DB */ "./src/app/helpers/DB.ts");
/* harmony import */ var _node_modules_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../node_modules/@angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
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
    function VideosComponent(router, location, sanitizer, http) {
        this.router = router;
        this.location = location;
        this.sanitizer = sanitizer;
        this.http = http;
        this.videos = [];
    }
    VideosComponent.prototype.ngOnInit = function () {
        var _this = this;
        _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["Helper"].initializePage(this, this.router.url, _helpers_Helper__WEBPACK_IMPORTED_MODULE_3__["PageNames"].VIDEOS);
        new _helpers_DB__WEBPACK_IMPORTED_MODULE_4__["DB"](this.http).getDB().subscribe(function (db) {
            var dbVideos = db.getVideos();
            _this.videos = [];
            for (var i = 0; i < dbVideos.length; i++) {
                _this.videos.push({
                    title: dbVideos[i]["title"],
                    link: _this.sanitizer.bypassSecurityTrustResourceUrl(dbVideos[i]["link"]),
                    description: dbVideos[i]["description"]
                });
            }
        });
    };
    VideosComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-videos",
            template: __webpack_require__(/*! ./videos.component.html */ "./src/app/components/pages/videos/videos.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _node_modules_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"]])
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

var DB = /** @class */ (function () {
    function DB(http, database) {
        this.http = http;
        this.database = database;
        if (database) {
            this.db = database;
            this.applications = this.db.nate314.home.pages[0];
            this.videos = this.db.nate314.home.pages[1].subpages[0]["videos"];
            console.log(database);
        }
    }
    DB.prototype.getDB = function () {
        var _this = this;
        return this.http.get("/site/assets/db.json").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (resp) {
            return new DB(_this.http, resp);
        }));
    };
    DB.prototype.getHome = function () {
        return this.db.nate314.home;
    };
    DB.prototype.getPages = function () {
        return this.db.nate314.home.pages;
    };
    DB.prototype.getApplications = function () {
        return this.applications;
    };
    DB.prototype.getJavaApplications = function () {
        console.log(this.applications);
        return this.applications.subpages[0];
    };
    DB.prototype.getWebApplications = function () {
        return this.applications.subpages[1];
    };
    DB.prototype.getAndroidApplications = function () {
        return this.applications.subpages[2];
    };
    DB.prototype.getVideos = function () {
        console.log(this.videos);
        return this.videos;
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

/***/ "./src/app/helpers/FileStructure.ts":
/*!******************************************!*\
  !*** ./src/app/helpers/FileStructure.ts ***!
  \******************************************/
/*! exports provided: SiteFolder, SiteComponent, getSiteFiles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SiteFolder", function() { return SiteFolder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SiteComponent", function() { return SiteComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSiteFiles", function() { return getSiteFiles; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SiteFolder = /** @class */ (function () {
    function SiteFolder() {
    }
    return SiteFolder;
}());

var SiteComponent = /** @class */ (function (_super) {
    __extends(SiteComponent, _super);
    function SiteComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SiteComponent;
}(SiteFolder));

function getSiteFiles() {
    return SiteFiles;
}
var SiteFiles = {
    name: "site",
    folders: [
        {
            name: "e2e",
            folders: [
                {
                    name: "src",
                    folders: [],
                    files: ["app.e2e-spec.ts", "app.po.ts"]
                }
            ],
            files: ["protractor.conf.js", "tsconfig.e2e.ts"]
        },
        {
            name: "src",
            folders: [
                {
                    name: "app",
                    folders: [
                        {
                            name: "components",
                            folders: [
                                {
                                    name: "application-structure",
                                    folders: [
                                        {
                                            name: "app-component",
                                            HTML: true, TS: true
                                        },
                                        {
                                            name: "footer",
                                            HTML: true, TS: true
                                        },
                                        {
                                            name: "navbar",
                                            HTML: true, TS: true
                                        },
                                        {
                                            name: "not-found",
                                            HTML: true, TS: true
                                        }
                                    ],
                                    files: ["index.ts"]
                                },
                                {
                                    name: "pages",
                                    folders: [
                                        {
                                            name: "applications",
                                            components: [
                                                {
                                                    name: "betting-calculator",
                                                    HTML: true, TS: true
                                                },
                                                {
                                                    name: "dto-convert",
                                                    HTML: true, TS: true
                                                },
                                                {
                                                    name: "final-grade-calculator",
                                                    HTML: true, TS: true
                                                },
                                                {
                                                    name: "group-creator",
                                                    HTML: true, TS: true
                                                },
                                                {
                                                    name: "html-sandbox",
                                                    HTML: true, TS: true
                                                },
                                                {
                                                    name: "multiplication-table",
                                                    HTML: true, TS: true
                                                },
                                                {
                                                    name: "say2",
                                                    HTML: true, TS: true
                                                },
                                                {
                                                    name: "typing-test",
                                                    HTML: true, TS: true
                                                }
                                            ],
                                            HTML: true, TS: true,
                                            files: ["iframe-app.component.ts", "index.ts"]
                                        },
                                        {
                                            name: "home",
                                            HTML: true, TS: true
                                        },
                                        {
                                            name: "videos",
                                            HTML: true, TS: true
                                        }
                                    ],
                                    files: []
                                }
                            ],
                            files: []
                        },
                        {
                            name: "modules",
                            folders: [],
                            files: ["DB.ts", "FileStructure.ts", "Helper.ts"]
                        }
                    ],
                    files: ["app-routing.module.ts", "app.module.ts", "routes.ts"]
                },
                {
                    name: "assets",
                    folders: [],
                    files: ["db.json"]
                },
                {
                    name: "environments",
                    folders: [],
                    files: ["environment.prod.ts", "envoronment.ts"]
                }
            ],
            files: ["browserlist", "favicon.ico", "index.html", "karma.conf.js", "main.ts", "polyfills.ts",
                "styles.css", "test.ts", "tsconfig.app.json", "tsconfig.spec.json", "tslint.json"]
        }
    ],
    files: [".editorconfig", ".firebawerc", ".gitignore", ".angular.json", "firebase.json", "package-lock.json",
        "package.json", "README.md", "tsconfig.json", "tslint.json"]
};


/***/ }),

/***/ "./src/app/helpers/Helper.ts":
/*!***********************************!*\
  !*** ./src/app/helpers/Helper.ts ***!
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
    Constants.dev = false;
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
    { path: "webapplications/colorflux", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["IFrameAppComponent"] },
    { path: "webapplications/dtoconvert", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["DtoConvertComponent"] },
    { path: "webapplications/finalgradecalculator", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["FinalGradeCalculatorComponent"] },
    { path: "webapplications/flappyfinch", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["IFrameAppComponent"] },
    { path: "webapplications/floatystars", component: _components_pages_applications_index__WEBPACK_IMPORTED_MODULE_3__["IFrameAppComponent"] },
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

module.exports = __webpack_require__(/*! C:\Users\Natha\Documents\Development\Angular\site\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map