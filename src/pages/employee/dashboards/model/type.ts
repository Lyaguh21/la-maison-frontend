export interface IRevenue7DaysResponse {
  date: string;
  value: number;
}

export interface IReservations7DaysResponse {
  date: string;
  value: number;
}

export interface IWaitersProcessedStats {
  name: string;
  reservations: number;
}

export interface IMetricValueResponse {
  value: number;
}
