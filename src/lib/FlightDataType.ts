export interface FlightData {
  duration: number; // Total flight duration in minutes (sum of durations of all legs + sum of duration of all connection times)
  flightID: string; // Flight id
  sourceAirline: string; // The source airline for the flight
  arrivesNextDay: number; // If arrives same day then 0, if arrives next day then 1, if arrives next next day then 2 and so on.
  pricingDetail: PricingDetail[]; // Details of pricing for different product types
  legs: Leg[]; // Details of each leg of the journey
  isFirstFlight?: boolean; // If this is the first flight for calender view thus cheapest
}

export interface PricingDetail {
  points: number; // Sould be displayed as 20k : if 47500 then 47.5K
  cashPrice: number; // Prices in USD
  productType: "ECONOMY" | "BUSINESS" | "FIRST" | "PREMIUM"; // COACH/ECONOMY/MAIN all means Economy
  mixedCabin: boolean; // If true then different cabins are available in the same flight
  seatsRemaining: number; // Number of seats remaining
}

export interface Leg {
  aircraft: string; // Type of aircraft
  carrierCode: string; // Carrier code
  flightNumber: string; // Flight number
  arrivalDateTime: string; // Local arrival time of this leg
  connectionTimeInMinutes: number; // Flight JED - DOH - LHR (555 minutes stop in DOHA)
  departureDateTime: string; // Local departure time of this leg
  destination: string; // Destination airport code
  durationInMinutes: number; // Total flight time for this leg
  origin: string; // Origin airport code
}
