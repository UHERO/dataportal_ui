import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-category-table-view',
  templateUrl: './category-table-view.component.html',
  styleUrls: ['./category-table-view.component.scss']
})
export class CategoryTableViewComponent implements OnInit, OnChanges {
  @Input() data;
  @Input() sublist;
  @Input() freq;
  @Input() dates;
  @Input() noSeries;
  @Input() yoyActive;
  @Input() ytdActive;
  @Input() c5maActive;
  @Input() params;
  @Input() subcatIndex;
  @Input() tableStart;
  @Input() tableEnd;
  @Input() portalSettings;
  private frozenColumns;
  private scrollableColumns;
  private categoryTableData;

  constructor(
    private _helper: HelperService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.frozenColumns = [{ field: 'series', header: 'Series' }];
    this.scrollableColumns = [];
    this.dates.forEach((date) => {
      this.scrollableColumns.push({ field: date.date, header: date.tableDate });
    });
    this.categoryTableData = [];
    if (this.data) {
      this.data.forEach((series) => {
        if (series.seriesInfo !== 'No data available' && this.dates) {
          const transformations = this._helper.getTransformations(series.seriesInfo.seriesObservations);
          const seriesData = { 'series': series.seriesInfo.displayName };
          transformations.level.dates.forEach((d, index) => {
            seriesData[d] = transformations.level.values[index];
          });
          this.categoryTableData.push(seriesData);
        }
      });
    }
  }

}
