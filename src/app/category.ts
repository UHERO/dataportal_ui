export interface Category {
  id: number;
  name: string;
  freqGeos: Object;
  geoFreqs: Object;
  parentId?: number;
  children?: Array<any>;
  defaults?: {geo: string, freq: string};
  observationStart?: string;
  observationEnd?: string;
}
