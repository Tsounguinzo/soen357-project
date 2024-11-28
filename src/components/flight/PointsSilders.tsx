import { Clear } from "@mui/icons-material";
import { Box, IconButton, Menu, Typography } from "@mui/material";
import * as React from "react";
import { CustomSlider } from "./SliderFilter";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { formatPoints } from "../../lib/utilities";

export interface IPointsSlidersProps {
  pointsSliderValueEcon: number;
  handleChangePointsEcon: (event: Event, newValue: number | number[]) => void;
  pointsSliderValuePrem: number;
  handleChangePointsPrem: (event: Event, newValue: number | number[]) => void;
  pointsSliderValueBusiness: number;
  handleChangePointsBusiness: (
    event: Event,
    newValue: number | number[]
  ) => void;
  pointsSliderValueFirst: number;
  handleChangePointsFirst: (event: Event, newValue: number | number[]) => void;
  min: number;
  max: number;
  step: number;
  valueLabelFormat: (value: number) => string;
}

export function PointsSliders(props: IPointsSlidersProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickShare = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseShare = () => {
    setAnchorEl(null);
  };

  const getLabel = () => {
    let count = 0;
    if (props.pointsSliderValueFirst !== props.max) {
      count += 1;
    }
    if (props.pointsSliderValueBusiness !== props.max) {
      count += 1;
    }
    if (props.pointsSliderValuePrem !== props.max) {
      count += 1;
    }
    if (props.pointsSliderValueEcon !== props.max) {
      count += 1;
    }

    if (count === 0) {
      return "Points";
    } else {
      if (props.pointsSliderValueFirst !== props.max) {
        return `${props.valueLabelFormat(
          props.pointsSliderValueFirst
        )} + ${count}`;
      } else if (props.pointsSliderValueBusiness !== props.max) {
        return `${props.valueLabelFormat(
          props.pointsSliderValueBusiness
        )} + ${count}`;
      } else if (props.pointsSliderValuePrem !== props.max) {
        return `${props.valueLabelFormat(
          props.pointsSliderValuePrem
        )} + ${count}`;
      } else if (props.pointsSliderValueEcon !== props.max) {
        return `${props.valueLabelFormat(
          props.pointsSliderValueEcon
        )} + ${count}`;
      }
    }
  };

  return (
    <>
      <IconButton
        sx={{
          borderRadius: "12px",
          backgroundColor: "#FFF8F8",
          height: "55px",
          fontSize: "16px",
          color: "#000000DE",
          width: "170px",
          fontFamily: "Roboto",
          display: "flex",
          alignItems: "center",
          px: 1.5,
          justifyContent: "space-between",
          "&: hover": {
            backgroundColor: "#FFF8F8",
          },
        }}
        disableRipple
        disableTouchRipple
        onClick={handleClickShare}
        aria-controls={open ? "share-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Typography
          variant="body2"
          sx={{
            color:
              props.pointsSliderValueFirst !== props.max ||
              props.pointsSliderValueBusiness !== props.max ||
              props.pointsSliderValuePrem !== props.max ||
              props.pointsSliderValueEcon !== props.max
                ? "#FA5252"
                : "#000000DE",
            fontSize:
              props.pointsSliderValueFirst !== props.max ||
              props.pointsSliderValueBusiness !== props.max ||
              props.pointsSliderValuePrem !== props.max ||
              props.pointsSliderValueEcon !== props.max
                ? "14px"
                : "16px",
          }}
        >
          {getLabel()}
        </Typography>
        <KeyboardArrowDownIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="share-menu"
        open={open}
        onClose={handleCloseShare}
        // onClick={handleCloseShare}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            width: 280,
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: "50%",
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <IconButton onClick={handleCloseShare} sx={{ alignSelf: "flex-end" }}>
            <Clear />
          </IconButton>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={1} px={2}>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Typography variant="body2">Economy Points:</Typography>
              <Typography variant="body2" color={"primary"}>
                {props.pointsSliderValueEcon === props.max
                  ? "Any"
                  : `Up to ${formatPoints(props.pointsSliderValueEcon)}`}
              </Typography>
            </Box>
            <CustomSlider
              step={props.step}
              onChange={props.handleChangePointsEcon}
              valueLabelDisplay="auto"
              value={props.pointsSliderValueEcon}
              getAriaValueText={props.valueLabelFormat}
              valueLabelFormat={props.valueLabelFormat}
              min={props.min}
              max={props.max}
            />
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Typography variant="body2">Premium Points:</Typography>
              <Typography variant="body2" color={"primary"}>
                {props.pointsSliderValuePrem === props.max
                  ? "Any"
                  : `Up to ${formatPoints(props.pointsSliderValuePrem)}`}
              </Typography>
            </Box>
            <CustomSlider
              step={props.step}
              onChange={props.handleChangePointsPrem}
              valueLabelDisplay="auto"
              value={props.pointsSliderValuePrem}
              getAriaValueText={props.valueLabelFormat}
              valueLabelFormat={props.valueLabelFormat}
              min={props.min}
              max={props.max}
            />
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Typography variant="body2">Business Points:</Typography>
              <Typography variant="body2" color={"primary"}>
                {props.pointsSliderValueBusiness === props.max
                  ? "Any"
                  : `Up to ${formatPoints(props.pointsSliderValueBusiness)}`}
              </Typography>
            </Box>
            <CustomSlider
              step={props.step}
              onChange={props.handleChangePointsBusiness}
              valueLabelDisplay="auto"
              value={props.pointsSliderValueBusiness}
              getAriaValueText={props.valueLabelFormat}
              valueLabelFormat={props.valueLabelFormat}
              min={props.min}
              max={props.max}
            />
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Typography variant="body2">First Points:</Typography>
              <Typography variant="body2" color={"primary"}>
                {props.pointsSliderValueFirst === props.max
                  ? "Any"
                  : `Up to ${formatPoints(props.pointsSliderValueFirst)}`}
              </Typography>
            </Box>
            <CustomSlider
              step={props.step}
              onChange={props.handleChangePointsFirst}
              valueLabelDisplay="auto"
              value={props.pointsSliderValueFirst}
              getAriaValueText={props.valueLabelFormat}
              valueLabelFormat={props.valueLabelFormat}
              min={props.min}
              max={props.max}
            />
          </Box>
        </Box>
      </Menu>
    </>
  );
}
