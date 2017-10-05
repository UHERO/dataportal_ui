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
  private frequencies;
  private currentFreq;
  private analyzerSeries;
  private analyzerTableDates;
  private analyzerChartSeries;
  private chartStart;
  private chartEnd;
  private minDate;
  private maxDate;
  private portalSettings;

  constructor(
    @Inject('portal') private portal,
    private _analyzer: AnalyzerService,
    private _dataPortalSettings: DataPortalSettingsService,
    private _helper: HelperService
  ) { }

  ngOnInit() {
    this.portalSettings = this._dataPortalSettings.dataPortalSettings[this.portal];
    this.analyzerSeries = this._analyzer.analyzerSeries.allSeries;
    this.analyzerChartSeries = this._analyzer.analyzerSeries.analyzerChart;
    this.frequencies = [];
    const dateWrapper = { firstDate: '', endDate: '' };
    this.analyzerSeries.forEach((series) => {
      const freqExist = this.frequencies.find(freq => freq.freq === series.frequencyShort);
      if (!freqExist) {
        this.frequencies.push({ freq: series.frequencyShort, label: series.frequency });
      }
      // Get earliest start date and latest end date
      this.setDateWrapper(dateWrapper, series.seriesObservations.observationStart, series.seriesObservations.observationEnd);
    });

    if (this.analyzerSeries.length) {
      // Array of full range of dates for series selected in analyzer
      this.analyzerTableDates = this._analyzer.createAnalyzerDates(dateWrapper.firstDate, dateWrapper.endDate, this.frequencies, []);
      this.analyzerSeries.forEach((series) => {
        // Array of observations using full range of dates
        series.analyzerTableData = this._helper.catTable(series.tableData, this.analyzerTableDates, series.decimals);
      });
      if (!this.analyzerChartSeries.length) {
        this.analyzerSeries[0].showInChart = true;
        this.analyzerChartSeries = this.analyzerSeries.filter(series => series.showInChart === true);
      }
    }
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
      return;
    }
    // Allow up to 2 different units to be displayed in chart
    const toggleChartDisplay = this.checkSeriesUnits(chartSeries, event);
    if (toggleChartDisplay) {
      event.showInChart = !event.showInChart;
    }
    this.analyzerChartSeries = this.analyzerSeries.filter(series => series.showInChart === true);
  }

  checkSeriesUnits(chartSeries, currentSeries) {
    // List of units for series in analyzer chart
    const allUnits = chartSeries.map(series => series.unitsLabelShort)
    const uniqueUnits = allUnits.filter((unit, index, units) => units.indexOf(unit) === index);
    if (uniqueUnits.length === 2) {
      /// If two different units are already in use, check if the current series unit is in the list
      const unitsExist = chartSeries.find(cSeries => cSeries.unitsLabelShort === currentSeries.unitsLabelShort);
      return unitsExist ? true : false;
    }
    return uniqueUnits.length < 2 ? true : false;
  }

  updateChartExtremes(e) {
    this.chartStart = e.minDate;
    this.chartEnd = e.maxDate;
  }

  // Update table when selecting new ranges in the chart
  setTableDates(e) {
    this.minDate = e.minDate;
    this.maxDate = e.maxDate;
  }

}
