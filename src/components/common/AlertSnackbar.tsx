import React from 'react';
import {Snackbar, Typography} from '@mui/material';
import MuiAlert from "@mui/material/Alert";

interface AlertSnackbarProps {
    open: boolean;
    message: string;
    handleClose: () => void;
    duration?: number;
    severity?: 'error' | 'warning' | 'info' | 'success';
}

const AlertSnackbar: React.FC<AlertSnackbarProps> =
    ({
         open,
         message,
         handleClose,
         duration = 6000,
         severity = 'error'
     }) => {
        return (
            <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
                    <Typography variant="body1" sx={{fontFamily: 'Roboto'}}>
                        {message}
                    </Typography>
                </MuiAlert>
            </Snackbar>
        );
    };

export default AlertSnackbar;
