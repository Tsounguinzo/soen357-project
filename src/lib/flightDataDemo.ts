import { FlightData } from "./FlightDataType";

const flightData: FlightData = {
  // Total flight duration in minutes (sum of durations of all legs + sum of duration of all connection times)
  duration: 1140,

  flightID: "this is just an example",

  // If arrives same day then 0, if arrives next day then 1, if arrives next next day then 2 and so on.
  arrivesNextDay: 0,

  //source airline
  sourceAirline: "AA",

  // Details of pricing for different product types
  pricingDetail: [
    {
      // Sould be displayed as 20k : if 47500 then 47.5K
      points: 20000,

      // Prices in USD
      cashPrice: 75.33,

      // ECONOMY/ECONOMY/MAIN all means Economy
      productType: "ECONOMY",

      // Number of seats remaining
      seatsRemaining: 2,

      //mixedCabin is false because all seats are in the same cabin
      mixedCabin: false,
    },
    {
      // If points = 0, means NO business class cabin on this particular flight.
      points: 0,
      cashPrice: 0,
      productType: "BUSINESS",
      seatsRemaining: 0,
      mixedCabin: false,
    },
    // You can see Premium Economy is Not displayed, WHY? because none of flights this DATE included Premium Economy.
    {
      points: 47500,
      cashPrice: 75.33,
      productType: "FIRST",
      seatsRemaining: 0, // Number of Seats not disclosed
      mixedCabin: false,
    },
  ],

  // Details of each leg of the journey
  legs: [
    {
      // Type of aircraft
      aircraft: "Boeing 787-8",

      // Carrier code
      carrierCode: "2J",

      // Flight number
      flightNumber: "1183",

      // Local arrival time of this leg
      arrivalDateTime: "2024-06-14T05:55:00.000+03:00",

      // Flight JED - DOH - LHR (555 minutes stop in DOHA)
      connectionTimeInMinutes: 555,

      // Local departure time of this leg
      departureDateTime: "2024-06-14T03:25:00.000+03:00",

      // Destination airport code
      destination: "DOH",

      // Total flight time for this leg
      durationInMinutes: 150,

      // Origin airport code
      origin: "JED",
    },
    {
      // Type of aircraft
      aircraft: "Boeing 777-300ER Passenger",

      // Carrier code
      carrierCode: "QR",

      // Flight number
      flightNumber: "15",

      // Local arrival time of this leg
      arrivalDateTime: "2024-06-14T20:25:00.000+01:00",

      // AS this is the final leg, thus no connection
      connectionTimeInMinutes: 0,

      // Local departure time of this leg
      departureDateTime: "2024-06-14T15:10:00.000+03:00",

      // Destination airport code
      destination: "LHR",

      // Total flight time for this leg
      durationInMinutes: 435,

      // Origin airport code
      origin: "DOH",
    },

    {
      // Type of aircraft
      aircraft: "Boeing 787-8",

      // Carrier code
      carrierCode: "AA",

      // Flight number
      flightNumber: "1183",

      // Local arrival time of this leg
      arrivalDateTime: "2024-06-14T05:55:00.000+03:00",

      // Flight JED - DOH - LHR (555 minutes stop in DOHA)
      connectionTimeInMinutes: 555,

      // Local departure time of this leg
      departureDateTime: "2024-06-14T03:25:00.000+03:00",

      // Destination airport code
      destination: "DOH",

      // Total flight time for this leg
      durationInMinutes: 150,

      // Origin airport code
      origin: "JED",
    },
  ],
};

