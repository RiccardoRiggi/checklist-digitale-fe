import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }: any) {
    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);


    if (!isLoggedIn(utenteLoggato)) {
        return <Navigate to="/login" replace />;
    } else {
        return children;
    }
};



const isLoggedIn = (token: any) => {

    return token!=null;
}