import {Box, Container} from "@mui/material";
import {ReactNode} from "react";
import DrawerAppBar from "../drawerAppBar/DrawerAppBar";
import {Footer} from "../Footer/Footer";
import {ContactUs} from "../contactus/ContactUs";
import { NewsLetter } from "../newsletter/NewsLetter";
import {useLocation} from "react-router-dom";
import Banner from "../common/Banner";

export interface ILayoutProps {
    children: ReactNode;
}

export function Layout(props: ILayoutProps) {
    const {children} = props;
    const location = useLocation();

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                gap: 10,
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }}
            >
                <DrawerAppBar/>
                <Banner/>
                <Box flex={1} mt={"80px"}>
                    {children}
                </Box>
            </Container>
            {location.pathname === "/" &&
                (<>
                    <ContactUs/>
                    <NewsLetter/>
                </>)
            }
            <Footer/>
        </Box>
    );
}
