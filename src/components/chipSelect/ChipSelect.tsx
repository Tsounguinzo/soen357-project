import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const names = ["All", "American", "Alaska", "Delta"];

function getAirlineBackColor(airline: string) {
  if (airline === "American") {
    return "#F9533E";
  } else if (airline === "Alaska") {
    return "#0000FE";
  } else if (airline === "Delta") {
    return "#27C3B2";
  }
}

function getAirlineColor(airline: string) {
  if (airline === "American") {
    return "#fff";
  } else if (airline === "Alaska") {
    return "#fff";
  } else if (airline === "Delta") {
    return "#fff";
  } else {
    return "#000";
  }
}

export default function MultipleSelectChip() {
  const [airlineName, selectAirlines] = React.useState<string[]>(["All"]);

  const handleChange = (event: SelectChangeEvent<typeof airlineName>) => {
    const {
      target: { value },
    } = event;

    let updatedValue: string[];

    if (Array.isArray(value)) {
      if (value.includes("All")) {
        updatedValue =
          value.length === 1 ? ["All"] : value.filter((v) => v !== "All");
      } else {
        updatedValue = value.length === 0 ? ["All"] : value;
      }
      selectAirlines(updatedValue);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "50%" },
      }}
    >
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">Airlines</InputLabel>
        <Select
          multiple
          value={airlineName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Airlines" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{
                    backgroundColor: getAirlineBackColor(value),
                    color: getAirlineColor(value),
                    width: "100px",
                  }}
                />
              ))}
            </Box>
          )}
          sx={{
            borderRadius: "12px",
            ".MuiOutlinedInput-notchedOutline": {
              border: "1px solid #ebebeb",
            },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #ebebeb",
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: "1px solid #ebebeb",
              },
          }}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              sx={{ color: getAirlineBackColor(name) }}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
