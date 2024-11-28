import { Box, Typography } from "@mui/material";

export default function Banner() {
    return (
        <Box
            component="a"
            href="https://flyfast.io"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                backgroundColor: "#FA5252",
                color: "white",
                width: "100%",
                py: 2,
                display: "flex",
                justifyContent: "center",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: "center",
                textAlign: "center",
                textDecoration: "none", // Remove underline for link styling
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                    transform: "scale(1.02)",
                },
            }}
        >
            <Typography variant="h5" sx={{ fontFamily: "Volkhov", letterSpacing: 1.5, pt: 2 }}>
                Find the Cheapest Cash Price Flights with FlyFast – Click to Discover Deals!
            </Typography>
        </Box>
    );
}
