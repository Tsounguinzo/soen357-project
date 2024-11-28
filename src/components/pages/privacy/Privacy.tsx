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

export default function Privacy() {
    return (
        <Layout>
            <Container maxWidth="md">
                <CssBaseline />
                <Paper style={styles.paperContainer}>
                    <Typography variant="h4" style={styles.header} gutterBottom>
                        Privacy Policy
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <span style={styles.bold}>Last Updated:</span> April 28, 2024
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                    <span style={styles.bold}>
                        This Privacy Policy outlines the limited scope of personal information we collect through Google authentication when you use our Service.
                    </span>
                    </Typography>
                    <Typography variant="h6" style={styles.subHeader}>
                        1. Personal Information We Collect
                    </Typography>
                    <Box mb={2}>
                        <Typography variant="body1">
                            We collect your basic information via Google authentication when you sign in. This includes your name, email address, profile picture and language preferences.
                        </Typography>
                    </Box>
                    <Typography variant="h6" style={styles.subHeader}>
                        2. Use of Your Personal Information
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We use your personal information to manage your account, to provide you with our Services, and to communicate important service updates.
                    </Typography>
                    <Typography variant="h6" style={styles.subHeader}>
                        3. Sharing of Your Personal Information
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We do not share your personal information with any third parties, except as necessary to provide our Services or as required by law.
                    </Typography>
                    <Typography variant="h6" style={styles.subHeader}>
                        4. Security of Your Personal Information
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We are committed to protecting the security of your personal information and use a variety of security technologies and procedures to help protect your personal information from unauthorized access, use, or disclosure.
                    </Typography>
                    <Typography variant="h6" style={styles.subHeader}>
                        5. Your Data Protection Rights
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You have certain rights regarding your personal information, including the right to access, correct, or delete the information we hold about you.
                    </Typography>
                    <Typography variant="h6" style={styles.subHeader}>
                        6. Changes to This Privacy Policy
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by updating the "Last Updated" date at the top of this Privacy Policy.
                    </Typography>
                </Paper>
            </Container>
        </Layout>
    );

}