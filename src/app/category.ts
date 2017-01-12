export interface Category {
  id: number,
  name: string,
  freq_geos: Object;
  geo_freqs: Object;
  parent?: number,
  observationStart?: string,
  observationEnd?: string
}
