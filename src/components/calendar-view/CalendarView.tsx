import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Skeleton,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { CustomAutoComplete } from "../autocomplete/CustomAutoComplete";
import airportsData from "../../lib/airportsData";
import { useEffect, useState } from "react";
import {
  IAirport,
  Idata,
  ProcessedCalenderDataItem,
} from "../../lib/interfaces";
import { CustomSelect } from "../select/CustomSelect";
import {
  getFullMonthName, getJetBlueBookingLink,
  getProgramColor,
  hexToRGBA,
  processCalendarData,
} from "../../lib/utilities";
import AlertSnackbar from "../common/AlertSnackbar";
import FlightIcon from "@mui/icons-material/Flight";
import PersonIcon from "@mui/icons-material/Person";
import { CategoricalChartState } from "recharts/types/chart/types";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import {
  SignInButton as ClerkSignInButton,
  SignedOut,
  useAuth,
} from "@clerk/clerk-react";
import { Lock } from "@mui/icons-material";
import {
  fetchDataByProgramAndTimeframe,
  getStartDate,
  timeframes,
} from "../../lib/calendar";

const SignInButton = styled(ClerkSignInButton)({
  border: "none",
  color: "#fff",
  cursor: "pointer",
  fontSize: "16px",
  outline: "none",
});

export interface ICalendatViewProps {}

export const PROGRAMS = {
  DELTA: "Delta",
  AMERICAN: "American",
  ALASKA: "Alaska",
  JETBLUE: "JetBlue"
};

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  color: string;
}

const localStoragePrefix = "flymile_calendar_view_";

function kNotationFormatter(value: string) {
  const numericValue = Number(value);
  if (!isNaN(numericValue) && Math.abs(numericValue) >= 1000) {
    return `${numericValue / 1000}k`; // Convert to 'k' notation
  } else {
    return value;
  }
}

export const CustomTooltip = ({
  active,
  payload,
  label,
  color,
}: CustomTooltipProps) => {
  if (active && payload && payload[0]) {
    const { date, points, price } = payload[0]?.payload;
    return (
      <Box
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 9px 36px 0px #00000017",
          padding: "10px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box>
          <span
            style={{
              color: color,
              marginRight: "30px",
            }}
          >
            Date:
          </span>
          <span
            style={{
              color: "rgba(88, 92, 103, 1)",
            }}
          >
            {date}
          </span>
        </Box>

        <Box>
          <span
            style={{
              color: color,
              marginRight: "18px",
            }}
          >
            Points:
          </span>
          <span
            style={{
              color: "rgba(88, 92, 103, 1)",
            }}
          >
            {kNotationFormatter(points)}
          </span>
        </Box>
        <Box>
          <span
            style={{
              color: color,
              marginRight: "18px",
            }}
          >
            Cash price:
          </span>
          <span
            style={{
              color: "rgba(88, 92, 103, 1)",
            }}
          >
            {price} USD
          </span>
        </Box>
        <Box>
          <span
            style={{
              color: color,
              marginRight: "18px",
            }}
          >
            Click to view this flight
          </span>
        </Box>
      </Box>
    );
  }

  return null;
};

