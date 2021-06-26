import { Component, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { TableHelperService } from '../table-helper.service';
import { AnalyzerService } from '../analyzer.service';
import 'jquery';
declare var $: any;

@Component({
  selector: 'lib-category-table-render',
  templateUrl: './category-table-render.component.html',
  styleUrls: ['./category-table-render.component.scss']
})
export class CategoryTableRenderComponent implements ICellRendererAngularComp {
  public params: any;

  constructor(
    private tableHelper: TableHelperService,
    private analyzerService: AnalyzerService
  ) { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  showPopover = (seriesInfo, subcatIndex) => {
    return this.tableHelper.showPopover(seriesInfo, subcatIndex);
  }

  addToAnalyzer(series) {
    series.analyze = true;
    this.analyzerService.addToAnalzyer(series.id);
  }

  removeFromAnalyzer(series) {
    series.analyze = false;
    this.analyzerService.removeFromAnalyzer(series.id);
  }
}
