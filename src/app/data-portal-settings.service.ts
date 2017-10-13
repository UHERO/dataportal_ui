import { Injectable } from '@angular/core';

@Injectable()
export class DataPortalSettingsService {
  public dataPortalSettings = {
    nta: {
      catTable: {
        portalSource: 'National Transfer Accounts (NTA) Dataportal: http://data.uhero.hawaii.edu/nta \n ',
        portalLink: 'http://data.uhero.hawaii.edu/nta/#/category?id='
      },
      highcharts: {
        series0Name: 'level',
        series0Type: 'line',
        series1Name: 'c5ma',
        series1Type: 'column'
      },
      highstock: {
        credits: 'data.uhero.hawaii.edu/nta',
        labels: {
          seriesLink: 'http://data.uhero.hawaii.edu/nta/#/series?id=',
          portal: 'National Transfer Accounts (NTA)',
          portalLink: 'NTA Dataportal: http://data.uhero.hawaii.edu/nta'
        },
        series0Name: 'c5ma',
        series0Type: 'column',
        series1Name: 'level',
        series1Type: 'line',
        series2Name: 'none',
        series2Type: '',
      },
      seriesTable: {
        columns: 3,
        series1: 'formattedValue',
        series1Label: 'Level',
        series2: 'formattedC5ma',
        series2Label: 'Centered 5 Year Moving Avg % Chg',
        series2PercLabel: 'Centered 5 Year Moving Avg Chg'
      },
      transformations: {
        yoy: false,
        ytd: false,
        c5ma: true
      },
      sliderInteraction: false
    },
    uhero: {
      catTable: {
        portalSource: 'The University of Hawaii Economic Research Organization (UHERO) Dataportal: http://data.uhero.hawaii.edu/ \n ',
        portalLink: 'http://data.uhero.hawaii.edu/#/category?id='
      },
      highcharts: {
        series0Name: 'level',
        series0Type: 'line',
        series1Name: 'ytd',
        series1Type: 'column'
      },
      highstock: {
        credits: 'data.uhero.hawaii.edu',
        labels: {
          seriesLink: 'http://data.uhero.hawaii.edu/#/series?id=',
          portal: 'The University of Hawaii Economic Research Organization (UHERO)',
          portalLink: 'Data Portal: http://data.uhero.hawaii.edu/'
        },
        series0Name: 'yoy',
        series0Type: 'column',
        series1Name: 'level',
        series1Type: 'line',
        series2Name: 'ytd',
        series2Type: 'column',
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
      transformations: {
        yoy: true,
        ytd: true,
        c5ma: false
      },
      sliderInteraction: true
    }
  };
}
