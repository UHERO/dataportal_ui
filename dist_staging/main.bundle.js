webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/analyzer-highstock/analyzer-highstock.component.html":
/***/ (function(module, exports) {

module.exports = "<chart id=\"analyzer-chart\" type=\"StockChart\" [options]=\"options\" (load)=\"saveInstance($event.context)\">\n    <xAxis (afterSetExtremes)=\"updateExtremes($event)\"></xAxis>\n</chart>\n<div class=\"customize-tooltip\">\n    <p>Tooltip Display:</p>\n    <label class=\"form-check-inline\">\n        <input type=\"checkbox\" (change)=\"nameActive($event, chart, formatTooltip)\">Series Name\n    </label>\n    <label class=\"form-check-inline\">\n        <input type=\"checkbox\" (change)=\"unitsActive($event, chart, formatTooltip)\">Units\n    </label>\n    <label class=\"form-check-inline\">\n        <input type=\"checkbox\" (change)=\"geoActive($event, chart, formatTooltip)\">Geography\n    </label>\n</div>"

/***/ }),

/***/ "../../../../../src/app/analyzer-highstock/analyzer-highstock.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n/* Analyzer Chart */\n/* Loading Screen */\n.customize-tooltip {\n  display: inline-block; }\n  .customize-tooltip p {\n    display: inline-block;\n    font-size: 0.85em;\n    margin-top: 1rem;\n    vertical-align: middle; }\n\n#analyzer-chart {\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.15);\n  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.15);\n  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.15); }\n  #analyzer-chart .highcharts-background {\n    fill: #FAFAFB; }\n  #analyzer-chart .highcharts-button, #analyzer-chart .highcharts-button-hover {\n    stroke: none; }\n  #analyzer-chart .highcharts-button.highcharts-button-pressed {\n    fill: #1D667F; }\n    #analyzer-chart .highcharts-button.highcharts-button-pressed text {\n      fill: #FFF; }\n  #analyzer-chart .highcharts-subtitle {\n    fill: #B71625;\n    font-weight: bold; }\n  #analyzer-chart .highcharts-markers.highcharts-color-0 path {\n    fill: #1D667F; }\n  #analyzer-chart .highcharts-markers.highcharts-color-1 path {\n    fill: #F6A01B; }\n  #analyzer-chart .highcharts-markers.highcharts-color-2 path {\n    fill: #9E9E9E; }\n  #analyzer-chart .highcharts-markers.highcharts-color-3 path {\n    fill: #9BBB59; }\n  #analyzer-chart .highcharts-markers.highcharts-color-4 path {\n    fill: #8064A2; }\n  #analyzer-chart .highcharts-navigator-handle {\n    stroke: #999999; }\n  #analyzer-chart .highcharts-color-0 {\n    fill: #1D667F;\n    stroke: #1D667F; }\n  #analyzer-chart .highcharts-color-1 {\n    fill: #F6A01B;\n    stroke: #F6A01B; }\n  #analyzer-chart .highcharts-color-2 {\n    fill: #9E9E9E;\n    stroke: #9E9E9E; }\n  #analyzer-chart .highcharts-color-3 {\n    fill: #9BBB59;\n    stroke: #9BBB59; }\n  #analyzer-chart .highcharts-color-4 {\n    fill: #8064A2;\n    stroke: #8064A2; }\n  #analyzer-chart .highcharts-navigator-series .highcharts-graph {\n    color: #505050;\n    stroke: #505050; }\n  #analyzer-chart .highcharts-navigator-series .highcharts-area {\n    fill: #1D667F; }\n  #analyzer-chart .highcharts-title {\n    fill: #505050;\n    font-family: 'sans-serif'; }\n  #analyzer-chart .highcharts-tooltip {\n    -webkit-filter: none;\n            filter: none; }\n    #analyzer-chart .highcharts-tooltip .series-0 {\n      fill: #1D667F; }\n    #analyzer-chart .highcharts-tooltip .series-1 {\n      fill: #F6A01B; }\n    #analyzer-chart .highcharts-tooltip .series-2 {\n      fill: #9E9E9E; }\n    #analyzer-chart .highcharts-tooltip .series-3 {\n      fill: #9BBB59; }\n    #analyzer-chart .highcharts-tooltip .series-4 {\n      fill: #8064A2; }\n    #analyzer-chart .highcharts-tooltip .highcharts-tooltip-box {\n      stroke-width: 0; }\n  #analyzer-chart .highcharts-xaxis-labels text {\n    color: #9E9E9E;\n    fill: #9E9E9E; }\n  #analyzer-chart .highcharts-yaxis-grid .highcharts-grid-line {\n    display: none; }\n  #analyzer-chart .highcharts-yaxis-labels.series1 text {\n    color: #9E9E9E;\n    fill: #9E9E9E; }\n  #analyzer-chart .highcharts-yaxis-labels.series2 text {\n    color: #1D667F;\n    fill: #1D667F; }\n  #analyzer-chart .highcharts-yaxis.series1 .highcharts-axis-title {\n    color: #9E9E9E;\n    fill: #9E9E9E; }\n  #analyzer-chart .highcharts-yaxis.series2 .highcharts-axis-title {\n    color: #1D667F;\n    fill: #1D667F; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/analyzer-highstock/analyzer-highstock.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyzerHighstockComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Highcharts = __webpack_require__("../../../../highcharts/js/highstock.js");
var exporting = __webpack_require__("../../../../highcharts/js/modules/exporting.js");
var offlineExport = __webpack_require__("../../../../highcharts/js/modules/offline-exporting.js");
var exportCSV = __webpack_require__("../../../../../src/app/csv-export.js");
Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});
var AnalyzerHighstockComponent = (function () {
    function AnalyzerHighstockComponent() {
        this.tableExtremes = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](true);
    }
    AnalyzerHighstockComponent.prototype.ngOnInit = function () {
    };
    AnalyzerHighstockComponent.prototype.ngOnChanges = function () {
        var _this = this;
        // Series in the analyzer that have been selected to be displayed in the chart
        var selectedAnalyzerSeries = this.formatSeriesData(this.series, this.chart, this.allDates);
        if (this.chart) {
            var navDates = this.createNavigatorDates(this.allDates);
            // If a chart has been generated:
            // Check if series in the chart is selected in the analyzer, if not, remove series from the chart
            this.removeFromChart(selectedAnalyzerSeries.series, this.chart);
            // Check if the selected series have been drawn in the chart, if not, add series to the chart
            this.addToChart(selectedAnalyzerSeries.series, this.chart, navDates);
            // Add a chart subtitle to alert user of a warning
            this.chart.setSubtitle({
                text: this.alertMessage,
                floating: true
            });
            if (this.chart.subtitle) {
                setTimeout(function () {
                    _this.chart.subtitle.fadeOut('slow');
                }, 3000);
            }
            return;
        }
        // Draw chart if no chart exists
        this.drawChart(selectedAnalyzerSeries.series, selectedAnalyzerSeries.yAxis, this.formatTooltip, this.portalSettings);
    };
    AnalyzerHighstockComponent.prototype.removeFromChart = function (analyzerSeries, chart) {
        // Filter out series from chart that are not in analayzerSeries
        var removeSeries = chart.series.filter(function (cSeries) { return !analyzerSeries.some(function (aSeries) { return aSeries.name === cSeries.name; }) && cSeries.name !== 'Navigator 1'; });
        removeSeries.forEach(function (series) {
            series.remove();
        });
        // Remove y-axis if it has no series
        var noSeriesAxis = chart.yAxis.find(function (axis) { return !axis.series.length && axis.userOptions.className !== 'highcharts-navigator-yaxis'; });
        if (noSeriesAxis) {
            noSeriesAxis.remove();
            // If remaining y Axis is on the right side of the chart, update the right axis to be positioned on the left
            var opposite = chart.yAxis.find(function (axis) { return axis.userOptions.opposite; });
            if (opposite) {
                opposite.update({
                    opposite: false,
                });
            }
        }
    };
    AnalyzerHighstockComponent.prototype.addToChart = function (analyzerSeries, chart, navDates) {
        var _this = this;
        // Filter out series that have been selected in the analyzer but are not currently in the chart
        var addSeries = analyzerSeries.filter(function (aSeries) { return !chart.series.some(function (cSeries) { return cSeries.name === aSeries.name; }); });
        addSeries.forEach(function (series) {
            var seriesUnits = series.unitsLabelShort;
            // Find y-axis that corressponds with a series' units
            var yAxis = chart.yAxis.find(function (axis) { return axis.userOptions.title.text === seriesUnits; });
            // Find if 'yAxis0' exists
            var y0Exist = chart.yAxis.find(function (axis) { return axis.userOptions.id === 'yAxis0'; });
            if (!yAxis) {
                _this.addYAxis(chart, seriesUnits, y0Exist);
            }
            series.yAxis = yAxis ? yAxis.userOptions.id : (y0Exist ? 'yAxis1' : 'yAxis0');
            chart.addSeries(series);
        });
        chart.addSeries({
            data: navDates,
            showInNavigator: true,
            index: -1,
            colorIndex: -1,
            name: 'Navigator'
        });
    };
    AnalyzerHighstockComponent.prototype.addYAxis = function (chart, seriesUnits, y0Exist) {
        var oppositeExist = chart.yAxis.find(function (axis) { return axis.userOptions.opposite === true; });
        chart.addAxis({
            labels: {
                format: '{value:,.2f}'
            },
            title: {
                text: seriesUnits
            },
            id: y0Exist ? 'yAxis1' : 'yAxis0',
            opposite: oppositeExist ? false : true,
            showLastLabel: true
        });
    };
    AnalyzerHighstockComponent.prototype.createYAxes = function (series, yAxes) {
        var allUnits = series.map(function (serie) { return serie.unitsLabelShort; });
        var uniqueUnits = allUnits.filter(function (unit, index, units) { return units.indexOf(unit) === index; });
        uniqueUnits.forEach(function (unit, index) {
            yAxes.push({
                labels: {
                    format: '{value:,.2f}'
                },
                id: 'yAxis' + index,
                title: {
                    text: unit
                },
                opposite: index === 0 ? false : true,
                minPadding: 0,
                maxPadding: 0,
                minTickInterval: 0.01
            });
        });
        return yAxes;
    };
    AnalyzerHighstockComponent.prototype.createNavigatorDates = function (dates) {
        // Dates include duplicates when annual is mixed with higher frequencies, causes highcharts error
        var uniqueDates = dates.filter(function (date, index, self) {
            return self.findIndex(function (d) { return d.date === date.date; }) === index;
        });
        var navigatorDates = uniqueDates.map(function (date) {
            var obs = [];
            obs[0] = Date.parse(date.date);
            obs[1] = null;
            return obs;
        });
        return navigatorDates;
    };
    AnalyzerHighstockComponent.prototype.formatSeriesData = function (series, chartInstance, dates) {
        var chartSeries = [];
        var yAxes;
        if (!chartInstance) {
            yAxes = this.createYAxes(series, []);
        }
        series.forEach(function (serie, index) {
            // Find corresponding y-axis on initial display (i.e. no chartInstance)
            var axis = yAxes ? yAxes.find(function (axis) { return axis.title.text === serie.unitsLabelShort; }) : null;
            chartSeries.push({
                className: serie.id,
                name: serie.seasonallyAdjusted ? serie.title + ' (' + serie.frequencyShort + '; ' + serie.geography.handle + '; SA)' : serie.title + ' (' + serie.frequencyShort + '; ' + serie.geography.handle + ')',
                data: serie.chartData.level,
                yAxis: axis ? axis.id : null,
                displayName: serie.title,
                decimals: serie.decimals,
                frequency: serie.frequencyShort,
                geography: serie.geography.name,
                showInNavigator: false,
                unitsLabelShort: serie.unitsLabelShort,
                seasonallyAdjusted: serie.seasonallyAdjusted,
                dataGrouping: {
                    enabled: false
                },
                pseudoZones: serie.chartData.pseudoZones
            });
        });
        if (!chartInstance) {
            var navDates = this.createNavigatorDates(dates);
            chartSeries.push({
                data: navDates,
                showInNavigator: true,
                index: 10,
                colorIndex: 10,
                name: 'Navigator'
            });
        }
        return { series: chartSeries, yAxis: yAxes };
    };
    AnalyzerHighstockComponent.prototype.drawChart = function (series, yAxis, tooltipFormatter, portalSettings) {
        this.options = {
            chart: {
                alignTicks: false,
                zoomType: 'x',
            },
            labels: {
                items: [{
                        html: ''
                    }, {
                        html: ''
                    }, {
                        html: ''
                    }, {
                        html: ''
                    }, {
                        html: portalSettings.highstock.labels.portal,
                    }, {
                        html: portalSettings.highstock.labels.portalLink
                    }, {
                        html: ''
                    }],
                style: {
                    display: 'none'
                }
            },
            rangeSelector: {
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
                    includeInCSVExport: false,
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
                chartOptions: {
                    events: null,
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
                        text: portalSettings.highstock.credits,
                        position: {
                            align: 'right',
                            x: -115,
                            y: -41
                        }
                    },
                    title: {
                        align: 'left'
                    }
                }
            },
            tooltip: {
                borderWidth: 0,
                shadow: false,
                shared: true,
                formatter: function (args) {
                    return tooltipFormatter(args, this.points, this.x);
                }
            },
            credits: {
                enabled: false
            },
            xAxis: {
                minRange: 1000 * 3600 * 24 * 30 * 12,
                ordinal: false
            },
            yAxis: yAxis,
            plotOptions: {
                series: {
                    cropThreshold: 0,
                }
            },
            series: series
        };
    };
    AnalyzerHighstockComponent.prototype.saveInstance = function (chartInstance) {
        this.chart = chartInstance;
        this.setTableExtremes(chartInstance);
    };
    AnalyzerHighstockComponent.prototype.formatTooltip = function (args, points, x, name, units, geo) {
        var getFreqLabel = function (frequency, date) {
            if (frequency === 'A') {
                return '';
            }
            if (frequency === 'Q') {
                if (Highcharts.dateFormat('%b', date) === 'Jan') {
                    return ' Q1';
                }
                if (Highcharts.dateFormat('%b', date) === 'Apr') {
                    return ' Q2';
                }
                if (Highcharts.dateFormat('%b', date) === 'Jul') {
                    return ' Q3';
                }
                if (Highcharts.dateFormat('%b', date) === 'Oct') {
                    return ' Q4';
                }
            }
            if (frequency === 'M' || frequency === 'S') {
                return ' ' + Highcharts.dateFormat('%b', date);
            }
        };
        var filterFrequency = function (chartSeries, freq) {
            return chartSeries.filter(function (series) { return series.userOptions.frequency === freq && series.name !== 'Navigator 1'; });
        };
        var getSeriesColor = function (seriesIndex) {
            // Get color of the line for a series
            // Use color for tooltip label
            var lineColor = $('.highcharts-markers.highcharts-color-' + seriesIndex + ' path').css('fill');
            var seriesColor = '<span style="fill:' + lineColor + '">\u25CF</span> ';
            return seriesColor;
        };
        var formatObsValue = function (value, decimals) {
            // Round observation to specified decimal place
            var displayValue = Highcharts.numberFormat(value, decimals);
            var formattedValue = displayValue === '-0.00' ? '0.00' : displayValue;
            return formattedValue;
        };
        var formatSeriesLabel = function (name, units, geo, colorIndex, point, seriesValue, date, pointX, s) {
            var seriesColor = getSeriesColor(colorIndex);
            var displayName = name ? point.userOptions.displayName : '';
            var value = formatObsValue(seriesValue, point.userOptions.decimals);
            var unitsLabel = units ? ' (' + point.userOptions.unitsLabelShort + ') <br>' : '<br>';
            var geoLabel = geo ? point.userOptions.geography + '<br>' : '<br>';
            var seasonal = point.userOptions.seasonallyAdjusted ? 'Seasonally Adjusted <br>' : '<br>';
            var label = displayName + ' ' + date + ': ' + value + unitsLabel;
            var pseudoZones = point.userOptions.pseudoZones;
            if (pseudoZones.length) {
                pseudoZones.forEach(function (zone) {
                    if (pointX < zone.value) {
                        return s += seriesColor + 'Pseudo History ' + label + geoLabel;
                    }
                    if (pointX > zone.value) {
                        return s += seriesColor + label + geoLabel;
                    }
                });
            }
            if (!pseudoZones.length) {
                s += seriesColor + label + geoLabel + seasonal + '<br>';
            }
            return s;
        };
        var getAnnualObs = function (annualSeries, point, year) {
            var annualLabel = '', label = '';
            annualSeries.forEach(function (serie) {
                // Check if current point's year is available in the annual series' data
                var yearObs = serie.data.find(function (obs) { return Highcharts.dateFormat('%Y', obs.x) === Highcharts.dateFormat('%Y', point.x); });
                if (yearObs) {
                    label += formatSeriesLabel(name, units, geo, serie.colorIndex, serie, yearObs.y, year, yearObs.x, annualLabel);
                }
            });
            // Return string of annual series with their values formatted for the tooltip
            return label;
        };
        var getQuarterObs = function (quarterSeries, date, pointQuarter) {
            var quarterLabel = '', label = '';
            quarterSeries.forEach(function (serie) {
                // Check if current point's year and quarter month (i.e., Jan for Q1) is available in the quarterly series' data
                var obsDate = serie.data.find(function (obs) { return (Highcharts.dateFormat('%Y', obs.x) + ' ' + Highcharts.dateFormat('%b', obs.x)) === date; });
                if (obsDate) {
                    label += formatSeriesLabel(name, units, geo, serie.colorIndex, serie, obsDate.y, Highcharts.dateFormat('%Y', obsDate.x) + ' ' + pointQuarter, obsDate.x, quarterLabel);
                }
            });
            // Return string of quarterly series with their values formatted for the tooltip
            return label;
        };
        var s = '', tooltip = '';
        var chartSeries = args.chart.series;
        // Series in chart with an annual frequency
        var annualSeries = filterFrequency(chartSeries, 'A');
        // Series in chart with a quarterly frequency
        var quarterSeries = filterFrequency(chartSeries, 'Q');
        // Series in chart with a monthly frequency
        var monthSeries = filterFrequency(chartSeries, 'M');
        // Points in the shared tooltip
        points.forEach(function (point, index) {
            if (annualSeries && Highcharts.dateFormat('%b', point.x) !== 'Jan' && index === 0) {
                var year = Highcharts.dateFormat('%Y', point.x);
                // Add annual observations when other frequencies are selected
                tooltip += getAnnualObs(annualSeries, point, year);
            }
            if (quarterSeries && monthSeries) {
                if (Highcharts.dateFormat('%b', point.x) !== 'Jan' && Highcharts.dateFormat('%b', point.x) !== 'Apr' && Highcharts.dateFormat('%b', point.x) !== 'Jul' && Highcharts.dateFormat('%b', point.x) !== 'Oct') {
                    var quarters = { Q1: 'Jan', Q2: 'Apr', Q3: 'Jul', Q4: 'Oct' };
                    var months = { Feb: 'Q1', Mar: 'Q1', May: 'Q2', Jun: 'Q2', Aug: 'Q3', Sep: 'Q3', Nov: 'Q4', Dec: 'Q4' };
                    // Month of hovered point
                    var pointMonth = Highcharts.dateFormat('%b', point.x);
                    // Quarter that hovered point falls into 
                    var pointQuarter = months[pointMonth];
                    // Month for which there is quarterly data
                    var quarterMonth = quarters[pointQuarter];
                    var date = Highcharts.dateFormat('%Y', point.x) + ' ' + quarterMonth;
                    // Add quarterly observations when monthly series are selected
                    tooltip += getQuarterObs(quarterSeries, date, pointQuarter);
                }
            }
            var dateLabel = Highcharts.dateFormat('%Y', x) + getFreqLabel(point.series.userOptions.frequency, point.x);
            tooltip += formatSeriesLabel(name, units, geo, point.colorIndex, point.series, point.y, dateLabel, point.x, s);
        });
        return tooltip;
    };
    AnalyzerHighstockComponent.prototype.reformatTooltip = function (chart, tooltipFormatter) {
        var name = this.nameChecked;
        var units = this.unitsChecked;
        var geo = this.geoChecked;
        chart.tooltip.options.formatter = function (args) {
            return tooltipFormatter(args, this.points, this.x, name, units, geo);
        };
    };
    AnalyzerHighstockComponent.prototype.nameActive = function (e, chart, tooltipFormatter) {
        this.nameChecked = e.target.checked;
        return this.reformatTooltip(chart, tooltipFormatter);
    };
    AnalyzerHighstockComponent.prototype.unitsActive = function (e, chart, tooltipFormatter) {
        this.unitsChecked = e.target.checked;
        return this.reformatTooltip(chart, tooltipFormatter);
    };
    AnalyzerHighstockComponent.prototype.geoActive = function (e, chart, tooltipFormatter) {
        this.geoChecked = e.target.checked;
        return this.reformatTooltip(chart, tooltipFormatter);
    };
    AnalyzerHighstockComponent.prototype.setTableExtremes = function (e) {
        // Workaround based on https://github.com/gevgeny/angular2-highcharts/issues/158
        // Exporting calls load event and creates empty e.context object, emitting wrong values to series table
        var extremes = this.getChartExtremes(e);
        if (extremes) {
            this.tableExtremes.emit({ minDate: extremes.min, maxDate: extremes.max });
        }
    };
    AnalyzerHighstockComponent.prototype.getChartExtremes = function (chartObject) {
        // Gets range of x values to emit
        // Used to redraw table in the single series view
        var xMin = null, xMax = null;
        // Selected level data
        var selectedRange = null;
        if (chartObject && chartObject.series) {
            var series_1, seriesLength_1 = 0;
            var nav = chartObject.series.find(function (serie) { return serie.name === 'Navigator'; });
            chartObject.series.forEach(function (serie) {
                if (!series_1 || seriesLength_1 < serie.points.length) {
                    seriesLength_1 = serie.points.length;
                    series_1 = serie;
                }
            });
            selectedRange = nav ? nav.points : series_1.points;
        }
        if (!selectedRange) {
            return { min: null, max: null };
        }
        if (selectedRange) {
            xMin = new Date(selectedRange[0].x).toISOString().split('T')[0];
            xMax = new Date(selectedRange[selectedRange.length - 1].x).toISOString().split('T')[0];
            return { min: xMin, max: xMax };
        }
    };
    AnalyzerHighstockComponent.prototype.updateExtremes = function (e) {
        e.context._hasSetExtremes = true;
        e.context._extremes = this.getChartExtremes(e.context);
        this.setTableExtremes(e.context);
    };
    return AnalyzerHighstockComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AnalyzerHighstockComponent.prototype, "series", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AnalyzerHighstockComponent.prototype, "allDates", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AnalyzerHighstockComponent.prototype, "portalSettings", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AnalyzerHighstockComponent.prototype, "alertMessage", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], AnalyzerHighstockComponent.prototype, "tableExtremes", void 0);
AnalyzerHighstockComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-analyzer-highstock',
        template: __webpack_require__("../../../../../src/app/analyzer-highstock/analyzer-highstock.component.html"),
        styles: [__webpack_require__("../../../../../src/app/analyzer-highstock/analyzer-highstock.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [])
], AnalyzerHighstockComponent);

//# sourceMappingURL=analyzer-highstock.component.js.map

/***/ }),

