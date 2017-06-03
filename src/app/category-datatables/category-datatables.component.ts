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
  @Input() tableId;
  @Input() sublist;
  @Input() categoryDates;
  @Input() geo;
  @Input() freq;
  @Input() yoy;
  @Input() ytd;
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
    const parentName = this.sublist.parentName;
    const parentId = this.sublist.parentId;
    const geo = this.geo;
    const freq = this.freq;
    const urlId = parentId ? parentId : sublistName;
    this.tableWidget = tableElement.DataTable({
      data: tableData,
      dom: 'B',
      columns: tableColumns,
      buttons: [{
        extend: 'csv',
        text: 'Download CSV <i class="fa fa-file-excel-o" aria-hidden="true"></i>',
        filename: sublistName,
        customize: function (csv) {
          return csv +
            '\n\n The University of Hawaii Economic Research Organization (UHERO) \n Data Portal: http://data.uhero.hawaii.edu/ \n ' +
            parentName + ' - ' + sublistName + ' (' + geo.name + ' - ' + freq.label + ')' +
            ': http://data.uhero.hawaii.edu/#/category/table?id=' + urlId;
        }
      }],
      columnDefs: [
        { 'targets': '_all',
          'render': function(data, type, row, meta) {
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
        const yoy = {};
        const ytd = {};
        const percent = series.seriesInfo.percent;
        const yoyLabel = percent ? 'YOY (ch)' : 'YOY (%)';
        const ytdLabel = percent ? 'YTD (ch)' : 'YTD (%)';
        const title = series.seriesInfo.title;
        series.categoryTable.forEach((obs) => {
          observations[obs.tableDate] = obs.level;
          yoy[obs.tableDate] = obs.yoy;
          ytd[obs.tableDate] = obs.ytd;
        });
        tableData.push({
          series: title,
          observations: observations
        });
        if (yoySelected) {
          tableData.push({
            series: yoyLabel,
            observations: yoy
          });
        }
        if (ytdSelected) {
          tableData.push({
            series: ytdLabel,
            observations: ytd
          });
        }
      }
    });
    return { tableColumns: tableColumns, tableData: tableData };
  }
}
