import React, { useState, useEffect } from "react";
import { Typography, Box, ThemeProvider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { keyframes } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { Layout } from "../../layout/Layout";

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const popIn = keyframes`
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
`;

const textItems = [
  "LEARN",
  "EXPLORE",
  "TASTE",
  "PHOTOGRAPH",
  "GROW",
  "INSPIRE",
  "CONNECT",
  "THRIVE",
  "INNOVATE",
];
export interface IAboutProps {}

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: 500,
      fontFamily: ['"Oswald"', "sans-serif"].join(","),
      fontStyle: "normal",
    },
    h5: {
      fontSize: "2rem",
      fontWeight: 500,
      fontFamily: ['"Bodoni Moda"', "serif"].join(","),
      fontStyle: "italic",
    },
  },
});

export function About(props: IAboutProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        setCurrentTextIndex((prevIndex) => {
          if (prevIndex === textItems.length - 1) {
            setAnimationDone(true);
            clearInterval(intervalId);
            return prevIndex;
          }
          // Do not increment the index if we have reached the last item
          if (prevIndex < textItems.length - 1) {
            return prevIndex + 1;
          }
          return prevIndex + 1;
        });
      }, 300);

      return () => clearInterval(intervalId);
    }, 1200); // Start after 1.2s

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Box
          sx={{
            height: { xs: "50vh", sm: "100vh" },
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              pl: 2,
            }}
          >
            <Typography
              variant="h3"
              component="div"
              sx={{
                fontSize: "10vw",
                fontWeight: "bold",
                animation: `${popIn} 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
                animationFillMode: "both",
              }}
            >
              TRAVEL
            </Typography>
            <Typography
              variant="h3"
              component="div"
              sx={{
                fontSize: "10vw",
                fontWeight: "bold",
                animation: `${popIn} 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0.5s both`,
              }}
            >
              TO
            </Typography>
            <Typography
              variant="h3"
              component="div"
              sx={{
                fontSize: "10vw",
                fontWeight: "bold",
                animation: `${popIn} 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) 1s both`,
              }}
            >
              {textItems[currentTextIndex]} {animationDone && "*"}
            </Typography>
            {animationDone && (
              <Box sx={{ animation: `${slideIn} 1s forwards` }}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "3vw", fontWeight: "normal" }}
                >
                  *It is easier than you think search on{" "}
                  <a href="https://flymile.pro">flymile.pro</a>
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Layout>
    </ThemeProvider>
  );
}
