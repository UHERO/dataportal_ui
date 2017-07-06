webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"wrapper\">\r\n    <app-header></app-header>\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-1 col-md-4 col-lg-3 col-xl-2 sidebar-container\">\r\n                <div class=\"sidebar-col\">\r\n                    <app-sidebar-nav></app-sidebar-nav>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-xs-12 col-md-8 col-lg-9 col-xl-10 content-col\">\r\n                <div class=\"alert alert-info alert-dismissible fade show browser\" role=\"alert\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\r\n                        <span aria-hidden=\"true\">&times;</span>\r\n                    </button>\r\n                    This site works best on <a class=\"alert-link\" href=\"https://www.google.com/chrome/\" target=\"_blank\">Google Chrome</a>.\r\n                </div>\r\n                <router-outlet></router-outlet>\r\n                <app-feedback></app-feedback>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#wrapper {\n  width: 100%;\n  min-height: 100px;\n  height: 100%; }\n  #wrapper .container, #wrapper .row {\n    margin: 0;\n    padding: 0;\n    min-height: 100%; }\n    @media (min-width: 1200px) {\n      #wrapper .container, #wrapper .row {\n        width: 1300px;\n        max-width: 100%; } }\n  #wrapper .sidebar-container {\n    position: relative;\n    padding-left: 0px; }\n  @media (max-width: 767px) {\n    #wrapper .sidebar-col {\n      position: fixed;\n      width: 100%;\n      z-index: 1; } }\n  @media (min-width: 768px) {\n    #wrapper .sidebar-col {\n      position: fixed;\n      top: 0;\n      left: 0; } }\n  #wrapper .content-col .browser {\n    position: fixed;\n    top: 55px;\n    right: 0px;\n    z-index: 2;\n    margin-bottom: 0;\n    padding: 0.25rem 1.25rem;\n    height: 30px;\n    border-radius: 0;\n    font-size: 0.8em; }\n    #wrapper .content-col .browser button {\n      top: -0.35rem;\n      padding: 0.2rem 1.25rem; }\n  @media (min-width: 1200px) {\n    #wrapper .content-col {\n      padding-left: 50px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(_router) {
        this._router = _router;
        this._router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["NavigationEnd"]) {
                // Send page views to Google Analytics
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        if (navigator.userAgent.search('Chrome') === -1) {
            $('.browser').show();
        }
        else {
            $('.browser').hide();
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_highcharts__ = __webpack_require__("../../../../angular2-highcharts/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_highcharts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_highcharts_dist_HighchartsService__ = __webpack_require__("../../../../angular2-highcharts/dist/HighchartsService.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_highcharts_dist_HighchartsService___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_highcharts_dist_HighchartsService__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routes__ = __webpack_require__("../../../../../src/app/app.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__uhero_api_service__ = __webpack_require__("../../../../../src/app/uhero-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__category_helper_service__ = __webpack_require__("../../../../../src/app/category-helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__series_helper_service__ = __webpack_require__("../../../../../src/app/series-helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__helper_service__ = __webpack_require__("../../../../../src/app/helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__google_analytics_events_service__ = __webpack_require__("../../../../../src/app/google-analytics-events.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__landing_page_landing_page_component__ = __webpack_require__("../../../../../src/app/landing-page/landing-page.component.ts");
/* unused harmony export highchartsFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// Temp workaround for build errors
// See: https://github.com/gevgeny/angular2-highcharts/issues/160

function highchartsFactory() {
    var highcharts = __webpack_require__("../../../../highcharts/js/highstock.js");
    var exp = __webpack_require__("../../../../highcharts/js/modules/exporting.js");
    var offlineExport = __webpack_require__("../../../../highcharts/js/modules/offline-exporting.js");
    var csv = __webpack_require__("../../../../../src/app/csv-export.js");
    exp(highcharts);
    offlineExport(highcharts);
    csv(highcharts);
    highcharts.setOptions({
        lang: {
            thousandsSep: ','
        }
    });
    return (highcharts);
}









var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_14__landing_page_landing_page_component__["a" /* LandingPageComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__["a" /* Shared */],
            __WEBPACK_IMPORTED_MODULE_7__app_routes__["a" /* routing */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_4_angular2_highcharts__["ChartModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_9__uhero_api_service__["a" /* UheroApiService */],
            __WEBPACK_IMPORTED_MODULE_10__category_helper_service__["a" /* CategoryHelperService */],
            __WEBPACK_IMPORTED_MODULE_11__series_helper_service__["a" /* SeriesHelperService */],
            __WEBPACK_IMPORTED_MODULE_12__helper_service__["a" /* HelperService */],
            __WEBPACK_IMPORTED_MODULE_13__google_analytics_events_service__["a" /* GoogleAnalyticsEventsService */],
            {
                provide: __WEBPACK_IMPORTED_MODULE_5_angular2_highcharts_dist_HighchartsService__["HighchartsStatic"],
                useFactory: highchartsFactory
            },
            {
                provide: 'rootCategory',
                useValue: 59
            },
            {
                provide: 'logo',
                useValue: '../../assets/UHEROdata-Logo-color.svg'
            },
            {
                provide: 'seriesType',
                useValue: 'column'
            }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__landing_page_landing_page_component__ = __webpack_require__("../../../../../src/app/landing-page/landing-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__single_series_single_series_component__ = __webpack_require__("../../../../../src/app/single-series/single-series.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });



var routes = [
    // map / to the landing page
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_1__landing_page_landing_page_component__["a" /* LandingPageComponent */]
    },
    {
        path: 'category',
        component: __WEBPACK_IMPORTED_MODULE_1__landing_page_landing_page_component__["a" /* LandingPageComponent */]
    },
    {
        path: 'series',
        component: __WEBPACK_IMPORTED_MODULE_2__single_series_single_series_component__["a" /* SingleSeriesComponent */]
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["RouterModule"].forRoot(routes, { useHash: true });
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ "../../../../../src/app/category-charts/category-charts.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"multi-charts-row\" *ngIf=\"!data\">\r\n\t<p *ngIf=\"noSeries\" class=\"no-data\">No Data Available</p>\r\n</div>\r\n<div class=\"multi-charts-row\" *ngIf=\"data\">\r\n\t<p *ngIf=\"noSeries\" class=\"no-data\">No Data Available</p>\r\n\t<ng-template ngFor let-serie [ngForOf]=\"data\">\r\n\t\t<div class=\"multi-charts\">\r\n\t\t\t<a href=\"#\" [routerLink]=\"['/series']\" [queryParams]=\"{id: serie.seriesInfo.id, sa: serie.seriesInfo.saParam}\" queryParamsHandling='merge' *ngIf=\"serie.seriesInfo.id\" (click)=\"submitGAEvent(serie.seriesInfo.id)\">\r\n\t\t\t\t<app-highchart [chartStart]=\"chartStart\" [chartEnd]=\"chartEnd\" [seriesData]=\"serie\" [currentFreq]=\"freq\"></app-highchart>\r\n\t\t\t</a>\r\n\t\t</div>\r\n\t</ng-template>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/category-charts/category-charts.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n.multi-charts-row {\n  display: block;\n  margin-bottom: 40px; }\n\n.no-data {\n  margin-top: 10px;\n  font-size: 0.9em; }\n\n.multi-charts {\n  display: inline-block;\n  padding: 0 3px;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n  -moz-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n  -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n  margin: 10px 10px 10px 3px;\n  background: #F9F9F9; }\n  .multi-charts a:hover {\n    text-decoration: none; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/category-charts/category-charts.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__google_analytics_events_service__ = __webpack_require__("../../../../../src/app/google-analytics-events.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryChartsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CategoryChartsComponent = (function () {
    function CategoryChartsComponent(googleAES) {
        this.googleAES = googleAES;
    }
    CategoryChartsComponent.prototype.ngOnInit = function () {
    };
    // Google Analytics: Track clicking on series
    CategoryChartsComponent.prototype.submitGAEvent = function (seriesId) {
        var id = seriesId.toString();
        this.googleAES.emitEvent('series', 'click', id);
    };
    return CategoryChartsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "freq", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "noSeries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "nsaActive", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "yoyActive", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "ytdActive", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "params", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "chartStart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "chartEnd", void 0);
CategoryChartsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-category-charts',
        template: __webpack_require__("../../../../../src/app/category-charts/category-charts.component.html"),
        styles: [__webpack_require__("../../../../../src/app/category-charts/category-charts.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__google_analytics_events_service__["a" /* GoogleAnalyticsEventsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__google_analytics_events_service__["a" /* GoogleAnalyticsEventsService */]) === "function" && _a || Object])
], CategoryChartsComponent);

var _a;
//# sourceMappingURL=category-charts.component.js.map

/***/ }),

/***/ "../../../../../src/app/category-datatables/category-datatables.component.html":
/***/ (function(module, exports) {

module.exports = "<table [id]=\"'indicator-table-' + tableId\" width=\"100%\">\r\n</table>\r\n"

/***/ }),

/***/ "../../../../../src/app/category-datatables/category-datatables.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n.dataTables_wrapper {\n  display: inline-block; }\n  .dataTables_wrapper .buttons-csv {\n    color: #1D667F;\n    text-decoration: none;\n    font-size: 0.85em; }\n    .dataTables_wrapper .buttons-csv .material-icons {\n      font-size: 18px;\n      vertical-align: middle; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/category-datatables/category-datatables.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_datatables_net__ = __webpack_require__("../../../../datatables.net/js/jquery.dataTables.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_datatables_net___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_datatables_net__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_datatables_net_fixedcolumns__ = __webpack_require__("../../../../datatables.net-fixedcolumns/js/dataTables.fixedColumns.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_datatables_net_fixedcolumns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_datatables_net_fixedcolumns__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_datatables_net_buttons_js_dataTables_buttons_js__ = __webpack_require__("../../../../datatables.net-buttons/js/dataTables.buttons.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_datatables_net_buttons_js_dataTables_buttons_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_datatables_net_buttons_js_dataTables_buttons_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_datatables_net_buttons_js_buttons_html5_js__ = __webpack_require__("../../../../datatables.net-buttons/js/buttons.html5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_datatables_net_buttons_js_buttons_html5_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_datatables_net_buttons_js_buttons_html5_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_datatables_net_buttons_js_buttons_flash_js__ = __webpack_require__("../../../../datatables.net-buttons/js/buttons.flash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_datatables_net_buttons_js_buttons_flash_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_datatables_net_buttons_js_buttons_flash_js__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryDatatablesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CategoryDatatablesComponent = (function () {
    function CategoryDatatablesComponent() {
    }
    CategoryDatatablesComponent.prototype.ngOnInit = function () {
    };
    CategoryDatatablesComponent.prototype.ngAfterViewInit = function () {
        if (this.categoryDates && this.sublist.displaySeries) {
            this.initDatatable();
        }
    };
    CategoryDatatablesComponent.prototype.ngOnChanges = function () {
        if (this.tableWidget) {
            this.tableWidget.destroy();
            __WEBPACK_IMPORTED_MODULE_1_jquery__('#indicator-table-' + this.tableId).empty();
        }
        if (this.categoryDates && this.sublist.displaySeries) {
            this.initDatatable();
        }
    };
    CategoryDatatablesComponent.prototype.initDatatable = function () {
        var datatables = this.formatTable(this.sublist.displaySeries, this.categoryDates);
        var tableElement = __WEBPACK_IMPORTED_MODULE_1_jquery__('#indicator-table-' + this.tableId);
        var tableColumns = datatables.tableColumns;
        var tableData = datatables.tableData;
        var sublistName = this.sublist.name;
        var parentName = this.sublist.parentName;
        var parentId = this.sublist.parentId;
        var geo = this.geo;
        var freq = this.freq;
        var urlId = parentId ? parentId : sublistName;
        this.tableWidget = tableElement.DataTable({
            data: tableData,
            dom: 'B',
            columns: tableColumns,
            buttons: [{
                    extend: 'csv',
                    text: 'Download CSV <i class="fa fa-file-excel-o" aria-hidden="true"></i>',
                    filename: sublistName,
                    customize: function (csv) {
                        return 'The University of Hawaii Economic Research Organization (UHERO) \n Data Portal: http://data.uhero.hawaii.edu/ \n ' +
                            parentName + ' - ' + sublistName + ' (' + geo.name + ' - ' + freq.label + ')' +
                            ': http://data.uhero.hawaii.edu/#/category/table?id=' + urlId +
                            '\n\n' + csv;
                    }
                }],
            columnDefs: [
                {
                    'targets': '_all',
                    'render': function (data, type, row, meta) {
                        // If no data is available for a given year, return an empty string
                        return data === undefined ? ' ' : data;
                    }
                }
            ],
            bSort: false,
            paging: false,
            searching: false,
            info: false,
        });
        tableElement.hide();
    };
    CategoryDatatablesComponent.prototype.formatTable = function (displaySeries, tableDates) {
        var yoySelected = this.yoy;
        var ytdSelected = this.ytd;
        // Format table for jquery datatables
        var tableData = [];
        var tableColumns = [];
        tableColumns.push({ title: 'Series', data: 'series' });
        tableDates.forEach(function (date) {
            tableColumns.push({ title: date.tableDate, data: 'observations.' + date.tableDate });
        });
        displaySeries.forEach(function (series) {
            if (series.seriesInfo !== 'No data available') {
                var observations_1 = {};
                var title = series.seriesInfo.title;
                series.categoryTable.forEach(function (obs) {
                    observations_1[obs.tableDate] = obs.level;
                });
                tableData.push({
                    series: title,
                    observations: observations_1
                });
            }
        });
        if (yoySelected) {
            tableData.push({
                series: '',
                observations: ''
            }, {
                series: '',
                observations: ''
            }, {
                series: 'Year/Year',
                observations: ''
            });
            displaySeries.forEach(function (series) {
                var yoy = {};
                var percent = series.seriesInfo.percent;
                var yoyLabel = percent ? ' (ch)' : ' (%)';
                var title = series.seriesInfo.title;
                series.categoryTable.forEach(function (obs) {
                    yoy[obs.tableDate] = obs.yoy;
                });
                tableData.push({
                    series: title + yoyLabel,
                    observations: yoy
                });
            });
        }
        if (ytdSelected) {
            tableData.push({
                series: '',
                observations: ''
            }, {
                series: '',
                observations: ''
            }, {
                series: 'Year-to-Date',
                observations: ''
            });
            displaySeries.forEach(function (series) {
                var ytd = {};
                var percent = series.seriesInfo.percent;
                var ytdLabel = percent ? ' (ch)' : ' (%)';
                var title = series.seriesInfo.title;
                series.categoryTable.forEach(function (obs) {
                    ytd[obs.tableDate] = obs.ytd;
                });
                tableData.push({
                    series: title + ytdLabel,
                    observations: ytd
                });
            });
        }
        return { tableColumns: tableColumns, tableData: tableData };
    };
    return CategoryDatatablesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryDatatablesComponent.prototype, "tableId", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryDatatablesComponent.prototype, "sublist", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryDatatablesComponent.prototype, "categoryDates", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryDatatablesComponent.prototype, "geo", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryDatatablesComponent.prototype, "freq", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryDatatablesComponent.prototype, "yoy", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryDatatablesComponent.prototype, "ytd", void 0);
CategoryDatatablesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-category-datatables',
        template: __webpack_require__("../../../../../src/app/category-datatables/category-datatables.component.html"),
        styles: [__webpack_require__("../../../../../src/app/category-datatables/category-datatables.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [])
], CategoryDatatablesComponent);

//# sourceMappingURL=category-datatables.component.js.map

/***/ }),

/***/ "../../../../../src/app/category-helper.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__ = __webpack_require__("../../../../../src/app/uhero-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_service__ = __webpack_require__("../../../../../src/app/helper.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryHelperService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Set up data used in category chart and table displays




var CategoryHelperService = CategoryHelperService_1 = (function () {
    function CategoryHelperService(_uheroAPIService, _helper) {
        this._uheroAPIService = _uheroAPIService;
        this._helper = _helper;
        this.categoryData = {};
        this.categoryDates = [];
        this.seriesDates = [];
        this.series = [];
    }
    CategoryHelperService.setCacheId = function (category, routeGeo, routeFreq) {
        var id = '' + category;
        if (routeGeo) {
            id = id + routeGeo;
        }
        if (routeFreq) {
            id = id + routeFreq;
        }
        return id;
    };
    // Called on page load
    // Gets data sublists available for a selected category
    CategoryHelperService.prototype.initContent = function (catId, routeGeo, routeFreq) {
        var _this = this;
        var cacheId = CategoryHelperService_1.setCacheId(catId, routeGeo, routeFreq);
        if (this.categoryData[cacheId]) {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of([this.categoryData[cacheId]]);
        }
        else {
            this.categoryData[cacheId] = {};
            this._uheroAPIService.fetchCategories().subscribe(function (categories) {
                var cat = categories.find(function (category) { return category.id === catId; });
                if (cat) {
                    var selectedCategory = cat.name;
                    var sublist = cat.children;
                    _this.defaultFreq = cat.defaults ? cat.defaults.freq : '';
                    _this.defaultGeo = cat.defaults ? cat.defaults.geo : '';
                    _this.categoryData[cacheId].selectedCategory = selectedCategory;
                    var sublistCopy_1 = [];
                    sublist.forEach(function (sub) {
                        sublistCopy_1.push(Object.assign({}, sub));
                    });
                    _this.categoryData[cacheId].sublist = sublistCopy_1;
                    _this.getSubcategoryData(selectedCategory, cacheId, catId, _this.categoryData[cacheId].sublist, routeGeo, routeFreq);
                }
                else {
                    _this.categoryData[cacheId].invalid = 'Category does not exist.';
                }
            });
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].forkJoin(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(this.categoryData[cacheId]));
        }
    };
    CategoryHelperService.prototype.getSubcategoryData = function (catName, cacheId, catId, sublist, routeGeo, routeFreq) {
        var _this = this;
        var geoArray = [], freqArray = [];
        var categoryDateWrapper = { firstDate: '', endDate: '' };
        sublist.forEach(function (sub, index) {
            // Get all regions available in a given category
            _this._uheroAPIService.fetchSelectedCategory(sub.id).subscribe(function (category) {
                var freqGeos, geoFreqs;
                freqGeos = category.freqGeos;
                geoFreqs = category.geoFreqs;
                geoFreqs.forEach(function (geo) {
                    _this._helper.uniqueGeos(geo, geoArray);
                });
                freqGeos.forEach(function (freq) {
                    _this._helper.uniqueFreqs(freq, freqArray);
                });
            }, function (error) {
                _this.errorMessage = error;
            }, function () {
                _this.requestsRemain = sublist.length;
                if (index === sublist.length - 1) {
                    sublist.forEach(function (subcat, i) {
                        var dateWrapper = {};
                        var selectedFreq, selectedGeo;
                        selectedFreq = _this.defaultFreq ? _this.defaultFreq : freqArray[0].freq;
                        selectedGeo = _this.defaultGeo ? _this.defaultGeo : geoArray[0].handle;
                        if (routeFreq || routeGeo) {
                            var selected = _this.checkSelectedGeosFreqs(routeFreq, routeGeo, freqArray, geoArray);
                            selectedFreq = selected.freq;
                            selectedGeo = selected.geo;
                        }
                        var freqs, regions, currentGeo, currentFreq;
                        // Get frequencies available for a selected region
                        freqs = geoArray.find(function (geo) { return geo.handle === selectedGeo; }).freqs;
                        regions = freqArray.find(function (freq) { return freq.freq === selectedFreq; }).geos;
                        currentGeo = regions.find(function (region) { return region.handle === selectedGeo; });
                        currentFreq = freqs.find(function (freq) { return freq.freq === selectedFreq; });
                        _this.categoryData[cacheId].regions = regions;
                        _this.categoryData[cacheId].frequencies = freqs;
                        _this.categoryData[cacheId].currentGeo = currentGeo;
                        _this.categoryData[cacheId].currentFreq = currentFreq;
                        subcat.parentName = catName;
                        var subcategory = {
                            subcat: subcat,
                            cacheId: cacheId,
                            currentGeo: currentGeo,
                            currentFreq: currentFreq,
                            dateWrapper: dateWrapper,
                            categoryDateWrapper: categoryDateWrapper
                        };
                        _this.getSeriesData(subcategory);
                    });
                }
            });
        });
    };
    // Get regions and frequencies available for a selected category
    CategoryHelperService.prototype.getSeriesData = function (subcategory) {
        var _this = this;
        var subcat = subcategory.subcat;
        var cacheId = subcategory.cacheId;
        var currentGeo = subcategory.currentGeo;
        var currentFreq = subcategory.currentFreq;
        var dateWrapper = subcategory.dateWrapper;
        var categoryDateWrapper = subcategory.categoryDateWrapper;
        var expandedResults;
        this._uheroAPIService.fetchExpanded(subcat['id'], currentGeo.handle, currentFreq.freq).subscribe(function (expanded) {
            expandedResults = expanded;
        }, function (error) {
            console.log('error', error);
            error = _this.errorMessage = error;
        }, function () {
            _this.requestsRemain -= 1;
            if (expandedResults) {
                // sublist id used as anchor fragments in landing-page component, fragment expects a string
                subcat.id = subcat.id.toString();
                // Get array of all series that have level data available
                // Filter out series from expandedResults with non-seasonally-adjusted data
                var splitSeries_1 = _this.getDisplaySeries(expandedResults, dateWrapper, currentFreq.freq, categoryDateWrapper);
                if (splitSeries_1) {
                    subcat.displaySeries = splitSeries_1.displaySeries;
                    // sublist.allSeries = expandedResults;
                    subcat.dateWrapper = splitSeries_1.dateWrapper;
                    _this.categoryData[cacheId].categoryDateWrapper = splitSeries_1.categoryDateWrapper;
                    subcat.noData = false;
                }
                if (!splitSeries_1) {
                    // No series exist for a subcateogry
                    _this.setNoData(subcat);
                }
                if (_this.requestsRemain === 0) {
                    var categoryDateArray_1 = [];
                    var catWrapper = splitSeries_1.categoryDateWrapper;
                    _this._helper.createDateArray(catWrapper.firstDate, catWrapper.endDate, currentFreq.freq, categoryDateArray_1);
                    var category_1 = _this.categoryData[cacheId];
                    category_1.sublist.forEach(function (sub, i) {
                        _this.formatCategoryData(sub.displaySeries, categoryDateArray_1, splitSeries_1.categoryDateWrapper);
                        if (i === category_1.sublist.length - 1) {
                            category_1.categoryDates = categoryDateArray_1;
                            category_1.sliderDates = _this._helper.getTableDates(categoryDateArray_1);
                            category_1.requestComplete = true;
                        }
                    });
                }
            }
            else {
                // No series exist for a subcateogry
                _this.setNoData(subcategory);
            }
        });
    };
    CategoryHelperService.prototype.setNoData = function (subcategory) {
        var series = [{ seriesInfo: 'No data available' }];
        subcategory.dateWrapper = {};
        subcategory.dateRange = [];
        subcategory.datatables = {};
        subcategory.displaySeries = series;
        subcategory.noData = true;
    };
    // Set up search results
    CategoryHelperService.prototype.initSearch = function (search, routeGeo, routeFreq) {
        var _this = this;
        var cacheId = CategoryHelperService_1.setCacheId(search, routeGeo, routeFreq);
        if (this.categoryData[cacheId]) {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of([this.categoryData[cacheId]]);
        }
        else {
            var obsEnd_1, obsStart_1, freqGeos_1, geoFreqs_1;
            this.categoryData[cacheId] = {};
            this._uheroAPIService.fetchSearch(search).subscribe(function (results) {
                _this.defaults = results.defaults;
                freqGeos_1 = results.freqGeos;
                geoFreqs_1 = results.geoFreqs;
                obsEnd_1 = results.observationEnd;
                obsStart_1 = results.observationStart;
            }, function (error) {
                _this.errorMessage = error;
            }, function () {
                if (obsEnd_1 && obsStart_1) {
                    var dateWrapper = {};
                    _this.searchSettings(search, cacheId, dateWrapper, geoFreqs_1, freqGeos_1, routeGeo, routeFreq);
                    _this.categoryData[cacheId].selectedCategory = 'Search: ' + search;
                }
                else {
                    _this.categoryData[cacheId].invalid = search;
                }
            });
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].forkJoin(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(this.categoryData[cacheId]));
        }
    };
    CategoryHelperService.prototype.searchSettings = function (search, cacheId, dateWrapper, geoFreqs, freqGeos, routeGeo, routeFreq) {
        var dateArray = [];
        var selectedFreq, selectedGeo;
        selectedFreq = this.defaultFreq ? this.defaultFreq : freqGeos[0].freq;
        selectedGeo = this.defaultGeo ? this.defaultGeo : geoFreqs[0].handle;
        if (routeFreq || routeGeo) {
            var selected = this.checkSelectedGeosFreqs(routeFreq, routeGeo, freqGeos, geoFreqs);
            selectedFreq = selected.freq;
            selectedGeo = selected.geo;
        }
        var freqs, regions, currentFreq, currentGeo;
        freqs = geoFreqs.find(function (geo) { return geo.handle === selectedGeo; }).freqs;
        var selectedFreqExists = freqs.find(function (freq) { return freq.freq === selectedFreq; });
        // Check if the selected frequency exists in the list of freqs for a selected geo
        selectedFreq = selectedFreqExists ? selectedFreq : freqs[0].freq;
        regions = freqGeos.find(function (freq) { return freq.freq === selectedFreq; }).geos;
        var selectedGeoExists = regions.find(function (region) { return region.handle === selectedGeo; });
        // Check if the selected geo exists in the list of regions for a selected frequency
        selectedGeo = selectedGeoExists ? selectedGeo : regions[0].handle;
        currentGeo = regions.find(function (region) { return region.handle === selectedGeo; });
        currentFreq = freqs.find(function (freq) { return freq.freq === selectedFreq; });
        this.categoryData[cacheId].regions = regions;
        this.categoryData[cacheId].currentGeo = currentGeo;
        this.categoryData[cacheId].frequencies = freqs;
        this.categoryData[cacheId].currentFreq = currentFreq;
        this.getSearchData(search, cacheId, currentGeo.handle, currentFreq.freq, dateWrapper, routeGeo, routeFreq);
    };
    CategoryHelperService.prototype.getSearchData = function (search, cacheId, geo, freq, dateWrapper, routeGeo, routeFreq) {
        var _this = this;
        var searchResults;
        var categoryDateWrapper = { firstDate: '', endDate: '' };
        // Get expanded search results for a selected region & frequency
        this._uheroAPIService.fetchSearchSeriesExpand(search, geo, freq).subscribe(function (searchRes) {
            searchResults = searchRes;
        }, function (error) {
            _this.errorMessage = error;
        }, function () {
            if (searchResults) {
                // Get array of all series that have level data available
                // const searchSeries = this.filterSeriesResults(searchResults, freq, dateWrapper);
                var splitSeries = _this.getDisplaySeries(searchResults, dateWrapper, freq, categoryDateWrapper);
                var sublist = {
                    id: 'search',
                    parentName: 'Search',
                    name: search,
                    dateWrapper: splitSeries.dateWrapper,
                    displaySeries: splitSeries.displaySeries
                };
                var categoryDateArray = [];
                var catWrapper = splitSeries.categoryDateWrapper;
                _this._helper.createDateArray(catWrapper.firstDate, catWrapper.endDate, freq, categoryDateArray);
                _this.formatCategoryData(splitSeries.displaySeries, categoryDateArray, splitSeries.categoryDateWrapper);
                _this.categoryData[cacheId].sublist = [sublist];
                _this.categoryData[cacheId].categoryDateWrapper = splitSeries.categoryDateWrapper;
                _this.categoryData[cacheId].categoryDates = categoryDateArray;
                _this.categoryData[cacheId].sliderDates = _this._helper.getTableDates(categoryDateArray);
                _this.categoryData[cacheId].requestComplete = true;
            }
        });
    };
    CategoryHelperService.prototype.checkSelectedGeosFreqs = function (routeFreq, routeGeo, freqArray, geoArray) {
        // Check if freq/geo specified in route exists in a category's list of freqs/geos
        var freqExist = freqArray.find(function (freq) { return freq.freq === routeFreq; });
        var geoExist = geoArray.find(function (geo) { return geo.handle === routeGeo; });
        // If either does not exist, set selected freq & geo to the category's default
        // or first element of freq/geo arrays if default is not specified
        if (!freqExist || !geoExist) {
            return { freq: this.defaultFreq ? this.defaultFreq : freqArray[0].freq, geo: this.defaultGeo ? this.defaultGeo : geoArray[0].handle };
        }
        else {
            return { freq: routeFreq, geo: routeGeo };
        }
    };
    CategoryHelperService.prototype.filterSeriesResults = function (results, freq, dateWrapper) {
        var _this = this;
        var filtered = [];
        results.forEach(function (res) {
            var seriesDates = [], series;
            var seriesObsStart = res.seriesObservations.observationStart;
            var seriesObsEnd = res.seriesObservations.observationEnd;
            var levelData = res.seriesObservations.transformationResults[0].observations;
            var decimals = res.decimals ? res.decimals : 1;
            // Add series if level data is available
            if (levelData) {
                seriesDates = _this._helper.createDateArray(seriesObsStart, seriesObsEnd, freq, seriesDates);
                series = _this._helper.dataTransform(res.seriesObservations, seriesDates, decimals);
                res.saParam = res.seasonalAdjustment === 'seasonally_adjusted';
                series.seriesInfo = res;
                filtered.push(series);
            }
        });
        return filtered;
    };
    CategoryHelperService.prototype.getDisplaySeries = function (allSeries, dateWrapper, freq, categoryDateWrapper) {
        var dateArray = [];
        // Check if (non-annual) category has seasonally adjusted data
        // Returns true for annual data
        var displaySeries = [];
        var measurements = new Map();
        allSeries.forEach(function (series) {
            if (!series.hasOwnProperty('measurementId')) {
                displaySeries.push(series);
                return;
            }
            var measurementKey = "m" + series.measurementId;
            if (!measurements.has(measurementKey)) {
                measurements.set(measurementKey, series);
                return;
            }
            if (series.seasonalAdjustment !== 'not_seasonally_adjusted') {
                measurements.set(measurementKey, series);
            }
        });
        measurements.forEach(function (measurement) { return displaySeries.push(measurement); });
        // Filter out series that do not have level data
        var filtered = this.filterSeriesResults(displaySeries, freq, dateWrapper);
        if (filtered.length) {
            this._helper.setDateWrapper(filtered, dateWrapper);
            this._helper.createDateArray(dateWrapper.firstDate, dateWrapper.endDate, freq, dateArray);
            if (categoryDateWrapper.firstDate === '' || dateWrapper.firstDate < categoryDateWrapper.firstDate) {
                categoryDateWrapper.firstDate = dateWrapper.firstDate;
            }
            if (categoryDateWrapper.endDate === '' || dateWrapper.endDate > categoryDateWrapper.endDate) {
                categoryDateWrapper.endDate = dateWrapper.endDate;
            }
            return {
                displaySeries: filtered,
                dateWrapper: dateWrapper,
                categoryDateWrapper: categoryDateWrapper
            };
        }
    };
    CategoryHelperService.prototype.formatCategoryData = function (displaySeries, dateArray, dateWrapper) {
        var _this = this;
        displaySeries.forEach(function (series) {
            if (series.seriesInfo !== 'No data available') {
                var decimals = series.decimals ? series.decimals : 1;
                series['categoryTable'] = _this._helper.catTable(series.tableData, dateArray, decimals);
                series['categoryChart'] = _this._helper.dataTransform(series.seriesInfo.seriesObservations, dateArray, decimals);
            }
        });
    };
    return CategoryHelperService;
}());
CategoryHelperService = CategoryHelperService_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__["a" /* UheroApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__["a" /* UheroApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__helper_service__["a" /* HelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__helper_service__["a" /* HelperService */]) === "function" && _b || Object])
], CategoryHelperService);

var CategoryHelperService_1, _a, _b;
//# sourceMappingURL=category-helper.service.js.map

/***/ }),

