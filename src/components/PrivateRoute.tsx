import { async } from 'q';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { boolean } from 'yargs';
import { UtenteInterface } from '../interfaces/UtenteInterface';
import utenteService from '../services/UtenteService';

export default function PrivateRoute({ children }: any) {



    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    } else {
        return children;
    }
};



const isLoggedIn = () => {
    return sessionStorage.getItem("token")!=null;
}