import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-calendar/dist/Calendar.css';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from '@mui/material';
import theme from './theme';
import {ClerkProvider} from "@clerk/clerk-react";
import {Analytics} from "@vercel/analytics/react";
import {SpeedInsights} from "@vercel/speed-insights/react";
import Hotjar from '@hotjar/browser';
import posthog from 'posthog-js'
import {PostHogProvider} from 'posthog-js/react'

const siteId = 5041315;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

if (typeof window !== 'undefined') {
    posthog.init('phc_8700OM5shGMBOULOAkeMvlkxdSBPMyyeApZ8Knvt9AH', {
        api_host: 'https://us.i.posthog.com',
        person_profiles: 'always',
        loaded: (posthog) => {
            if (process.env.NODE_ENV === 'development') posthog.debug() // debug mode in development
        },
    })
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <PostHogProvider client={posthog}>
                <BrowserRouter>
                    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
                        <App/>
                    </ClerkProvider>
                </BrowserRouter>
            </PostHogProvider>
            <Analytics/>
            <SpeedInsights/>
        </ThemeProvider>
    </React.StrictMode>
);