/***/ "../../../../../src/app/category-table/category-table.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"category-tables\">\r\n\t<div>\r\n\t\t<div class=\"table-row\" *ngIf=\"data\">\r\n\t\t\t<p *ngIf=\"noSeries\">No Data Available</p>\r\n\t\t\t<div class=\"table\" #tableScroll *ngIf=\"!noSeries\">\r\n\t\t\t\t<table class=\"category-table\">\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<th class=\"empty-header\">&nbsp;</th>\r\n\t\t\t\t\t\t<ng-template ngFor let-date [ngForOf]=\"tableHeader\" let-i=\"index\">\r\n\t\t\t\t\t\t\t<td><b>{{date.tableDate}}</b></td>\r\n\t\t\t\t\t\t</ng-template>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<ng-template ngFor let-serie [ngForOf]=\"data\" let-i=\"index\">\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<th class=\"{{serie.seriesInfo.indent ? 'indent' + serie.seriesInfo.indent : ''}}\" title=\"{{serie.seriesInfo.title}}\"\r\n\t\t\t\t\t\t\t data-animation='false' data-html='true' data-placement='left' data-toggle='tooltip' on-mouseover=\"showTooltip()\">\r\n\t\t\t\t\t\t\t\t<a [routerLink]=\"['/series']\" [queryParams]=\"{ id: serie.seriesInfo.id, sa: serie.seriesInfo.saParam }\" queryParamsHandling='merge'\r\n\t\t\t\t\t\t\t\t (click)=\"hideInfo(serie.seriesInfo.id)\">\r\n                  \t\t\t\t\t{{serie.seriesInfo.title}}\r\n                \t\t\t\t</a>\r\n\t\t\t\t\t\t\t\t<a tabindex=\"0\" id=\"{{subcatIndex + serie.seriesInfo.id}}\" class=\"info\" (click)=\"showPopover(subcatIndex, serie.seriesInfo)\" role=\"button\" data-animation='false' data-toggle=\"popover\">\r\n\t\t\t\t\t\t\t\t\t<i class=\"material-icons info-icon\">&#xE88F;</i>\r\n\t\t\t\t\t\t\t\t</a>\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<ng-template ngFor let-item [ngForOf]=\"serie.trimCatTable\">\r\n\t\t\t\t\t\t\t\t<td>{{item.level}}</td>\r\n\t\t\t\t\t\t\t</ng-template>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr *ngIf=\"yoyActive\">\r\n\t\t\t\t\t\t\t<th class=\"{{serie.seriesInfo.indent ? 'indent' + serie.seriesInfo.indent : ''}}\">\r\n\t\t\t\t\t\t\t\t{{(serie.seriesInfo.percent === true) ? '&emsp; YOY (ch.)' : '&emsp; YOY (%)'}}\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<ng-template ngFor let-item [ngForOf]=\"serie.trimCatTable\">\r\n\t\t\t\t\t\t\t\t<td>{{item.yoy}}</td>\r\n\t\t\t\t\t\t\t</ng-template>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr *ngIf=\"ytdActive && serie.seriesInfo.frequencyShort !== 'A'\">\r\n\t\t\t\t\t\t\t<th class=\"{{serie.seriesInfo.indent ? 'indent' + serie.seriesInfo.indent : ''}}\">\r\n\t\t\t\t\t\t\t\t{{(serie.seriesInfo.percent === true)? '&emsp; YTD (ch.)' : '&emsp; YTD (%)'}}\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<ng-template ngFor let-item [ngForOf]=\"serie.trimCatTable\">\r\n\t\t\t\t\t\t\t\t<td>{{item.ytd}}</td>\r\n\t\t\t\t\t\t\t</ng-template>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</ng-template>\r\n\t\t\t\t</table>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/category-table/category-table.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n.category-tables {\n  vertical-align: top;\n  display: inline-block;\n  min-height: 100%;\n  overflow: auto;\n  width: 100%; }\n  @media (min-width: 768px) {\n    .category-tables {\n      margin-top: 10px; } }\n  @media (max-width: 767px) {\n    .category-tables {\n      margin-top: 50px; } }\n  .category-tables .material-icons.md-18 {\n    font-size: 18px;\n    color: #F6A01B;\n    vertical-align: middle; }\n  .category-tables .table-row {\n    position: relative;\n    margin-bottom: 20px; }\n    .category-tables .table-row .table {\n      overflow-x: scroll;\n      overflow-y: visible;\n      width: 58%;\n      margin-left: 32%;\n      margin-bottom: 40px; }\n      .category-tables .table-row .table .category-table {\n        table-layout: fixed;\n        width: 100%;\n        *margin-left: -32%; }\n        .category-tables .table-row .table .category-table td, .category-tables .table-row .table .category-table th {\n          vertical-align: top;\n          width: 125px;\n          text-align: right;\n          font-size: 0.8em;\n          padding: 0.4em;\n          border: 1px solid #E5E5E5; }\n          .category-tables .table-row .table .category-table td:empty:after, .category-tables .table-row .table .category-table th:empty:after {\n            content: \"\\A0\"; }\n        .category-tables .table-row .table .category-table th {\n          position: absolute;\n          *position: relative;\n          left: 0;\n          width: 32%;\n          white-space: nowrap;\n          border-right: 1px solid #E5E5E5;\n          text-align: left;\n          text-overflow: ellipsis;\n          overflow: hidden;\n          font-size: 0.8em;\n          font-weight: normal;\n          border-bottom: 0; }\n        .category-tables .table-row .table .category-table .empty-header {\n          border: none;\n          border-right: 1px solid #E5E5E5; }\n        .category-tables .table-row .table .category-table .info-icon {\n          font-size: 1.2em;\n          vertical-align: middle; }\n        .category-tables .table-row .table .category-table tr:last-child th {\n          border: 1px solid #E5E5E5; }\n        .category-tables .table-row .table .category-table .indent1 {\n          padding-left: 30px; }\n          .category-tables .table-row .table .category-table .indent1 a {\n            width: 79%; }\n          .category-tables .table-row .table .category-table .indent1 .info {\n            width: initial; }\n        .category-tables .table-row .table .category-table .indent2 {\n          padding-left: 50px; }\n          .category-tables .table-row .table .category-table .indent2 a {\n            width: 77%; }\n          .category-tables .table-row .table .category-table .indent2 .info {\n            width: initial; }\n        .category-tables .table-row .table .category-table .indent3 {\n          padding-left: 70px; }\n          .category-tables .table-row .table .category-table .indent3 a {\n            width: 75%; }\n          .category-tables .table-row .table .category-table .indent3 .info {\n            width: initial; }\n        .category-tables .table-row .table .category-table tr:nth-child(even) {\n          background-color: rgba(0, 0, 0, 0.05); }\n          .category-tables .table-row .table .category-table tr:nth-child(even) td:first-child, .category-tables .table-row .table .category-table tr:nth-child(even) th:first-child {\n            background: rgba(0, 0, 0, 0.05); }\n        .category-tables .table-row .table .category-table a {\n          display: inline-block;\n          width: 80%;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          color: #505050;\n          vertical-align: top; }\n        .category-tables .table-row .table .category-table .info {\n          width: initial;\n          right: 5px;\n          position: absolute; }\n          .category-tables .table-row .table .category-table .info:focus {\n            outline: 0; }\n        .category-tables .table-row .table .category-table .badge-primary {\n          background-color: #1D667F; }\n\n.tooltip.tooltip-bottom .tooltip-inner::before, .tooltip.bs-tether-element-attached-top .tooltip-inner::before {\n  border-bottom-color: #F9F9F9; }\n\n.tooltip.tooltip-left .tooltip-inner::before, .tooltip.bs-tether-element-attached-right .tooltip-inner::before {\n  border-left-color: #F9F9F9; }\n\n.tooltip-inner {\n  max-width: 225px;\n  text-align: left;\n  background-color: #F9F9F9;\n  color: #000;\n  box-shadow: -3px -3px 6px rgba(0, 0, 0, 0.16), 3px 3px 6px rgba(0, 0, 0, 0.23);\n  -moz-box-shadow: -3px -3px 6px rgba(0, 0, 0, 0.16), 3px 3px 6px rgba(0, 0, 0, 0.23);\n  -webkit-box-shadow: -3px -3px 6px rgba(0, 0, 0, 0.16), 3px 3px 6px rgba(0, 0, 0, 0.23); }\n  .tooltip-inner b {\n    font-weight: 600; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/category-table/category-table.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__ = __webpack_require__("../../../../../src/app/uhero-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__google_analytics_events_service__ = __webpack_require__("../../../../../src/app/google-analytics-events.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_service__ = __webpack_require__("../../../../../src/app/helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryTableComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CategoryTableComponent = (function () {
    function CategoryTableComponent(_uheroAPIService, _helper, route, _router, googleAES) {
        this._uheroAPIService = _uheroAPIService;
        this._helper = _helper;
        this.route = route;
        this._router = _router;
        this.googleAES = googleAES;
        this.tableWidths = [];
    }
    CategoryTableComponent.prototype.ngOnInit = function () {
    };
    CategoryTableComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.dates) {
            var defaultRanges = this._helper.setDefaultRange(this.freq, this.dates);
            var startIndex_1 = defaultRanges.start, endIndex_1 = defaultRanges.end;
            this.dates.forEach(function (date, index) {
                // Range slider is converting annual year strings to numbers
                if (date.tableDate == _this.tableStart) {
                    startIndex_1 = index;
                }
                if (date.tableDate == _this.tableEnd) {
                    endIndex_1 = index;
                }
            });
            var start_1 = startIndex_1;
            var end_1 = endIndex_1;
            this.tableHeader = this.dates.slice(start_1, end_1 + 1);
            if (this.data) {
                this.data.forEach(function (series) {
                    if (series.seriesInfo !== 'No data available') {
                        series.trimCatTable = series.categoryTable.slice(start_1, end_1 + 1);
                    }
                });
            }
        }
    };
    CategoryTableComponent.prototype.ngAfterViewChecked = function () {
        // Check height of content and scroll tables to the right
        // If true, height is changing, i.e. content still loading
        if (this.checkContainerHeight()) {
            this.tableScroll();
        }
        // Scroll tables to the right when table widths changes, i.e. changing frequency from A to Q | M
        this.checkTableWidth();
    };
    CategoryTableComponent.prototype.checkContainerHeight = function () {
        var contianer = $('.multi-series-container');
        var heightDiff = (this.previousHeight !== contianer.height());
        this.previousHeight = contianer.height();
        return heightDiff;
    };
    CategoryTableComponent.prototype.checkTableWidth = function () {
        var tables = $('.table');
        var tableWidths = this.tableWidths;
        if (tables) {
            tables.each(function (index) {
                var widthDiff = (tableWidths[index] !== tables[index].scrollWidth);
                if (widthDiff) {
                    tables[index].scrollLeft = tables[index].scrollWidth;
                }
                tableWidths[index] = tables[index].scrollWidth;
            });
        }
    };
    CategoryTableComponent.prototype.showTooltip = function () {
        $('[data-toggle="tooltip"]').tooltip();
    };
    CategoryTableComponent.prototype.hideInfo = function (seriesId) {
        $('[data-toggle="tooltip"]').tooltip('hide');
        $('.popover').popover('dispose');
        this.submitGAEvent(seriesId);
    };
    CategoryTableComponent.prototype.showPopover = function (subcatIndex, seriesInfo) {
        $('[data-toggle="tooltip"]').tooltip('hide');
        var popover = $('#' + subcatIndex + seriesInfo.id).popover({
            trigger: 'manual',
            placement: function (popoverEl, el) {
                // popoverEl = popover DOM element
                // el = DOM element that triggers popover
                var position = 'top';
                var elOffset = $(el).offset().top;
                if (elOffset <= 150) {
                    position = 'bottom';
                }
                return position;
            },
            html: true,
            title: function () {
                var title = seriesInfo.title;
                title += seriesInfo.unitsLabel ? ' (' + seriesInfo.unitsLabel + ')' : ' (' + seriesInfo.unitsLabelShort + ')';
                return title;
            },
            content: function () {
                var info = '';
                if (seriesInfo.seasonalAdjustment === 'seasonally_adjusted') {
                    info += 'Seasonally Adjusted<br>';
                }
                if (seriesInfo.sourceDescription) {
                    info += 'Source: ' + seriesInfo.sourceDescription + '<br>';
                }
                if (seriesInfo.sourceLink) {
                    info += '<a target="_blank" href="' + seriesInfo.sourceLink + '">' + seriesInfo.sourceLink + '</a><br>';
                }
                if (seriesInfo.sourceDetails) {
                    info += seriesInfo.sourceDetails;
                }
                return info;
            }
        }).on('show.bs.popover', function (e) {
            // Display only one popover at a time
            $('.popover').not(e.target).popover('dispose');
            setTimeout(function () {
                // Close popover on next click (source link in popover is still clickable)
                $('body').one('click', function () {
                    popover.popover('dispose');
                });
            }, 1);
        });
        popover.popover('toggle');
    };
    // On load, table scrollbars should start at the right -- showing most recent data
    CategoryTableComponent.prototype.tableScroll = function () {
        try {
            this.tableEl._results.forEach(function (el) {
                el.nativeElement.scrollLeft = el.nativeElement.scrollWidth;
            });
        }
        catch (err) {
            console.log(err);
        }
    };
    // Google Analytics: Track clicking on series
    CategoryTableComponent.prototype.submitGAEvent = function (seriesId) {
        var id = seriesId.toString();
        this.googleAES.emitEvent('series', 'click', id);
    };
    return CategoryTableComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('tableScroll'),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "tableEl", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "subCats", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "freq", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "dates", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "noSeries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "yoyActive", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "ytdActive", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "params", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "subcatIndex", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "tableStart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "tableEnd", void 0);
CategoryTableComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-category-table',
        template: __webpack_require__("../../../../../src/app/category-table/category-table.component.html"),
        styles: [__webpack_require__("../../../../../src/app/category-table/category-table.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__["a" /* UheroApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__["a" /* UheroApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__helper_service__["a" /* HelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__helper_service__["a" /* HelperService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__google_analytics_events_service__["a" /* GoogleAnalyticsEventsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__google_analytics_events_service__["a" /* GoogleAnalyticsEventsService */]) === "function" && _e || Object])
], CategoryTableComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=category-table.component.js.map

/***/ }),

/***/ "../../../../../src/app/csv-export.js":
/***/ (function(module, exports) {

// Edited export-csv module to format csv export
// Removes time stamp from DateTime Column & removes view data table option
// Ignores data grouping -- exports csv of all data points and remove Navigator series from export
// Original module found in node_modules/highcharts-export-csv/export-csv.js

(function (factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory;
    } else {
        factory(Highcharts);
    }
})(function (Highcharts) {

    'use strict';

    var each = Highcharts.each,
        pick = Highcharts.pick,
        seriesTypes = Highcharts.seriesTypes,
        downloadAttrSupported = document.createElement('a').download !== undefined;

    Highcharts.setOptions({
        lang: {
            downloadCSV: 'Download CSV (XLS)',
            downloadXLS: 'Download XLS',
            viewData: 'View data table'
        }
    });


    /**
     * Get the data rows as a two dimensional array
     */
    Highcharts.Chart.prototype.getDataRows = function () {
        var options = (this.options.exporting || {}).csv || {},
            xAxis = this.xAxis[0],
            rows = {},
            rowArr = [],
            dataRows,
            names = [],
            i,
            x,
            xTitle,
            // Options
            dateFormat = options.dateFormat || '%Y-%m-%d',
            columnHeaderFormatter = options.columnHeaderFormatter || function (item, key, keyLength) {
                if (item instanceof Highcharts.Axis) {
                    return (item.options.title && item.options.title.text) ||
                        (item.isDatetimeAxis ? 'Date' : 'Category');
                }
                return item.name + (keyLength > 1 ? ' ('+ key + ')' : '');
            };
        // Get chart title (series name, region, and frequency) and source info from chart labels
        var series = this.title.textStr;
        var chartLabels = this.userOptions.labels.items;
        var sourceDescription, sourceLink, sourceDetails;
        if (chartLabels[0].html) {
            sourceDescription = ['Source Description: ' + chartLabels[0].html];
        };
        if (chartLabels[1].html) {
            sourceLink = ['Source Link: ' + chartLabels[1].html];
        };
        if (chartLabels[2].html) {
            sourceDetails = ['Source Details: ' + chartLabels[2].html]; 
        }
        var seriesLink = [chartLabels[3].html];
        var uhero = [chartLabels[4].html];
        var dpLink = [chartLabels[5].html];
        var seriesInfo = ['Series: ' + series];

        // Loop the series and index values
        i = 0;
        each(this.series, function (series) {
            if (series.options.includeInCSVExport !== false) {
                names.push(series.name);
                each(series.options.data, function (point) {
                    if (!rows[point[0]]) {
                        rows[point[0]] = [];
                    }
                    rows[point[0]].x = point[0];
                    rows[point[0]][i] = point[1];
                });
                i += 1;
            }
        });

        // Make a sortable array
        for (x in rows) {
            if (rows.hasOwnProperty(x)) {
                rowArr.push(rows[x]);
            }
        }
        // Sort it by X values
        rowArr.sort(function (a, b) {
            return a.x - b.x;
        });

        // Add header row
        xTitle = columnHeaderFormatter(xAxis);
        dataRows = [];
        dataRows.push(seriesInfo);
        if (sourceDescription) {
            dataRows.push(sourceDescription);
        }
        if (sourceLink) {
            dataRows.push(sourceLink);
        }
        if (sourceDetails) {
            dataRows.push(sourceDetails);
        }
        dataRows.push(seriesLink);
        dataRows.push(uhero);
        dataRows.push(dpLink);
        dataRows.push([null], [null], [null]);
        dataRows.push([xTitle].concat(names))
        // Add the category column
        each(rowArr, function (row) {

            var category = row.name;
            if (!category) {
                if (xAxis.isDatetimeAxis) {
                    if (row.x instanceof Date) {
                        row.x = row.x.getTime();
                    }
                    category = Highcharts.dateFormat(dateFormat, row.x);
                } else if (xAxis.categories) {
                    category = pick(xAxis.names[row.x], xAxis.categories[row.x], row.x)
                } else {
                    category = row.x;
                }
            }

            // Add the X/date/category
            row.unshift(category);
            dataRows.push(row);
        });
        return dataRows;
    };

    /**
     * Get a CSV string
     */
    Highcharts.Chart.prototype.getCSV = function (useLocalDecimalPoint) {
        // console.log('export', Highcharts.Chart);
        var csv = '',
            rows = this.getDataRows(),
            options = (this.options.exporting || {}).csv || {},
            itemDelimiter = options.itemDelimiter || ',', // use ';' for direct import to Excel
            lineDelimiter = options.lineDelimiter || '\n'; // '\n' isn't working with the js csv data extraction

        // Transform the rows to CSV
        each(rows, function (row, i) {
            var val = '',
                j = row.length,
                n = useLocalDecimalPoint ? (1.1).toLocaleString()[1] : '.';
            while (j--) {
                val = row[j];
                if (typeof val === "string") {
                    // val = '"' + val + '"';
                    val = val;
                }
                if (typeof val === 'number') {
                    if (n === ',') {
                        val = val.toString().replace(".", ",");
                    }
                }
                if (val === null) {
                    val = ' ';
                }
                row[j] = val;
            }
            // Add the values
            csv += row.join(itemDelimiter);

            // Add the line delimiter
            if (i < rows.length - 1) {
                csv += lineDelimiter;
            }
        });
        return csv;
    };

    /**
     * Build a HTML table with the data
     */
    Highcharts.Chart.prototype.getTable = function (useLocalDecimalPoint) {
        var html = '<table>',
            rows = this.getDataRows();

        // Transform the rows to HTML
        each(rows, function (row, i) {
            var tag = i ? 'td' : 'th',
                val,
                j,
                n = useLocalDecimalPoint ? (1.1).toLocaleString()[1] : '.';

            html += '<tr>';
            for (j = 0; j < row.length; j = j + 1) {
                val = row[j];
                // Add the cell
                if (typeof val === 'number') {
                    val = val.toString();
                    if (n === ',') {
                        val = val.replace('.', n);
                    }
                    html += '<' + tag + ' class="number">' + val + '</' + tag + '>';

                } else {
                    html += '<' + tag + '>' + ((val === undefined || val === null) ? '' : val) + '</' + tag + '>';
                }
            }

            html += '</tr>';
        });
        html += '</table>';
        return html;
    };

    function getContent(chart, href, extension, content, MIME) {
        var a,
            blobObject,
            name,
            options = (chart.options.exporting || {}).csv || {},
            url = options.url || 'http://www.highcharts.com/studies/csv-export/download.php';

        if (chart.options.exporting.filename) {
            name = chart.options.exporting.filename;
        } else if (chart.title) {
            name = chart.title.textStr.replace(/ /g, '-').toLowerCase();
        } else {
            name = 'chart';
        }

        // MS specific. Check this first because of bug with Edge (#76)
        if (window.Blob && window.navigator.msSaveOrOpenBlob) {
            // Falls to msSaveOrOpenBlob if download attribute is not supported
            blobObject = new Blob([content]);
            window.navigator.msSaveOrOpenBlob(blobObject, name + '.' + extension);

        // Download attribute supported
        } else if (downloadAttrSupported) {
            a = document.createElement('a');
            a.href = href;
            a.target = '_blank';
            a.download = name + '.' + extension;
            document.body.appendChild(a);
            a.click();
            a.remove();

        } else {
            // Fall back to server side handling
            Highcharts.post(url, {
                data: content,
                type: MIME,
                extension: extension
            });
        }
    }

    /**
     * Call this on click of 'Download CSV' button
     */
    Highcharts.Chart.prototype.downloadCSV = function () {
        var csv = this.getCSV(true);
        getContent(
            this,
            'data:text/csv,\uFEFF' + csv.replace(/\n/g, '%0A'),
            'csv',
            csv,
            'text/csv'
        );
    };

    /**
     * Call this on click of 'Download XLS' button
     */
    Highcharts.Chart.prototype.downloadXLS = function () {
        var csv = this.getCSV(true);
        getContent(
            this,
            'data:text/csv,\uFEFF' + csv.replace(/\n/g, '%0A'),
            'csv',
            csv,
            'text/csv'
        );
    };

    /**
     * View the data in a table below the chart
     */
    Highcharts.Chart.prototype.viewData = function () {
        if (!this.insertedTable) {
            var div = document.createElement('div');
            div.className = 'highcharts-data-table';
            // Insert after the chart container
            this.renderTo.parentNode.insertBefore(div, this.renderTo.nextSibling);
            div.innerHTML = this.getTable();
            this.insertedTable = true;
        }
    };


    // Add "Download CSV" to the exporting menu. Use download attribute if supported, else
    // run a simple PHP script that returns a file. The source code for the PHP script can be viewed at
    // https://raw.github.com/highslide-software/highcharts.com/master/studies/csv-export/csv.php
    if (Highcharts.getOptions().exporting) {
        Highcharts.getOptions().exporting.buttons.contextButton.menuItems.push({
            textKey: 'downloadCSV',
            onclick: function () { this.downloadCSV(); }
        }/* , {
            textKey: 'downloadXLS',
            onclick: function () { this.downloadXLS(); }
        }, {
            textKey: 'viewData',
            onclick: function () { this.viewData(); }
        } */);
    }

    // Series specific
    if (seriesTypes.map) {
        seriesTypes.map.prototype.exportKey = 'name';
    }
    if (seriesTypes.mapbubble) {
        seriesTypes.mapbubble.prototype.exportKey = 'name';
    }

});


/***/ }),

/***/ "../../../../../src/app/date-slider/date-slider.component.html":
/***/ (function(module, exports) {

module.exports = "<input *ngIf=\"subCat\" class=\"sliders\" type=\"text\" [id]=\"subCat.id\" value=\"\" />"

/***/ }),

/***/ "../../../../../src/app/date-slider/date-slider.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n.irs-line-mid, .irs-line-left, .irs-line-right,\n.irs-bar, .irs-bar-edge, .irs-slider {\n  background: url(" + __webpack_require__("../../../../../src/sprite-skin-nice2.png") + ") repeat-x;\n  position: absolute; }\n\n.irs-slider.from, .irs-slider.to {\n  background-position: 0 -120px; }\n\n.irs-slider.state_hover, .irs-slider:hover {\n  background-position: 0 -150px; }\n\n.irs-line-mid {\n  background-position: 0 0; }\n\n.irs-line-left {\n  background-position: 0 -30px; }\n\n.irs-line-right {\n  background-position: 100% -30px; }\n\n.irs-bar {\n  background-position: 0 -60px; }\n\n.irs-slider, .irs-slider.type_last {\n  z-index: 0; }\n\n.irs-from, .irs-to, .irs-single {\n  background: none;\n  border-radius: 0px;\n  font-size: 12px;\n  color: #505050;\n  padding: 1px 2px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/date-slider/date-slider.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_service__ = __webpack_require__("../../../../../src/app/helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ion_rangeslider__ = __webpack_require__("../../../../ion-rangeslider/js/ion.rangeSlider.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ion_rangeslider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ion_rangeslider__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateSliderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DateSliderComponent = (function () {
    function DateSliderComponent(_helper) {
        this._helper = _helper;
        this.updateRange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](true);
    }
    DateSliderComponent.prototype.ngOnInit = function () {
    };
    DateSliderComponent.prototype.ngAfterViewInit = function () {
        var that = this;
        var freq = this.freq;
        $('#' + this.subCat.id).ionRangeSlider({
            min: 0,
            from: this.start,
            to: this.end,
            values: this.dates,
            prettify_enabled: false,
            hide_min_max: true,
            keyboard: true,
            keyboard_step: 1,
            type: 'double',
            onFinish: function (data) {
                var chartStart = that.formatChartDate(data.from_value, freq);
                var chartEnd = that.formatChartDate(data.to_value, freq);
                var tableStart = data.from_value.toString();
                var tableEnd = data.to_value.toString();
                that.updateRange.emit({ chartStart: chartStart, chartEnd: chartEnd, tableStart: tableStart, tableEnd: tableEnd });
            }
        });
    };
    DateSliderComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.dates && this.dates.length) {
            var defaultRanges = this._helper.setDefaultRange(this.freq, this.dates);
            var startIndex_1 = defaultRanges.start, endIndex_1 = defaultRanges.end;
            this.dates.forEach(function (date, index) {
                // Range slider is converting annual year strings to numbers
                if (date == _this.dateFrom) {
                    startIndex_1 = index;
                }
                if (date == _this.dateTo) {
                    endIndex_1 = index;
                }
            });
            // Start and end used for 'from' and 'to' inputs in slider
            // If start/end exist in values array, position handles at start/end; otherwise, use default range
            this.start = startIndex_1;
            this.end = endIndex_1;
            this.sublist.forEach(function (sub) {
                var slider = $('#' + sub.id).data('ionRangeSlider');
                if (slider) {
                    slider.update({
                        from: _this.start,
                        to: _this.end
                    });
                }
            });
        }
    };
    DateSliderComponent.prototype.formatChartDate = function (value, freq) {
        var quarters = { Q1: '01', Q2: '04', Q3: '07', Q4: '10' };
        var date;
        if (freq === 'A') {
            date = value.toString() + '-01-01';
            return Date.parse(date);
        }
        if (freq === 'Q') {
            var year = value.substr(0, 4);
            var q = value.substr(5, 2);
            date = value.substr(0, 4) + '-' + quarters[q] + '-01';
            return Date.parse(date);
        }
        if (freq === 'M') {
            date = value + '-01';
            return Date.parse(date);
        }
    };
    return DateSliderComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DateSliderComponent.prototype, "subCat", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DateSliderComponent.prototype, "dates", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DateSliderComponent.prototype, "freq", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DateSliderComponent.prototype, "dateFrom", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DateSliderComponent.prototype, "dateTo", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DateSliderComponent.prototype, "sublist", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], DateSliderComponent.prototype, "updateRange", void 0);
DateSliderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-date-slider',
        template: __webpack_require__("../../../../../src/app/date-slider/date-slider.component.html"),
        styles: [__webpack_require__("../../../../../src/app/date-slider/date-slider.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__helper_service__["a" /* HelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__helper_service__["a" /* HelperService */]) === "function" && _a || Object])
], DateSliderComponent);

var _a;
//# sourceMappingURL=date-slider.component.js.map

/***/ }),

