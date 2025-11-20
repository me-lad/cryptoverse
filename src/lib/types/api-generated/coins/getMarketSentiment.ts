export interface GetMarketSentiment {
  data: DataEntity[];
  metadata: {
    err: any;
  };
}

export type SentimentClassification =
  | 'Extreme Fear'
  | 'Fear'
  | 'Neutral'
  | 'Greed'
  | 'Extreme Greed';

interface DataEntity {
  value: string;
  value_classification: SentimentClassification;
  timestamp: string;
  time_until_update: string;
}
