import { async } from 'q';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { boolean } from 'yargs';
import { UtenteInterface } from '../interfaces/UtenteInterface';
import utenteService from '../services/UtenteService';

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