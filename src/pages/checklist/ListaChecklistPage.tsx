import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { getData } from '../../DateUtil';
import { ChecklistInterface } from '../../interfaces/ChecklistInterface';
import { fetchIsLoadingAction, fetchTestoDangerAction, fetchTestoSuccessAction } from '../../modules/feedback/actions';
import checklistService from '../../services/ChecklistService';

export default function ListaCkecklistPage() {
    const dispatch = useDispatch();
    const params = useParams();
    const utenteLoggato = useSelector((state: any) => state.utenteLoggato.utente);
    const [checklistSelezionata, setChecklistSelezionata] = React.useState<ChecklistInterface>();
    const [listaChecklistDaCompletare, setListaChecklistDaCompletare] = React.useState(Array<ChecklistInterface>);
    const [listaChecklistCompletate, setListaChecklistCompletate] = React.useState(Array<ChecklistInterface>);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    let location = useLocation();
    let veicolo: any = location.state;

    const getListaChecklistDaCompletare = async () => {
        dispatch(fetchIsLoadingAction(true));
        await checklistService.listaChecklistDaCompletarePerVeicolo(sessionStorage.getItem("token"), params.id).then(response => {
            setListaChecklistDaCompletare(response.data);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Errore durante la ricerca delle checklist da completare!"));
            dispatch(fetchIsLoadingAction(false));
        });
        dispatch(fetchIsLoadingAction(true));
        await checklistService.listaChecklistCompletatePerVeicolo(sessionStorage.getItem("token"), params.id).then(response => {
            setListaChecklistCompletate(response.data);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Errore durante la ricerca delle checklist completate!"));
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const eliminaChecklist = async () => {
        let userDelete = { userDelete: utenteLoggato.nome + " " + utenteLoggato.cognome }
        dispatch(fetchIsLoadingAction(true));
        await checklistService.eliminaChecklist(sessionStorage.getItem("token"), userDelete, checklistSelezionata?.identificativo).then(response => {
            dispatch(fetchTestoSuccessAction("Checklist eliminata con successo!"));
            dispatch(fetchTestoDangerAction(""));
            dispatch(fetchIsLoadingAction(false));
            getListaChecklistDaCompletare();
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoSuccessAction(""));
            dispatch(fetchTestoDangerAction("Errore durante l'eliminazione della checklist selezionata!"));
            dispatch(fetchIsLoadingAction(false));
        });
    }

    useEffect(() => {
        if (!ricercaEseguita) {
            getListaChecklistDaCompletare();
            setRicercaEseguita(true);
        }
    });

    return (
        <Layout>
            <h1 className='pb-3'><i className="fas fa-clipboard-list text-danger pr-3"></i>Checklist</h1>

            <div className="card shadow mt-4 mb-4">
                <div
                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Checklist registrate nel sistema per il veicolo {veicolo.selettiva} - {veicolo.nome}</h6>
                    <div className="dropdown no-arrow">
                        <Link className="btn btn-primary" to="/scheda-checklist" state={veicolo} role="button" id="dropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className='pr-3'>Compila nuova checklist</span>
                            <i className="fas fa-plus fa-sm fa-fw "></i>
                        </Link>

                    </div>
                </div>
                <div className="card-body">
                    <ul className="nav nav-pills mb-3 bg-white border-bottom" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Checklist non ancora completate</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Checklist completate</a>
                        </li>

                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            <table className="table table-striped table-responsive-md">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Data</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Note</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Array.isArray(listaChecklistDaCompletare) && listaChecklistDaCompletare.map((checklist: ChecklistInterface, index: number) => <tr>
                                            <th key={index} scope="row">{checklist.identificativo}</th>
                                            <td>{getData(checklist.dateInsert)}</td>
                                            <td>{checklist.nome}</td>
                                            <td>{checklist.note}</td>
                                            <td><Link className='btn btn-primary' to={"/scheda-checklist/" + checklist.identificativo} state={veicolo}><i className="fas fa-edit"></i></Link></td>
                                            <td><span onClick={() => setChecklistSelezionata(checklist)} data-toggle="modal" data-target="#exampleModal" className='btn btn-primary'><i className="fas fa-times"></i></span></td>
                                        </tr>)}
                                </tbody>
                            </table>
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <table className="table table-striped table-responsive-md">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Data</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Note</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Array.isArray(listaChecklistCompletate) && listaChecklistCompletate.map((checklist: ChecklistInterface, index: number) => <tr>
                                            <th key={index} scope="row">{checklist.identificativo}</th>
                                            <td>{getData(checklist.dateInsert)}</td>
                                            <td>{checklist.nome}</td>
                                            <td>{checklist.note}</td>
                                            <td><Link className='btn btn-primary' to={"/scheda-checklist/" + checklist.identificativo}><i className="fas fa-eye"></i></Link></td>
                                        </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
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
                            Sei sicuro di voler eliminare la checklist {checklistSelezionata?.nome}? L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Annulla</button>
                            <button type="button" onClick={eliminaChecklist} data-dismiss="modal" className="btn btn-primary">Conferma</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

}


