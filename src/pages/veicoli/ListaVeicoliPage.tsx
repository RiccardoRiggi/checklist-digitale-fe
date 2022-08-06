import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { VeicoloInterface } from '../../interfaces/VeicoloInterface';
import { fetchIsLoadingAction, fetchTestoDangerAction, fetchTestoSuccessAction } from '../../modules/feedback/actions';
import veicoloService from '../../services/VeicoloService';

export default function ListaVeicoliPage() {
    const dispatch = useDispatch();

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato.utente);
    const [veicoloSelezionato, setVeicoloSelezionato] = React.useState<VeicoloInterface>();
    const [listaVeicoli, setListaVeicoli] = React.useState(Array<VeicoloInterface>);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);

    const getListaVeicoli = async () => {
        dispatch(fetchIsLoadingAction(true));
        await veicoloService.listaVeicoli(sessionStorage.getItem("token")).then(response => {
            setListaVeicoli(response.data);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Errore durante la ricerca dei veicoli!"));
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const eliminaVeicolo = async () => {
        let userDelete = { userDelete: utenteLoggato.nome + " " + utenteLoggato.cognome }
        dispatch(fetchIsLoadingAction(true));
        await veicoloService.eliminaVeicolo(sessionStorage.getItem("token"),userDelete,veicoloSelezionato?.identificativo).then(response => {
            dispatch(fetchTestoSuccessAction("Veicolo eliminato con successo!"));
            dispatch(fetchTestoDangerAction(""));
            dispatch(fetchIsLoadingAction(false));
            getListaVeicoli();
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoSuccessAction(""));
            dispatch(fetchTestoDangerAction("Errore durante l'eliminazione del veicolo selezionato!"));
            dispatch(fetchIsLoadingAction(false));
        });
    }

    useEffect(() => {
        if (!ricercaEseguita) {
            getListaVeicoli();
            setRicercaEseguita(true);
        }
    });

    return (
        <Layout>
            <h1><i className="fas fa-ambulance text-danger pr-3"></i>Lista Veicoli</h1>
            <div className="card shadow mt-4 mb-4">
                <div
                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Veicoli registrati nel sistema</h6>
                    <div className="dropdown no-arrow">
                        <Link className="btn btn-primary" to="/scheda-veicolo" role="button" id="dropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className='pr-3'>Aggiungi veicolo</span>
                            <i className="fas fa-plus fa-sm fa-fw "></i>
                        </Link>

                    </div>
                </div>
                <div className="card-body">
                    <table className="table table-striped table-responsive-md">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Selettiva</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                             Array.isArray(listaVeicoli) && listaVeicoli.map((veicolo: VeicoloInterface, index: number) => <tr>
                                    <th key={index} scope="row">{veicolo.identificativo}</th>
                                    <td>{veicolo.nome}</td>
                                    <td>{veicolo.selettiva}</td>
                                    <td><Link className='btn btn-primary' to={"/scheda-veicolo/" + veicolo.identificativo}><i className="fas fa-edit"></i></Link></td>
                                    <td><span onClick={() => setVeicoloSelezionato(veicolo)} data-toggle="modal" data-target="#exampleModal" className='btn btn-primary'><i className="fas fa-times"></i></span></td>
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
                            Sei sicuro di voler eliminare il veicolo {veicoloSelezionato?.nome} con selettiva {veicoloSelezionato?.selettiva}? L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Annulla</button>
                            <button type="button" onClick={eliminaVeicolo} data-dismiss="modal" className="btn btn-primary">Conferma</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

}


