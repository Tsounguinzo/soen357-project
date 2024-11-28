import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import { Leg, PricingDetail } from "../../lib/FlightDataType";
import {
  convertDate,
  extractDate,
  extractTimeWithUnit,
  formatDuration,
  getCityName,
} from "../../lib/utilities";
import { useState } from "react";
import { repo } from "../../lib/repo";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import LinkIcon from "@mui/icons-material/Link";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AlertSnackbar from "../common/AlertSnackbar";

export interface IFlightLegProps {
  leg: Leg;
  pricingDetailsEcon: PricingDetail | null;
  pricingDetailsPrem: PricingDetail | null;
  pricingDetailsBuss: PricingDetail | null;
  pricingDetailsFirst: PricingDetail | null;
  index: number;
  numOfPass: number;
  sourceAirline: string;
  departure: string;
  arrival: string;
  startDate: string;
}

export function FlightLeg(props: IFlightLegProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<string>("");

  function openDynamicLink(url: string): void {
    if (!url) {
      console.error("No URL provided");
      return;
    }

    const a = document.createElement("a");
    a.href = url;
    a.rel = "noopener noreferrer";

    if ("ontouchstart" in document.documentElement) {
      // It's likely a mobile device
      a.target = "_self";
    } else {
      a.target = "_blank";
    }

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const handleLink = () => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const link = await repo.getBookingLink(
          props.sourceAirline,
          props.departure,
          props.arrival,
          convertDate(props.startDate),
          props.numOfPass
        );

        if (link && link.url) {
          openDynamicLink(link.url);
        } else {
          setErrorState("No booking link available.");
        }
      } catch (error) {
        console.error("Error fetching booking link:", error);
        setErrorState(
          "We ran into trouble finding your booking link. try again!"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };
  const handleLinkAircraft = () => {
    const fetchData = async () => {
      try {
        const link = await repo.getAircraftLink(
          props.leg.carrierCode,
          props.leg.flightNumber,
          props.leg.aircraft,
          props.startDate
        );

        if (link && link.url) {
          openDynamicLink(link.url);
        } else {
          setErrorState("No aircraft link available.");
        }
      } catch (error) {
        console.error("Error fetching aircraft link:", error);
        setErrorState(
          "We ran into trouble finding your aircraft link. try again!"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  const handleCloseSnackbar = () => {
    setErrorState("");
  };

  const getRemainingSeats = (pricingDetailDaynamic: PricingDetail | null) => {
    if (props.sourceAirline === "AA") {
      if (pricingDetailDaynamic) {
        if (pricingDetailDaynamic.seatsRemaining === 0) {
          return "?";
        } else {
          return pricingDetailDaynamic.seatsRemaining;
        }
      } else {
        return "0";
      }
    } else {
      if (pricingDetailDaynamic) {
        return pricingDetailDaynamic.seatsRemaining;
      } else {
        return "0";
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          borderTop: props.index === 0 ? "1px solid #ebebeb" : "none",
          pt: props.index === 0 ? 1 : 0,
          gap: 1,
          px: 2,
        }}
      >
        <AlertSnackbar
          open={!!errorState}
          message={errorState}
          handleClose={handleCloseSnackbar}
        />
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flex: { xs: "unset", sm: 3 },
          }}
        >
          <Box
            sx={{
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                backgroundColor: "#FA5252",
                borderRadius: "50%",
              }}
            ></span>
            {[...Array(8)].map((_, index) => (
              <span
                key={index}
                style={{
                  width: "2px",
                  height: "10px",
                  margin: "5px 0px 5px 2px",
                  backgroundColor: "#ccc",
                }}
              ></span>
            ))}
            <span
              style={{
                width: "7px",
                height: "7px",
                backgroundColor: "#5C0632",
                borderRadius: "50%",
              }}
            ></span>
          </Box>
          <Box
            sx={{
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              <Box fontSize={"14px"} color={"#2D3340"}>
                <span>{extractDate(props.leg.departureDateTime)}</span>
                <span
                  style={{
                    fontWeight: "bold",
                    margin: "0 5px",
                    fontSize: "22px",
                  }}
                >
                  .
                </span>
                <span>{extractTimeWithUnit(props.leg.departureDateTime)}</span>
              </Box>
              <Box fontSize={"14px"} color={"#2D3340"}>
                <span>{getCityName(props.leg.origin)}</span>
                <span> </span>
                <span>{`(${props.leg.origin})`}</span>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {formatDuration(props.leg.durationInMinutes)}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              <Box fontSize={"14px"} color={"#2D3340"}>
                <span>{extractDate(props.leg.arrivalDateTime)}</span>
                <span
                  style={{
                    fontWeight: "bold",
                    margin: "0 5px",
                    fontSize: "22px",
                  }}
                >
                  .
                </span>
                <span>{extractTimeWithUnit(props.leg.arrivalDateTime)}</span>
              </Box>
              <Box fontSize={"14px"} color={"#2D3340"}>
                <span>{getCityName(props.leg.destination)}</span>
                <span> </span>
                <span>{`(${props.leg.destination})`}</span>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: { xs: 2, sm: 0 },
            mb: { xs: 1, sm: 0 },
            height: { xs: "unset", sm: "200px" },
            flex: { xs: "unset", sm: 3 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box>
              <img
                src={`/AirlinesLogosForFlightCard/${props.leg.carrierCode}.png`}
                alt={`Airline Logo ${props.leg.carrierCode}.png`}
                width={"40px"}
              />
            </Box>
            <Typography variant="body2">
              {props.leg.carrierCode} {props.leg.flightNumber}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="body2"
              fontWeight={"bold"}
              onClick={handleLinkAircraft}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "underline",
                color: "blue",
              }}
            >
              {props.leg.aircraft} <LinkIcon />
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: props.index === 0 ? "220px" : "0px",
            width: { xs: "150px", sm: "100%" },
            gap: 1,
            mt: { xs: 2, sm: 0 },
            flex: { xs: "unset", sm: 1 },
          }}
        >
          {props.index === 0 && (
            <Button
              variant="outlined"
              sx={{ border: "1px solid #FA5252" }}
              onClick={handleLink}
              fullWidth
            >
              {!loading ? (
                <>
                  {" "}
                  <img
                    src={`/AirlineLogoSourceProgramLogos/${props.sourceAirline}.png`}
                    alt={`Airline Logo ${props.leg.carrierCode}.png`}
                    width={"60px"}
                    style={{
                      marginRight: "10px",
                    }}
                  />{" "}
                  Book
                </>
              ) : (
                <CircularProgress size={18} sx={{ color: "#fa5252" }} />
              )}
            </Button>
          )}
          {props.index === 0 && (
            <Box
              sx={{
                border: "1px solid #ebebeb",
                borderRadius: 2,
                display: "flex",
                width: "100%",
                flexDirection: "column",
                gap: 1,
                px: 1,
              }}
            >
              <Typography
                variant="body1"
                borderBottom={"1px solid #ebebeb"}
                sx={{ color: "#585C67" }}
              >
                Seats
              </Typography>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant="body2" sx={{ color: "#585C67" }}>
                  Economy
                </Typography>
                <Typography variant="body2" sx={{ color: "#585C67" }}>
                  {getRemainingSeats(props.pricingDetailsEcon) === "?" ? (
                    <Tooltip
                      title="Seats are available, airline did not disclose how many."
                      placement="top"
                      arrow={true}
                      leaveTouchDelay={3000}
                      enterTouchDelay={50}
                    >
                      <InfoOutlinedIcon
                        sx={{
                          color: "#FA5252",
                          width: 16,
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Typography variant="body2" sx={{ color: "#585C67" }}>
                      {getRemainingSeats(props.pricingDetailsEcon)}
                    </Typography>
                  )}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant="body2" sx={{ color: "#585C67" }}>
                  Premium
                </Typography>
                <Typography variant="body2" sx={{ color: "#585C67" }}>
                  {getRemainingSeats(props.pricingDetailsPrem) === "?" ? (
                    <Tooltip
                      title="Seats are available, airline did not disclose how many."
                      placement="top"
                      arrow={true}
                      leaveTouchDelay={3000}
                      enterTouchDelay={50}
                    >
                      <InfoOutlinedIcon
                        sx={{
                          color: "#FA5252",
                          width: 16,
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Typography variant="body2" sx={{ color: "#585C67" }}>
                      {getRemainingSeats(props.pricingDetailsPrem)}
                    </Typography>
                  )}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant="body2" sx={{ color: "#585C67" }}>
                  Business
                </Typography>
                <Typography variant="body2" sx={{ color: "#585C67" }}>
                  {getRemainingSeats(props.pricingDetailsBuss) === "?" ? (
                    <Tooltip
                      title="Seats are available, airline did not disclose how many."
                      placement="top"
                      arrow={true}
                      leaveTouchDelay={3000}
                      enterTouchDelay={50}
                    >
                      <InfoOutlinedIcon
                        sx={{
                          color: "#FA5252",
                          width: 16,
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Typography variant="body2" sx={{ color: "#585C67" }}>
                      {getRemainingSeats(props.pricingDetailsBuss)}
                    </Typography>
                  )}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant="body2" sx={{ color: "#585C67" }}>
                  First
                </Typography>
                {getRemainingSeats(props.pricingDetailsFirst) === "?" ? (
                  <Tooltip
                    title="Seats are available, airline did not disclose how many."
                    placement="top"
                    arrow={true}
                    leaveTouchDelay={3000}
                    enterTouchDelay={50}
                  >
                    <InfoOutlinedIcon
                      sx={{
                        color: "#FA5252",
                        width: 16,
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Typography variant="body2" sx={{ color: "#585C67" }}>
                    {getRemainingSeats(props.pricingDetailsFirst)}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {props.leg.connectionTimeInMinutes !== 0 && (
        <Box mb={2}>
          <Divider />
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
          >
            <Typography
              sx={{
                color: "#2D3340",
                my: 2,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {formatDuration(props.leg.connectionTimeInMinutes)}
              {` stopover`}
            </Typography>
            <AirlineStopsIcon />
          </Box>
          <Divider />
        </Box>
      )}
    </>
  );
}
