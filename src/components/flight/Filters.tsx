import {Box, Button, Checkbox, FormControlLabel, Typography} from "@mui/material";
import {CustomSelect} from "../select/CustomSelect";
import AirlineFilter from "./AirlineFilter";
import {SliderFilter} from "./SliderFilter";
import {PointsSliders} from "./PointsSilders";
import {US_AVOID_CONNECTIONS} from "../../lib/airlines";
import {Clear} from "@mui/icons-material";
import React from "react";
import {formatPoints} from "../../lib/utilities";

export interface IFiltersProps {
    stop: string;
    setStop: React.Dispatch<React.SetStateAction<string>>;
    hasFilter: boolean;
    checkedSwitch: boolean;
    setCheckedSwitch: React.Dispatch<React.SetStateAction<boolean>>;
    selectedAirlines: string[];
    setSelectAirlines: React.Dispatch<React.SetStateAction<string[]>>;
    maxFlightDuration: number;
    durationSliderValue: number;
    setDurationSliderValue: React.Dispatch<React.SetStateAction<number>>;
    maxFlightsPoints: number;
    pointsSliderValueEcon: number;
    pointsSliderValuePrem: number;
    pointsSliderValueBusiness: number;
    pointsSliderValueFirst: number;
    setPointsSliderValueEcon: React.Dispatch<React.SetStateAction<number>>;
    setPointsSliderValuePrem: React.Dispatch<React.SetStateAction<number>>;
    setPointsSliderValueBusiness: React.Dispatch<React.SetStateAction<number>>;
    setPointsSliderValueFirst: React.Dispatch<React.SetStateAction<number>>;
    maxFlightsPrice: number;
    priceSliderValue: number;
    setPriceSliderValue: React.Dispatch<React.SetStateAction<number>>;
    noUsStops: boolean;
    setNoUsStops: React.Dispatch<React.SetStateAction<boolean>>;
    sortCabinPoints: { sortBy: string; cabin: string; };
    departure?: string;
    arrival?: string;
    clearFilters: () => void;
    filterAndSorting: (
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
    ) => void;
    forCalendarView?: boolean;
    program?: string;
}

