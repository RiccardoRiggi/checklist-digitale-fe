import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { UtenteInterface } from '../../interfaces/UtenteInterface';
import { VeicoloInterface } from '../../interfaces/VeicoloInterface';
import { fetchIsLoadingAction, fetchTestoDangerAction, fetchTestoSuccessAction } from '../../modules/feedback/actions';
import utenteService from '../../services/UtenteService';
import veicoloService from '../../services/VeicoloService';

export default function ListaVeicoliChecklistPage() {
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
            <h1><i className="fas fa-clipboard-list text-danger pr-3"></i>Checklist</h1>
            <div className="card shadow mt-4 mb-4">
                <div
                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Seleziona un veicolo di riferimento</h6>
                    <div className="dropdown no-arrow">
            
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                             Array.isArray(listaVeicoli) && listaVeicoli.map((veicolo: VeicoloInterface, index: number) => <tr>
                                    <th key={index} scope="row">{veicolo.identificativo}</th>
                                    <td>{veicolo.nome}</td>
                                    <td>{veicolo.selettiva}</td>
                                    <td><Link className='btn btn-primary' to={"/checklists/" + veicolo.identificativo} state={veicolo}>Seleziona</Link></td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>

        </Layout>
    );

}


