import { Component, OnInit, Input, AfterViewInit, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-fixedcolumns';

@Component({
  selector: 'app-category-datatables',
  templateUrl: './category-datatables.component.html',
  styleUrls: ['./category-datatables.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryDatatablesComponent implements OnInit, AfterViewInit {
  @Input() data;
  @Input() tableId;
  private tableWidget;

  constructor() { }

  ngOnInit() {
    console.log('datatables', this.data);
    //this.initDatatable();
  }

  ngAfterViewInit() {
    this.initDatatable();
  }

  initDatatable(): void {
    let tableColumns = [];
    let tableElement: any = $('#indicator-table-' + this.tableId);
    /* if (this.tableWidget) {
      // Destroy table if table has already been initialized
      this.tableWidget.destroy();
      tableElement.empty();
    } */
    tableColumns.push({ title: 'Series', data: 'series' });
    let dateStart = this.data.dateWrapper.firstDate;
    let dateEnd = this.data.dateWrapper.endDate;
    this.data.sublist.dateRange.forEach((date) => {
      if (date.date >= dateStart && date.date <= dateEnd)
        tableColumns.push({ title: date.tableDate, data: 'observations.' + date.tableDate });
    });
    let tableData = [];
    this.data.series.forEach((series) => {
      if (series.seriesInfo.seasonallyAdjusted !== false) {
        let observations = {};
        series.categoryTable.forEach((obs) => {
          observations[obs.tableDate] = obs.level;
        })
        tableData.push({
          series: series.seriesInfo.description ? series.seriesInfo.description : series.seriesInfo.title,
          seriesId: series.seriesInfo.id,
          indent: series.seriesInfo.indent,
          seasonallyAdjusted: series.seriesInfo.seasonallyAdjusted,
          observations: observations
        });
      }
    })
    console.log(tableData);
    this.tableWidget = tableElement.DataTable({
      data: tableData,
      columns: tableColumns,
      columnDefs: [
        {
          targets: 0,
          render: function (data, type, row, meta) {
            if (type === 'display') {
              // Display badge if series is seasonally adjusted
              let sa = '<span class=indent' + row.indent + '><a href="/#/series?id=' + row.seriesId + '">' + row.series + '</a></span>' + '<span class="badge badge-pill badge-primary">SA</span>';
              let ns = '<span class=indent' + row.indent + '><a href="/#/series?id=' + row.seriesId + '">' + row.series + '</a>';
              data = row.seasonallyAdjusted ? sa : ns;
            }
            return data;
          }
        }
      ],
      bSort: false,
      // scrollY: '400px',
      scrollX: true,
      paging: false,
      searching: false,
      info: false,
      fixedColumns: {
        'leftColumns': 1
      }
    });
  }
}
