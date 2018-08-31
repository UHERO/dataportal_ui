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
        text: 'Download CSV <i class="far fa-file-excel"></i>',
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
    if (analyzer && analyzerSeries) {
      analyzerSeries.forEach((series) => {
        const observations = {};
        const title = series.displayName;
        if (series.analyzerTableDisplay) {
          tableDates.forEach((date, index) => {
            observations[date.tableDate] = series.analyzerTableDisplay.lvlDownloadTable[index].value === Infinity ? null : series.analyzerTableDisplay.lvlDownloadTable[index].value;
          });
        }
        tableData.push({
          series: title,
          observations: observations
        });
      });
      if (yoySelected) {
        this.addAnalyzerYoy(tableData, analyzerSeries, tableDates);
      }
      if (ytdSelected) {
        this.addAnalyzerYtd(tableData, analyzerSeries, tableDates);
      }
      if (c5maSelected) {
        this.addAnalyzerC5ma(tableData, analyzerSeries, tableDates);
      }
      console.log('tableData', tableData)
      return { tableColumns: tableColumns, tableData: tableData };
    }
  }

  addTransformationLabel(tableData, transformLabel) {
    // Add empty rows between data transformations in CSV
    tableData.push({
      series: '',
      observations: ''
    }, {
        series: '',
        observations: ''
      }, {
        series: transformLabel,
        observations: ''
      });
  }

  addAnalyzerTransformation(analyzerSeries: Array<any>, transformValue: string, tableData: Array<any>, tableDates) {
    analyzerSeries.forEach((series) => {
      const transformation = {};
      const percent = series.seriesDetail.percent;
      const transformLabel = percent ? ' (ch)' : ' (%)';
      const title = series.displayName;
      tableDates.forEach((date, index) => {
        transformation[date.tableDate] = series.analyzerTableDisplay[transformValue][index].value === Infinity ? null : series.analyzerTableDisplay[transformValue][index].value;
      });
      tableData.push({
        series: title + transformLabel,
        observations: transformation
      });
    });
  }

  addAnalyzerYoy(tableData, analyzerSeries, tableDates) {
    this.addTransformationLabel(tableData, 'Year/Year');
    this.addAnalyzerTransformation(analyzerSeries, 'pc1DownloadTable', tableData, tableDates);
  }

  addAnalyzerYtd(tableData, analyzerSeries, tableDates) {
    this.addTransformationLabel(tableData, 'Year-to-Date');
    this.addAnalyzerTransformation(analyzerSeries, 'ytdDownloadTable', tableData, tableDates);
  }

  addAnalyzerC5ma(tableData, analyzerSeries, tableDates) {
    this.addTransformationLabel(tableData, 'Annual Change');
    this.addAnalyzerTransformation(analyzerSeries, 'c5maDownloadTable', tableData, tableDates);
  }
}
