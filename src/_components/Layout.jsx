import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { Container, LinearProgress } from "@mui/material";


export default function Layout({ children,errore,isCaricamento }) {


    return (<>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <Header />
        {errore &&
        <Container sx={{paddingTop: '40px'}}>
                            <Box sx={{ width: '100%' }}>
                                <Collapse in={open}>
                                    <Alert
                                        color='error'
                                        
                                    >
                                        {errore}                                    </Alert>
                                </Collapse>
                            </Box></Container>
                    }
        {isCaricamento && <LinearProgress />}            
        {children}
        <Footer />
        
    </>);

}