/***/ "../../../../../src/app/analyzer-table/analyzer-table.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <label *ngIf=\"portalSettings.transformations.yoy\" class=\"form-check-inline\">\n    <input type=\"checkbox\" (change)=\"yoyActive($event)\">Year/Year\n  </label>\n  <label *ngIf=\"portalSettings.transformations.ytd\" class=\"form-check-inline\">\n    <input type=\"checkbox\" (change)=\"ytdActive($event)\">Year-to-Date\n  </label>\n  <label *ngIf=\"portalSettings.transformations.c5ma\" class=\"form-check-inline\">\n      <input type=\"checkbox\" (change)=\"c5maActive($event)\">Annual Change\n  </label>\n</div>\n\n<div class=\"analyzer-table\">\n  <div class=\"table-row\">\n    <div class=\"table\" #tableScroll>\n      <table *ngIf=\"series && series.length\">\n        <tr>\n          <th class=\"empty-header\">&nbsp;</th>\n          <ng-template ngFor let-date [ngForOf]=\"tableDates\" let-i=\"index\">\n            <td><b>{{date.tableDate}}</b></td>\n          </ng-template>\n        </tr>\n        <ng-template ngFor let-serie [ngForOf]=\"series\" let-i=\"index\">\n          <tr>\n            <th title=\"{{serie.title}}\">\n              <i class=\"material-icons analyze-button remove-button\" title=\"Remove from Analyzer\" (click)=\"updateAnalyze(serie)\">&#xE872;</i>\n              <i class=\"material-icons analyze-chart color{{serie.id}}\" (click)=\"updateChart(serie)\">{{ serie.showInChart ? '&#xE834;' : '&#xE835;'}}</i>\n              <a [routerLink]=\"['/series']\" [queryParams]=\"{ id: serie.id, sa: serie.saParam }\" queryParamsHandling='merge' (click)=\"hideInfo(serie.id)\">\n                  {{serie.tablePrefix + serie.title + serie.tablePostfix + ' (' + serie.frequencyShort + ', ' + serie.geography.handle + ')'}}\n              </a>\n              <a tabindex=\"0\" id=\"{{serie.id}}\" class=\"info\" (click)=\"showPopover(serie)\" role=\"button\" data-animation='false' data-toggle=\"popover\">\n\t\t\t\t\t\t\t\t<i class=\"material-icons info-icon\">&#xE88F;</i>\n\t\t\t\t\t\t\t</a>\n            </th>\n            <ng-template ngFor let-item [ngForOf]=\"serie.analyzerTableDisplay\">\n              <td>{{item.formattedValue}}</td>\n            </ng-template>\n          </tr>\n          <tr *ngIf=\"yoyChecked\">\n            <th>\n              {{(serie.percent) ? '&emsp; YOY (ch.)' : '&emsp; YOY (%)'}}\n            </th>\n            <ng-template ngFor let-item [ngForOf]=\"serie.analyzerTableDisplay\">\n              <td>{{item.formattedYoy}}</td>\n            </ng-template>\n          </tr>\n          <tr *ngIf=\"c5maChecked\">\n            <th>\n              {{(serie.percent)? '&emsp; Annual (ch.)' : '&emsp; Annual (%)'}}\n            </th>\n            <ng-template ngFor let-item [ngForOf]=\"serie.analyzerTableDisplay\">\n              <td>{{item.formattedC5ma}}</td>\n            </ng-template>\n          </tr>\n          <tr *ngIf=\"ytdChecked\">\n            <th>\n              {{(serie.percent)? '&emsp; YTD (ch.)' : '&emsp; YTD (%)'}}\n            </th>\n            <ng-template ngFor let-item [ngForOf]=\"serie.analyzerTableDisplay\">\n              <td>{{item.formattedYtd}}</td>\n            </ng-template>\n          </tr>\n        </ng-template>\n      </table>\n    </div>\n  </div>\n</div>\n<div class=\"analyzer-summary-stats\">\n  <table>\n    <tr>\n      <th class=\"empty-header\">&nbsp;</th>\n      <th>Minimum Value</th>\n      <th>Maximum Value</th>\n      <th>% Change over Selected Range</th>\n      <th>Change over Selected Range</th>\n    </tr>\n    <ng-template ngFor let-serie [ngForOf]=\"series\">\n      <tr>\n        <td class=\"series-title\" title=\"{{serie.title}}\">\n          <i class=\"material-icons analyze-button remove-button\" title=\"Remove from Analyzer\" (click)=\"updateAnalyze(serie)\">&#xE872;</i>\n          <i class=\"material-icons analyze-chart color{{serie.id}}\" (click)=\"updateChart(serie)\">{{ serie.showInChart ? '&#xE834;' : '&#xE835;'}}</i>\n          <a [routerLink]=\"['/series']\" [queryParams]=\"{ id: serie.id, sa: serie.saParam }\" queryParamsHandling='merge'>\n            {{serie.tablePrefix + serie.title + serie.tablePostfix + ' (' + serie.frequencyShort + ', ' + serie.geography.handle + ')'}}\n          </a>\n        </td>\n        <td>{{serie.summaryStats.minValue + ' (' + serie.summaryStats.minValueDate + ')'}}</td>\n        <td>{{serie.summaryStats.maxValue + ' (' + serie.summaryStats.maxValueDate + ')'}}</td>\n        <td>{{!serie.percent ? serie.summaryStats.percChange : '&nbsp;'}}</td>\n        <td>{{serie.summaryStats.levelChange}}</td>\n      </tr>\n    </ng-template>\n  </table>\n</div>"

/***/ }),

/***/ "../../../../../src/app/analyzer-table/analyzer-table.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n/* Analyzer Chart */\n/* Loading Screen */\n.analyze-button {\n  color: #B5B5B5;\n  cursor: pointer;\n  vertical-align: middle;\n  font-size: 20px;\n  visibility: hidden; }\n\n.analyze-chart {\n  cursor: pointer;\n  vertical-align: middle;\n  font-size: 15px; }\n\n.analyzer-table {\n  vertical-align: top;\n  display: inline-block;\n  min-height: 100%;\n  overflow: auto;\n  overflow-y: hidden;\n  width: 100%;\n  position: relative;\n  margin-bottom: 40px; }\n  @media (min-width: 768px) {\n    .analyzer-table {\n      margin-top: 10px; } }\n  @media (max-width: 767px) {\n    .analyzer-table {\n      margin-top: 50px; } }\n  .analyzer-table .table-row {\n    position: relative; }\n    .analyzer-table .table-row .table {\n      overflow-x: scroll;\n      overflow-y: visible;\n      width: 68%;\n      margin-left: 32%;\n      margin-bottom: 0;\n      /* Add gradient to scrollable content, based on: http://www.the-haystack.com/2013/09/24/responsive-scrollable-tables/ */\n      background-image: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0)), linear-gradient(to left, #ffffff, rgba(255, 255, 255, 0)), linear-gradient(to right, #E4E4E4, rgba(195, 195, 197, 0)), linear-gradient(to left, #E4E4E4, rgba(195, 195, 197, 0));\n      background-position: 0 0, 100% 0, 0 0, 100% 0;\n      background-repeat: no-repeat;\n      background-color: white;\n      background-size: 4em 100%, 4em 100%, 1em 100%, 1em 100%;\n      background-attachment: local, local, scroll, scroll; }\n      .analyzer-table .table-row .table table {\n        table-layout: fixed;\n        width: 100%;\n        *margin-left: -32%; }\n        .analyzer-table .table-row .table table td, .analyzer-table .table-row .table table th {\n          vertical-align: top;\n          width: 125px;\n          text-align: right;\n          font-size: 0.8em;\n          padding: 0.4em;\n          border: 1px solid #E5E5E5; }\n          .analyzer-table .table-row .table table td:empty:after, .analyzer-table .table-row .table table th:empty:after {\n            content: \"\\A0\"; }\n        .analyzer-table .table-row .table table th {\n          position: absolute;\n          *position: relative;\n          left: 0;\n          width: 32%;\n          white-space: nowrap;\n          border-right: 1px solid #E5E5E5;\n          text-align: left;\n          text-overflow: ellipsis;\n          overflow: hidden;\n          font-size: 0.8em;\n          font-weight: normal;\n          border-bottom: 0; }\n          .analyzer-table .table-row .table table th a {\n            display: inline-block;\n            max-width: 80%;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            color: #505050;\n            vertical-align: top; }\n          .analyzer-table .table-row .table table th:hover .analyze-button {\n            visibility: visible; }\n        .analyzer-table .table-row .table table .empty-header {\n          border: none;\n          border-right: 1px solid #E5E5E5; }\n        .analyzer-table .table-row .table table .info-icon {\n          font-size: 1.2em;\n          vertical-align: middle; }\n        .analyzer-table .table-row .table table tr:last-child th {\n          border: 1px solid #E5E5E5; }\n        .analyzer-table .table-row .table table tr:nth-child(even) {\n          background-color: rgba(212, 212, 212, 0.2); }\n          .analyzer-table .table-row .table table tr:nth-child(even) td:first-child, .analyzer-table .table-row .table table tr:nth-child(even) th:first-child {\n            background: rgba(212, 212, 212, 0.2); }\n        .analyzer-table .table-row .table table .info {\n          cursor: pointer;\n          width: initial;\n          right: 5px;\n          position: absolute; }\n          .analyzer-table .table-row .table table .info:focus {\n            outline: 0; }\n\n.analyzer-summary-stats {\n  font-size: 0.8em;\n  text-align: right;\n  margin-bottom: 40px; }\n  .analyzer-summary-stats table {\n    width: 100%; }\n    .analyzer-summary-stats table th {\n      text-align: right;\n      color: #1D667F;\n      padding: 0.4em; }\n    .analyzer-summary-stats table tr .series-title {\n      text-align: left; }\n    .analyzer-summary-stats table tr td {\n      padding: 0.4em; }\n      .analyzer-summary-stats table tr td:hover .analyze-button {\n        visibility: visible; }\n      .analyzer-summary-stats table tr td a {\n        display: inline-block;\n        max-width: 80%;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        color: #505050;\n        vertical-align: top; }\n    .analyzer-summary-stats table tr:nth-child(even) {\n      background-color: rgba(212, 212, 212, 0.2); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/analyzer-table/analyzer-table.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyzerTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__analyzer_service__ = __webpack_require__("../../../../../src/app/analyzer.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__series_helper_service__ = __webpack_require__("../../../../../src/app/series-helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__table_helper_service__ = __webpack_require__("../../../../../src/app/table-helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_portal_settings_service__ = __webpack_require__("../../../../../src/app/data-portal-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
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






var AnalyzerTableComponent = (function () {
    function AnalyzerTableComponent(portal, _dataPortalSettings, _analyzer, _series, _table) {
        this.portal = portal;
        this._dataPortalSettings = _dataPortalSettings;
        this._analyzer = _analyzer;
        this._series = _series;
        this._table = _table;
        this.updateChartSeries = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.tableWidths = [];
    }
    AnalyzerTableComponent.prototype.ngOnInit = function () {
        this.portalSettings = this._dataPortalSettings.dataPortalSettings[this.portal];
    };
    AnalyzerTableComponent.prototype.ngOnChanges = function () {
        var _this = this;
        // Update table as minDate & maxDate change
        var tableEnd;
        for (var i = this.allTableDates.length - 1; i > 0; i--) {
            if (this.maxDate === this.allTableDates[i].date) {
                tableEnd = i;
                break;
            }
        }
        var tableStart = this.allTableDates.findIndex(function (item) { return item.date === _this.minDate; });
        // Display values in the range of dates selected
        this.series.forEach(function (series) {
            series.analyzerTableDisplay = series.analyzerTableData.slice(tableStart, tableEnd + 1);
            var seriesFreq = { freq: series.frequencyShort, label: series.frequency };
            series.summaryStats = _this._series.summaryStats(series.analyzerTableDisplay, seriesFreq, series.decimals, _this.minDate, _this.maxDate);
            var seriesInChart = $('.highcharts-series.' + series.id);
            if (seriesInChart) {
                // Match color of show_chart icon for a series with its respective color in the graph
                $('.color' + series.id).css('color', seriesInChart.css('stroke'));
            }
            if (!seriesInChart.length) {
                // If series is not selected for the chart, reset color of show_chart icon
                $('.color' + series.id).css('color', '#000');
            }
        });
        this.tableDates = this.allTableDates.slice(tableStart, tableEnd + 1);
    };
    AnalyzerTableComponent.prototype.ngAfterViewChecked = function () {
        // Check height of content and scroll tables to the right
        // If true, height is changing, i.e. content still loading
        var container = this._table.checkContainerHeight(this.previousHeight);
        this.previousHeight = container.previousHeight;
        if (container.scroll) {
            // On load, table scrollbars should start at the right -- showing most recent data
            return this._table.tableScroll(this.tableEl);
        }
        // Scroll tables to the right when table widths changes, i.e. changing frequency from A to Q | M
        return this._table.checkTableWidth(this.tableWidths);
    };
    AnalyzerTableComponent.prototype.showPopover = function (seriesInfo) {
        return this._table.showPopover(seriesInfo);
    };
    AnalyzerTableComponent.prototype.hideInfo = function (seriesId) {
        return this._table.hideInfo(seriesId);
    };
    AnalyzerTableComponent.prototype.yoyActive = function (e) {
        this.yoyChecked = e.target.checked;
    };
    AnalyzerTableComponent.prototype.ytdActive = function (e) {
        this.ytdChecked = e.target.checked;
    };
    AnalyzerTableComponent.prototype.c5maActive = function (e) {
        this.c5maChecked = e.target.checked;
    };
    AnalyzerTableComponent.prototype.updateAnalyze = function (series) {
        this._analyzer.updateAnalyzer(series);
        this.updateChartSeries.emit(series);
    };
    AnalyzerTableComponent.prototype.updateChart = function (series) {
        this.updateChartSeries.emit(series);
    };
    return AnalyzerTableComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('tableScroll'),
    __metadata("design:type", Object)
], AnalyzerTableComponent.prototype, "tableEl", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AnalyzerTableComponent.prototype, "series", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AnalyzerTableComponent.prototype, "minDate", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AnalyzerTableComponent.prototype, "maxDate", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AnalyzerTableComponent.prototype, "allTableDates", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AnalyzerTableComponent.prototype, "chartSeries", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], AnalyzerTableComponent.prototype, "updateChartSeries", void 0);
AnalyzerTableComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-analyzer-table',
        template: __webpack_require__("../../../../../src/app/analyzer-table/analyzer-table.component.html"),
        styles: [__webpack_require__("../../../../../src/app/analyzer-table/analyzer-table.component.scss")]
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('portal')),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__data_portal_settings_service__["a" /* DataPortalSettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__data_portal_settings_service__["a" /* DataPortalSettingsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__analyzer_service__["a" /* AnalyzerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__analyzer_service__["a" /* AnalyzerService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__series_helper_service__["a" /* SeriesHelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__series_helper_service__["a" /* SeriesHelperService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__table_helper_service__["a" /* TableHelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__table_helper_service__["a" /* TableHelperService */]) === "function" && _d || Object])
], AnalyzerTableComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=analyzer-table.component.js.map

/***/ }),

/***/ "../../../../../src/app/analyzer.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyzerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AnalyzerService = (function () {
    function AnalyzerService() {
        this.analyzerSeries = [];
    }
    AnalyzerService.prototype.checkAnalyzer = function (seriesInfo) {
        var analyzeSeries = this.analyzerSeries.find(function (series) { return series.id === seriesInfo.id; });
        return analyzeSeries ? true : false;
    };
    AnalyzerService.prototype.updateAnalyzer = function (seriesInfo, tableData, chartData) {
        if (seriesInfo.analyze) {
            var analyzeSeries = this.analyzerSeries.find(function (series) { return series.id === seriesInfo.id; });
            var seriesIndex = this.analyzerSeries.indexOf(analyzeSeries);
            if (seriesIndex > -1) {
                this.analyzerSeries.splice(seriesIndex, 1);
            }
            seriesInfo.analyze = false;
            return;
        }
        if (!seriesInfo.analyze) {
            seriesInfo.tableData = tableData;
            seriesInfo.chartData = chartData;
            this.analyzerSeries.push(seriesInfo);
            seriesInfo.analyze = true;
        }
    };
    AnalyzerService.prototype.createAnalyzerDates = function (dateStart, dateEnd, frequencies, dateArray) {
        var startYear = +dateStart.substr(0, 4);
        var endYear = +dateEnd.substr(0, 4);
        var startMonth = +dateStart.substr(5, 2);
        var endMonth = +dateEnd.substr(5, 2);
        var m = { 1: '01', 2: '02', 3: '03', 4: '04', 5: '05', 6: '06', 7: '07', 8: '08', 9: '09', 10: '10', 11: '11', 12: '12' };
        var q = { 1: 'Q1', 4: 'Q2', 7: 'Q3', 10: 'Q4' };
        // Annual frequency
        var aSelected = frequencies.indexOf(frequencies.find(function (freq) { return freq.freq === 'A'; })) > -1;
        // Quarterly frequency
        var qSelected = frequencies.indexOf(frequencies.find(function (freq) { return freq.freq === 'Q'; })) > -1;
        // Semi-annual frequency
        var sSelected = frequencies.indexOf(frequencies.find(function (freq) { return freq.freq === 'S'; })) > -1;
        // Monthly frequency
        var mSelected = frequencies.indexOf(frequencies.find(function (freq) { return freq.freq === 'M'; })) > -1;
        while (startYear + '-' + m[startMonth] + '-01' <= endYear + '-' + m[endMonth] + '-01') {
            if (mSelected) {
                dateArray.push({ date: startYear.toString() + '-' + m[startMonth] + '-01', tableDate: startYear.toString() + '-' + m[startMonth] });
            }
            // If series with a semi-annual frequency have been selected but not monthly, add months '01' & '07' to the date array
            if (sSelected && !mSelected && (startMonth === 1 || startMonth === 7)) {
                dateArray.push({ date: startYear.toString() + '-' + m[startMonth] + '-01', tableDate: startYear.toString() + '-' + m[startMonth] });
            }
            if (qSelected) {
                var addQuarter = this.addQuarterObs(startMonth, mSelected);
                if (addQuarter) {
                    dateArray.push({ date: startYear.toString() + '-' + m[addQuarter] + '-01', tableDate: startYear.toString() + ' ' + q[addQuarter] });
                }
            }
            if (aSelected) {
                var addAnnual = this.addAnnualObs(startMonth, mSelected, qSelected);
                if (addAnnual) {
                    dateArray.push({ date: startYear.toString() + '-01-01', tableDate: startYear.toString() });
                }
            }
            startYear = startMonth === 12 ? startYear += 1 : startYear;
            startMonth = startMonth === 12 ? 1 : startMonth += 1;
        }
        return dateArray;
    };
    AnalyzerService.prototype.addQuarterObs = function (startMonth, monthSelected) {
        // If a monthly series is not selected, add Q at months 1, 4, 7, 10 (i.e. startMonth === 1, 4, 7, 10)
        // If a monthly series is selected, add Q after months 3, 6, 9, 12 (i.e. startMonth === 3, 6, 9, 12)
        var qMonth = monthSelected ? startMonth - 2 : startMonth;
        var addQ = monthSelected ? this.checkStartMonth(startMonth) : this.checkStartMonth(startMonth + 2);
        return addQ ? qMonth : null;
    };
    AnalyzerService.prototype.addAnnualObs = function (startMonth, monthSelected, quarterSelected) {
        // If a monthly series is selected, add annual date after month 12
        if (monthSelected && startMonth === 12) {
            return true;
        }
        // If a quarterly series is selected (w/o monthly), add annueal date after 4th quarter
        if (quarterSelected && !monthSelected && startMonth === 10) {
            return true;
        }
        // If only annual is selected, add to date array
        if (!quarterSelected && !monthSelected && startMonth === 1) {
            return true;
        }
        return false;
    };
    AnalyzerService.prototype.checkStartMonth = function (month) {
        if (month === 3 || month === 6 || month === 9 || month === 12) {
            return true;
        }
        return false;
    };
    return AnalyzerService;
}());
AnalyzerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], AnalyzerService);

//# sourceMappingURL=analyzer.service.js.map

/***/ }),

/***/ "../../../../../src/app/analyzer/analyzer.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"analyzer-view col-xs-12 col-xl-11\">\n  <h3>Analyzer</h3>\n  <app-analyzer-highstock *ngIf=\"analyzerSeries.length\" [portalSettings]=\"portalSettings\" [alertMessage]=\"alertMessage\" [allDates]=\"analyzerTableDates\" [series]=\"analyzerChartSeries\"  (tableExtremes)=\"setTableDates($event)\"></app-analyzer-highstock>\n  <app-analyzer-table *ngIf=\"analyzerSeries.length\" [minDate]=\"minDate\" [maxDate]=\"maxDate\" [chartSeries]=\"analyzerChartSeries\" [series]=\"analyzerSeries\" [allTableDates]=\"analyzerTableDates\" (updateChartSeries)=\"updateAnalyzerChart($event, analyzerChartSeries)\"></app-analyzer-table>\n</div>"

/***/ }),

/***/ "../../../../../src/app/analyzer/analyzer.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n/* Analyzer Chart */\n/* Loading Screen */\nh3 {\n  color: #1D667F; }\n\n.chart-warning {\n  display: inline-block;\n  margin-left: 5px; }\n  .chart-warning p {\n    font-size: 0.85em;\n    background-color: transparent;\n    border-color: transparent; }\n    .chart-warning p .warning-icon {\n      font-size: 18px;\n      vertical-align: middle; }\n\n@media (min-width: 768px) {\n  .analyzer-view {\n    margin-top: 70px; } }\n\n@media (max-width: 767px) {\n  .analyzer-view {\n    margin-top: 50px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/analyzer/analyzer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyzerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__analyzer_service__ = __webpack_require__("../../../../../src/app/analyzer.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper_service__ = __webpack_require__("../../../../../src/app/helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_portal_settings_service__ = __webpack_require__("../../../../../src/app/data-portal-settings.service.ts");
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




var AnalyzerComponent = (function () {
    function AnalyzerComponent(portal, _analyzer, _dataPortalSettings, _helper) {
        this.portal = portal;
        this._analyzer = _analyzer;
        this._dataPortalSettings = _dataPortalSettings;
        this._helper = _helper;
        this.alertMessage = '';
    }
    AnalyzerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.portalSettings = this._dataPortalSettings.dataPortalSettings[this.portal];
        this.analyzerSeries = this._analyzer.analyzerSeries;
        // this.analyzerChartSeries = this._analyzer.analyzerSeries.analyzerChart;
        if (this.analyzerSeries.length) {
            this.analyzerTableDates = this.setAnalyzerDates(this.analyzerSeries);
            this.analyzerSeries.forEach(function (series) {
                // Array of observations using full range of dates
                series.analyzerTableData = _this._helper.seriesTable(series.tableData, _this.analyzerTableDates, series.decimals);
            });
            this.analyzerChartSeries = this.analyzerSeries.filter(function (series) { return series.showInChart === true; });
            if (!this.analyzerChartSeries.length) {
                // The default series displayed in the chart on load should be the series with the longest range of data
                var longestSeries = this.findLongestSeries(this.analyzerSeries);
                longestSeries.showInChart = true;
                this.analyzerChartSeries = this.analyzerSeries.filter(function (series) { return series.showInChart === true; });
            }
        }
    };
    AnalyzerComponent.prototype.setAnalyzerDates = function (analyzerSeries) {
        var _this = this;
        var frequencies = [];
        var dateWrapper = { firstDate: '', endDate: '' };
        analyzerSeries.forEach(function (series) {
            var freqExist = frequencies.find(function (freq) { return freq.freq === series.frequencyShort; });
            if (!freqExist) {
                frequencies.push({ freq: series.frequencyShort, label: series.frequency });
            }
            // Get earliest start date and latest end date
            _this.setDateWrapper(dateWrapper, series.seriesObservations.observationStart, series.seriesObservations.observationEnd);
        });
        // Array of full range of dates for series selected in analyzer
        return this._analyzer.createAnalyzerDates(dateWrapper.firstDate, dateWrapper.endDate, frequencies, []);
    };
    AnalyzerComponent.prototype.findLongestSeries = function (series) {
        var longestSeries, seriesLength = 0;
        series.forEach(function (serie) {
            if (!longestSeries || seriesLength < serie.chartData.level.length) {
                seriesLength = serie.chartData.level.length;
                longestSeries = serie;
            }
        });
        return longestSeries;
    };
    AnalyzerComponent.prototype.setDateWrapper = function (dateWrapper, seriesStart, seriesEnd) {
        if (dateWrapper.firstDate === '' || seriesStart < dateWrapper.firstDate) {
            dateWrapper.firstDate = seriesStart;
        }
        if (dateWrapper.endDate === '' || seriesEnd > dateWrapper.endDate) {
            dateWrapper.endDate = seriesEnd;
        }
    };
    AnalyzerComponent.prototype.updateAnalyzerChart = function (event, chartSeries) {
        var _this = this;
        // Check if series is in the chart
        var seriesExist = chartSeries.find(function (cSeries) { return cSeries.id === event.id; });
        // At least one series must be selected
        if (chartSeries.length === 1 && seriesExist) {
            this.alertUser = true;
            this.alertMessage = 'At least one series must be selected.';
            return;
        }
        // Allow up to 2 different units to be displayed in chart
        var toggleChartDisplay = this.checkSeriesUnits(chartSeries, event);
        if (toggleChartDisplay) {
            this.alertUser = false;
            this.alertMessage = '';
            event.showInChart = !event.showInChart;
        }
        // Update table dates when removing series from analyzer
        this.analyzerSeries = this._analyzer.analyzerSeries;
        this.analyzerTableDates = this.setAnalyzerDates(this.analyzerSeries);
        this.analyzerSeries.forEach(function (series) {
            series.analyzerTableData = _this._helper.seriesTable(series.tableData, _this.analyzerTableDates, series.decimals);
        });
        this.analyzerChartSeries = this.analyzerSeries.filter(function (series) { return series.showInChart === true; });
    };
    AnalyzerComponent.prototype.checkSeriesUnits = function (chartSeries, currentSeries) {
        // List of units for series in analyzer chart
        var allUnits = chartSeries.map(function (series) { return series.unitsLabelShort; });
        var uniqueUnits = allUnits.filter(function (unit, index, units) { return units.indexOf(unit) === index; });
        if (uniqueUnits.length === 2) {
            // If two different units are already in use, check if the current series unit is in the list
            var unitsExist = chartSeries.find(function (cSeries) { return cSeries.unitsLabelShort === currentSeries.unitsLabelShort; });
            this.alertUser = unitsExist ? false : true;
            this.alertMessage = unitsExist ? '' : 'Chart may only display up to two different units.';
            return unitsExist ? true : false;
        }
        return uniqueUnits.length < 2 ? true : false;
    };
    // Update table when selecting new ranges in the chart
    AnalyzerComponent.prototype.setTableDates = function (e) {
        this.minDate = e.minDate;
        this.maxDate = e.maxDate;
    };
    return AnalyzerComponent;
}());
AnalyzerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-analyzer',
        template: __webpack_require__("../../../../../src/app/analyzer/analyzer.component.html"),
        styles: [__webpack_require__("../../../../../src/app/analyzer/analyzer.component.scss")]
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('portal')),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__analyzer_service__["a" /* AnalyzerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__analyzer_service__["a" /* AnalyzerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__data_portal_settings_service__["a" /* DataPortalSettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__data_portal_settings_service__["a" /* DataPortalSettingsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__helper_service__["a" /* HelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__helper_service__["a" /* HelperService */]) === "function" && _c || Object])
], AnalyzerComponent);

