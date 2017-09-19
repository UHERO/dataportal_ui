import { Component, OnInit } from '@angular/core';
import { AnalyzerService } from '../analyzer.service';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss']
})
export class AnalyzerComponent implements OnInit {
  private analyzerList;

  constructor(private _analyzer: AnalyzerService) { }

  ngOnInit() {
    this.analyzerList = this._analyzer.analyzerSeries;
    console.log(this.analyzerList);
  }

}
