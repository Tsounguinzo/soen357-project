import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import theme from "../../theme";

export interface faq {
  question: string;
  answer: string;
}

export interface IFaqProps {}

export function Faq(props: IFaqProps) {
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  const questions: faq[] = [
    {
      question: "What is FlyMile?",
      answer:
        "FlyMile optimizes your airline miles and credit card rewards, offering a powerful platform that scans through numerous airline loyalty programs and dates simultaneously. This ensures that travelers like you always access the best possible redemption deals for award flights.",
    },
    {
      question: "What is Calendar View?",
      answer:
        "Calendar View is a tool that shows award flight prices over time, helping you spot the lowest-cost dates for travel between two airports.",
    },
    {
      question: "What is Range Feature ?",
      answer:
        "The Range feature allows you to broaden your search when looking for the best flight deals. Instead of picking a single date, you can select a date range, up to 7 days, to see award flight options. This maximizes the potential to use your miles effectively by comparing various dates within your selected period.",
    },
    {
      question: "Which airline programs does FlyMile currently search?",
      answer:
        "FlyMile's search currently encompasses American AAdvantage, Delta SkyMiles, and Alaska Mileage Plan. We're on track to expand our offerings by adding 5 more loyalty programs by the end of May 2024.",
    },
    {
      question: "Is FlyMile affiliated with any Airline loyalty programs?",
      answer:
        "No, FlyMile is not affiliated with any Airline loyalty programs. Our focus is solely on maximizing airline/credit-card points FOR YOU :) .",
    },
    {
      question: "How do I earn credit card points?",
      answer:
        "Accumulate points by using your credit card for everyday purchases, taking advantage of bonus categories, and capitalizing on sign-up bonuses. For the best current offers, check our credit card page.",
    },
    {
      question: "How often is FlyMile's data refreshed?",
      answer:
        "FlyMile's flight data is updated every hour to ensure you receive the best possible results. Additionally, the Calendar View feature is refreshed twice a day to maintain up-to-date information.",
    },
  ];

  return (
    <Box
      id="faqsection"
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_16196_478)">
            <path
              d="M29.3824 24.9716H0.975342V26.2066H29.3824V24.9716Z"
              fill="#FA5252"
            />
            <path
              d="M28.9523 5.51481C26.8892 4.31238 24.545 4.95111 22.9421 5.69859L18.1636 7.92682L9.94533 3.79333L5.05109 4.00361L11.8375 10.8836L7.5125 12.9381L3.01276 11.2256L0 12.6304L2.7227 16.0114C2.43504 16.3545 2.17438 16.8377 2.41102 17.3452C2.7201 18.0079 3.63364 18.342 5.13211 18.3419C5.4394 18.3419 5.77133 18.3279 6.1276 18.2997C7.77249 18.1698 9.55584 17.7499 10.6709 17.23L27.752 9.26491C29.2273 8.57691 29.9622 7.8545 29.9986 7.05626C30.0175 6.64226 29.8514 6.03861 28.9523 5.51481ZM27.2299 8.14549L10.1489 16.1106C9.1989 16.5536 7.63916 16.9248 6.17533 17.0562C4.67914 17.1906 3.87917 17.0219 3.61252 16.8787C3.66742 16.8035 3.76993 16.6855 3.95909 16.519L4.40273 16.1285L1.95058 13.0835L3.0613 12.5655L7.56586 14.28L13.937 11.2535L7.88507 5.11803L9.67725 5.04102L18.1431 9.29894L23.4639 6.81789C25.4071 5.91176 27.0444 5.83247 28.3303 6.5818L28.3304 6.58186C28.6544 6.77065 28.7677 6.93535 28.7647 6.99994C28.7646 7.00439 28.7275 7.44729 27.2299 8.14549Z"
              fill="#FA5252"
            />
          </g>
          <defs>
            <clipPath id="clip0_16196_478">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant={isMobileView ? "h4" : "h3"}
          fontFamily={"Volkhov"}
          textAlign={"center"}
        >
          <span style={{ color: "#FA5252", marginRight: "10px" }}>
            Frequently
          </span>
          Asked Questions
        </Typography>
      </Box>
      <Box
        sx={{
          boxShadow: "0px 9px 36px 0px #00000017",
          width: "98%",
        }}
      >
        {questions.map((faq, index) => {
          return (
            <Accordion
              square={false}
              elevation={0}
              key={faq.question}
              disableGutters
              sx={{
                py: 2,
                width: "100%",
                borderBottom:
                  index !== questions.length - 1 ? "1px solid #D2D3D6" : "none",
              }}
            >
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon sx={{ color: "#FA5252" }} />}
                sx={{
                  fontSize: "18px",
                  fontFamily: "Volkhov",
                }}
              >
                {faq.question}
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  fontFamily: "Roboto !important",
                  fontSize: "16px",
                  textAlign: "justify",
                  color: "#585C67",
                }}
              >
                {faq.answer}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );
}
