import {
    Box,
    Button, CircularProgress,
    Container,
    TextField,
    Typography,
    useMediaQuery, useTheme,
} from "@mui/material";
import { useState } from "react";
import {repo} from "../../lib/repo";
import AlertSnackbar from "../common/AlertSnackbar";
export interface INewsLetterProps {}

export function NewsLetter(props: INewsLetterProps) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{type: 'error' | 'success', message: string}|null>(null);
    const matchesMobile = useMediaQuery("(max-width:784px)");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleCloseSnackbar = () => {
        setAlert(null);
    };

    const handleSubmit = async () => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            setAlert({type: 'error', message: 'Please enter a valid email address.'});
            return;
        }

        setLoading(true);

        try {
            await repo.subscribeEmail(email);
            setAlert({type: 'success', message: 'Thank you for subscribing to our newsletter!'});
            setEmail('');
        } catch (error) {
            setAlert({type: 'error', message: 'There was an error submitting your email. Please try again.'});
        } finally {
            setLoading(false);
        }
    };
  return (
      <Box id="newslettersection" sx={{ width: '100%', py: 3 }}>
          <Container maxWidth="lg" sx={{
              display: 'flex',
              gap: 5,
              alignItems: 'center',
              flexDirection: matchesMobile ? 'column' : 'row',
              justifyContent: 'space-between',
          }}>
              <Typography variant="h3" color={"#222222"} fontFamily={"Volkhov"}>
                  Sign Up for <span style={{ color: '#FA5252' }}>Updates</span> & Newsletter
              </Typography>
              <Box sx={{ position: 'relative', width: '100%', maxWidth: '500px', margin: 'auto' }}>
                  <TextField
                      fullWidth
                      value={email}
                      onChange={handleEmailChange}
                      sx={{ borderRadius: !matchesMobile ? 30 : 10 }}
                      variant="outlined"
                      placeholder="subscribe@flymile.pro"
                      InputProps={{
                          endAdornment: !matchesMobile ? (
                              <Button
                                  type="submit"
                                  onClick={handleSubmit}
                                  variant="contained"
                                  size="large"
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
                                      borderRadius: 30,
                                      position: 'absolute',
                                      right: 10,
                                      top: '50%',
                                      transform: 'translateY(-50%)',
                                      backgroundColor: '#FA5252',
                                      boxShadow: 'none',
                                      '&:hover': {
                                          backgroundColor: '#E84141',
                                      },
                                  }}
                              >
                                  Sign Up
                              </Button>
                          ) : null,
                          style: { borderRadius: !matchesMobile ? 30 : 10 }
                      }}
                  />
                  {matchesMobile && (
                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          size="large"
                          onClick={handleSubmit}
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
                              mt: 2,
                              borderRadius: 30,
                              backgroundColor: '#FA5252',
                              '&:hover': {
                                  backgroundColor: '#E84141',
                              },
                          }}
                      >
                          Sign Up
                      </Button>
                  )}
              </Box>
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