var _a, _b, _c;
//# sourceMappingURL=analyzer.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"wrapper\">\n    <app-header></app-header>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-xs-1 col-md-4 col-lg-3 col-xl-2 sidebar-container\">\n                <div class=\"sidebar-col\">\n                    <app-sidebar-nav></app-sidebar-nav>\n                </div>\n            </div>\n            <div class=\"col-xs-12 col-md-8 col-lg-9 col-xl-10 content-col\">\n                <div class=\"alert alert-info alert-dismissible fade show browser\" role=\"alert\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n                        <span aria-hidden=\"true\">&times;</span>\n                    </button>\n                    This site works best on <a class=\"alert-link\" href=\"https://www.google.com/chrome/\" target=\"_blank\">Google Chrome</a>.\n                </div>\n                <router-outlet></router-outlet>\n                <app-feedback></app-feedback>\n            </div>\n        </div>\n    </div>\n</div>"

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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
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
    function AppComponent(titleService, _router) {
        this.titleService = titleService;
        this._router = _router;
        // Set title
        this.titleService.setTitle('Dataportal');
        // Set favicon
        $('#favicon').attr('href', 'manoa.jpg');
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
            setTimeout(function () {
                $(".browser").hide();
            }, 5000);
        }
        else {
            $('.browser').hide();
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["Title"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["Title"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export highchartsFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__data_portal_settings_service__ = __webpack_require__("../../../../../src/app/data-portal-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__series_helper_service__ = __webpack_require__("../../../../../src/app/series-helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__helper_service__ = __webpack_require__("../../../../../src/app/helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__google_analytics_events_service__ = __webpack_require__("../../../../../src/app/google-analytics-events.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__help_service__ = __webpack_require__("../../../../../src/app/help.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__analyzer_service__ = __webpack_require__("../../../../../src/app/analyzer.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__table_helper_service__ = __webpack_require__("../../../../../src/app/table-helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__landing_page_landing_page_component__ = __webpack_require__("../../../../../src/app/landing-page/landing-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__uhero_help_uhero_help_component__ = __webpack_require__("../../../../../src/app/uhero-help/uhero-help.component.ts");
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
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_18__landing_page_landing_page_component__["a" /* LandingPageComponent */],
            __WEBPACK_IMPORTED_MODULE_19__uhero_help_uhero_help_component__["a" /* UheroHelpComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__["a" /* Shared */],
            __WEBPACK_IMPORTED_MODULE_7__app_routes__["a" /* routing */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_4_angular2_highcharts__["ChartModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_19__uhero_help_uhero_help_component__["a" /* UheroHelpComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_9__uhero_api_service__["a" /* UheroApiService */],
            __WEBPACK_IMPORTED_MODULE_11__data_portal_settings_service__["a" /* DataPortalSettingsService */],
            __WEBPACK_IMPORTED_MODULE_10__category_helper_service__["a" /* CategoryHelperService */],
            __WEBPACK_IMPORTED_MODULE_12__series_helper_service__["a" /* SeriesHelperService */],
            __WEBPACK_IMPORTED_MODULE_13__helper_service__["a" /* HelperService */],
            __WEBPACK_IMPORTED_MODULE_15__help_service__["a" /* HelpService */],
            __WEBPACK_IMPORTED_MODULE_17__table_helper_service__["a" /* TableHelperService */],
            __WEBPACK_IMPORTED_MODULE_14__google_analytics_events_service__["a" /* GoogleAnalyticsEventsService */],
            __WEBPACK_IMPORTED_MODULE_16__analyzer_service__["a" /* AnalyzerService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["Title"],
            {
                provide: __WEBPACK_IMPORTED_MODULE_5_angular2_highcharts_dist_HighchartsService__["HighchartsStatic"],
                useFactory: highchartsFactory
            },
            {
                provide: 'rootCategory',
                useValue: 59
            },
            {
                provide: 'defaultCategory',
                useValue: 42
            },
            {
                provide: 'logo',
                useValue: '../../assets/UHEROdata-Logo-color.svg'
            },
            {
                provide: 'defaultRange',
                useValue: { start: '2007', end: '2017', range: 10 }
            },
            {
                provide: 'portal',
                useValue: 'uhero'
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__landing_page_landing_page_component__ = __webpack_require__("../../../../../src/app/landing-page/landing-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__single_series_single_series_component__ = __webpack_require__("../../../../../src/app/single-series/single-series.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__analyzer_analyzer_component__ = __webpack_require__("../../../../../src/app/analyzer/analyzer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__help_help_component__ = __webpack_require__("../../../../../src/app/help/help.component.ts");





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
    },
    {
        path: 'analyzer',
        component: __WEBPACK_IMPORTED_MODULE_3__analyzer_analyzer_component__["a" /* AnalyzerComponent */]
    },
    {
        path: 'help',
        component: __WEBPACK_IMPORTED_MODULE_4__help_help_component__["a" /* HelpComponent */]
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["RouterModule"].forRoot(routes, { useHash: true });
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ "../../../../../src/app/category-charts/category-charts.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"multi-charts-row\" *ngIf=\"!data\">\n\t<p *ngIf=\"noSeries\" class=\"no-data\">No Data Available</p>\n</div>\n<div class=\"multi-charts-row\" *ngIf=\"data\">\n\t<p *ngIf=\"noSeries\" class=\"no-data\">No Data Available</p>\n\t<ng-template ngFor let-serie [ngForOf]=\"data\">\n\t\t<div *ngIf=\"!noSeries\" class=\"multi-charts\">\n\t\t\t<a href=\"#\" [routerLink]=\"['/series']\" [queryParams]=\"{id: serie.seriesInfo.id, sa: serie.seriesInfo.saParam}\" queryParamsHandling='merge' *ngIf=\"serie.seriesInfo.id\" (click)=\"submitGAEvent(serie.seriesInfo.id)\">\n\t\t\t\t<app-highchart [minValue]=\"sublist.minValue\" [maxValue]=\"sublist.maxValue\" [portalSettings]=\"portalSettings\" [chartStart]=\"chartStart\" [chartEnd]=\"chartEnd\" [seriesData]=\"serie\" [currentFreq]=\"freq\"></app-highchart>\n\t\t\t</a>\n\t\t\t<i [class.add-button]=\"!serie.seriesInfo.analyze\" [class.remove-button]=\"serie.seriesInfo.analyze\" class=\"material-icons analyze-button remove-button\" (click)=\"updateAnalyze(serie.seriesInfo, serie.tableData, serie.chartData)\">&#xE838;</i>\n\t\t</div>\n\t</ng-template>\n</div>"

/***/ }),

/***/ "../../../../../src/app/category-charts/category-charts.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n/* Analyzer Chart */\n/* Loading Screen */\n.multi-charts-row {\n  display: block;\n  margin-bottom: 40px; }\n\n.no-data {\n  margin-top: 10px;\n  font-size: 0.9em; }\n\n.multi-charts {\n  display: inline-block;\n  padding: 0 3px;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n  -moz-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n  -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n  margin: 10px 10px 10px 3px;\n  background: #FAFAFB;\n  max-height: 206px; }\n  .multi-charts a {\n    color: #000; }\n  .multi-charts a:hover {\n    text-decoration: none; }\n  .multi-charts .analyze-button {\n    color: rgba(240, 240, 240, 0.65);\n    cursor: pointer;\n    position: relative;\n    top: -25px;\n    vertical-align: middle;\n    left: 10px;\n    font-size: 1em; }\n  .multi-charts .add-button {\n    text-shadow: 1px 2px 6px #FAFAFB, 0 0 0 #000, 1px 2px 6px #FAFAFB; }\n    .multi-charts .add-button:hover::after {\n      color: #9E9E9E;\n      content: ' Add to Analyzer';\n      vertical-align: text-bottom;\n      font-weight: bold;\n      font-size: 0.8em;\n      font-family: 'Lucida Sans', sans-serif;\n      text-shadow: none; }\n  .multi-charts .remove-button {\n    color: #F6A01B; }\n    .multi-charts .remove-button:hover::after {\n      color: #9E9E9E;\n      content: ' Remove from Analyzer';\n      vertical-align: text-bottom;\n      font-weight: bold;\n      font-size: 0.8em;\n      font-family: 'Lucida Sans', sans-serif;\n      text-shadow: none; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/category-charts/category-charts.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryChartsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__analyzer_service__ = __webpack_require__("../../../../../src/app/analyzer.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_analytics_events_service__ = __webpack_require__("../../../../../src/app/google-analytics-events.service.ts");
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



var CategoryChartsComponent = (function () {
    function CategoryChartsComponent(defaultRange, googleAES, _analyzer) {
        this.defaultRange = defaultRange;
        this.googleAES = googleAES;
        this._analyzer = _analyzer;
    }
    CategoryChartsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.forEach(function (chartSeries) {
            if (chartSeries.seriesInfo !== 'No data available') {
                chartSeries.seriesInfo.analyze = _this._analyzer.checkAnalyzer(chartSeries.seriesInfo);
            }
        });
    };
    CategoryChartsComponent.prototype.ngOnChanges = function () {
        // If setYAxes, chart view should display all charts' (level) yAxis with the same range
        // Allow y-axes to vary for search results
        if (this.portalSettings.highcharts.setYAxes && !this.search) {
            var start = this.chartStart ? this.chartStart : Date.parse(this.defaultRange.start);
            var end = this.chartEnd ? this.chartEnd : Date.parse(this.defaultRange.end);
            if (this.sublist) {
                // Find minimum and maximum values out of all series within a sublist; Use values to set min/max of yAxis
                this.sublist.minValue = this.findMin(this.sublist, start, end);
                this.sublist.maxValue = this.findMax(this.sublist, start, end);
            }
        }
    };
    CategoryChartsComponent.prototype.findMin = function (sublist, start, end) {
        var _this = this;
        var minValue = null;
        sublist.displaySeries.forEach(function (serie) {
            var values = _this.getSeriesValues(serie, start, end);
            var min = values.reduce(function (a, b) {
                return Math.min(a, b);
            });
            if (minValue === null || min < minValue) {
                minValue = min;
            }
        });
        return minValue;
    };
    CategoryChartsComponent.prototype.findMax = function (sublist, start, end) {
        var _this = this;
        var maxValue = null;
        sublist.displaySeries.forEach(function (serie) {
            var values = _this.getSeriesValues(serie, start, end);
            var max = values.reduce(function (a, b) {
                return Math.max(a, b);
            });
            if (maxValue === null || max > maxValue) {
                maxValue = max;
            }
        });
        return maxValue;
    };
    CategoryChartsComponent.prototype.getSeriesValues = function (series, start, end) {
        var startValue = series.categoryChart.chartData.level.findIndex(function (observation) { return observation[0] === start; });
        var endValue = series.categoryChart.chartData.level.findIndex(function (observation) { return observation[0] === end; });
        var trimmedData = series.categoryChart.chartData.level.slice(startValue, endValue + 1);
        var values = trimmedData.map(function (observation) { return observation[1]; });
        return values;
    };
    // Google Analytics: Track clicking on series
    CategoryChartsComponent.prototype.submitGAEvent = function (seriesId) {
        var id = seriesId.toString();
        this.googleAES.emitEvent('series', 'click', id);
    };
    CategoryChartsComponent.prototype.updateAnalyze = function (seriesInfo, tableData, chartData) {
        this._analyzer.updateAnalyzer(seriesInfo, tableData, chartData);
    };
    return CategoryChartsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "portalSettings", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "sublist", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "data", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "freq", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "noSeries", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "nsaActive", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "yoyActive", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "ytdActive", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "params", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "chartStart", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "chartEnd", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryChartsComponent.prototype, "search", void 0);
CategoryChartsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-category-charts',
        template: __webpack_require__("../../../../../src/app/category-charts/category-charts.component.html"),
        styles: [__webpack_require__("../../../../../src/app/category-charts/category-charts.component.scss")]
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('defaultRange')),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__google_analytics_events_service__["a" /* GoogleAnalyticsEventsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__google_analytics_events_service__["a" /* GoogleAnalyticsEventsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__analyzer_service__["a" /* AnalyzerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__analyzer_service__["a" /* AnalyzerService */]) === "function" && _b || Object])
], CategoryChartsComponent);

var _a, _b;
//# sourceMappingURL=category-charts.component.js.map

/***/ }),

/***/ "../../../../../src/app/category-datatables/category-datatables.component.html":
/***/ (function(module, exports) {

module.exports = "<table [id]=\"'indicator-table-' + tableId\" width=\"100%\">\n</table>\n"

/***/ }),

/***/ "../../../../../src/app/category-datatables/category-datatables.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n/* Analyzer Chart */\n/* Loading Screen */\n.dataTables_wrapper {\n  display: inline-block; }\n  .dataTables_wrapper .buttons-csv {\n    color: #1D667F;\n    text-decoration: none;\n    font-size: 0.85em; }\n    .dataTables_wrapper .buttons-csv .material-icons {\n      font-size: 18px;\n      vertical-align: middle; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/category-datatables/category-datatables.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryDatatablesComponent; });
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
        var parentName = this.sublist.parentName ? this.sublist.parentName + ' - ' : '';
        var geoName = this.geo ? this.geo.name + ' - ' : '';
        var freq = this.freq;
        var catId = this.sublist.parentId;
        var tableId = this.tableId;
        var portalSettings = this.portalSettings;
        this.tableWidget = tableElement.DataTable({
            data: tableData,
            dom: 'B',
            columns: tableColumns,
            buttons: [{
                    extend: 'csv',
                    text: 'Download CSV <i class="fa fa-file-excel-o" aria-hidden="true"></i>',
                    filename: sublistName,
                    customize: function (csv) {
                        return portalSettings.catTable.portalSource +
                            parentName + sublistName + ' (' + geoName + freq.label + ')' +
                            ': ' + portalSettings.catTable.portalLink + catId + '&view=table#' + tableId +
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
        var c5maSelected = this.c5ma;
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
                var title = series.seriesInfo.displayName;
                series.categoryTable.forEach(function (obs) {
                    observations_1[obs.tableDate] = obs.value === Infinity ? null : obs.value;
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
                var title = series.seriesInfo.displayName;
                series.categoryTable.forEach(function (obs) {
                    yoy[obs.tableDate] = obs.yoyValue === Infinity ? null : obs.yoyValue;
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
                var title = series.seriesInfo.displayName;
                series.categoryTable.forEach(function (obs) {
                    ytd[obs.tableDate] = obs.ytdValue === Infinity ? null : obs.ytdValue;
                });
                tableData.push({
                    series: title + ytdLabel,
                    observations: ytd
                });
            });
        }
        if (c5maSelected) {
            tableData.push({
                series: '',
                observations: ''
            }, {
                series: '',
                observations: ''
            }, {
                series: 'Annual Change',
                observations: ''
            });
            displaySeries.forEach(function (series) {
                var c5ma = {};
                var percent = series.seriesInfo.percent;
                var c5maLabel = percent ? ' (ch)' : ' (%)';
                var title = series.seriesInfo.displayName;
                series.categoryTable.forEach(function (obs) {
                    c5ma[obs.tableDate] = obs.c5maValue === Infinity ? null : obs.c5maValue;
                });
                tableData.push({
                    series: title + c5maLabel,
                    observations: c5ma
                });
            });
        }
        return { tableColumns: tableColumns, tableData: tableData };
    };
    return CategoryDatatablesComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryDatatablesComponent.prototype, "portalSettings", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryDatatablesComponent.prototype, "tableId", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryDatatablesComponent.prototype, "sublist", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryDatatablesComponent.prototype, "categoryDates", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryDatatablesComponent.prototype, "geo", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryDatatablesComponent.prototype, "freq", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryDatatablesComponent.prototype, "yoy", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryDatatablesComponent.prototype, "ytd", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryDatatablesComponent.prototype, "c5ma", void 0);
CategoryDatatablesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryHelperService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__ = __webpack_require__("../../../../../src/app/uhero-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_service__ = __webpack_require__("../../../../../src/app/helper.service.ts");
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
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].of([this.categoryData[cacheId]]);
        }
        else {
            this.categoryData[cacheId] = {};
            this._uheroAPIService.fetchCategories().subscribe(function (categories) {
                if (catId === null) {
                    catId = categories[0].id;
                }
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
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].forkJoin(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].of(this.categoryData[cacheId]));
        }
    };
    CategoryHelperService.prototype.getSubcategoryData = function (catName, cacheId, catId, sublist, routeGeo, routeFreq) {
        var _this = this;
        var count = sublist.length;
        sublist.forEach(function (sub, index) {
            var freqGeosCopy = [], geoFreqsCopy = [];
            // Get all regions available in a given category
            _this._uheroAPIService.fetchSelectedCategory(sub.id).subscribe(function (category) {
                sub.freqGeos = category.freqGeos;
                sub.geoFreqs = category.geoFreqs;
            }, function (error) {
                _this.errorMessage = error;
            }, function () {
                count--;
                if (count === 0) {
                    _this.setRegionsFreqs(sublist, cacheId, catName, routeGeo, routeFreq);
                }
            });
        });
    };
    CategoryHelperService.prototype.setRegionsFreqs = function (sublist, cacheId, catName, routeGeo, routeFreq) {
        var _this = this;
        var geoArray = [], freqArray = [];
        // Get a unique list of regions and frequencies
        sublist.forEach(function (sub, index) {
            sub.geoFreqs.forEach(function (geo) {
                _this._helper.uniqueGeos(geo, geoArray);
            });
            sub.freqGeos.forEach(function (freq) {
                _this._helper.uniqueFreqs(freq, freqArray);
            });
        });
        var selected = this.checkSelectedGeosFreqs(routeFreq, routeGeo, freqArray, geoArray);
        var selectedFreq = selected.freq;
        var selectedGeo = selected.geo;
        var freqs, regions, currentGeo, currentFreq;
        // Get frequencies available for a selected region
        freqs = geoArray.find(function (geo) { return geo.handle === selectedGeo; }).freqs;
        // Get regions available for a selected frequency
        regions = freqArray.find(function (freq) { return freq.freq === selectedFreq; }).geos;
        currentGeo = regions.find(function (region) { return region.handle === selectedGeo; });
        currentFreq = freqs.find(function (freq) { return freq.freq === selectedFreq; });
        var dates = this.setCategoryDates(sublist, currentGeo, currentFreq);
        this.categoryData[cacheId].regions = regions;
        this.categoryData[cacheId].frequencies = freqs;
        this.categoryData[cacheId].currentGeo = currentGeo;
        this.categoryData[cacheId].currentFreq = currentFreq;
        this.categoryData[cacheId].categoryDateWrapper = dates.categoryDateWrapper;
        this.categoryData[cacheId].categoryDates = dates.categoryDates;
        this.categoryData[cacheId].sliderDates = this._helper.getTableDates(dates.categoryDates);
        sublist.forEach(function (sub, index) {
            sub.parentName = catName;
            var subcategory = {
                subcat: sub,
                cacheId: cacheId,
                currentGeo: currentGeo,
                currentFreq: currentFreq,
            };
            // Get seires belonging to each subcategory
            _this.getSeriesData(subcategory);
        });
    };
    CategoryHelperService.prototype.setCategoryDates = function (sublist, currentGeo, currentFreq) {
        var categoryDateWrapper = { firstDate: '', endDate: '' };
        var categoryDateArray = [];
        // Check subcategories for the earliest/latest start and end dates
        // Used to create array of dates for enitre category
        sublist.forEach(function (sub) {
            var geo = sub.geoFreqs.find(function (geoFreq) { return geoFreq.handle === currentGeo.handle; });
            var freq = geo ? geo.freqs.find(function (f) { return f.freq === currentFreq.freq; }) : null;
            if (freq) {
                if (freq.observationStart < categoryDateWrapper.firstDate || categoryDateWrapper.firstDate === '') {
                    categoryDateWrapper.firstDate = freq.observationStart.substr(0, 10);
                }
                if (freq.observationEnd > categoryDateWrapper.endDate || categoryDateWrapper.endDate === '') {
                    categoryDateWrapper.endDate = freq.observationEnd.substr(0, 10);
                }
            }
        });
        this._helper.createDateArray(categoryDateWrapper.firstDate, categoryDateWrapper.endDate, currentFreq.freq, categoryDateArray);
        return { categoryDateWrapper: categoryDateWrapper, categoryDates: categoryDateArray };
    };
    // Get regions and frequencies available for a selected category
    CategoryHelperService.prototype.getSeriesData = function (subcategory) {
        var _this = this;
        var subcat = subcategory.subcat;
        var cacheId = subcategory.cacheId;
        var currentGeo = subcategory.currentGeo;
        var currentFreq = subcategory.currentFreq;
        var expandedResults;
        this._uheroAPIService.fetchExpanded(subcat['id'], currentGeo.handle, currentFreq.freq).subscribe(function (expanded) {
            expandedResults = expanded;
        }, function (error) {
            console.log('error', error);
            error = _this.errorMessage = error;
        }, function () {
            // sublist id used as anchor fragments in landing-page component, fragment expects a string
            subcat.id = subcat.id.toString();
            if (expandedResults) {
                // Get array of all series that have level data available
                // Filter out series from expandedResults with non-seasonally-adjusted data
                var splitSeries = _this.getDisplaySeries(expandedResults, currentFreq.freq);
                if (splitSeries) {
                    subcat.displaySeries = splitSeries.displaySeries;
                    // sublist.allSeries = expandedResults;
                    _this.formatCategoryData(splitSeries.displaySeries, _this.categoryData[cacheId].categoryDates, _this.categoryData[cacheId].categoryDateWrapper);
                    subcat.requestComplete = true;
                    subcat.noData = false;
                }
                if (!splitSeries) {
                    // No series exist for a subcateogry
                    _this.setNoData(subcat);
                }
            }
            else {
                // No series exist for a subcateogry
                _this.setNoData(subcat);
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
        subcategory.requestComplete = true;
    };
    // Set up search results
    CategoryHelperService.prototype.initSearch = function (search, routeGeo, routeFreq) {
        var _this = this;
        var cacheId = CategoryHelperService_1.setCacheId(search, routeGeo, routeFreq);
        if (this.categoryData[cacheId]) {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].of([this.categoryData[cacheId]]);
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
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].forkJoin(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].of(this.categoryData[cacheId]));
        }
    };
    CategoryHelperService.prototype.searchSettings = function (search, cacheId, dateWrapper, geoFreqs, freqGeos, routeGeo, routeFreq) {
        var selected = this.checkSelectedGeosFreqs(routeFreq, routeGeo, freqGeos, geoFreqs);
        var selectedGeo = selected.geo;
        var selectedFreq = selected.freq;
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
                var splitSeries = _this.getDisplaySeries(searchResults, freq);
                var sublist = {
                    id: 'search',
                    parentName: 'Search',
                    name: search,
                    displaySeries: splitSeries.displaySeries,
                    requestComplete: false
                };
                var catWrapper = _this.getSearchDates(splitSeries.displaySeries);
                var categoryDateArray = [];
                _this._helper.createDateArray(catWrapper.firstDate, catWrapper.endDate, freq, categoryDateArray);
                _this.formatCategoryData(splitSeries.displaySeries, categoryDateArray, catWrapper);
                _this.categoryData[cacheId].sublist = [sublist];
                _this.categoryData[cacheId].categoryDateWrapper = categoryDateWrapper;
                _this.categoryData[cacheId].categoryDates = categoryDateArray;
                _this.categoryData[cacheId].sliderDates = _this._helper.getTableDates(categoryDateArray);
                _this.categoryData[cacheId].requestComplete = true;
                sublist.requestComplete = true;
            }
        });
    };
    CategoryHelperService.prototype.getSearchDates = function (displaySeries) {
        var categoryDateWrapper = { firstDate: '', endDate: '' };
        displaySeries.forEach(function (series) {
            if (series.start < categoryDateWrapper.firstDate || categoryDateWrapper.firstDate === '') {
                categoryDateWrapper.firstDate = series.start;
            }
            if (series.end > categoryDateWrapper.endDate || categoryDateWrapper.endDate === '') {
                categoryDateWrapper.endDate = series.end;
            }
        });
        return categoryDateWrapper;
    };
    CategoryHelperService.prototype.checkSelectedGeosFreqs = function (routeFreq, routeGeo, freqArray, geoArray) {
        var selectedFreq, selectedGeo;
        selectedFreq = this.defaultFreq ? this.defaultFreq : freqArray[0].freq;
        selectedGeo = this.defaultGeo ? this.defaultGeo : geoArray[0].handle;
        // If a frequency/region is specified in the route, check if the frequency/region exists in a category
        // If not display default freq/region for a given category
        if (routeFreq || routeGeo) {
            var freqExist = freqArray.find(function (freq) { return freq.freq === routeFreq; });
            var geoExist = geoArray.find(function (geo) { return geo.handle === routeGeo; });
            if (!freqExist || !geoExist) {
                return { freq: this.defaultFreq ? this.defaultFreq : freqArray[0].freq, geo: this.defaultGeo ? this.defaultGeo : geoArray[0].handle };
            }
            return { freq: routeFreq, geo: routeGeo };
        }
        return { freq: selectedFreq, geo: selectedGeo };
    };
    CategoryHelperService.prototype.filterSeriesResults = function (results, freq) {
        var _this = this;
        var filtered = [];
        results.forEach(function (res) {
            var seriesDates = [], series;
            var seriesObsStart = res.seriesObservations.observationStart;
            var seriesObsEnd = res.seriesObservations.observationEnd;
            var levelData = res.seriesObservations.transformationResults[0].observations;
            var newLevelData = res.seriesObservations.transformationResults[0].dates;
            var decimals = res.decimals ? res.decimals : 1;
            // Add series if level data is available
            if (levelData || newLevelData) {
                seriesDates = _this._helper.createDateArray(seriesObsStart, seriesObsEnd, freq, seriesDates);
                series = _this._helper.dataTransform(res.seriesObservations, seriesDates, decimals);
                res.saParam = res.seasonalAdjustment !== 'not_seasonally_adjusted';
                series.seriesInfo = res;
                series.seriesInfo.displayName = res.title;
                filtered.push(series);
            }
        });
        return filtered;
    };
    CategoryHelperService.prototype.getDisplaySeries = function (allSeries, freq) {
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
        var filtered = this.filterSeriesResults(displaySeries, freq);
        return filtered.length ? { displaySeries: filtered } : null;
    };
    CategoryHelperService.prototype.formatCategoryData = function (displaySeries, dateArray, dateWrapper) {
        var _this = this;
        displaySeries.forEach(function (series) {
            if (series.seriesInfo !== 'No data available') {
                var decimals = series.decimals ? series.decimals : 1;
                series['categoryTable'] = _this._helper.seriesTable(series.tableData, dateArray, decimals);
                series['categoryChart'] = _this._helper.dataTransform(series.seriesInfo.seriesObservations, dateArray, decimals);
            }
        });
    };
    return CategoryHelperService;
}());
CategoryHelperService = CategoryHelperService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__["a" /* UheroApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__["a" /* UheroApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__helper_service__["a" /* HelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__helper_service__["a" /* HelperService */]) === "function" && _b || Object])
], CategoryHelperService);

