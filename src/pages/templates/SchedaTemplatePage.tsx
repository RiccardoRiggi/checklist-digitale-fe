import React, { ChangeEventHandler, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { fetchIsLoadingAction, fetchMantieniMessaggiAction, fetchTestoDangerAction, fetchTestoSuccessAction } from '../../modules/feedback/actions';
import { VeicoloInterface } from '../../interfaces/VeicoloInterface';
import veicoloService from '../../services/VeicoloService';
import SchedaVeicoloValidator from '../../validators/SchedaVeicoloValidator';
import { TemplateInterface } from '../../interfaces/TemplateInterface';
import templateService from '../../services/TemplateService';

import Select from 'react-select'
import SchedaTemplateValidator from '../../validators/SchedaTemplateValidator';
import { RigaTemplateInterface } from '../../interfaces/RigaTemplateInterface';
import SchedaRigaTemplateValidator from '../../validators/SchedaRigaTemplateValidator';


export default function SchedaTemplatePage() {
    const dispatch = useDispatch();
    let params = useParams();
    const utenteLoggato = useSelector((state: any) => state.utenteLoggato.utente);
    const [template, setTemplate] = React.useState<TemplateInterface>();

    const [templateRiga, setTemplateRiga] = React.useState<RigaTemplateInterface>();

    const [rigaTemplateSelezionato, setRigaTemplateSelezionato] = React.useState<RigaTemplateInterface>();


    const [veicolo, setVeicolo] = React.useState({
        selectedOption: '',
        clearable: true,
        veicoli: [],
        value: ""
    });

    const [listaVeicoli, setListaVeicoli] = React.useState([]);

    const [formErrors, setFormErrors] = React.useState(Object);
    const [formErrorsRiga, setFormErrorsRiga] = React.useState(Object);
    const [isInserimento, setIsInserimento] = React.useState(params.id == null);

    const [isInserimentoRiga, setIsInserimentoRiga] = React.useState(false);

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    let navigate = useNavigate();


    const [listaRigaTemplate, setListaRigaTemplate] = React.useState(Array<RigaTemplateInterface>);

    const getRigheTemplate = async () => {
        await templateService.listaRigaTemplates(sessionStorage.getItem("token"), params.id).then(response => {
            setListaRigaTemplate(response.data);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Errore durante la ricerca delle righe template!"));
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const getTemplate = async () => {
        dispatch(fetchIsLoadingAction(true));

        let veicoloIdentificativo: any;

        await templateService.getTemplate(sessionStorage.getItem("token"), params.id).then(response => {
            setTemplate(response.data);
            veicoloIdentificativo = response.data.veicoloIdentificativo;
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Errore durante la ricerca del template!"));
            dispatch(fetchIsLoadingAction(false));
        });

        await veicoloService.listaVeicoli(sessionStorage.getItem("token")).then(response => {
            let opzioniBenMesse: any = [];
            response.data.map(function (opzione: any) {
                let opzioneBenMessa = {
                    "value": opzione.identificativo,
                    "label": opzione.selettiva + " - " + opzione.nome
                };
                opzioniBenMesse.push(opzioneBenMessa);
            });
            setListaVeicoli(opzioniBenMesse);
            opzioniBenMesse.map(function (opzione: any) {
                if (veicoloIdentificativo == opzione.value) {
                    setVeicolo(opzione);
                }
            })
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Errore durante la ricerca dei veicoli!"));
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const getListaVeicoli = async () => {
        dispatch(fetchIsLoadingAction(true));
        await veicoloService.listaVeicoli(sessionStorage.getItem("token")).then(response => {
            let opzioniBenMesse: any = [];
            response.data.map(function (opzione: any) {
                let opzioneBenMessa = {
                    "value": opzione.identificativo,
                    "label": opzione.selettiva + " - " + opzione.nome
                };
                opzioniBenMesse.push(opzioneBenMessa);
            });
            setListaVeicoli(opzioniBenMesse);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Errore durante la ricerca dei veicoli!"));
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const aggiornaVeicolo = (selectedOption: any) => {
        setVeicolo(selectedOption);
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputName = e.currentTarget.name;
        let inputValue = e.currentTarget.value;
        console.log(template);
        let oggettoVeicoloOggeto: any = {};
        if (template != undefined) {
            let oggettoVeicoloStringa = JSON.stringify(template);
            oggettoVeicoloOggeto = JSON.parse(oggettoVeicoloStringa);
        }
        oggettoVeicoloOggeto[inputName] = inputValue;

        setTemplate(oggettoVeicoloOggeto as TemplateInterface);
    }

    const handleOnChangeRiga = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputName = e.currentTarget.name;
        let inputValue = e.currentTarget.value;
        console.log(templateRiga);
        let oggettoVeicoloOggeto: any = {};
        if (templateRiga != undefined) {
            let oggettoVeicoloStringa = JSON.stringify(templateRiga);
            oggettoVeicoloOggeto = JSON.parse(oggettoVeicoloStringa);
        }
        oggettoVeicoloOggeto[inputName] = inputValue;

        setTemplateRiga(oggettoVeicoloOggeto as RigaTemplateInterface);
    }

    const submitForm = async () => {
        let templateTmp: any = {};
        if (template != undefined) {
            templateTmp = JSON.parse(JSON.stringify(template));
        }

        templateTmp.veicoloIdentificativo = veicolo.value;
        let formsErrorTmp = SchedaTemplateValidator(templateTmp!, params.id);
        setFormErrors(formsErrorTmp);
        if (Object.keys(formsErrorTmp).length == 0) {
            if (isInserimento) {
                templateTmp.userInsert = utenteLoggato.nome + " " + utenteLoggato.cognome;
                setTemplate(templateTmp as TemplateInterface);
                dispatch(fetchIsLoadingAction(true));
                await templateService.inserisciTemplate(sessionStorage.getItem("token"), templateTmp).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    dispatch(fetchTestoSuccessAction("Template registrato con successo!"));
                    dispatch(fetchMantieniMessaggiAction(true));
                    navigate("/templates");
                }).catch(e => {
                    console.error(e);
                    dispatch(fetchTestoDangerAction("Errore durante il salvataggio!"));
                    dispatch(fetchIsLoadingAction(false));
                });
            } else {
                templateTmp.userUpdate = utenteLoggato.nome + " " + utenteLoggato.cognome;
                templateTmp.identificativo = undefined;
                setTemplate(templateTmp as TemplateInterface);
                dispatch(fetchIsLoadingAction(true));
                await templateService.modificaTemplate(sessionStorage.getItem("token"), templateTmp, params.id).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    dispatch(fetchTestoSuccessAction("Template aggiornato con successo!"));
                    setTemplate(response.data);
                }).catch(e => {
                    console.error(e);
                    dispatch(fetchTestoDangerAction("Errore durante il salvataggio!"));
                    dispatch(fetchIsLoadingAction(false));
                });
            }

        }
    }

    const submitFormRiga = async () => {
        let templateRigaTmp: any = {};
        if (templateRiga != undefined) {
            templateRigaTmp = JSON.parse(JSON.stringify(templateRiga));
        }

        templateRigaTmp.checklistTemplateIdentificativo = params.id;
        let formsErrorTmp = SchedaRigaTemplateValidator(templateRigaTmp!);
        setFormErrorsRiga(formsErrorTmp);
        if (Object.keys(formsErrorTmp).length == 0) {
            templateRigaTmp.userInsert = utenteLoggato.nome + " " + utenteLoggato.cognome;
            setTemplateRiga(templateRigaTmp as RigaTemplateInterface);
            dispatch(fetchIsLoadingAction(true));
            await templateService.inserisciRigaTemplate(sessionStorage.getItem("token"), templateRigaTmp).then(response => {
                dispatch(fetchIsLoadingAction(false));
                dispatch(fetchTestoSuccessAction("Riga registrata con successo!"));
                dispatch(fetchMantieniMessaggiAction(true));
                getRigheTemplate();
                setTemplateRiga({} as RigaTemplateInterface);
                setIsInserimentoRiga(false);
            }).catch(e => {
                console.error(e);
                dispatch(fetchTestoDangerAction("Errore durante il salvataggio!"));
                dispatch(fetchIsLoadingAction(false));
            });

        }
    }


    const eliminaRigaTemplate = async () => {
        let userDelete = { userDelete: utenteLoggato.nome + " " + utenteLoggato.cognome }
        dispatch(fetchIsLoadingAction(true));
        await templateService.eliminaRigaTemplate(sessionStorage.getItem("token"), userDelete, rigaTemplateSelezionato?.identificativo).then(response => {
            dispatch(fetchTestoSuccessAction("Riga eliminata con successo!"));
            dispatch(fetchTestoDangerAction(""));
            dispatch(fetchIsLoadingAction(false));
            getRigheTemplate();
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoSuccessAction(""));
            dispatch(fetchTestoDangerAction("Errore durante l'eliminazione della riga template selezionata!"));
            dispatch(fetchIsLoadingAction(false));
        });
    }

    useEffect(() => {
        if (!ricercaEseguita && isInserimento) {
            getListaVeicoli();
            setRicercaEseguita(true);
        } else if (!ricercaEseguita && !isInserimento) {
            getTemplate();
            setRicercaEseguita(true);
            getRigheTemplate();
        }
    });

    return (
        <Layout>
            <h1><i className="fas fa-clipboard-list text-danger pr-3"></i>{isInserimento ? "Aggiungi" : "Modifica"} Template</h1>
            <div className="card shadow mt-4 mb-4">
                <div
                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Inserisci le informazioni necessarie</h6>
                    <div className="dropdown no-arrow">
                        <button onClick={submitForm} className="btn btn-primary"
                        ><span className='pr-3'>{isInserimento ? "Registra template" : "Salva modifiche"}</span>
                            <i className="fas fa-save fa-sm fa-fw "></i>
                        </button>

                    </div>
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-6'>
                            <div className="form-group">
                                <label>Nome</label>
                                <input type="text" className="form-control" placeholder="" name="nome" value={template?.nome} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(event)} />
                                <small className="form-text text-danger">{formErrors.nome}</small>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <label>Veicolo</label>
                                <Select
                                    name="form-field-name"
                                    value={veicolo}
                                    onChange={aggiornaVeicolo}
                                    isClearable={true}
                                    isSearchable={true}
                                    options={listaVeicoli}
                                    isLoading={false}
                                />
                                <small className="form-text text-danger">{formErrors.veicoloIdentificativo}</small>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {isInserimentoRiga && <div className="card shadow mt-4 mb-4">
                <div
                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Inserisci una nuova riga</h6>
                    <div className="dropdown no-arrow">
                        <button onClick={submitFormRiga} className="btn btn-primary"
                        ><span className='pr-3'>Salva</span>
                            <i className="fas fa-save fa-sm fa-fw "></i>
                        </button>

                    </div>
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-4'>
                            <div className="form-group">
                                <label>Nome</label>
                                <input type="text" className="form-control" placeholder="" name="nome" value={templateRiga?.nome} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChangeRiga(event)} />
                                <small className="form-text text-danger">{formErrorsRiga.nome}</small>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="form-group">
                                <label>Descrizione</label>
                                <input type="text" className="form-control" placeholder="" name="descrizione" value={templateRiga?.descrizione} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChangeRiga(event)} />
                                <small className="form-text text-danger">{formErrorsRiga.descrizione}</small>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="form-group">
                                <label>Quantità</label>
                                <input type="number" className="form-control" placeholder="" name="quantita" value={templateRiga?.quantita} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChangeRiga(event)} />
                                <small className="form-text text-danger">{formErrorsRiga.quantita}</small>
                            </div>
                        </div>


                    </div>
                </div>
            </div>}

            {!isInserimento && <div className="card shadow mt-4 mb-4">
                <div
                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Elementi della checklist</h6>
                    <div className="dropdown no-arrow">
                        <button onClick={() => setIsInserimentoRiga(true)} className="btn btn-primary"
                        ><span className='pr-3'>Aggiungi elemento</span>
                            <i className="fas fa-plus fa-sm fa-fw "></i>
                        </button>

                    </div>
                </div>
                <div className="card-body">
                    <table className="table table-striped table-responsive-md">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Descrizione</th>
                                <th scope="col">Quantità</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(listaRigaTemplate) && listaRigaTemplate.map((riga: RigaTemplateInterface, index: number) => <tr>
                                    <th key={index} scope="row">{riga.identificativo}</th>
                                    <td>{riga.nome}</td>
                                    <td>{riga.descrizione}</td>
                                    <td>{riga.quantita}</td>
                                    <td><span onClick={() => setRigaTemplateSelezionato(riga)} data-toggle="modal" data-target="#exampleModal" className='btn btn-primary'><i className="fas fa-times"></i></span></td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>}

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
                            Sei sicuro di voler eliminare {rigaTemplateSelezionato?.nome}? L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Annulla</button>
                            <button type="button" onClick={eliminaRigaTemplate} data-dismiss="modal" className="btn btn-primary">Conferma</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

}