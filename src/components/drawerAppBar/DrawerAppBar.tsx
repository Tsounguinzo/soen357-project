import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth } from "@clerk/clerk-react";
import FlightIcon from "@mui/icons-material/Flight";
import { Fade, Skeleton, styled, useScrollTrigger } from "@mui/material";
import {
  SignInButton as ClerkSignInButton,
  SignedOut,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SearchIcon from "@mui/icons-material/Search";
import { v4 as uuidv4 } from "uuid";
import Eyes from "../common/Eyes";

const drawerWidth = 240;

interface DrawerAppBarProps {
  window?: () => Window;
}

interface ScrollTopProps {
  window?: () => Window;
  children: React.ReactElement;
}

function ScrollTop(props: ScrollTopProps) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

export const onLinkClicked = (item: string) => {
  if (item === "Home") {
    window.location.href = "/";
  } else if (item === "Calendar") {
    if (window.location.href === "/") {
      document.getElementById("calendarviewsection")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      window.location.href = "/#calendarviewsection";
    }
  } else if (item === "Credit Cards") {
    window.location.href = "/credit-cards";
  } else if (item === "Privacy") {
    window.location.href = "/privacy";
  } else if (item === "About") {
    window.location.href = "/about";
  } else if (item == "FlyGPT") {
    window.open("https://chatgpt.com/g/g-ix7vHuoN4-flygpt", "_blank");
  } else if (item === "Contact") {
    if (window.location.href === "/") {
      document.getElementById("contactussection")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      window.location.href = "/#contactussection";
    }
  } else if (item === "FAQ") {
    if (window.location.href === "/") {
      document.getElementById("faqsection")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      window.location.href = "/#faqsection";
    }
  } else if (item === "Newsletter") {
    if (window.location.href === "/") {
      document.getElementById("newslettersection")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      window.location.href = "/#newslettersection";
    }
  }
};

const SignInButton = styled(ClerkSignInButton)({
  backgroundColor: "#FA5252",
  color: "white",
  borderRadius: "5px",
  fontFamily: "Roboto",
  border: "none",
  outline: "none",
  cursor: "pointer",
  textTransform: "uppercase",
  padding: "10px",
  margin: "auto",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const navItemsMobile = [
  "Credit Cards",
  "Calendar",
  "FlyGPT",
  "About",
  "FAQ",
  "Contact",
  "Newsletter",
  "Privacy",
];

export default function DrawerAppBar(props: DrawerAppBarProps) {
  const { isLoaded, isSignedIn } = useAuth();

  const [navItems, setNavItems] = useState([
    "Credit Cards",
    "Calendar",
    "FlyGPT",
  ]);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  // useEffect(() => {
  // if (location.pathname === "/") {
  //   setNavItems(["Credit Cards", "Calendar"]);
  // } else {
  //   setNavItems(["Credit Cards"]);
  // }
  // }, [location]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          color: "#FA5252",
          mt: 2,
          mb: 1,
        }}
      >
        <FlightTakeoffIcon sx={{ fontSize: "30px" }} />
        <Typography
          onClick={() => onLinkClicked("Home")}
          variant="body1"
          sx={{
            letterSpacing: 3,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          FLYMILE
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItemsMobile.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
                textTransform: "capitalize",
                letterSpacing: 1,
              }}
              onClick={() => onLinkClicked(item)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        {!isSignedIn ? (
          isLoaded ? (
            <ListItem key={uuidv4.toString()}>
              <SignedOut>
                <SignInButton>Signup / login</SignInButton>
              </SignedOut>
            </ListItem>
          ) : (
            <Skeleton
              variant="rectangular"
              width={"120px"}
              height={"40px"}
              animation="wave"
              sx={{ borderRadius: "5px", backgroundColor: "#ddd" }}
            />
          )
        ) : (
          <></>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "transparent",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            backgroundColor: "#fff", //"#FFF8F8", //"#171B26",
            py: 2,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 0.5, display: { md: "none" }, color: "#FA5252" }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "white",
            }}
          >
            <FlightTakeoffIcon
              sx={{
                fontSize: "30px",
                color: "#FA5252",
                display: { xs: "none", md: "block" },
              }}
            />
            <Typography
              onClick={() => onLinkClicked("Home")}
              variant="body1"
              sx={{
                fontWeight: "bold",
                letterSpacing: 3,
                cursor: "pointer",
                color: "#FA5252",
              }}
            >
              FLYMILE
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, md: 2 },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {navItems.map(
                (item) =>
                  !["FlyGPT", "Calendar"].includes(item) && (
                    <Button
                      key={item}
                      sx={{
                        color: "#000",
                        textTransform: "capitalize",
                        letterSpacing: 1,
                        cursor: "pointer",
                        transition: "transform 0.2s ease-in-out",
                        fontWeight: "bold",
                        fontSize: "16px",
                        "&:hover": {
                          transform: "scale(1.05)",
                          fontWeight: "bold",
                          backgroundColor: "transparent",
                        },
                      }}
                      onClick={() => onLinkClicked(item)}
                    >
                      {item}
                    </Button>
                  )
              )}
              <Button
                sx={{
                  backgroundColor: "#FA5252",
                  color: "white",
                  borderRadius: "5px",
                  fontFamily: "Roboto",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  padding: "5px",
                  margin: "auto",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "#FA5252",
                    color: "#fff",
                  },
                }}
                startIcon={
                  <SearchIcon
                    sx={{ ml: "5px", color: "#fff" }}
                    fontSize="small"
                  />
                }
                endIcon={<Eyes />}
                onClick={() => onLinkClicked("Calendar")}
              >
                {"Calendar"}
              </Button>
            </Box>
            <Button
              sx={{
                backgroundColor: "#FA5252",
                color: "white",
                borderRadius: "5px",
                fontFamily: "Roboto",
                border: "none",
                outline: "none",
                cursor: "pointer",
                padding: "5px",
                display: { xs: "flex", md: "none" },
                margin: "auto",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  backgroundColor: "#FA5252",
                  color: "#fff",
                },
              }}
              endIcon={<Eyes />}
              onClick={() => onLinkClicked("Calendar")}
            >
              {"Calendar"}
            </Button>
            <Button
              sx={{
                backgroundColor: "#FA5252",
                color: "white",
                borderRadius: "5px",
                fontFamily: "Roboto",
                border: "none",
                outline: "none",
                cursor: "pointer",
                display: { xs: "none", md: "flex" },
                padding: "6px",
                margin: "auto",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  backgroundColor: "#FA5252",
                  color: "#fff",
                },
              }}
              endIcon={<FlightIcon fontSize="small" sx={{ color: "#fff" }} />}
              onClick={() => onLinkClicked("FlyGPT")}
            >
              {"FLYGPT"}
            </Button>
            <Box>
              {!isSignedIn ? (
                isLoaded ? (
                  <SignedOut>
                    <SignInButton>Signup / login</SignInButton>
                  </SignedOut>
                ) : (
                  <Skeleton
                    variant="rectangular"
                    width={"120px"}
                    height={"40px"}
                    animation="wave"
                    sx={{ borderRadius: "5px", backgroundColor: "#ddd" }}
                  />
                )
              ) : (
                <></>
              )}
            </Box>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Toolbar id="back-to-top-anchor" />
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            width: drawerWidth,
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