export function CalendarView(props: ICalendatViewProps) {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  const [errorState, setErrorState] = useState<{
    type: string;
    message: string;
  }>({ type: "error", message: "" });
  const [selectedNumOfPass, setSelectedNumOfPass] = useState<string>(() => {
    const savedNumOfPass = localStorage.getItem(
      `${localStoragePrefix}selectedNumOfPass`
    );
    return savedNumOfPass ? JSON.parse(savedNumOfPass) : "1";
  });
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>(() => {
    const savedTimeFrame = localStorage.getItem(
      `${localStoragePrefix}selectedTimeFrame`
    );
    return savedTimeFrame ? JSON.parse(savedTimeFrame) : "All";
  });
  const [currentTimeFrame, setCurrentTimeFrame] = useState<string>("All");
  const [currentStates, setCurrentStates] = useState<Idata | undefined>(
    undefined
  );
  const [selectedProgram, setSelectedProgram] = useState<string>(() => {
    const savedProgram = localStorage.getItem(
      `${localStoragePrefix}selectedProgram`
    );
    return savedProgram ? JSON.parse(savedProgram) : "American";
  });

  const programs = {
    "American AAdvantage": PROGRAMS.AMERICAN,
    "Delta SkyMiles": PROGRAMS.DELTA,
    "Alaska Milage Plan": PROGRAMS.ALASKA,
    "JetBlue TrueBlue": PROGRAMS.JETBLUE,
  };

  const [selectedNumOfStops, setSelectedNumOfStops] = useState<string>(() => {
    const savedNumOfStops = localStorage.getItem(
      `${localStoragePrefix}selectedNumOfStops`
    );
    return savedNumOfStops ? JSON.parse(savedNumOfStops) : "3";
  });
  const [chartData, setChartData] = useState<ProcessedCalenderDataItem[]>([]);
  const [chartColor, setChartColor] = useState<string>(
    getProgramColor(selectedProgram)
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  const [cabin, setCabin] = useState<boolean>(() => {
    const savedCabin = localStorage.getItem(`${localStoragePrefix}cabin`);
    return savedCabin ? JSON.parse(savedCabin) : false;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noStopOnly, setNoStopOnly] = useState<boolean>(() => {
    const savedNoStopOnly = localStorage.getItem(
      `${localStoragePrefix}noStopOnly`
    );
    return savedNoStopOnly ? JSON.parse(savedNoStopOnly) : false;
  });
  const [origin, setOrigin] = useState<IAirport | null>(() => {
    const savedOrigin = localStorage.getItem(`${localStoragePrefix}origin`);
    return savedOrigin
      ? JSON.parse(savedOrigin)
      : {
          airportCode: "SFO",
          cityName: "San Francisco",
        };
  });
  const [destination, setDestination] = useState<IAirport | null>(() => {
    const savedDestination = localStorage.getItem(
      `${localStoragePrefix}destination`
    );
    return savedDestination
      ? JSON.parse(savedDestination)
      : {
          airportCode: "JFK",
          cityName: "New York-Kennedy",
        };
  });

  const handleChangeNumOfStops = (value: string) => {
    setSelectedNumOfStops(value);
  };
  const handleChangeNumOfPass = (value: string) => {
    setSelectedNumOfPass(value);
  };
  const handleChangeTimeFrame = (value: string) => {
    setSelectedTimeFrame(value);
  };
  const handleChangeProgram = (value: string) => {
    setSelectedProgram(value);
    if ([PROGRAMS.ALASKA, PROGRAMS.JETBLUE].includes(value)) {
      setCabin(false);
      if (Number(selectedNumOfPass) > 7) {
        setSelectedNumOfPass("7");
      }
    }
  };
  const handleChangeCabin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCabin(event.target.checked);
  };
  const handleChangeNoStopOnly = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNoStopOnly(event.target.checked);
  };

  function handleOnChangeOrigin(event: any, value: IAirport | null) {
    setOrigin(value);
  }

  function handleOnChangeDestination(event: any, value: IAirport | null) {
    setDestination(value);
  }

  const handleCloseSnackbar = () => {
    setErrorState({ type: "error", message: "" });
  };

  const handleSubmit = async () => {
    setChartColor(getProgramColor(selectedProgram));
    if (!origin || !destination) {
      setErrorState({
        type: "error",
        message: "Please select both origin and destination.",
      });
      return;
    }

    setIsLoading(true);
    let startDate =
      selectedTimeFrame !== "All" ? getStartDate(selectedTimeFrame) : "";

    let data = null;
    try {
      data = await fetchDataByProgramAndTimeframe(
        selectedProgram,
        selectedTimeFrame,
        origin.airportCode,
        destination.airportCode,
        startDate,
        selectedNumOfPass,
        cabin,
        noStopOnly,
        selectedNumOfStops
      );
      const processedData = processCalendarData(data);

      // Clear any previous error states before updating with successful data
      setErrorState({ type: "error", message: "" });
      setChartData(processedData);
      setCurrentStates({
        departure: origin,
        arrival: destination,
        startDate: startDate,
        endDate: startDate,
        numPassengers: selectedNumOfPass,
        upperCabin: cabin,
        program: selectedProgram,
        date: moment(startDate).tz("America/New_York").toDate(),
        nonStopOnly: noStopOnly,
        selectedNumOfStops: selectedNumOfStops,
        timeframe: selectedTimeFrame,
        chartData: processedData,
      });
      setCurrentTimeFrame(selectedTimeFrame);
    } catch (error) {
      const errorMessage =
        data && "message" in data
          ? (data.message as string)
          : "Oops! The calendar view hit a snag. Please refresh or try again!";
      setErrorState({ type: "error", message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  function handleOnClickChart(chartData: CategoricalChartState) {
    if (origin && destination && selectedNumOfPass && currentStates) {
      if (chartData?.activePayload && chartData?.activePayload[0]?.payload) {
        const date = chartData?.activePayload[0]?.payload?.date;
        if (!chartData?.activePayload[0]?.payload?.points) {
          setErrorState({
            type: "warning",
            message: `Hey! No flights available on ${date}`,
          });
          return;
        }
        const data: Idata = {
          ...currentStates,
          startDate: date,
          endDate: date,
          date: moment(date).tz("America/New_York").toDate(),
        };

        if (data?.program === PROGRAMS.JETBLUE) {
          window.open(
              getJetBlueBookingLink(
                  data.departure.airportCode,
                  data.arrival.airportCode,
                  date,
                  Number(data.numPassengers)
              ),
              "_blank");
        } else {
          navigate("/calendar-flights", {
            state: {
              data,
            },
          });
        }

      }
    } else {
      setErrorState({
        type: "error",
        message: "Oops! some inputs are missing!",
      });
    }
  }

  useEffect(() => {
    localStorage.setItem(`${localStoragePrefix}origin`, JSON.stringify(origin));
    localStorage.setItem(
      `${localStoragePrefix}destination`,
      JSON.stringify(destination)
    );
    localStorage.setItem(
      `${localStoragePrefix}selectedTimeFrame`,
      JSON.stringify(selectedTimeFrame)
    );
    localStorage.setItem(
      `${localStoragePrefix}selectedNumOfPass`,
      JSON.stringify(selectedNumOfPass)
    );
    localStorage.setItem(
      `${localStoragePrefix}selectedProgram`,
      JSON.stringify(selectedProgram)
    );
    localStorage.setItem(`${localStoragePrefix}cabin`, JSON.stringify(cabin));
    localStorage.setItem(
      `${localStoragePrefix}noStopOnly`,
      JSON.stringify(noStopOnly)
    );
    localStorage.setItem(
      `${localStoragePrefix}selectedNumOfStops`,
      JSON.stringify(selectedNumOfStops)
    );
  }, [
    origin,
    destination,
    selectedTimeFrame,
    selectedNumOfPass,
    selectedProgram,
    cabin,
    noStopOnly,
    selectedNumOfStops,
  ]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <AlertSnackbar
        open={!!errorState.message}
        message={errorState.message}
        severity={errorState.type as "error" | "warning"}
        handleClose={handleCloseSnackbar}
      />
      <Box
        id="calendarviewsection"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant={isMobileView ? "h4" : "h3"}
          fontFamily={"Volkhov"}
          textAlign={"center"}
          color="#2D3340"
        >
          Calendar View
        </Typography>
        <Typography
          variant="body1"
          fontFamily={"Volkhov"}
          textAlign={"center"}
          color="#2D3340"
        >
          <span style={{ color: "#FA5252", fontWeight: "bold" }}>
            Priced per person.
          </span>
        </Typography>
      </Box>

      <Box
        sx={{
          boxShadow: "0px 9px 36px 0px #00000017",
          width: "98%",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            gap: 1,
            flexWrap: "wrap",
            "& > *": {
              flexGrow: 1,
              flexBasis: {
                xs: "15%",
                sm: "10%",
                md: "10%",
                lg: "5%",
                xl: "5%",
              },
            },
          }}
        >
          <CustomAutoComplete
            airports={airportsData}
            label="Origin"
            showSwapButtom={false}
            handleOnChange={handleOnChangeOrigin}
            value={origin}
            sx={{
              minWidth: 175,
              "& .MuiOutlinedInput-root": {
                border: "1px solid #EBEBEB",
                borderRadius: "12px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none !important",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none !important",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "none",
                },
            }}
          />
          <CustomAutoComplete
            airports={airportsData}
            label="Destination"
            handleOnChange={handleOnChangeDestination}
            value={destination}
            showSwapButtom={false}
            sx={{
              minWidth: 175,
              "& .MuiOutlinedInput-root": {
                border: "1px solid #EBEBEB",
                borderRadius: "12px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none !important",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none !important",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "none",
                },
            }}
          />
          <CustomSelect
            menuItems={timeframes}
            menuItemsValues={timeframes}
            disabledCount={isSignedIn ? undefined : 7}
            defaultValue={selectedTimeFrame}
            onChange={handleChangeTimeFrame}
            width={"100%"}
            label="timeframe"
          />
          <CustomSelect
            startAdornment={<PersonIcon sx={{ color: "#FA5252" }} />}
            menuItems={Array.from(
              { length: ["Alaska", "JetBlue"].includes(selectedProgram) ? 7 : 9 },
              (_, index) => `${index + 1}`
            )}
            menuItemsValues={Array.from(
              { length: ["Alaska", "JetBlue"].includes(selectedProgram) ? 7 : 9 },
              (_, index) => `${index + 1}`
            )}
            defaultValue={selectedNumOfPass}
            onChange={handleChangeNumOfPass}
            width={"100%"}
          />
          {selectedProgram !== "Alaska" && (
            <Box
              sx={{
                minWidth: "fit-content",
                width: "100%",
                border: "1px solid #ebebeb",
                borderRadius: "12px",
                p: 0.8,
                pl: 2.5,
              }}
            >
              <FormControlLabel
                sx={{
                  minWidth: "fit-content",
                  width: "100%",
                  color: "#2D3340",
                  userSelect: "none",
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.875rem",
                  },
                }}
                control={
                  <Checkbox
                    onChange={handleChangeCabin}
                    checked={cabin}
                    color="primary"
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fill: "#FA5252",
                      },
                    }}
                  />
                }
                label={"Business/First"}
                labelPlacement="end"
              />
            </Box>
          )}
          {selectedProgram === "Delta" && (
            <Box
              sx={{
                minWidth: "fit-content",
                width: "100%",
                border: "1px solid #ebebeb",
                borderRadius: "12px",
                p: 0.8,
                pl: 2.5,
              }}
            >
              <FormControlLabel
                sx={{
                  minWidth: "fit-content",
                  width: "100%",
                  color: "#2D3340",
                  userSelect: "none",
                }}
                control={
                  <Checkbox
                    onChange={handleChangeNoStopOnly}
                    checked={noStopOnly}
                    sx={{
                      color: "#2D3340",
                      "& .Mui-checked": {
                        color: "#2D3340",
                      },
                    }}
                  />
                }
                label={"Direct"}
                labelPlacement="end"
              />
            </Box>
          )}
          {selectedProgram === "American" && (
            <CustomSelect
              label="Max Stops"
              menuItems={Array.from({ length: 4 }, (_, index) => `${index}`)}
              menuItemsValues={Array.from(
                { length: 4 },
                (_, index) => `${index}`
              )}
              defaultValue={selectedNumOfStops}
              onChange={handleChangeNumOfStops}
              width={"100%"}
            />
          )}
          <CustomSelect
            menuItems={Object.keys(programs)}
            menuItemsValues={Object.values(programs)}
            defaultValue={selectedProgram}
            onChange={handleChangeProgram}
            label="Program"
            width={"100%"}
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={
              !isLoading ? (
                <FlightIcon />
              ) : (
                <CircularProgress
                  size={18}
                  sx={{ color: "#FA5252" }}
                  thickness={5}
                />
              )
            }
            disabled={isLoading}
            sx={{
              maxWidth: 100,
              minWidth: 98,
              height: 55,
              m: "auto",
              backgroundColor: hexToRGBA(getProgramColor(selectedProgram), 1),
              color: "white",
              alignSelf: "right",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "12px",
              transition: "background-color 1s ease-in-out",
              "&:hover": {
                backgroundColor: hexToRGBA(
                  getProgramColor(selectedProgram),
                  0.6
                ),
              },
            }}
            onClick={handleSubmit}
          >
            Glimpse
          </Button>
        </Box>

        <div className="chart-container">
          {isLoading ? (
            <div className="skeleton-overlay">
              {chartData.length ? (
                <Skeleton
                  variant="rounded"
                  width={"100%"}
                  height={400}
                  sx={{
                    bgcolor: "white",
                    opacity: 0.8,
                    border: "none",
                    outline: "none",
                  }}
                />
              ) : (
                <CircularProgress
                  size={80}
                  thickness={4.5}
                  style={{ color: chartColor }}
                />
              )}
            </div>
          ) : null}
          {!chartData.length ? (
            <Typography
              variant="subtitle1"
              sx={{
                width: "100%",
                height: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!isLoading
                ? "No reward flights available for the selected parameters."
                : ""}
            </Typography>
          ) : (
            <Box width={"100%"} height={400} position={"relative"} mt={3}>
              <ResponsiveContainer
                width={"100%"}
                height={400}
                className={isLoading ? "chart-blur" : ""}
              >
                <LineChart
                  data={chartData}
                  margin={{
                    top: 30,
                  }}
                  style={{ cursor: "pointer" }}
                  onClick={handleOnClickChart}
                >
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    padding={{ left: isMobileView ? 10 : 0, right: 10 }}
                    tick={currentTimeFrame === "All"}
                    interval={29}
                  >
                    {currentTimeFrame !== "All" && (
                      <Label
                        value={`${getFullMonthName(
                          currentTimeFrame.split(" ")[0]
                        )} ${currentTimeFrame.split(" ")[1]}`}
                        position="insideBottom"
                        style={{ fontSize: "24px", fontWeight: "bold" }}
                      />
                    )}
                  </XAxis>
                  <YAxis
                    tickFormatter={kNotationFormatter}
                    tickLine={false}
                    tickMargin={isMobileView ? 0 : 10}
                    width={isMobileView ? 0 : 50}
                    tick={{ display: isMobileView ? "none" : "block" }}
                  />
                  <Tooltip content={<CustomTooltip color={chartColor} />} />
                  {!isMobileView && <CartesianGrid stroke="#eee" />}
                  <Line
                    type="monotone"
                    dot={false}
                    dataKey="points"
                    stroke={chartColor}
                    activeDot={{
                      r: 8,
                      fill: chartColor,
                      stroke: "#FFC8C8",
                      strokeWidth: 5,
                    }}
                    strokeWidth={2.5}
                  />
                </LineChart>
              </ResponsiveContainer>
              {!isSignedIn && (
                <Box
                  width={"60%"}
                  height={"100%"}
                  position={"absolute"}
                  right={0}
                  top={0}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      filter: "blur(3px)",
                      width: "100%",
                      height: "100%",
                    }}
                  ></Box>
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
                      px: 1,
                      py: 4,
                      width: { xs: "80%", sm: "60%" },
                      margin: "0 auto",
                      color: "#fff",
                      boxShadow: "0px 9px 36px 0px #00000017",
                      backgroundImage:
                        'url("../public/backgroundRight.png"), url("../public/backgroundLeft.png")',
                      backgroundSize: "70px 70px",
                      backgroundPosition: "top right, bottom left",
                      backgroundRepeat: "no-repeat, no-repeat",
                    }}
                  >
                    <Typography color={"#000"} textAlign={"center"}>
                      <span style={{ color: "#FA5252", margin: "0 3px" }}>
                        Unlock the full view{" "}
                      </span>{" "}
                      by creating a{" "}
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
                            textTransform: "uppercase",
                            fontSize: { xs: "12px", sm: "16px" },
                            padding: "10px",
                            transition: "transform 0.2s ease-in-out",
                            "&:hover": {
                              transform: "scale(1.05)",
                              backgroundColor: "#FA5252",
                            },
                          }}
                        >
                          <Lock fontSize="small" />
                          Signup / login
                        </IconButton>
                      </SignInButton>
                    </SignedOut>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </div>
      </Box>
    </Box>
  );
}
