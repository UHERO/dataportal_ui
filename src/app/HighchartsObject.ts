export interface HighchartsObject {
  chart: {
    spacingTop: number,
    className: string,
    events: {
      render: () => void,
    }
  },
  exporting: {
    enabled: boolean,
  },
  title: {
    text: string,
    useHTML: boolean,
    align: string,
    widthAdjust: number,
    x: number,
    y: number,
    style: {
      margin: number
    }
  },
  tooltip: {
    positioner: () => {},
    shadow: boolean,
    borderWidth: number,
    shared: boolean,
    formatter: () => string,
    useHTML: boolean,
  },
  legend: {
    enabled: boolean,
  },
  credits: {
    enabled: boolean,
  },
  xAxis: {
    type: string,
    labels: {
      enabled: boolean
    },
    lineWidth: number,
    tickLength: number
  },
  yAxis: Array<any>,
  plotOptions: {
    line: {
      marker: {
        enabled: boolean,
        radius: number
      }
    }
  },
  series: Array<any>,
  lang: {
    noData: string
  }
}