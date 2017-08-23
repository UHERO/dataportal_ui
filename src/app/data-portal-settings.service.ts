import { Injectable } from '@angular/core';

@Injectable()
export class DataPortalSettingsService {
  public dataPortalSettings = {
    nta: {
      highcharts: {
        series0Name: 'level',
        series0Type: 'line',
        series1Name: 'c5ma',
        series1Type: 'column'
      },
      highstock: {
        series0Name: 'c5ma',
        series0Type: 'column',
        series1Name: 'level',
        series1Type: 'line',
        series2Name: 'none',
        series2Type: ''
      },
      seriesTable: {
        columns: 3,
        series1: 'formattedValue',
        series1Label: 'Level',
        series2: 'formattedC5ma',
        series2Label: 'Centered 5 Year Moving Avg % Chg',
        series2PercLabel: 'Centered 5 Year Moving Avg Chg'
      },
      sliderInteraction: false
    },
    uhero: {
      highcharts: {
        series0Name: 'level',
        series0Type: 'line',
        series1Name: 'ytd',
        series1Type: 'column'
      },
      highstock: {
        series0Name: 'yoy',
        series0Type: 'column',
        series1Name: 'level',
        series1Type: 'line',
        series2Name: 'ytd',
        series2Type: 'column'
      },
      seriesTable: {
        columns: 4,
        series1: 'formattedValue',
        series1Label: 'Level',
        series2: 'formattedYoy',
        series2Label: 'Year/Year % Chg',
        series2PercLabel: 'Year/Year Chg',
        series3: 'formattedYtd',
        series3Label: 'Year-to-Date % Chg',
        series3PercLabel: 'Year-to-Date Chg'
      },
      sliderInteraction: true
    }
  };
}
