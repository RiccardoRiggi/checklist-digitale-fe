import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { UtenteInterface } from '../../interfaces/UtenteInterface';
import { fetchIsLoadingAction, fetchTestoDangerAction } from '../../modules/feedback/actions';
import utenteService from '../../services/UtenteService';

export default function ListaUtentiPage() {
    const dispatch = useDispatch();

    const [listaUtente, setListaUtenti] = React.useState(Array<UtenteInterface>);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);

    const getListaUtenti = async () => {
        dispatch(fetchIsLoadingAction(true));
        await utenteService.listaUtenti(sessionStorage.getItem("token")).then(response => {
            setListaUtenti(response.data);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Errore durante la ricerca degli utente!"));
            dispatch(fetchIsLoadingAction(false));
        });
    }

    useEffect(() => {
        if (!ricercaEseguita) {
            getListaUtenti();
            setRicercaEseguita(true);
        }
    });

    return (
        <Layout>
            <h1><i className="fas fa-users text-danger pr-3"></i>Lista Utenti</h1>
            <div className="card shadow mt-4 mb-4">
                <div
                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Utenti registrati nel sistema</h6>
                    <div className="dropdown no-arrow">
                        <Link className="btn btn-primary" to="/scheda-utente" role="button" id="dropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className='pr-3'>Aggiungi utente</span>
                            <i className="fas fa-user-plus fa-sm fa-fw "></i>
                        </Link>

                    </div>
                </div>
                <div className="card-body">
                    <table className="table table-striped table-responsive-md">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Cognome</th>
                                <th scope="col">Email</th>
                                <th scope="col">Seleziona</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaUtente.map((utente: UtenteInterface, index: number) => <tr>
                                    <th key={index} scope="row">{utente.identificativo}</th>
                                    <td>{utente.nome}</td>
                                    <td>{utente.cognome}</td>
                                    <td>{utente.email}</td>
                                    <td><Link className='btn btn-primary' to={"/scheda-utente/" + utente.identificativo}>Seleziona</Link></td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );

}