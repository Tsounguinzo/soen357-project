import { FlightData } from "./FlightDataType";
import { CalendarDataItem } from "./interfaces";
import { extractDate } from "./utilities";

const prefix = "https://api.flymile.pro";

type Method = "GET" | "POST" | "PUT" | "DELETE";

const client = {
  async get(endpoint: string, init?: RequestInit): Promise<Response> {
    return fetch(prefix + endpoint, init);
  },

  async post(endpoint: string, init?: RequestInit): Promise<Response> {
    return fetch(prefix + endpoint, {
      method: "POST",
      ...init,
    });
  },

  async put(endpoint: string, init?: RequestInit): Promise<Response> {
    return fetch(prefix + endpoint, {
      method: "PUT",
      ...init,
    });
  },

  async delete(endpoint: string, init?: RequestInit): Promise<Response> {
    return fetch(prefix + endpoint, {
      method: "DELETE",
      ...init,
    });
  },

  async deserialize<T>(
    method: Method,
    endpoint: string,
    init?: RequestInit
  ): Promise<T> {
    const run = async (
      fn: (endpoint: string, init?: RequestInit) => Promise<Response>
    ): Promise<T> => (await (await fn(endpoint, init)).json()) as T;

    switch (method) {
      case "GET":
        return run(this.get);
      case "POST":
        return run(this.post);
      case "PUT":
        return run(this.put);
      case "DELETE":
        return run(this.delete);
    }
  },
};

