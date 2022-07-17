import { async } from 'q';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import utenteService from '../services/UtenteService';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children, testoSuccess, testoWarn, testoDanger }: any) {

    document.getElementsByTagName("body")[0].classList.remove("bg-gradient-danger");
    let navigate = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        document.getElementsByTagName("div")[document.getElementsByTagName("div").length-1].remove();
        document.getElementsByTagName("body")[0].classList.remove("modal-open");
        navigate("/login");
    }

    const verificaAutenticazione = async () => {
        await utenteService.isAutenticato().then(response => {
            sessionStorage.setItem("identificativo", response.data.identificativo.toString());
            sessionStorage.setItem("nome", response.data.nome);
            sessionStorage.setItem("cognome", response.data.cognome);
            sessionStorage.setItem("dataDiNascita", response.data.dataDiNascita);
            sessionStorage.setItem("email", response.data.email);
            sessionStorage.setItem("ruolo", response.data.tRuoloCodice);
        }).catch(e => {
            console.error(e);
            navigate("/login");
        });
    }

    verificaAutenticazione();

    return (
        <>
            <div id="wrapper">

                <Sidebar />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <Header />

                        <div className="container-fluid">
                            {testoDanger && <div className="alert alert-danger" role="alert">{testoDanger}</div>}
                            {children}
                        </div>

                    </div>

                    <Footer />

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            <div className="modal fade" id="logoutModal" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button className="btn btn-primary" onClick={logout} >Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}