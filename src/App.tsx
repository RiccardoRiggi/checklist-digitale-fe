import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import PrivateRoute from './components/PrivateRoute';
import ListaCkecklistPage from './pages/checklist/ListaChecklistPage';
import ListaVeicoliChecklistPage from './pages/checklist/ListaVeicoliChecklistPage';
import SchedaChecklistPage from './pages/checklist/SchedaChecklistPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ListaTemplatesPage from './pages/templates/ListaTemplatesPage';
import SchedaTemplatePage from './pages/templates/SchedaTemplatePage';
import ListaUtentiPage from './pages/utenti/ListaUtentiPage';
import SchedaUtentePage from './pages/utenti/SchedaUtentePage';
import ListaVeicoliPage from './pages/veicoli/ListaVeicoliPage';
import SchedaVeicoloPage from './pages/veicoli/SchedaVeicoloPage';



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

          <Route
            path="veicoli"
            element={
              <PrivateRoute>
                <ListaVeicoliPage />
              </PrivateRoute>
            }
          />

          <Route
            path="scheda-veicolo/:id"
            element={
              <PrivateRoute>
                <SchedaVeicoloPage />
              </PrivateRoute>
            }
          />
          <Route
            path="scheda-veicolo"
            element={
              <PrivateRoute>
                <SchedaVeicoloPage />
              </PrivateRoute>
            }
          />

          <Route
            path="templates"
            element={
              <PrivateRoute>
                <ListaTemplatesPage />
              </PrivateRoute>
            }
          />

          <Route
            path="scheda-template/:id"
            element={
              <PrivateRoute>
                <SchedaTemplatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="scheda-template"
            element={
              <PrivateRoute>
                <SchedaTemplatePage />
              </PrivateRoute>
            }
          />

          <Route
            path="checklists"
            element={
              <PrivateRoute>
                <ListaVeicoliChecklistPage />
              </PrivateRoute>
            }
          />
          <Route
            path="checklists/:id"
            element={
              <PrivateRoute>
                <ListaCkecklistPage />
              </PrivateRoute>
            }
          />

          <Route
            path="scheda-checklist"
            element={
              <PrivateRoute>
                <SchedaChecklistPage />
              </PrivateRoute>
            }
          />

          <Route
            path="scheda-checklist/:id"
            element={
              <PrivateRoute>
                <SchedaChecklistPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
