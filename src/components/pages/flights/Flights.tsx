import { Box, Skeleton } from "@mui/material";
import { SearchForm } from "../../searchForm/SearchForm";
import FlightsList from "../../flight/FlightsList";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IAirport, Idata, IFlightsProps, Value } from "../../../lib/interfaces";
import {
  convertDate,
  getAfterTomorrowDate,
  getTomorrowDate,
} from "../../../lib/utilities";
import { repo } from "../../../lib/repo";
import { FlightData } from "../../../lib/FlightDataType";
import { FlightSkeleton } from "../../flight/FlightSkeleton";
import { v4 as uuidv4 } from "uuid";
import { Layout } from "../../layout/Layout";

export function Flights(props: IFlightsProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [flights, setAllFlights] = useState<FlightData[]>();
  const [data, setData] = useState<Idata | null>(null);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (location.state && location.state.data) {
      const state_data: Idata = location.state.data;
      setData(state_data);
      const fetchData = async () => {
        setLoading(true);
        setOrigin(state_data.departure);
        setDestination(state_data.arrival);
        setCabin(state_data.upperCabin);
        setSelectedNumOfPass(state_data.numPassengers);
        if (state_data.fromToDate) setFromToDate(state_data.fromToDate);
        const allFlights = await repo.getAllFlights(
          state_data.departure.airportCode,
          state_data.arrival.airportCode,
          state_data.startDate,
          state_data.endDate,
          state_data.numPassengers,
          state_data.upperCabin
        );
        if ("message" in allFlights) {
          setError(allFlights.message as string);
        } else {
          setAllFlights(allFlights);
        }
        setLoading(false);
      };
      fetchData();
    } else {
      navigate("/");
    }
  }, []);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const [selectedNumOfPass, setSelectedNumOfPass] = useState<string>("1");
  const [fromToDate, setFromToDate] = useState<Value>([
    getTomorrowDate(),
    getAfterTomorrowDate(),
  ]);
  const [cabin, setCabin] = useState<boolean>(false);
  const [origin, setOrigin] = useState<IAirport | null>({
    airportCode: "YUL",
    cityName: "Montreal",
  });
  const [destination, setDestination] = useState<IAirport | null>({
    airportCode: "LHR",
    cityName: "London-Heathrow",
  });

  const handleChangeNumOfPass = (value: string) => {
    setSelectedNumOfPass(value);
  };
  const handleChangeCabin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCabin(event.target.checked);
  };
  function handleOnChangeOrigin(event: any, value: IAirport | null) {
    setOrigin(value);
  }
  function handleOnChangeDestination(event: any, value: IAirport | null) {
    setDestination(value);
  }
  function handleSwapValues() {
    if (origin && destination) {
      let temp = origin;
      setOrigin(destination);
      setDestination(temp);
    }
  }
  function handleOnCloseSnackbar(
    event: React.SyntheticEvent | Event,
    reason?: string
  ) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  }

  function handleOnSubmitForm(event: any) {
    event.preventDefault();
    setError(undefined);
    if (origin && destination && selectedNumOfPass) {
      if (
        Array.isArray(fromToDate) &&
        fromToDate.length === 2 &&
        fromToDate[0] &&
        fromToDate[1]
      ) {
        const state_data: Idata = {
          departure: origin,
          arrival: destination,
          startDate: convertDate(fromToDate[0].toString()),
          endDate: convertDate(fromToDate[1].toString()),
          numPassengers: selectedNumOfPass,
          upperCabin: cabin,
        };
        setData(state_data);
        const fetchData = async () => {
          if (fromToDate[0] && fromToDate[1]) {
            setLoading(true);
            const allFlights = await repo.getAllFlights(
              origin.airportCode,
              destination.airportCode,
              convertDate(fromToDate[0].toString()),
              convertDate(fromToDate[1].toString()),
              selectedNumOfPass,
              cabin
            );
            if ("message" in allFlights) {
              setError(allFlights.message as string);
            } else {
              setAllFlights(allFlights);
            }
            setLoading(false);
          }
        };
        fetchData();
      }
    } else {
      setOpenSnackbar(true);
    }
  }

  return (
    <Layout>
      <SearchForm
        cabin={cabin}
        destination={destination}
        origin={origin}
        fromToDate={fromToDate}
        setFromToDate={setFromToDate}
        handleChangeCabin={handleChangeCabin}
        handleChangeNumOfPass={handleChangeNumOfPass}
        handleOnChangeDestination={handleOnChangeDestination}
        handleOnChangeOrigin={handleOnChangeOrigin}
        handleOnCloseSnackbar={handleOnCloseSnackbar}
        openSnackbar={openSnackbar}
        handleSwapValues={handleSwapValues}
        setOpenSnackbar={setOpenSnackbar}
        selectedNumOfPass={selectedNumOfPass}
        handleOnSubmitForm={handleOnSubmitForm}
        isLoading={loading}
      />
      <Box mt={"80px"}></Box>
      {data && flights && !loading ? (
        <FlightsList
          upperCabin={cabin}
          flightsData={flights}
          numOfPass={Number(data.numPassengers)}
          departure={origin?.airportCode}
          arrival={destination?.airportCode}
          error={error}
        />
      ) : (
        <>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <FlightSkeleton key={uuidv4()} />
            ))}
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"center"}
            mt={3}
          >
            <Skeleton variant="rectangular" width={20} height={20} />
            <Skeleton variant="circular" width={20} />
            <Skeleton variant="circular" width={20} />
            <Skeleton variant="circular" width={20} />
            <Skeleton variant="rectangular" width={20} height={20} />
          </Box>
        </>
      )}
    </Layout>
  );
}
