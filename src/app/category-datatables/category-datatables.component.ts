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
  @Input() data;
  @Input() tableId;
  @Input() sublist;
  @Input() geo;
  @Input() freq;
  private tableWidget;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.data) {
      this.initDatatable();
    }
  }

  ngOnChanges() {
    if (this.tableWidget) {
      this.tableWidget.destroy();
      $('#indicator-table-' + this.tableId).empty();
    }
    if (this.data) {
      this.initDatatable();
    }
  }

  initDatatable(): void {
    const tableElement: any = $('#indicator-table-' + this.tableId);
    const tableColumns = this.data.tableColumns;
    const tableData = this.data.tableData;
    const sublistName = this.sublist.name;
    const parentName = this.sublist.parentName;
    const parentId = this.sublist.parentId;
    const geo = this.geo;
    const freq = this.freq
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
          parentName + '-' + sublistName + ' (' + geo.name + ' - ' + freq.label + ')' +
          ': http://data.uhero.hawaii.edu/#/category/table?id=' + parentId;
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
