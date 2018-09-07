import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-analyzer-stats-renderer',
  templateUrl: './analyzer-stats-renderer.component.html',
  styleUrls: ['./analyzer-stats-renderer.component.scss']
})
export class AnalyzerStatsRendererComponent implements ICellRendererAngularComp {
  public params: any;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
  }

  invokeParentUpdateAnalyzer() {
    this.params.context.componentParent.updateAnalyzer(this.params.data);
  }

  invokeParentUpdateChart() {
    this.params.context.componentParent.updateChart(this.params.data);
  }


  refresh(): boolean {
    return false;
  }
}
