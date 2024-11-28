import { Box, Typography } from "@mui/material";
import { SearchForm } from "../../searchForm/SearchForm";
import { Faq } from "../../faq/Faq";
import AirLinesLogos from "../../airlinesLogo/AirLinesLogos";
import { CalendarView } from "../../calendar-view/CalendarView";
import { IAirport, Idata } from "../../../lib/interfaces";
import { useEffect, useState } from "react";
import {
  convertDate,
  getAfterTomorrowDate,
  getTomorrowDate,
} from "../../../lib/utilities";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../layout/Layout";

export interface IHomeProps {}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
export function Home(props: IHomeProps) {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const navigate = useNavigate();

  const [selectedNumOfPass, setSelectedNumOfPass] = useState<string>("1");
  const [fromToDate, setFromToDate] = useState<Value>([
    getTomorrowDate(),
    getAfterTomorrowDate(),
  ]);
  const [cabin, setCabin] = useState<boolean>(false);
  const [origin, setOrigin] = useState<IAirport | null>({
    airportCode: "YUL",
    cityName: "Montreal",
  });
  const [destination, setDestination] = useState<IAirport | null>({
    airportCode: "LHR",
    cityName: "London-Heathrow",
  });

  useEffect(() => {
    if (window.location.href.includes("#calendarviewsection")) {
      document.getElementById("calendarviewsection")?.scrollIntoView({
        behavior: "smooth",
      });
    } else if (window.location.href.includes("#contactussection")) {
      document.getElementById("contactussection")?.scrollIntoView({
        behavior: "smooth",
      });
    } else if (window.location.href.includes("#faqsection")) {
      document.getElementById("faqsection")?.scrollIntoView({
        behavior: "smooth",
      });
    } else if (window.location.href.includes("#newslettersection")) {
      document.getElementById("newslettersection")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);
  const handleChangeNumOfPass = (value: string) => {
    setSelectedNumOfPass(value);
  };
  const handleChangeCabin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCabin(event.target.checked);
  };
  function handleOnChangeOrigin(event: any, value: IAirport | null) {
    setOrigin(value);
  }
  function handleOnChangeDestination(event: any, value: IAirport | null) {
    setDestination(value);
  }
  function handleSwapValues() {
    if (origin && destination) {
      let temp = origin;
      setOrigin(destination);
      setDestination(temp);
    }
  }
  function handleOnCloseSnackbar(
    event: React.SyntheticEvent | Event,
    reason?: string
  ) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  }

  function handleOnSubmitForm(event: any) {
    event.preventDefault();
    if (origin && destination && selectedNumOfPass) {
      if (
        Array.isArray(fromToDate) &&
        fromToDate.length === 2 &&
        fromToDate[0] &&
        fromToDate[1]
      ) {
        const data: Idata = {
          departure: origin,
          arrival: destination,
          startDate: convertDate(fromToDate[0].toString()),
          endDate: convertDate(fromToDate[1].toString()),
          numPassengers: selectedNumOfPass,
          upperCabin: cabin,
          fromToDate: fromToDate,
        };
        navigate("/flights", {
          state: {
            data,
          },
        });
      }
    } else {
      setOpenSnackbar(true);
    }
  }

  return (
    <Layout>
      <Typography
        color="secondary"
        variant="h3"
        sx={{
          textAlign: "center",
          display: { xs: "none", sm: "block" },
          fontFamily: "Volkhov",
          width: "550px",
          margin: "0 auto",
        }}
      >
        Points to Paradise Enhancing Your Travel Value..
      </Typography>
      <Typography
        color="secondary"
        variant="h4"
        sx={{
          textAlign: "center",
          display: { xs: "block", sm: "none" },
          fontFamily: "Volkhov",
          width: "300px",
          margin: "0 auto",
        }}
      >
        Points to Paradise Enhancing Your Travel Value..
      </Typography>
      <Box mt={"80px"}></Box>
      <SearchForm
        cabin={cabin}
        destination={destination}
        origin={origin}
        fromToDate={fromToDate}
        setFromToDate={setFromToDate}
        handleChangeCabin={handleChangeCabin}
        handleChangeNumOfPass={handleChangeNumOfPass}
        handleOnChangeDestination={handleOnChangeDestination}
        handleOnChangeOrigin={handleOnChangeOrigin}
        handleOnCloseSnackbar={handleOnCloseSnackbar}
        openSnackbar={openSnackbar}
        handleSwapValues={handleSwapValues}
        setOpenSnackbar={setOpenSnackbar}
        selectedNumOfPass={selectedNumOfPass}
        handleOnSubmitForm={handleOnSubmitForm}
        isLoading={false}
      />
      <Box mt={"80px"}></Box>
      <AirLinesLogos />
      <Box mt={"80px"}></Box>
      <CalendarView />
      <Box mt={"80px"}></Box>
      <Faq />
    </Layout>
  );
}
