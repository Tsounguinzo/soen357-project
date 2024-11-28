import {
  Box,
  // Button,
  // Checkbox,
  // CircularProgress,
  Container,
  // FormControlLabel,
  // TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { SocialMedia } from "../socialMedia/SocialMedia";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useState } from "react";
import AlertSnackbar from "../common/AlertSnackbar";
import { repo } from "../../lib/repo";
export interface IContactUsProps {}

export function ContactUs(props: IContactUsProps) {
  // const [agree, setAgree] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   message: "",
  // });
  // const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const matchesMobile = useMediaQuery("(max-width:784px)");

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  // };

  const handleCloseSnackbar = () => {
    setAlert(null);
  };

  // const handleSubmit = async () => {
  //   if (!formData.name || !formData.email || !formData.message) {
  //     setAlert({ type: "error", message: "Please fill in all fields." });
  //     return;
  //   }
  //   const emailRegex = /\S+@\S+\.\S+/;
  //   if (!emailRegex.test(formData.email)) {
  //     setAlert({
  //       type: "error",
  //       message: "Please enter a valid email address.",
  //     });
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     await repo.contactUs(formData);
  //     setAlert({ type: "success", message: "Message sent successfully!" });
  //   } catch (error) {
  //     setAlert({
  //       type: "error",
  //       message:
  //         "There was an error sending your message. Please try again later.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleChangeApproval = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAgree(event.target.checked);
  // };
  return (
    <Box
      id="contactussection"
      sx={{
        width: "100%",
        backgroundColor: "#FCF3F1",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: matchesMobile ? "column" : "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            width: { xs: "100%", sm: "50%" },
          }}
        >
          <Typography variant="h3" color={"#222222"} fontFamily={"Volkhov"}>
            Let's talk
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <LocationOnOutlinedIcon sx={{ color: "#585C67" }} />
              <Typography variant="body2" color={"#585C67"}>
                Montreal, QC, Canada
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <EmailOutlinedIcon sx={{ color: "#585C67" }} />
              <Typography variant="body2" color={"#585C67"}>
                hello@flymile.pro
              </Typography>
            </Box>
          </Box>
          <SocialMedia color="#FA5252" border="none" />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
          <img
            src="/document-mail.png"
            alt="mail"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        {/* <Box
          sx={{
            backgroundColor: "#fff",
            py: "60px",
            px: "40px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <TextField
            name="name"
            variant="standard"
            required
            label="Name"
            onChange={handleInputChange}
            fullWidth
            placeholder="Enter Name"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="email"
            variant="standard"
            label="Email"
            onChange={handleInputChange}
            fullWidth
            required
            placeholder="Enter Email"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="message"
            variant="standard"
            label="Message"
            onChange={handleInputChange}
            required
            multiline
            fullWidth
            rows={4}
            placeholder="Enter Message"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControlLabel
            sx={{
              color: "#585C67",
              userSelect: "none",
            }}
            control={
              <Checkbox
                onChange={handleChangeApproval}
                checked={agree}
                sx={{
                  color: "#D2D3D6",
                  "&.Mui-checked": {
                    color: "#D2D3D6",
                  },
                }}
              />
            }
            label={"I'm okay with you keeping in touch!"}
            labelPlacement="end"
          />
            <Button
                type="submit"
                onClick={handleSubmit}
                variant="contained"
                fullWidth
                disabled={loading}
                endIcon={
                    loading && (
                        <CircularProgress
                            size={18}
                            sx={{ color: "#FA5252" }}
                            thickness={5}
                        />
                    )
                }
                sx={{
                    backgroundColor: "#FA5252",
                    color: "#fff",
                    "&: hover": {
                        backgroundColor: "#FA5252",
                    },
                }}
            >
                Send
            </Button>
        </Box> */}
      </Container>
      <AlertSnackbar
        open={!!alert}
        message={alert?.message ?? ""}
        severity={alert?.type ?? "error"}
        handleClose={handleCloseSnackbar}
      />
    </Box>
  );
}