/***/ "../../../../../src/app/feedback/feedback.component.html":
/***/ (function(module, exports) {

module.exports = "<button type=\"button\" class=\"btn btn-feedback\" (click)=\"reset()\" data-toggle=\"modal\" data-target=\"#feedback\">\r\n  Feedback\r\n</button>\r\n<div *ngIf=\"successMsg\" [hidden]=\"hideAlert\" class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\r\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\r\n    <span aria-hidden=\"true\">&times;</span>\r\n  </button>\r\n  {{successMsg}}\r\n</div>\r\n<div *ngIf=\"errorMsg\" [hidden]=\"hideAlert\" class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\r\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\r\n    <span aria-hidden=\"true\">&times;</span>\r\n  </button>\r\n  {{errorMsg}}\r\n</div>\r\n<div class=\"modal fade\" id=\"feedback\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"feedback\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\">Send Feedback</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body form-horizontal\">\r\n        <form [formGroup]=\"feedbackForm\">\r\n          <div class=\"form-group row\">\r\n            <div class=\"col-2 col-form-label\"><i class=\"material-icons\">&#xE7FD;</i></div>\r\n            <div class=\"col-10\">\r\n              <input type=\"text\" formControlName=\"name\" aria-label=\"Your Name\" class=\"form-control custom-input\" placeholder=\"Your Name\" />\r\n              <small class=\"form-text text-muted\"> * Optional</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <div class=\"col-2 col-form-label\"><i class=\"material-icons\">&#xE158;</i></div>\r\n            <div class=\"col-10\">\r\n              <input type=\"email\" formControlName=\"email\" aria-label=\"Email\" class=\"form-control custom-input\" placeholder=\"Email\" />\r\n              <small class=\"form-text text-muted\"> * Optional</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <div class=\"col-2 col-form-label\"><i class=\"material-icons\">&#xE0B9;</i></div>\r\n            <div class=\"col-10\">\r\n              <textarea type=\"text\" class=\"form-control custom-input\" aria-label=\"Feedback\" formControlName=\"feedback\" placeholder=\"Feedback\" required></textarea>\r\n              <small class=\"form-text text-muted\"> * Required</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <div class=\"col-2\"></div>\r\n            <div class=\"col-10\">\r\n              <recaptcha name=\"captcha\" area-label=\"Google captcha\" formControlName=\"captcha\" required siteKey=\" 6LcN3hQUAAAAAOUb0_Z_wpk3dLvbVz7S45Bgcv7c\" class=\"captcha\"></recaptcha>\r\n              <small class=\"form-text text-muted\"> * Required</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"col-4\"></div>\r\n            <div class=\"col-4\">\r\n              <button type=\"button\" (click)=\"onSubmit()\" data-dismiss=\"modal\" class=\"btn btn-submit\" label=\"Submit\" [disabled]=\"!feedbackForm.valid\" [title]=\"!feedbackForm.valid ? 'Feedback is required.' : 'Submit feedback.'\">Submit</button>\r\n            </div>\r\n            <div class=\"col-4\"></div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/feedback/feedback.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n.btn-feedback {\n  background-color: #F9F9F9;\n  color: #505050;\n  position: fixed;\n  bottom: 0;\n  left: 15px;\n  line-height: 1;\n  font-size: 0.9em;\n  border: 1px solid #E5E5E5;\n  border-bottom: 0;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.modal-title {\n  color: #1D667F;\n  font-family: 'Lucida Sans', sans-serif;\n  font-size: 1em; }\n\n.alert {\n  position: fixed;\n  bottom: 0;\n  left: 120px;\n  border-bottom: 0px;\n  margin-bottom: 0;\n  line-height: 1.5em;\n  font-size: 0.9em;\n  font-family: 'Lucida Sans', sans-serif;\n  padding: 0.25rem 1.25rem; }\n  .alert .close {\n    top: 0;\n    right: 0;\n    float: left;\n    padding: 0;\n    padding-right: 0.5rem; }\n\n.col-form-label {\n  text-align: right;\n  color: #1D667F; }\n\n.custom-input {\n  border: 0 solid #1D667F;\n  border-bottom-width: 2px;\n  border-radius: 0;\n  font-family: 'Lucida Sans', sans-serif;\n  font-size: 0.9em;\n  color: #505050;\n  padding: 0.5rem 0.25rem; }\n\n.captcha {\n  display: inline-block;\n  vertical-align: middle; }\n  @media (max-width: 767px) {\n    .captcha {\n      transform: scale(0.7);\n      -webkit-transform: scale(0.7);\n      transform-origin: 0 0;\n      -webkit-transform-origin: 0 0; } }\n\n.btn-submit {\n  background-color: #1D667F;\n  color: #FFF; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/feedback/feedback.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FeedbackComponent = (function () {
    function FeedbackComponent(fb, http) {
        this.fb = fb;
        this.http = http;
        this.hideAlert = true;
    }
    FeedbackComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    FeedbackComponent.prototype.buildForm = function () {
        this.feedbackForm = this.fb.group({
            'name': [''],
            'email': [''],
            'feedback': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            'captcha': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
    };
    FeedbackComponent.prototype.reset = function () {
        this.successMsg = '';
        this.errorMsg = '';
    };
    FeedbackComponent.prototype.onSubmit = function () {
        var _this = this;
        this.hideAlert = false;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Authorization', 'Bearer -VI_yuv0UzZNy4av1SM5vQlkfPK_JKnpGfMzuJR7d0M=');
        var requestOptionsArgs = { headers: headers };
        var feedback = { data: { name: '', email: '', feedback: '' }, 'g-recaptcha-response': '' };
        feedback.data.name = this.feedbackForm.value.name;
        feedback.data.email = this.feedbackForm.value.email;
        feedback.data.feedback = this.feedbackForm.value.feedback;
        feedback['g-recaptcha-response'] = this.feedbackForm.value.captcha;
        return this.http.post('http://api.uhero.hawaii.edu/v1/feedback', JSON.stringify(feedback), requestOptionsArgs)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return _this.successMsg = 'Submission successful.'; }, function (error) { return _this.errorMsg = 'Something went wrong. Try again.'; }, function () {
            setTimeout(function () {
                _this.hideAlert = true;
            }, 3000);
        });
    };
    return FeedbackComponent;
}());
FeedbackComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-feedback',
        template: __webpack_require__("../../../../../src/app/feedback/feedback.component.html"),
        styles: [__webpack_require__("../../../../../src/app/feedback/feedback.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _b || Object])
], FeedbackComponent);

var _a, _b;
//# sourceMappingURL=feedback.component.js.map

/***/ }),

/***/ "../../../../../src/app/freq-selector/freq-selector.component.html":
/***/ (function(module, exports) {

module.exports = "<select [ngModel]=\"selectedFreq?.freq\" (ngModelChange)=\"onChange($event)\" class=\"custom-select\">\r\n   <option [ngValue]=\"freq?.freq\" *ngFor=\"let freq of freqs\">\r\n      {{(freq.label.length > 0) ? freq.label : freq.freq}}\r\n   </option>\r\n</select>"

/***/ }),

/***/ "../../../../../src/app/freq-selector/freq-selector.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/freq-selector/freq-selector.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__frequency__ = __webpack_require__("../../../../../src/app/frequency.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__frequency___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__frequency__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FreqSelectorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FreqSelectorComponent = (function () {
    function FreqSelectorComponent() {
        this.selectedFreqChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    FreqSelectorComponent.prototype.ngOnInit = function () {
    };
    FreqSelectorComponent.prototype.onChange = function (newFreq) {
        this.selectedFreq = this.freqs.find(function (freq) { return freq.freq === newFreq; });
        this.selectedFreqChange.emit(this.selectedFreq);
    };
    return FreqSelectorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], FreqSelectorComponent.prototype, "freqs", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__frequency__["Frequency"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__frequency__["Frequency"]) === "function" && _a || Object)
], FreqSelectorComponent.prototype, "selectedFreq", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], FreqSelectorComponent.prototype, "selectedFreqChange", void 0);
FreqSelectorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-freq-selector',
        template: __webpack_require__("../../../../../src/app/freq-selector/freq-selector.component.html"),
        styles: [__webpack_require__("../../../../../src/app/freq-selector/freq-selector.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], FreqSelectorComponent);

var _a;
//# sourceMappingURL=freq-selector.component.js.map

/***/ }),

/***/ "../../../../../src/app/frequency.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=frequency.js.map

/***/ }),

/***/ "../../../../../src/app/geo-selector/geo-selector.component.html":
/***/ (function(module, exports) {

module.exports = "<select [ngModel]=\"selectedGeo?.handle\" (ngModelChange)=\"onChange($event)\" class=\"custom-select\">\r\n    <option [ngValue]=\"region?.handle\" *ngFor=\"let region of regions\">\r\n        {{(region.name.length > 0) ? region.name : region.handle}}\r\n    </option>\r\n</select>\r\n"

/***/ }),

/***/ "../../../../../src/app/geo-selector/geo-selector.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/geo-selector/geo-selector.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geography__ = __webpack_require__("../../../../../src/app/geography.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geography___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__geography__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoSelectorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GeoSelectorComponent = (function () {
    function GeoSelectorComponent() {
        this.selectedGeoChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    GeoSelectorComponent.prototype.ngOnInit = function () {
    };
    GeoSelectorComponent.prototype.onChange = function (newGeo) {
        this.selectedGeo = this.regions.find(function (region) { return region.handle === newGeo; });
        this.selectedGeoChange.emit(this.selectedGeo);
    };
    return GeoSelectorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GeoSelectorComponent.prototype, "regions", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__geography__["Geography"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__geography__["Geography"]) === "function" && _a || Object)
], GeoSelectorComponent.prototype, "selectedGeo", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], GeoSelectorComponent.prototype, "selectedGeoChange", void 0);
GeoSelectorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-geo-selector',
        template: __webpack_require__("../../../../../src/app/geo-selector/geo-selector.component.html"),
        styles: [__webpack_require__("../../../../../src/app/geo-selector/geo-selector.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], GeoSelectorComponent);

var _a;
//# sourceMappingURL=geo-selector.component.js.map

/***/ }),

/***/ "../../../../../src/app/geography.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=geography.js.map

/***/ }),

/***/ "../../../../../src/app/google-analytics-events.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleAnalyticsEventsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GoogleAnalyticsEventsService = (function () {
    function GoogleAnalyticsEventsService() {
    }
    GoogleAnalyticsEventsService.prototype.emitEvent = function (category, action, label) {
        ga('send', 'event', {
            eventCategory: category,
            eventAction: action,
            eventLabel: label
        });
    };
    return GoogleAnalyticsEventsService;
}());
GoogleAnalyticsEventsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], GoogleAnalyticsEventsService);

//# sourceMappingURL=google-analytics-events.service.js.map

/***/ }),

/***/ "../../../../../src/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<header id=\"header\" class=\"navbar navbar-fixed-top navbar-light\">\r\n    <!-- <div class=\"portal-header\"> -->\r\n        <a class=\"navbar-brand\" id=\"uhero-header\" routerLink=\"/\">\r\n        <img [src]=\"headerLogo\" alt=\"UHERO.data logo\">\r\n        </a>\r\n    <!-- </div> -->\r\n    <app-search-bar (onSearch)=\"onSearch($event)\"></app-search-bar>\r\n</header>\r\n<!-- <div class=\"about-portal\">\r\n   <a href=\"/\" [routerLink]=\"['/']\">About the Data</a>\r\n   <a href=\"/\" [routerLink]=\"['/']\">About UHERO</a>\r\n   <a href=\"/\" [routerLink]=\"['/']\">Help/FAQ</a>\r\n</div> -->\r\n"

/***/ }),

/***/ "../../../../../src/app/header/header.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n#header {\n  position: fixed;\n  height: 55px;\n  top: 0;\n  width: 100%;\n  background-color: #FFF;\n  color: #FFF;\n  padding: 0;\n  box-shadow: 0 4px 6px -6px #000;\n  -moz-box-shadow: 0 4px 6px -6px #000;\n  -webkit-box-shadow: 0 4px 6px -6px #000; }\n  @media (max-width: 767px) {\n    #header {\n      display: none; } }\n  @media (min-width: 768px) {\n    #header {\n      z-index: 1; } }\n  #header a {\n    padding: 0;\n    width: 275px;\n    overflow: hidden; }\n  #header img {\n    position: absolute;\n    height: 55px;\n    padding: 10px;\n    max-width: 275px; }\n\n.about-portal {\n  margin: 0 0 10px 5px; }\n  .about-portal a {\n    text-decoration: none;\n    color: #000;\n    font-family: sans-serif;\n    font-size: 0.8em;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    padding: 5px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var HeaderComponent = (function () {
    function HeaderComponent(logo, _router) {
        this.logo = logo;
        this._router = _router;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.headerLogo = this.logo;
    };
    HeaderComponent.prototype.onSearch = function (event) {
        this._router.navigate(['/category'], { queryParams: { id: event }, queryParamsHandling: 'merge' });
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-header',
        template: __webpack_require__("../../../../../src/app/header/header.component.html"),
        styles: [__webpack_require__("../../../../../src/app/header/header.component.scss")]
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('logo')),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _a || Object])
], HeaderComponent);

var _a;
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "../../../../../src/app/helper.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelperService; });
// Common function used for category multi-chart and table displays
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HelperService = (function () {
    function HelperService() {
    }
    HelperService.prototype.createDateArray = function (dateStart, dateEnd, currentFreq, dateArray) {
        var startYear = +dateStart.substr(0, 4);
        var endYear = +dateEnd.substr(0, 4);
        var startMonth = +dateStart.substr(5, 2);
        var endMonth = +dateEnd.substr(5, 2);
        var m = { 1: '01', 2: '02', 3: '03', 4: '04', 5: '05', 6: '06', 7: '07', 8: '08', 9: '09', 10: '10', 11: '11', 12: '12' };
        var q = { 1: 'Q1', 4: 'Q2', 7: 'Q3', 10: 'Q4' };
        while (startYear + '-' + m[startMonth] + '-01' <= endYear + '-' + m[endMonth] + '-01') {
            if (currentFreq === 'A') {
                dateArray.push({ date: startYear.toString() + '-01-01', tableDate: startYear.toString() });
                startYear += 1;
            }
            if (currentFreq === 'S') {
                dateArray.push({ date: startYear.toString() + '-' + m[startMonth] + '-01', tableDate: startYear.toString() + '-' + m[startMonth] });
                startYear = startMonth === 7 ? startYear += 1 : startYear;
                startMonth = startMonth === 1 ? 7 : 1;
            }
            if (currentFreq === 'M') {
                dateArray.push({ date: startYear.toString() + '-' + m[startMonth] + '-01', tableDate: startYear.toString() + '-' + m[startMonth] });
                startYear = startMonth === 12 ? startYear += 1 : startYear;
                startMonth = startMonth === 12 ? 1 : startMonth += 1;
            }
            if (currentFreq === 'Q') {
                dateArray.push({ date: startYear.toString() + '-' + m[startMonth] + '-01', tableDate: startYear.toString() + ' ' + q[startMonth] });
                startYear = startMonth === 10 ? startYear += 1 : startYear;
                startMonth = startMonth === 10 ? startMonth = 1 : startMonth += 3;
            }
        }
        return dateArray;
    };
    HelperService.prototype.dataTransform = function (seriesObs, dates, decimals) {
        var results = null;
        var observations = seriesObs;
        var start = observations.observationStart;
        var end = observations.observationEnd;
        var level = observations.transformationResults[0].observations;
        var yoy = observations.transformationResults[1].observations;
        var ytd = observations.transformationResults[2].observations;
        var pseudoZones = [];
        if (level) {
            level.forEach(function (entry, i) {
                // Get last pseudoHistory date if available
                if (entry.pseudoHistory && !level[i + 1].pseudoHistory) {
                    pseudoZones.push({ value: Date.parse(entry.date), dashStyle: 'dash', color: '#7CB5EC' });
                }
            });
            var combineData = this.combineObsData(level, yoy, ytd);
            var tableData = this.seriesTable(combineData, dates, decimals);
            var chart = this.seriesChart(combineData, dates);
            var chartData = { level: chart[0], pseudoZones: pseudoZones, yoy: chart[1], ytd: chart[2] };
            results = { chartData: chartData, tableData: tableData, start: start, end: end };
        }
        return results;
    };
    HelperService.prototype.seriesTable = function (seriesData, dateRange, decimals) {
        var _this = this;
        var table = [];
        dateRange.forEach(function (date) {
            table.push({ date: date.date, tableDate: date.tableDate, value: ' ', yoy: ' ', ytd: ' ' });
        });
        seriesData.forEach(function (data) {
            var seriesDate = data.date;
            var tableEntry = table.find(function (date) { return date.date === seriesDate; });
            tableEntry.value = data.value;
            tableEntry.formattedValue = data.value === null ? ' ' : _this.formatNum(+data.value, decimals);
            tableEntry.yoy = data.yoyValue;
            tableEntry.formattedYoy = data.yoyValue === null ? ' ' : _this.formatNum(+data.yoyValue, decimals);
            tableEntry.ytd = data.ytdValue;
            tableEntry.formattedYtd = data.ytdValue === null ? ' ' : _this.formatNum(+data.ytdValue, decimals);
        });
        return table;
    };
    HelperService.prototype.seriesChart = function (seriesData, dateRange) {
        var levelValue = [];
        var yoyValue = [];
        var ytdValue = [];
        dateRange.forEach(function (date) {
            var data = seriesData.find(function (obs) { return obs.date === date.date; });
            if (data) {
                levelValue.push([Date.parse(date.date), data.value]);
                yoyValue.push([Date.parse(date.date), data.yoyValue]);
                ytdValue.push([Date.parse(date.date), data.ytdValue]);
            }
            else {
                levelValue.push([Date.parse(date.date), null]);
                yoyValue.push([Date.parse(date.date), null]);
                ytdValue.push([Date.parse(date.date), null]);
            }
        });
        return [levelValue, yoyValue, ytdValue];
    };
    HelperService.prototype.catTable = function (seriesTableData, dateRange, decimals) {
        var _this = this;
        // Format series data for the category table
        var categoryTableData = [];
        dateRange.forEach(function (date) {
            categoryTableData.push({ date: date.date, tableDate: date.tableDate, value: ' ', yoy: ' ', ytd: ' ' });
        });
        seriesTableData.forEach(function (data) {
            var tableObs = categoryTableData.find(function (obs) { return obs.date === data.date; });
            if (tableObs) {
                tableObs.level = data.value === ' ' ? ' ' : _this.formatNum(+data.value, decimals);
                tableObs.yoy = data.yoy === null ? ' ' : _this.formatNum(+data.yoy, decimals);
                tableObs.ytd = data.ytd === null ? ' ' : _this.formatNum(+data.ytd, decimals);
            }
        });
        return categoryTableData;
    };
    HelperService.prototype.setDateWrapper = function (displaySeries, dateWrapper) {
        dateWrapper.firstDate = '';
        dateWrapper.endDate = '';
        displaySeries.forEach(function (series) {
            if (dateWrapper.firstDate === '' || series.seriesInfo.seriesObservations.observationStart < dateWrapper.firstDate) {
                dateWrapper.firstDate = series.seriesInfo.seriesObservations.observationStart;
            }
            if (dateWrapper.endDate === '' || series.seriesInfo.seriesObservations.observationEnd > dateWrapper.endDate) {
                dateWrapper.endDate = series.seriesInfo.seriesObservations.observationEnd;
            }
        });
    };
    // Combine level and percent arrays from Observation data
    // Used to construct table data for single series view
    HelperService.prototype.combineObsData = function (level, yoy, ytd) {
        var table;
        if (level) {
            table = level;
            for (var i = 0; i < level.length; i++) {
                table[i].yoyValue = null;
                table[i].ytdValue = null;
                table[i].value = +level[i].value;
            }
        }
        if (yoy) {
            var _loop_1 = function (i) {
                var seriesObs = table.find(function (obs) { return obs.date === yoy[i].date; });
                if (seriesObs) {
                    seriesObs.yoyValue = +yoy[i].value;
                }
            };
            for (var i = 0; i < yoy.length; i++) {
                _loop_1(i);
            }
        }
        if (ytd) {
            var _loop_2 = function (i) {
                var seriesObs = table.find(function (obs) { return obs.date === ytd[i].date; });
                if (seriesObs) {
                    seriesObs.ytdValue = +ytd[i].value;
                }
            };
            for (var i = 0; i < ytd.length; i++) {
                _loop_2(i);
            }
        }
        return table;
    };
    HelperService.prototype.formatDate = function (date, freq) {
        var year = date.substr(0, 4);
        var month = date.substr(5, 2);
        var quarter = ['Q1', 'Q2', 'Q3', 'Q4'];
        var qMonth = ['01', '04', '07', '10'];
        if (freq === 'A') {
            return year;
        }
        if (freq === 'Q') {
            var monthIndex = qMonth.indexOf(month);
            return quarter[monthIndex] + ' ' + year;
        }
        if (freq === 'M' || freq === 'S') {
            return month + '-' + year;
        }
    };
    HelperService.prototype.formatNum = function (num, decimal) {
        var fixedNum;
        fixedNum = num.toFixed(decimal);
        // remove decimals
        var int = fixedNum | 0;
        var signCheck = num < 0 ? 1 : 0;
        // store deicmal value
        var remainder = Math.abs(fixedNum - int);
        var decimalString = ('' + remainder.toFixed(decimal)).substr(2, decimal);
        var intString = '' + int;
        var i = intString.length;
        var r = '';
        while ((i -= 3) > signCheck) {
            r = ',' + intString.substr(i, 3) + r;
        }
        var returnValue = intString.substr(0, i + 3) + r + (decimalString ? '.' + decimalString : '');
        // If int == 0, converting int to string drops minus sign
        if (int === 0 && num < 0) {
            return '-' + returnValue;
        }
        return returnValue;
    };
    // Get a unique array of available regions for a category
    HelperService.prototype.uniqueGeos = function (geo, geoList) {
        var existGeo = geoList.find(function (region) { return region.handle === geo.handle; });
        if (existGeo) {
            var freqs = geo.freqs;
            // If region already exists, check it's list of frequencies
            // Add frequency if it doesn't exist
            this.addFreq(freqs, existGeo);
        }
        if (!existGeo) {
            geoList.push(geo);
        }
    };
    // Check if freq exists in freqArray
    HelperService.prototype.freqExist = function (freqArray, freq) {
        var exist = freqArray.find(function (frequency) { return frequency.freq === freq; });
        return exist ? true : false;
    };
    HelperService.prototype.addFreq = function (freqList, geo) {
        for (var j in freqList) {
            if (!this.freqExist(geo.freqs, freqList[j].freq)) {
                geo.freqs.push(freqList[j]);
            }
        }
    };
    // Get a unique array of available frequencies for a category
    HelperService.prototype.uniqueFreqs = function (freq, freqList) {
        var existFreq = freqList.find(function (frequency) { return frequency.label === freq.label; });
        if (existFreq) {
            var geos = freq.geos;
            // If frequency already exists, check it's list of regions
            // Add geo if it doesn't exist
            this.addGeo(geos, existFreq);
        }
        if (!existFreq) {
            freqList.push(freq);
        }
    };
    // Check if geo exists in geoArray
    HelperService.prototype.geoExist = function (geoArray, geo) {
        var exist = geoArray.find(function (region) { return region.handle === geo; });
        return exist ? true : false;
    };
    HelperService.prototype.addGeo = function (geoList, freq) {
        for (var j in geoList) {
            if (!this.geoExist(freq.geos, geoList[j].handle)) {
                freq.geos.push(geoList[j]);
            }
        }
    };
    HelperService.prototype.setDefaultRange = function (freq, dataArray) {
        // Default to last 10 years
        if (freq === 'A') {
            return { start: dataArray.length - 11, end: dataArray.length - 1 };
        }
        if (freq === 'Q') {
            return { start: dataArray.length - 41, end: dataArray.length - 1 };
        }
        if (freq === 'S') {
            return { start: dataArray.length - 21, end: dataArray.length - 1 };
        }
        if (freq === 'M') {
            return { start: dataArray.length - 121, end: dataArray.length - 1 };
        }
    };
    HelperService.prototype.getTableDates = function (dateArray) {
        var tableDates = [];
        dateArray.forEach(function (date) {
            tableDates.push(date.tableDate);
        });
        return tableDates;
    };
    return HelperService;
}());
HelperService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], HelperService);