var CategoryHelperService_1, _a, _b;
//# sourceMappingURL=category-helper.service.js.map

/***/ }),

/***/ "../../../../../src/app/category-table/category-table.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"category-tables\">\n\t<div>\n\t\t<div class=\"table-row\" *ngIf=\"data\">\n\t\t\t<p *ngIf=\"noSeries\">No Data Available</p>\n\t\t\t<div class=\"table\" #tableScroll *ngIf=\"!noSeries\">\n\t\t\t\t<table class=\"category-table\">\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th class=\"empty-header\">&nbsp;</th>\n\t\t\t\t\t\t<ng-template ngFor let-date [ngForOf]=\"tableHeader\" let-i=\"index\">\n\t\t\t\t\t\t\t<td><b>{{date.tableDate}}</b></td>\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<ng-template ngFor let-serie [ngForOf]=\"data\" let-i=\"index\">\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th class=\"{{serie.seriesInfo.indent ? 'indent' + serie.seriesInfo.indent : ''}}\" title=\"{{serie.seriesInfo.title}}\" data-animation='false'\n\t\t\t\t\t\t\t data-html='true' data-placement='left' data-toggle='tooltip' on-mouseover=\"showTooltip()\">\n\t\t\t\t\t\t\t\t<a [routerLink]=\"['/series']\" [queryParams]=\"{ id: serie.seriesInfo.id, sa: serie.seriesInfo.saParam }\" queryParamsHandling='merge'\n\t\t\t\t\t\t\t\t (click)=\"hideInfo(serie.seriesInfo.id)\">\n                  \t\t\t\t\t{{serie.seriesInfo.tablePrefix + serie.seriesInfo.displayName + serie.seriesInfo.tablePostfix}}\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class=\"th-buttons\">\n\t\t\t\t\t\t\t\t\t<i [title]=\"serie.seriesInfo.analyze ? 'Remove from Analyzer' : 'Add to Analyzer'\" [class.add-button]=\"!serie.seriesInfo.analyze\" [class.remove-button]=\"serie.seriesInfo.analyze\" class=\"material-icons analyze-button remove-button\" (click)=\"updateAnalyze(serie.seriesInfo, serie.tableData, serie.chartData)\">&#xE838;</i>\n\t\t\t\t\t\t\t\t\t<a tabindex=\"0\" id=\"{{subcatIndex + serie.seriesInfo.id}}\" class=\"info\" (click)=\"showPopover(serie.seriesInfo, subcatIndex)\"\n\t\t\t\t\t\t\t\t\t role=\"button\" data-animation='false' data-toggle=\"popover\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons info-icon\">&#xE88F;</i>\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t<ng-template ngFor let-item [ngForOf]=\"serie.trimCatTable\">\n\t\t\t\t\t\t\t\t<td>{{item.formattedValue}}</td>\n\t\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr *ngIf=\"yoyActive\">\n\t\t\t\t\t\t\t<th class=\"{{serie.seriesInfo.indent ? 'indent' + serie.seriesInfo.indent : ''}}\">\n\t\t\t\t\t\t\t\t{{(serie.seriesInfo.percent) ? '&emsp; YOY (ch.)' : '&emsp; YOY (%)'}}\n\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t<ng-template ngFor let-item [ngForOf]=\"serie.trimCatTable\">\n\t\t\t\t\t\t\t\t<td>{{item.formattedYoy}}</td>\n\t\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr *ngIf=\"c5maActive\">\n\t\t\t\t\t\t\t<th class=\"{{serie.seriesInfo.indent ? 'indent' + serie.seriesInfo.indent : ''}}\">\n\t\t\t\t\t\t\t\t{{(serie.seriesInfo.percent) ? '&emsp; Annual (ch.)' : '&emsp; Annual (%)'}}\n\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t<ng-template ngFor let-item [ngForOf]=\"serie.trimCatTable\">\n\t\t\t\t\t\t\t\t<td>{{item.formattedC5ma}}</td>\n\t\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr *ngIf=\"ytdActive && serie.seriesInfo.frequencyShort !== 'A'\">\n\t\t\t\t\t\t\t<th class=\"{{serie.seriesInfo.indent ? 'indent' + serie.seriesInfo.indent : ''}}\">\n\t\t\t\t\t\t\t\t{{(serie.seriesInfo.percent)? '&emsp; YTD (ch.)' : '&emsp; YTD (%)'}}\n\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t<ng-template ngFor let-item [ngForOf]=\"serie.trimCatTable\">\n\t\t\t\t\t\t\t\t<td>{{item.formattedYtd}}</td>\n\t\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</ng-template>\n\t\t\t\t</table>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/category-table/category-table.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n/* Analyzer Chart */\n/* Loading Screen */\n.category-tables {\n  vertical-align: top;\n  display: inline-block;\n  min-height: 100%;\n  overflow: auto;\n  width: 100%; }\n  @media (min-width: 768px) {\n    .category-tables {\n      margin-top: 10px; } }\n  @media (max-width: 767px) {\n    .category-tables {\n      margin-top: 50px; } }\n  .category-tables .material-icons.md-18 {\n    font-size: 18px;\n    color: #F6A01B;\n    vertical-align: middle; }\n  .category-tables .table-row {\n    position: relative;\n    margin-bottom: 20px; }\n    .category-tables .table-row .table {\n      overflow-x: scroll;\n      overflow-y: visible;\n      width: 68%;\n      margin-left: 32%;\n      margin-bottom: 40px;\n      /* Add gradient to scrollable content, based on: http://www.the-haystack.com/2013/09/24/responsive-scrollable-tables/ */\n      background-image: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0)), linear-gradient(to left, #ffffff, rgba(255, 255, 255, 0)), linear-gradient(to right, #E4E4E4, rgba(195, 195, 197, 0)), linear-gradient(to left, #E4E4E4, rgba(195, 195, 197, 0));\n      background-position: 0 0, 100% 0, 0 0, 100% 0;\n      background-repeat: no-repeat;\n      background-color: white;\n      background-size: 4em 100%, 4em 100%, 1em 100%, 1em 100%;\n      background-attachment: local, local, scroll, scroll; }\n      .category-tables .table-row .table .category-table {\n        table-layout: fixed;\n        width: 100%;\n        *margin-left: -32%; }\n        .category-tables .table-row .table .category-table td, .category-tables .table-row .table .category-table th {\n          vertical-align: top;\n          width: 125px;\n          text-align: right;\n          font-size: 0.8em;\n          padding: 0.4em;\n          border: 1px solid #E5E5E5; }\n          .category-tables .table-row .table .category-table td:empty:after, .category-tables .table-row .table .category-table th:empty:after {\n            content: \"\\A0\"; }\n        .category-tables .table-row .table .category-table th {\n          position: absolute;\n          *position: relative;\n          left: 0;\n          width: 32%;\n          white-space: nowrap;\n          border-right: 1px solid #E5E5E5;\n          text-align: left;\n          text-overflow: ellipsis;\n          overflow: hidden;\n          font-size: 0.8em;\n          font-weight: normal;\n          border-bottom: 0; }\n          .category-tables .table-row .table .category-table th .th-buttons {\n            float: right; }\n            .category-tables .table-row .table .category-table th .th-buttons .info {\n              float: right;\n              cursor: pointer;\n              width: initial; }\n              .category-tables .table-row .table .category-table th .th-buttons .info:focus {\n                outline: 0; }\n              .category-tables .table-row .table .category-table th .th-buttons .info .info-icon {\n                font-size: 1.2em;\n                vertical-align: middle;\n                margin-left: 5px; }\n            .category-tables .table-row .table .category-table th .th-buttons .analyze-button {\n              color: rgba(240, 240, 240, 0.65);\n              cursor: pointer;\n              vertical-align: middle;\n              font-size: inherit;\n              font-weight: bold; }\n            .category-tables .table-row .table .category-table th .th-buttons .add-button {\n              text-shadow: 1px 2px 6px #FFF, 0 0 0 #000, 1px 2px 6px #FFF; }\n            .category-tables .table-row .table .category-table th .th-buttons .remove-button {\n              color: #F6A01B; }\n        .category-tables .table-row .table .category-table .empty-header {\n          border: none;\n          border-right: 1px solid #E5E5E5; }\n        .category-tables .table-row .table .category-table tr:last-child th {\n          border: 1px solid #E5E5E5; }\n        .category-tables .table-row .table .category-table .indent1 {\n          padding-left: 30px; }\n          .category-tables .table-row .table .category-table .indent1 a {\n            width: 68%; }\n          .category-tables .table-row .table .category-table .indent1 .info {\n            width: initial; }\n        .category-tables .table-row .table .category-table .indent2 {\n          padding-left: 50px; }\n          .category-tables .table-row .table .category-table .indent2 a {\n            width: 60%; }\n          .category-tables .table-row .table .category-table .indent2 .info {\n            width: initial; }\n        .category-tables .table-row .table .category-table .indent3 {\n          padding-left: 70px; }\n          .category-tables .table-row .table .category-table .indent3 a {\n            width: 50%; }\n          .category-tables .table-row .table .category-table .indent3 .info {\n            width: initial; }\n        .category-tables .table-row .table .category-table tr:nth-child(even) {\n          background-color: rgba(212, 212, 212, 0.2); }\n          .category-tables .table-row .table .category-table tr:nth-child(even) td:first-child, .category-tables .table-row .table .category-table tr:nth-child(even) th:first-child {\n            background: rgba(212, 212, 212, 0.2); }\n          .category-tables .table-row .table .category-table tr:nth-child(even) .th-buttons .analyze-button {\n            color: rgba(240, 240, 240, 0.65); }\n          .category-tables .table-row .table .category-table tr:nth-child(even) .th-buttons .add-button {\n            text-shadow: 1px 2px 6px rgba(212, 212, 212, 0.2), 0 0 0 #000, 1px 2px 6px rgba(212, 212, 212, 0.2); }\n          .category-tables .table-row .table .category-table tr:nth-child(even) .th-buttons .remove-button {\n            color: #F6A01B; }\n        .category-tables .table-row .table .category-table a {\n          width: 74%;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          color: #505050;\n          vertical-align: top;\n          float: left; }\n\n.tooltip.tooltip-bottom .tooltip-inner::before, .tooltip.bs-tether-element-attached-top .tooltip-inner::before {\n  border-bottom-color: #FAFAFB; }\n\n.tooltip.bs-tooltip-left .arrow::before, .tooltip.bs-tooltip-right .arrow::before, .tooltip.bs-tether-element-attached-right .arrow::before {\n  border-left-color: #FAFAFB;\n  border-right-color: #FAFAFB; }\n\n.tooltip-inner {\n  max-width: 225px;\n  text-align: left;\n  background-color: #FAFAFB;\n  color: #000;\n  box-shadow: -3px -3px 6px rgba(0, 0, 0, 0.16), 3px 3px 6px rgba(0, 0, 0, 0.23);\n  -moz-box-shadow: -3px -3px 6px rgba(0, 0, 0, 0.16), 3px 3px 6px rgba(0, 0, 0, 0.23);\n  -webkit-box-shadow: -3px -3px 6px rgba(0, 0, 0, 0.16), 3px 3px 6px rgba(0, 0, 0, 0.23); }\n  .tooltip-inner b {\n    font-weight: 600; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/category-table/category-table.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__analyzer_service__ = __webpack_require__("../../../../../src/app/analyzer.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__uhero_api_service__ = __webpack_require__("../../../../../src/app/uhero-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_service__ = __webpack_require__("../../../../../src/app/helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__table_helper_service__ = __webpack_require__("../../../../../src/app/table-helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jquery__);
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







var CategoryTableComponent = (function () {
    function CategoryTableComponent(defaultRange, _uheroAPIService, _table, _helper, route, _router, _analyzer) {
        this.defaultRange = defaultRange;
        this._uheroAPIService = _uheroAPIService;
        this._table = _table;
        this._helper = _helper;
        this.route = route;
        this._router = _router;
        this._analyzer = _analyzer;
        this.tableWidths = [];
    }
    CategoryTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.forEach(function (chartSeries) {
            if (chartSeries.seriesInfo !== 'No data available') {
                chartSeries.seriesInfo.analyze = _this._analyzer.checkAnalyzer(chartSeries.seriesInfo);
            }
        });
    };
    CategoryTableComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.dates) {
            var defaultRanges = this._helper.setDefaultTableRange(this.freq, this.dates, this.defaultRange);
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
        var container = this._table.checkContainerHeight(this.previousHeight);
        this.previousHeight = container.previousHeight;
        if (container.scroll) {
            // On load, table scrollbars should start at the right -- showing most recent data
            this._table.tableScroll(this.tableEl);
        }
        // Scroll tables to the right when table widths changes, i.e. changing frequency from A to Q | M
        return this._table.checkTableWidth(this.tableWidths);
    };
    CategoryTableComponent.prototype.showTooltip = function () {
        $('[data-toggle="tooltip"]').tooltip();
    };
    CategoryTableComponent.prototype.hideInfo = function (seriesId) {
        // this.submitGAEvent(seriesId);
        return this._table.hideInfo(seriesId);
    };
    CategoryTableComponent.prototype.showPopover = function (seriesInfo, subcatIndex) {
        return this._table.showPopover(seriesInfo, subcatIndex);
    };
    CategoryTableComponent.prototype.updateAnalyze = function (seriesInfo, tableData, chartData) {
        this._analyzer.updateAnalyzer(seriesInfo, tableData, chartData);
    };
    return CategoryTableComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('tableScroll'),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "tableEl", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "data", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "subCats", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "freq", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "dates", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "noSeries", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "yoyActive", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "ytdActive", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "c5maActive", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "params", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "subcatIndex", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "tableStart", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CategoryTableComponent.prototype, "tableEnd", void 0);
CategoryTableComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-category-table',
        template: __webpack_require__("../../../../../src/app/category-table/category-table.component.html"),
        styles: [__webpack_require__("../../../../../src/app/category-table/category-table.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('defaultRange')),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__uhero_api_service__["a" /* UheroApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__uhero_api_service__["a" /* UheroApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__table_helper_service__["a" /* TableHelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__table_helper_service__["a" /* TableHelperService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__helper_service__["a" /* HelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__helper_service__["a" /* HelperService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__analyzer_service__["a" /* AnalyzerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__analyzer_service__["a" /* AnalyzerService */]) === "function" && _f || Object])
], CategoryTableComponent);

var _a, _b, _c, _d, _e, _f;
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
        var seriesInfo = [chartLabels[6].html];

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

/***/ "../../../../../src/app/data-portal-settings.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataPortalSettingsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Settings for each data portal
// Defines series types for charts and columns available in single series tables

var DataPortalSettingsService = (function () {
    function DataPortalSettingsService() {
        this.dataPortalSettings = {
            nta: {
                catTable: {
                    portalSource: 'National Transfer Accounts (NTA) Dataportal: http://data.uhero.hawaii.edu/nta \n ',
                    portalLink: 'http://data.uhero.hawaii.edu/nta/#/category?id='
                },
                highcharts: {
                    seriesTotal: 1,
                    series0Name: 'level',
                    series0Type: 'line',
                    series0Data: true,
                    series1Name: '',
                    series1Type: '',
                    series1Data: false,
                    setYAxes: true
                },
                highstock: {
                    credits: 'data.uhero.hawaii.edu/nta',
                    labels: {
                        seriesLink: 'http://data.uhero.hawaii.edu/nta/#/series?id=',
                        portal: 'National Transfer Accounts (NTA)',
                        portalLink: 'NTA Dataportal: http://data.uhero.hawaii.edu/nta'
                    },
                    series0Name: 'c5ma',
                    series0Type: 'column',
                    series1Name: 'level',
                    series1Type: 'line',
                    series2Name: 'none',
                    series2Type: '',
                },
                seriesTable: {
                    columns: 3,
                    series1: 'formattedValue',
                    series1Label: 'Level',
                    series2: 'formattedC5ma',
                    series2Label: 'Centered 5 Year Moving Avg % Chg',
                    series2PercLabel: 'Centered 5 Year Moving Avg Chg'
                },
                transformations: {
                    yoy: false,
                    ytd: false,
                    c5ma: true
                },
                sliderInteraction: false
            },
            uhero: {
                catTable: {
                    portalSource: 'The University of Hawaii Economic Research Organization (UHERO) Dataportal: http://data.uhero.hawaii.edu/ \n ',
                    portalLink: 'http://data.uhero.hawaii.edu/#/category?id='
                },
                highcharts: {
                    seriesTotal: 2,
                    series0Name: 'level',
                    series0Type: 'line',
                    series0Data: true,
                    series1Name: 'ytd',
                    series1Type: 'column',
                    series1Data: true,
                    setYAxes: false
                },
                highstock: {
                    credits: 'data.uhero.hawaii.edu',
                    labels: {
                        seriesLink: 'http://data.uhero.hawaii.edu/#/series?id=',
                        portal: 'The University of Hawaii Economic Research Organization (UHERO)',
                        portalLink: 'Data Portal: http://data.uhero.hawaii.edu/'
                    },
                    series0Name: 'yoy',
                    series0Type: 'column',
                    series1Name: 'level',
                    series1Type: 'line',
                    series2Name: 'ytd',
                    series2Type: 'column',
                },
                seriesTable: {
                    columns: 4,
                    series1: 'formattedValue',
                    series1Label: 'Level',
                    series2: 'formattedYoy',
                    series2Label: 'Year/Year % Chg',
                    series2PercLabel: 'Year/Year Chg',
                    series3: 'formattedYtd',
                    series3Label: 'Year-to-Date % Chg',
                    series3PercLabel: 'Year-to-Date Chg'
                },
                transformations: {
                    yoy: true,
                    ytd: true,
                    c5ma: false
                },
                sliderInteraction: true
            }
        };
    }
    return DataPortalSettingsService;
}());
DataPortalSettingsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], DataPortalSettingsService);

