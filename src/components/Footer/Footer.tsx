import { Box, Button, Container, Typography } from "@mui/material";
import { onLinkClicked } from "../drawerAppBar/DrawerAppBar";

import { SocialMedia } from "../socialMedia/SocialMedia";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

export interface IFooterProps {}

const navItems = [
  "Credit Cards",
  "Calendar",
  "FlyGPT",
  "About",
  "FAQ",
  "Contact",
  "Newsletter",
  "Privacy",
];
export function Footer(props: IFooterProps) {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#171B26",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 4, md: 0 },
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "white",
            }}
          >
            <FlightTakeoffIcon sx={{ color: "#FA5252", fontSize: "30px" }} />
            <Typography
              onClick={() => onLinkClicked("Home")}
              variant="body1"
              sx={{ fontWeight: "bold", letterSpacing: 3, cursor: "pointer" }}
            >
              FLYMILE
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: "#fff",
                  textTransform: "capitalize",
                  letterSpacing: 1,
                  cursor: "pointer",
                }}
                onClick={() => onLinkClicked(item)}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Box>
        <SocialMedia color="#fff" border="1px solid #fff" />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            mt: 4,
          }}
        >
          <Typography sx={{ fontFamily: "Roboto", color: "white" }}>
            Flymile @ {new Date().getFullYear()}. All rights reserved
          </Typography>
          <Typography
            sx={{
              cursor: "pointer",
              ml: 2,
              fontFamily: "Roboto",
              color: "white",
              "&:hover": {
                textDecoration: "underline",
                textDecorationThickness: "2px",
                textUnderlineOffset: "3px",
              },
            }}
            onClick={() => {
              window.location.href = "/terms-and-conditions";
            }}
          >
            Terms of service
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              color: "white",
              textAlign: "center",
            }}
            variant="body2"
          >
            All trademarks, service marks, trade names, product names, and logos
            appearing on the site are the property of their respective owners.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
