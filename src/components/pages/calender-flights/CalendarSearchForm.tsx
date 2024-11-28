import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Paper,
  Snackbar,
  SnackbarContent,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip as InputTooltip,
  styled,
} from "@mui/material";
import { CustomSelect } from "../../select/CustomSelect";
import PersonIcon from "@mui/icons-material/Person";
import { CustomAutoComplete } from "../../autocomplete/CustomAutoComplete";
import airportsData from "../../../lib/airportsData";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import FlightLandOutlinedIcon from "@mui/icons-material/FlightLandOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FlightIcon from "@mui/icons-material/Flight";
import { IAirport, ProcessedCalenderDataItem } from "../../../lib/interfaces";
import {
  kNotationFormatter,
  PROGRAMS,
  programs,
  timeframes,
} from "../../../lib/calendar";
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { getFullMonthName } from "../../../lib/utilities";
import { CustomTooltip } from "../../calendar-view/CalendarView";
import {
  SignInButton as ClerkSignInButton,
  SignedOut,
  useAuth,
} from "@clerk/clerk-react";
import { Lock } from "@mui/icons-material";
import { CategoricalChartState } from "recharts/types/chart/types";

export interface ICalendarSearchFormProps {
  origin: IAirport | null;
  destination: IAirport | null;
  selectedNumOfPass: string;
  cabin: boolean;
  timeFrame: string;
  program: string;
  openSnackbar: boolean;
  handleOnCloseSnackbar: (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => void;
  setOpenSnackbar: (a: boolean) => void;
  handleChangeNumOfPass: (a: string) => void;
  handleChangeProgram: (a: string) => void;
  handleChangeTimeFrame: (a: string) => void;
  handleChangeCabin: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnChangeOrigin: (event: any, value: IAirport | null) => void;
  handleOnChangeDestination: (event: any, value: IAirport | null) => void;
  handleSwapValues: () => void;
  handleOnSubmitForm: (event: any) => void;
  isLoading: boolean;
  chartData: ProcessedCalenderDataItem[];
  chartColor: string;
  currentTimeFrame: string;
  setCurrentTimeFrame: (a: string) => void;
  setChartData: (a: ProcessedCalenderDataItem[]) => void;
  setChartColor: (a: string) => void;
  nonStopOnly?: boolean;
  handleChangeNonStopOnly: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedNumOfStops: string;
  handleChangeNumOfStops: (a: string) => void;
  handleOnClickChart: (a: CategoricalChartState) => void;
  expanded: boolean;
  handleExpandClick: () => void;
}

const SignInButton = styled(ClerkSignInButton)({
  border: "none",
  color: "#fff",
  cursor: "pointer",
  fontSize: "16px",
  outline: "none",
});

export function CalendarSearchForm(props: ICalendarSearchFormProps) {
  const { isSignedIn } = useAuth();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "20px",
        padding: "42px",
        boxShadow: "0px 9px 36px 0px #00000017",
        width: "98%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 0,
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: 2,
          flexWrap: "wrap",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          mb: { xs: 0, sm: 2 },
        }}
      >
        <CustomSelect
          menuItems={Object.keys(programs)}
          menuItemsValues={Object.values(programs)}
          defaultValue={props.program}
          onChange={props.handleChangeProgram}
          width={isMobileView ? "100%" : "20%"}
          noBorderRadius={true}
          sx={{
            width: "100%",
            flexGrow: 1,
            cursor: "pointer",
            backgroundColor: "#2D3340",
            borderRadius: "5px",
            ".MuiOutlinedInput-notchedOutline": {
              border: isMobileView ? "1px solid #ebebeb" : 0,
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: isMobileView ? "1px solid #ebebeb" : 0,
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: isMobileView ? "1px solid #ebebeb" : 0,
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: isMobileView ? "1px solid #ebebeb" : 0,
              },
            "& .MuiInputBase-input": {
              color: "#fff",
            },
            "& .MuiSelect-icon": {
              color: "#fff",
            },
          }}
        />
        <CustomSelect
          width={isMobileView ? "100%" : "fit"}
          startAdornment={<PersonIcon sx={{ color: "#FA5252" }} />}
          menuItems={Array.from(
            { length: props.program === PROGRAMS.ALASKA ? 7 : 9 },
            (_, index) => `${index + 1}`
          )}
          menuItemsValues={Array.from(
            { length: props.program === PROGRAMS.ALASKA ? 7 : 9 },
            (_, index) => `${index + 1}`
          )}
          defaultValue={props.selectedNumOfPass}
          onChange={props.handleChangeNumOfPass}
          sx={{
            width: "100%",
            flexGrow: 1,
            borderRadius: "12px",
            ".MuiOutlinedInput-notchedOutline": {
              border: isMobileView ? "1px solid #ebebeb" : 0,
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: isMobileView ? "1px solid #ebebeb" : 0,
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: isMobileView ? "1px solid #ebebeb" : 0,
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: isMobileView ? "1px solid #ebebeb" : 0,
              },
          }}
        />
        {props.program !== PROGRAMS.ALASKA && (
          <FormControlLabel
            sx={{
              color: "#2D3340",
              userSelect: "none",
              width: isMobileView ? "100%" : "fit",
              border: isMobileView ? "1px solid #ebebeb" : 0,
              borderRadius: "12px",
              m: 0,
              p: 0.8,
            }}
            control={
              <Checkbox
                onChange={props.handleChangeCabin}
                checked={props.cabin}
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
        )}
        {props.program === PROGRAMS.DELTA && (
          <FormControlLabel
            sx={{
              color: "#2D3340",
              userSelect: "none",
              width: isMobileView ? "100%" : "fit",
              border: isMobileView ? "1px solid #ebebeb" : 0,
              borderRadius: "12px",
              m: 0,
              p: 0.8,
            }}
            control={
              <Checkbox
                onChange={props.handleChangeNonStopOnly}
                checked={props.nonStopOnly}
                color="primary"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fill: "#FA5252",
                  },
                }}
              />
            }
            label={"Non-stop only"}
            labelPlacement="end"
          />
        )}
        {props.program === PROGRAMS.AMERICAN && (
          <CustomSelect
            label="Max Stops"
            menuItems={Array.from({ length: 4 }, (_, index) => `${index}`)}
            menuItemsValues={Array.from(
              { length: 4 },
              (_, index) => `${index}`
            )}
            defaultValue={props.selectedNumOfStops}
            onChange={props.handleChangeNumOfStops}
            width={isMobileView ? "100%" : "100px"}
            sx={{
              width: "100%",
              flexGrow: 1,
              borderRadius: "12px",
              ".MuiOutlinedInput-notchedOutline": {
                border: isMobileView ? "1px solid #ebebeb" : 0,
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: isMobileView ? "1px solid #ebebeb" : 0,
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  border: isMobileView ? "1px solid #ebebeb" : 0,
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: isMobileView ? "1px solid #ebebeb" : 0,
                },
            }}
          />
        )}
        <Box
          sx={{
            flexGrow: 2,
          }}
        ></Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            flexGrow: 1,
            flexBasis: 0,
          }}
        >
          <Typography variant="body1">From</Typography>
          <CustomAutoComplete
            airports={airportsData}
            showSwapButtom
            label="Origin"
            handleOnChange={props.handleOnChangeOrigin}
            handleSwapValues={props.handleSwapValues}
            value={props.origin}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderTopLeftRadius: "12px",
                borderBottomLeftRadius: "12px",
                borderTopRightRadius: isMobileView ? "12px" : "0px",
                borderBottomRightRadius: isMobileView ? "12px" : "0px",
              },
              "& .MuiAutocomplete-inputRoot": {
                borderTopLeftRadius: "12px",
                borderBottomLeftRadius: "12px",
                borderTopRightRadius: isMobileView ? "12px" : "0px",
                borderBottomRightRadius: isMobileView ? "12px" : "0px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #EBEBEB",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #EBEBEB",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "1px solid #EBEBEB",
                },
              "& .MuiOutlinedInput-root.Mui-focused": {
                boxShadow: "none",
              },
            }}
            startAdornment={
              <FlightTakeoffOutlinedIcon sx={{ color: "#FA5252" }} />
            }
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            flexGrow: 1,
            flexBasis: 0,
          }}
        >
          <Typography variant="body1">To</Typography>
          <CustomAutoComplete
            airports={airportsData}
            showSwapButtom
            label="Destination"
            handleOnChange={props.handleOnChangeDestination}
            handleSwapValues={props.handleSwapValues}
            value={props.destination}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderTopLeftRadius: isMobileView ? "12px" : "0px",
                borderBottomLeftRadius: isMobileView ? "12px" : "0px",
                borderTopRightRadius: isMobileView ? "12px" : "0px",
                borderBottomRightRadius: isMobileView ? "12px" : "0px",
                borderLeft: "none",
              },
              "& .MuiAutocomplete-inputRoot": {
                borderTopLeftRadius: isMobileView ? "12px" : "0px",
                borderBottomLeftRadius: isMobileView ? "12px" : "0px",
                borderTopRightRadius: isMobileView ? "12px" : "0px",
                borderBottomRightRadius: isMobileView ? "12px" : "0px",
                borderLeft: isMobileView ? "1px solid #EBEBEB" : "none",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #EBEBEB",
                borderLeft: isMobileView ? "1px solid #EBEBEB" : "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #EBEBEB",
                borderLeft: isMobileView ? "1px solid #EBEBEB" : "none",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "1px solid #EBEBEB",
                  borderLeft: isMobileView ? "1px solid #EBEBEB" : "none",
                },
              "& .MuiOutlinedInput-root.Mui-focused": {
                boxShadow: "none",
                borderLeft: isMobileView ? "1px solid #EBEBEB" : "none",
              },
            }}
            startAdornment={
              <FlightLandOutlinedIcon sx={{ color: "#FA5252", ml: 0.5 }} />
            }
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            flexGrow: 1,
            flexBasis: 0,
          }}
        >
          <Typography
            variant="body1"
            style={{ display: "flex", alignItems: "center" }}
          >
            Timeframes
            <InputTooltip
              title="Select Month or Year for Cheapest Reward Flights"
              leaveTouchDelay={3000}
              enterTouchDelay={50}
              placement="top"
              arrow={true}
            >
              <InfoOutlinedIcon
                style={{ marginLeft: 4 }}
                sx={{
                  color: "#FA5252",
                  width: 16,
                  cursor: "pointer",
                }}
              />
            </InputTooltip>
          </Typography>
          <CustomSelect
            menuItems={timeframes}
            menuItemsValues={timeframes}
            defaultValue={props.timeFrame}
            disabledCount={isSignedIn ? undefined : 7}
            onChange={props.handleChangeTimeFrame}
            width={"100%"}
            noBorderRadius={!isMobileView}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            flexGrow: 0.5,
            flexBasis: 0,
          }}
        >
          <Button
            variant="contained"
            endIcon={
              !props.isLoading ? (
                <FlightIcon />
              ) : (
                <CircularProgress
                  size={18}
                  sx={{ color: "#FA5252" }}
                  thickness={5}
                />
              )
            }
            disabled={props.isLoading}
            disableElevation
            onClick={props.handleOnSubmitForm}
            sx={{
              color: "#fff",
              backgroundColor: "#FA5252",
              width: "100%",
              borderTopRightRadius: "12px",
              borderBottomRightRadius: "12px",
              height: "56px",
              borderTopLeftRadius: { xs: "12px", md: "0px" },
              borderBottomLeftRadius: { xs: "12px", md: "0px" },
              textTransform: "capitalize",
              letterSpacing: "1.2px",
              "&: hover": {
                backgroundColor: "#FA5252",
                color: "#fff",
              },
            }}
          >
            Glimpse
          </Button>
        </Box>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: { xs: 4, md: 2 },
          width: "100%",
          pt: 1,
          pb: props.expanded ? 1 : 0,
        }}
      >
        <Typography variant="subtitle1" color="text.secondary">
          See Chart
        </Typography>
        <IconButton
          onClick={props.handleExpandClick}
          aria-expanded={props.expanded}
          aria-label={props.expanded ? "collapse" : "expand"}
          sx={{
            border: "1px solid #ddd",
            transition: "transform 0.3s ease-in-out",
            "& .MuiSvgIcon-root": {
              color: "primary.dark", // Icon color
            },
          }}
        >
          {props.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          gap: { xs: 4, md: 2 },
          width: { xs: "100%", md: "unset" },
          pt: 1,
          pb: props.expanded ? 1 : 0,
        }}
      >
        {props.expanded && (
          <>
            {props.isLoading ? (
              <Box
                sx={{
                  width: "100%",
                  height: 400,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  size={80}
                  thickness={4.5}
                  style={{ color: props.chartColor }}
                />
              </Box>
            ) : (
              <>
                {!props.chartData.length ? (
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
                    {!props.isLoading
                      ? "No reward flights available for the selected parameters."
                      : ""}
                  </Typography>
                ) : (
                  <Box width={"100%"} height={400} position={"relative"}>
                    <ResponsiveContainer
                      width={"100%"}
                      height={400}
                      className={props.isLoading ? "chart-blur" : ""}
                    >
                      <LineChart
                        data={props.chartData}
                        margin={{
                          top: 30,
                        }}
                        style={{ cursor: "pointer" }}
                        onClick={props.handleOnClickChart}
                      >
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          padding={{ left: isMobileView ? 10 : 0, right: 10 }}
                          tick={props.currentTimeFrame === "All"}
                          interval={29}
                        >
                          {props.currentTimeFrame !== "All" && (
                            <Label
                              value={`${getFullMonthName(
                                props.currentTimeFrame.split(" ")[0]
                              )} ${props.currentTimeFrame.split(" ")[1]}`}
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
                        <Tooltip
                          content={<CustomTooltip color={props.chartColor} />}
                        />
                        {!isMobileView && <CartesianGrid stroke="#eee" />}
                        <Line
                          type="monotone"
                          dot={false}
                          dataKey="points"
                          stroke={props.chartColor}
                          activeDot={{
                            r: 8,
                            fill: props.chartColor,
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
              </>
            )}
          </>
        )}
      </Box>
      <Snackbar
        open={props.openSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={props.handleOnCloseSnackbar}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#f44336",
          }}
          message={
            <span
              style={{
                fontWeight: 800,
              }}
            >
              All Fields are required.
            </span>
          }
        />
      </Snackbar>
    </Paper>
  );
}