const Filters: React.FC<IFiltersProps> = ({
stop,
setStop,
hasFilter,
checkedSwitch,
setCheckedSwitch,
selectedAirlines,
setSelectAirlines,
maxFlightDuration,
durationSliderValue,
setDurationSliderValue,
maxFlightsPoints,
pointsSliderValueEcon,
pointsSliderValuePrem,
pointsSliderValueBusiness,
pointsSliderValueFirst,
setPointsSliderValueEcon,
setPointsSliderValuePrem,
setPointsSliderValueBusiness,
setPointsSliderValueFirst,
maxFlightsPrice,
priceSliderValue,
setPriceSliderValue,
noUsStops,
setNoUsStops,
sortCabinPoints,
departure,
arrival,
clearFilters,
filterAndSorting,
forCalendarView,
program
}) => {
    const stops = {
        "Any number of stops": "0",
        "Non-stop only": "1",
        "One stop or fewer": "2",
        "Two stops or fewer": "3",
    };

    const handleDurationSliderChange = (
        event: Event,
        newValue: number | number[]
    ) => {
        if (typeof newValue === "number") {
            setDurationSliderValue(newValue);
            filterAndSorting(
                stop,
                selectedAirlines,
                sortCabinPoints,
                noUsStops,
                newValue,
                pointsSliderValueEcon,
                pointsSliderValuePrem,
                pointsSliderValueBusiness,
                pointsSliderValueFirst,
                priceSliderValue
            );
        }
    };

    const handleChangePointsEcon = (
        event: Event,
        newValue: number | number[]
    ) => {
        if (typeof newValue === "number") {
            setPointsSliderValueEcon(newValue);
            filterAndSorting(
                stop,
                selectedAirlines,
                sortCabinPoints,
                noUsStops,
                durationSliderValue,
                newValue,
                pointsSliderValuePrem,
                pointsSliderValueBusiness,
                pointsSliderValueFirst,
                priceSliderValue
            );
        }
    };
    const handleChangePointsPrem = (
        event: Event,
        newValue: number | number[]
    ) => {
        if (typeof newValue === "number") {
            setPointsSliderValuePrem(newValue);
            filterAndSorting(
                stop,
                selectedAirlines,
                sortCabinPoints,
                noUsStops,
                durationSliderValue,
                pointsSliderValueEcon,
                newValue,
                pointsSliderValueBusiness,
                pointsSliderValueFirst,
                priceSliderValue
            );
        }
    };
    const handleChangePointsBusiness = (
        event: Event,
        newValue: number | number[]
    ) => {
        if (typeof newValue === "number") {
            setPointsSliderValueBusiness(newValue);
            filterAndSorting(
                stop,
                selectedAirlines,
                sortCabinPoints,
                noUsStops,
                durationSliderValue,
                pointsSliderValueEcon,
                pointsSliderValuePrem,
                newValue,
                pointsSliderValueFirst,
                priceSliderValue
            );
        }
    };

    const handleChangePointsFirst = (
        event: Event,
        newValue: number | number[]
    ) => {
        if (typeof newValue === "number") {
            setPointsSliderValueFirst(newValue);
            filterAndSorting(
                stop,
                selectedAirlines,
                sortCabinPoints,
                noUsStops,
                durationSliderValue,
                pointsSliderValueEcon,
                pointsSliderValuePrem,
                pointsSliderValueBusiness,
                newValue,
                priceSliderValue
            );
        }
    };

    const handlePriceSliderChange = (
        event: Event,
        newValue: number | number[]
    ) => {
        if (typeof newValue === "number") {
            setPriceSliderValue(newValue);
            filterAndSorting(
                stop,
                selectedAirlines,
                sortCabinPoints,
                noUsStops,
                durationSliderValue,
                pointsSliderValueEcon,
                pointsSliderValuePrem,
                pointsSliderValueBusiness,
                pointsSliderValueFirst,
                newValue
            );
        }
    };


    const handleStopChange = (value: string) => {
        setStop(value);
        filterAndSorting(
            value,
            selectedAirlines,
            sortCabinPoints,
            noUsStops,
            durationSliderValue,
            pointsSliderValueEcon,
            pointsSliderValuePrem,
            pointsSliderValueBusiness,
            pointsSliderValueFirst,
            priceSliderValue
        );
    };

    const handleAirlineChange = (selectedAirlinesValues: string[]) => {
        if (
            (selectedAirlinesValues.length === 1 &&
                selectedAirlinesValues[0] === undefined) ||
            selectedAirlinesValues.length === 0
        ) {
            setCheckedSwitch(true);
            filterAndSorting(
                stop,
                selectedAirlinesValues,
                sortCabinPoints,
                noUsStops,
                durationSliderValue,
                pointsSliderValueEcon,
                pointsSliderValuePrem,
                pointsSliderValueBusiness,
                pointsSliderValueFirst,
                priceSliderValue
            );
        } else {
            filterAndSorting(
                stop,
                selectedAirlinesValues,
                sortCabinPoints,
                noUsStops,
                durationSliderValue,
                pointsSliderValueEcon,
                pointsSliderValuePrem,
                pointsSliderValueBusiness,
                pointsSliderValueFirst,
                priceSliderValue
            );
        }
    };


    const handleNoUsStops = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNoUsStops(event.target.checked);
        if (event.target.checked) {
            filterAndSorting(
                stop,
                selectedAirlines,
                sortCabinPoints,
                true,
                durationSliderValue,
                pointsSliderValueEcon,
                pointsSliderValuePrem,
                pointsSliderValueBusiness,
                pointsSliderValueFirst,
                priceSliderValue
            );
        } else {
            filterAndSorting(
                stop,
                selectedAirlines,
                sortCabinPoints,
                false,
                durationSliderValue,
                pointsSliderValueEcon,
                pointsSliderValuePrem,
                pointsSliderValueBusiness,
                pointsSliderValueFirst,
                priceSliderValue
            );
        }
    };

    const formatDuration = (value: number) => {
        return `Under ${value} ${value === 1 ? "hr" : "hrs"}`;
    };

    const formatPrice = (value: number) => {
        if (value === maxFlightsPrice) {
            return "Any";
        }
        return `Up to US$${value}`;
    };

    const formatPoint = (value: number) => {
        if (value === maxFlightsPoints) {
            return "Any";
        }
        return `Up to ${formatPoints(value)}`;
    };

    return (
    <Box
        width={"98%"}
        margin={"0 auto"}
        display={"flex"}
        alignItems={"center"}
        flexWrap={"wrap"}
        mt={-4}
    >
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: 2,
                flexDirection: "column",
            }}
        >
            <Typography variant="body1" fontWeight={"bold"}>
                Filters:
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1, sm: 2 },
                    flexWrap: "wrap",
                }}
            >
                <CustomSelect
                    defaultValue={stop}
                    menuItems={Object.keys(stops)}
                    menuItemsValues={Object.values(stops)}
                    onChange={handleStopChange}
                    sx={{
                        borderRadius: "12px",
                        width: "200px",
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
                <AirlineFilter
                    checkedSwitch={checkedSwitch}
                    setCheckedSwitch={setCheckedSwitch}
                    selectedAirlines={selectedAirlines}
                    setSelectAirlines={setSelectAirlines}
                    handleAirlineChange={handleAirlineChange}
                    forCalendarView={forCalendarView}
                    program={program}
                />
                <SliderFilter
                    handleChange={handleDurationSliderChange}
                    labeDropDown="Duration"
                    labelMenu={
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                            <Typography variant="body2">Flight duration:</Typography>
                            <Typography variant="body2" color={"primary"}>
                                {durationSliderValue === maxFlightDuration
                                    ? "Any"
                                    : `Under ${durationSliderValue} hrs`}
                            </Typography>
                        </Box>
                    }
                    max={maxFlightDuration}
                    min={1}
                    step={1}
                    valueLabelFormat={formatDuration}
                    width="140px"
                    value={durationSliderValue}
                />
                <PointsSliders
                    handleChangePointsBusiness={handleChangePointsBusiness}
                    handleChangePointsEcon={handleChangePointsEcon}
                    handleChangePointsFirst={handleChangePointsFirst}
                    handleChangePointsPrem={handleChangePointsPrem}
                    max={maxFlightsPoints}
                    min={0}
                    step={5000}
                    pointsSliderValueBusiness={pointsSliderValueBusiness}
                    pointsSliderValueEcon={pointsSliderValueEcon}
                    pointsSliderValueFirst={pointsSliderValueFirst}
                    pointsSliderValuePrem={pointsSliderValuePrem}
                    valueLabelFormat={formatPoint}
                />
                <SliderFilter
                    handleChange={handlePriceSliderChange}
                    labeDropDown="Price"
                    labelMenu={
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                            <Typography variant="body2">Price:</Typography>
                            <Typography variant="body2" color={"primary"}>
                                {priceSliderValue === maxFlightsPrice
                                    ? "Any"
                                    : `Up to US$${priceSliderValue}`}
                            </Typography>
                        </Box>
                    }
                    max={maxFlightsPrice}
                    min={10}
                    step={50}
                    width="140px"
                    valueLabelFormat={formatPrice}
                    value={priceSliderValue}
                />
                <FormControlLabel
                    sx={{
                        color: "#2D3340",
                        userSelect: "none",
                    }}
                    disabled={
                        US_AVOID_CONNECTIONS.includes(departure ?? "") ||
                        US_AVOID_CONNECTIONS.includes(arrival ?? "")
                    }
                    control={
                        <Checkbox
                            onChange={handleNoUsStops}
                            checked={noUsStops}
                            color="primary"
                            disabled={
                                US_AVOID_CONNECTIONS.includes(departure ?? "") ||
                                US_AVOID_CONNECTIONS.includes(arrival ?? "")
                            }
                            sx={{
                                "& .MuiSvgIcon-root": {
                                    fill: "#FA5252",
                                },
                            }}
                        />
                    }
                    label={"No US stops"}
                    labelPlacement="end"
                />
                {hasFilter &&
                    (selectedAirlines.length !== 0 ||
                        stop !== "0" ||
                        pointsSliderValueEcon !== maxFlightsPoints ||
                        durationSliderValue !== maxFlightDuration ||
                        priceSliderValue !== maxFlightsPrice) && (
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
        </Box>
    </Box>
    );
}

export default Filters;