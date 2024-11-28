import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Pagination,
  PaginationItem,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FlightData, PricingDetail } from "../../lib/FlightDataType";
import { CustomSelect } from "../select/CustomSelect";
import { ArrowDropDown, Clear, Lock } from "@mui/icons-material";
import { Flight } from "../flight/Flight";
import {
  getProgramColor,
  programShortNameToFullName,
} from "../../lib/utilities";
import { IFlightsListProps } from "../../lib/interfaces";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { PROGRAMS } from "./CalendarView";
import Filters from "../flight/Filters";
import {
  SignInButton as ClerkSignInButton,
  SignedOut,
  useAuth,
} from "@clerk/clerk-react";
import { uniqueAirlines, US_AVOID_CONNECTIONS } from "../../lib/airlines";

const SignInButton = styled(ClerkSignInButton)({
  border: "none",
  color: "#fff",
  cursor: "pointer",
  fontSize: "16px",
  outline: "none",
});

const CalendarFlightsList: React.FC<IFlightsListProps> = ({
  flightsData,
  numOfPass,
  upperCabin,
  error,
  program,
  departure,
  arrival,
  nonStopOnly,
  maxStops,
}) => {
  const { isSignedIn } = useAuth();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

  const sortOptions = [
    "Duration",
    "Economy Points",
    "Premium Points",
    "Business Points",
    "First Points",
  ];

  const totalNumberOfFlights = flightsData.length;
  const maxFlightDurationMinutes = flightsData.reduce(
    (max, obj) => (obj.duration > max ? obj.duration : max),
    -Infinity
  );
  const maxFlightDuration = Math.ceil(maxFlightDurationMinutes / 60);
  const maxFlightsPoints = 405000;
  const maxFlightsPrice = 1000;
  const flightsPerPage = 20; // Number of flights to display per page

  const [initialFlights, setInitialFlights] =
    useState<FlightData[]>(flightsData);
  const [filteredFlights, setFliteredFlights] =
    useState<FlightData[]>(flightsData);
  const [hasFilter, setHasFilter] = useState(false);
  const [stop, setStop] = useState<string>("0");
  const [sort, setSortValue] = useState(
    upperCabin ? "Business Points" : "Economy Points"
  );
  const [noUsStops, setNoUsStops] = useState(false);
  const [checkedSwitch, setCheckedSwitch] = React.useState(true);
  const [selectedAirlines, setSelectAirlines] = React.useState<string[]>(
    program ? [programShortNameToFullName(program)] : []
  );
  const [sortCabinPoints, setSortCabinPoints] = React.useState<{
    sortBy: string;
    cabin: string;
  }>(
    upperCabin
      ? { sortBy: "up", cabin: "BUSINESS" }
      : { sortBy: "up", cabin: "ECONOMY" }
  );
  const [highlightedCabin, setHighlightedCabin] = useState<
    "ECONOMY" | "BUSINESS" | "FIRST" | "PREMIUM"
  >(upperCabin ? "BUSINESS" : "ECONOMY");
  const [durationSliderValue, setDurationSliderValue] =
    useState<number>(maxFlightDuration);
  const [pointsSliderValueEcon, setPointsSliderValueEcon] =
    useState<number>(maxFlightsPoints);
  const [pointsSliderValuePrem, setPointsSliderValuePrem] =
    useState<number>(maxFlightsPoints);
  const [pointsSliderValueBusiness, setPointsSliderValueBusiness] =
    useState<number>(maxFlightsPoints);
  const [pointsSliderValueFirst, setPointsSliderValueFirst] =
    useState<number>(maxFlightsPoints);
  const [priceSliderValue, setPriceSliderValue] =
    useState<number>(maxFlightsPrice);
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * flightsPerPage;
  const endIndex = page * flightsPerPage;
  // Get the flights to display for the current page
  const displayedFlights = filteredFlights.slice(startIndex, endIndex);

  useEffect(() => {
    const cabinsToCompare =
      program === PROGRAMS.ALASKA
        ? ["ECONOMY", "PREMIUM", "BUSINESS", "FIRST"]
        : sortCabinPoints.cabin === "BUSINESS"
        ? ["BUSINESS", "FIRST"]
        : ["ECONOMY", "PREMIUM"];

    let cheapestCabin = sortCabinPoints.cabin;
    let lowestOverallScore = Number.MAX_SAFE_INTEGER;
    let cheapestFlightID: string | null = null;

    // Iterate through each flight to find the cheapest based on the criteria
    initialFlights.forEach((flight) => {
      const eligibleDetails = flight.pricingDetail.filter((detail) =>
        cabinsToCompare.includes(detail.productType)
      );

      eligibleDetails.forEach((detail) => {
        const score = detail.points + detail.cashPrice; // Simple sum as a scoring mechanism
        if (score < lowestOverallScore) {
          lowestOverallScore = score;
          cheapestCabin = detail.productType;
          cheapestFlightID = flight.flightID; // Capture the ID of the first cheapest flight found
        }
      });
    });

    setSortValue(
      `${cheapestCabin.charAt(0)}${cheapestCabin.slice(1).toLowerCase()} Points`
    );
    setSortCabinPoints({ sortBy: "up", cabin: cheapestCabin });
    filterAndSorting(
      stop,
      selectedAirlines,
      {
        sortBy: "up",
        cabin: cheapestCabin,
      },
      noUsStops,
      durationSliderValue,
      pointsSliderValueEcon,
      pointsSliderValuePrem,
      pointsSliderValueBusiness,
      pointsSliderValueFirst,
      priceSliderValue
    );
    setHasFilter(false);
    setHighlightedCabin(
      cheapestCabin as "ECONOMY" | "BUSINESS" | "FIRST" | "PREMIUM"
    );
    setFliteredFlights((prev: FlightData[]) => {
      const indexInOriginal = initialFlights.findIndex(
        (flight) => flight?.flightID === cheapestFlightID
      );
      const newFlightsData = flightsData.map((flight, index) =>
        index === indexInOriginal ? { ...flight, isFirstFlight: true } : flight
      );
      setInitialFlights(newFlightsData);
      if (prev.length) {
        const indexInFilteredFlights = prev.findIndex(
          (flight) => flight?.flightID === cheapestFlightID
        );
        if (prev[indexInFilteredFlights]) {
          prev[indexInFilteredFlights].isFirstFlight = true;
        } else {
          prev[0].isFirstFlight = true;
        }
      }
      return prev;
    });
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSortChange = (value: string) => {
    setSortValue(value);
    let sortValue = { sortBy: "no-sorting", cabin: "" };
    if (value === "Duration") {
      sortValue = { sortBy: "duration", cabin: "up" };
    } else if (value === "Economy Points") {
      sortValue = { sortBy: "up", cabin: "ECONOMY" };
    } else if (value === "Premium Points") {
      sortValue = { sortBy: "up", cabin: "PREMIUM" };
    } else if (value === "Business Points") {
      sortValue = { sortBy: "up", cabin: "BUSINESS" };
    } else if (value === "First Points") {
      sortValue = { sortBy: "up", cabin: "FIRST" };
    }
    setSortCabinPoints(sortValue);
    filterAndSorting(
      stop,
      selectedAirlines,
      sortValue,
      noUsStops,
      durationSliderValue,
      pointsSliderValueEcon,
      pointsSliderValuePrem,
      pointsSliderValueBusiness,
      pointsSliderValueFirst,
      priceSliderValue
    );
  };

  const filterAndSorting = (
    stopValue: string,
    selectedAirlinesValues: string[],
    sortValue: { sortBy: string; cabin: string },
    nousStops: boolean,
    durationValue: number,
    pointsValueEcon: number,
    pointsValuePrem: number,
    pointsValueBuss: number,
    pointsValueFirst: number,
    priceValue: number
  ) => {
    if (
      (selectedAirlinesValues.length === 1 &&
        selectedAirlinesValues[0] === undefined) ||
      selectedAirlinesValues.length === 0
    ) {
      setCheckedSwitch(true);
      setFliteredFlights((prev: FlightData[]) => {
        setHasFilter(true);
        let flightsDataFilteredAndSorted: FlightData[] = [];
        if (stopValue === "1") {
          flightsDataFilteredAndSorted = initialFlights.filter(
            (flight) => flight.legs.length === 1
          );
        } else if (stopValue === "2" || stopValue === "3") {
          setHasFilter(true);
          flightsDataFilteredAndSorted = initialFlights.filter(
            (flight) => flight.legs.length <= Number(stopValue)
          );
        } else {
          flightsDataFilteredAndSorted = [...initialFlights];
        }
        if (nousStops) {
          flightsDataFilteredAndSorted = flightsDataFilteredAndSorted.filter(
            (flight) => {
              let stopsCodes: string[] = [];
              flight.legs.map((leg, index) => {
                if (index === 0) {
                  stopsCodes.push(leg.destination);
                } else if (index === flight.legs.length - 1) {
                  stopsCodes.push(leg.origin);
                } else {
                  stopsCodes.push(leg.origin);
                  stopsCodes.push(leg.destination);
                }
              });
              if (
                stopsCodes.some((code) => US_AVOID_CONNECTIONS.includes(code))
              ) {
                return false;
              } else {
                return true;
              }
            }
          );
        }
        flightsDataFilteredAndSorted = flightsDataFilteredAndSorted.filter(
          (flight) => {
            let flightDuration = flight.duration / 60;
            if (flightDuration <= durationValue) {
              return true;
            } else {
              setHasFilter(true);
              return false;
            }
          }
        );

        let newflightsDataFilteredAndSorted = [];
        for (
          let index = 0;
          index < flightsDataFilteredAndSorted.length;
          index++
        ) {
          let flight = flightsDataFilteredAndSorted[index];
          let newPricingDetails: PricingDetail[] = [];
          let econPD = flight.pricingDetail.find(
            (pd) => pd.productType === "ECONOMY"
          );
          if (econPD) {
            if (pointsValueEcon === maxFlightsPoints) {
              newPricingDetails.push(econPD);
            } else if (
              pointsValueEcon < maxFlightsPoints &&
              pointsValueEcon > 0
            ) {
              if (econPD.points <= pointsValueEcon) {
                newPricingDetails.push(econPD);
              }
            }
          }
          let premPD = flight.pricingDetail.find(
            (pd) => pd.productType === "PREMIUM"
          );
          if (premPD) {
            if (pointsValuePrem === maxFlightsPoints) {
              newPricingDetails.push(premPD);
            } else if (
              pointsValuePrem < maxFlightsPoints &&
              pointsValuePrem > 0
            ) {
              if (premPD.points <= pointsValuePrem) {
                newPricingDetails.push(premPD);
              }
            }
          }
          let bussPD = flight.pricingDetail.find(
            (pd) => pd.productType === "BUSINESS"
          );
          if (bussPD) {
            if (pointsValueBuss === maxFlightsPoints) {
              newPricingDetails.push(bussPD);
            } else if (
              pointsValueBuss < maxFlightsPoints &&
              pointsValueBuss > 0
            ) {
              if (bussPD.points <= pointsValueBuss) {
                newPricingDetails.push(bussPD);
              }
            }
          }
          let firstPD = flight.pricingDetail.find(
            (pd) => pd.productType === "FIRST"
          );
          if (firstPD) {
            if (pointsValueFirst === maxFlightsPoints) {
              newPricingDetails.push(firstPD);
            } else if (
              pointsValueFirst < maxFlightsPoints &&
              pointsValueFirst > 0
            ) {
              if (firstPD.points <= pointsValueBuss) {
                newPricingDetails.push(firstPD);
              }
            }
          }
          if (newPricingDetails.length > 0) {
            let newFlight = { ...flight };
            newFlight.pricingDetail = [...newPricingDetails];
            newflightsDataFilteredAndSorted.push(newFlight);
          }
        }

        flightsDataFilteredAndSorted = [...newflightsDataFilteredAndSorted];

        flightsDataFilteredAndSorted = flightsDataFilteredAndSorted.filter(
          (flight) =>
            flight.pricingDetail.every((cabin) => cabin.cashPrice <= priceValue)
        );
        if (sortValue.sortBy === "duration") {
          flightsDataFilteredAndSorted.sort(
            (a: FlightData, b: FlightData): number => {
              if (sortValue.cabin === "up") {
                return a.duration - b.duration;
              } else {
                return b.duration - a.duration;
              }
            }
          );
        } else if (sortValue.sortBy === "up") {
          flightsDataFilteredAndSorted.sort(
            (a: FlightData, b: FlightData): number => {
              const aDetail = a.pricingDetail.find(
                (detail) => detail.productType === sortValue.cabin
              );
              const bDetail = b.pricingDetail.find(
                (detail) => detail.productType === sortValue.cabin
              );
              if (
                (!aDetail && !bDetail) ||
                (aDetail &&
                  bDetail &&
                  aDetail.points === bDetail.points &&
                  aDetail.cashPrice === bDetail.cashPrice)
              ) {
                return 0;
              }
              if (!aDetail) return 1;
              if (!bDetail) return -1;
              if (aDetail.points === bDetail.points) {
                return aDetail.cashPrice - bDetail.cashPrice;
              }
              return aDetail.points - bDetail.points;
            }
          );
        } else if (sortValue.sortBy === "down") {
          flightsDataFilteredAndSorted.sort(
            (a: FlightData, b: FlightData): number => {
              const aDetail = a.pricingDetail.find(
                (detail) => detail.productType === sortValue.cabin
              );
              const bDetail = b.pricingDetail.find(
                (detail) => detail.productType === sortValue.cabin
              );
              if (
                (!aDetail && !bDetail) ||
                (aDetail &&
                  bDetail &&
                  aDetail.points === bDetail.points &&
                  aDetail.cashPrice === bDetail.cashPrice)
              ) {
                return 0;
              }
              if (!aDetail) return 1;
              if (!bDetail) return -1;
              if (aDetail.points === bDetail.points) {
                return bDetail.cashPrice - aDetail.cashPrice;
              }
              return bDetail.points - aDetail.points;
            }
          );
        }
        return flightsDataFilteredAndSorted;
      });
      setPage(1);
    } else {
      setHasFilter(true);
      setFliteredFlights((prev: FlightData[]) => {
        const codes = selectedAirlinesValues
          .map((name) => {
            const airline = uniqueAirlines.find(
              (airline) => airline.name === name
            );
            return airline ? airline.code : null;
          })
          .filter((code) => code != null);
        let returnedFlights = flightsData.filter((flight) => {
          let aa = codes.includes("AAA");
          let dl = codes.includes("DLS");
          let as = codes.includes("AMP");
          if (aa) {
            if (flight.sourceAirline === "AA") {
              return true;
            }
          }
          if (dl) {
            if (flight.sourceAirline === "DL") {
              return true;
            }
          }
          if (as) {
            if (flight.sourceAirline === "AS") {
              return true;
            }
          }
          const flighAirlinesCodes = flight.legs.map((leg) => {
            return leg.carrierCode;
          });
          if (flighAirlinesCodes.some((code) => codes.includes(code))) {
            return true;
          } else {
            return false;
          }
        });
        if (stopValue === "1") {
          returnedFlights = returnedFlights.filter(
            (flight) => flight.legs.length === 1
          );
        } else if (stopValue === "2" || stopValue === "3") {
          returnedFlights = returnedFlights.filter(
            (flight) => flight.legs.length <= Number(stopValue)
          );
        }
        if (nousStops) {
          returnedFlights = returnedFlights.filter((flight) => {
            let stopsCodes: string[] = [];
            flight.legs.map((leg, index) => {
              if (index === 0) {
                stopsCodes.push(leg.destination);
              } else if (index === flight.legs.length - 1) {
                stopsCodes.push(leg.origin);
              } else {
                stopsCodes.push(leg.origin);
                stopsCodes.push(leg.destination);
              }
            });
            if (
              stopsCodes.some((code) => US_AVOID_CONNECTIONS.includes(code))
            ) {
              return false;
            } else {
              return true;
            }
          });
        }
        returnedFlights = returnedFlights.filter((flight) => {
          let flightDuration = flight.duration / 60;
          if (flightDuration <= durationValue) {
            return true;
          } else {
            return false;
          }
        });
        let newflightsDataFilteredAndSorted = [];
        for (let index = 0; index < returnedFlights.length; index++) {
          let flight = returnedFlights[index];
          let newPricingDetails: PricingDetail[] = [];
          let econPD = flight.pricingDetail.find(
            (pd) => pd.productType === "ECONOMY"
          );
          if (econPD) {
            if (pointsValueEcon === maxFlightsPoints) {
              newPricingDetails.push(econPD);
            } else if (
              pointsValueEcon < maxFlightsPoints &&
              pointsValueEcon > 0
            ) {
              if (econPD.points <= pointsValueEcon) {
                newPricingDetails.push(econPD);
              }
            }
          }
          let premPD = flight.pricingDetail.find(
            (pd) => pd.productType === "PREMIUM"
          );
          if (premPD) {
            if (pointsValuePrem === maxFlightsPoints) {
              newPricingDetails.push(premPD);
            } else if (
              pointsValuePrem < maxFlightsPoints &&
              pointsValuePrem > 0
            ) {
              if (premPD.points <= pointsValuePrem) {
                newPricingDetails.push(premPD);
              }
            }
          }
          let bussPD = flight.pricingDetail.find(
            (pd) => pd.productType === "BUSINESS"
          );
          if (bussPD) {
            if (pointsValueBuss === maxFlightsPoints) {
              newPricingDetails.push(bussPD);
            } else if (
              pointsValueBuss < maxFlightsPoints &&
              pointsValueBuss > 0
            ) {
              if (bussPD.points <= pointsValueBuss) {
                newPricingDetails.push(bussPD);
              }
            }
          }
          let firstPD = flight.pricingDetail.find(
            (pd) => pd.productType === "FIRST"
          );
          if (firstPD) {
            if (pointsValueFirst === maxFlightsPoints) {
              newPricingDetails.push(firstPD);
            } else if (
              pointsValueFirst < maxFlightsPoints &&
              pointsValueFirst > 0
            ) {
              if (firstPD.points <= pointsValueBuss) {
                newPricingDetails.push(firstPD);
              }
            }
          }
          if (newPricingDetails.length > 0) {
            let newFlight = { ...flight };
            newFlight.pricingDetail = [...newPricingDetails];
            newflightsDataFilteredAndSorted.push(newFlight);
          }
        }
        returnedFlights = [...newflightsDataFilteredAndSorted];
        returnedFlights = returnedFlights.filter((flight) =>
          flight.pricingDetail.every((cabin) => cabin.cashPrice <= priceValue)
        );
        if (sortValue.sortBy === "duration") {
          returnedFlights.sort((a: FlightData, b: FlightData): number => {
            if (sortValue.cabin === "up") {
              return a.duration - b.duration;
            } else {
              return b.duration - a.duration;
            }
          });
        } else if (sortValue.sortBy === "up") {
          returnedFlights.sort((a: FlightData, b: FlightData): number => {
            const aDetail = a.pricingDetail.find(
              (detail) => detail.productType === sortValue.cabin
            );
            const bDetail = b.pricingDetail.find(
              (detail) => detail.productType === sortValue.cabin
            );
            if (
              (!aDetail && !bDetail) ||
              (aDetail &&
                bDetail &&
                aDetail.points === bDetail.points &&
                aDetail.cashPrice === bDetail.cashPrice)
            ) {
              return 0;
            }
            if (!aDetail) return 1;
            if (!bDetail) return -1;
            if (aDetail.points === bDetail.points) {
              return aDetail.cashPrice - bDetail.cashPrice;
            }
            return aDetail.points - bDetail.points;
          });
        } else if (sortValue.sortBy === "down") {
          returnedFlights.sort((a: FlightData, b: FlightData): number => {
            const aDetail = a.pricingDetail.find(
              (detail) => detail.productType === sortValue.cabin
            );
            const bDetail = b.pricingDetail.find(
              (detail) => detail.productType === sortValue.cabin
            );
            if (
              (!aDetail && !bDetail) ||
              (aDetail &&
                bDetail &&
                aDetail.points === bDetail.points &&
                aDetail.cashPrice === bDetail.cashPrice)
            ) {
              return 0;
            }
            if (!aDetail) return 1;
            if (!bDetail) return -1;
            if (aDetail.points === bDetail.points) {
              return bDetail.cashPrice - aDetail.cashPrice;
            }
            return bDetail.points - aDetail.points;
          });
        }
        return returnedFlights;
      });
      setPage(1);
    }
  };

  const clearSorting = () => {
    filterAndSorting(
      stop,
      selectedAirlines,
      {
        sortBy: "no-sorting",
        cabin: "",
      },
      noUsStops,
      durationSliderValue,
      pointsSliderValueEcon,
      pointsSliderValuePrem,
      pointsSliderValueBusiness,
      pointsSliderValueFirst,
      priceSliderValue
    );
    setSortValue("");
  };

  const clearFilters = () => {
    setFliteredFlights(initialFlights);
    setStop("0");
    setSelectAirlines([]);
    setCheckedSwitch(true);
    setNoUsStops(false);
    setHasFilter(false);
    setDurationSliderValue(maxFlightDuration);
    setPointsSliderValueEcon(maxFlightsPoints);
    setPointsSliderValuePrem(maxFlightsPoints);
    setPointsSliderValueBusiness(maxFlightsPoints);
    setPointsSliderValueFirst(maxFlightsPoints);
    setPriceSliderValue(maxFlightsPrice);
    filterAndSorting(
      "0",
      [],
      sortCabinPoints,
      false,
      maxFlightDuration,
      maxFlightsPoints,
      maxFlightsPoints,
      maxFlightsPoints,
      maxFlightsPoints,
      maxFlightsPrice
    );
  };

  if (flightsData.length === 0 || error) {
    return (
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        mt={5}
      >
        <Typography>
          {flightsData.length === 0
            ? "We couldn't find any flights matching your search criteria."
            : error
            ? `${error}`
            : ""}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Filters
        stop={stop}
        setStop={setStop}
        hasFilter={hasFilter}
        checkedSwitch={checkedSwitch}
        setCheckedSwitch={setCheckedSwitch}
        selectedAirlines={selectedAirlines}
        setSelectAirlines={setSelectAirlines}
        maxFlightDuration={maxFlightDuration}
        durationSliderValue={durationSliderValue}
        setDurationSliderValue={setDurationSliderValue}
        maxFlightsPoints={maxFlightsPoints}
        pointsSliderValueEcon={pointsSliderValueEcon}
        setPointsSliderValueEcon={setPointsSliderValueEcon}
        pointsSliderValuePrem={pointsSliderValuePrem}
        setPointsSliderValuePrem={setPointsSliderValuePrem}
        pointsSliderValueBusiness={pointsSliderValueBusiness}
        setPointsSliderValueBusiness={setPointsSliderValueBusiness}
        pointsSliderValueFirst={pointsSliderValueFirst}
        setPointsSliderValueFirst={setPointsSliderValueFirst}
        maxFlightsPrice={maxFlightsPrice}
        priceSliderValue={priceSliderValue}
        setPriceSliderValue={setPriceSliderValue}
        noUsStops={noUsStops}
        setNoUsStops={setNoUsStops}
        sortCabinPoints={sortCabinPoints}
        departure={departure}
        arrival={arrival}
        clearFilters={clearFilters}
        filterAndSorting={filterAndSorting}
        forCalendarView={true}
        program={program}
      />
      <Divider
        sx={{
          my: 4,
          color: "#EBEBEB",
        }}
      />
      <Box
        width={"98%"}
        margin={"0 auto"}
        mb={4}
        display={"flex"}
        justifyContent={"space-between"}
        sx={{
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          variant="h6"
          fontWeight={"bolder"}
          sx={{
            visibility: displayedFlights.length === 0 ? "hidden" : "visible",
          }}
        >
          {isSignedIn
            ? `${filteredFlights.length} ${
                filteredFlights.length === 1 ? "flight" : "flights"
              }`
            : totalNumberOfFlights + " flights"}
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <CustomSelect
            defaultValue={sort}
            label="Sort By"
            menuItems={sortOptions}
            menuItemsValues={sortOptions}
            minWidth={false}
            endAdornment={
              sort !== "" ? (
                <Clear
                  onClick={clearSorting}
                  sx={{ mr: 2, cursor: "pointer", color: "#fa5252" }}
                  fontSize="small"
                />
              ) : null
            }
            onChange={handleSortChange}
            width={200}
            sx={{
              borderRadius: "12px",
              backgroundColor: "#FFF8F8",
              ".MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  border: "none",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "none",
                },
            }}
          />
          {sort !== "" && (
            <Box
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              sx={{
                cursor: "pointer",
                backgroundColor: "#FFF1F1",
                borderRadius: "12px",
              }}
              onClick={() => {
                let sorting = { sortBy: "", cabin: "" };
                if (sort === "Duration") {
                  if (sortCabinPoints.cabin === "up") {
                    sorting.sortBy = "duration";
                    sorting.cabin = "down";
                  } else if (sortCabinPoints.cabin === "down") {
                    sorting.sortBy = "duration";
                    sorting.cabin = "up";
                  }
                } else if (sort === "Economy Points") {
                  if (sortCabinPoints.sortBy === "up") {
                    sorting.sortBy = "down";
                    sorting.cabin = "ECONOMY";
                  } else if (sortCabinPoints.sortBy === "down") {
                    sorting.sortBy = "up";
                    sorting.cabin = "ECONOMY";
                  }
                } else if (sort === "Premium Points") {
                  if (sortCabinPoints.sortBy === "up") {
                    sorting.sortBy = "down";
                    sorting.cabin = "PREMIUM";
                  } else if (sortCabinPoints.sortBy === "down") {
                    sorting.sortBy = "up";
                    sorting.cabin = "PREMIUM";
                  }
                } else if (sort === "Business Points") {
                  if (sortCabinPoints.sortBy === "up") {
                    sorting.sortBy = "down";
                    sorting.cabin = "BUSINESS";
                  } else if (sortCabinPoints.sortBy === "down") {
                    sorting.sortBy = "up";
                    sorting.cabin = "BUSINESS";
                  }
                } else if (sort === "First Points") {
                  if (sortCabinPoints.sortBy === "up") {
                    sorting.sortBy = "down";
                    sorting.cabin = "FIRST";
                  } else if (sortCabinPoints.sortBy === "down") {
                    sorting.sortBy = "up";
                    sorting.cabin = "FIRST";
                  }
                }
                filterAndSorting(
                  stop,
                  selectedAirlines,
                  sorting,
                  noUsStops,
                  durationSliderValue,
                  pointsSliderValueEcon,
                  pointsSliderValuePrem,
                  pointsSliderValueBusiness,
                  pointsSliderValueFirst,
                  priceSliderValue
                );
                setSortCabinPoints(sorting);
              }}
            >
              <ArrowDropUpIcon
                fontSize="large"
                sx={{
                  mb: -1.4,
                  color:
                    sortCabinPoints.sortBy === "up" ||
                    sortCabinPoints.cabin === "up"
                      ? "#F9533E"
                      : "#ccc",
                }}
              />
              <ArrowDropDown
                fontSize="large"
                sx={{
                  mt: -1.4,
                  color:
                    sortCabinPoints.sortBy === "down" ||
                    sortCabinPoints.cabin === "down"
                      ? "#F9533E"
                      : "#ccc",
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        {displayedFlights.length === 0 ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={1}
          >
            <Typography display={"flex"} justifyContent={"center"}>
              Sorry, no flights match the selected filters.
            </Typography>
            {hasFilter && (
              <Button
                startIcon={<Clear />}
                sx={{
                  backgroundColor: "#FFF8F8",
                  border: "none",
                  borderRadius: "12px",
                  px: 1,
                  py: 2,
                }}
                onClick={clearFilters}
              >
                clear filters
              </Button>
            )}
          </Box>
        ) : isSignedIn ? (
          displayedFlights.map((flight: FlightData, index: number) => (
            <Flight
              key={index}
              index={index}
              flightData={flight}
              isFirst={flight.isFirstFlight}
              highlightedCabin={highlightedCabin}
              borderColor={getProgramColor(program || "")}
              numOfPass={numOfPass}
              upperCabin={upperCabin}
              maxStops={maxStops}
              nonStopOnly={nonStopOnly || false}
            />
          ))
        ) : (
          <>
            {displayedFlights
              .slice(0, 3)
              .map((flight: FlightData, index: number) => (
                <Flight
                  key={index}
                  index={index}
                  flightData={flight}
                  isFirst={flight.isFirstFlight}
                  highlightedCabin={highlightedCabin}
                  borderColor={getProgramColor(program || "")}
                  numOfPass={numOfPass}
                  upperCabin={upperCabin}
                  maxStops={maxStops}
                  nonStopOnly={nonStopOnly || false}
                />
              ))}
            {totalNumberOfFlights > 3 && (
              <Box position={"relative"}>
                <img
                  src={
                    isMobileView
                      ? `/signup/mobile_${
                          Math.floor(Math.random() * 4) + 1
                        }.png`
                      : `/signup/desktop_${
                          Math.floor(Math.random() * 3) + 1
                        }.png`
                  }
                  alt="otherFlights"
                  style={{
                    filter: "blur(3px)",
                    width: "100%",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    backgroundColor: "#FCECEC",
                    borderRadius: "12px",
                    px: 2,
                    py: 4,
                    width: { xs: "80%", sm: "60%" },
                    margin: "0 auto",
                    // border: "1px solid #FA5252",
                    color: "#fff",
                    boxShadow: "0px 9px 36px 0px #00000017",
                    backgroundImage:
                      'url("../public/backgroundRight.png"), url("../public/backgroundLeft.png")',
                    backgroundSize: "70px 70px",
                    backgroundPosition: "top right, bottom left",
                    backgroundRepeat: "no-repeat, no-repeat",
                  }}
                >
                  <Typography variant="h6" fontWeight={900} color="#000">
                    {`${totalNumberOfFlights}`} flights found
                  </Typography>
                  <Typography textAlign={"center"} color={"#000"}>
                    <span style={{ color: "#FA5252", margin: "0 3px" }}>
                      Unlock all{" "}
                    </span>{" "}
                    flight deals by creating a{" "}
                    <span style={{ color: "#FA5252", margin: "0 3px" }}>
                      FREE
                    </span>{" "}
                    account on{" "}
                    <span style={{ color: "#FA5252", margin: "0 3px" }}>
                      Flymile.pro
                    </span>{" "}
                    today!{" "}
                  </Typography>
                  <SignedOut>
                    <SignInButton>
                      <IconButton
                        sx={{
                          backgroundColor: "#FA5252",
                          color: "white",
                          borderRadius: "5px",
                          fontFamily: "Roboto",
                          border: "none",
                          outline: "none",
                          cursor: "pointer",
                          padding: "10px",
                          textTransform: "uppercase",
                          transition: "transform 0.2s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.05)",
                            backgroundColor: "#FA5252",
                          },
                        }}
                      >
                        <Lock sx={{ mr: 1 }} />
                        Signup / login
                      </IconButton>
                    </SignInButton>
                  </SignedOut>
                </Box>
              </Box>
            )}
          </>
        )}
        {isSignedIn && (
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(filteredFlights.length / flightsPerPage)}
              page={page}
              onChange={handlePageChange}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  sx={{
                    visibility:
                      displayedFlights.length === 0 ? "hidden" : "visible",
                    backgroundColor:
                      item.page === page ? "#F9533E !important" : "inherit",
                    color: item.page === page ? "white" : "inherit",
                    "&:hover": {
                      backgroundColor:
                        item.page !== page ? "#F9533E" : "inherit",
                      color: item.page !== page ? "white" : "inherit",
                    },
                  }}
                />
              )}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default CalendarFlightsList;
