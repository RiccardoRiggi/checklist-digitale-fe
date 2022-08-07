import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { UtenteInterface } from '../../interfaces/UtenteInterface';
import { fetchIsLoadingAction, fetchTestoDangerAction, fetchTestoSuccessAction } from '../../modules/feedback/actions';
import utenteService from '../../services/UtenteService';

export default function ListaUtentiPage() {
    const dispatch = useDispatch();

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato.utente);
    const [utenteSelezionato, setUtenteSelezionato] = React.useState<UtenteInterface>();
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

    const eliminaUtente = async () => {
        let userDelete = { userDelete: utenteLoggato.nome + " " + utenteLoggato.cognome }
        dispatch(fetchIsLoadingAction(true));
        await utenteService.eliminaUtente(sessionStorage.getItem("token"),userDelete,utenteSelezionato?.identificativo).then(response => {
            setListaUtenti(response.data);
            dispatch(fetchTestoSuccessAction("Utente eliminato con successo!"));
            dispatch(fetchTestoDangerAction(""));
            dispatch(fetchIsLoadingAction(false));
            getListaUtenti();
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoSuccessAction(""));
            dispatch(fetchTestoDangerAction("Errore durante l'eliminazione dell'utente selezionato!"));
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
                                <th scope="col">Ruolo</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Cognome</th>
                                <th scope="col">Email</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                             Array.isArray(listaUtente) && listaUtente.map((utente: UtenteInterface, index: number) => <tr>
                                    <th key={index} scope="row">{utente.identificativo}</th>
                                    <td>{utente.tRuoloCodice}</td>
                                    <td>{utente.nome}</td>
                                    <td>{utente.cognome}</td>
                                    <td>{utente.email}</td>
                                    <td><Link className='btn btn-primary' to={"/scheda-utente/" + utente.identificativo}><i className="fas fa-user-edit"></i></Link></td>
                                    <td><span onClick={() => setUtenteSelezionato(utente)} data-toggle="modal" data-target="#exampleModal" className='btn btn-primary'><i className="fas fa-user-times"></i></span></td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Attenzione!</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Sei sicuro di voler eliminare l'utente {utenteSelezionato?.nome} {utenteSelezionato?.cognome}? L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Annulla</button>
                            <button type="button" onClick={eliminaUtente} data-dismiss="modal" className="btn btn-primary">Conferma</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

}