//# sourceMappingURL=helper.service.js.map

/***/ }),

/***/ "../../../../../src/app/highchart/highchart.component.html":
/***/ (function(module, exports) {

module.exports = "<chart class=\"multi-chart\" [options]=\"options\" (load)=\"render($event.context)\"></chart>\r\n"

/***/ }),

/***/ "../../../../../src/app/highchart/highchart.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n.multi-chart {\n  width: 200px;\n  height: 200px;\n  /* @media (max-width: 991px) {\r\n        width: 100%;\r\n        height: 150px;\r\n    } */ }\n  .multi-chart .highcharts-tooltip {\n    -webkit-filter: none !important;\n            filter: none !important; }\n  .multi-chart .highcharts-background {\n    fill: #F9F9F9; }\n  .multi-chart .highcharts-grid-line, .multi-chart .highcharts-axis-line, .multi-chart .highcharts-color-0 {\n    stroke: none; }\n  .multi-chart .highcharts-series-0 .highcharts-graph {\n    stroke: #1D667F; }\n  .multi-chart .highcharts-series-1 .highcharts-graph {\n    stroke: none; }\n  .multi-chart .highcharts-series-1 rect.highcharts-point {\n    stroke: none;\n    fill: none; }\n  .multi-chart .highcharts-markers.highcharts-series-0 path {\n    fill: #1D667F; }\n  .multi-chart .highcharts-markers.highcharts-series-1 path {\n    fill: none; }\n  .multi-chart .highcharts-no-data {\n    color: #505050 !important;\n    font-size: 0.85em !important; }\n  .multi-chart .highcharts-title {\n    color: #505050 !important;\n    font-size: 0.9em !important;\n    letter-spacing: 0.05em; }\n  .multi-chart .highcharts-tooltip .highcharts-tooltip-box {\n    fill: none; }\n  .multi-chart .highcharts-tooltip text {\n    font-family: 'Lucida Sans', sans-serif;\n    color: #505050 !important;\n    font-size: 0.9em !important;\n    letter-spacing: 0.015em;\n    margin-bottom: 5px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/highchart/highchart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_service__ = __webpack_require__("../../../../../src/app/helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_highcharts__ = __webpack_require__("../../../../highcharts/js/highstock.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_highcharts__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HighchartComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



__WEBPACK_IMPORTED_MODULE_2_highcharts__["setOptions"]({
    lang: {
        thousandsSep: ','
    }
});
var HighchartComponent = HighchartComponent_1 = (function () {
    function HighchartComponent(seriesType, _helper) {
        this.seriesType = seriesType;
        this._helper = _helper;
    }
    HighchartComponent.findLastValue = function (valueArray) {
        var counter = valueArray.length - 1;
        /* while (valueArray[counter].y === null) {
          counter--;
        } */
        while (counter-- && valueArray[counter].y === null)
            ;
        return counter;
    };
    HighchartComponent.prototype.ngOnInit = function () {
        if (this.seriesData.seriesInfo === 'No data available' || this.seriesData.chartData.level.length === 0) {
            this.noDataChart(this.seriesData);
        }
        else {
            this.drawChart(this.seriesData, this.currentFreq, this.seriesType, this.chartStart, this.chartEnd);
        }
    };
    HighchartComponent.prototype.ngOnChanges = function () {
        this.drawChart(this.seriesData, this.currentFreq, this.seriesType, this.chartStart, this.chartEnd);
    };
    HighchartComponent.prototype.drawChart = function (seriesData, currentFreq, seriesType, start, end) {
        var level, ytd;
        level = this.trimData(seriesData.categoryChart.chartData.level, start, end);
        ytd = this.trimData(ytd = seriesData.categoryChart.chartData.ytd, start, end);
        var pseudoZones = seriesData.categoryChart.chartData.pseudoZones;
        var decimals = seriesData.seriesInfo.decimals ? seriesData.seriesInfo.decimals : 1;
        var percent = seriesData.seriesInfo.percent;
        var title = seriesData.seriesInfo.title === undefined ? seriesData.seriesInfo.name : seriesData.seriesInfo.title;
        var dataFreq = currentFreq;
        var unitsShort = seriesData.seriesInfo.unitsLabelShort;
        this.options = {
            chart: {
                spacingTop: 20 /* Add spacing to draw plot below fixed tooltip */
            },
            exporting: {
                enabled: false
            },
            title: {
                text: '<br>',
                useHTML: true,
                align: 'left',
                widthAdjust: 0,
                style: {
                    margin: 75
                }
            },
            tooltip: {
                positioner: function () {
                    return { x: 0, y: -5 };
                },
                shadow: false,
                borderWidth: 0,
                shared: true,
                formatter: function () {
                    var getLabelName = function (seriesName, freq, precent) {
                        if (seriesName === 'Level') {
                            return ': ';
                        }
                        if (seriesName === 'YTD' && freq === 'A') {
                            return percent ? 'Year/Year Chg: ' : 'Year/Year % Chg: ';
                        }
                        if (seriesName === 'YTD' && freq !== 'A') {
                            return percent ? 'Year-to-Date Chg: ' : 'Year-to-Date % Chg: ';
                        }
                    };
                    var getFreqLabel = function (freq, date) {
                        if (freq === 'A') {
                            return '';
                        }
                        if (freq === 'Q') {
                            if (__WEBPACK_IMPORTED_MODULE_2_highcharts__["dateFormat"]('%b', date) === 'Jan') {
                                return 'Q1 ';
                            }
                            if (__WEBPACK_IMPORTED_MODULE_2_highcharts__["dateFormat"]('%b', date) === 'Apr') {
                                return 'Q2 ';
                            }
                            if (__WEBPACK_IMPORTED_MODULE_2_highcharts__["dateFormat"]('%b', date) === 'Jul') {
                                return 'Q3 ';
                            }
                            if (__WEBPACK_IMPORTED_MODULE_2_highcharts__["dateFormat"]('%b', date) === 'Oct') {
                                return 'Q4 ';
                            }
                        }
                        if (freq === 'M' || 'S') {
                            return __WEBPACK_IMPORTED_MODULE_2_highcharts__["dateFormat"]('%b', date) + ' ';
                        }
                    };
                    var pseudo = 'Pseudo History ';
                    var s = '<b>' + title + '</b><br>';
                    // Get Quarter or Month for Q/M frequencies
                    s = s + getFreqLabel(dataFreq, this.x);
                    // Add year
                    s = s + __WEBPACK_IMPORTED_MODULE_2_highcharts__["dateFormat"]('%Y', this.x) + '';
                    this.points.forEach(function (point) {
                        var name = getLabelName(point.series.name, dataFreq, percent);
                        var label = name + __WEBPACK_IMPORTED_MODULE_2_highcharts__["numberFormat"](point.y, decimals);
                        if (point.series.name === 'Level') {
                            label += ' (' + unitsShort + ') <br>';
                        }
                        if (pseudoZones.length > 0) {
                            pseudoZones.forEach(function (zone) {
                                if (point.x < zone.value) {
                                    s += pseudo + name + __WEBPACK_IMPORTED_MODULE_2_highcharts__["numberFormat"](point.y, decimals);
                                    if (point.series.name === 'Level') {
                                        s += ' (' + unitsShort + ') <br>';
                                    }
                                }
                                if (point.x >= zone.value) {
                                    s += label;
                                }
                            });
                        }
                        if (pseudoZones.length === 0) {
                            s += label;
                        }
                    });
                    return s;
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    enabled: false
                },
                lineWidth: 0,
                tickLength: 0
            },
            yAxis: [{
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: ''
                    },
                }, {
                    title: {
                        text: ''
                    },
                    labels: {
                        enabled: false
                    },
                    opposite: true
                }],
            plotOptions: {
                line: {
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [{
                    name: 'Level',
                    type: 'line',
                    yAxis: 1,
                    data: level,
                    states: {
                        hover: {
                            lineWidth: 2
                        }
                    },
                    dataGrouping: {
                        enabled: false
                    },
                    zoneAxis: 'x',
                    zones: pseudoZones
                }, {
                    name: 'YTD',
                    type: seriesType,
                    data: ytd,
                    dataGrouping: {
                        enabled: false
                    },
                }],
        };
    };
    HighchartComponent.prototype.noDataChart = function (seriesData) {
        var title = seriesData.seriesInfo.title === undefined ? seriesData.seriesInfo.name : seriesData.seriesInfo.title;
        this.options = {
            title: {
                text: '<b>' + title + '</b><br>' + 'No Data Available',
                align: 'left',
                widthAdjust: 0,
            },
            exporting: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            yAxis: [{
                    title: {
                        text: ''
                    }
                }],
            xAxis: {
                lineWidth: 0
            },
            series: [{
                    data: []
                }],
            lang: {
                noData: 'No Data Available'
            }
        };
    };
    HighchartComponent.prototype.render = function (event) {
        this.chart = event;
        var latestLevel, latestYtd;
        var level = this.chart.series[0];
        var ytd = this.chart.series[1];
        // Get position of last non-null value
        latestLevel = (level !== undefined) ? HighchartComponent_1.findLastValue(level.points) : null;
        latestYtd = (ytd !== undefined) ? HighchartComponent_1.findLastValue(ytd.points) : null;
        // Prevent tooltip from being hidden on mouseleave
        // Reset toolip value and marker to most recent observation
        this.chart.tooltip.hide = function () {
            if (latestLevel > 0 && latestYtd > 0) {
                this.chart.tooltip.refresh([level.points[latestLevel], ytd.points[latestYtd]]);
                level.points[latestLevel].setState('hover');
            }
        };
        // Display tooltip when chart loads
        if (latestLevel > 0 && latestYtd > 0) {
            this.chart.tooltip.refresh([level.points[latestLevel], ytd.points[latestYtd]]);
        }
    };
    HighchartComponent.prototype.trimData = function (dataArray, start, end) {
        var defaultRange = this._helper.setDefaultRange(this.currentFreq, dataArray);
        var startIndex = defaultRange.start, endIndex = defaultRange.end;
        dataArray.forEach(function (item, index) {
            if (item[0] === start) {
                startIndex = index;
            }
            if (item[0] === end) {
                endIndex = index;
            }
        });
        return dataArray.slice(startIndex, endIndex + 1);
    };
    return HighchartComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighchartComponent.prototype, "seriesData", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighchartComponent.prototype, "currentFreq", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighchartComponent.prototype, "chartStart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighchartComponent.prototype, "chartEnd", void 0);
HighchartComponent = HighchartComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-highchart',
        template: __webpack_require__("../../../../../src/app/highchart/highchart.component.html"),
        styles: [__webpack_require__("../../../../../src/app/highchart/highchart.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('seriesType')),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__helper_service__["a" /* HelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__helper_service__["a" /* HelperService */]) === "function" && _a || Object])
], HighchartComponent);

var HighchartComponent_1, _a;
//# sourceMappingURL=highchart.component.js.map

/***/ }),

/***/ "../../../../../src/app/highstock/highstock.component.html":
/***/ (function(module, exports) {

module.exports = "<chart type=\"StockChart\" [options]=\"options\" (load)=\"setTableExtremes($event)\">\r\n  <xAxis (afterSetExtremes)=\"updateExtremes($event)\"></xAxis>\r\n</chart>"

/***/ }),

/***/ "../../../../../src/app/highstock/highstock.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n.highcharts-background {\n  fill: #F9F9F9; }\n\n.highcharts-button, .highcharts-button-hover {\n  stroke: none; }\n\n.highcharts-button.highcharts-button-pressed {\n  fill: #1D667F; }\n  .highcharts-button.highcharts-button-pressed text {\n    fill: #FFF !important; }\n\n.highcharts-color-0, .highcharts-color-1 {\n  fill: none;\n  stroke: none; }\n\n.highcharts-markers.highcharts-series-0 path {\n  fill: #727272; }\n\n.highcharts-markers.highcharts-series-1 path {\n  fill: #1D667F; }\n\n.highcharts-navigator-series .highcharts-area {\n  fill: #1D667F; }\n\n.highcharts-navigator-handle {\n  stroke: #999999; }\n\n.highcharts-series-0 .highcharts-graph {\n  stroke: #727272; }\n\n.highcharts-series-0 rect.highcharts-point {\n  stroke: none;\n  fill: #727272; }\n\n.highcharts-series-1 .highcharts-graph {\n  stroke: #1D667F;\n  color: #1D667F; }\n\n.highcharts-title {\n  fill: #505050;\n  font-family: 'sans-serif'; }\n\n.highcharts-tooltip {\n  -webkit-filter: none !important;\n          filter: none !important; }\n  .highcharts-tooltip .series-0 {\n    fill: #727272; }\n  .highcharts-tooltip .series-1 {\n    fill: #1D667F; }\n\n.highcharts-xaxis-labels text {\n  color: #727272 !important;\n  fill: #727272 !important; }\n\n.highcharts-yaxis-grid.series2 .highcharts-grid-line {\n  display: none; }\n\n.highcharts-yaxis-labels.series1 text {\n  color: #727272 !important;\n  fill: #727272 !important; }\n\n.highcharts-yaxis-labels.series2 text {\n  color: #1D667F !important;\n  fill: #1D667F !important; }\n\n.highcharts-yaxis.series1 .highcharts-axis-title {\n  color: #727272 !important;\n  fill: #727272 !important; }\n\n.highcharts-yaxis.series2 .highcharts-axis-title {\n  color: #1D667F !important;\n  fill: #1D667F !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/highstock/highstock.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HighstockComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// Highstock chart component used for single-series view


var Highcharts = __webpack_require__("../../../../highcharts/js/highstock.js");
var exporting = __webpack_require__("../../../../highcharts/js/modules/exporting.js");
var offlineExport = __webpack_require__("../../../../highcharts/js/modules/offline-exporting.js");
var exportCSV = __webpack_require__("../../../../../src/app/csv-export.js");
Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});
var HighstockComponent = (function () {
    function HighstockComponent(seriesType) {
        this.seriesType = seriesType;
        // Async EventEmitter, emit tableExtremes on load to render table
        this.tableExtremes = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](true);
        // When user updates range selected, emit chartExtremes to update URL params
        this.chartExtremes = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](true);
    }
    HighstockComponent.prototype.ngOnChanges = function () {
        this.drawChart(this.chartData, this.seriesDetail, this.currentGeo, this.currentFreq, this.seriesType);
    };
    HighstockComponent.prototype.drawChart = function (chartData, seriesDetail, geo, freq, type) {
        var level = chartData.level;
        var decimals = seriesDetail.decimals ? seriesDetail.decimals : 1;
        var pseudoZones = chartData.pseudoZones;
        var yoy = chartData.yoy;
        var ytd = chartData.ytd;
        var name = seriesDetail.title;
        var units = seriesDetail.unitsLabel ? seriesDetail.unitsLabel : seriesDetail.unitsLabelShort;
        var change = seriesDetail.percent ? 'Change' : '% Change';
        var yoyLabel = seriesDetail.percent ? 'YOY Change' : 'YOY % Change';
        var ytdLabel = seriesDetail.percent ? 'YTD Change' : 'YTD % Change';
        var sourceDescription = seriesDetail.sourceDescription;
        var sourceLink = seriesDetail.sourceLink;
        var sourceDetails = seriesDetail.sourceDetails;
        var startDate = this.start ? this.start : null;
        var endDate = this.end ? this.end : null;
        this.options = {
            chart: {
                alignTicks: false,
                zoomType: 'x',
                // Description used in xAxis label formatter
                description: freq.freq
            },
            labels: {
                items: [{
                        html: sourceDescription
                    }, {
                        html: sourceLink
                    }, {
                        html: sourceDetails
                    }, {
                        html: name + ': http://data.uhero.hawaii.edu/#/series?id=' + seriesDetail.id
                    }, {
                        html: 'The University of Hawaii Economic Research Organization (UHERO)',
                    }, {
                        html: 'Data Portal: http://data.uhero.hawaii.edu/'
                    }],
                style: {
                    display: 'none'
                }
            },
            rangeSelector: {
                selected: !this.start && !this.end ? 2 : null,
                buttons: [{
                        type: 'year',
                        count: 1,
                        text: '1Y'
                    }, {
                        type: 'year',
                        count: 5,
                        text: '5Y'
                    }, {
                        type: 'year',
                        count: 10,
                        text: '10Y'
                    }, {
                        type: 'all',
                        text: 'All'
                    }],
                buttonPosition: {
                    x: 10,
                    y: 10
                },
                labelStyle: {
                    visibility: 'hidden'
                },
                inputEnabled: false
            },
            lang: {
                exportKey: 'Download Chart',
                printKey: 'Print Chart'
            },
            navigator: {
                series: {
                    includeInCSVExport: false
                }
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false
                    },
                    exportButton: {
                        text: 'Download',
                        _titleKey: 'exportKey',
                        menuItems: Highcharts.getOptions().exporting.buttons.contextButton.menuItems.slice(2),
                    },
                    printButton: {
                        text: 'Print',
                        _titleKey: 'printKey',
                        onclick: function () {
                            this.print();
                        }
                    }
                },
                filename: name + '_' + geo.name + '_' + freq.label,
                chartOptions: {
                    navigator: {
                        enabled: false
                    },
                    scrollbar: {
                        enabled: false
                    },
                    rangeSelector: {
                        enabled: false
                    },
                    credits: {
                        enabled: true,
                        text: 'data.uhero.hawaii.edu',
                        position: {
                            align: 'right',
                            x: -115,
                            y: -41
                        }
                    },
                    title: {
                        text: name + ' (' + geo.name + ', ' + freq.label + ')',
                        align: 'left'
                    }
                }
            },
            tooltip: {
                borderWidth: 0,
                shadow: false,
                formatter: function () {
                    var getFreqLabel = function (frequency, date) {
                        if (frequency === 'A') {
                            return '';
                        }
                        if (frequency === 'Q') {
                            if (Highcharts.dateFormat('%b', date) === 'Jan') {
                                return 'Q1 ';
                            }
                            if (Highcharts.dateFormat('%b', date) === 'Apr') {
                                return 'Q2 ';
                            }
                            if (Highcharts.dateFormat('%b', date) === 'Jul') {
                                return 'Q3 ';
                            }
                            if (Highcharts.dateFormat('%b', date) === 'Oct') {
                                return 'Q4 ';
                            }
                        }
                        if (frequency === 'M' || frequency === 'S') {
                            return Highcharts.dateFormat('%b', date);
                        }
                    };
                    var pseudo = 'Pseudo History ';
                    var s = '<b>';
                    s = s + getFreqLabel(freq.freq, this.x);
                    s = s + ' ' + Highcharts.dateFormat('%Y', this.x) + '</b>';
                    this.points.forEach(function (point) {
                        var label = '<br><span class="series-' + point.colorIndex + '">\u25CF</span> ' +
                            point.series.name + ': ' +
                            Highcharts.numberFormat(point.y, decimals);
                        if (pseudoZones.length) {
                            pseudoZones.forEach(function (zone) {
                                if (point.x < zone.value) {
                                    return s += '<br><span class="series-' + point.colorIndex + '">\u25CF</span> ' +
                                        pseudo +
                                        point.series.name +
                                        ': ' +
                                        Highcharts.numberFormat(point.y, decimals) +
                                        '<br>';
                                }
                                if (point.x > zone.value) {
                                    return s += label;
                                }
                            });
                        }
                        if (!pseudoZones.length) {
                            s += label;
                        }
                    });
                    return s;
                }
            },
            credits: {
                enabled: false
            },
            xAxis: {
                minRange: 1000 * 3600 * 24 * 30 * 12,
                min: this.start ? Date.parse(startDate) : null,
                max: this.end ? Date.parse(endDate) : null,
                ordinal: false,
                labels: {
                    formatter: function () {
                        var getQLabel = function (month) {
                            if (month === 'Jan') {
                                return 'Q1 ';
                            }
                            if (month === 'Apr') {
                                return 'Q2 ';
                            }
                            if (month === 'Jul') {
                                return 'Q3 ';
                            }
                            if (month === 'Oct') {
                                return 'Q4 ';
                            }
                        };
                        var s = '';
                        var month = Highcharts.dateFormat('%b', this.value);
                        var frequency = this.chart.options.chart.description;
                        var first = Highcharts.dateFormat('%Y', this.axis.userMin);
                        var last = Highcharts.dateFormat('%Y', this.axis.userMax);
                        s = (last - first <= 5) && frequency === 'Q' ? s + getQLabel(month) : '';
                        s = s + Highcharts.dateFormat('%Y', this.value);
                        return frequency === 'Q' ? s : this.axis.defaultLabelFormatter.call(this);
                    }
                }
            },
            yAxis: [{
                    className: 'series1',
                    labels: {
                        format: '{value:,.2f}'
                    },
                    title: {
                        text: change
                    },
                    opposite: false,
                    minPadding: 0,
                    maxPadding: 0
                }, {
                    className: 'series2',
                    title: {
                        text: units
                    },
                    labels: {
                        format: '{value:,.2f}'
                    },
                    gridLineWidth: 0,
                    minPadding: 0,
                    maxPadding: 0
                }],
            plotOptions: {
                series: {
                    cropThreshold: 0,
                }
            },
            series: [{
                    name: yoyLabel,
                    type: type,
                    data: yoy,
                    showInNavigator: false,
                    dataGrouping: {
                        enabled: false
                    }
                }, {
                    name: 'Level',
                    type: 'line',
                    yAxis: 1,
                    data: level,
                    states: {
                        hover: {
                            lineWidth: 2
                        }
                    },
                    showInNavigator: true,
                    dataGrouping: {
                        enabled: false
                    },
                    zoneAxis: 'x',
                    zones: pseudoZones
                }, {
                    name: ytdLabel,
                    data: ytd,
                    includeInCSVExport: freq.freq === 'A' ? false : true,
                    visible: false,
                    dataGrouping: {
                        enabled: false
                    }
                }]
        };
    };
    HighstockComponent.prototype.setTableExtremes = function (e) {
        var extremes = this.getChartExtremes(e);
        if (extremes) {
            this.tableExtremes.emit({ minDate: extremes.min, maxDate: extremes.max });
        }
    };
    HighstockComponent.prototype.updateExtremes = function (e) {
        var extremes = this.getChartExtremes(e);
        var chartExtremes = this.chartExtremes;
        var tableExtremes = this.tableExtremes;
        var chart = $('.stock-chart');
        var buttons = $('.highcharts-range-selector-buttons');
        buttons.click(function () {
            chartExtremes.emit({ minDate: extremes.min, maxDate: extremes.max });
            tableExtremes.emit({ minDate: extremes.min, maxDate: extremes.max });
        });
        chart.mouseup(function () {
            chartExtremes.emit({ minDate: extremes.min, maxDate: extremes.max });
            tableExtremes.emit({ minDate: extremes.min, maxDate: extremes.max });
        });
    };
    HighstockComponent.prototype.getChartExtremes = function (e) {
        // Gets range of x values to emit
        // Used to redraw table in the single series view
        var xMin, xMax;
        // Selected level data
        var selectedRange = null;
        if (e.context.series[0].points) {
            selectedRange = e.context.series[0].points;
        }
        if (!e.context.series[0].points.length) {
            return { min: null, max: null };
        }
        if (selectedRange.length) {
            xMin = new Date(selectedRange[0].x).toISOString().split('T')[0];
            xMax = new Date(selectedRange[selectedRange.length - 1].x).toISOString().split('T')[0];
            return { min: xMin, max: xMax };
        }
    };
    HighstockComponent.prototype.checkDates = function (date, levelArray) {
        levelArray.forEach(function (item) {
            if (Date.parse(date) === item[0]) {
                return true;
            }
            return false;
        });
    };
    return HighstockComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "chartData", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "currentFreq", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "currentGeo", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "seriesDetail", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "start", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "end", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "tableExtremes", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "chartExtremes", void 0);
HighstockComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-highstock',
        template: __webpack_require__("../../../../../src/app/highstock/highstock.component.html"),
        styles: [__webpack_require__("../../../../../src/app/highstock/highstock.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('seriesType')),
    __metadata("design:paramtypes", [Object])
], HighstockComponent);

//# sourceMappingURL=highstock.component.js.map

/***/ }),

/***/ "../../../../../src/app/landing-page/landing-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"multi-series-container\">\r\n\t<ng-template ngFor let-data [ngForOf]=\"categoryData | async\">\r\n    <h2 class=\"selected-category\" [class.search-term]=\"search\" id=\"id_top\">{{data.selectedCategory}}</h2>\r\n    <p *ngIf=\"search && data.invalid\">No results found for \"{{data.invalid}}.\"</p>\r\n    <p *ngIf=\"!search && data.invalid\">{{data.invalid}}</p>\r\n\t\t<i *ngIf=\"search && !data.requestComplete && !data.invalid\" class=\"fa fa-spinner fa-pulse fa-fw\"></i>\r\n\t\t<ng-template ngFor let-sub [ngForOf]=\"data.sublist\" let-i=\"index\">\r\n\t\t\t<ul class=\"content-links\" *ngIf=\"data.sublist.length > 1\" [attr.id]=\"'id_' + sub.id\">\r\n\t\t\t\t<li *ngFor=\"let sub of data.sublist; let subInd='index'\">\r\n\t\t\t\t\t<a [routerLink]=\"['/category']\" [fragment]=\"sub.id\" [queryParams]=\"queryParams\" (click)=\"scrollTo()\" [class.current-sub]=\"subInd === i\">{{sub.name}}</a>\r\n\t\t\t\t</li>\r\n\t\t\t</ul>\r\n\t\t\t<hr class=\"sublist-separator\" *ngIf=\"data.sublist.length > 1\">\r\n\t\t\t<div class=\"filters\">\r\n\t\t\t\t<app-geo-selector [regions]=\"data.regions\" [selectedGeo]=\"data.currentGeo\" (selectedGeoChange)=\"redrawSeriesGeo($event, data.currentFreq, sub.id)\"\r\n\t\t\t\t\tclass=\"selector\"></app-geo-selector>\r\n\t\t\t\t<app-freq-selector [freqs]=\"data.frequencies\" [selectedFreq]=\"data.currentFreq\" (selectedFreqChange)=\"redrawSeriesFreq($event, data.currentGeo, sub.id)\"\r\n\t\t\t\t\tclass=\"selector\"></app-freq-selector>\r\n\t\t\t\t<a *ngIf=\"routeView === 'table'\" (click)=\"switchView(sub.id)\" class=\"switch-view\">Chart View <i class=\"material-icons md-18\">show_chart</i></a>\r\n\t\t\t\t<a *ngIf=\"routeView === 'chart' || !routeView\" (click)=\"switchView(sub.id)\" class=\"switch-view\">Table View <i class=\"material-icons md-18\">view_list</i></a>\r\n\t\t\t\t<label *ngIf=\"routeView === 'table'\" class=\"form-check-inline\">\r\n          <input type=\"checkbox\" [checked]=\"queryParams.yoy === 'true'\" (change)=\"yoyActive($event, sub.id)\">Year/Year\r\n        </label>\r\n\t\t\t\t<label *ngIf=\"routeView === 'table' && data.currentFreq?.freq !== 'A'\" class=\"form-check-inline\">\r\n          <input type=\"checkbox\" [checked]=\"queryParams.ytd === 'true'\" (change)=\"ytdActive($event, sub.id)\">Year-to-Date\r\n        </label>\r\n        <app-date-slider class=\"sliders\" *ngIf=\"data.requestComplete\" [dates]=\"data.sliderDates\" [sublist]=\"data.sublist\" [subCat]=\"sub\" [dateFrom]=\"tableStart ? tableStart : null\" [dateTo]=\"tableEnd ? tableEnd: null\" [freq]=\"data.currentFreq?.freq\" (updateRange)=\"changeRange($event)\"></app-date-slider>\r\n        <app-category-datatables *ngIf=\"routeView === 'table' && data.requestComplete\" [geo]=\"data.currentGeo\" [freq]=\"data.currentFreq\" [yoy]=\"queryParams.yoy === 'true'\" [ytd]=\"queryParams.ytd === 'true'\" [categoryDates]=\"data.categoryDates\" [sublist]=\"sub\" [tableId]=\"sub.id\"></app-category-datatables>\r\n\t\t\t\t<i *ngIf=\"!data.requestComplete || loading\" class=\"fa fa-spinner fa-pulse fa-fw\"></i>\r\n\t\t\t</div>\r\n\t\t\t<app-category-table *ngIf=\"routeView === 'table' && data.requestComplete\" [dates]=\"data.categoryDates\" [tableStart]=\"tableStart\" [tableEnd]=\"tableEnd\" [subCats]=\"data.sublist\" [data]=\"sub.displaySeries\" [freq]=\"data.currentFreq?.freq\" [subcatIndex]=\"sub.id\" [yoyActive]=\"queryParams.yoy === 'true'\" [ytdActive]=\"queryParams.ytd === 'true'\" [noSeries]=\"sub.noData\" [params]=\"queryParams\"></app-category-table>\r\n      <app-category-charts *ngIf=\"routeView !== 'table' && data.requestComplete\" [chartStart]=\"chartStart\" [chartEnd]=\"chartEnd\" [data]=\"sub.displaySeries\" [freq]=\"data.currentFreq?.freq\" [noSeries]=\"sub.noData\" [params]=\"queryParams\"></app-category-charts>\r\n\t\t</ng-template>\r\n\t</ng-template>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/landing-page/landing-page.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n.multi-series-container {\n  vertical-align: top;\n  min-height: 100%; }\n  .multi-series-container .fa-spinner {\n    color: #1D667F; }\n  .multi-series-container .filters {\n    display: inline-block;\n    color: #1D667F;\n    margin-bottom: 5px;\n    margin-right: 10px; }\n    .multi-series-container .filters .form-check-inline {\n      padding-left: 0;\n      vertical-align: middle;\n      font-size: 0.85em;\n      margin-bottom: 0; }\n      .multi-series-container .filters .form-check-inline input {\n        margin-right: 0.25rem;\n        margin-left: 0rem;\n        vertical-align: middle; }\n    .multi-series-container .filters .sliders {\n      display: inline-block;\n      width: 200px;\n      vertical-align: bottom;\n      margin-left: 10px;\n      margin-right: 10px; }\n  .multi-series-container .content-links:before {\n    display: block;\n    content: ' ';\n    margin-top: -100px;\n    height: 100px;\n    visibility: hidden; }\n  .multi-series-container .content-links {\n    padding-left: 0px;\n    display: inline-block;\n    margin-top: 10px;\n    margin-bottom: 0; }\n    .multi-series-container .content-links li {\n      display: inline-block; }\n      .multi-series-container .content-links li a {\n        text-decoration: none;\n        font-size: 0.85em;\n        color: #505050;\n        padding: 5px;\n        border-radius: 3px; }\n        .multi-series-container .content-links li a:hover {\n          color: #1D667F; }\n      .multi-series-container .content-links li .current-sub {\n        background: #1D667F;\n        color: #FFF; }\n        .multi-series-container .content-links li .current-sub:hover {\n          color: #FFF; }\n      @media (max-width: 767px) {\n        .multi-series-container .content-links li {\n          min-width: 50%;\n          margin-right: 0px; } }\n  .multi-series-container .selected-category {\n    display: inline-block;\n    color: #1D667F;\n    font-size: 1.4em;\n    margin: 0px;\n    vertical-align: middle;\n    text-transform: capitalize; }\n    @media (min-width: 768px) {\n      .multi-series-container .selected-category {\n        display: none; } }\n  .multi-series-container .search-term {\n    display: block; }\n  .multi-series-container .top-anchor {\n    display: block;\n    content: ' ';\n    margin-top: -250px;\n    height: 250px;\n    visibility: hidden; }\n  .multi-series-container .sublist {\n    color: #1D667F;\n    font-size: 1.2em;\n    margin-bottom: 0px; }\n  .multi-series-container .sublist-separator {\n    margin-top: 0rem;\n    margin-bottom: 0.5rem;\n    background-color: #1D667F;\n    height: 2px; }\n  .multi-series-container .material-icons.md-18 {\n    font-size: 18px;\n    color: #F6A01B;\n    vertical-align: middle; }\n  .multi-series-container .switch-view {\n    text-decoration: none;\n    font-size: 0.85em;\n    color: #1D667F;\n    vertical-align: middle;\n    cursor: pointer; }\n    @media (max-width: 767px) {\n      .multi-series-container .switch-view {\n        display: none; } }\n  .multi-series-container .multi-charts-row {\n    display: block;\n    margin-bottom: 40px; }\n  .multi-series-container .no-data {\n    margin-top: 10px; }\n  @media (min-width: 768px) {\n    .multi-series-container {\n      margin-top: 70px; } }\n  @media (max-width: 767px) {\n    .multi-series-container {\n      margin-top: 50px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing-page/landing-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__ = __webpack_require__("../../../../../src/app/uhero-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__category_helper_service__ = __webpack_require__("../../../../../src/app/category-helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingPageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Component for multi-chart view





var LandingPageComponent = (function () {
    function LandingPageComponent(_uheroAPIService, _catHelper, route, _router, cdRef) {
        this._uheroAPIService = _uheroAPIService;
        this._catHelper = _catHelper;
        this.route = route;
        this._router = _router;
        this.cdRef = cdRef;
        this.search = false;
        this.queryParams = {};
        this.loading = false;
    }
    LandingPageComponent.prototype.ngOnInit = function () {
        this.currentGeo = { fips: null, name: null, handle: null };
        this.currentFreq = { freq: null, label: null };
    };
    LandingPageComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.sub = this.route.queryParams.subscribe(function (params) {
            _this.id = _this.getIdParam(params['id']);
            _this.search = typeof _this.id === 'string' ? true : false;
            _this.routeGeo = params['geo'];
            _this.routeFreq = params['freq'];
            _this.routeView = params['view'];
            _this.routeYoy = params['yoy'];
            _this.routeYtd = params['ytd'];
            _this.routeStart = params['start'];
            _this.routeEnd = params['end'];
            if (_this.id) {
                _this.queryParams.id = _this.id;
            }
            ;
            if (_this.routeGeo) {
                _this.queryParams.geo = _this.routeGeo;
            }
            ;
            if (_this.routeFreq) {
                _this.queryParams.freq = _this.routeFreq;
            }
            ;
            if (_this.routeView) {
                _this.queryParams.view = _this.routeView;
            }
            ;
            if (_this.routeYoy) {
                _this.queryParams.yoy = _this.routeYoy;
            }
            else {
                delete _this.queryParams.yoy;
            }
            if (_this.routeYtd) {
                _this.queryParams.ytd = _this.routeYtd;
            }
            else {
                delete _this.queryParams.ytd;
            }
            _this.categoryData = _this.getData(_this.id, _this.routeGeo, _this.routeFreq);
            // Run change detection explicitly after the change:
            _this.cdRef.detectChanges();
        });
    };
    LandingPageComponent.prototype.ngAfterViewChecked = function () {
        // Check height of content and scroll to anchor if fragment is in URL
        // If true, height is changing, i.e. content still loading
        if (this.checkContainerHeight()) {
            this.scrollTo();
        }
    };
    LandingPageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    LandingPageComponent.prototype.getIdParam = function (id) {
        if (id === undefined) {
            return 42;
        }
        if (id && isNaN(+id)) {
            // id param is a string, display search results
            return id;
        }
        if (id && +id) {
            // id of category selected in sidebar
            return +id;
        }
    };
    LandingPageComponent.prototype.getData = function (id, geo, freq) {
        if (typeof id === 'string' && geo && freq) {
            return this._catHelper.initSearch(id, geo, freq);
        }
        if (typeof id === 'string' && !geo && !freq) {
            return this._catHelper.initSearch(id);
        }
        if (typeof id === 'number' && geo && freq) {
            return this._catHelper.initContent(id, geo, freq);
        }
        if (typeof id === 'number' && !geo && !freq) {
            return this._catHelper.initContent(id, geo, freq);
        }
    };
    LandingPageComponent.prototype.checkContainerHeight = function () {
        var contianer = $('.multi-series-container');
        var heightDiff = (this.previousHeight !== contianer.height());
        this.previousHeight = contianer.height();
        return heightDiff;
    };
    // Redraw series when a new region is selected
    LandingPageComponent.prototype.redrawSeriesGeo = function (event, currentFreq, subId) {
        var _this = this;
        this.loading = true;
        setTimeout(function () {
            _this.queryParams.geo = event.handle;
            _this.queryParams.freq = currentFreq.freq;
            _this.fragment = subId;
            _this.updateRoute();
        }, 10);
        this.scrollToFragment();
    };
    LandingPageComponent.prototype.redrawSeriesFreq = function (event, currentGeo, subId) {
        var _this = this;
        this.loading = true;
        setTimeout(function () {
            _this.queryParams.geo = currentGeo.handle;
            _this.queryParams.freq = event.freq;
            _this.fragment = subId;
            _this.updateRoute();
        }, 10);
        this.scrollToFragment();
    };
    LandingPageComponent.prototype.switchView = function (subId) {
        var _this = this;
        this.loading = true;
        setTimeout(function () {
            _this.queryParams.view = _this.routeView === 'table' ? 'chart' : 'table';
            _this.fragment = subId;
            _this.updateRoute();
        });
        this.scrollToFragment();
    };
    LandingPageComponent.prototype.yoyActive = function (e, subId) {
        var _this = this;
        this.loading = true;
        setTimeout(function () {
            _this.queryParams.yoy = e.target.checked;
            _this.fragment = subId;
            _this.updateRoute();
        }, 10);
        this.scrollToFragment();
    };
    LandingPageComponent.prototype.ytdActive = function (e, subId) {
        var _this = this;
        this.loading = true;
        setTimeout(function () {
            _this.queryParams.ytd = e.target.checked;
            _this.fragment = subId;
            _this.updateRoute();
        }, 10);
        this.scrollToFragment();
    };
    LandingPageComponent.prototype.changeRange = function (e) {
        this.tableStart = e.tableStart;
        this.tableEnd = e.tableEnd;
        this.chartStart = e.chartStart;
        this.chartEnd = e.chartEnd;
        // this.queryParams.start = e.start.replace(/\s|-/g, '');
        // this.queryParams.end = e.end.replace(/\s|-/g, '');
        // this._router.navigate(['/category'], { queryParams: this.queryParams, queryParamsHandling: 'merge', fragment: this.fragment });
    };
    // Work around for srolling to page anchor
    LandingPageComponent.prototype.scrollToFragment = function () {
        var _this = this;
        setTimeout(function () {
            _this.scrollTo();
        }, 10);
    };
    LandingPageComponent.prototype.updateRoute = function () {
        this.queryParams.id = this.queryParams.id ? this.queryParams.id : this.id;
        this._router.navigate(['/category'], { queryParams: this.queryParams, queryParamsHandling: 'merge', fragment: this.fragment });
        this.loading = false;
    };
    LandingPageComponent.prototype.scrollTo = function () {
        this.route.fragment.subscribe(function (frag) {
            var el = document.querySelector('#id_' + frag);
            if (el) {
                el.scrollIntoView(el);
                var scrolledY = window.scrollY;
                if (scrolledY) {
                    window.scroll(0, scrolledY - 75);
                }
            }
            if (frag === 'top') {
                el.scrollTop;
            }
            ;
        });
    };
    return LandingPageComponent;
}());
LandingPageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-landing-page',
        template: __webpack_require__("../../../../../src/app/landing-page/landing-page.component.html"),
        styles: [__webpack_require__("../../../../../src/app/landing-page/landing-page.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__["a" /* UheroApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__["a" /* UheroApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__category_helper_service__["a" /* CategoryHelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__category_helper_service__["a" /* CategoryHelperService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _e || Object])
], LandingPageComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=landing-page.component.js.map

/***/ }),

