import { Box, Typography } from "@mui/material";
import { PricingDetail } from "../../lib/FlightDataType";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { formatPoints } from "../../lib/utilities";

export interface IFlightTypeProps {
  index: number;
  label: string;
  pricingDetails: PricingDetail | null;
  borderColor?: string;
}

export function FlightType(props: IFlightTypeProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        alignSelf: { xs: "center", sm: "flex-start" },
        flexDirection: "column",
        gap: 2,
        width: "100px"
      }}
    >
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Typography
          variant="body1"
          component="div"
          sx={{
            textTransform: "capitalize",
            color: "#171B26",
            fontWeight: "bold",
          }}
        >
          {props.label}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border:
            props.pricingDetails && props.pricingDetails.points !== 0
              ? `${props.borderColor ? "2" : "1"}px solid ${
                  props.borderColor ?? "#D2D3D6"
                }`
              : "none",
          padding: "5px",
          borderRadius: "6px",
          py: 1,
          px: 1.5,
          gap: 0.5,
        }}
      >
        {props.pricingDetails && props.pricingDetails.points !== 0 ? (
          <>
            <Typography
              variant="body2"
              sx={{ color: "#2D3340", fontSize: "16px" }}
            >{`${formatPoints(props.pricingDetails.points)}`}</Typography>
            <Typography
              variant="body2"
              sx={{ color: "#585C67", fontSize: "14px" }}
            >{`$${props.pricingDetails.cashPrice}`}</Typography>
          </>
        ) : (
          <HighlightOffIcon sx={{ color: "#FA5252" }} />
        )}
      </Box>
    </Box>
  );
}
