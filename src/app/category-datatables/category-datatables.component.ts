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
  private tableWidget;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.categoryDates && this.sublist.displaySeries) {
      this.initDatatable();
    }
  }

  ngOnChanges() {
    if (this.tableWidget) {
      this.tableWidget.destroy();
      $('#indicator-table-' + this.tableId).empty();
    }
    if (this.categoryDates && this.sublist.displaySeries) {
      this.initDatatable();
    }
  }

  initDatatable(): void {
    const datatables = this.formatTable(this.sublist.displaySeries, this.categoryDates);
    const tableElement: any = $('#indicator-table-' + this.tableId);
    const tableColumns = datatables.tableColumns;
    const tableData = datatables.tableData;
    const sublistName = this.sublist.name;
    const parentName = this.sublist.parentName ? this.sublist.parentName + ' - ' : '';
    const geoName = this.geo ? this.geo.name + ' - ' : '';
    const freq = this.freq;
    const catId = this.sublist.parentId;
    const tableId = this.tableId;
    const portalSettings = this.portalSettings;
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
  }

  formatTable(displaySeries: Array<any>, tableDates: Array<any>) {
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
    displaySeries.forEach((series) => {
      if (series.seriesInfo !== 'No data available') {
        const observations = {};
        const title = series.seriesInfo.title;
        series.categoryTable.forEach((obs) => {
          observations[obs.tableDate] = obs.level;
        });
        tableData.push({
          series: title,
          observations: observations
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
      displaySeries.forEach((series) => {
        const yoy = {};
        const percent = series.seriesInfo.percent;
        const yoyLabel = percent ? ' (ch)' : ' (%)';
        const title = series.seriesInfo.title;
        series.categoryTable.forEach((obs) => {
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
      displaySeries.forEach((series) => {
        const ytd = {};
        const percent = series.seriesInfo.percent;
        const ytdLabel = percent ? ' (ch)' : ' (%)';
        const title = series.seriesInfo.title;
        series.categoryTable.forEach((obs) => {
          ytd[obs.tableDate] = obs.ytd;
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
        series: 'Centered 5 Year Moving Avg',
        observations: ''
      });
      displaySeries.forEach((series) => {
        const c5ma = {};
        const percent = series.seriesInfo.percent;
        const title = series.seriesInfo.title;
        series.categoryTable.forEach((obs) => {
          c5ma[obs.tableDate] = obs.c5ma;
        });
        tableData.push({
          series: title,
          observations: c5ma
        });
      });
    }
    return { tableColumns: tableColumns, tableData: tableData };
  }
}
