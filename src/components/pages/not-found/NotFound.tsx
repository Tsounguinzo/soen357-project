import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Layout } from "../../layout/Layout";

export const NotFound = () => {
  const theme = useTheme();

  return (
    <Layout>
      <Container
        component="main"
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: theme.spacing(1),
        }}
      >
        <img
          src="/404.png"
          alt="Travel"
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: theme.shape.borderRadius,
          }}
        />
        <Typography variant="h1" gutterBottom style={{ fontSize: 30 }}>
          Oops! Page Not Found
        </Typography>
        <Box mt={1}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/"
          >
            Go Back Home
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};
