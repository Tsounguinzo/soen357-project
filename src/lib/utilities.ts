import { Leg } from "./FlightDataType";
import airports from "./airportsData";
import { CalendarDataItem, ProcessedCalenderDataItem } from "./interfaces";

export function convertDate(dateString: string) {
  let date = new Date(dateString);
  // Extract year, month, and day
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  let day = date.getDate().toString().padStart(2, "0");

  // Format the date
  let formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export function formatPoints(points: number) {
  if (points >= 1000) {
    const formattedPoints = (points / 1000).toFixed(1);
    return formattedPoints.endsWith(".0")
      ? formattedPoints.slice(0, -2) + "K"
      : formattedPoints + "K";
  }
  return points.toString();
}

export function formatDate(dateString: string) {
  const parts = dateString.split("-");
  const year = parts[0];
  const month = parseInt(parts[1], 10); // Parse the month as an integer
  const day = parseInt(parts[2], 10); // Parse the day as an integer
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[month - 1]; // Adjust month index to start from 0
  const formattedDate = `${monthName} ${day}, ${year}`;
  return formattedDate;
}

export function extractDate(dateTime: string) {
  return dateTime.split("T")[0];
}

export function formatDuration(durationInMinutes: number) {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  if (hours === 0) {
    return `${minutes}min`;
  } else if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}min`;
  }
}

export function generateItinerary(legs: Leg[]) {
  const itinerary = legs.map((leg) => leg.origin);
  itinerary.push(legs[legs.length - 1].destination); // Add the final destination
  return itinerary;
}

export function extractTimeWithUnit(timestamp: string) {
  // Extract time from the timestamp string
  const timeString = timestamp.split("T")[1].split(".")[0];

  // Extract hours, minutes, and offset from the time string
  const [hoursStr, minutesStr, offsetStr] = timeString.split(/:|\+/);
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  const offset = offsetStr ? parseInt(offsetStr, 10) : 0;

  // Calculate adjusted hours and minutes based on the offset
  const adjustedHours = hours + Math.floor(offset / 100);
  const adjustedMinutes = minutes + (offset % 100);

  // Adjust hours to keep them within 0-23 range
  const adjustedHoursInRange = (adjustedHours + 24) % 24;

  // Convert adjusted hours to 12-hour format and determine meridiem
  let hours12Format = adjustedHoursInRange % 12;
  if (hours12Format === 0) {
    hours12Format = 12;
  }
  const meridiem = adjustedHoursInRange < 12 ? "AM" : "PM";

  // Add leading zero to minutes if needed
  const formattedMinutes = (adjustedMinutes < 10 ? "0" : "") + adjustedMinutes;

  // Construct the formatted time string
  const formattedTime = `${hours12Format}:${formattedMinutes} ${meridiem}`;

  return formattedTime;
}

export function getCityName(airportCode: string) {
  const airport = airports.find(
    (airport) => airport.airportCode === airportCode
  );
  return airport ? airport.cityName : "x";
}

export function generateUrl(
  departure: string,
  arrival: string,
  date: string,
  numPassengers: number
) {
  let slice =
    '[{"orig":"' +
    departure +
    '","origNearby":false,"dest":"' +
    arrival +
    '","destNearby":false,"date":"' +
    date +
    '"}]';
  // Encoding the slice part of the URL
  let encodedSlice = encodeURI(slice);
  const urlBase = "https://www.aa.com/booking/search?locale=en_US&pax=";
  const urlSlice = "&type=OneWay&searchType=Award&cabin=&carriers=ALL&slices=";
  return (
    urlBase +
    numPassengers +
    "&adult=" +
    numPassengers +
    urlSlice +
    encodedSlice
  );
}

export function processCalendarData(
  data: CalendarDataItem[]
): ProcessedCalenderDataItem[] {
  return data
    .map(({ points, cashPrice, date }) => {
      const dateObj = new Date(date);
      const monthShort = dateObj.toLocaleString("en-us", { month: "short" });
      return {
        month: monthShort,
        date: date,
        points: points,
        price: cashPrice,
      };
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function hexToRGBA(hex: string, opacity: number): string {
  let r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function getTomorrowDate() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

export function getAfterTomorrowDate() {
  const today = new Date();
  const afterTomorrow = new Date(today);
  afterTomorrow.setDate(afterTomorrow.getDate() + 2);
  return afterTomorrow;
}

export function getFullMonthName(shortMonthName: string) {
  const monthMap = new Map([
    ["Jan", "January"],
    ["Feb", "February"],
    ["Mar", "March"],
    ["Apr", "April"],
    ["May", "May"],
    ["Jun", "June"],
    ["Jul", "July"],
    ["Aug", "August"],
    ["Sep", "September"],
    ["Oct", "October"],
    ["Nov", "November"],
    ["Dec", "December"],
  ]);

  const month = monthMap.get(
    shortMonthName.charAt(0).toUpperCase() +
      shortMonthName.slice(1).toLowerCase()
  );
  return month || shortMonthName;
}

export function getProgramColor(Program: string) {
  if (Program === "American") {
    return "#F9533E";
  } else if (Program === "Alaska") {
    return "#741ed0";
  } else if (Program === "Delta") {
    return "#27C3B2";
  } else if (Program === "JetBlue") {
    return "#345fd5";
  } else {
    return "#000";
  }
}

export function programShortNameToFullName(Program: string) {
  if (Program === "American") {
    return "American AAdvantage";
  } else if (Program === "Alaska") {
    return "Alaska Milage Plan";
  } else if (Program === "Delta") {
    return "Delta SkyMiles";
  } else {
    return "";
  }
}

export function getJetBlueBookingLink(origin: string, destination: string, date: string, numPassengers: number) {
  return `https://www.jetblue.com/booking/flights?from=${origin}&to=${destination}&depart=${date}&isMultiCity=false&noOfRoute=1&lang=en&adults=${numPassengers}&children=0&infants=0&sharedMarket=false&roundTripFaresFlag=false&usePoints=true`
}