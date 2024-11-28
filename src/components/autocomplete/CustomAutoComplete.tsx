import {
  Autocomplete,
  Box,
  SxProps,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IAirport } from "../../lib/interfaces";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactNode, useRef } from "react";
import { SwapHorizTwoTone } from "@mui/icons-material";

export interface IAutoCustomAutoCompleteProps {
  airports: IAirport[];
  label: string;
  value: IAirport | null;
  sx?: SxProps;
  handleOnChange: (event: any, value: IAirport | null) => void;
  startAdornment?: ReactNode;
  handleSwapValues?: () => void;
  showSwapButtom: boolean;
}

export function CustomAutoComplete(props: IAutoCustomAutoCompleteProps) {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  const inputRef = useRef<HTMLInputElement>(null); // Reference to the input element

  const filterOptions = (
    options: IAirport[],
    { inputValue }: { inputValue: string }
  ) => {
    return options.filter((option) => {
      if (inputValue.length <= 3) {
        return option.airportCode
          .toLowerCase()
          .includes(inputValue.toLowerCase());
      } else {
        return option.cityName.toLowerCase().includes(inputValue.toLowerCase());
      }
    });
  };

  return (
    <Autocomplete
      sx={{
        width: "100%",
        ...(props.sx || {}),
      }}
      popupIcon={<ExpandMoreIcon sx={{ color: "#585C67" }} />}
      options={props.airports}
      filterOptions={filterOptions}
      value={props.value}
      onChange={props.handleOnChange}
      isOptionEqualToValue={(option, value) => {
        return (
          option.airportCode === value.airportCode &&
          option.cityName === value.cityName
        );
      }}
      getOptionLabel={(option) => `${option.cityName} (${option.airportCode})`}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          sx={{
            fontFamily: "Roboto",
          }}
        >
          {option.cityName} - {option.airportCode}
        </Box>
      )}
      renderInput={(params) => (
        <Box
          sx={{
            position: props.label === "Origin" ? "relative" : "unset",
          }}
        >
          {props.label === "Origin" && props.showSwapButtom && (
            <SwapHorizTwoTone
              onClick={props.handleSwapValues}
              fontSize="small"
              sx={{
                cursor: "pointer",
                position: "absolute",
                top: isMobileView ? "calc(50% + 50px)" : "50%",
                bottom: isMobileView ? "0" : "unset",
                transform: isMobileView ? "rotate(90deg)" : "translateY(-50%)",
                right: isMobileView ? "40px" : "-10px",
                backgroundColor: "#EBEBEB",
                borderRadius: "50%",
                color: "#A0A4AD",
                zIndex: { xs: 1, sm: 2 },
              }}
            />
          )}
          <TextField
            {...params}
            variant="outlined"
            autoComplete="off"
            required
            placeholder={props.label}
            inputRef={inputRef}
            sx={{
              "& .MuiOutlinedInput-root": {
                fontFamily: "Roboto",
                "&:hover fieldset": {
                  border: "1px solid #EBEBEB",
                  borderLeft: isMobileView
                    ? "1px solid #EBEBEB"
                    : props.label === "Destination"
                    ? "none"
                    : "1px solid #EBEBEB",
                },
              },
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: props.startAdornment,
            }}
          />
        </Box>
      )}
    />
  );
}
