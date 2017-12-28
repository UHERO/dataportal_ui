import { Component, OnInit, Inject } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../helper.service';
import { SeriesHelperService } from '../series-helper.service';
import { DateWrapper } from '../date-wrapper';
import { DataPortalSettingsService } from '../data-portal-settings.service';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss']
})
export class AnalyzerComponent implements OnInit {
  private analyzerTableDates;
  private analyzerChartSeries;
  private minDate;
  private maxDate;
  private portalSettings;
  private alertUser;
  private alertMessage = '';
  private tableYoy;
  private tableYtd;
  private tableC5ma;
  private analyzerData;
  private startDate;
  private endDate;
  private tooltipName;
  private tooltipUnits;
  private tooltipGeo;

  constructor(
    @Inject('portal') private portal,
    private _analyzer: AnalyzerService,
    private _series: SeriesHelperService,
    private _dataPortalSettings: DataPortalSettingsService,
    private route: ActivatedRoute,
    private _router: Router,
    private _helper: HelperService
  ) { }

  ngOnInit() {
    let urlCSeries;
    if (this.route) {
      this.route.params.subscribe(params => {
        let urlASeries;
        if (params['analyzerSeries']) {
          urlASeries = params['analyzerSeries'].split('-').map(Number);
          urlASeries.forEach((uSeries) => {
            this._analyzer.analyzerSeries.push({ id: uSeries });
          });
        }
        if (params['chartSeries']) {
          urlCSeries = params['chartSeries'].split('-').map(Number);
          urlCSeries.forEach((cSeries) => {
            const aSeries = this._analyzer.analyzerSeries.find(analyzer => analyzer.id === cSeries);
            aSeries.showInChart = true;
          });
        }
        if (params['start']) {
          this.startDate = params['start'];
        }
        if (params['end']) {
          this.endDate = params['end'];
        }
        if (params['name']) {
          this.tooltipName = (params['name'] === 'true');
        }
        if (params['units']) {
          this.tooltipUnits = (params['units'] === 'true');
        }
        if (params['geography']) {
          this.tooltipGeo = (params['geography'] === 'true');
        }
        if (params['yoy']) {
          this.tableYoy = (params['yoy'] === 'true');
        }
        if (params['ytd']) {
          this.tableYtd = (params['ytd'] === 'true');
        }
        if (params['c5ma']) {
          this.tableC5ma = (params['c5ma'] === 'true');
        }
      });
    }


    this.portalSettings = this._dataPortalSettings.dataPortalSettings[this.portal];
    this.analyzerData = this._analyzer.getAnalyzerData(this._analyzer.analyzerSeries);
  }

  setInitialChartSeries(analyzerSeries: Array<any>) {
    let chartSeries = analyzerSeries.filter(series => series.showInChart === true);
    let counter = 0;
    while (chartSeries.length < 2) {
      if (analyzerSeries[counter]) {
        analyzerSeries[counter].showInChart = true;
        counter++;
        chartSeries = analyzerSeries.filter(series => series.showInChart === true);
      }
      if (!analyzerSeries[counter]) {
        break;
      }
    }
    return chartSeries;
  }

  findLongestSeriesIndex(series) {
    let longestSeries, seriesLength = 0;
    series.forEach((serie, index) => {
      if (!longestSeries || seriesLength < serie.chartData.level.length) {
        seriesLength = serie.chartData.level.length;
        longestSeries = index;
      }
    });
    return longestSeries;
  }

  updateAnalyzerChart(event, chartSeries) {
    // Check if series is in the chart
    const seriesExist = chartSeries.find(cSeries => cSeries.seriesDetail.id === event.seriesDetail.id);
    const seriesSelected = this._analyzer.analyzerData.analyzerSeries.find(series => series.showInChart === true);
    // If remaining series drawn in chart is removed from analyzer, draw next series in table
    if (this._analyzer.analyzerData.analyzerSeries.length && !seriesSelected) {
      this._analyzer.analyzerData.analyzerSeries[0].showInChart = true;
      this.updateChartSeries(this._analyzer.analyzerData.analyzerSeries);
      return;
    }
    // At least one series must be selected
    if (chartSeries.length === 1 && seriesExist) {
      this.alertUser = true;
      this.alertMessage = 'At least one series must be selected.';
      return;
    }
    // Allow up to 2 different units to be displayed in chart
    const toggleChartDisplay = this.checkSeriesUnits(chartSeries, event);
    if (toggleChartDisplay) {
      this.alertUser = false;
      this.alertMessage = '';
      event.showInChart = !event.showInChart;
      // toggle showInChart in list of analyzer series
      const aSeries = this._analyzer.analyzerSeries.find(series => series.id === event.seriesDetail.id);
      aSeries.showInChart = !aSeries.showInChart;
    }
    this.updateChartSeries(this._analyzer.analyzerData.analyzerSeries);
  }

  updateChartSeries(analyzerSeries: Array<any>) {
    // Update series drawn in chart and dates in analyzer table
    this._analyzer.analyzerData.analyzerTableDates = this._analyzer.setAnalyzerDates(analyzerSeries);
    analyzerSeries.forEach((series) => {
      series.analyzerTableData = this._helper.seriesTable(series.seriesTableData, this._analyzer.analyzerData.analyzerTableDates, series.seriesDetail.decimals);
    });
    this._analyzer.analyzerData.analyzerChartSeries = analyzerSeries.filter(series => series.showInChart === true);
  }

  checkSeriesUnits(chartSeries, currentSeries) {
    // List of units for series in analyzer chart
    const allUnits = chartSeries.map(series => series.seriesDetail.unitsLabelShort);
    const uniqueUnits = allUnits.filter((unit, index, units) => units.indexOf(unit) === index);
    if (uniqueUnits.length === 2) {
      // If two different units are already in use, check if the current series unit is in the list
      const unitsExist = chartSeries.find(cSeries => cSeries.seriesDetail.unitsLabelShort === currentSeries.seriesDetail.unitsLabelShort);
      this.alertUser = unitsExist ? false : true;
      this.alertMessage = unitsExist ? '' : 'Chart may only display up to two different units.';
      return unitsExist ? true : false;
    }
    return uniqueUnits.length < 2 ? true : false;
  }

  // Update table when selecting new ranges in the chart
  setTableDates(e) {
    this.minDate = e.minDate;
    this.maxDate = e.maxDate;
  }

  checkTooltip(e) {
    if (e.label === 'name') {
      this.tooltipName = e.value;
    }
    if (e.label === 'units') {
      this.tooltipUnits = e.value;
    }
    if (e.label === 'geo') {
      this.tooltipGeo = e.value;
    }
  }

  checkTransforms(e) {
    if (e.label === 'yoy') {
      this.tableYoy = e.value;
    }
    if (e.label === 'ytd') {
      this.tableYtd = e.value;
    }
    if (e.label === 'c5ma') {
      this.tableC5ma = e.value;
    }
  }
}
