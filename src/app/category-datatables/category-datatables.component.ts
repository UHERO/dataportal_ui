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
  }

  ngAfterViewInit() {
    this.initDatatable();
  }

  initDatatable(): void {
    let tableElement: any = $('#indicator-table-' + this.tableId);
    let tableColumns = this.data.tableColumns;
    let tableData = this.data.tableData;
    let sublistName = this.sublist.name;
    let parentName = this.sublist.parentName;
    let parentId = this.sublist.parentId;

    this.tableWidget = tableElement.DataTable({
      data: tableData,
      dom: 'B',
      columns: tableColumns,
      buttons: [{
        extend: 'csv',
        text: '<i class="material-icons">&#xE2C4;</i> Download CSV',
        filename: sublistName,
        customize: function(csv) {
          return csv + 
          '\n\n The University of Hawaii Economic Research Organization (UHERO) \n Data Portal: http://data.uhero.hawaii.edu/ \n ' +
          parentName + '-' + sublistName + ': http://data.uhero.hawaii.edu/#/category/table?id=' + parentId;
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
