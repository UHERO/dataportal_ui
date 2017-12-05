import { Component, OnInit, Inject } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../helper.service';
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
  analyzerSeries;
  private tooltipName;
  private tooltipUnits;
  private tooltipGeo;
  private tableYoy;
  private tableYtd;
  private tableC5ma;

  constructor(
    @Inject('portal') private portal,
    private _analyzer: AnalyzerService,
    private _dataPortalSettings: DataPortalSettingsService,
    private route: ActivatedRoute,
    private _router: Router,
    private _helper: HelperService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('route params', params);
      let urlASeries;
      if (params['analyzerSeries']) {
        console.log('analyzerSeries', params['analyzerSeries']);
        urlASeries = params['analyzerSeries'].split('-').map(Number);
        console.log('urlASeries', urlASeries)
      }
      if (params['chartSeries']) {
        const urlCSeries = params['chartSeries'].split('-').map(Number);
        console.log('urlCSeries', urlCSeries);
      }
      if (params['start']) {
        const urlStart = params['start'];
      }
      if (params['end']) {
        const urlEnd = params['end'];
      }
      if (Object.keys(params).length !== 0) {
      }
    });

    this.portalSettings = this._dataPortalSettings.dataPortalSettings[this.portal];
    this.analyzerSeries = this._analyzer.analyzerSeries;
    // this.analyzerChartSeries = this._analyzer.analyzerSeries.analyzerChart;
    if (this.analyzerSeries.length) {
      this.analyzerTableDates = this.setAnalyzerDates(this.analyzerSeries);
      // Sort series by length of level data
      // The default series displayed in the chart on load should be the series with the longest range of data
      const longestSeries = this.findLongestSeriesIndex(this.analyzerSeries);
      this.analyzerSeries[longestSeries].showInChart = true;
      this.analyzerSeries.forEach((series) => {
        // Array of observations using full range of dates
        series.analyzerTableData = this._helper.seriesTable(series.tableData, this.analyzerTableDates, series.decimals);
      });
      this.analyzerChartSeries = this.analyzerSeries.filter(series => series.showInChart === true);
      if (this.analyzerChartSeries.length < 2) {
        this.analyzerChartSeries = this.setInitialChartSeries(this.analyzerSeries);
      }
    }
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

  setAnalyzerDates(analyzerSeries) {
    const frequencies = [];
    const dateWrapper = { firstDate: '', endDate: '' };
    analyzerSeries.forEach((series) => {
      const freqExist = frequencies.find(freq => freq.freq === series.frequencyShort);
      if (!freqExist) {
        frequencies.push({ freq: series.frequencyShort, label: series.frequency });
      }
      // Get earliest start date and latest end date
      this.setDateWrapper(dateWrapper, series.seriesObservations.observationStart, series.seriesObservations.observationEnd);
    });
    // Array of full range of dates for series selected in analyzer
    return this._analyzer.createAnalyzerDates(dateWrapper.firstDate, dateWrapper.endDate, frequencies, []);
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

  setDateWrapper(dateWrapper: DateWrapper, seriesStart: string, seriesEnd: string) {
    if (dateWrapper.firstDate === '' || seriesStart < dateWrapper.firstDate) {
      dateWrapper.firstDate = seriesStart;
    }
    if (dateWrapper.endDate === '' || seriesEnd > dateWrapper.endDate) {
      dateWrapper.endDate = seriesEnd;
    }
  }

  updateAnalyzerChart(event, chartSeries) {
    // Check if series is in the chart
    const seriesExist = chartSeries.find(cSeries => cSeries.id === event.id);
    this.analyzerSeries = this._analyzer.analyzerSeries;
    const seriesSelected = this._analyzer.analyzerSeries.find(series => series.showInChart === true);
    // If remaining series drawn in chart is removed from analyzer, draw next series in table
    if (this._analyzer.analyzerSeries.length && !seriesSelected) {
      this.analyzerSeries[0].showInChart = true;
      this.updateChartSeries(this.analyzerSeries);
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
    }
    this.updateChartSeries(this.analyzerSeries);
  }

  updateChartSeries(analyzerSeries: Array<any>) {
    // Update series drawn in chart and dates in analyzer table
    this.analyzerTableDates = this.setAnalyzerDates(analyzerSeries);
    analyzerSeries.forEach((series) => {
      series.analyzerTableData = this._helper.seriesTable(series.tableData, this.analyzerTableDates, series.decimals);
    });
    this.analyzerChartSeries = analyzerSeries.filter(series => series.showInChart === true);
  }

  checkSeriesUnits(chartSeries, currentSeries) {
    // List of units for series in analyzer chart
    const allUnits = chartSeries.map(series => series.unitsLabelShort);
    const uniqueUnits = allUnits.filter((unit, index, units) => units.indexOf(unit) === index);
    if (uniqueUnits.length === 2) {
      // If two different units are already in use, check if the current series unit is in the list
      const unitsExist = chartSeries.find(cSeries => cSeries.unitsLabelShort === currentSeries.unitsLabelShort);
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
      console.log('e', e)
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
