import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Link as LinkH,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Flight } from "./Flight";
import { useEffect, useState } from "react";
import flightsData from "../../lib/flightDataDemo";
import { Link, useSearchParams } from "react-router-dom";
import { repo } from "../../lib/repo";
import { FlightData } from "../../lib/FlightDataType";
import DrawerAppBar from "../drawerAppBar/DrawerAppBar";
import { Footer } from "../Footer/Footer";

import { ArrowRightAlt } from "@mui/icons-material";

export interface ISharedFlightProps {}

export function SharedFlight(props: ISharedFlightProps) {
  const theme = useTheme();
  const [urlFlightData, setURLFlightData] = useState<{
    numPassengers: string;
    upperCabin: boolean;
  }>({
    numPassengers: "null",
    upperCabin: false,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

  const [flightData, setFlightData] = useState<FlightData>(flightsData[0]);

  const btns = (
    <ButtonGroup
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: isMobileView ? "80%" : "100%",
        mx: "auto",
      }}
      orientation={isMobileView ? "vertical" : "horizontal"}
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        component={Link}
        sx={{ py: isMobileView ? 1 : 2, px: 4 }}
        to="/"
      >
        Search
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        component={Link}
        sx={{ py: isMobileView ? 1 : 2, px: 4 }}
        to="/#calendarviewsection"
      >
        Calendar View
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ py: isMobileView ? 1 : 2, px: 4 }}
        component={Link}
        to="/credit-cards"
      >
        Credit Cards
      </Button>
    </ButtonGroup>
  );

  const flightInfo = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 1,
        backgroundColor: "#fff",
        p: 1,
        borderRadius: "12px",
      }}
    >
      <Box display={"flex"} alignItems={"center"} gap={2}>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <img
            src="/departureShare.png"
            style={{
              width: isMobileView ? "24px" : "unset",
              height: isMobileView ? "24px" : "unset",
            }}
          />
          <Typography
            variant={isMobileView ? "body1" : "h5"}
            letterSpacing={1}
            fontWeight={900}
            color={"primary"}
          >
            {searchParams.get("origin")}
          </Typography>
        </Box>
        <ArrowRightAlt />
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <img
            src="/arrivalShare.png"
            style={{
              width: isMobileView ? "24px" : "unset",
              height: isMobileView ? "24px" : "unset",
            }}
          />
          <Typography
            variant={isMobileView ? "body1" : "h5"}
            fontWeight={900}
            color={"primary"}
            letterSpacing={1}
          >
            {searchParams.get("destination")}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2">Date : {searchParams.get("date")}</Typography>
    </Box>
  );

  useEffect(() => {
    const fetchFlightData = async () => {
      const airline = searchParams.get("airline");
      const flightID = searchParams.get("flightID");
      const origin = searchParams.get("origin");
      const destination = searchParams.get("destination");
      const numPassengers = searchParams.get("numPassengers");
      const date = searchParams.get("date");
      const maxStops = searchParams.get("maxStops");
      const upperCabin = searchParams.get("upperCabin");
      const nonStopOnly = searchParams.get("nonStopOnly");
      if (
        airline &&
        flightID &&
        origin &&
        destination &&
        numPassengers &&
        date &&
        maxStops &&
        upperCabin &&
        nonStopOnly
      ) {
        try {
          setURLFlightData({
            numPassengers: numPassengers,
            upperCabin: upperCabin === "true",
          });
          setLoading(true);
          const response = await repo.getPromiseLink(
            airline,
            flightID,
            origin,
            destination,
            Number(numPassengers),
            date,
            maxStops,
            upperCabin === "true",
            nonStopOnly === "true"
          );
          setLoading(false);
          setFlightData(response);
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      } else {
        setError(true);
        setLoading(false);
      }
    };

    fetchFlightData();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        fontFamily: "Robot !important",
      }}
    >
      <Box width={"100%"} height={isMobileView ? "100%" : "70%"}>
        <Box position={"relative"} width={"100%"} height={"100%"}>
          <img src="/sharedflight2.jpeg" width={"100%"} height={"100%"} />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              width: isMobileView ? "100%" : "600px",
              transform: "translateX(-50%)",
              marginBottom: isMobileView ? "-90px" : "-25px",
            }}
          >
            {btns}
          </Box>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              marginTop: isMobileView ? 2 : 0,
              transform: "translate(-50%, -50%)",
            }}
          >
            {flightInfo}
          </Box>
        </Box>
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          mt: isMobileView ? 20 : 10,
        }}
      >
        {loading ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              bgcolor: "grey.100",
              borderRadius: "16px",
              zIndex: 2,
            }}
            width={"100%"}
            height={"200px"}
          />
        ) : !error &&
          urlFlightData.numPassengers &&
          urlFlightData.upperCabin != null ? (
          <Box>
            <Flight
              index={1}
              numOfPass={Number(urlFlightData.numPassengers)}
              upperCabin={urlFlightData.upperCabin}
              flightData={flightData}
              openFlightDeck={true}
            />
          </Box>
        ) : (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap={2}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              py: 2,
              boxShadow: "0px 9px 36px 0px #00000017",
              textAlign: "center",
              px: 1,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Sorry flight link is expired or not found. Search for your flight
              now on
            </Typography>
            <LinkH
              sx={{ fontSize: "18px", fontFamily: "Roboto" }}
              href="https://www.flymile.pro/"
            >
              Flymile.pro
            </LinkH>
          </Box>
        )}
      </Container>
      <DrawerAppBar />
      <Footer />
    </Box>
  );
}
