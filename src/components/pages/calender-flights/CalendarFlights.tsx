import {Box, Skeleton} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {IAirport, Idata, IFlightsProps, ProcessedCalenderDataItem, Value} from "../../../lib/interfaces";
import {convertDate, getProgramColor, processCalendarData} from "../../../lib/utilities";
import {repo} from "../../../lib/repo";
import {FlightData} from "../../../lib/FlightDataType";
import {FlightSkeleton} from "../../flight/FlightSkeleton";
import {v4 as uuidv4} from "uuid";
import CalendarFlightsList from "../../calendar-view/CalendarFlightsList";
import {PROGRAMS} from "../../calendar-view/CalendarView";
import {Layout} from "../../layout/Layout";
import {CategoricalChartState} from "recharts/types/chart/types";
import moment from "moment-timezone";
import {fetchDataByProgramAndTimeframe, getStartDate} from "../../../lib/calendar";
import { CalendarSearchForm } from "./CalendarSearchForm";

export function CalendarFlights(props: IFlightsProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [flights, setAllFlights] = useState<FlightData[]>();
    const [data, setData] = useState<Idata | null>(null);
    const [error, setError] = useState<string | undefined>();
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [selectedNumOfPass, setSelectedNumOfPass] = useState<string>("1");
    const [nonStopOnly, setNonStopOnly] = useState<boolean | undefined>(undefined);
    const [selectedProgram, setSelectedProgram] = useState<string>(PROGRAMS.AMERICAN);
    const [date, setDate] = useState<Value>(null);
    const [cabin, setCabin] = useState<boolean>(false);
    const [origin, setOrigin] = useState<IAirport | null>(null);
    const [destination, setDestination] = useState<IAirport | null>(null);
    const [chartData, setChartData] = useState<ProcessedCalenderDataItem[]>([]);
    const [chartColor, setChartColor] = useState<string>(getProgramColor(selectedProgram));
    const [currentTimeFrame, setCurrentTimeFrame] = useState<string>("All");
    const [selectedNumOfStops, setSelectedNumOfStops] = useState<string>("3");
    const [expanded, setExpanded] = React.useState(false);
    const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("All");

    useEffect(() => {
        if (location.state && location.state.data) {
            const state_data: Idata = location.state.data;
            setData(state_data);
            setOrigin(state_data.departure);
            setDestination(state_data.arrival);
            setCabin(state_data.upperCabin);
            setSelectedNumOfPass(state_data.numPassengers);
            setSelectedProgram(state_data.program || PROGRAMS.AMERICAN);
            setNonStopOnly(state_data.nonStopOnly || undefined);
            setSelectedNumOfStops(state_data.selectedNumOfStops || "3");
            setDate(state_data.date || null);
            setCurrentTimeFrame(state_data.timeframe || "All");
            setSelectedTimeFrame(state_data.timeframe || "All");
            setChartData(state_data.chartData || []);
            searchFlights(state_data.program, state_data.timeframe, state_data.departure, state_data.arrival, state_data.numPassengers, state_data.date, state_data.upperCabin, state_data.nonStopOnly, state_data.selectedNumOfStops);
        } else {
            navigate("/");
        }
    }, []);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    const handleChangeNumOfStops = (value: string) => {
        setSelectedNumOfStops(value);
    };

    const handleChangeTimeFrame = (value: string) => {
        setSelectedTimeFrame(value);
    };
    const handleChangeNumOfPass = (value: string) => {
        setSelectedNumOfPass(value);
    };
    const handleChangeCabin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCabin(event.target.checked);
    };

    function handleOnChangeOrigin(event: any, value: IAirport | null) {
        setOrigin(value);
    }

    const handleChangeProgram = (value: string) => {
        setSelectedProgram(value);
        if (value === PROGRAMS.ALASKA) {
            setCabin(false);
            if (Number(selectedNumOfPass) > 7) {
                setSelectedNumOfPass("7");
            }
        }
    };

    function handleOnChangeDestination(event: any, value: IAirport | null) {
        setDestination(value);
    }

    const handleChangeNonStopOnly = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNonStopOnly(event.target.checked);
    };

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

    function searchFlights(selectedProgram: string | undefined, selectedTimeFrame: string | undefined, origin: IAirport, destination: IAirport, selectedNumOfPass: string, date: Value | undefined, cabin: boolean, nonStopOnly: boolean | undefined, selectedNumOfStops: string | undefined) {
        if (origin && destination && selectedNumOfPass && selectedTimeFrame && selectedProgram && date) {
            const fetchData = async () => {
                setLoading(true);
                let allFlights = null;
                if (selectedProgram === PROGRAMS.ALASKA) {
                    allFlights = await repo.getAlaskaFlights(
                        origin.airportCode,
                        destination.airportCode,
                        convertDate(date.toString()),
                        convertDate(date.toString()),
                        selectedNumOfPass
                    );
                } else if (selectedProgram === PROGRAMS.DELTA) {
                    allFlights = await repo.getDeltaFlights(
                        origin.airportCode,
                        destination.airportCode,
                        convertDate(date.toString()),
                        convertDate(date.toString()),
                        selectedNumOfPass,
                        cabin,
                        nonStopOnly ?? false
                    );
                } else if (selectedProgram === PROGRAMS.AMERICAN) {
                    allFlights = await repo.getAmericanFlights(
                        origin.airportCode,
                        destination.airportCode,
                        convertDate(date.toString()),
                        convertDate(date.toString()),
                        selectedNumOfPass,
                        cabin,
                        selectedNumOfStops || "3"
                    );
                } else {
                    allFlights = await repo.getAllFlights(
                        origin.airportCode,
                        destination.airportCode,
                        convertDate(date.toString()),
                        convertDate(date.toString()),
                        selectedNumOfPass,
                        cabin
                    );
                }
                if ("message" in allFlights) {
                    setError(allFlights.message as string);
                } else {
                    setAllFlights(allFlights);
                }
                setLoading(false);
            };
            fetchData();
        } else {
            setOpenSnackbar(true);
        }
    }

    const handleSubmit = async () => {
        setLoading(true);
        setExpanded(true);
        setChartColor(getProgramColor(selectedProgram));
        if (!origin || !destination) {
            setError("Please select origin and destination airports.");
            return;
        }

        let startDate =
            selectedTimeFrame !== "All"
                ? getStartDate(selectedTimeFrame)
                : "";

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
                nonStopOnly ?? false,
                selectedNumOfStops
            );
            const processedData = processCalendarData(data);

            setChartData(processedData);
            setCurrentTimeFrame(selectedTimeFrame);
        } catch (error) {
            const errorMessage = data && ("message" in data) ? data.message as string : "Oops! The calendar view hit a snag. Please refresh or try again!";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    function handleOnClickChart(chartData: CategoricalChartState) {
        if (origin && destination && selectedNumOfPass && date && selectedTimeFrame && selectedProgram) {
            if (chartData?.activePayload && chartData?.activePayload[0]?.payload) {
                const date = chartData?.activePayload[0]?.payload?.date;
                if (!chartData?.activePayload[0]?.payload?.points) {
                    setError(`No flights available on this ${date}.`)
                    setExpanded(false)
                    return;
                }
                const dateObj = moment(date).tz("America/New_York").toDate();

                const data: Idata = {
                    departure: origin,
                    arrival: destination,
                    startDate: date,
                    endDate: date,
                    numPassengers: selectedNumOfPass,
                    upperCabin: cabin,
                    program: selectedProgram,
                    date: dateObj,
                    timeframe: selectedTimeFrame,
                    nonStopOnly: nonStopOnly,
                    selectedNumOfStops: selectedNumOfStops, // 0 here means 1 stop, but means any number of stops in the filters
                };

                setData(data)
                setOrigin(data.departure);
                setDestination(data.arrival);
                setCabin(data.upperCabin);
                setSelectedNumOfPass(data.numPassengers);
                setSelectedProgram(data.program || PROGRAMS.AMERICAN);
                setNonStopOnly(data.nonStopOnly || undefined);
                setSelectedNumOfStops(data.selectedNumOfStops || "3");
                setDate(data.date || null);

                setExpanded(false);
                searchFlights(data.program, data.timeframe, data.departure, data.arrival, data.numPassengers, data.date, data.upperCabin, data.nonStopOnly, data.selectedNumOfStops);
            }
        } else {
            setOpenSnackbar(true);
        }
    }

    return (
        <Layout>
            <CalendarSearchForm
                cabin={cabin}
                destination={destination}
                origin={origin}
                program={selectedProgram}
                timeFrame={selectedTimeFrame}
                handleChangeCabin={handleChangeCabin}
                handleChangeTimeFrame={handleChangeTimeFrame}
                handleChangeProgram={handleChangeProgram}
                handleChangeNumOfPass={handleChangeNumOfPass}
                handleOnChangeDestination={handleOnChangeDestination}
                handleOnChangeOrigin={handleOnChangeOrigin}
                handleOnCloseSnackbar={handleOnCloseSnackbar}
                openSnackbar={openSnackbar}
                handleSwapValues={handleSwapValues}
                setOpenSnackbar={setOpenSnackbar}
                selectedNumOfPass={selectedNumOfPass}
                handleOnSubmitForm={handleSubmit}
                isLoading={loading}
                chartData={chartData}
                chartColor={chartColor}
                currentTimeFrame={currentTimeFrame}
                setCurrentTimeFrame={setCurrentTimeFrame}
                setChartData={setChartData}
                setChartColor={setChartColor}
                handleOnClickChart={handleOnClickChart}
                expanded={expanded}
                handleExpandClick={handleExpandClick}
                nonStopOnly={nonStopOnly}
                handleChangeNonStopOnly={handleChangeNonStopOnly}
                selectedNumOfStops={selectedNumOfStops}
                handleChangeNumOfStops={handleChangeNumOfStops}
            />
            <Box mt={"80px"}></Box>
            {data && flights && !loading ? (
                <CalendarFlightsList
                    program={data.program}
                    upperCabin={data.upperCabin}
                    flightsData={flights}
                    numOfPass={Number(data.numPassengers)}
                    error={error}
                    nonStopOnly={data.nonStopOnly}
                    departure={data.departure.airportCode}
                    arrival={data.arrival.airportCode}
                    maxStops={data.selectedNumOfStops}
                />
            ) : (
                <>
                    {Array(4)
                        .fill(0)
                        .map((_, i) => (
                            <FlightSkeleton key={uuidv4()}/>
                        ))}
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        gap={2}
                        justifyContent={"center"}
                        mt={3}
                    >
                        <Skeleton variant="rectangular" width={20} height={20}/>
                        <Skeleton variant="circular" width={20}/>
                        <Skeleton variant="circular" width={20}/>
                        <Skeleton variant="circular" width={20}/>
                        <Skeleton variant="rectangular" width={20} height={20}/>
                    </Box>
                </>
            )}
        </Layout>
    );
}
