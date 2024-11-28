import { createTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const theme = createTheme({
  components: {
    // Name of the component
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreIcon,
        //there are tons of props that you can override
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&:before": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 850,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "Roboto, Volkhov, sans-serif",
  },
  palette: {
    primary: {
      main: "#FA5252",
    },
    secondary: {
      main: "#171B26",
    },
  },
});

export default theme;