//# sourceMappingURL=data-portal-settings.service.js.map

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
exports.push([module.i, "/* Highcharts */\n/* Analyzer Chart */\n/* Loading Screen */\n.irs-line-mid, .irs-line-left, .irs-line-right,\n.irs-bar, .irs-bar-edge, .irs-slider {\n  background: url(" + __webpack_require__("../../../../../src/sprite-skin-nice2.png") + ") repeat-x;\n  position: absolute; }\n\n.irs-slider.from, .irs-slider.to {\n  background-position: 0 -120px; }\n\n.irs-slider.state_hover, .irs-slider:hover {\n  background-position: 0 -150px; }\n\n.irs-line-mid {\n  background-position: 0 0; }\n\n.irs-line-left {\n  background-position: 0 -30px; }\n\n.irs-line-right {\n  background-position: 100% -30px; }\n\n.irs-bar {\n  background-position: 0 -60px; }\n\n.irs-slider, .irs-slider.type_last {\n  z-index: 0; }\n\n.irs-from, .irs-to, .irs-single {\n  background: none;\n  border-radius: 0px;\n  font-size: 12px;\n  color: #505050;\n  padding: 1px 2px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/date-slider/date-slider.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateSliderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_service__ = __webpack_require__("../../../../../src/app/helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ion_rangeslider__ = __webpack_require__("../../../../ion-rangeslider/js/ion.rangeSlider.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ion_rangeslider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ion_rangeslider__);
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




var DateSliderComponent = (function () {
    function DateSliderComponent(defaultRange, _helper) {
        this.defaultRange = defaultRange;
        this._helper = _helper;
        this.updateRange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](true);
    }
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
        if (this.portalSettings.sliderInteraction && this.dates && this.dates.length) {
            var defaultRanges = this.findDefaultRange();
            // Start and end used for 'from' and 'to' inputs in slider
            // If start/end exist in values array, position handles at start/end; otherwise, use default range
            this.start = defaultRanges.start;
            this.end = defaultRanges.end;
            this.sublist.forEach(function (sub) {
                var slider = $('#' + sub.id).data('ionRangeSlider');
                _this.updateSlider(slider);
            });
        }
        if (!this.portalSettings.sliderInteraction && this.dates && this.dates.length) {
            var defaultRanges = this.findDefaultRange();
            // Start and end used for 'from' and 'to' inputs in slider
            // If start/end exist in values array, position handles at start/end; otherwise, use default range
            this.start = defaultRanges.start;
            this.end = defaultRanges.end;
            var slider = $('#' + this.subCat.id).data('ionRangeSlider');
            this.updateSlider(slider);
        }
    };
    DateSliderComponent.prototype.findDefaultRange = function () {
        var _this = this;
        var defaultRanges = this._helper.setDefaultSliderRange(this.freq, this.dates, this.defaultRange);
        var startIndex = defaultRanges.start, endIndex = defaultRanges.end;
        this.dates.forEach(function (date, index) {
            // Range slider is converting annual year strings to numbers
            if (date == _this.dateFrom) {
                startIndex = index;
            }
            if (date == _this.dateTo) {
                endIndex = index;
            }
        });
        return { start: startIndex, end: endIndex };
    };
    DateSliderComponent.prototype.updateSlider = function (slider) {
        if (slider) {
            slider.update({
                from: this.start,
                to: this.end
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DateSliderComponent.prototype, "portalSettings", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DateSliderComponent.prototype, "subCat", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DateSliderComponent.prototype, "dates", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DateSliderComponent.prototype, "freq", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DateSliderComponent.prototype, "dateFrom", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DateSliderComponent.prototype, "dateTo", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DateSliderComponent.prototype, "sublist", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], DateSliderComponent.prototype, "updateRange", void 0);
DateSliderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-date-slider',
        template: __webpack_require__("../../../../../src/app/date-slider/date-slider.component.html"),
        styles: [__webpack_require__("../../../../../src/app/date-slider/date-slider.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('defaultRange')),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__helper_service__["a" /* HelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__helper_service__["a" /* HelperService */]) === "function" && _a || Object])
], DateSliderComponent);

var _a;
//# sourceMappingURL=date-slider.component.js.map

/***/ }),

/***/ "../../../../../src/app/feedback/feedback.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"feedback\">\n  <button type=\"button\" class=\"btn btn-feedback\" (click)=\"reset()\" data-toggle=\"modal\" data-target=\"#feedback\">\n  Feedback\n</button>\n  <span id=\"uhero-link\">Made by <a href=\"http://uhero.hawaii.edu\">UHERO</a></span>\n</div>\n<div *ngIf=\"successMsg\" [hidden]=\"hideAlert\" class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button> {{successMsg}}\n</div>\n<div *ngIf=\"errorMsg\" [hidden]=\"hideAlert\" class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button> {{errorMsg}}\n</div>\n<div class=\"modal fade\" id=\"feedback\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"feedback\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\">Send Feedback</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body form-horizontal\">\n        <form [formGroup]=\"feedbackForm\">\n          <div class=\"form-group row\">\n            <div class=\"col-2 col-form-label\"><i class=\"material-icons\">&#xE7FD;</i></div>\n            <div class=\"col-10\">\n              <input type=\"text\" formControlName=\"name\" aria-label=\"Your Name\" class=\"form-control custom-input\" placeholder=\"Your Name\"\n              />\n              <small class=\"form-text text-muted\"> * Optional</small>\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <div class=\"col-2 col-form-label\"><i class=\"material-icons\">&#xE158;</i></div>\n            <div class=\"col-10\">\n              <input type=\"email\" formControlName=\"email\" aria-label=\"Email\" class=\"form-control custom-input\" placeholder=\"Email\" />\n              <small class=\"form-text text-muted\"> * Optional</small>\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <div class=\"col-2 col-form-label\"><i class=\"material-icons\">&#xE0B9;</i></div>\n            <div class=\"col-10\">\n              <textarea type=\"text\" class=\"form-control custom-input\" aria-label=\"Feedback\" formControlName=\"feedback\" placeholder=\"Feedback\"\n                required></textarea>\n              <small class=\"form-text text-muted\"> * Required</small>\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <div class=\"col-2\"></div>\n            <div class=\"col-10\">\n              <recaptcha name=\"captcha\" area-label=\"Google captcha\" formControlName=\"captcha\" required siteKey=\" 6LcN3hQUAAAAAOUb0_Z_wpk3dLvbVz7S45Bgcv7c\"\n                class=\"captcha\"></recaptcha>\n              <small class=\"form-text text-muted\"> * Required</small>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-4\"></div>\n            <div class=\"col-4\">\n              <button type=\"button\" (click)=\"onSubmit()\" data-dismiss=\"modal\" class=\"btn btn-submit\" label=\"Submit\" [disabled]=\"!feedbackForm.valid\"\n                [title]=\"!feedbackForm.valid ? 'Feedback is required.' : 'Submit feedback.'\">Submit</button>\n            </div>\n            <div class=\"col-4\"></div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/feedback/feedback.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n/* Analyzer Chart */\n/* Loading Screen */\n.btn-feedback {\n  background-color: #FAFAFB;\n  color: #505050;\n  position: fixed;\n  bottom: 0;\n  left: 10px;\n  line-height: 1;\n  font-size: 0.9em;\n  border: 1px solid #E5E5E5;\n  border-bottom: 0;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n  @media (max-width: 767px) {\n    .btn-feedback {\n      right: 10px;\n      bottom: 0px;\n      left: unset; } }\n\n#uhero-link {\n  position: fixed;\n  left: 100px;\n  bottom: 0;\n  font-size: 0.9em;\n  padding: 0.5rem 1rem;\n  line-height: 1em; }\n  #uhero-link a {\n    color: #1D667F;\n    text-decoration: none; }\n  @media (max-width: 767px) {\n    #uhero-link {\n      right: -5px;\n      bottom: 28px;\n      left: unset; } }\n\n.modal-title {\n  color: #1D667F;\n  font-family: 'Lucida Sans', sans-serif;\n  font-size: 1em; }\n\n.alert {\n  position: fixed;\n  bottom: 0;\n  left: 120px;\n  border-bottom: 0px;\n  margin-bottom: 0;\n  line-height: 1.5em;\n  font-size: 0.9em;\n  font-family: 'Lucida Sans', sans-serif;\n  padding: 0.25rem 1.25rem; }\n  .alert .close {\n    top: 0;\n    right: 0;\n    float: left;\n    padding: 0;\n    padding-right: 0.5rem; }\n\n.col-form-label {\n  text-align: right;\n  color: #1D667F; }\n\n.custom-input {\n  border: 0 solid #1D667F;\n  border-bottom-width: 2px;\n  border-radius: 0;\n  font-family: 'Lucida Sans', sans-serif;\n  font-size: 0.9em;\n  color: #505050;\n  padding: 0.5rem 0.25rem; }\n\n.captcha {\n  display: inline-block;\n  vertical-align: middle; }\n  @media (max-width: 767px) {\n    .captcha {\n      transform: scale(0.7);\n      -webkit-transform: scale(0.7);\n      transform-origin: 0 0;\n      -webkit-transform-origin: 0 0; } }\n\n.btn-submit {\n  background-color: #1D667F;\n  color: #FFF; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/feedback/feedback.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
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
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-feedback',
        template: __webpack_require__("../../../../../src/app/feedback/feedback.component.html"),
        styles: [__webpack_require__("../../../../../src/app/feedback/feedback.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _b || Object])
], FeedbackComponent);

var _a, _b;
//# sourceMappingURL=feedback.component.js.map

/***/ }),

/***/ "../../../../../src/app/freq-selector/freq-selector.component.html":
/***/ (function(module, exports) {

module.exports = "<select [ngModel]=\"selectedFreq?.freq\" (ngModelChange)=\"onChange($event)\" class=\"custom-select\">\n   <option [ngValue]=\"freq?.freq\" *ngFor=\"let freq of freqs\">\n      {{(freq.label.length > 0) ? freq.label : freq.freq}}\n   </option>\n</select>"

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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FreqSelectorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__frequency__ = __webpack_require__("../../../../../src/app/frequency.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__frequency___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__frequency__);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], FreqSelectorComponent.prototype, "freqs", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__frequency__["Frequency"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__frequency__["Frequency"]) === "function" && _a || Object)
], FreqSelectorComponent.prototype, "selectedFreq", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], FreqSelectorComponent.prototype, "selectedFreqChange", void 0);
FreqSelectorComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
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

module.exports = "<select [ngModel]=\"selectedGeo?.handle\" (ngModelChange)=\"onChange($event)\" class=\"custom-select\">\n    <option [ngValue]=\"region?.handle\" *ngFor=\"let region of regions\">\n        {{(region.name.length > 0) ? region.name : region.handle}}\n    </option>\n</select>\n"

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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoSelectorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geography__ = __webpack_require__("../../../../../src/app/geography.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geography___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__geography__);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GeoSelectorComponent.prototype, "regions", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__geography__["Geography"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__geography__["Geography"]) === "function" && _a || Object)
], GeoSelectorComponent.prototype, "selectedGeo", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], GeoSelectorComponent.prototype, "selectedGeoChange", void 0);
GeoSelectorComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleAnalyticsEventsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], GoogleAnalyticsEventsService);

//# sourceMappingURL=google-analytics-events.service.js.map

/***/ }),

/***/ "../../../../../src/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<header id=\"header\" class=\"navbar navbar-fixed-top navbar-light\">\n    <a class=\"navbar-brand\" id=\"uhero-header\" routerLink=\"/\">\n        <img [src]=\"headerLogo\" alt=\"UHERO.data logo\">\n    </a>\n    <app-search-bar (onSearch)=\"onSearch($event)\"></app-search-bar>\n    <a routerLink=\"/help\" class=\"about-portal\"><i class=\"material-icons\">&#xE887;</i></a>\n</header>"

/***/ }),

/***/ "../../../../../src/app/header/header.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n/* Analyzer Chart */\n/* Loading Screen */\n#header {\n  position: fixed;\n  height: 55px;\n  top: 0;\n  width: 100%;\n  background-color: #FFF;\n  color: #FFF;\n  padding: 0;\n  box-shadow: 0 4px 6px -6px #000;\n  -moz-box-shadow: 0 4px 6px -6px #000;\n  -webkit-box-shadow: 0 4px 6px -6px #000; }\n  @media (max-width: 767px) {\n    #header {\n      display: none; } }\n  @media (min-width: 768px) {\n    #header {\n      z-index: 1; } }\n  #header a {\n    padding: 0;\n    width: 275px;\n    overflow: hidden; }\n  #header img {\n    height: 55px;\n    padding: 10px;\n    max-width: 275px; }\n\n.about-portal {\n  position: absolute;\n  right: 10px;\n  top: 13px;\n  width: initial !important; }\n  .about-portal .material-icons {\n    font-size: 28px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-header',
        template: __webpack_require__("../../../../../src/app/header/header.component.html"),
        styles: [__webpack_require__("../../../../../src/app/header/header.component.scss")]
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('logo')),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _a || Object])
], HeaderComponent);

var _a;
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "../../../../../src/app/help-item.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpItem; });
var HelpItem = (function () {
    function HelpItem(component) {
        this.component = component;
    }
    return HelpItem;
}());

//# sourceMappingURL=help-item.js.map

/***/ }),

/***/ "../../../../../src/app/help.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HelpDirective = (function () {
    function HelpDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    return HelpDirective;
}());
HelpDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[appHelp]'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _a || Object])
], HelpDirective);

var _a;
//# sourceMappingURL=help.directive.js.map

/***/ }),

/***/ "../../../../../src/app/help.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nta_help_nta_help_component__ = __webpack_require__("../../../../../src/app/nta-help/nta-help.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uhero_help_uhero_help_component__ = __webpack_require__("../../../../../src/app/uhero-help/uhero-help.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__help_item__ = __webpack_require__("../../../../../src/app/help-item.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HelpService = (function () {
    function HelpService() {
        this.helpDocs = {
            nta: new __WEBPACK_IMPORTED_MODULE_3__help_item__["a" /* HelpItem */](__WEBPACK_IMPORTED_MODULE_1__nta_help_nta_help_component__["a" /* NtaHelpComponent */]),
            uhero: new __WEBPACK_IMPORTED_MODULE_3__help_item__["a" /* HelpItem */](__WEBPACK_IMPORTED_MODULE_2__uhero_help_uhero_help_component__["a" /* UheroHelpComponent */])
        };
    }
    return HelpService;
}());
HelpService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], HelpService);

//# sourceMappingURL=help.service.js.map

/***/ }),

/***/ "../../../../../src/app/help/help.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"help-content\">\n  <ng-template appHelp></ng-template>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/help/help.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".help-content {\n  vertical-align: top;\n  min-height: 100%; }\n  @media (min-width: 768px) {\n    .help-content {\n      margin-top: 70px; } }\n  @media (max-width: 767px) {\n    .help-content {\n      margin-top: 50px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/help/help.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__help_directive__ = __webpack_require__("../../../../../src/app/help.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__help_service__ = __webpack_require__("../../../../../src/app/help.service.ts");
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
// HelpComponent dynamically loads a specified data portal's help page
// See: https://angular.io/guide/dynamic-component-loader



var HelpComponent = (function () {
    function HelpComponent(portal, componentFactoryResolver, _help) {
        this.portal = portal;
        this.componentFactoryResolver = componentFactoryResolver;
        this._help = _help;
    }
    HelpComponent.prototype.ngAfterViewInit = function () {
        this.loadComponent();
    };
    HelpComponent.prototype.loadComponent = function () {
        // Get content for the help page based on which data portal is built/loaded
        var helpItem = this._help.helpDocs[this.portal];
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(helpItem.component);
        var viewContainerRef = this.appHelp.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
    };
    return HelpComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__help_directive__["a" /* HelpDirective */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__help_directive__["a" /* HelpDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__help_directive__["a" /* HelpDirective */]) === "function" && _a || Object)
], HelpComponent.prototype, "appHelp", void 0);
HelpComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-help',
        template: __webpack_require__("../../../../../src/app/help/help.component.html"),
        styles: [__webpack_require__("../../../../../src/app/help/help.component.scss")]
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('portal')),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__help_service__["a" /* HelpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__help_service__["a" /* HelpService */]) === "function" && _c || Object])
], HelpComponent);

var _a, _b, _c;
//# sourceMappingURL=help.component.js.map

/***/ }),

/***/ "../../../../../src/app/helper.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelperService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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
        var levelResults = observations.transformationResults.find(function (obs) { return obs.transformation === 'lvl'; });
        var yoyResults = observations.transformationResults.find(function (obs) { return obs.transformation === 'pc1'; });
        var ytdResults = observations.transformationResults.find(function (obs) { return obs.transformation === 'ytd'; });
        var c5maResults = observations.transformationResults.find(function (obs) { return obs.transformation === 'c5ma'; });
        var pseudoZones = [];
        var level, yoy, ytd, c5ma, combinedObservations;
        // Method for old API observation response
        if (levelResults.observations) {
            if (levelResults) {
                levelResults.observations.forEach(function (entry, i) {
                    // Get last pseudoHistory date if available
                    if (entry.pseudoHistory && !levelResults.observations[i + 1].pseudoHistory) {
                        pseudoZones.push({ value: Date.parse(entry.date), dashStyle: 'dash', color: '#7CB5EC', className: 'pseudoHistory' });
                    }
                });
                combinedObservations = this.combineObsData(levelResults.observations, yoyResults.observations, ytdResults.observations, c5maResults.observations);
            }
        }
        if (!levelResults.observations) {
            // Method for new API observation responses
            if (levelResults.dates) {
                level = this.formatObservations(levelResults);
                level.forEach(function (l, index) {
                    if (l.pseudoHistory && !level[index + 1].pseudoHistory) {
                        pseudoZones.push({ value: Date.parse(l.date), dashStyle: 'dash', color: '#7CB5EC', className: 'pseudoHistory' });
                    }
                });
            }
            if (yoyResults.dates) {
                yoy = this.formatObservations(yoyResults);
            }
            if (ytdResults.dates) {
                ytd = this.formatObservations(ytdResults);
            }
            if (c5maResults.dates) {
                c5ma = this.formatObservations(c5maResults);
            }
            combinedObservations = level.map(function (entry, index) {
                var obj = { date: '', value: null, yoyValue: null, ytdValue: null, c5maValue: null };
                var yoyDateIndex = yoy ? yoy.findIndex(function (y) { return y.date === entry.date; }) : -1;
                var ytdDateIndex = ytd ? ytd.findIndex(function (y) { return y.date === entry.date; }) : -1;
                var c5maDateIndex = c5ma ? c5ma.findIndex(function (c) { return c.date === entry.date; }) : -1;
                obj.date = entry.date;
                obj.value = entry.value;
                obj.yoyValue = yoyDateIndex > -1 ? yoy[yoyDateIndex].value : null;
                obj.ytdValue = ytdDateIndex > -1 ? ytd[ytdDateIndex].value : null;
                obj.c5maValue = c5maDateIndex > -1 ? c5ma[c5maDateIndex].value : null;
                return obj;
            });
        }
        var tableData = this.seriesTable(combinedObservations, dates, decimals);
        var chart = this.seriesChart(combinedObservations, dates);
        var chartData = { level: chart.level, pseudoZones: pseudoZones, yoy: chart.yoy, ytd: chart.ytd, c5ma: chart.c5ma };
        results = { chartData: chartData, tableData: tableData, start: start, end: end };
        return results;
    };
    HelperService.prototype.formatObservations = function (results) {
        var dates = results.dates;
        var values = results.values;
        var pseudoHistory = results.pseudoHistory;
        var formattedResults = dates.map(function (d, index) {
            var entry = { date: '', value: Infinity, pseudoHistory: false };
            entry.date = d;
            entry.value = +values[index];
            entry.pseudoHistory = pseudoHistory[index];
            return entry;
        });
        return formattedResults;
    };
    HelperService.prototype.seriesTable = function (seriesData, dateRange, decimals) {
        var _this = this;
        var table = [];
        dateRange.forEach(function (date) {
            table.push({ date: date.date, tableDate: date.tableDate, value: Infinity, yoyValue: Infinity, ytdValue: Infinity, c5maValue: Infinity });
        });
        seriesData.forEach(function (data) {
            var seriesDate = data.tableDate ? data.tableDate : data.date;
            var tableEntry = table.find(function (date) { return data.tableDate ? date.tableDate === seriesDate : date.date === seriesDate; });
            tableEntry.value = data.value;
            tableEntry.formattedValue = data.value === null ? ' ' : _this.formatNum(+data.value, decimals);
            tableEntry.yoyValue = data.yoyValue;
            tableEntry.formattedYoy = data.yoyValue === null ? ' ' : _this.formatNum(+data.yoyValue, decimals);
            tableEntry.ytdValue = data.ytdValue;
            tableEntry.formattedYtd = data.ytdValue === null ? ' ' : _this.formatNum(+data.ytdValue, decimals);
            tableEntry.c5maValue = data.c5maValue;
            tableEntry.formattedC5ma = data.c5maValue === null ? ' ' : _this.formatNum(+data.c5maValue, decimals);
        });
        return table;
    };
    HelperService.prototype.seriesChart = function (seriesData, dateRange) {
        var levelValue = [];
        var yoyValue = [];
        var ytdValue = [];
        var c5maValue = [];
        dateRange.forEach(function (date) {
            var data = seriesData.find(function (obs) { return obs.date === date.date; });
            if (data) {
                levelValue.push([Date.parse(date.date), data.value]);
                yoyValue.push([Date.parse(date.date), data.yoyValue]);
                ytdValue.push([Date.parse(date.date), data.ytdValue]);
                c5maValue.push([Date.parse(date.date), data.c5maValue]);
            }
            else {
                levelValue.push([Date.parse(date.date), null]);
                yoyValue.push([Date.parse(date.date), null]);
                ytdValue.push([Date.parse(date.date), null]);
                c5maValue.push([Date.parse(date.date), null]);
            }
        });
        return { level: levelValue, yoy: yoyValue, ytd: ytdValue, c5ma: c5maValue };
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
    HelperService.prototype.combineObsData = function (level, yoy, ytd, c5ma) {
        var data;
        data = level.map(function (obs) {
            var obsObject = { date: obs.date, yoyValue: null, ytdValue: null, c5maValue: null, value: +obs.value };
            if (yoy) {
                var yoyObs = yoy.find(function (y) { return y.date === obs.date; });
                obsObject.yoyValue = yoyObs ? +yoyObs.value : null;
            }
            if (ytd) {
                var ytdObs = ytd.find(function (y) { return y.date === obs.date; });
                obsObject.ytdValue = ytdObs ? +ytdObs.value : null;
            }
            if (c5ma) {
                var c5maObs = c5ma.find(function (c) { return c.date === obs.date; });
                obsObject.c5maValue = c5maObs ? +c5maObs.value : null;
            }
            return obsObject;
        });
        return data;
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
            // Check if decimal string contains only 0's (i.e. return value === 0.00)
            return /^0*$/.test(decimalString) ? returnValue : '-' + returnValue;
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
        var _this = this;
        freqList.forEach(function (freq) {
            if (!_this.freqExist(geo.freqs, freq.freq)) {
                geo.freqs.push(freq);
            }
        });
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
        var _this = this;
        geoList.forEach(function (geo) {
            if (!_this.geoExist(freq.geos, geo.handle)) {
                freq.geos.push(geo);
            }
        });
    };
    HelperService.prototype.setDefaultChartRange = function (freq, dataArray, defaults) {
        var defaultEnd = defaults.end;
        var counter = dataArray.length - 1;
        while (new Date(dataArray[counter][0]).toISOString().substr(0, 4) > defaultEnd) {
            counter--;
        }
        return this.getRanges(freq, counter, defaults.range);
    };
    HelperService.prototype.setDefaultSliderRange = function (freq, dateArray, defaults) {
        var defaultEnd = defaults.end;
        var counter = dateArray.length - 1;
        // https://github.com/IonDen/ion.rangeSlider/issues/298
        // Slider values being converted from strings to numbers for annual dates
        while (new Date(dateArray[counter].toString().substr(0, 4)).toISOString().substr(0, 4) > defaultEnd) {
            counter--;
        }
        return this.getRanges(freq, counter, defaults.range);
    };
    HelperService.prototype.setDefaultTableRange = function (freq, dateArray, defaults) {
        var defaultEnd = defaults.end;
        var counter = dateArray.length - 1;
        while (new Date(dateArray[counter].date).toISOString().substr(0, 4) > defaultEnd) {
            counter--;
        }
        return this.getRanges(freq, counter, defaults.range);
    };
    HelperService.prototype.getRanges = function (freq, counter, range) {
        // Range = default amount of years to display
        if (freq === 'A') {
            return { start: counter - 1 * range, end: counter };
        }
        if (freq === 'Q') {
            return { start: counter - 4 * range, end: counter };
        }
        if (freq === 'S') {
            return { start: counter - 2 * range, end: counter };
        }
        if (freq === 'M') {
            return { start: counter - 12 * range, end: counter };
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], HelperService);

//# sourceMappingURL=helper.service.js.map

/***/ }),

/***/ "../../../../../src/app/highchart/highchart.component.html":
/***/ (function(module, exports) {

module.exports = "<chart class=\"multi-chart\" [options]=\"options\" (load)=\"render($event.context)\"></chart>\n"

/***/ }),