/***/ "../../../../../src/app/search-bar/search-bar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-4 col-lg-3 search-bar\">\r\n    <div class=\"input-group\">\r\n        <input type=\"text\" class=\"form-control\" aria-label=\"Search box\" placeholder=\"&#xF002;\" (keyup.enter)=\"search(searchTerm)\" #searchTerm>\r\n        <span class=\"input-group-btn\">\r\n            <button type=\"button\" (click)=\"search(searchTerm)\" class=\"btn\"><i class=\"material-icons md-18\">search</i></button>\r\n        </span>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/search-bar/search-bar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n.search-bar {\n  position: fixed;\n  top: 12px;\n  right: 0px; }\n  .search-bar .form-control {\n    padding: 0.25rem 1rem;\n    font-family: \"FontAwesome\", \"Lucida Sans\", sans-serif; }\n  .search-bar ::-webkit-input-placeholder {\n    color: #E5E5E5; }\n  .search-bar :-moz-placeholder {\n    color: #E5E5E5;\n    opacity: 1; }\n  .search-bar ::-moz-placeholder {\n    color: #E5E5E5;\n    opacity: 1; }\n  .search-bar :-ms-input-placeholder {\n    color: #E5E5E5; }\n  .search-bar .btn {\n    line-height: 1.15;\n    padding: 0.25rem 1rem;\n    background-color: #1D667F; }\n    .search-bar .btn .material-icons.md-18 {\n      font-size: 18px;\n      color: #FFF;\n      vertical-align: middle; }\n  @media (max-width: 767px) {\n    .search-bar {\n      width: 35%;\n      top: 5px;\n      right: 3px; }\n      .search-bar .form-control {\n        border-top-right-radius: 0.25rem;\n        border-bottom-right-radius: 0.25rem; }\n      .search-bar .input-group-btn {\n        display: none; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/search-bar/search-bar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__google_analytics_events_service__ = __webpack_require__("../../../../../src/app/google-analytics-events.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchBarComponent = (function () {
    function SearchBarComponent(googleAES) {
        this.googleAES = googleAES;
        this.onSearch = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    SearchBarComponent.prototype.ngOnInit = function () {
    };
    SearchBarComponent.prototype.search = function (searchTerm) {
        this.onSearch.emit(searchTerm.value);
        this.submitGAEvent(searchTerm.value);
        searchTerm.value = '';
    };
    // Google Analytics: Track search event
    SearchBarComponent.prototype.submitGAEvent = function (searchTerm) {
        this.googleAES.emitEvent('Search', 'search', searchTerm);
    };
    return SearchBarComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SearchBarComponent.prototype, "onSearch", void 0);
SearchBarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-search-bar',
        template: __webpack_require__("../../../../../src/app/search-bar/search-bar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/search-bar/search-bar.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__google_analytics_events_service__["a" /* GoogleAnalyticsEventsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__google_analytics_events_service__["a" /* GoogleAnalyticsEventsService */]) === "function" && _a || Object])
], SearchBarComponent);

var _a;
//# sourceMappingURL=search-bar.component.js.map

/***/ }),

/***/ "../../../../../src/app/series-helper.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__ = __webpack_require__("../../../../../src/app/uhero-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_service__ = __webpack_require__("../../../../../src/app/helper.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SeriesHelperService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SeriesHelperService = (function () {
    function SeriesHelperService(_uheroAPIService, _helper) {
        this._uheroAPIService = _uheroAPIService;
        this._helper = _helper;
    }
    SeriesHelperService.prototype.getSeriesData = function (id, routeGeo, routeFreq) {
        var _this = this;
        var currentFreq, currentGeo, decimals;
        this.seriesData = {
            seriesDetail: {},
            change: '',
            saPairAvail: null,
            regions: [],
            currentGeo: {},
            frequencies: [],
            currentFreq: {},
            chartData: [],
            seriesTableData: [],
            siblings: [],
            error: null,
            noData: ''
        };
        this._uheroAPIService.fetchSeriesDetail(id).subscribe(function (series) {
            _this.seriesData.seriesDetail = series;
            var freqGeos = series.freqGeos;
            var geoFreqs = series.geoFreqs;
            decimals = series.decimals ? series.decimals : 1;
            currentGeo = series.geography;
            currentFreq = { freq: series.frequencyShort, label: series.frequency };
            _this.seriesData.currentGeo = currentGeo;
            _this.seriesData.regions = freqGeos.find(function (freq) { return freq.freq === currentFreq.freq; }).geos;
            _this.seriesData.frequencies = geoFreqs.find(function (geo) { return geo.handle === currentGeo.handle; }).freqs;
            _this.seriesData.yoyChange = series['percent'] === true ? 'Year/Year Change' : 'Year/Year % Change';
            _this.seriesData.ytdChange = series['percent'] === true ? 'Year-to-Date Change' : 'Year-to-Date % Change';
            _this.seriesData.currentFreq = currentFreq;
        }, function (error) {
            error = _this.errorMessage = error;
            _this.seriesData.error = true;
        }, function () {
            _this._uheroAPIService.fetchSeriesSiblings(id).subscribe(function (siblings) {
                _this.seriesData.siblings = siblings;
                var geoFreqPair = _this.findGeoFreqSibling(siblings, currentGeo.handle, currentFreq.freq);
                // If saPairAvail === true, display SA toggle in single series view
                if (geoFreqPair.length > 1) {
                    _this.seriesData.saPairAvail = true;
                }
            });
            _this.getSeriesObservations(id, decimals);
        });
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].forkJoin(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(this.seriesData));
    };
    SeriesHelperService.prototype.getSeriesObservations = function (id, decimals) {
        var _this = this;
        var dateArray = [];
        this._uheroAPIService.fetchObservations(id).subscribe(function (observations) {
            var obs = observations;
            var obsStart = obs.observationStart;
            var obsEnd = obs.observationEnd;
            if (obs) {
                // Use to format dates for table
                _this._helper.createDateArray(obsStart, obsEnd, _this.seriesData.currentFreq.freq, dateArray);
                var data = _this._helper.dataTransform(obs, dateArray, decimals);
                _this.seriesData.chartData = data.chartData;
                _this.seriesData.seriesTableData = data.tableData;
            }
            else {
                _this.seriesData.noData = 'Data not available';
            }
        });
    };
    // Find series siblings for a particular geo-frequency combination
    SeriesHelperService.prototype.findGeoFreqSibling = function (seriesSiblings, geo, freq) {
        var saSiblings = [];
        seriesSiblings.forEach(function (sibling) {
            if (geo === sibling.geography.handle && freq === sibling.frequencyShort) {
                saSiblings.push(sibling);
            }
        });
        return saSiblings;
    };
    // Get summary statistics for single series displays
    // Min & Max values (and their dates) for the selected date range; (%) change from selected range; level change from selected range
    SeriesHelperService.prototype.summaryStats = function (seriesData, freq, decimals) {
        var stats = {
            minValue: Infinity,
            minValueDate: '',
            maxValue: Infinity,
            maxValueDate: '',
            tableStartValue: Infinity,
            tableEndValue: Infinity,
            percChange: Infinity,
            levelChange: Infinity
        };
        var formatStats = {
            minValue: '',
            minValueDate: '',
            maxValue: '',
            maxValueDate: '',
            percChange: '',
            levelChange: '',
        };
        // Find first non-empty value as the table end value
        for (var i = 0; i < seriesData.length; i++) {
            if (stats.tableEndValue === Infinity && seriesData[i].value !== ' ') {
                stats.tableEndValue = seriesData[i].value;
            }
        }
        // Find last non-empty value as the table start value
        for (var i = seriesData.length - 1; i >= 0; i--) {
            if (stats.tableStartValue === Infinity && seriesData[i].value !== ' ') {
                stats.tableStartValue = seriesData[i].value;
            }
        }
        seriesData.forEach(function (item) {
            if (item.value !== ' ') {
                if (stats.minValue === Infinity || item.value < stats.minValue) {
                    stats.minValue = item.value;
                    stats.minValueDate = item.date;
                }
                if (stats.maxValue === Infinity || item.value > stats.maxValue) {
                    stats.maxValue = item.value;
                    stats.maxValueDate = item.date;
                }
            }
        });
        stats.percChange = ((stats.tableEndValue - stats.tableStartValue) / stats.tableStartValue) * 100;
        stats.levelChange = stats.tableEndValue - stats.tableStartValue;
        // Format numbers
        formatStats.minValue = this._helper.formatNum(stats.minValue, decimals);
        formatStats.minValueDate = this._helper.formatDate(stats.minValueDate, freq.freq);
        formatStats.maxValue = this._helper.formatNum(stats.maxValue, decimals);
        formatStats.maxValueDate = this._helper.formatDate(stats.maxValueDate, freq.freq);
        formatStats.percChange = this._helper.formatNum(stats.percChange, decimals);
        formatStats.levelChange = this._helper.formatNum(stats.levelChange, decimals);
        return formatStats;
    };
    return SeriesHelperService;
}());
SeriesHelperService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__["a" /* UheroApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__["a" /* UheroApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__helper_service__["a" /* HelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__helper_service__["a" /* HelperService */]) === "function" && _b || Object])
], SeriesHelperService);

var _a, _b;
//# sourceMappingURL=series-helper.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_highcharts__ = __webpack_require__("../../../../angular2-highcharts/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_highcharts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_recaptcha__ = __webpack_require__("../../../../ng2-recaptcha/ng2-recaptcha.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_recaptcha___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_recaptcha__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__header_header_component__ = __webpack_require__("../../../../../src/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__single_series_single_series_component__ = __webpack_require__("../../../../../src/app/single-series/single-series.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__sidebar_nav_sidebar_nav_component__ = __webpack_require__("../../../../../src/app/sidebar-nav/sidebar-nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__highchart_highchart_component__ = __webpack_require__("../../../../../src/app/highchart/highchart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__freq_selector_freq_selector_component__ = __webpack_require__("../../../../../src/app/freq-selector/freq-selector.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__geo_selector_geo_selector_component__ = __webpack_require__("../../../../../src/app/geo-selector/geo-selector.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__highstock_highstock_component__ = __webpack_require__("../../../../../src/app/highstock/highstock.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__category_table_category_table_component__ = __webpack_require__("../../../../../src/app/category-table/category-table.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__search_bar_search_bar_component__ = __webpack_require__("../../../../../src/app/search-bar/search-bar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__feedback_feedback_component__ = __webpack_require__("../../../../../src/app/feedback/feedback.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__category_datatables_category_datatables_component__ = __webpack_require__("../../../../../src/app/category-datatables/category-datatables.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__category_charts_category_charts_component__ = __webpack_require__("../../../../../src/app/category-charts/category-charts.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__date_slider_date_slider_component__ = __webpack_require__("../../../../../src/app/date-slider/date-slider.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Shared; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















var Shared = (function () {
    function Shared() {
    }
    return Shared;
}());
Shared = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_10__single_series_single_series_component__["a" /* SingleSeriesComponent */],
            __WEBPACK_IMPORTED_MODULE_11__sidebar_nav_sidebar_nav_component__["a" /* SidebarNavComponent */],
            __WEBPACK_IMPORTED_MODULE_12__highchart_highchart_component__["a" /* HighchartComponent */],
            __WEBPACK_IMPORTED_MODULE_13__freq_selector_freq_selector_component__["a" /* FreqSelectorComponent */],
            __WEBPACK_IMPORTED_MODULE_15__highstock_highstock_component__["a" /* HighstockComponent */],
            __WEBPACK_IMPORTED_MODULE_16__category_table_category_table_component__["a" /* CategoryTableComponent */],
            __WEBPACK_IMPORTED_MODULE_17__search_bar_search_bar_component__["a" /* SearchBarComponent */],
            __WEBPACK_IMPORTED_MODULE_18__feedback_feedback_component__["a" /* FeedbackComponent */],
            __WEBPACK_IMPORTED_MODULE_19__category_datatables_category_datatables_component__["a" /* CategoryDatatablesComponent */],
            __WEBPACK_IMPORTED_MODULE_20__category_charts_category_charts_component__["a" /* CategoryChartsComponent */],
            __WEBPACK_IMPORTED_MODULE_21__date_slider_date_slider_component__["a" /* DateSliderComponent */],
            __WEBPACK_IMPORTED_MODULE_14__geo_selector_geo_selector_component__["a" /* GeoSelectorComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_6_angular2_highcharts__["ChartModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["RouterModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["DataTableModule"], __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["SharedModule"],
            __WEBPACK_IMPORTED_MODULE_8_ng2_recaptcha__["RecaptchaModule"].forRoot()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_9__header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_10__single_series_single_series_component__["a" /* SingleSeriesComponent */],
            __WEBPACK_IMPORTED_MODULE_11__sidebar_nav_sidebar_nav_component__["a" /* SidebarNavComponent */],
            __WEBPACK_IMPORTED_MODULE_12__highchart_highchart_component__["a" /* HighchartComponent */],
            __WEBPACK_IMPORTED_MODULE_13__freq_selector_freq_selector_component__["a" /* FreqSelectorComponent */],
            __WEBPACK_IMPORTED_MODULE_15__highstock_highstock_component__["a" /* HighstockComponent */],
            __WEBPACK_IMPORTED_MODULE_16__category_table_category_table_component__["a" /* CategoryTableComponent */],
            __WEBPACK_IMPORTED_MODULE_17__search_bar_search_bar_component__["a" /* SearchBarComponent */],
            __WEBPACK_IMPORTED_MODULE_18__feedback_feedback_component__["a" /* FeedbackComponent */],
            __WEBPACK_IMPORTED_MODULE_19__category_datatables_category_datatables_component__["a" /* CategoryDatatablesComponent */],
            __WEBPACK_IMPORTED_MODULE_20__category_charts_category_charts_component__["a" /* CategoryChartsComponent */],
            __WEBPACK_IMPORTED_MODULE_21__date_slider_date_slider_component__["a" /* DateSliderComponent */],
            __WEBPACK_IMPORTED_MODULE_14__geo_selector_geo_selector_component__["a" /* GeoSelectorComponent */]
        ]
    })
], Shared);

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ "../../../../../src/app/sidebar-nav/sidebar-nav.component.html":
/***/ (function(module, exports) {

module.exports = "<nav id=\"sidebar-nav\" class=\"navbar navbar-fixed-top navbar-light bg-white\">\r\n  <div>\r\n    <button (click)=\"mobileMenuToggle()\" id=\"navbarSideButton\" class=\"hidden-md-up\" type=\"button\" data-toggle=\"collapse\" aria-controls=\"catNavbar\" aria-expanded=\"false\" aria-labal=\"Toggle Category Menu\">\r\n      &#9776;\r\n    </button>\r\n    <a class=\"navbar-brand\" href=\"http://uhero.hawaii.edu/6/data\">\r\n      <img src=\"../../assets/UHEROdata-Logo-color.svg\" alt=\"UHERO.data logo\">\r\n    </a>\r\n    <app-search-bar (onSearch)=\"onSearch($event)\"></app-search-bar>\r\n  </div>\r\n  <ul id=\"navbar-side\" class=\"navbar-side\" [class.reveal]=\"reveal\">\r\n    <li class=\"list-item\" *ngFor=\"let category of categories, let cat = index\" [class.selectedCategory]=\"category.id === selectedCategory\">\r\n      <a (click)=\"navigate(category.id)\">&nbsp; {{category.name}} <i [id]=\"category.id\" *ngIf=\"loading && category.id === selectedCategory\" class=\"fa fa-spinner fa-pulse fa-fw\"></i></a>\r\n    </li>\r\n  </ul>\r\n  <div [class.overlay]=\"overlay\" (click)=\"mobileMenuToggle()\"></div>\r\n</nav>"

/***/ }),

/***/ "../../../../../src/app/sidebar-nav/sidebar-nav.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n@media (max-width: 767px) {\n  .navbar {\n    background-color: #FFF;\n    padding: 0;\n    box-shadow: 0 4px 6px -6px #000;\n    -moz-box-shadow: 0 4px 6px -6px #000;\n    -webkit-box-shadow: 0 4px 6px -6px #000; } }\n\n@media (min-width: 768px) {\n  #sidebar-nav .navbar-brand {\n    display: none; } }\n\n@media (max-width: 767px) {\n  #sidebar-nav .navbar-brand {\n    float: none;\n    padding: 0;\n    margin: 0; } }\n\n#sidebar-nav .navbar-brand img {\n  width: 185px;\n  padding: 5px; }\n\n@media (min-width: 768px) {\n  #sidebar-nav {\n    margin-top: 65px;\n    position: relative;\n    padding: 0; } }\n\n#sidebar-nav button {\n  background-color: #FFF;\n  border: none;\n  float: left;\n  font-size: 1.5em;\n  color: #505050; }\n\n#sidebar-nav .navbar-side {\n  padding-left: 0px; }\n  @media (max-width: 543px) {\n    #sidebar-nav .navbar-side {\n      height: 100%;\n      width: 85%;\n      -webkit-transform: translateX(-100%);\n      transform: translateX(-100%);\n      transition: 300ms ease;\n      position: fixed;\n      top: 0;\n      left: 0;\n      padding: 0;\n      list-style: none;\n      background-color: #F9F9F9;\n      overflow-y: scroll;\n      z-index: 100; } }\n  @media (min-width: 544px) and (max-width: 767px) {\n    #sidebar-nav .navbar-side {\n      width: 50%;\n      height: 100%;\n      -webkit-transform: translateX(-100%);\n      transform: translateX(-100%);\n      transition: 300ms ease;\n      position: fixed;\n      top: 0;\n      left: 0;\n      padding: 0;\n      list-style: none;\n      border-left: 2px solid #E5E5E5;\n      background-color: #F9F9F9;\n      overflow-y: scroll;\n      z-index: 100; } }\n  @media (min-width: 768px) {\n    #sidebar-nav .navbar-side {\n      width: -webkit-fit-content;\n      width: -moz-fit-content;\n      width: fit-content; } }\n\n@media (max-width: 767px) {\n  #sidebar-nav .reveal {\n    -webkit-transform: translateX(0%);\n    transform: translateX(0%);\n    transition: 300ms ease; } }\n\n#sidebar-nav .overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  cursor: pointer;\n  background-color: #E5E5E5;\n  opacity: 0.6;\n  z-index: 99; }\n\n#sidebar-nav .sidebar-list, #sidebar-nav .list-item {\n  list-style-type: none;\n  -webkit-padding-start: 1em;\n  color: #505050;\n  font-size: 0.9em;\n  cursor: pointer;\n  white-space: nowrap; }\n\n@media (min-width: 768px) {\n  #sidebar-nav .list-item {\n    height: 35px;\n    padding: 0 15px 0 5px; } }\n\n#sidebar-nav .list-item a {\n  font-size: 0.9em;\n  display: block;\n  text-decoration: none;\n  color: #505050;\n  line-height: 35px; }\n  #sidebar-nav .list-item a:active {\n    color: #FFF; }\n\n#sidebar-nav .list-item:hover {\n  background-color: #E5E5E5;\n  color: #FFF; }\n\n#sidebar-nav .selectedCategory {\n  background-color: #1D667F;\n  color: #FFF; }\n\n#sidebar-nav .selectedCategory a, #sidebar-nav .selectedCategory a:hover, #sidebar-nav .selectedCategory a:active {\n  color: #FFF; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/sidebar-nav/sidebar-nav.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__ = __webpack_require__("../../../../../src/app/uhero-api.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarNavComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SidebarNavComponent = (function () {
    function SidebarNavComponent(_uheroAPIService, route, _router) {
        this._uheroAPIService = _uheroAPIService;
        this.route = route;
        this._router = _router;
        this.expand = null;
        this.reveal = false;
        this.overlay = false;
    }
    SidebarNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._uheroAPIService.fetchCategories().subscribe(function (categories) { return _this.categories = categories; }, function (error) { return _this.errorMessage = error; });
        this.route.queryParams.subscribe(function (params) {
            _this.id = params['id'];
            _this.view = params['view'] ? params['view'] : 'chart';
            _this.yoy = params['yoy'] ? params['yoy'] : 'false';
            _this.ytd = params['ytd'] ? params['ytd'] : 'false';
            _this.selectedCategory = _this.findSelectedCategory(_this.id);
        });
    };
    SidebarNavComponent.prototype.findSelectedCategory = function (id) {
        if (id === undefined) {
            return 42;
        }
        if (id && isNaN(id)) {
            return null;
        }
        if (id && +id) {
            return +id;
        }
    };
    SidebarNavComponent.prototype.navigate = function (catId) {
        var _this = this;
        // If a popover from the category tables is open, remove when navigating to another category
        var popover = $('.popover');
        if (popover) {
            popover.remove();
        }
        this.loading = true;
        this.selectedCategory = catId;
        setTimeout(function () {
            _this._router.navigate(['/category'], { queryParams: { id: catId }, queryParamsHandling: 'merge' });
            _this.loading = false;
        }, 15);
    };
    SidebarNavComponent.prototype.mobileMenuToggle = function () {
        this.reveal = this.reveal === false ? true : false;
        this.overlay = this.overlay === false ? true : false;
    };
    SidebarNavComponent.prototype.onSearch = function (event) {
        this._router.navigate(['/category'], { queryParams: { id: event }, queryParamsHandling: 'merge' });
    };
    return SidebarNavComponent;
}());
SidebarNavComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-sidebar-nav',
        template: __webpack_require__("../../../../../src/app/sidebar-nav/sidebar-nav.component.html"),
        styles: [__webpack_require__("../../../../../src/app/sidebar-nav/sidebar-nav.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__["a" /* UheroApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__["a" /* UheroApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _c || Object])
], SidebarNavComponent);

