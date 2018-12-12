import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-analyzer-interactions-renderer',
  templateUrl: './analyzer-interactions-renderer.component.html',
  styleUrls: ['./analyzer-interactions-renderer.component.scss']
})
export class AnalyzerInteractionsRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }
}
