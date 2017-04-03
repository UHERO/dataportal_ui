import {Geography} from './geography';

export interface Series {
  id: string;
  title?: string;
  name: string;
  observationStart?: string;
  observationEnd?: string;
  frequency: string;
  frequencyShort: string;
  freqGeos: Array<any>;
  unitsLabel: string;
  unitsLabelShort: string;
  geography: Geography;
  geoFreqs: Array<any>;
  seasonallyAdjusted: boolean;
  source?: string;
  sourceDescription?: string;
  sourceDetails?: string;
  sourceLink?: string;
  percent: boolean;
  real: boolean;
}