export const repo = {
  async getDeltaFlights(
    departure: string,
    arrival: string,
    startDate: string,
    endDate: string,
    numPassengers: string,
    upperCabin: boolean,
    nonStopOnly: boolean
  ): Promise<FlightData[]> {
    return client.deserialize<FlightData[]>(
      "GET",
      `/flights/delta?departure=${departure}&arrival=${arrival}&startDate=${startDate}&endDate=${endDate}&numPassengers=${numPassengers}&upperCabin=${upperCabin}&nonStopOnly=${nonStopOnly}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },
  async getDeltaYearly(
    departure: string,
    arrival: string,
    numPassengers: string,
    upperCabin: boolean,
    nonStopOnly: boolean
  ): Promise<CalendarDataItem[]> {
    return client.deserialize<CalendarDataItem[]>(
      "GET",
      `/flights/delta/yearly?departure=${departure}&arrival=${arrival}&numPassengers=${numPassengers}&upperCabin=${upperCabin}&nonStopOnly=${nonStopOnly}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },

  async getDeltaMonthly(
    departure: string,
    arrival: string,
    startDate: string,
    numPassengers: string,
    upperCabin: boolean,
    nonStopOnly: boolean
  ): Promise<CalendarDataItem[]> {
    return client.deserialize<CalendarDataItem[]>(
      "GET",
      `/flights/delta/monthly?departure=${departure}&arrival=${arrival}&startDate=${startDate}&numPassengers=${numPassengers}&upperCabin=${upperCabin}&nonStopOnly=${nonStopOnly}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },
  async getAmericanFlights(
    departure: string,
    arrival: string,
    startDate: string,
    endDate: string,
    numPassengers: string,
    upperCabin: boolean,
    maxStops: string
  ): Promise<FlightData[]> {
    return client.deserialize<FlightData[]>(
      "GET",
      `/flights/american?departure=${departure}&arrival=${arrival}&startDate=${startDate}&endDate=${endDate}&numPassengers=${numPassengers}&upperCabin=${upperCabin}&maxStops=${maxStops}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },
  async getAmericanYearly(
    departure: string,
    arrival: string,
    numPassengers: string,
    upperCabin: boolean,
    maxStops: string
  ): Promise<CalendarDataItem[]> {
    return client.deserialize<CalendarDataItem[]>(
      "GET",
      `/flights/american/yearly?departure=${departure}&arrival=${arrival}&numPassengers=${numPassengers}&upperCabin=${upperCabin}&maxStops=${maxStops}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },

  async getAmericanMonthly(
    departure: string,
    arrival: string,
    startDate: string,
    numPassengers: string,
    upperCabin: boolean,
    maxStops: string
  ): Promise<CalendarDataItem[]> {
    return client.deserialize<CalendarDataItem[]>(
      "GET",
      `/flights/american/monthly?departure=${departure}&arrival=${arrival}&startDate=${startDate}&numPassengers=${numPassengers}&upperCabin=${upperCabin}&maxStops=${maxStops}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },
  async getAlaskaFlights(
    departure: string,
    arrival: string,
    startDate: string,
    endDate: string,
    numPassengers: string
  ): Promise<FlightData[]> {
    return client.deserialize<FlightData[]>(
      "GET",
      `/flights/alaska?departure=${departure}&arrival=${arrival}&startDate=${startDate}&endDate=${endDate}&numPassengers=${numPassengers}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },
  async getAlaskaYearly(
    departure: string,
    arrival: string,
    numPassengers: string
  ): Promise<CalendarDataItem[]> {
    return client.deserialize<CalendarDataItem[]>(
      "GET",
      `/flights/alaska/yearly?departure=${departure}&arrival=${arrival}&numPassengers=${numPassengers}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },

  async getAlaskaMonthly(
    departure: string,
    arrival: string,
    startDate: string,
    numPassengers: string
  ): Promise<CalendarDataItem[]> {
    return client.deserialize<CalendarDataItem[]>(
      "GET",
      `/flights/alaska/monthly?departure=${departure}&arrival=${arrival}&startDate=${startDate}&numPassengers=${numPassengers}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },

  async getJetBlueYearly(
    departure: string,
    arrival: string,
    numPassengers: string,
    upperCabin: boolean
  ): Promise<CalendarDataItem[]> {
    return client.deserialize<CalendarDataItem[]>(
      "GET",
      `/flights/jetblue/yearly?departure=${departure}&arrival=${arrival}&numPassengers=${numPassengers}&upperCabin=${upperCabin}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },

  async getJetBlueMonthly(
    departure: string,
    arrival: string,
    startDate: string,
    numPassengers: string,
    upperCabin: boolean
  ): Promise<CalendarDataItem[]> {
    return client.deserialize<CalendarDataItem[]>(
      "GET",
      `/flights/jetblue/monthly?departure=${departure}&arrival=${arrival}&startDate=${startDate}&numPassengers=${numPassengers}&upperCabin=${upperCabin}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },

  async getAllFlights(
    departure: string,
    arrival: string,
    startDate: string,
    endDate: string,
    numPassengers: string,
    upperCabin: boolean
  ): Promise<FlightData[]> {
    return client.deserialize<FlightData[]>(
      "GET",
      `/flights/all?departure=${departure}&arrival=${arrival}&startDate=${startDate}&endDate=${endDate}&numPassengers=${numPassengers}&upperCabin=${upperCabin}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },

  async getBookingLink(
    airline: string,
    departure: string,
    arrival: string,
    startDate: string,
    numPassengers: number
  ): Promise<{ url: string }> {
    return client.deserialize<{ url: string }>(
      "GET",
      `/booking-link?airline=${airline}&departure=${departure}&arrival=${arrival}&startDate=${startDate}&numPassengers=${numPassengers}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },

  async getAircraftLink(
    carrierCode: string,
    flightNumber: string,
    aircraft: string,
    departureDate: string
  ): Promise<{ url: string }> {
    return client.deserialize<{ url: string }>(
      "GET",
      `/findAircraft?carrierCode=${carrierCode}&flightNumber=${flightNumber}&aircraft=${aircraft}&departureDate=${extractDate(
        departureDate
      )}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },

  async getPromiseLink(
    airline: string,
    flightID: string,
    origin: string,
    destination: string,
    numPassengers: number,
    date: string,
    maxStops: string,
    upperCabin: boolean,
    nonStopOnly: boolean
  ): Promise<FlightData> {
    return client.deserialize<FlightData>(
      "GET",
      `/promiseLink?airline=${airline}&flightID=${flightID}&origin=${origin}&destination=${destination}&numPassengers=${numPassengers}&date=${date}&maxStops=${maxStops}&upperCabin=${upperCabin}&nonStopOnly=${nonStopOnly}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },

  async subscribeEmail(email: string): Promise<boolean> {
    return client.deserialize<boolean>("POST", "/subscribe", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  },

  async contactUs(formData: {
    name: string;
    message: string;
    email: string;
  }): Promise<boolean> {
    return client.deserialize<boolean>("POST", "/contact", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  },
};
