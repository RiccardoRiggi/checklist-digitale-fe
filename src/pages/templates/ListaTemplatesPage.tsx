import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { TemplateInterface } from '../../interfaces/TemplateInterface';
import { VeicoloInterface } from '../../interfaces/VeicoloInterface';
import { fetchIsLoadingAction, fetchTestoDangerAction, fetchTestoSuccessAction } from '../../modules/feedback/actions';
import templateService from '../../services/TemplateService';
import veicoloService from '../../services/VeicoloService';

export default function ListaTemplatesPage() {
    const dispatch = useDispatch();

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato.utente);
    const [templateSelezionato, setTemplateSelezionato] = React.useState<TemplateInterface>();
    const [listaTemplates, setListaTemplates] = React.useState(Array<TemplateInterface>);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);

    const getListaTemplate = async () => {

        let listaTemplatesTmp: Array<TemplateInterface> = [];
        let listaVeicoliTmp: Array<VeicoloInterface> = [];

        dispatch(fetchIsLoadingAction(true));
        await templateService.listaTemplates(sessionStorage.getItem("token")).then(response => {
            listaTemplatesTmp = response.data;
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Errore durante la ricerca dei template!"));
            dispatch(fetchIsLoadingAction(false));
        });

        await veicoloService.listaVeicoli(sessionStorage.getItem("token")).then(response => {
            listaVeicoliTmp = response.data;
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Errore durante la ricerca dei veicoli!"));
            dispatch(fetchIsLoadingAction(false));
        });

        listaVeicoliTmp.forEach(function (veicolo) {
            listaTemplatesTmp.forEach(function (template) {
                if (template.veicoloIdentificativo == veicolo.identificativo) {
                    template.veicolo = veicolo;
                }
            });
        });
        setListaTemplates(listaTemplatesTmp);

    }

    const eliminaTemplate = async () => {
        let userDelete = { userDelete: utenteLoggato.nome + " " + utenteLoggato.cognome }
        dispatch(fetchIsLoadingAction(true));
        await templateService.eliminaRigaTemplate(sessionStorage.getItem("token"), userDelete, templateSelezionato?.identificativo).then(response => {
            dispatch(fetchTestoSuccessAction("Template eliminato con successo!"));
            dispatch(fetchTestoDangerAction(""));
            dispatch(fetchIsLoadingAction(false));
            getListaTemplate();
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoSuccessAction(""));
            dispatch(fetchTestoDangerAction("Errore durante l'eliminazione del template selezionato!"));
            dispatch(fetchIsLoadingAction(false));
        });
    }

    useEffect(() => {
        if (!ricercaEseguita) {
            getListaTemplate();
            setRicercaEseguita(true);
        }
    });

    return (
        <Layout>
            <h1><i className="fas fa-clipboard-list text-danger pr-3"></i>Lista Template</h1>
            <div className="card shadow mt-4 mb-4">
                <div
                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Template registrati nel sistema</h6>
                    <div className="dropdown no-arrow">
                        <Link className="btn btn-primary" to="/scheda-template" role="button" id="dropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className='pr-3'>Aggiungi template</span>
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
                                <th scope="col">Veicolo</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(listaTemplates) && listaTemplates.map((template: TemplateInterface, index: number) => <tr>
                                    <th key={index} scope="row">{template.identificativo}</th>
                                    <td>{template.nome}</td>
                                    <td>{template.veicolo?.selettiva} - {template.veicolo?.nome}</td>
                                    <td><Link className='btn btn-primary' to={"/scheda-template/" + template.identificativo}><i className="fas fa-edit"></i></Link></td>
                                    <td><span onClick={() => setTemplateSelezionato(template)} data-toggle="modal" data-target="#exampleModal" className='btn btn-primary'><i className="fas fa-times"></i></span></td>
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
                            Sei sicuro di voler eliminare il template {templateSelezionato?.nome} relativo al veicolo {templateSelezionato?.veicolo?.selettiva} - {templateSelezionato?.veicolo?.nome}? L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Annulla</button>
                            <button type="button" onClick={eliminaTemplate} data-dismiss="modal" className="btn btn-primary">Conferma</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

}