/***/ "../../../../../src/app/highchart/highchart.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n/* Analyzer Chart */\n/* Loading Screen */\n.multi-chart {\n  width: 200px;\n  height: 200px;\n  /* @media (max-width: 991px) {\n        width: 100%;\n        height: 150px;\n    } */ }\n  .multi-chart .highcharts-tooltip {\n    -webkit-filter: none !important;\n            filter: none !important; }\n  .multi-chart .highcharts-background {\n    fill: #FAFAFB; }\n  .multi-chart .highcharts-grid-line, .multi-chart .highcharts-axis-line, .multi-chart .highcharts-color-0 {\n    stroke: none; }\n  .multi-chart .highcharts-series-0 .highcharts-graph {\n    stroke: #1D667F; }\n  .multi-chart .highcharts-graph.highcharts-zone-graph-0.pseudoHistory {\n    stroke: #7CB5EC;\n    color: #7CB5EC;\n    stroke-dasharray: 5; }\n  .multi-chart .highcharts-series-1 .highcharts-graph {\n    stroke: none; }\n  .multi-chart .highcharts-series-1 rect.highcharts-point {\n    stroke: none;\n    fill: none; }\n  .multi-chart .highcharts-markers.highcharts-series-0 path {\n    fill: #1D667F; }\n  .multi-chart .highcharts-markers.highcharts-series-1 path {\n    fill: none; }\n  .multi-chart .highcharts-no-data {\n    color: #505050 !important;\n    font-size: 0.85em !important; }\n  .multi-chart .highcharts-title {\n    color: #505050 !important;\n    font-size: 0.9em !important;\n    letter-spacing: 0.05em; }\n  .multi-chart .highcharts-tooltip {\n    font-size: 0.9em;\n    line-height: 1.25em; }\n    .multi-chart .highcharts-tooltip .highcharts-tooltip-box {\n      fill: none; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/highchart/highchart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HighchartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_service__ = __webpack_require__("../../../../../src/app/helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_highcharts__ = __webpack_require__("../../../../highcharts/js/highstock.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_highcharts__);
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
    function HighchartComponent(defaultRange, _helper) {
        this.defaultRange = defaultRange;
        this._helper = _helper;
    }
    HighchartComponent.findLastValue = function (valueArray) {
        var counter = valueArray.length - 1;
        while (valueArray[counter].y === null) {
            counter--;
            if (counter === -1) {
                return null;
            }
        }
        return counter;
    };
    HighchartComponent.prototype.ngOnInit = function () {
        if (this.seriesData.seriesInfo === 'No data available' || this.seriesData.chartData.level.length === 0) {
            this.noDataChart(this.seriesData);
        }
        else {
            this.drawChart(this.seriesData, this.currentFreq, this.portalSettings, this.minValue, this.maxValue, this.chartStart, this.chartEnd);
        }
    };
    HighchartComponent.prototype.ngOnChanges = function () {
        this.drawChart(this.seriesData, this.currentFreq, this.portalSettings, this.minValue, this.maxValue, this.chartStart, this.chartEnd);
    };
    HighchartComponent.prototype.drawChart = function (seriesData, currentFreq, portalSettings, min, max, start, end) {
        var series0 = seriesData.categoryChart.chartData[portalSettings.highcharts.series0Name];
        var series1 = seriesData.categoryChart.chartData[portalSettings.highcharts.series1Name];
        series0 = series0 ? this.trimData(series0, start, end) : null;
        series1 = series1 ? this.trimData(series1, start, end) : null;
        var chartSeries = [];
        var minValue = min;
        var maxValue = max;
        var pseudoZones = seriesData.categoryChart.chartData.pseudoZones;
        var decimals = seriesData.seriesInfo.decimals ? seriesData.seriesInfo.decimals : 1;
        var percent = seriesData.seriesInfo.percent;
        var title = seriesData.seriesInfo.displayName;
        var dataFreq = currentFreq;
        var unitsShort = seriesData.seriesInfo.unitsLabelShort;
        chartSeries.push({
            name: portalSettings.highcharts.series0Name,
            type: portalSettings.highcharts.series0Type,
            yAxis: 1,
            data: series0,
            states: {
                hover: {
                    lineWidth: 2
                }
            },
            dataGrouping: {
                enabled: false
            },
            zoneAxis: 'x',
            zones: pseudoZones,
            zIndex: 1
        });
        if (series1) {
            chartSeries.push({
                name: portalSettings.highcharts.series1Name,
                type: portalSettings.highcharts.series1Type,
                data: series1,
                dataGrouping: {
                    enabled: false
                },
            });
        }
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
                        if (seriesName === 'level') {
                            return ': ';
                        }
                        if (seriesName === 'c5ma') {
                            return percent ? 'Annual Chg: ' : 'Annual % Chg: ';
                        }
                        if (seriesName === 'ytd' && freq === 'A') {
                            return percent ? 'Year/Year Chg: ' : 'Year/Year % Chg: ';
                        }
                        if (seriesName === 'ytd' && freq !== 'A') {
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
                        var displayValue = __WEBPACK_IMPORTED_MODULE_2_highcharts__["numberFormat"](point.y, decimals);
                        var formattedValue = displayValue === '-0.00' ? '0.00' : displayValue;
                        var name = getLabelName(point.series.name, dataFreq, percent);
                        var label = name + formattedValue;
                        if (point.series.name === 'level') {
                            label += ' (' + unitsShort + ') <br>';
                        }
                        if (pseudoZones.length > 0) {
                            pseudoZones.forEach(function (zone) {
                                if (point.x < zone.value) {
                                    var otherSeriesLabel = pseudo + name + formattedValue;
                                    var levelLabel = otherSeriesLabel + ' (' + unitsShort + ') <br>';
                                    s += point.series.name === 'level' ? levelLabel : otherSeriesLabel;
                                    s += pseudo + name + formattedValue;
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
                },
                useHTML: true
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
                    minTickInterval: 0.01,
                }, {
                    title: {
                        text: ''
                    },
                    labels: {
                        enabled: false
                    },
                    min: minValue,
                    max: maxValue,
                    minTickInterval: 0.01,
                    opposite: true
                }],
            plotOptions: {
                line: {
                    marker: {
                        enabled: false
                    }
                }
            },
            series: chartSeries,
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
        var latestSeries0, latestSeries1;
        var series0 = this.chart.series[0];
        var series1 = this.chart.series[1];
        // Get position of last non-null value
        latestSeries0 = (series0 !== undefined) ? HighchartComponent_1.findLastValue(series0.points) : null;
        latestSeries1 = (series1 !== undefined) ? HighchartComponent_1.findLastValue(series1.points) : null;
        // Prevent tooltip from being hidden on mouseleave
        // Reset toolip value and marker to most recent observation
        this.chart.tooltip.hide = function () {
            if (latestSeries0 > 0 && latestSeries1 > 0) {
                this.chart.tooltip.refresh([series0.points[latestSeries0], series1.points[latestSeries1]]);
                series0.points[latestSeries0].setState('hover');
            }
            // Tooltip for charts that only displays 1 series (ex. NTA portal)
            if (latestSeries0 > 0 && !latestSeries1) {
                this.chart.tooltip.refresh([series0.points[latestSeries0]]);
                series0.points[latestSeries0].setState('hover');
            }
        };
        // Display tooltip when chart loads
        if (latestSeries0 > 0 && latestSeries1 > 0) {
            this.chart.tooltip.refresh([series0.points[latestSeries0], series1.points[latestSeries1]]);
        }
        // If there are no YTD values
        if (latestSeries0 && !latestSeries1) {
            this.chart.tooltip.refresh([series0.points[latestSeries0]]);
        }
    };
    HighchartComponent.prototype.trimData = function (dataArray, start, end) {
        var defaultRanges = this._helper.setDefaultChartRange(this.currentFreq, dataArray, this.defaultRange);
        var startIndex = defaultRanges.start, endIndex = defaultRanges.end;
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighchartComponent.prototype, "portalSettings", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighchartComponent.prototype, "seriesData", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighchartComponent.prototype, "currentFreq", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighchartComponent.prototype, "chartStart", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighchartComponent.prototype, "chartEnd", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighchartComponent.prototype, "minValue", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighchartComponent.prototype, "maxValue", void 0);
HighchartComponent = HighchartComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-highchart',
        template: __webpack_require__("../../../../../src/app/highchart/highchart.component.html"),
        styles: [__webpack_require__("../../../../../src/app/highchart/highchart.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('defaultRange')),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__helper_service__["a" /* HelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__helper_service__["a" /* HelperService */]) === "function" && _a || Object])
], HighchartComponent);

var HighchartComponent_1, _a;
//# sourceMappingURL=highchart.component.js.map

/***/ }),

/***/ "../../../../../src/app/highstock/highstock.component.html":
/***/ (function(module, exports) {

module.exports = "<chart id=\"chart\" type=\"StockChart\" [options]=\"options\" (load)=\"setTableExtremes($event)\">\n  <xAxis (afterSetExtremes)=\"updateExtremes($event)\"></xAxis>\n</chart>"

/***/ }),

/***/ "../../../../../src/app/highstock/highstock.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n/* Analyzer Chart */\n/* Loading Screen */\n#chart {\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.15);\n  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.15);\n  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.15); }\n  #chart .highcharts-background {\n    fill: #FAFAFB; }\n  #chart .highcharts-button, #chart .highcharts-button-hover {\n    stroke: none; }\n  #chart .highcharts-button.highcharts-button-pressed {\n    fill: #1D667F; }\n    #chart .highcharts-button.highcharts-button-pressed text {\n      fill: #FFF !important; }\n  #chart .highcharts-color-0, #chart .highcharts-color-1 {\n    fill: none;\n    stroke: none; }\n  #chart .highcharts-markers.highcharts-series-0 path {\n    fill: #9E9E9E; }\n  #chart .highcharts-graph.highcharts-zone-graph-0.pseudoHistory {\n    stroke: #7CB5EC;\n    color: #7CB5EC;\n    stroke-dasharray: 5; }\n  #chart .highcharts-markers.highcharts-series-1 path {\n    fill: #1D667F; }\n  #chart .highcharts-navigator-series .highcharts-area {\n    fill: #1D667F; }\n  #chart .highcharts-navigator-handle {\n    stroke: #999999; }\n  #chart .highcharts-series-0 .highcharts-graph {\n    stroke: #9E9E9E; }\n  #chart .highcharts-series-0 rect.highcharts-point {\n    stroke: none;\n    fill: #9E9E9E; }\n  #chart .highcharts-series-1 .highcharts-graph {\n    stroke: #1D667F;\n    color: #1D667F; }\n  #chart .highcharts-title {\n    fill: #505050;\n    font-family: 'sans-serif'; }\n  #chart .highcharts-tooltip {\n    -webkit-filter: none !important;\n            filter: none !important; }\n    #chart .highcharts-tooltip .series-0 {\n      fill: #9E9E9E; }\n    #chart .highcharts-tooltip .series-1 {\n      fill: #1D667F; }\n  #chart .highcharts-xaxis-labels text {\n    color: #9E9E9E !important;\n    fill: #9E9E9E !important; }\n  #chart .highcharts-yaxis-grid.series2 .highcharts-grid-line {\n    display: none; }\n  #chart .highcharts-yaxis-labels.series1 text {\n    color: #9E9E9E !important;\n    fill: #9E9E9E !important; }\n  #chart .highcharts-yaxis-labels.series2 text {\n    color: #1D667F !important;\n    fill: #1D667F !important; }\n  #chart .highcharts-yaxis.series1 .highcharts-axis-title {\n    color: #9E9E9E !important;\n    fill: #9E9E9E !important; }\n  #chart .highcharts-yaxis.series2 .highcharts-axis-title {\n    color: #1D667F !important;\n    fill: #1D667F !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/highstock/highstock.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HighstockComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
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
    function HighstockComponent(defaultRange) {
        this.defaultRange = defaultRange;
        // Async EventEmitter, emit tableExtremes on load to render table
        this.tableExtremes = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](true);
        // When user updates range selected, emit chartExtremes to update URL params
        this.chartExtremes = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](true);
    }
    HighstockComponent.prototype.ngOnChanges = function () {
        this.drawChart(this.chartData, this.seriesDetail, this.currentGeo, this.currentFreq, this.portalSettings);
        // Emit dates when user selects a new range
        var $chart = $('#chart');
        var chartExtremes = this.chartExtremes;
        var tableExtremes = this.tableExtremes;
        $chart.bind('click', function () {
            var xAxis = $chart.highcharts().xAxis[0];
            if (xAxis._hasSetExtremes) {
                var extremes = { minDate: xAxis._extremes.min, maxDate: xAxis._extremes.max };
                tableExtremes.emit(extremes);
                chartExtremes.emit(extremes);
            }
            xAxis._hasSetExtremes = false;
        });
    };
    HighstockComponent.prototype.drawChart = function (chartData, seriesDetail, geo, freq, portalSettings) {
        var series0 = chartData[portalSettings.highstock.series0Name];
        var series1 = chartData[portalSettings.highstock.series1Name];
        var series2 = chartData[portalSettings.highstock.series2Name];
        var decimals = seriesDetail.decimals ? seriesDetail.decimals : 1;
        var pseudoZones = chartData.pseudoZones;
        var name = seriesDetail.title;
        var units = seriesDetail.unitsLabel ? seriesDetail.unitsLabel : seriesDetail.unitsLabelShort;
        var change = seriesDetail.percent ? 'Change' : '% Change';
        var yoyLabel = seriesDetail.percent ? 'YOY Change' : 'YOY % Change';
        var ytdLabel = seriesDetail.percent ? 'YTD Change' : 'YTD % Change';
        var c5maLabel = seriesDetail.percent ? 'Annual Change' : 'Annual % Change';
        var sourceDescription = seriesDetail.sourceDescription;
        var sourceLink = seriesDetail.sourceLink;
        var sourceDetails = seriesDetail.sourceDetails;
        var chartRange = chartData.level ? this.getSelectedChartRange(this.start, this.end, chartData.level, this.defaultRange) : null;
        var startDate = this.start ? this.start : chartRange ? chartRange.start : null;
        var endDate = this.end ? this.end : chartRange ? chartRange.end : null;
        var seriesLabels = { yoy: yoyLabel, ytd: ytdLabel, c5ma: c5maLabel, none: ' ' };
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
                        html: name + ': ' + portalSettings.highstock.labels.seriesLink + seriesDetail.id
                    }, {
                        html: portalSettings.highstock.labels.portal,
                    }, {
                        html: portalSettings.highstock.labels.portalLink
                    }, {
                        html: 'Series: ' + name + ' (' + geo.name + ', ' + freq.label + ')'
                    }],
                style: {
                    display: 'none'
                }
            },
            rangeSelector: {
                selected: !startDate && !endDate ? 2 : null,
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
                    events: null,
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
                        text: portalSettings.highstock.credits,
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
                        var displayValue = Highcharts.numberFormat(point.y, decimals);
                        var formattedValue = displayValue === '-0.00' ? '0.00' : displayValue;
                        var seriesColor = '<br><span class="series-' + point.colorIndex + '">\u25CF</span> ';
                        var seriesNameValue = point.series.name + ': ' + formattedValue;
                        var label = seriesColor + seriesNameValue;
                        if (pseudoZones.length) {
                            pseudoZones.forEach(function (zone) {
                                if (point.x < zone.value) {
                                    return s += seriesColor + pseudo + seriesNameValue + '<br>';
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
                min: Date.parse(startDate),
                max: Date.parse(endDate),
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
                    maxPadding: 0,
                    minTickInterval: 0.01
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
                    maxPadding: 0,
                    minTickInterval: 0.01,
                    showLastLabel: true
                }],
            plotOptions: {
                series: {
                    cropThreshold: 0,
                }
            },
            series: [{
                    name: seriesLabels[portalSettings.highstock.series0Name],
                    type: portalSettings.highstock.series0Type,
                    data: series0,
                    showInNavigator: false,
                    dataGrouping: {
                        enabled: false
                    }
                }, {
                    name: 'Level',
                    type: 'line',
                    yAxis: 1,
                    data: series1,
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
                    name: seriesLabels[portalSettings.highstock.series2Name],
                    data: series2,
                    includeInCSVExport: freq.freq === 'A' ? false : true,
                    visible: false,
                    dataGrouping: {
                        enabled: false
                    }
                }]
        };
    };
    HighstockComponent.prototype.setTableExtremes = function (e) {
        // Workaround based on https://github.com/gevgeny/angular2-highcharts/issues/158
        // Exporting calls load event and creates empty e.context object, emitting wrong values to series table
        if (!this.chartObject || this.chartObject.series.length < 4) {
            this.chartObject = Object.assign({}, e.context);
        }
        var extremes = this.getChartExtremes(this.chartObject);
        if (extremes) {
            this.tableExtremes.emit({ minDate: extremes.min, maxDate: extremes.max });
        }
    };
    HighstockComponent.prototype.updateExtremes = function (e) {
        e.context._hasSetExtremes = true;
        e.context._extremes = this.getChartExtremes(e.context);
    };
    HighstockComponent.prototype.getChartExtremes = function (chartObject) {
        // Gets range of x values to emit
        // Used to redraw table in the single series view
        var xMin, xMax;
        // Selected level data
        var selectedRange = null;
        if (chartObject.series[0].points) {
            selectedRange = chartObject.series[0].points;
        }
        if (!chartObject.series[0].points.length) {
            return { min: null, max: null };
        }
        if (selectedRange.length) {
            xMin = new Date(selectedRange[0].x).toISOString().split('T')[0];
            xMax = new Date(selectedRange[selectedRange.length - 1].x).toISOString().split('T')[0];
            return { min: xMin, max: xMax };
        }
    };
    HighstockComponent.prototype.getSelectedChartRange = function (userStart, userEnd, levelData, defaults) {
        var counter = levelData.length ? levelData.length - 1 : null;
        while (new Date(levelData[counter][0]).toISOString().substr(0, 4) > defaults.end) {
            counter--;
        }
        var end = userEnd ? userEnd : new Date(levelData[counter][0]).toISOString().substr(0, 10);
        var defaultStartYear = +new Date(levelData[counter][0]).toISOString().substr(0, 4) - defaults.range;
        var start = userStart ? userStart : defaultStartYear + new Date(levelData[counter][0]).toISOString().substr(4, 6);
        return { start: start, end: end };
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "portalSettings", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "chartData", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "currentFreq", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "currentGeo", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "seriesDetail", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "start", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "end", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "tableExtremes", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], HighstockComponent.prototype, "chartExtremes", void 0);
HighstockComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-highstock',
        template: __webpack_require__("../../../../../src/app/highstock/highstock.component.html"),
        styles: [__webpack_require__("../../../../../src/app/highstock/highstock.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('defaultRange')),
    __metadata("design:paramtypes", [Object])
], HighstockComponent);

//# sourceMappingURL=highstock.component.js.map

/***/ }),

/***/ "../../../../../src/app/landing-page/landing-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"multi-series-container\">\n\t<ng-template ngFor let-data [ngForOf]=\"categoryData | async\">\n    <h2 class=\"selected-category\" [class.search-term]=\"search\" id=\"id_top\">{{data.selectedCategory}}</h2>\n    <p *ngIf=\"search && data.invalid\">No results found for \"{{data.invalid}}.\"</p>\n    <p *ngIf=\"!search && data.invalid\">{{data.invalid}}</p>\n\t\t<i *ngIf=\"search && !data.requestComplete && !data.invalid\" class=\"fa fa-spinner fa-pulse fa-fw\"></i>\n\t\t<ng-template ngFor let-sub [ngForOf]=\"data.sublist\" let-i=\"index\">\n\t\t\t<ul class=\"content-links\" *ngIf=\"data.sublist.length > 1\" [attr.id]=\"'id_' + sub.id\">\n\t\t\t\t<li *ngFor=\"let sub of data.sublist; let subInd='index'\">\n\t\t\t\t\t<a [routerLink]=\"['/category']\" [fragment]=\"sub.id\" [queryParams]=\"queryParams\" (click)=\"scrollTo()\" [class.current-sub]=\"subInd === i\">{{sub.name}}</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t\t<hr class=\"sublist-separator\" *ngIf=\"data.sublist.length > 1\">\n\t\t\t<div class=\"filters\">\n\t\t\t\t<app-geo-selector [regions]=\"data.regions\" [selectedGeo]=\"data.currentGeo\" (selectedGeoChange)=\"redrawSeriesGeo($event, data.currentFreq, sub.id)\"\n\t\t\t\t\tclass=\"selector\"></app-geo-selector>\n\t\t\t\t<app-freq-selector [freqs]=\"data.frequencies\" [selectedFreq]=\"data.currentFreq\" (selectedFreqChange)=\"redrawSeriesFreq($event, data.currentGeo, sub.id)\"\n\t\t\t\t\tclass=\"selector\"></app-freq-selector>\n\t\t\t\t<a *ngIf=\"routeView === 'table'\" (click)=\"switchView(sub.id)\" class=\"switch-view\">Chart View <i class=\"material-icons md-18\">show_chart</i></a>\n\t\t\t\t<a *ngIf=\"routeView === 'chart' || !routeView\" (click)=\"switchView(sub.id)\" class=\"switch-view\">Table View <i class=\"material-icons md-18\">view_list</i></a>\n\t\t\t\t<label *ngIf=\"routeView === 'table'\" class=\"form-check-inline\">\n          <input type=\"checkbox\" [checked]=\"queryParams.yoy === 'true'\" (change)=\"yoyActive($event, sub.id)\">Year/Year\n        </label>\n\t\t\t\t<label *ngIf=\"routeView === 'table' && data.currentFreq?.freq !== 'A'\" class=\"form-check-inline\">\n          <input type=\"checkbox\" [checked]=\"queryParams.ytd === 'true'\" (change)=\"ytdActive($event, sub.id)\">Year-to-Date\n        </label>\n        <app-date-slider class=\"sliders\" *ngIf=\"sub.requestComplete\" [portalSettings]=\"portalSettings\" [dates]=\"data.sliderDates\" [sublist]=\"data.sublist\" [subCat]=\"sub\" [dateFrom]=\"tableStart ? tableStart : null\" [dateTo]=\"tableEnd ? tableEnd: null\" [freq]=\"data.currentFreq?.freq\" (updateRange)=\"changeRange($event)\"></app-date-slider>\n        <app-category-datatables *ngIf=\"routeView === 'table' && sub.requestComplete\" [portalSettings]=\"portalSettings\" [geo]=\"data.currentGeo\" [freq]=\"data.currentFreq\" [yoy]=\"queryParams.yoy === 'true'\" [ytd]=\"queryParams.ytd === 'true'\" [categoryDates]=\"data.categoryDates\" [sublist]=\"sub\" [tableId]=\"sub.id\"></app-category-datatables>\n\t\t\t\t<i *ngIf=\"!sub.requestComplete || loading\" class=\"fa fa-spinner fa-pulse fa-fw\"></i>\n\t\t\t</div>\n\t\t\t<app-category-table *ngIf=\"routeView === 'table' && sub.requestComplete\" [dates]=\"data.categoryDates\" [tableStart]=\"tableStart\" [tableEnd]=\"tableEnd\" [subCats]=\"sub\" [data]=\"sub.displaySeries\" [freq]=\"data.currentFreq?.freq\" [subcatIndex]=\"sub.id\" [yoyActive]=\"queryParams.yoy === 'true'\" [ytdActive]=\"queryParams.ytd === 'true'\" [noSeries]=\"sub.noData\" [params]=\"queryParams\"></app-category-table>\n      <app-category-charts *ngIf=\"routeView !== 'table' && sub.requestComplete\" [portalSettings]=\"portalSettings\" [chartStart]=\"chartStart\" [chartEnd]=\"chartEnd\" [sublist]=\"sub\" [data]=\"sub.displaySeries\" [freq]=\"data.currentFreq?.freq\" [noSeries]=\"sub.noData\" [params]=\"queryParams\"></app-category-charts>\n\t\t</ng-template>\n\t</ng-template>\n</div>"

/***/ }),

