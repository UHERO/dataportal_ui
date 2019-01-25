import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { TableHelperService } from '../table-helper.service';
import { AnalyzerService } from '../analyzer.service';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-category-table-renderer',
  templateUrl: './category-table-renderer.component.html',
  styleUrls: ['./category-table-renderer.component.scss']
})
export class CategoryTableRendererComponent implements ICellRendererAngularComp {
  public params: any;

  constructor(
    private _table: TableHelperService,
    private _analyzer: AnalyzerService
  ) { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  showPopover = (seriesInfo, subcatIndex) => {
    return this._table.showPopover(seriesInfo, subcatIndex);
  }

  updateAnalyze = (seriesInfo) => {
    this._analyzer.updateAnalyzerSeriesCount(seriesInfo);
  }
}
