import { Component, OnInit, Inject } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';
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

  constructor(
    @Inject('portal') private portal,
    private _analyzer: AnalyzerService,
    private _dataPortalSettings: DataPortalSettingsService,
    private _helper: HelperService
  ) { }

  ngOnInit() {
    this.portalSettings = this._dataPortalSettings.dataPortalSettings[this.portal];
    this.analyzerSeries = this._analyzer.analyzerSeries;
    // this.analyzerChartSeries = this._analyzer.analyzerSeries.analyzerChart;
    if (this.analyzerSeries.length) {
      this.analyzerTableDates = this.setAnalyzerDates(this.analyzerSeries);
      this.analyzerSeries.forEach((series) => {
        // Array of observations using full range of dates
        series.analyzerTableData = this._helper.seriesTable(series.tableData, this.analyzerTableDates, series.decimals);
      });
      this.analyzerChartSeries = this.analyzerSeries.filter(series => series.showInChart === true);
      if (!this.analyzerChartSeries.length) {
        // The default series displayed in the chart on load should be the series with the longest range of data
        const longestSeries = this.findLongestSeries(this.analyzerSeries);
        longestSeries.showInChart = true;
        this.analyzerChartSeries = this.analyzerSeries.filter(series => series.showInChart === true);
      }
    }
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

  findLongestSeries(series) {
    let longestSeries, seriesLength = 0;
    series.forEach((serie) => {
      if (!longestSeries || seriesLength < serie.chartData.level.length) {
        seriesLength = serie.chartData.level.length;
        longestSeries = serie;
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
    // At least one series must be selected
    if (chartSeries.length === 1 && seriesExist) {
      this.alertUser = true;
      this.alertMessage = 'At least one series must be selected.'
      return;
    }
    // Allow up to 2 different units to be displayed in chart
    const toggleChartDisplay = this.checkSeriesUnits(chartSeries, event);
    if (toggleChartDisplay) {
      this.alertUser = false;
      this.alertMessage = '';
      event.showInChart = !event.showInChart;
    }
    // Update table dates when removing series from analyzer
    this.analyzerSeries = this._analyzer.analyzerSeries;
    this.analyzerTableDates = this.setAnalyzerDates(this.analyzerSeries);
    this.analyzerSeries.forEach((series) => {
      series.analyzerTableData = this._helper.seriesTable(series.tableData, this.analyzerTableDates, series.decimals);
    });
    this.analyzerChartSeries = this.analyzerSeries.filter(series => series.showInChart === true);
  }

  checkSeriesUnits(chartSeries, currentSeries) {
    // List of units for series in analyzer chart
    const allUnits = chartSeries.map(series => series.unitsLabelShort)
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

}
