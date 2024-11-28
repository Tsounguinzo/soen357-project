import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Fade,
  Grid,
  styled,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState } from "react";
import cardData from "./creditCards.json";
import { v4 as uuidv4 } from "uuid";
import { Layout } from "../../layout/Layout";

export interface ICreditCardsProps {}
interface CardData {
  cardID: number;
  countryCode: string;
  cardTypeBusiness: boolean;
  applyURL: string;
  cardName: string;
  cardIssuer: string;
  cardImagePath: string;
}

interface CardComponentProps {
  card: CardData;
}

interface CreditCardTabsProps {
  currentTab: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface StyledTabProps {
  label: string;
}

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "#000",
  },
});

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "1rem",
  marginRight: theme.spacing(1),
  color: "#000",
  "&.Mui-selected": {
    color: "#FA5252",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const CardComponent: React.FC<CardComponentProps> = ({ card }) => {
  return (
    <Grid item xs={6} sm={6} md={4} lg={3}>
      <Card
        raised={false}
        sx={{
          maxWidth: "345px",
          width: "100%",
          background: "transparent",
          boxShadow: "none",
          transition: "transform 0.6s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)", // Scales up the card to 110% of its original size
          },
        }}
      >
        <CardActionArea
          onClick={() => window.open(card.applyURL, "_blank")}
          sx={{
            p: 0,
            "&:hover": { backgroundColor: "transparent" },
            "& .MuiCardActionArea-focusHighlight": {
              backgroundColor: "transparent",
            },
          }}
        >
          <CardMedia
            component="img"
            image={card.cardImagePath}
            alt={card.cardName}
          />
          <Box sx={{ p: 1 }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                my: 1,
                textAlign: "center",
                fontSize: "0.875rem",
              }}
            >
              {card.cardName}
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

const CreditCardTabs: React.FC<CreditCardTabsProps> = ({
  currentTab,
  handleTabChange,
}) => {
  return (
    <StyledTabs value={currentTab} onChange={handleTabChange} centered>
      <StyledTab label="All Cards" />
      <StyledTab label="AMEX 🇨🇦" />
      <StyledTab label="AMEX 🇺🇸" />
    </StyledTabs>
  );
};

export function CreditCards(props: ICreditCardsProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedFadeKey, setSelectedFadeKey] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    setSelectedFadeKey((prevKey) => prevKey + 1);
  };

  const filterCards = (tabIndex: number): CardData[] => {
    switch (tabIndex) {
      case 1:
        return cardData.filter(
          (card) => card.countryCode === "CA" && card.cardIssuer === "AMEX"
        );
      case 2:
        return cardData.filter(
          (card) => card.countryCode === "US" && card.cardIssuer === "AMEX"
        );
      default:
        return cardData;
    }
  };

  const filteredCards = filterCards(currentTab).sort((a, b) => {
    return a.cardTypeBusiness === b.cardTypeBusiness
      ? 0
      : a.cardTypeBusiness
      ? 1
      : -1;
  });

  return (
    <Layout>
      <CssBaseline />
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Credit Cards
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Discover the Best Cards: For U.S. cards, open the link in incognito
            mode for a superior offer.
          </Typography>
        </Container>
        <CreditCardTabs
          currentTab={currentTab}
          handleTabChange={handleTabChange}
        />
        <Fade in={true} timeout={800} key={selectedFadeKey}>
          <Container maxWidth="lg" sx={{ mt: 3 }}>
            <Grid
              container
              spacing={4}
              justifyContent={isMobile ? "center" : "flex-start"}
            >
              {filteredCards.map((card) => (
                <CardComponent key={uuidv4()} card={card} />
              ))}
            </Grid>
          </Container>
        </Fade>
      </Box>
    </Layout>
  );
}

export default CreditCards;