/***/ "../../../../../src/app/landing-page/landing-page.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n/* Analyzer Chart */\n/* Loading Screen */\n.multi-series-container {\n  vertical-align: top;\n  min-height: 100%; }\n  .multi-series-container .fa-spinner {\n    color: #1D667F;\n    display: block;\n    margin: 20px; }\n  .multi-series-container .filters {\n    display: block;\n    color: #1D667F;\n    margin-bottom: 5px;\n    margin-right: 10px; }\n    .multi-series-container .filters .sliders {\n      display: inline-block;\n      width: 200px;\n      vertical-align: bottom;\n      margin-left: 10px;\n      margin-right: 10px; }\n  .multi-series-container .content-links:before {\n    display: block;\n    content: ' ';\n    margin-top: -100px;\n    height: 100px;\n    visibility: hidden; }\n  .multi-series-container .content-links {\n    padding-left: 0px;\n    display: inline-block;\n    margin-top: 10px;\n    margin-bottom: 0; }\n    .multi-series-container .content-links li {\n      display: inline-block; }\n      .multi-series-container .content-links li a {\n        text-decoration: none;\n        font-size: 0.85em;\n        color: #505050;\n        padding: 5px;\n        border-radius: 3px; }\n        .multi-series-container .content-links li a:hover {\n          color: #1D667F; }\n      .multi-series-container .content-links li .current-sub {\n        background: #1D667F;\n        color: #FFF; }\n        .multi-series-container .content-links li .current-sub:hover {\n          color: #FFF; }\n      @media (max-width: 767px) {\n        .multi-series-container .content-links li {\n          min-width: 50%;\n          margin-right: 0px; } }\n  .multi-series-container .selected-category {\n    display: inline-block;\n    color: #1D667F;\n    font-size: 1.4em;\n    margin: 0px;\n    vertical-align: middle;\n    text-transform: capitalize; }\n    @media (min-width: 768px) {\n      .multi-series-container .selected-category {\n        display: none; } }\n  .multi-series-container .search-term {\n    display: block; }\n  .multi-series-container .top-anchor {\n    display: block;\n    content: ' ';\n    margin-top: -250px;\n    height: 250px;\n    visibility: hidden; }\n  .multi-series-container .sublist {\n    color: #1D667F;\n    font-size: 1.2em;\n    margin-bottom: 0px; }\n  .multi-series-container .sublist-separator {\n    margin-top: 0rem;\n    margin-bottom: 0.5rem;\n    background-color: #1D667F;\n    height: 2px; }\n  .multi-series-container .material-icons.md-18 {\n    font-size: 18px;\n    color: #F6A01B;\n    vertical-align: middle; }\n  .multi-series-container .switch-view {\n    text-decoration: none;\n    font-size: 0.85em;\n    color: #1D667F;\n    vertical-align: middle;\n    cursor: pointer; }\n    @media (max-width: 767px) {\n      .multi-series-container .switch-view {\n        display: none; } }\n  .multi-series-container .multi-charts-row {\n    display: block;\n    margin-bottom: 40px; }\n  .multi-series-container .no-data {\n    margin-top: 10px; }\n  @media (min-width: 768px) {\n    .multi-series-container {\n      margin-top: 70px; } }\n  @media (max-width: 767px) {\n    .multi-series-container {\n      margin-top: 50px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/landing-page/landing-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingPageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__ = __webpack_require__("../../../../../src/app/uhero-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__category_helper_service__ = __webpack_require__("../../../../../src/app/category-helper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_portal_settings_service__ = __webpack_require__("../../../../../src/app/data-portal-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
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
// Component for multi-chart view






var LandingPageComponent = (function () {
    function LandingPageComponent(portal, _uheroAPIService, _dataPortalSettings, _catHelper, route, _router, cdRef) {
        this.portal = portal;
        this._uheroAPIService = _uheroAPIService;
        this._dataPortalSettings = _dataPortalSettings;
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
        this.portalSettings = this._dataPortalSettings.dataPortalSettings[this.portal];
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
            return null;
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
        if (geo && freq) {
            return (typeof id === 'number' || id === null) ?
                this._catHelper.initContent(id, geo, freq) :
                this._catHelper.initSearch(id, geo, freq);
        }
        if (!geo && !freq) {
            return (typeof id === 'number' || id === null) ?
                this._catHelper.initContent(id) :
                this._catHelper.initSearch(id);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-landing-page',
        template: __webpack_require__("../../../../../src/app/landing-page/landing-page.component.html"),
        styles: [__webpack_require__("../../../../../src/app/landing-page/landing-page.component.scss")]
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('portal')),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__["a" /* UheroApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__uhero_api_service__["a" /* UheroApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__data_portal_settings_service__["a" /* DataPortalSettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__data_portal_settings_service__["a" /* DataPortalSettingsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__category_helper_service__["a" /* CategoryHelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__category_helper_service__["a" /* CategoryHelperService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _f || Object])
], LandingPageComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=landing-page.component.js.map

/***/ }),

/***/ "../../../../../src/app/nta-help/nta-help.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>About</h2>\n<ol>\n<li>Baseline country estimates are deflated (inflated) to 2010 local currency units, and converted to 2010 PPP dollars using\n    deflators and exchange rates from the World Bank Development Indicators.</li>\n<li>Country group estimates refer to the aggregate of estimates for 181 countries in our NTA sample only. Counts and monetary\n    values are summed over countries within country groups, which are then used to calculate country group estimates of indicator\n    ratios, and growth rates.</li>\n<li>Melanesia, Micronesia and Polynesia are combined to form the Pacific Islands sub-region due to insufficient number of observations\n    within the original sub-regions.</li>\n<li>Assumptions: Discount rate =0.030, Productivity growth rate = 0.015; Population projections are based on UN WPP 2017 medium\n    variant projection.</li>\n</ol>"

/***/ }),

/***/ "../../../../../src/app/nta-help/nta-help.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ol {\n  padding-left: 15px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/nta-help/nta-help.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NtaHelpComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NtaHelpComponent = (function () {
    function NtaHelpComponent() {
    }
    return NtaHelpComponent;
}());
NtaHelpComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-nta-help',
        template: __webpack_require__("../../../../../src/app/nta-help/nta-help.component.html"),
        styles: [__webpack_require__("../../../../../src/app/nta-help/nta-help.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], NtaHelpComponent);

//# sourceMappingURL=nta-help.component.js.map

/***/ }),

/***/ "../../../../../src/app/search-bar/search-bar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-4 col-lg-3 search-bar\">\n    <div class=\"input-group\">\n        <input type=\"text\" class=\"form-control\" aria-label=\"Search box\" placeholder=\"&#xF002;\" (keyup.enter)=\"search(searchTerm)\" #searchTerm>\n        <span class=\"input-group-btn\">\n            <button type=\"button\" (click)=\"search(searchTerm)\" class=\"btn\"><i class=\"material-icons md-18\">search</i></button>\n        </span>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/search-bar/search-bar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n/* Analyzer Chart */\n/* Loading Screen */\n.search-bar {\n  position: fixed;\n  top: 12px;\n  right: 30px; }\n  .search-bar .form-control {\n    padding: 0.25rem 1rem;\n    font-family: \"FontAwesome\", \"Lucida Sans\", sans-serif; }\n  .search-bar ::-webkit-input-placeholder {\n    color: #E5E5E5; }\n  .search-bar :-moz-placeholder {\n    color: #E5E5E5;\n    opacity: 1; }\n  .search-bar ::-moz-placeholder {\n    color: #E5E5E5;\n    opacity: 1; }\n  .search-bar :-ms-input-placeholder {\n    color: #E5E5E5; }\n  .search-bar .btn {\n    line-height: 1.15;\n    padding: 0.25rem 1rem;\n    background-color: #1D667F; }\n    .search-bar .btn .material-icons.md-18 {\n      font-size: 18px;\n      color: #FFF;\n      vertical-align: middle; }\n  @media (max-width: 767px) {\n    .search-bar {\n      position: relative;\n      top: 8px;\n      right: 3px; }\n      .search-bar .form-control {\n        border-top-right-radius: 0.25rem;\n        border-bottom-right-radius: 0.25rem; }\n      .search-bar .input-group-btn {\n        display: none; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/search-bar/search-bar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__google_analytics_events_service__ = __webpack_require__("../../../../../src/app/google-analytics-events.service.ts");
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
        if (searchTerm.value) {
            this.onSearch.emit(searchTerm.value);
            this.submitGAEvent(searchTerm.value);
            searchTerm.value = '';
        }
        if (!searchTerm.value) {
            return;
        }
    };
    // Google Analytics: Track search event
    SearchBarComponent.prototype.submitGAEvent = function (searchTerm) {
        this.googleAES.emitEvent('Search', 'search', searchTerm);
    };
    return SearchBarComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SearchBarComponent.prototype, "onSearch", void 0);
SearchBarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SeriesHelperService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__analyzer_service__ = __webpack_require__("../../../../../src/app/analyzer.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__uhero_api_service__ = __webpack_require__("../../../../../src/app/uhero-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_service__ = __webpack_require__("../../../../../src/app/helper.service.ts");
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
    function SeriesHelperService(_uheroAPIService, _analyzer, _helper) {
        this._uheroAPIService = _uheroAPIService;
        this._analyzer = _analyzer;
        this._helper = _helper;
    }
    SeriesHelperService.prototype.getSeriesData = function (id) {
        var _this = this;
        var currentFreq, currentGeo, decimals;
        this.seriesData = {
            seriesDetail: {},
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
        var analyzerSeries = this._analyzer.analyzerSeries;
        this._uheroAPIService.fetchSeriesDetail(id).subscribe(function (series) {
            _this.seriesData.seriesDetail = series;
            // Check if series is in the analyzer
            var existAnalyze = analyzerSeries.find(function (aSeries) { return aSeries.id === series.id; });
            _this.seriesData.seriesDetail.analyze = existAnalyze ? true : false;
            _this.seriesData.seriesDetail.saParam = series.seasonalAdjustment !== 'not_seasonally_adjusted';
            var freqGeos = series.freqGeos;
            var geoFreqs = series.geoFreqs;
            decimals = series.decimals ? series.decimals : 1;
            currentGeo = series.geography;
            currentFreq = { freq: series.frequencyShort, label: series.frequency };
            _this.seriesData.currentGeo = currentGeo;
            _this.seriesData.regions = freqGeos.length ? freqGeos.find(function (freq) { return freq.freq === currentFreq.freq; }).geos : [series.geography];
            _this.seriesData.frequencies = geoFreqs.length ? geoFreqs.find(function (geo) { return geo.handle === currentGeo.handle; }).freqs : [{ freq: series.frequencyShort, label: series.frequency }];
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
                // If a series has a seasonal and a non-seasonal sibling, display SA toggle in single series view
                _this.seriesData.saPairAvail = _this.checkSaPairs(geoFreqPair);
            });
            _this.getSeriesObservations(_this.seriesData.seriesDetail, decimals);
        });
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].forkJoin(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].of(this.seriesData));
    };
    SeriesHelperService.prototype.getSeriesObservations = function (seriesDetail, decimals) {
        var _this = this;
        var dateArray = [];
        this._uheroAPIService.fetchObservations(seriesDetail.id).subscribe(function (observations) {
            var obs = observations;
            seriesDetail.seriesObservations = obs;
            var levelData = obs.transformationResults[0].observations;
            var newLevelData = obs.transformationResults[0].dates;
            var obsStart = obs.observationStart;
            var obsEnd = obs.observationEnd;
            if (levelData || newLevelData) {
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
        if (seriesSiblings) {
            seriesSiblings.forEach(function (sibling) {
                if (geo === sibling.geography.handle && freq === sibling.frequencyShort) {
                    saSiblings.push(sibling);
                }
            });
            return saSiblings;
        }
    };
    SeriesHelperService.prototype.checkSaPairs = function (seriesSiblings) {
        if (seriesSiblings) {
            var saSeries = seriesSiblings.find(function (series) { return series.seasonalAdjustment === 'seasonally_adjusted'; });
            var nsaSeries = seriesSiblings.find(function (series) { return series.seasonalAdjustment === 'not_seasonally_adjusted'; });
            if (saSeries && nsaSeries) {
                return true;
            }
            return false;
        }
        return false;
    };
    // Get summary statistics for single series displays
    // Min & Max values (and their dates) for the selected date range; (%) change from selected range; level change from selected range
    SeriesHelperService.prototype.summaryStats = function (seriesData, freq, decimals, minDate, maxDate) {
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
        // Find observations in seriesData that match the selected minimum and maximum dates (duplicate dates may show up in analyzer table data)
        var minDateObs = seriesData.filter(function (obs) { return obs.date === minDate; });
        var maxDateObs = seriesData.filter(function (obs) { return obs.date === maxDate; });
        // Select observation where value is not Infinity
        var minDateData = minDateObs.find(function (obs) { return obs.value !== Infinity; });
        var maxDateData = maxDateObs.find(function (obs) { return obs.value !== Infinity; });
        stats.tableStartValue = minDateData ? minDateData.value : Infinity;
        stats.tableEndValue = maxDateData ? maxDateData.value : Infinity;
        stats.minValue = this.getMinMax(seriesData).minValue;
        stats.minValueDate = this.getMinMax(seriesData).minValueDate;
        stats.maxValue = this.getMinMax(seriesData).maxValue;
        stats.maxValueDate = this.getMinMax(seriesData).maxValueDate;
        if (stats.tableEndValue !== Infinity && stats.tableStartValue !== Infinity) {
            stats.percChange = ((stats.tableEndValue - stats.tableStartValue) / stats.tableStartValue) * 100;
            stats.levelChange = stats.tableEndValue - stats.tableStartValue;
        }
        // Format numbers
        formatStats.minValue = this._helper.formatNum(stats.minValue, decimals);
        formatStats.minValueDate = this._helper.formatDate(stats.minValueDate, freq.freq);
        formatStats.maxValue = this._helper.formatNum(stats.maxValue, decimals);
        formatStats.maxValueDate = this._helper.formatDate(stats.maxValueDate, freq.freq);
        formatStats.percChange = stats.percChange === Infinity ? ' ' : this._helper.formatNum(stats.percChange, decimals);
        formatStats.levelChange = stats.levelChange === Infinity ? ' ' : this._helper.formatNum(stats.levelChange, decimals);
        return formatStats;
    };
    SeriesHelperService.prototype.getMinMax = function (seriesData) {
        var minValue = Infinity, minValueDate = '', maxValue = Infinity, maxValueDate = '';
        seriesData.forEach(function (item, index) {
            if (minValue === Infinity || item.value < minValue) {
                minValue = item.value;
                minValueDate = item.date;
            }
            if (maxValue === Infinity || item.value > maxValue && item.value !== Infinity) {
                maxValue = item.value;
                maxValueDate = item.date;
            }
        });
        return { minValue: minValue, minValueDate: minValueDate, maxValue: maxValue, maxValueDate: maxValueDate };
    };
    return SeriesHelperService;
}());
SeriesHelperService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__uhero_api_service__["a" /* UheroApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__uhero_api_service__["a" /* UheroApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__analyzer_service__["a" /* AnalyzerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__analyzer_service__["a" /* AnalyzerService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__helper_service__["a" /* HelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__helper_service__["a" /* HelperService */]) === "function" && _c || Object])
], SeriesHelperService);

var _a, _b, _c;
//# sourceMappingURL=series-helper.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Shared; });
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__analyzer_analyzer_component__ = __webpack_require__("../../../../../src/app/analyzer/analyzer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__analyzer_table_analyzer_table_component__ = __webpack_require__("../../../../../src/app/analyzer-table/analyzer-table.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__analyzer_highstock_analyzer_highstock_component__ = __webpack_require__("../../../../../src/app/analyzer-highstock/analyzer-highstock.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__help_help_component__ = __webpack_require__("../../../../../src/app/help/help.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__help_directive__ = __webpack_require__("../../../../../src/app/help.directive.ts");
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
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
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
            __WEBPACK_IMPORTED_MODULE_14__geo_selector_geo_selector_component__["a" /* GeoSelectorComponent */],
            __WEBPACK_IMPORTED_MODULE_22__analyzer_analyzer_component__["a" /* AnalyzerComponent */],
            __WEBPACK_IMPORTED_MODULE_24__analyzer_highstock_analyzer_highstock_component__["a" /* AnalyzerHighstockComponent */],
            __WEBPACK_IMPORTED_MODULE_23__analyzer_table_analyzer_table_component__["a" /* AnalyzerTableComponent */],
            __WEBPACK_IMPORTED_MODULE_25__help_help_component__["a" /* HelpComponent */],
            __WEBPACK_IMPORTED_MODULE_26__help_directive__["a" /* HelpDirective */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_6_angular2_highcharts__["ChartModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */],
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

module.exports = "<nav id=\"sidebar-nav\" class=\"navbar navbar-fixed-top navbar-light bg-white\">\n  <div>\n    <button (click)=\"mobileMenuToggle()\" id=\"navbarSideButton\" class=\"hidden-md-up\" type=\"button\" data-toggle=\"collapse\" aria-controls=\"catNavbar\" aria-expanded=\"false\" aria-labal=\"Toggle Category Menu\">\n      &#9776;\n    </button>\n    <a class=\"navbar-brand\" routerLink=\"/\">\n      <img [src]=\"headerLogo\" alt=\"UHERO.data logo\">\n    </a>\n    <!-- <app-search-bar (onSearch)=\"onSearch($event)\"></app-search-bar> -->\n  </div>\n  <ul id=\"navbar-side\" class=\"navbar-side\" [class.reveal]=\"reveal\">\n    <app-search-bar (onSearch)=\"onSearch($event)\"></app-search-bar>\n    <hr class=\"mobile-divider\">\n    <li class=\"list-item\" *ngFor=\"let category of categories, let cat = index\" [class.selectedCategory]=\"category.id === selectedCategory\">\n      <a (click)=\"navigate(category.id)\">&nbsp; {{category.name}} <i [id]=\"category.id\" *ngIf=\"loading && category.id === selectedCategory\" class=\"fa fa-spinner fa-pulse fa-fw\"></i></a>\n    </li>\n    <hr class=\"mobile-divider\">\n    <li class=\"list-item\" id=\"about-link\" [class.selectedCategory]=\"selectedCategory === 'help'\"><a routerLink=\"/help\">&nbsp; About</a></li>\n    <hr>\n    <li class=\"list-item\" [class.selectedCategory]=\"selectedCategory === 'analyzer'\"><a routerLink=\"/analyzer\" *ngIf=\"analyzerSeries\">&nbsp; Analyzer ({{analyzerSeries.length}})</a></li>\n  </ul>\n  <div [class.overlay]=\"overlay\" (click)=\"mobileMenuToggle()\"></div>\n</nav>"

/***/ }),

/***/ "../../../../../src/app/sidebar-nav/sidebar-nav.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n/* Analyzer Chart */\n/* Loading Screen */\n@media (max-width: 767px) {\n  .navbar {\n    background-color: #FFF;\n    padding: 0;\n    box-shadow: 0 4px 6px -6px #000;\n    -moz-box-shadow: 0 4px 6px -6px #000;\n    -webkit-box-shadow: 0 4px 6px -6px #000; } }\n\n@media (min-width: 768px) {\n  #sidebar-nav .navbar-brand {\n    display: none; } }\n\n@media (max-width: 767px) {\n  #sidebar-nav .navbar-brand {\n    float: none;\n    padding: 0;\n    margin: 0; } }\n\n#sidebar-nav .navbar-brand img {\n  height: 38px;\n  padding: 5px; }\n\n@media (min-width: 768px) {\n  #sidebar-nav {\n    margin-top: 65px;\n    position: relative;\n    padding: 0; } }\n\n#sidebar-nav button {\n  background-color: #FFF;\n  border: none;\n  float: left;\n  font-size: 1.5em;\n  color: #505050; }\n  @media (min-width: 768px) {\n    #sidebar-nav button {\n      display: none; } }\n\n#sidebar-nav .navbar-side {\n  padding-left: 0px; }\n  @media (max-width: 543px) {\n    #sidebar-nav .navbar-side {\n      height: 100%;\n      width: 85%;\n      -webkit-transform: translateX(-100%);\n      transform: translateX(-100%);\n      transition: 300ms ease;\n      position: fixed;\n      top: 0;\n      left: 0;\n      padding: 0;\n      list-style: none;\n      background-color: #FAFAFB;\n      overflow-y: scroll;\n      z-index: 100; } }\n  @media (min-width: 544px) and (max-width: 767px) {\n    #sidebar-nav .navbar-side {\n      width: 50%;\n      height: 100%;\n      -webkit-transform: translateX(-100%);\n      transform: translateX(-100%);\n      transition: 300ms ease;\n      position: fixed;\n      top: 0;\n      left: 0;\n      padding: 0;\n      list-style: none;\n      border-left: 2px solid #E5E5E5;\n      background-color: #FAFAFB;\n      overflow-y: scroll;\n      z-index: 100; } }\n  @media (min-width: 768px) {\n    #sidebar-nav .navbar-side {\n      width: -webkit-fit-content;\n      width: -moz-fit-content;\n      width: fit-content; }\n      #sidebar-nav .navbar-side .mobile-divider {\n        display: none; }\n      #sidebar-nav .navbar-side #about-link {\n        display: none; } }\n\n@media (max-width: 767px) {\n  #sidebar-nav .reveal {\n    -webkit-transform: translateX(0%);\n    transform: translateX(0%);\n    transition: 300ms ease; } }\n\n#sidebar-nav .overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  cursor: pointer;\n  background-color: #E5E5E5;\n  opacity: 0.6;\n  z-index: 99; }\n\n#sidebar-nav .sidebar-list, #sidebar-nav .list-item {\n  list-style-type: none;\n  -webkit-padding-start: 1em;\n  color: #505050;\n  font-size: 0.9em;\n  cursor: pointer;\n  white-space: nowrap; }\n\n@media (min-width: 768px) {\n  #sidebar-nav .list-item {\n    height: 35px;\n    padding: 0 15px 0 5px; } }\n\n#sidebar-nav .list-item a {\n  font-size: 0.9em;\n  display: block;\n  text-decoration: none;\n  color: #505050;\n  line-height: 35px; }\n  #sidebar-nav .list-item a:active {\n    color: #FFF; }\n\n#sidebar-nav .list-item:hover {\n  background-color: #E5E5E5;\n  color: #FFF; }\n\n#sidebar-nav .selectedCategory {\n  background-color: #1D667F;\n  color: #FFF; }\n\n#sidebar-nav .selectedCategory a, #sidebar-nav .selectedCategory a:hover, #sidebar-nav .selectedCategory a:active {\n  color: #FFF; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/sidebar-nav/sidebar-nav.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarNavComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__analyzer_service__ = __webpack_require__("../../../../../src/app/analyzer.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__uhero_api_service__ = __webpack_require__("../../../../../src/app/uhero-api.service.ts");
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




var SidebarNavComponent = (function () {
    function SidebarNavComponent(defaultCategory, logo, _uheroAPIService, _analyzerService, route, _router) {
        this.defaultCategory = defaultCategory;
        this.logo = logo;
        this._uheroAPIService = _uheroAPIService;
        this._analyzerService = _analyzerService;
        this.route = route;
        this._router = _router;
        this.expand = null;
        this.reveal = false;
        this.overlay = false;
    }
    SidebarNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._uheroAPIService.fetchCategories().subscribe(function (categories) {
            _this.categories = categories;
        });
        this.route.queryParams.subscribe(function (params) {
            _this.id = params['id'];
            _this.view = params['view'] ? params['view'] : 'chart';
            _this.yoy = params['yoy'] ? params['yoy'] : 'false';
            _this.ytd = params['ytd'] ? params['ytd'] : 'false';
            _this.selectedCategory = _this.findSelectedCategory(_this.id);
        });
        this._router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["NavigationEnd"]) {
                var helpUrl = event.url === '/help';
                var analyzerUrl = event.url === '/analyzer';
                _this.selectedCategory = _this.checkRoute(_this.id, helpUrl, analyzerUrl);
            }
        });
        this.analyzerSeries = this._analyzerService.analyzerSeries;
        this.headerLogo = this.logo;
    };
    SidebarNavComponent.prototype.findSelectedCategory = function (id) {
        if (id === undefined) {
            return this.defaultCategory;
        }
        if (id && isNaN(id)) {
            return null;
        }
        if (id && +id) {
            return +id;
        }
    };
    SidebarNavComponent.prototype.checkRoute = function (id, help, analyzer) {
        if (help) {
            return 'help';
        }
        if (analyzer) {
            return 'analyzer';
        }
        return this.findSelectedCategory(id);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-sidebar-nav',
        template: __webpack_require__("../../../../../src/app/sidebar-nav/sidebar-nav.component.html"),
        styles: [__webpack_require__("../../../../../src/app/sidebar-nav/sidebar-nav.component.scss")]
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('defaultCategory')),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('logo')),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__uhero_api_service__["a" /* UheroApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__uhero_api_service__["a" /* UheroApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__analyzer_service__["a" /* AnalyzerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__analyzer_service__["a" /* AnalyzerService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _d || Object])
], SidebarNavComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=sidebar-nav.component.js.map

/***/ }),

