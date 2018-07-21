export interface HighstockObject {
  chart: {
    alignTicks: boolean,
    zoomType: string,
    description: string, // used in xAxis label formatter
  },
  labels: {
    items: Array<any>,
    style: {
      display: string
    }
  },
  rangeSelector: {
    selected: number,
    buttons: Array<any>,
    buttonPosition: {
      x: number,
      y: number
    },
    labelStyle: {
      visibility: string
    },
    inputEnabled: boolean
  },
  lang: {
    exportKey: string
  },
  navigator: {
    series: {
      includeInCSVExport: boolean
    }
  },
  exporting: {
    buttons: {
      contextButton: {
        enabled: boolean
      },
      exportButton: {
        text: string,
        _titleKey: string,
        menuItems: Array<any>
      }
    },
    filename: string,
    chartOptions: {
      events: void,
      navigator: {
        enabled: boolean
      },
      scrollbar: {
        enabled: boolean
      },
      rangeSelector: {
        enabled: boolean
      },
      credits: {
        enabled: boolean,
        text: string,
        position: {
          align: string,
          x: number,
          y: number
        }
      },
      title: {
        text: string,
        align: string
      }
    }
  },
  tooltip: {
    borderWidth: number,
    shadow: false,
    formatter: () => string
  },
  credits: {
    enabled: boolean
  },
  xAxis: {
    minRange: number,
    min: number,
    max: number,
    ordinal: boolean,
    labels: {
      formatter: () => string
    }
  },
  yAxis: Array<any>,
  plotOptions: {
    series: {
      cropThreshold: number,
    }
  },
  series: Array<any>
}