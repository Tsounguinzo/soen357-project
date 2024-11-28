import { Clear } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  Slider,
  Typography,
  styled,
} from "@mui/material";
import * as React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export interface ISliderFilterProps {
  value: number;
  handleChange: (event: Event, newValue: number | number[]) => void;
  min: number;
  max: number;
  labelMenu: React.ReactNode;
  labeDropDown: string;
  step: number;
  valueLabelFormat: (value: number) => string;
  width: string;
}

export const CustomSlider = styled(Slider)({
  color: "#FA5252",
  height: 6,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 5,
    borderRadius: "8px",
    // width: 40,
    // height: 40,
    // borderRadius: "50% 50% 50% 0",
    backgroundColor: "#FA5252",
    transformOrigin: "bottom left",
    // transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    // "&::before": { display: "none" },
    // "&.MuiSlider-valueLabelOpen": {
    //   transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    // },
    // "& > *": {
    //   transform: "rotate(45deg)",
    // },
  },
});

export function SliderFilter(props: ISliderFilterProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickShare = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseShare = () => {
    setAnchorEl(null);
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
          width: props.width,
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
          variant="body1"
          sx={{
            color: props.value !== props.max ? "#FA5252" : "#000000DE",
            fontSize: props.value !== props.max ? "14px" : "16px",
          }}
        >
          {props.value !== props.max
            ? props.valueLabelFormat(props.value)
            : props.labeDropDown}
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
        <Box display={"flex"} flexDirection={"column"} gap={2} px={2}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            {props.labelMenu}
            <IconButton
              onClick={handleCloseShare}
              sx={{ alignSelf: "flex-end" }}
            >
              <Clear />
            </IconButton>
          </Box>
          <CustomSlider
            step={props.step}
            onChange={props.handleChange}
            valueLabelDisplay="auto"
            value={props.value}
            getAriaValueText={props.valueLabelFormat}
            valueLabelFormat={props.valueLabelFormat}
            min={props.min}
            max={props.max}
          />
        </Box>
      </Menu>
    </>
  );
}
