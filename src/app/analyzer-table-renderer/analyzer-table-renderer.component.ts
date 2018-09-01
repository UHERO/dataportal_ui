import { Component, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { TableHelperService } from '../table-helper.service';
import { AnalyzerService } from '../analyzer.service';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-analyzer-table-renderer',
  templateUrl: './analyzer-table-renderer.component.html',
  styleUrls: ['./analyzer-table-renderer.component.scss']
})
export class AnalyzerTableRendererComponent implements ICellRendererAngularComp {
  public params: any;
  @Output() updateChartSeries = new EventEmitter();

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

  showPopover = (seriesInfo) => {
    return this._table.showPopover(seriesInfo);
  }

  updateAnalyze(series) {
    console.log('series', series)
    this._analyzer.updateAnalyzer(series.id);
    this.updateChartSeries.emit(series);
  }


  /* updateAnalyze = (seriesInfo) => {
    this._analyzer.updateAnalyzer(seriesInfo.id);
    seriesInfo.analyze = this._analyzer.checkAnalyzer(seriesInfo);
  } */
}
