import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Sidebar() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato.utente);
    const ruoloUtente = utenteLoggato.tRuoloCodice;
    /*
        RUOLI:
            A: AMMINISTRATORE
            U: UTENTE
    */

    const handleClickSidebar = () => {
        if (document.getElementsByTagName("body")[0].classList.contains("sidebar-toggled")) {
            document.getElementById("accordionSidebar")?.classList.remove("toggled");
            document.getElementsByTagName("body")[0].classList.remove("sidebar-toggled");
            document.getElementById("logo")?.classList.add("pl-md-3");
        } else {
            document.getElementById("accordionSidebar")?.classList.add("toggled");
            document.getElementsByTagName("body")[0].classList.add("sidebar-toggled");
            document.getElementById("logo")?.classList.remove("pl-md-3");
        }
    };



    return (
        <>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div id="logo" className="sidebar-brand-icon pl-md-3">
                        <i className="fas fa-clipboard-list"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">Checklist Digitale</div>
                </Link>

                <hr className="sidebar-divider my-0" />






                {ruoloUtente=="A" && <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtenti"
                        aria-expanded="true" aria-controls="collapseUtenti">
                        <i className="fas fa-fw fa-users"></i>
                        <span>Utenti</span>
                    </a>
                    <div id="collapseUtenti" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Opzioni disponibili:</h6>
                            <Link className="collapse-item" to="/scheda-utente">Aggiungi utente</Link>
                            <Link className="collapse-item" to="/utenti">Lista utenti</Link>
                        </div>
                    </div>
                </li>}

                {ruoloUtente=="A" && <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseVeicoli"
                        aria-expanded="true" aria-controls="collapseVeicoli">
                        <i className="fas fa-fw fa-ambulance"></i>
                        <span>Veicoli</span>
                    </a>
                    <div id="collapseVeicoli" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Opzioni disponibili:</h6>
                            <Link className="collapse-item" to="/scheda-veicolo">Aggiungi veicolo</Link>
                            <Link className="collapse-item" to="/veicoli">Lista veicoli</Link>
                        </div>
                    </div>
                </li>}

                {ruoloUtente=="A" && <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTemplate"
                        aria-expanded="true" aria-controls="collapseTemplate">
                        <i className="fas fa-fw fa-clipboard-list"></i>
                        <span>Template checklist</span>
                    </a>
                    <div id="collapseTemplate" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Opzioni disponibili:</h6>
                            <Link className="collapse-item" to="/scheda-template">Aggiungi template</Link>
                            <Link className="collapse-item" to="/templates">Lista template</Link>
                        </div>
                    </div>
                </li> }

          

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseChecklist"
                        aria-expanded="true" aria-controls="collapseChecklist">
                        <i className="fas fa-fw fa-clipboard-list"></i>
                        <span>Checklist</span>
                    </a>
                    <div id="collapseChecklist" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Opzioni disponibili:</h6>
                            <Link className="collapse-item" to="/checklists">Checklist</Link>
                        </div>
                    </div>
                </li>





                <hr className="sidebar-divider d-none d-md-block" />

                <div className="text-center d-none d-md-inline">
                    <button onClick={handleClickSidebar} className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>



            </ul>
        </>
    );

}