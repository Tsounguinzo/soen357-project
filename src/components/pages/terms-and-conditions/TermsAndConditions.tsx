import React from "react";
import {
  Container,
  Typography,
  Box,
  Link,
  CssBaseline,
  Paper,
} from "@mui/material";
import { Layout } from "../../layout/Layout";

// Custom styles
const styles = {
  paperContainer: {
    backgroundColor: "inherit", // Dark background
    color: "#171B26", // Light text
    padding: "2rem",
    borderRadius: "8px",
    marginTop: "2rem",
  },
  header: {
    color: "#FA5252", // Light blue for important titles
    marginBottom: "1rem",
  },
  subHeader: {
    fontWeight: "bold",
    color: "#61aae7", // Teal for subheaders
    marginTop: "1rem",
    marginBottom: "0.5rem",
  },
  link: {
    color: "#5dc9d7", // Cyan for links
  },
  bold: {
    fontWeight: "bold",
  },
};

export default function TermsAndConditions() {
  return (
    <Layout>
      <Container maxWidth="md">
        <CssBaseline />
        <Paper style={styles.paperContainer}>
          <Typography variant="h4" style={styles.header} gutterBottom>
            Terms and Conditions
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <span style={styles.bold}>Last Updated:</span> April 14, 2024
          </Typography>
          <Typography variant="subtitle1" paragraph>
            <span style={styles.bold}>
              Please read these terms and conditions carefully before using our
              service.
            </span>
          </Typography>
          <Typography variant="h6" style={styles.subHeader}>
            1. Definitions
          </Typography>
          <Box mb={2}>
            <Typography variant="body1">
              <span style={styles.bold}>Service</span>: refers to our website,
              accessible at{" "}
              <Link href="https://www.flymile.pro/" style={styles.link}>
                https://www.flymile.pro/
              </Link>{" "}
              and{" "}
              <Link href="https://www.flymile.ca/" style={styles.link}>
                https://www.flymile.ca/
              </Link>
              <br />
              <span style={styles.bold}>Company</span>: means Fly mile located
              at coming soon.
              <br />
              <span style={styles.bold}>You</span>: means the individual
              accessing our Service, or the company, or other legal entity on
              behalf of which such individual is accessing or using the Service.
            </Typography>
          </Box>
          <Typography variant="h6" style={styles.subHeader}>
            2. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing or using our Service, you agree to be bound by these
            Terms. If you disagree with any part of the terms, you must not use
            our Service.
          </Typography>
          <Typography variant="h6" style={styles.subHeader}>
            3. Use of Service
          </Typography>
          <Typography variant="body1" paragraph>
            Our Service is provided for your personal and non-commercial use
            unless explicitly allowed under a commercial license provided by us.
          </Typography>
          <Typography variant="h6" style={styles.subHeader}>
            4. Links to Other Websites
          </Typography>
          <Typography variant="body1" paragraph>
            Our Service may contain links to third-party websites. We are not
            responsible for the content, privacy policies, or practices of any
            third-party sites.
          </Typography>
          <Typography variant="h6" style={styles.subHeader}>
            5. Termination
          </Typography>
          <Typography variant="body1" paragraph>
            We may terminate or suspend your access to the Service immediately,
            without prior notice, if you breach these Terms.
          </Typography>
          <Typography variant="h6" style={styles.subHeader}>
            6. Disclaimer
          </Typography>
          <Typography variant="body1" paragraph>
            Our Service is provided on an "AS IS" and "AS AVAILABLE" basis. We
            disclaim all warranties and conditions of any kind, whether express
            or implied.
          </Typography>
          <Typography variant="h6" style={styles.subHeader}>
            7. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            To the maximum extent permitted by applicable law, in no event will
            we be liable for any indirect, incidental, special, consequential,
            or punitive damages resulting from your use of our Service.
          </Typography>
          <Typography variant="h6" style={styles.subHeader}>
            8. Changes to These Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to modify these Terms at any time. We will
            provide notice of any significant changes by updating the "Last
            Updated" date at the top of these Terms.
          </Typography>
        </Paper>
      </Container>
    </Layout>
  );
}
