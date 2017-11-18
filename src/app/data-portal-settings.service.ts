// Settings for each data portal
// Defines series types for charts and columns available in single series tables
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
        seriesTotal: 1,
        series0Name: 'level',
        series0Type: 'line',
        series0Data: true,
        series1Name: '',
        series1Type: '',
        series1Data: false,
        setYAxes: true
      },
      highstock: {
        credits: 'data.uhero.hawaii.edu/nta',
        labels: {
          seriesLink: 'http://data.uhero.hawaii.edu/nta/#/series?id=',
          portal: 'National Transfer Accounts (NTA)',
          portalLink: 'NTA Dataportal: http://data.uhero.hawaii.edu/nta'
        },
        series0Name: 'level',
        series0Type: 'line',
        series1Name: 'c5ma',
        series1Type: 'column',
        series2Name: 'none',
        series2Type: '',
        buttons: []
      },
      seriesTable: {
        columns: 3,
        series1: 'formattedValue',
        series1Label: 'Level',
        series2: 'formattedC5ma',
        series2Label: 'Annual % Chg',
        series2PercLabel: 'Annual Chg'
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
        seriesTotal: 2,
        series0Name: 'level',
        series0Type: 'line',
        series0Data: true,
        series1Name: 'ytd',
        series1Type: 'column',
        series1Data: true,
        setYAxes: false
      },
      highstock: {
        credits: 'data.uhero.hawaii.edu',
        labels: {
          seriesLink: 'http://data.uhero.hawaii.edu/#/series?id=',
          portal: 'The University of Hawaii Economic Research Organization (UHERO)',
          portalLink: 'Data Portal: http://data.uhero.hawaii.edu/'
        },
        series0Name: 'level',
        series0Type: 'line',
        series1Name: 'yoy',
        series1Type: 'column',
        series2Name: 'ytd',
        series2Type: 'column',
        buttons: [1, 5, 10, 'all']
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
