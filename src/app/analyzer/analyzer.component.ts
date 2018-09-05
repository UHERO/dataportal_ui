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
  private startDate;
  private endDate;
  private tooltipName;
  private tooltipUnits;
  private tooltipGeo;
  analyzerData;

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
    if (this.route) {
      this.route.queryParams.subscribe(params => {
        if (params['analyzerSeries']) {
          this.storeUrlSeries(params);
        }
        if (params['chartSeries']) {
          this.storeUrlChartSeries(params);
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
    this.portalSettings = this._dataPortalSettings.dataPortalSettings[this.portal.universe];
    if (this._analyzer.analyzerSeries.length) {
      this.analyzerData = this._analyzer.getAnalyzerData(this._analyzer.analyzerSeries);
    }
  }

  storeUrlSeries(params) {
    const urlASeries = params['analyzerSeries'].split('-').map(Number);
    urlASeries.forEach((uSeries) => {
      const seriesExists = this._analyzer.analyzerSeries.find(s => s.id === uSeries);
      if (!seriesExists) {
        this._analyzer.analyzerSeries.push({ id: uSeries, showInChart: false });
      }
    });
  }

  storeUrlChartSeries(params) {
    const urlCSeries = params['chartSeries'].split('-').map(Number);
    urlCSeries.forEach((cSeries) => {
      const aSeries = this._analyzer.analyzerSeries.find(analyzer => analyzer.id === cSeries);
      aSeries.showInChart = true;
    });
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

  updateAnalyzerChart = (event, chartSeries) => {
    console.log('event', event);
    console.log('chartSeries', chartSeries);
    console.log('analyzerSeries', this._analyzer.analyzerSeries);
    console.log('analyzerData', this._analyzer.analyzerData);
    const seriesExist = chartSeries.find(cSeries => cSeries.seriesDetail.id === event.seriesInfo.id);
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
    console.log('toggleChartDisplay', toggleChartDisplay)
    if (toggleChartDisplay) {
      this.alertUser = false;
      this.alertMessage = '';
      event.showInChart = !event.showInChart;
      console.log('toggle event', event)
      // toggle showInChart in list of analyzer series
      const aSeries = this._analyzer.analyzerSeries.find(series => series.id === event.seriesInfo.id);
      const aSeries2 = this._analyzer.analyzerData.analyzerSeries.find(series => series.seriesDetail.id === event.seriesInfo.id);
      if (aSeries && aSeries2) {
        console.log('aSeries2', aSeries2)
        aSeries.showInChart = !aSeries.showInChart;
        aSeries2.showInChart = !aSeries.showInChart;
      }
      console.log('analyzerSeries', this._analyzer.analyzerSeries)
    }
    this.updateChartSeries(this._analyzer.analyzerData.analyzerSeries);

  }

  updateChartSeries(analyzerSeries: Array<any>) {
    // Update series drawn in chart and dates in analyzer table
    this._analyzer.analyzerData.analyzerTableDates = this._analyzer.setAnalyzerDates(analyzerSeries);
    this._analyzer.createAnalyzerTableData(analyzerSeries, this._analyzer.analyzerData.analyzerTableDates);
    this._analyzer.analyzerData.analyzerChartSeries = analyzerSeries.filter(series => series.showInChart === true);
    console.log('analyzerChartSeries', this._analyzer.analyzerData.analyzerChartSeries)
    this._analyzer.analyzerData.chartNavigator.frequency = this._analyzer.checkFrequencies(this._analyzer.analyzerData.analyzerSeries);
    this._analyzer.analyzerData.chartNavigator.dateStart = this._analyzer.analyzerData.analyzerTableDates[0].date;
    this._analyzer.analyzerData.chartNavigator.numberOfObservations = Math.max(...this._analyzer.analyzerData.analyzerSeries.map(s => s.chartData.level.length));
  }

  checkSeriesUnits(chartSeries, currentSeries) {
    // List of units for series in analyzer chart
    const allUnits = chartSeries.map(series => series.seriesDetail.unitsLabelShort);
    const uniqueUnits = allUnits.filter((unit, index, units) => units.indexOf(unit) === index);
    if (uniqueUnits.length === 2) {
      // If two different units are already in use, check if the current series unit is in the list
      const unitsExist = chartSeries.find(cSeries => cSeries.seriesDetail.unitsLabelShort === currentSeries.seriesInfo.unitsLabelShort);
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
