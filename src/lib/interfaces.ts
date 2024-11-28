import { FlightData } from "./FlightDataType";

export interface IAirport {
  airportCode: string;
  cityName: string;
}

export interface CalendarDataItem {
  points: number;
  cashPrice: number;
  date: string;
}

export interface ProcessedCalenderDataItem {
  month: string;
  date: string;
  points: number;
  price: number;
}

export interface IFlightsListProps {
  flightsData: FlightData[];
  numOfPass: number;
  upperCabin: boolean;
  departure?: string;
  arrival?: string;
  error?: string;
  program?: string;
  nonStopOnly?: boolean;
  maxStops?: string;
}

export interface IFlightsProps {}

export interface Idata {
  departure: IAirport;
  arrival: IAirport;
  startDate: string;
  endDate: string;
  numPassengers: string;
  upperCabin: boolean;
  program?: string;
  fromToDate?: Value;
  date?: Value;
  nonStopOnly?: boolean;
  selectedNumOfStops?: string;
  timeframe?: string;
  chartData?: ProcessedCalenderDataItem[];
}

export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];
