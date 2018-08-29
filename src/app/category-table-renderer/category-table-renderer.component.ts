import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-category-table-renderer',
  templateUrl: './category-table-renderer.component.html',
  styleUrls: ['./category-table-renderer.component.scss']
})
export class CategoryTableRendererComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    console.log('component renderer params', params);
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }
}