/***/ "../../../../../src/app/single-series/single-series.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let data of seriesData | async\" class=\"single-series-view col-xs-12 col-sm-12 col-xl-11\">\n  <p *ngIf=\"data.error\">Series does not exist.</p>\n  <div *ngIf=\"!data.error\">\n    <h3 class=\"series-title\">{{data.seriesDetail.title}}</h3>\n    <app-geo-selector *ngIf=\"data.regions\" [regions]=\"data.regions\" [(selectedGeo)]=\"data.currentGeo\" (selectedGeoChange)=\"goToSeries(data.siblings, data.currentFreq.freq, $event.handle, seasonallyAdjusted)\"\n      class=\"geo-selector\"></app-geo-selector>\n    <app-freq-selector *ngIf=\"portal !== 'nta' && data.frequencies\" [freqs]=\"data.frequencies\" [(selectedFreq)]=\"data.currentFreq\"\n      (selectedFreqChange)=\"goToSeries(data.siblings, $event.freq, data.currentGeo.handle, seasonallyAdjusted)\" class=\"freq-selector\"></app-freq-selector>\n    <i *ngIf=\"data.seriesDetail\" [title]=\"data.seriesDetail.analyze ? 'Remove from Analyzer' : 'Add to Analyzer'\" [class.add-button]=\"!data.seriesDetail.analyze\" [class.remove-button]=\"data.seriesDetail.analyze\" class=\"material-icons analyze-button remove-button\" (click)=\"updateAnalyze(data.seriesDetail, data.seriesTableData, data.chartData)\">&#xE838;</i>\n    <div class=\"form-check\" *ngIf=\"data.saPairAvail\">\n      <label class=\"form-check-inline\">\n        <input type=\"checkbox\" [(ngModel)]=\"seasonallyAdjusted\"  (ngModelChange)=\"goToSeries(data.siblings, data.currentFreq.freq, data.currentGeo.handle, $event)\">Seasonally Adjusted\n      </label>\n    </div>\n    <p *ngIf=\"noSelection\">{{noSelection}}</p>\n    <p *ngIf=\"data.noData\">{{data.noData}}</p>\n    <app-highstock *ngIf=\"!noSelection && !data.noData\" [portalSettings]=\"portalSettings\" [start]=\"startDate\" [end]=\"endDate\"\n      [chartData]=\"data.chartData\" [seriesDetail]=\"data.seriesDetail\" [currentFreq]=\"data.currentFreq\" [currentGeo]=\"data.currentGeo\"\n      (chartExtremes)=\"updateChartExtremes($event)\" (tableExtremes)=\"redrawTable($event, data.seriesDetail, data.seriesTableData, data.currentFreq)\"></app-highstock>\n    <div class=\"source\" *ngIf=\"data.seriesDetail.source_description || data.seriesDetail.source_link\">\n      {{data.seriesDetail.source_description}}<br><a href=\"{{data.seriesDetail.source_link}}\" target=\"_blank\">{{data.seriesDetail.source_link}}</a>\n      <p innerHTML='{{data.seriesDetail.sourceDetails}}' class=\"source_detail\"></p>\n    </div>\n    <div class=\"summary-stats\" *ngIf=\"!noSelection && !data.noData && summaryStats\">\n      <div class=\"stat\">\n        <p>Min ({{summaryStats.minValueDate}}):<br><b>{{summaryStats.minValue}}</b> ({{data.seriesDetail.unitsLabelShort}})</p>\n      </div>\n      <div class=\"stat\">\n        <p>Max ({{summaryStats.maxValueDate}}):<br><b>{{summaryStats.maxValue}}</b> ({{data.seriesDetail.unitsLabelShort}})</p>\n      </div>\n      <div class=\"stat\" *ngIf=\"!data.seriesDetail.percent\">\n        <p>% Change over Selected Range:<br><b>{{summaryStats.percChange}}</b></p>\n      </div>\n      <div class=\"stat\">\n        <p>Change over Selected Range:<br><b>{{summaryStats.levelChange}}</b></p>\n      </div>\n    </div>\n    <div class=\"series-table\">\n      <p-dataTable *ngIf=\"!noSelection && !data.noData\" [value]=\"newTableData\">\n        <p-column field=\"tableDate\" header=\"Date\" [sortable]=\"true\"></p-column>\n        <p-column [field]=portalSettings.seriesTable.series1 header=\"Level\"></p-column>\n        <p-column [field]=portalSettings.seriesTable.series2 [header]=\"data.seriesDetail.percent ? portalSettings.seriesTable.series2PercLabel : portalSettings.seriesTable.series2Label\"></p-column>\n        <p-column *ngIf=\"data.currentFreq.freq !== 'A' && portalSettings.seriesTable.columns === 4\" [field]=\"portalSettings.seriesTable.series3\"\n          [header]=\"data.seriesDetail.percent ? portalSettings.seriesTable.series3PercLabel : portalSettings.seriesTable.series3Label\"></p-column>\n      </p-dataTable>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/single-series/single-series.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Highcharts */\n/* Analyzer Chart */\n/* Loading Screen */\n.single-series-view {\n  margin: 18% 0 2% 0;\n  vertical-align: top;\n  display: inline-block; }\n  @media (min-width: 768px) {\n    .single-series-view {\n      margin-top: 70px;\n      margin-bottom: 15px; } }\n  .single-series-view .form-check {\n    display: inline-block;\n    margin-left: 10px;\n    margin-bottom: 0;\n    font-size: 0.9em; }\n    .single-series-view .form-check input {\n      margin-right: 0.25rem; }\n  .single-series-view .series-title {\n    display: block;\n    font-size: 1.5em;\n    color: #1D667F;\n    letter-spacing: 0.05em; }\n    @media (min-width: 768px) {\n      .single-series-view .series-title {\n        margin: auto 10px auto 0;\n        display: inline-block;\n        vertical-align: middle; } }\n  .single-series-view .analyze-button {\n    color: rgba(240, 240, 240, 0.65);\n    cursor: pointer;\n    vertical-align: middle;\n    left: 10px;\n    margin-left: 5px;\n    font-size: 1em; }\n  .single-series-view .add-button {\n    text-shadow: 1px 2px 6px #FFF, 0 0 0 #000, 1px 2px 6px #FFF; }\n  .single-series-view .remove-button {\n    color: #F6A01B; }\n  .single-series-view .source {\n    width: 100%;\n    background-color: #FFF;\n    padding: 10px 10px 0 10px;\n    font-size: 0.9em;\n    margin-top: 1%;\n    text-align: center;\n    word-wrap: break-word;\n    overflow-wrap: break-word; }\n    .single-series-view .source .source_detail {\n      margin-bottom: 0; }\n    .single-series-view .source a {\n      color: #1D667F; }\n  .single-series-view .summary-stats {\n    width: 100%;\n    display: table;\n    table-layout: fixed;\n    background-color: #FFF;\n    padding: 10px 0;\n    margin: 1% 0; }\n    .single-series-view .summary-stats .stat {\n      display: table-cell;\n      text-align: center;\n      font-size: 0.9em; }\n      .single-series-view .summary-stats .stat p {\n        margin-bottom: 0;\n        color: #1D667F; }\n  .single-series-view .selectors {\n    margin: 0 auto; }\n    .single-series-view .selectors .geo-selector, .single-series-view .selectors .freq-selector {\n      display: inline-block; }\n  .single-series-view .single-chart-container {\n    margin: 2% 3%; }\n  .single-series-view .series-table th, .single-series-view .series-table td {\n    text-align: right;\n    font-family: 'Lucida Sans', sans-serif;\n    font-size: 0.9em;\n    border: 0;\n    border-right: 1px solid #E5E5E5; }\n  .single-series-view .series-table .ui-datatable th.ui-state-default {\n    background: #F5F5F5;\n    border: 1px solid #E5E5E5;\n    border-bottom: 0; }\n  .single-series-view .series-table th.ui-state-active {\n    background: #ebedf0;\n    color: #505050;\n    outline: 0; }\n  .single-series-view .series-table tr.ui-widget-content {\n    border-top-color: transparent;\n    border-bottom-color: transparent;\n    border-left: 1px solid #E5E5E5;\n    border-right: 1px solid #E5E5E5; }\n  .single-series-view .series-table tr:last-child {\n    border-bottom: 1px solid #E5E5E5; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/single-series/single-series.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SingleSeriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__analyzer_service__ = __webpack_require__("../../../../../src/app/analyzer.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__uhero_api_service__ = __webpack_require__("../../../../../src/app/uhero-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_portal_settings_service__ = __webpack_require__("../../../../../src/app/data-portal-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__series_helper_service__ = __webpack_require__("../../../../../src/app/series-helper.service.ts");
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






var SingleSeriesComponent = SingleSeriesComponent_1 = (function () {
    function SingleSeriesComponent(portal, _uheroAPIService, _dataPortalSettings, _series, _analyzer, route, _router, cdRef) {
        this.portal = portal;
        this._uheroAPIService = _uheroAPIService;
        this._dataPortalSettings = _dataPortalSettings;
        this._series = _series;
        this._analyzer = _analyzer;
        this.route = route;
        this._router = _router;
        this.cdRef = cdRef;
        this.seasonallyAdjusted = null;
    }
    SingleSeriesComponent.saFromSeasonalAdjustment = function (seasonalAdjustment) {
        return seasonalAdjustment !== 'not_seasonally_adjusted';
    };
    SingleSeriesComponent.selectSibling = function (geoFreqSiblings, sa, freq) {
        var saSeries = geoFreqSiblings.find(function (series) { return series.seasonalAdjustment === 'seasonally_adjusted'; });
        var nsaSeries = geoFreqSiblings.find(function (series) { return series.seasonalAdjustment === 'not_seasonally_adjusted'; });
        var naSeries = geoFreqSiblings.find(function (series) { return series.seasonalAdjustment === 'not_applicable'; });
        // If more than one sibling exists (i.e. seasonal & non-seasonal)
        // Select series where seasonalAdjustment matches sa setting
        if (freq === 'A') {
            return geoFreqSiblings[0].id;
        }
        if (saSeries && nsaSeries) {
            if (sa) {
                return geoFreqSiblings.find(function (sibling) { return sibling.seasonalAdjustment === 'seasonally_adjusted'; }).id;
            }
            return geoFreqSiblings.find(function (sibling) { return sibling.seasonalAdjustment === 'not_seasonally_adjusted'; }).id;
        }
        if (!saSeries && nsaSeries) {
            return nsaSeries.id;
        }
        if (saSeries && !nsaSeries) {
            return saSeries.id;
        }
        if (!saSeries && !nsaSeries) {
            return naSeries.id;
        }
    };
    SingleSeriesComponent.prototype.ngOnInit = function () {
        this.currentGeo = { fips: null, handle: null, name: null };
        this.currentFreq = { freq: null, label: null };
        this.portalSettings = this._dataPortalSettings.dataPortalSettings[this.portal];
    };
    SingleSeriesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            var seriesId = Number.parseInt(params['id']);
            if (params['sa'] !== undefined) {
                _this.seasonallyAdjusted = (params['sa'] === 'true');
            }
            if (params['category']) {
                _this.category = params['category'];
            }
            _this.seriesData = _this._series.getSeriesData(seriesId);
        });
        this.cdRef.detectChanges();
    };
    // Redraw chart when selecting a new region or frequency
    SingleSeriesComponent.prototype.goToSeries = function (siblings, freq, geo, sa) {
        this.seasonallyAdjusted = sa;
        this.noSelection = null;
        // Get array of siblings for selected geo and freq
        var geoFreqSib = this._series.findGeoFreqSibling(siblings, geo, freq);
        var id = geoFreqSib.length ? SingleSeriesComponent_1.selectSibling(geoFreqSib, sa, freq) : null;
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
    SingleSeriesComponent.prototype.updateAnalyze = function (seriesInfo, tableData, chartData) {
        this._analyzer.updateAnalyzer(seriesInfo, tableData, chartData);
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
        this.summaryStats = this._series.summaryStats(this.newTableData, freq, deciamls, minDate, maxDate);
    };
    return SingleSeriesComponent;
}());
SingleSeriesComponent = SingleSeriesComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-single-series',
        template: __webpack_require__("../../../../../src/app/single-series/single-series.component.html"),
        styles: [__webpack_require__("../../../../../src/app/single-series/single-series.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('portal')),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__uhero_api_service__["a" /* UheroApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__uhero_api_service__["a" /* UheroApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__data_portal_settings_service__["a" /* DataPortalSettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__data_portal_settings_service__["a" /* DataPortalSettingsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__series_helper_service__["a" /* SeriesHelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__series_helper_service__["a" /* SeriesHelperService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__analyzer_service__["a" /* AnalyzerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__analyzer_service__["a" /* AnalyzerService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _g || Object])
], SingleSeriesComponent);

var SingleSeriesComponent_1, _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=single-series.component.js.map

/***/ }),

/***/ "../../../../../src/app/table-helper.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TableHelperService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__google_analytics_events_service__ = __webpack_require__("../../../../../src/app/google-analytics-events.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TableHelperService = (function () {
    function TableHelperService(googleAES) {
        this.googleAES = googleAES;
    }
    TableHelperService.prototype.checkContainerHeight = function (previousHeight) {
        var container = $('.multi-series-container');
        var heightDiff = (previousHeight !== container.height());
        previousHeight = container.height();
        return { scroll: heightDiff, previousHeight: previousHeight };
    };
    TableHelperService.prototype.checkTableWidth = function (tableWidths) {
        var tables = $('.table');
        var widths = tableWidths;
        if (tables) {
            tables.each(function (index) {
                var widthDiff = (tableWidths[index] !== tables[index].scrollWidth);
                if (widthDiff) {
                    tables[index].scrollLeft = tables[index].scrollWidth;
                }
                widths[index] = tables[index].scrollWidth;
            });
        }
    };
    TableHelperService.prototype.tableScroll = function (tableEl) {
        try {
            tableEl._results.forEach(function (el) {
                el.nativeElement.scrollLeft = el.nativeElement.scrollWidth;
            });
        }
        catch (err) {
            console.log(err);
        }
    };
    TableHelperService.prototype.showPopover = function (seriesInfo, subcatIndex) {
        $('[data-toggle="tooltip"]').tooltip('hide');
        var popoverId = subcatIndex ? '#' + subcatIndex + seriesInfo.id : '#' + seriesInfo.id;
        var popover = $(popoverId).popover({
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
    TableHelperService.prototype.hideInfo = function (seriesId) {
        this.submitGAEvent(seriesId);
        $('[data-toggle="tooltip"]').tooltip('hide');
        $('.popover').popover('dispose');
    };
    // Google Analytics: Track clicking on series
    TableHelperService.prototype.submitGAEvent = function (seriesId) {
        var id = seriesId.toString();
        this.googleAES.emitEvent('series', 'click', id);
    };
    return TableHelperService;
}());
TableHelperService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__google_analytics_events_service__["a" /* GoogleAnalyticsEventsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__google_analytics_events_service__["a" /* GoogleAnalyticsEventsService */]) === "function" && _a || Object])
], TableHelperService);

var _a;
//# sourceMappingURL=table-helper.service.js.map

/***/ }),

/***/ "../../../../../src/app/uhero-api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UheroApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_mergeMap__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
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
    function UheroApiService(rootCategory, portal, http) {
        this.rootCategory = rootCategory;
        this.portal = portal;
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
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */]["apiUrl"];
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.headers.append('Authorization', 'Bearer -VI_yuv0UzZNy4av1SM5vQlkfPK_JKnpGfMzuJR7d0M=');
        this.requestOptionsArgs = { headers: this.headers };
    }
    // Get data from API
    // Gets all available categories. Used for navigation & displaying sublists
    UheroApiService.prototype.fetchCategories = function () {
        var _this = this;
        if (this.cachedCategories) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of(this.cachedCategories);
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
    UheroApiService.prototype.fetchGeographies = function () {
        var _this = this;
        if (this.cachedGeos) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of(this.cachedGeos);
        }
        else {
            var geos$_1 = this.http.get(this.baseUrl + "/geo", this.requestOptionsArgs)
                .map(mapData)
                .do(function (val) {
                _this.cachedGeos = val;
                geos$_1 = null;
            });
            return geos$_1;
        }
    };
    // Gets observations for series in a (sub) category
    UheroApiService.prototype.fetchExpanded = function (id, geo, freq) {
        var _this = this;
        if (this.cachedExpanded[id + geo + freq]) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of(this.cachedExpanded[id + geo + freq]);
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
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of(this.cachedSelectedCategory[id]);
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
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of(this.cachedSeries[id + geo + freq]);
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
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of(this.cachedSeriesDetail[id]);
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
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of(this.cachedSiblings[seriesId]);
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
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of(this.cachedGeoSeries[id + handle]);
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
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of(this.cachedCatMeasures[id]);
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
    UheroApiService.prototype.fetchMeasurementSeries = function (id) {
        var _this = this;
        if (this.cachedMeasureSeries[id]) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of(this.cachedMeasureSeries[id]);
        }
        else {
            var measureSeries$_1 = this.http.get(this.baseUrl + "/measurement/series?id=" + id + "&expand=true", this.requestOptionsArgs)
                .map(mapData)
                .do(function (val) {
                _this.cachedMeasureSeries[id] = val;
                measureSeries$_1 = null;
            });
            return measureSeries$_1;
        }
    };
    UheroApiService.prototype.fetchSearch = function (search) {
        var _this = this;
        if (this.cachedSearch[search]) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of(this.cachedSearch[search]);
        }
        else {
            var filters$_1 = this.http.get(this.baseUrl + "/search?q=" + search + "&u=" + this.portal, this.requestOptionsArgs)
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
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of(this.cachedSearchExpand[search]);
        }
        else {
            var search$_1 = this.http.get(this.baseUrl + "/search/series?q=" + search + "&u=" + this.portal, this.requestOptionsArgs)
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
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of(this.cachedSearchExpand[search + geo + freq]);
        }
        else {
            var search$_2 = this.http.get(this.baseUrl + "/search/series?q=" +
                search + "&geo=" + geo + "&freq=" + freq + "&u=" + this.portal + "&expand=true", this.requestOptionsArgs)
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
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of(this.cachedObservations[id]);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('rootCategory')), __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('portal')),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
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

/***/ "../../../../../src/app/uhero-help/uhero-help.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>About</h2>\n<p>\n  The <a href=\"http://uhero.hawaii.edu\" target=\"_blank\">UHERO</a> Data Portal provides the Hawaii community with\n  information on economic, demographic, and business trends in the State and the Asia-Pacific region. It includes a\n  wide array of economic and social indicators for the State of Hawaii, the four counties, and key external economies.\n</p>\n\n<h3 class=\"mt-5\">About the Data</h3>\n<p>\n  This unique database, which is continually expanding, currently houses historical data on more than 3,000 economic\n  indicators. Much of the data reported in the system comes from government data sources; some originates at UHERO.\n  Source notes are provided for each data series.\n</p>\n<p>\n  UHERO makes no warranty, either express or implied, as to the accuracy or usability of the information in the Data\n  Portal. We encourage you to report errors and give us your suggestions for improvement.\n</p>\n\n<h3 class=\"mt-5\">Your Support is Appreciated</h3>\n<p>\n  Maintenance of the UHERO Data Portal is a costly undertaking. We appreciate the generous support of UHERO Sponsors.\n  Please considering joining them in supporting this service.\n</p>\n\n<p class=\"lead mt-5 bt-5\">\n    <a href=\"http://uhero.hawaii.edu/4/become-a-sponsor\" target=\"_blank\">Sponsor</a> the UHERO Data Portal, or\n    <a href=\"http://uhero.hawaii.edu/5/subscribe\" target=\"_blank\">Subscribe</a> to UHERO Forecast Project Reports\n</p>\n\n<h2 class=\"mt-5\">Using the UHERO Data Portal</h2>\n\n<p>Click on the categories on the left to change which group of time series are displayed.</p>\n\n<h4 class=\"mt-5\">Chart View</h4>\n<img src=\"../../assets/uhero/chartView2x.png\" alt=\"Screenshot of Chart View\" id=\"chart-view\">\n<p class=\"mt-1\">\n  Drop-down selectors indicate the currently displayed region and frequency. Use these drop-down selectors to change\n  the display from “State of Hawaii”, “Annual” to “Honolulu County”, “Quarterly”. By moving the sliders at the top of\n  the Chart View, you can adjust the range of displayed periods. You can also switch to Table View.\n</p>\n<p>\n  Each chart in the main Chart View includes the name of the series, the date of the currently highlighted observation,\n  the value (with units in parenthesis), and the year-over-year change (or percent change). You can hover your mouse\n  cursor over each series to see the values at different points in time. Clicking on a series chart will open up the\n  single-series view.\n</p>\n\n<h4 class=\"mt-5\">Table View</h4>\n<img src=\"../../assets/uhero/tableView2x.png\" alt=\"Screenshot of Table View\" id=\"table-view\">\n<p class=\"mt-1\">\n  In Table View, you can toggle the display of the year-over-year change (or percent change). If more periods are\n  selected than can be displayed at once, you can scroll the table horizontally to display the remaining observations.\n  Click the “Download CSV” link to download the data in a format that loads in Excel.\n</p>\n\n<h4 class=\"mt-5\">Series View</h4>\n<img src=\"../../assets/uhero/seriesView2x.png\" alt=\"Screenshot of Series View\" id=\"series-view\">\n<p class=\"mt-1\">\n  When viewing a single series, the line indicates the observations and the bars indicate the year-over-year change\n  (or percent change). Beside the series title you can use the drop-down selectors to change the displayed region and\n  frequency. You can also toggle whether the seasonally adjusted series or the raw series is displayed when both are\n  available.\n</p>\n<p>\n  On the top-left of the chart there are links to change the displayed periods to include the last year, the last five\n  years, the last ten years, or all available data. You can also use the controls on the smaller chart below the main\n  chart to manually adjust the displayed range. The smaller chart will always display the entire range.\n</p>\n<p>\n  On the top-right of the chart area, click “Print” to print the current chart, or click “Download” to choose from\n  PNG, JPEG, SVG, PDF or CSV exports of the selected data.\n</p>\n<p>\n  Below the chart is listed the source of the data, a link to the source agency, and any relevant notes. Below the\n  series metadata we display summary statistics of the currently selected range. You can toggle the date order of the\n  observations in the table below.\n</p>\n\n<h4 class=\"mt-5\">Search</h4>\n<img src=\"../../assets/uhero/search2x.png\" alt=\"Screenshot of Search Box\" id=\"search-box\">\n<p class=\"mt-1\">\n  Type a keyword into the search box at the top to see a list of all series with that keyword in the series title or in\n  the name of the series category.\n</p>\n\n"

/***/ }),

/***/ "../../../../../src/app/uhero-help/uhero-help.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#chart-view {\n  width: 1086px;\n  max-width: 100%; }\n\n#table-view {\n  width: 1017px;\n  max-width: 100%; }\n\n#series-view {\n  width: 1008px;\n  max-width: 100%; }\n\n#search-box {\n  width: 331px;\n  max-width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/uhero-help/uhero-help.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UheroHelpComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UheroHelpComponent = (function () {
    function UheroHelpComponent() {
    }
    return UheroHelpComponent;
}());
UheroHelpComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-uhero-help',
        template: __webpack_require__("../../../../../src/app/uhero-help/uhero-help.component.html"),
        styles: [__webpack_require__("../../../../../src/app/uhero-help/uhero-help.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], UheroHelpComponent);

//# sourceMappingURL=uhero-help.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: false,
    apiUrl: 'http://localhost:3030/v1'
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
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../../src/sprite-skin-nice2.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "sprite-skin-nice2.604dc56d925149a49655.png";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map