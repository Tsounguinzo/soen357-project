import {repo} from "./repo";

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonthIndex = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const timeframes = [
    "All",
    ...Array.from({ length: 12 }).map((_, i) => {
        const monthIndex = (currentMonthIndex + i) % 12;
        const yearAdjustment =
            currentMonthIndex + i >= 12 ? currentYear + 1 : currentYear;
        return `${allMonths[monthIndex]} ${yearAdjustment}`;
    }),
];

export const PROGRAMS = {
    DELTA: "Delta",
    AMERICAN: "American",
    ALASKA: "Alaska",
    JETBLUE: "JetBlue",
};

export const programs = {
    "American AAdvantage": PROGRAMS.AMERICAN,
    "Delta SkyMiles": PROGRAMS.DELTA,
    "Alaska Milage Plan": PROGRAMS.ALASKA,
};

export function kNotationFormatter(value: string) {
    const numericValue = Number(value);
    if (!isNaN(numericValue) && Math.abs(numericValue) >= 1000) {
        return `${numericValue / 1000}k`; // Convert to 'k' notation
    } else {
        return value;
    }
}

export function getStartDate(
    selectedTimeFrame: string
) {
    const [monthName, year] = selectedTimeFrame.split(" ");
    const monthIndex = allMonths.indexOf(monthName) + 1;
    const day = monthIndex === currentMonthIndex + 1 ? currentDay : 1;
    return `${year}-${monthIndex.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
}

export async function fetchDataByProgramAndTimeframe(
    program: string,
    timeframe: string,
    departureCode: string,
    arrivalCode: string,
    startDate: string,
    selectedNumOfPass: string,
    cabin: boolean,
    noStopOnly: boolean,
    selectedNumOfStops: string
) {
    if (program === PROGRAMS.DELTA) {
        return timeframe === "All"
            ? await repo.getDeltaYearly(
                departureCode,
                arrivalCode,
                selectedNumOfPass,
                cabin,
                noStopOnly
            )
            : await repo.getDeltaMonthly(
                departureCode,
                arrivalCode,
                startDate,
                selectedNumOfPass,
                cabin,
                noStopOnly
            );
    } else if (program === PROGRAMS.AMERICAN) {
        return timeframe === "All"
            ? await repo.getAmericanYearly(
                departureCode,
                arrivalCode,
                selectedNumOfPass,
                cabin,
                selectedNumOfStops
            )
            : await repo.getAmericanMonthly(
                departureCode,
                arrivalCode,
                startDate,
                selectedNumOfPass,
                cabin,
                selectedNumOfStops
            );
    } else if (program === PROGRAMS.ALASKA) {
        return timeframe === "All"
            ? await repo.getAlaskaYearly(
                departureCode,
                arrivalCode,
                selectedNumOfPass
            )
            : await repo.getAlaskaMonthly(
                departureCode,
                arrivalCode,
                startDate,
                selectedNumOfPass
            );
    } else if (program === PROGRAMS.JETBLUE) {
        return timeframe === "All"
            ? await repo.getJetBlueYearly(
                departureCode,
                arrivalCode,
                selectedNumOfPass,
                cabin
            )
            : await repo.getJetBlueMonthly(
                departureCode,
                arrivalCode,
                startDate,
                selectedNumOfPass,
                cabin
            );
    } else {
        return [];
    }
}

