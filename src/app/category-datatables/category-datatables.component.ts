import { Component, OnInit, Input, AfterViewInit, ViewEncapsulation } from '@angular/core';
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
export class CategoryDatatablesComponent implements OnInit, AfterViewInit {
  @Input() data;
  @Input() tableId;
  @Input() sublist;
  private tableWidget;

  constructor() { }

  ngOnInit() {
    console.log('datatables', this.data);
  }

  ngAfterViewInit() {
    this.initDatatable();
  }

  initDatatable(): void {
    let tableElement: any = $('#indicator-table-' + this.tableId);
    let tableColumns = this.data.tableColumns;
    let tableData = this.data.tableData;
    this.tableWidget = tableElement.DataTable({
      data: tableData,
      dom: 'B',
      columns: tableColumns,
      buttons: [{
        extend: 'csv',
        text: '<i class="material-icons">&#xE2C4;</i> Download CSV',
        filename: this.sublist.name,
        customize: function(csv) {
          return csv + '\n\n The Economic Research Organization at the University of Hawaii (UHERO) \n Data Portal: http://data.uhero.hawaii.edu/';
        }
      }],
      bSort: false,
      paging: false,
      searching: false,
      info: false,
    });
    tableElement.hide();
  }
}
