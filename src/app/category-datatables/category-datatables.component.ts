import { Component, OnInit, Input, AfterViewInit, ViewEncapsulation, OnChanges } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.flash.js';

@Component({
  selector: 'app-category-datatables',
  templateUrl: './category-datatables.component.html',
  styleUrls: ['./category-datatables.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryDatatablesComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() portalSettings;
  @Input() tableId;
  @Input() sublist;
  @Input() categoryDates;
  @Input() geo;
  @Input() freq;
  @Input() yoy;
  @Input() ytd;
  @Input() c5ma;
  @Input() analyzer;
  @Input() analyzerSeries;
  private tableWidget;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.categoryDates && (this.analyzerSeries || this.sublist.displaySeries)) {
      this.initDatatable();
    }
  }

  ngOnChanges() {
    if (this.tableWidget) {
      this.tableWidget.destroy();
      $('#indicator-table-' + this.tableId).empty();
    }
    if (this.categoryDates && (this.analyzerSeries || this.sublist.displaySeries)) {
      this.initDatatable();
    }
  }

  initDatatable(): void {
    // const datatables = this.formatTable(this.sublist.displaySeries, this.categoryDates);
    const analyzer = this.analyzer;
    const datatables = this.formatTable(this.categoryDates, this.analyzer, this.analyzerSeries, this.sublist);
    const tableElement: any = $('#indicator-table-' + this.tableId);
    const tableColumns = datatables.tableColumns;
    const tableData = datatables.tableData;
    const sublistName = this.sublist ? this.sublist.name : '';
    const parentName = this.sublist && this.sublist.parentName ? this.sublist.parentName + ' - ' : '';
    const geoName = this.geo ? this.geo.name + ' - ' : '';
    const freq = this.freq;
    const catId = this.sublist ? this.sublist.parentId : '';
    const tableId = this.tableId;
    const portalSettings = this.portalSettings;
    this.tableWidget = tableElement.DataTable({
      data: tableData,
      dom: 'B',
      columns: tableColumns,
      buttons: [{
        extend: 'csv',
        text: 'Download CSV <i class="fa fa-file-excel-o" aria-hidden="true"></i>',
        filename: analyzer ? 'analyzer' : sublistName,
        customize: function (csv) {
          return analyzer ? portalSettings.catTable.portalSource + '\n\n' + csv :
            portalSettings.catTable.portalSource +
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
  }

  formatTable(tableDates: Array<any>, analyzer: Boolean, analyzerSeries: Array<any>, sublist) {
    const yoySelected = this.yoy;
    const ytdSelected = this.ytd;
    const c5maSelected = this.c5ma;
    // Format table for jquery datatables
    const tableData = [];
    const tableColumns = [];
    tableColumns.push({ title: 'Series', data: 'series' });
    tableDates.forEach((date) => {
      tableColumns.push({ title: date.tableDate, data: 'observations.' + date.tableDate });
    });
    if (analyzer) {
      analyzerSeries.forEach((series) => {
        const observations = {};
        const title = series.displayName;
        if (series.analyzerTableData) {
          series.analyzerTableData.forEach((obs) => {
            observations[obs.tableDate] = obs.value === Infinity ? null : obs.value;
          });
        }
        tableData.push({
          series: title,
          observations: observations
        });
      });
      if (yoySelected) {
        this.addAnalyzerYoy(tableData, analyzerSeries);
      }
      if (ytdSelected) {
        this.addAnalyzerYtd(tableData, analyzerSeries);
      }
      if (c5maSelected) {
        this.addAnalyzerC5ma(tableData, analyzer);
      }
      return { tableColumns: tableColumns, tableData: tableData };
    }
    if (!analyzer) {
      const displaySeries = sublist.displaySeries;
      displaySeries.forEach((series) => {
        if (series.seriesInfo !== 'No data available') {
          const observations = {};
          const title = series.seriesInfo.displayName;
          series.categoryTable.forEach((obs) => {
            observations[obs.tableDate] = obs.value === Infinity ? null : obs.value;
          });
          tableData.push({
            series: title,
            observations: observations
          });
        }
      });
      if (yoySelected) {
        this.addCategoryYoy(tableData, displaySeries);
      }
      if (ytdSelected) {
        this.addCategoryYtd(tableData, displaySeries);
      }
      if (c5maSelected) {
        this.addCategoryC5ma(tableData, displaySeries);
      }
      return { tableColumns: tableColumns, tableData: tableData };
    }
  }

  addAnalyzerYoy(tableData, analyzerSeries) {
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
    analyzerSeries.forEach((series) => {
      const ytd = {};
      const percent = series.seriesDetail.percent;
      const ytdLabel = percent ? ' (ch)' : ' (%)';
      const title = series.displayName;
      series.analyzerTableData.forEach((obs) => {
        ytd[obs.tableDate] = obs.ytdValue === Infinity ? null : obs.ytdValue;
      });
      tableData.push({
        series: title + ytdLabel,
        observations: ytd
      });
    });
  }

  addCategoryYoy(tableData, displaySeries) {
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
    displaySeries.forEach((series) => {
      const ytd = {};
      const percent = series.seriesInfo.percent;
      const ytdLabel = percent ? ' (ch)' : ' (%)';
      const title = series.seriesInfo.displayName;
      series.categoryTable.forEach((obs) => {
        ytd[obs.tableDate] = obs.ytdValue === Infinity ? null : obs.ytdValue;
      });
      tableData.push({
        series: title + ytdLabel,
        observations: ytd
      });
    });
  }

  addAnalyzerYtd(tableData, analyzerSeries) {
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
    analyzerSeries.forEach((series) => {
      const ytd = {};
      const percent = series.seriesDetail.percent;
      const ytdLabel = percent ? ' (ch)' : ' (%)';
      const title = series.displayName;
      series.analyzerTableData.forEach((obs) => {
        ytd[obs.tableDate] = obs.ytdValue === Infinity ? null : obs.ytdValue;
      });
      tableData.push({
        series: title + ytdLabel,
        observations: ytd
      });
    });
  }

  addCategoryYtd(tableData, displaySeries) {
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
    displaySeries.forEach((series) => {
      const ytd = {};
      const percent = series.seriesInfo.percent;
      const ytdLabel = percent ? ' (ch)' : ' (%)';
      const title = series.seriesInfo.displayName;
      series.categoryTable.forEach((obs) => {
        ytd[obs.tableDate] = obs.ytdValue === Infinity ? null : obs.ytdValue;
      });
      tableData.push({
        series: title + ytdLabel,
        observations: ytd
      });
    });
  }

  addAnalyzerC5ma(tableData, analyzerSeries) {
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
    analyzerSeries.forEach((series) => {
      const c5ma = {};
      const percent = series.seriesDetail.percent;
      const c5maLabel = percent ? ' (ch)' : ' (%)';
      const title = series.displayName;
      series.analyzerTableData.forEach((obs) => {
        c5ma[obs.tableDate] = obs.c5maValue === Infinity ? null : obs.c5maValue;
      });
      tableData.push({
        series: title + c5maLabel,
        observations: c5ma
      });
    });
  }

  addCategoryC5ma(tableData, displaySeries) {
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
    displaySeries.forEach((series) => {
      const c5ma = {};
      const percent = series.seriesInfo.percent;
      const c5maLabel = percent ? ' (ch)' : ' (%)';
      const title = series.seriesInfo.displayName;
      series.categoryTable.forEach((obs) => {
        c5ma[obs.tableDate] = obs.c5maValue === Infinity ? null : obs.c5maValue;
      });
      tableData.push({
        series: title + c5maLabel,
        observations: c5ma
      });
    });
  }
}
