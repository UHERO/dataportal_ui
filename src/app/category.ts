export interface Category {
  id: number;
  name: string;
  freqGeos: Array<any>;
  geoFreqs: Array<any>;
  parentId?: number;
  children?: Array<any>;
  defaults?: {geo: string, freq: string};
  observationStart?: string;
  observationEnd?: string;
}
