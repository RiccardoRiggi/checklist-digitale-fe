import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ListaUtentiPage from './pages/utenti/ListaUtentiPage';
import SchedaUtentePage from './pages/utenti/SchedaUtentePage';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />

          <Route
            path="utenti"
            element={
              <PrivateRoute>
                <ListaUtentiPage />
              </PrivateRoute>
            }
          />
          <Route
            path="scheda-utente/:id"
            element={
              <PrivateRoute>
                <SchedaUtentePage />
              </PrivateRoute>
            }
          />
          <Route
            path="scheda-utente"
            element={
              <PrivateRoute>
                <SchedaUtentePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
