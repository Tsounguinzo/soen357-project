import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  SnackbarContent,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CustomSelect } from "../select/CustomSelect";
import { CustomAutoComplete } from "../autocomplete/CustomAutoComplete";
import airportsData from "../../lib/airportsData";
import { CustomDateRangePicker } from "../dateRangePicker/CustomDateRangePicker";
import FlightLandOutlinedIcon from "@mui/icons-material/FlightLandOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import { IAirport } from "../../lib/interfaces";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { useRef, useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
export interface ISearchFormProps {
  origin: IAirport | null;
  destination: IAirport | null;
  fromToDate: Value;
  selectedNumOfPass: string;
  cabin: boolean;
  openSnackbar: boolean;
  handleOnCloseSnackbar: (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => void;
  setOpenSnackbar: (a: boolean) => void;
  handleChangeNumOfPass: (a: string) => void;
  handleChangeCabin: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnChangeOrigin: (event: any, value: IAirport | null) => void;
  handleOnChangeDestination: (event: any, value: IAirport | null) => void;
  setFromToDate: React.Dispatch<React.SetStateAction<Value>>;
  handleSwapValues: () => void;
  handleOnSubmitForm: (event: any) => void;
  isLoading: boolean;
}

export function SearchForm(props: ISearchFormProps) {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const [tripType, setTripType] = useState<string>("1");

  const handleChangeTripType = (event: SelectChangeEvent) => {
    setTripType(event.target.value as string);
  };

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
        <Select
          onChange={handleChangeTripType}
          value={tripType}
          IconComponent={() => <></>}
          renderValue={(value) =>
            value === "1" ? (
              <Typography variant="body1" color={"#fff"}>
                One way
              </Typography>
            ) : (
              <Typography variant="body1" color={"#fff"}>
                Round trip
              </Typography>
            )
          }
          sx={{
            width: isMobileView ? "100%" : "20%",
            height: "50px",
            cursor: "pointer",
            textAlign: "center",
            backgroundColor: "#2D3340",
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
          <MenuItem value="1">One way</MenuItem>
          <MenuItem value="2" disabled>
            Round trip (coming soon)
          </MenuItem>
        </Select>
        <CustomSelect
          width={isMobileView ? "100%" : ""}
          startAdornment={<PersonIcon sx={{ color: "#FA5252" }} />}
          menuItems={Array.from({ length: 9 }, (_, index) => `${index + 1}`)}
          menuItemsValues={Array.from(
            { length: 9 },
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
        <FormControlLabel
          sx={{
            color: "#2D3340",
            userSelect: "none",
            width: isMobileView ? "100%" : "20%",
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
            Range
            <Tooltip
              title="Explore the Best One-Way Deals Across Multiple Dates, with Options for Up to 7 Days"
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
            </Tooltip>
          </Typography>
          <CustomDateRangePicker
            fromToDate={props.fromToDate}
            setFromToDate={props.setFromToDate}
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
                <SearchIcon />
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
            Search
          </Button>
        </Box>
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