const flightData1: FlightData = {
  // Total flight duration in minutes (sum of durations of all legs + sum of duration of all connection times)
  duration: 1140,

  //source airline
  sourceAirline: "QR",

  flightID: "this is just an example",

  // If arrives same day then 0, if arrives next day then 1, if arrives next next day then 2 and so on.
  arrivesNextDay: 0,

  // Details of pricing for different product types
  pricingDetail: [
    {
      // Sould be displayed as 20k : if 47500 then 47.5K
      points: 20000,

      // Prices in USD
      cashPrice: 75.33,

      // ECONOMY/ECONOMY/MAIN all means Economy
      productType: "ECONOMY",

      // Number of seats remaining
      seatsRemaining: 2,

      //mixedCabin is false because all seats are in the same cabin
      mixedCabin: false,
    },
    {
      // If points = 0, means NO business class cabin on this particular flight.
      points: 0,
      cashPrice: 0,
      productType: "BUSINESS",
      seatsRemaining: 0,
      mixedCabin: false,
    },
    // You can see Premium Economy is Not displayed, WHY? because none of flights this DATE included Premium Economy.
    {
      points: 47500,
      cashPrice: 75.33,
      productType: "FIRST",
      seatsRemaining: 0, // Number of Seats not disclosed
      mixedCabin: false,
    },
  ],

  // Details of each leg of the journey
  legs: [
    {
      // Type of aircraft
      aircraft: "Boeing 777-300ER Passenger",

      // Carrier code
      carrierCode: "QR",

      // Flight number
      flightNumber: "15",

      // Local arrival time of this leg
      arrivalDateTime: "2024-06-14T20:25:00.000+01:00",

      // AS this is the final leg, thus no connection
      connectionTimeInMinutes: 0,

      // Local departure time of this leg
      departureDateTime: "2024-06-14T15:10:00.000+03:00",

      // Destination airport code
      destination: "LHR",

      // Total flight time for this leg
      durationInMinutes: 435,

      // Origin airport code
      origin: "DOH",
    },

    {
      // Type of aircraft
      aircraft: "Boeing 787-8",

      // Carrier code
      carrierCode: "AA",

      // Flight number
      flightNumber: "1183",

      // Local arrival time of this leg
      arrivalDateTime: "2024-06-14T05:55:00.000+03:00",

      // Flight JED - DOH - LHR (555 minutes stop in DOHA)
      connectionTimeInMinutes: 555,

      // Local departure time of this leg
      departureDateTime: "2024-06-14T03:25:00.000+03:00",

      // Destination airport code
      destination: "DOH",

      // Total flight time for this leg
      durationInMinutes: 150,

      // Origin airport code
      origin: "JED",
    },
  ],
};

const flightData2: FlightData = {
  // Total flight duration in minutes (sum of durations of all legs + sum of duration of all connection times)
  duration: 1140,

  //source airline
  sourceAirline: "AA",
  flightID: "this is just an example",

  // If arrives same day then 0, if arrives next day then 1, if arrives next next day then 2 and so on.
  arrivesNextDay: 0,

  // Details of pricing for different product types
  pricingDetail: [
    {
      // Sould be displayed as 20k : if 47500 then 47.5K
      points: 20000,

      // Prices in USD
      cashPrice: 75.33,

      // ECONOMY/ECONOMY/MAIN all means Economy
      productType: "ECONOMY",

      // Number of seats remaining
      seatsRemaining: 2,

      mixedCabin: false,
    },
    {
      // If points = 0, means NO business class cabin on this particular flight.
      points: 0,
      cashPrice: 0,
      productType: "BUSINESS",
      seatsRemaining: 0,
      mixedCabin: false,
    },
    // You can see Premium Economy is Not displayed, WHY? because none of flights this DATE included Premium Economy.
    {
      points: 47500,
      cashPrice: 75.33,
      productType: "FIRST",
      seatsRemaining: 0, // Number of Seats not disclosed
      mixedCabin: false,
    },
  ],

  // Details of each leg of the journey
  legs: [
    {
      // Type of aircraft
      aircraft: "Boeing 777-300ER Passenger",

      // Carrier code
      carrierCode: "QR",

      // Flight number
      flightNumber: "15",

      // Local arrival time of this leg
      arrivalDateTime: "2024-06-14T20:25:00.000+01:00",

      // AS this is the final leg, thus no connection
      connectionTimeInMinutes: 0,

      // Local departure time of this leg
      departureDateTime: "2024-06-14T15:10:00.000+03:00",

      // Destination airport code
      destination: "LHR",

      // Total flight time for this leg
      durationInMinutes: 435,

      // Origin airport code
      origin: "DOH",
    },
  ],
};

const flightsData = [
  flightData2,
  flightData1,
  flightData2,
  flightData1,
  flightData,
  flightData1,
  flightData,
];
export default flightsData;
