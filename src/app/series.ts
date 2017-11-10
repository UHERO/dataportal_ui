import {Geography} from './geography';

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
  frequencies?: Array<any>;
  unitsLabel: string;
  unitsLabelShort: string;
  geography: Geography;
  geoFreqs: Array<any>;
  geographies?: Array<any>;
  seasonalAdjustment: string;
  source?: string;
  sourceDescription?: string;
  sourceDetails?: string;
  sourceLink?: string;
  percent: boolean;
  decimals?: number;
  real: boolean;
}
