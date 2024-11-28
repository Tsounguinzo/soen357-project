import {
  Box,
  Card,
  CardContent,
  Collapse,
  Divider,
  Grid,
  Menu,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { FlightType } from "./FlightType";
import { FlightData } from "../../lib/FlightDataType";
import IosShareIcon from "@mui/icons-material/IosShare";
import {
    extractDate,
    extractTimeWithUnit,
    formatDate,
    formatDuration, getProgramColor,
} from "../../lib/utilities";
import { FlightLeg } from "./FlightLeg";
import { v4 as uuidv4 } from "uuid";
import { WhatsApp, Reddit, FileCopy } from "@mui/icons-material";
import AlertSnackbar from "../common/AlertSnackbar";

export interface IFlightProps {
  index: number;
  flightData: FlightData;
  numOfPass: number;
  upperCabin: boolean;
  borderColor?: string;
  maxStops?: string;
  isFirst?: boolean;
  highlightedCabin?: "ECONOMY" | "BUSINESS" | "FIRST" | "PREMIUM";
  openFlightDeck?: boolean;
  nonStopOnly?: boolean;
}

export function Flight(props: IFlightProps) {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  const { openFlightDeck = false } = props;

  const sharedLink = `${window.location.origin}/sharedflight?airline=${
    props.flightData.sourceAirline
  }&flightID=${props.flightData.flightID}&origin=${
    props.flightData.legs[0].origin
  }&destination=${
    props.flightData.legs[props.flightData.legs.length - 1].destination
  }&numPassengers=${props.numOfPass}&date=${extractDate(
    props.flightData.legs[0].departureDateTime
  )}&maxStops=${props.maxStops ?? "3"}&upperCabin=${props.upperCabin}&nonStopOnly=${props.nonStopOnly ?? false}`;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickShare = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseShare = () => {
    setAnchorEl(null);
  };

  const shareOnWhatsApp = () => {
    const text = `Discover Your Next Adventure with FlyMile.pro! \n${sharedLink}`;
    const encodedText = encodeURIComponent(text);

    const whatsappUrl = `https://wa.me/?text=${encodedText}`;

    window.open(whatsappUrl);
    handleCloseShare();
  };

  const shareOnReddit = () => {
    const title = "Discover Your Next Adventure with FlyMile.pro!";

    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(sharedLink);

    const redditUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;

    window.open(redditUrl);
    handleCloseShare();
  };

  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sharedLink).then(() => {
      setCopied(true);
      handleCloseShare();
    });
  };

  const [expanded, setExpanded] = React.useState(openFlightDeck);

  function handleExpandClick() {
    if (openFlightDeck) return;
    setExpanded(!expanded);
  }

  const { duration, pricingDetail, legs } = props.flightData;
  const departureDateTime = legs[0].departureDateTime;

  const economy =
    pricingDetail.find((item) => item.productType === "ECONOMY") || null;
  const premiumEconomy =
    pricingDetail.find((item) => item.productType === "PREMIUM") || null;
  const business =
    pricingDetail.find((item) => item.productType === "BUSINESS") || null;
  const first =
    pricingDetail.find((item) => item.productType === "FIRST") || null;

  return (
    <>
      <Card
        elevation={0}
        sx={{
          cursor: "pointer",
          userSelect: "none",
          borderRadius: "20px",
          padding: "20px 0px",
          boxShadow: "0px 9px 36px 0px #00000017",
          width: "98%",
          margin: "0 auto",
          p: 0,
          border:
            props.borderColor && props.isFirst
              ? `2px solid ${props.borderColor}`
              : "",
        }}
        // onClick={() => !expanded && handleExpandClick()}
      >
        <CardContent sx={{ py: 4, px: 0 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center", sm: "flex-start" },
              gap: { xs: 2, md: 3 },
              pr: { xs: 0, md: 2 },
            }}
          >
            <Grid
              container
              display={"flex"}
              height={"100%"}
              sx={{
                width: { xs: "100%", md: "12%" },
                gap: { xs: 0, md: 1 },
                flexDirection: { xs: "row", md: "column" },
                alignItems: "center",
                justifyContent: "center",
                pb: { xs: 1, md: 0 },
                borderBottom: { xs: "1px solid #ebebeb", md: "none" },
              }}
              onClick={() => handleExpandClick()}
            >
              {legs.map((leg) => {
                return (
                  <Grid
                    item
                    key={uuidv4()}
                    xs={3}
                    md={12}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <img
                      src={`/AirlinesLogosForFlightCard/${leg.carrierCode}.png`}
                      alt={`Airline Logo ${leg.carrierCode}.png`}
                      width={"30px"}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 3,
                flexGrow: 1,
                px: { xs: 2, md: 0 },
                width: "100%",
                borderRight: { xs: "none", md: "1px solid #ebebeb" },
              }}
              onClick={() => handleExpandClick()}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                sx={{
                  justifyContent: { xs: "space-around", md: "space-between" },
                }}
                alignSelf={"flex-start"}
                flex={1}
                gap={2}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    alignSelf: "flex-start",
                    gap: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#585C67" }}>
                    {formatDate(extractDate(departureDateTime))}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {`${extractTimeWithUnit(
                      legs[0].departureDateTime
                    )} - ${extractTimeWithUnit(
                      legs[legs.length - 1].arrivalDateTime
                    )}`}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: { xs: "row", sm: "column" },
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: legs.length - 1 === 0 ? "#5cb85c" : "#2D3340",
                        fontWeight: "bold",
                      }}
                    >
                      {formatDuration(duration)}
                    </Typography>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 70,
                        height: 20,
                        backgroundColor: "#f0f0f0",
                        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
                        borderRadius: "4px",
                        border:
                          legs.length - 1 === 0
                            ? "1px solid #5cb85c"
                            : "1px solid #FA5252",
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "#585C67" }}>
                        {legs.length - 1 === 0
                          ? "Direct"
                          : `${legs.length - 1} stop${
                              legs.length - 1 > 1 ? "s" : ""
                            }`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    alignSelf: "flex-start",
                    gap: 1,
                  }}
                >
                  {legs.map((leg) => {
                    return (
                      <Box
                        sx={{ display: "flex", alignItems: "center" }}
                        key={uuidv4()}
                      >
                        <Typography variant="body2" sx={{ color: "#585C67" }}>
                          {leg.origin}
                        </Typography>
                        <ArrowRightAltIcon sx={{ color: "#585C67" }} />
                        <Typography variant="body2" sx={{ color: "#585C67" }}>
                          {leg.destination}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box
                sx={{ display: { xs: "none", md: "flex" } }}
                alignItems={"center"}
                alignSelf={"flex-start"}
                justifyContent={"space-evenly"}
                flex={2}
                gap={2}
                onClick={() => handleExpandClick()}
              >
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    alignSelf: "flex-start",
                    width: "100%",
                    gap: 2,
                  }}
                >
                  <FlightType
                    label="Economy"
                    pricingDetails={economy}
                    index={props.index}
                    borderColor={
                      props.borderColor &&
                      props.isFirst &&
                      props.highlightedCabin === "ECONOMY"
                        ? props.borderColor
                        : ""
                    }
                  />
                  <FlightType
                    label="Premium"
                    pricingDetails={premiumEconomy}
                    index={props.index}
                    borderColor={
                      props.borderColor &&
                      props.isFirst &&
                      props.highlightedCabin === "PREMIUM"
                        ? props.borderColor
                        : ""
                    }
                  />

                  <FlightType
                    label="Business"
                    pricingDetails={business}
                    index={props.index}
                    borderColor={
                      props.borderColor &&
                      props.isFirst &&
                      props.highlightedCabin === "BUSINESS"
                        ? props.borderColor
                        : ""
                    }
                  />
                  <FlightType
                    label="First"
                    pricingDetails={first}
                    index={props.index}
                    borderColor={
                      props.borderColor &&
                      props.isFirst &&
                      props.highlightedCabin === "FIRST"
                        ? props.borderColor
                        : ""
                    }
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "space-around",
                width: "100%",
                gap: 2,
              }}
              onClick={() => handleExpandClick()}
            >
              <Box
                display={"flex"}
                width={"100%"}
                sx={{
                  justifyContent: { xs: "space-between", sm: "space-around" },
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 2, sm: 0 },
                }}
              >
                <FlightType
                  label="Economy"
                  pricingDetails={economy}
                  index={props.index}
                  borderColor={
                    props.borderColor &&
                    props.isFirst &&
                    props.highlightedCabin === "ECONOMY"
                      ? props.borderColor
                      : ""
                  }
                />
                <FlightType
                  label="Business"
                  pricingDetails={business}
                  index={props.index}
                  borderColor={
                    props.borderColor &&
                    props.isFirst &&
                    props.highlightedCabin === "BUSINESS"
                      ? props.borderColor
                      : ""
                  }
                />
              </Box>
              <Box
                display={"flex"}
                width={"100%"}
                sx={{
                  justifyContent: { xs: "space-between", sm: "space-around" },
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 2, sm: 0 },
                }}
              >
                <FlightType
                  label="Premium"
                  pricingDetails={premiumEconomy}
                  index={props.index}
                  borderColor={
                    props.borderColor &&
                    props.isFirst &&
                    props.highlightedCabin === "PREMIUM"
                      ? props.borderColor
                      : ""
                  }
                />
                <FlightType
                  label="First"
                  pricingDetails={first}
                  index={props.index}
                  borderColor={
                    props.borderColor &&
                    props.isFirst &&
                    props.highlightedCabin === "FIRST"
                      ? props.borderColor
                      : ""
                  }
                />
              </Box>
            </Box>
            {/* Button to toggle additional details */}
            <Box
              display={"flex"}
              alignItems={"center"}
              sx={{
                flexDirection: { xs: "row", md: "column" },
                justifyContent: "center",
                gap: { xs: 4, md: 2 },
                width: { xs: "100%", md: "unset" },
                pt: 1,
                pb: expanded ? 1 : 0,
                borderTop: { xs: "1px solid #ebebeb", md: "none" },
              }}
            >
              <Tooltip title="Share this flight with your friends!">
                <IconButton
                  sx={{
                    border: "1px solid #ddd",
                  }}
                  onClick={handleClickShare}
                  aria-controls={open ? "share-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <IosShareIcon />
                </IconButton>
              </Tooltip>
              {!openFlightDeck && (
                <IconButton
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label={expanded ? "collapse" : "expand"}
                  sx={{
                    border: "1px solid #ddd",
                  }}
                >
                  {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              )}
              <Menu
                anchorEl={anchorEl}
                id="share-menu"
                open={open}
                onClose={handleCloseShare}
                onClick={handleCloseShare}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    width: 150,
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
                      left: isMobileView ? "50%" : "unset",
                      right: isMobileView ? "unset" : 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{
                  horizontal: isMobileView ? "center" : "right",
                  vertical: "top",
                }}
                anchorOrigin={{
                  horizontal: isMobileView ? "center" : "right",
                  vertical: "bottom",
                }}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-around"}
                  mb={1}
                >
                  <IconButton onClick={shareOnWhatsApp}>
                    <WhatsApp sx={{ color: "#075E54", cursor: "pointer" }} />
                  </IconButton>
                  <IconButton onClick={shareOnReddit}>
                    <Reddit sx={{ color: "#FF4500", cursor: "pointer" }} />
                  </IconButton>
                </Box>
                <Divider sx={{ mb: 1 }} />
                <Box display={"flex"} alignItems={"center"}>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    width={"100%"}
                    gap={2}
                    sx={{ cursor: "pointer", px: 2, color: "grey" }}
                    onClick={handleCopyLink}
                  >
                    <FileCopy fontSize="small" /> <Typography>Copy</Typography>
                  </Box>
                </Box>
              </Menu>
            </Box>
          </Box>
          {/* Additional details collapsed by default */}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: { xs: 0, md: 4 },
              }}
            >
              {legs.map((leg, index) => {
                return (
                  <FlightLeg
                    index={index}
                    leg={leg}
                    key={uuidv4()}
                    pricingDetailsEcon={economy}
                    pricingDetailsBuss={business}
                    pricingDetailsFirst={first}
                    pricingDetailsPrem={premiumEconomy}
                    numOfPass={props.numOfPass}
                    sourceAirline={props.flightData.sourceAirline}
                    departure={legs[0].origin}
                    arrival={legs[legs.length - 1].destination}
                    startDate={legs[0].departureDateTime}
                  />
                );
              })}
            </Box>
          </Collapse>
        </CardContent>
      </Card>
      <AlertSnackbar
        open={copied}
        message={"Flight URL copied to clipboard!"}
        handleClose={() => setCopied(false)}
        severity="success"
        duration={2000}
      />
    </>
  );
}
