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
  
  refresh(): boolean {
    return false;
  }
}
