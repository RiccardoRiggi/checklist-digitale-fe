import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {


    return (<>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <Header />
        {children}
        <Footer />
        
    </>);

}