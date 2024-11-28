import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Box,
  Checkbox,
  ListItemText,
  ListSubheader,
  ListSubheaderProps,
  Switch,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { checkboxClasses } from "@mui/material/Checkbox";
import airlines, { Airline, uniqueAirlines } from "../../lib/airlines";
import {PROGRAMS} from "../../lib/calendar";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#fa5252",
    "&:hover": {
      backgroundColor: alpha("#fa5252", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#fa5252",
  },
}));

function MyListSubheader(props: ListSubheaderProps) {
  return <ListSubheader {...props} />;
}

const programs = [
  "American AAdvantage",
  "Delta SkyMiles",
  "Alaska Milage Plan",
];

export default function AirlineFilter({
  checkedSwitch,
  setCheckedSwitch,
  selectedAirlines,
  setSelectAirlines,
  handleAirlineChange,
  forCalendarView,
  program
}: {
  checkedSwitch: boolean;
  setCheckedSwitch: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAirlines: string[];
  setSelectAirlines: React.Dispatch<React.SetStateAction<string[]>>;
  handleAirlineChange: (l: string[]) => void;
  forCalendarView?: boolean;
  program?: string;
}) {
  const handleChange = (event: SelectChangeEvent<typeof selectedAirlines>) => {
    const {
      target: { value },
    } = event;
    let updatedValue: string[];

    if (Array.isArray(value)) {
      updatedValue = value.length === 0 ? [] : [...value];
      let remove = false;
      let tobeRemoved: string[] = [];
      if (
        selectedAirlines.includes("American AAdvantage") &&
        !updatedValue.includes("American AAdvantage")
      ) {
        remove = true;
        tobeRemoved.push("American AAdvantage");
      }
      if (
        selectedAirlines.includes("Delta SkyMiles") &&
        !updatedValue.includes("Delta SkyMiles")
      ) {
        remove = true;
        tobeRemoved.push("Delta SkyMiles");
      }
      if (
        selectedAirlines.includes("Alaska Milage Plan") &&
        !updatedValue.includes("Alaska Milage Plan")
      ) {
        remove = true;
        tobeRemoved.push("Alaska Milage Plan");
      }
      if (updatedValue.length === 0) {
        setCheckedSwitch(true);
      } else {
        setCheckedSwitch(false);
      }
      if (remove) {
        updatedValue = updatedValue.filter(
          (item) => !tobeRemoved.includes(item)
        );
      }
      handleAirlineChange(updatedValue);
      setSelectAirlines(updatedValue);
    }
  };

  const handleSelectAllAirlines = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckedSwitch(event.target.checked);
    if (event.target.checked) {
      handleAirlineChange([]);
      setSelectAirlines([]);
    } else {
      handleAirlineChange(selectedAirlines);
    }
  };

  let programsAirlines: Airline[] = [];
  if (forCalendarView && program && program === PROGRAMS.AMERICAN) {
    programsAirlines = airlines.American.filter((airline) => airline.name !== "American AAdvantage");
  } else if (forCalendarView && program && program === PROGRAMS.DELTA) {
    programsAirlines = airlines.Delta.filter((airline) => airline.name !== "Delta SkyMiles");
  } else if (forCalendarView && program && program === PROGRAMS.ALASKA) {
    programsAirlines = airlines.Alaska.filter((airline) => airline.name !== "Alaska Milage Plan");
  } else {
    programsAirlines = [];
  }

  return (
    <Select
      multiple
      value={selectedAirlines}
      // onClose={() => {
      //   setTimeout(() => {
      //     handleAirlineChange();
      //   }, 0);
      // }}
      onChange={handleChange}
      placeholder="Airlines"
      displayEmpty={true}
      renderValue={(value) =>
        value ? (
          <Typography variant="body1">Airlines</Typography>
        ) : (
          <Typography variant="body1">Airlines</Typography>
        )
      }
      sx={{
        borderRadius: "12px",
        width: 150,
        backgroundColor: "#FFF8F8",
        ".MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            border: "none",
          },
      }}
    >
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="body1" ml={1}>
          Select all airlines
        </Typography>
        <PinkSwitch
          checked={checkedSwitch}
          inputProps={{ "aria-label": "controlled" }}
          onChange={handleSelectAllAirlines}
        />
      </Box>

      {!forCalendarView && [
        <MyListSubheader key="subheader">Loyalty programs</MyListSubheader>,
        ...programs.map((program) => (
            <MenuItem key={program} value={program}>
              <Checkbox
                  sx={{
                    [`&, &.${checkboxClasses.checked}`]: {
                      color: "#fa5252",
                    },
                  }}
                  checked={selectedAirlines.includes(program)}
              />
              <ListItemText primary={program} />
            </MenuItem>
        ))
      ]}

      <MyListSubheader>Airlines</MyListSubheader>
      {forCalendarView && program ?
          programsAirlines.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      }).map((airline: Airline) => {
        return (
          <MenuItem key={airline.name} value={airline.name}>
            <Checkbox
              sx={{
                [`&, &.${checkboxClasses.checked}`]: {
                  color: "#fa5252",
                },
              }}
              checked={selectedAirlines.includes(airline.name)}
            />
            <ListItemText primary={airline.name} />
          </MenuItem>
        );
      }) : uniqueAirlines.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        })
        .map((airline: Airline) => {
          return (
            <MenuItem key={airline.name} value={airline.name}>
              <Checkbox
                sx={{
                  [`&, &.${checkboxClasses.checked}`]: {
                    color: "#fa5252",
                  },
                }}
                checked={selectedAirlines.includes(airline.name)}
              />
              <ListItemText primary={airline.name} />
            </MenuItem>
          );
        })}
    </Select>
  );
}
