import { Geography } from './geography';

export interface Series {
  id: string;
  title?: string;
  name: string;
  measurementId: number;
  observationStart?: string;
  observationEnd?: string;
  frequency: string;
  frequencyShort: string;
  freqGeos: Array<any>;
  freqs?: Array<any>;
  unitsLabel: string;
  unitsLabelShort: string;
  geography: Geography;
  geoFreqs: Array<any>;
  geos?: Array<any>;
  seriesObservations?: {
    observationStart: string,
    observationEnd: string
  };
  seasonalAdjustment: string;
  source?: string;
  sourceDescription?: string;
  sourceDetails?: string;
  sourceLink?: string;
  percent: boolean;
  decimals?: number;
  real: boolean;
}