var _a, _b, _c;
//# sourceMappingURL=sidebar-nav.component.js.map

/***/ }),

/***/ "../../../../../src/app/single-series/single-series.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let data of seriesData | async\" class=\"single-series-view col-xs-12 col-sm-12 col-xl-11\">\r\n  <p *ngIf=\"data.error\">Series does not exist.</p>\r\n  <div *ngIf=\"!data.error\">\r\n    <h3 class=\"series-title\">{{data.seriesDetail.title}}</h3>\r\n    <app-geo-selector [regions]=\"data.regions\" [(selectedGeo)]=\"data.currentGeo\" (selectedGeoChange)=\"goToSeries(data.siblings, data.currentFreq.freq, $event.handle, seasonallyAdjusted)\" class=\"geo-selector\"></app-geo-selector>\r\n    <app-freq-selector [freqs]=\"data.frequencies\" [(selectedFreq)]=\"data.currentFreq\" (selectedFreqChange)=\"goToSeries(data.siblings, $event.freq, data.currentGeo.handle, seasonallyAdjusted)\" class=\"freq-selector\"></app-freq-selector>\r\n    <div class=\"form-check\" *ngIf=\"data.saPairAvail\">\r\n      <label class=\"form-check-inline\">\r\n        <input type=\"checkbox\" [(ngModel)]=\"seasonallyAdjusted\"  (ngModelChange)=\"goToSeries(data.siblings, data.currentFreq.freq, data.currentGeo.handle, $event)\">Seasonally Adjusted\r\n      </label>\r\n    </div>\r\n    <p *ngIf=\"noSelection\">{{noSelection}}</p>\r\n    <p *ngIf=\"data.noData\">{{data.noData}}</p>\r\n    <app-highstock *ngIf=\"!noSelection && !data.noData\" [start]=\"startDate\" [end]=\"endDate\" [chartData]=\"data.chartData\" [seriesDetail]=\"data.seriesDetail\"  [currentFreq]=\"data.currentFreq\" [currentGeo]=\"data.currentGeo\" (chartExtremes)=\"updateChartExtremes($event)\" (tableExtremes)=\"redrawTable($event, data.seriesDetail, data.seriesTableData, data.currentFreq)\"></app-highstock>\r\n    <div class=\"source\" *ngIf=\"data.seriesDetail.source_description || data.seriesDetail.source_link\">\r\n      {{data.seriesDetail.source_description}}<br><a href=\"{{data.seriesDetail.source_link}}\" target=\"_blank\">{{data.seriesDetail.source_link}}</a><br>{{data.seriesDetail.sourceDetails}}\r\n    </div>\r\n    <div class=\"summary-stats\" *ngIf=\"!noSelection && !data.noData && summaryStats\">\r\n      <div class=\"stat\">\r\n        <p>Min:<br>{{summaryStats.minValue}}<br>{{summaryStats.minValueDate}}</p>\r\n      </div>\r\n      <div class=\"stat\">\r\n        <p>Max:<br>{{summaryStats.maxValue}}<br>{{summaryStats.maxValueDate}}</p>\r\n      </div>\r\n      <div class=\"stat\" *ngIf=\"!data.seriesDetail.percent\">\r\n        <p>% Change over Selected Range:<br>{{summaryStats.percChange}}</p>\r\n      </div>\r\n      <div class=\"stat\">\r\n        <p>Change over Selected Range:<br>{{summaryStats.levelChange}}</p>\r\n      </div>\r\n    </div>\r\n    <div class=\"series-table\">\r\n    <p-dataTable *ngIf=\"!noSelection && !data.noData\" [value]=\"newTableData\">\r\n      <p-column field=\"tableDate\" header=\"Date\" [sortable]=\"true\"></p-column>\r\n      <p-column field=\"formattedValue\" header=\"Level\"></p-column>\r\n      <p-column field=\"formattedYoy\" [header]=data.yoyChange></p-column>\r\n      <p-column *ngIf=\"data.currentFreq.freq !== 'A'\" field=\"formattedYtd\" [header]=data.ytdChange></p-column>\r\n    </p-dataTable>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/single-series/single-series.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n.single-series-view {\n  margin: 18% 0 2% 0;\n  vertical-align: top;\n  display: inline-block; }\n  @media (min-width: 768px) {\n    .single-series-view {\n      margin-top: 70px;\n      margin-bottom: 15px; } }\n  .single-series-view .form-check {\n    display: inline-block;\n    margin-left: 10px;\n    margin-bottom: 0;\n    font-size: 0.9em; }\n    .single-series-view .form-check input {\n      margin-right: 0.25rem; }\n  .single-series-view .series-title {\n    display: block;\n    font-size: 1.5em;\n    color: #1D667F;\n    letter-spacing: 0.05em; }\n    @media (min-width: 768px) {\n      .single-series-view .series-title {\n        margin: auto 10px auto 0;\n        display: inline-block;\n        vertical-align: middle; } }\n  .single-series-view .source {\n    width: 100%;\n    background-color: #F9F9F9;\n    padding: 10px 0px 0px;\n    font-size: 0.9em;\n    text-align: center; }\n    .single-series-view .source a {\n      color: #1D667F; }\n  .single-series-view .summary-stats {\n    width: 100%;\n    display: table;\n    table-layout: fixed;\n    background-color: #F9F9F9;\n    padding: 10px 0; }\n    .single-series-view .summary-stats .stat {\n      display: table-cell;\n      text-align: center;\n      font-size: 0.9em; }\n      .single-series-view .summary-stats .stat p {\n        margin-bottom: 0;\n        color: #1D667F; }\n  .single-series-view .selectors {\n    margin: 0 auto; }\n    .single-series-view .selectors .geo-selector, .single-series-view .selectors .freq-selector {\n      display: inline-block; }\n  .single-series-view .single-chart-container {\n    margin: 2% 3%; }\n  .single-series-view .series-table th, .single-series-view .series-table td {\n    text-align: right;\n    font-family: 'Lucida Sans', sans-serif;\n    font-size: 0.9em; }\n  .single-series-view .series-table th.ui-state-active {\n    background: #ebedf0;\n    color: #505050;\n    outline: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/single-series/single-series.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__ = __webpack_require__("../../../../../src/app/uhero-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__series_helper_service__ = __webpack_require__("../../../../../src/app/series-helper.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SingleSeriesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SingleSeriesComponent = (function () {
    function SingleSeriesComponent(_uheroAPIService, _series, route, _router, cdRef) {
        this._uheroAPIService = _uheroAPIService;
        this._series = _series;
        this.route = route;
        this._router = _router;
        this.cdRef = cdRef;
        this.seasonallyAdjusted = null;
    }
    SingleSeriesComponent.prototype.ngOnInit = function () {
        this.currentGeo = { fips: null, handle: null, name: null };
        this.currentFreq = { freq: null, label: null };
    };
    SingleSeriesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            var seriesId = Number.parseInt(params['id']);
            if (params['sa'] !== undefined) {
                _this.seasonallyAdjusted = (params['sa'] === 'true');
            }
            _this.seriesData = _this._series.getSeriesData(seriesId);
        });
        this.cdRef.detectChanges();
    };
    // Redraw chart when selecting a new region or frequency
    SingleSeriesComponent.prototype.goToSeries = function (siblings, freq, geo, sa) {
        this.seasonallyAdjusted = sa;
        this.noSelection = null;
        var id;
        // Get array of siblings for selected geo and freq
        var geoFreqSib = this._series.findGeoFreqSibling(siblings, geo, freq);
        id = this.selectSibling(geoFreqSib, sa, freq);
        if (id) {
            var queryParams = {
                id: id,
                sa: this.seasonallyAdjusted,
                geo: geo,
                freq: freq
            };
            this.startDate = this.chartStart;
            this.endDate = this.chartEnd;
            this._router.navigate(['/series/'], { queryParams: queryParams, queryParamsHandling: 'merge' });
        }
        else {
            this.noSelection = 'Selection Not Available';
        }
    };
    SingleSeriesComponent.prototype.selectSibling = function (geoFreqSiblings, sa, freq) {
        // If more than one sibling exists (i.e. seasonal & non-seasonal)
        // Select series where seasonallyAdjusted matches sa
        if (geoFreqSiblings.length > 1) {
            return geoFreqSiblings.find(function (sibling) { return sibling.seasonallyAdjusted === sa; }).id;
        }
        if (geoFreqSiblings.length <= 1) {
            if (sa !== geoFreqSiblings[0].seasonallyAdjusted && freq !== 'A') {
                this.seasonallyAdjusted = geoFreqSiblings[0].seasonallyAdjusted;
            }
            return geoFreqSiblings[0].id;
        }
    };
    SingleSeriesComponent.prototype.updateChartExtremes = function (e) {
        this.chartStart = e.minDate;
        this.chartEnd = e.maxDate;
    };
    // Update table when selecting new ranges in the chart
    SingleSeriesComponent.prototype.redrawTable = function (e, seriesDetail, tableData, freq) {
        var deciamls = seriesDetail.decimals ? seriesDetail.decimals : 1;
        var minDate, maxDate, tableStart, tableEnd;
        minDate = e.minDate;
        maxDate = e.maxDate;
        for (var i = 0; i < tableData.length; i++) {
            if (tableData[i].date === maxDate) {
                tableStart = i;
            }
            if (tableData[i].date === minDate) {
                tableEnd = i;
            }
        }
        this.newTableData = tableData.slice(tableEnd, tableStart + 1).reverse();
        this.summaryStats = this._series.summaryStats(this.newTableData, freq, deciamls);
    };
    return SingleSeriesComponent;
}());
SingleSeriesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-single-series',
        template: __webpack_require__("../../../../../src/app/single-series/single-series.component.html"),
        styles: [__webpack_require__("../../../../../src/app/single-series/single-series.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__["a" /* UheroApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__["a" /* UheroApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__series_helper_service__["a" /* SeriesHelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__series_helper_service__["a" /* SeriesHelperService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _e || Object])
], SingleSeriesComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=single-series.component.js.map

/***/ }),

/***/ "../../../../../src/app/uhero-api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_mergeMap__ = __webpack_require__("../../../../rxjs/add/operator/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_mergeMap__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UheroApiService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var UheroApiService = (function () {
    function UheroApiService(rootCategory, http) {
        this.rootCategory = rootCategory;
        this.http = http;
        this.cachedExpanded = [];
        this.cachedSelectedCategory = [];
        this.cachedGeoSeries = [];
        this.cachedObservations = [];
        this.cachedSeries = [];
        this.cachedSeriesDetail = [];
        this.cachedSiblings = [];
        this.cachedSearchExpand = [];
        this.cachedSearch = [];
        this.cachedCatMeasures = [];
        this.cachedMeasureSeries = [];
        // this.baseUrl = 'http://localhost:8080/v1';
        this.baseUrl = 'http://api.uhero.hawaii.edu/v1';
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        this.headers.append('Authorization', 'Bearer -VI_yuv0UzZNy4av1SM5vQlkfPK_JKnpGfMzuJR7d0M=');
        this.requestOptionsArgs = { headers: this.headers };
    }
    // Get data from API
    // Gets all available categories. Used for navigation & displaying sublists
    UheroApiService.prototype.fetchCategories = function () {
        var _this = this;
        if (this.cachedCategories) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.cachedCategories);
        }
        else {
            var categories$_1 = this.http.get(this.baseUrl + "/category", this.requestOptionsArgs)
                .map(mapCategories, this)
                .do(function (val) {
                _this.cachedCategories = val;
                categories$_1 = null;
            });
            return categories$_1;
        }
    };
    // Gets observations for series in a (sub) category
    UheroApiService.prototype.fetchExpanded = function (id, geo, freq) {
        var _this = this;
        if (this.cachedExpanded[id + geo + freq]) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.cachedExpanded[id + geo + freq]);
        }
        else {
            var expanded$_1 = this.http.get(this.baseUrl + "/category/series?id=" +
                id + "&geo=" + geo + "&freq=" + freq + "&expand=true", this.requestOptionsArgs)
                .map(mapData)
                .do(function (val) {
                _this.cachedExpanded[id + geo + freq] = val;
                expanded$_1 = null;
            });
            return expanded$_1;
        }
    };
    // Gets a particular category. Used to identify a category's date ranges
    UheroApiService.prototype.fetchSelectedCategory = function (id) {
        var _this = this;
        if (this.cachedSelectedCategory[id]) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.cachedSelectedCategory[id]);
        }
        else {
            var selectedCat$_1 = this.http.get(this.baseUrl + "/category?id=" + id, this.requestOptionsArgs)
                .map(mapData)
                .do(function (val) {
                _this.cachedSelectedCategory[id] = val;
                selectedCat$_1 = null;
            });
            return selectedCat$_1;
        }
    };
    UheroApiService.prototype.fetchSeries = function (id, geo, freq) {
        var _this = this;
        if (this.cachedSeries[id + geo + freq]) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.cachedSeries[id + geo + freq]);
        }
        else {
            var series$_1 = this.http.get(this.baseUrl + "/category/series?id=" + id + "&geo=" + geo + "&freq=" + freq, this.requestOptionsArgs)
                .map(mapData)
                .do(function (val) {
                _this.cachedSeries[id + geo + freq] = val;
                series$_1 = null;
            });
            return series$_1;
        }
    };
    // Gets data for a particular series. Used for single series view.
    UheroApiService.prototype.fetchSeriesDetail = function (id) {
        var _this = this;
        if (this.cachedSeriesDetail[id]) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.cachedSeriesDetail[id]);
        }
        else {
            var seriesDetail$_1 = this.http.get(this.baseUrl + "/series?id=" + id, this.requestOptionsArgs)
                .map(mapData)
                .do(function (val) {
                _this.cachedSeriesDetail[id] = val;
                seriesDetail$_1 = null;
            });
            return seriesDetail$_1;
        }
    };
    // Get list of siblings for a particular series
    UheroApiService.prototype.fetchSeriesSiblings = function (seriesId) {
        var _this = this;
        if (this.cachedSiblings[seriesId]) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.cachedSiblings[seriesId]);
        }
        else {
            var seriesSiblings$_1 = this.http.get(this.baseUrl + "/series/siblings?id=" + seriesId, this.requestOptionsArgs)
                .map(mapData)
                .do(function (val) {
                _this.cachedSiblings[seriesId] = val;
                seriesSiblings$_1 = null;
            });
            return seriesSiblings$_1;
        }
    };
    UheroApiService.prototype.fetchGeoSeries = function (id, handle) {
        var _this = this;
        if (this.cachedGeoSeries[id + handle]) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.cachedGeoSeries[id + handle]);
        }
        else {
            var geoSeries$_1 = this.http.get(this.baseUrl + "/category/series?id=" + id + "&geo=" + handle, this.requestOptionsArgs)
                .map(mapData)
                .do(function (val) {
                _this.cachedGeoSeries[id + handle] = val;
                geoSeries$_1 = null;
            });
            return geoSeries$_1;
        }
    };
    UheroApiService.prototype.fetchCategoryMeasurements = function (id) {
        var _this = this;
        if (this.cachedCatMeasures[id]) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.cachedCatMeasures[id]);
        }
        else {
            var catMeasures$_1 = this.http.get(this.baseUrl + "/category/measurements?id=" + id, this.requestOptionsArgs)
                .map(mapData)
                .do(function (val) {
                _this.cachedCatMeasures[id] = val;
                catMeasures$_1 = null;
            });
            return catMeasures$_1;
        }
    };
    UheroApiService.prototype.fetchMeasurementSeries = function (id, freq) {
        var _this = this;
        if (this.cachedMeasureSeries[id + freq]) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.cachedMeasureSeries[id + freq]);
        }
        else {
            var measureSeries$_1 = this.http.get(this.baseUrl + "/measurement/series?id=" + id + "&freq=" + freq, this.requestOptionsArgs)
                .map(mapData)
                .do(function (val) {
                _this.cachedMeasureSeries[id + freq] = val;
                measureSeries$_1 = null;
            });
            return measureSeries$_1;
        }
    };
    UheroApiService.prototype.fetchSearch = function (search) {
        var _this = this;
        if (this.cachedSearch[search]) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.cachedSearch[search]);
        }
        else {
            var filters$_1 = this.http.get(this.baseUrl + "/search?q=" + search, this.requestOptionsArgs)
                .map(mapData)
                .do(function (val) {
                _this.cachedSearch[search] = val;
                filters$_1 = null;
            });
            return filters$_1;
        }
    };
    UheroApiService.prototype.fetchSearchSeries = function (search) {
        var _this = this;
        if (this.cachedSearchExpand[search]) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.cachedSearchExpand[search]);
        }
        else {
            var search$_1 = this.http.get(this.baseUrl + "/search/series?q=" + search, this.requestOptionsArgs)
                .map(mapData)
                .do(function (val) {
                _this.cachedSearchExpand[search] = val;
                search$_1 = null;
            });
            return search$_1;
        }
    };
    UheroApiService.prototype.fetchSearchSeriesExpand = function (search, geo, freq) {
        var _this = this;
        if (this.cachedSearchExpand[search + geo + freq]) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.cachedSearchExpand[search + geo + freq]);
        }
        else {
            var search$_2 = this.http.get(this.baseUrl + "/search/series?q=" +
                search + "&geo=" + geo + "&freq=" + freq + "&expand=true", this.requestOptionsArgs)
                .map(mapData)
                .do(function (val) {
                _this.cachedSearchExpand[search + geo + freq] = val;
                search$_2 = null;
            });
            return search$_2;
        }
    };
    // Gets observation data for a series
    UheroApiService.prototype.fetchObservations = function (id) {
        var _this = this;
        if (this.cachedObservations[id]) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.cachedObservations[id]);
        }
        else {
            var observations$_1 = this.http.get(this.baseUrl + "/series/observations?id=" + id, this.requestOptionsArgs)
                .map(mapData)
                .do(function (val) {
                _this.cachedObservations[id] = val;
                observations$_1 = null;
            });
            return observations$_1;
        }
    };
    return UheroApiService;
}());
UheroApiService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('rootCategory')),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], UheroApiService);

// Create a nested JSON of parent and child categories
// Used for landing-page.component
// And side bar navigation on single-series & table views
function mapCategories(response) {
    var _this = this;
    var categories = response.json().data;
    var dataMap = categories.reduce(function (map, value) { return (map[value.id] = value, map); }, {});
    var categoryTree = [];
    categories.forEach(function (value) {
        var parent = dataMap[value.parentId];
        if (parent) {
            (parent.children || (parent.children = [])).push(value);
        }
        else {
            categoryTree.push(value);
        }
    });
    var result = categoryTree;
    categoryTree.forEach(function (category) {
        if (category.id === _this.rootCategory) {
            result = category.children;
        }
    });
    return result;
}
function mapData(response) {
    var data = response.json().data;
    return data;
}
var _a;
//# sourceMappingURL=uhero-api.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../../src/sprite-skin-nice2.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "sprite-skin-nice2.604dc56d925149a49655.png";

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map