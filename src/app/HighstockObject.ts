export interface HighstockObject {
  chart: {
    alignTicks: boolean,
    events?: {
      render: () => void,
    },
    zoomType: string,
    styledMode: boolean,
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
    buttonPosition?: {
      x: number,
      y: number
    },
    labelStyle: {
      visibility: string
    },
    inputEnabled: boolean,
    inputDateFormat: string,
    inputEditDateFormat: string,
    inputDateParser: (args: any) => any,
    inputPosition?: {
      x: number,
      y: number
    }
  },
  lang: {
    exportKey: string
  },
  legend?: {
    enabled: boolean,
    labelFormatter: () => string
  }
  navigator: {
    series: {
      includeInCSVExport: boolean
    }
  },
  exporting: {
    allowHTML: boolean,
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
    csv: {
      dateFormat: string
    },
    filename: string,
    chartOptions: {
      events: any,
      chart: any,
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
        align: string,
      },
      subtitle?: {
        text: ''
      }
    }
  },
  tooltip: {
    borderWidth: number,
    shadow: false,
    followPointer: boolean,
    shared?: boolean,
    formatter: (args: any) => any
  },
  credits: {
    enabled: boolean
  },
  xAxis: {
    events: {
      afterSetExtremes: () => void
    },
    minRange?: number,
    min: number,
    max: number,
    ordinal: boolean,
    labels?: {
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
