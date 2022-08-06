import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
import { ChecklistInterface } from '../../interfaces/ChecklistInterface';
import checklistService from '../../services/ChecklistService';
import { RigaChecklistInterface } from '../../interfaces/RigaChecklistInterface';
import SchedaChecklistValidator from '../../validators/SchedaChecklistValidator';
import { getData, getOra } from '../../DateUtil';


export default function SchedaChecklistPage() {
    const dispatch = useDispatch();
    let params = useParams();
    let location = useLocation();
    let veicolo: any = location.state;


    const utenteLoggato = useSelector((state: any) => state.utenteLoggato.utente);
    const [checklist, setChecklist] = React.useState<ChecklistInterface>();

    const [templateRiga, setTemplateRiga] = React.useState<RigaTemplateInterface>();



    const [template, setTemplate] = React.useState({
        selectedOption: '',
        clearable: true,
        template: [],
        value: ""
    });

    const [listaTemplate, setListaTemplate] = React.useState([]);

    const [formErrors, setFormErrors] = React.useState(Object);
    const [formErrorsRiga, setFormErrorsRiga] = React.useState(Object);
    const [isInserimento, setIsInserimento] = React.useState(params.id == null);

    const [confermabile, setConfermabile] = React.useState(false);

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    let navigate = useNavigate();


    const [listaRigheChecklist, setListaRigheChecklist] = React.useState(Array<RigaChecklistInterface>);

    const getRigheChecklist = async () => {
        await checklistService.listaRigheChecklist(sessionStorage.getItem("token"), params.id).then(response => {
            setListaRigheChecklist(response.data);
            dispatch(fetchIsLoadingAction(false));
            let confermabile = true;
            response.data.map(function (riga: any) {
                if (!riga.isConfermato) {
                    confermabile = false;
                }
            })
            setConfermabile(confermabile);
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Errore durante la ricerca delle righe!"));
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const getChecklist = async () => {
        dispatch(fetchIsLoadingAction(true));

        let templateIdentificativo: any;

        await checklistService.getChecklist(sessionStorage.getItem("token"), params.id).then(response => {
            setChecklist(response.data);
            console.error(response.data);
            templateIdentificativo = response.data.checklistTemplateIdentificativo;
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Errore durante la ricerca della checklist!"));
            dispatch(fetchIsLoadingAction(false));
        });


    }

    const getListaTemplate = async () => {
        dispatch(fetchIsLoadingAction(true));
        await templateService.listaTemplates(sessionStorage.getItem("token")).then(response => {
            let opzioniBenMesse: any = [];
            response.data.map(function (opzione: any) {
                let opzioneBenMessa = {
                    "value": opzione.identificativo,
                    "label": opzione.nome
                };
                if (opzione.veicoloIdentificativo == veicolo.identificativo) {
                    opzioniBenMesse.push(opzioneBenMessa);
                }

            });
            setListaTemplate(opzioniBenMesse);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Errore durante la ricerca dei template!"));
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const aggiornaTemplate = (selectedOption: any) => {
        setTemplate(selectedOption);
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputName = e.currentTarget.name;
        let inputValue = e.currentTarget.value;
        console.log(checklist);
        let oggettoVeicoloOggeto: any = {};
        if (checklist != undefined) {
            let oggettoVeicoloStringa = JSON.stringify(checklist);
            oggettoVeicoloOggeto = JSON.parse(oggettoVeicoloStringa);
        }
        oggettoVeicoloOggeto[inputName] = inputValue;

        setChecklist(oggettoVeicoloOggeto as ChecklistInterface);
    }



    const submitForm = async () => {
        let checklistTmp: any = {};
        if (checklist != undefined) {
            checklistTmp = JSON.parse(JSON.stringify(checklist));
        }

        checklistTmp.checklistTemplateIdentificativo = template.value;
        checklistTmp.veicoloIdentificativo = veicolo.identificativo;
        let formsErrorTmp = SchedaChecklistValidator(checklistTmp!, params.id);
        setFormErrors(formsErrorTmp);
        if (Object.keys(formsErrorTmp).length == 0) {
            if (isInserimento) {
                checklistTmp.userInsert = utenteLoggato.nome + " " + utenteLoggato.cognome;
                setChecklist(checklistTmp as ChecklistInterface);
                dispatch(fetchIsLoadingAction(true));
                await checklistService.inserisciChecklist(sessionStorage.getItem("token"), checklistTmp).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    dispatch(fetchTestoSuccessAction("Checklist registrata con successo!"));
                    dispatch(fetchMantieniMessaggiAction(true));
                    let option = { state: veicolo }
                    navigate("/checklists/" + veicolo.identificativo, option);
                }).catch(e => {
                    console.error(e);
                    dispatch(fetchTestoDangerAction("Errore durante il salvataggio!"));
                    dispatch(fetchIsLoadingAction(false));
                });
            } else {
                checklistTmp.userUpdate = utenteLoggato.nome + " " + utenteLoggato.cognome;
                checklistTmp.identificativo = undefined;
                setChecklist(checklistTmp as ChecklistInterface);
                dispatch(fetchIsLoadingAction(true));
                await checklistService.modificaChecklist(sessionStorage.getItem("token"), checklistTmp, params.id).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    dispatch(fetchTestoSuccessAction("Checklist aggiornata con successo!"));
                    setChecklist(response.data);
                }).catch(e => {
                    console.error(e);
                    dispatch(fetchTestoDangerAction("Errore durante il salvataggio!"));
                    dispatch(fetchIsLoadingAction(false));
                });
            }

        }
    }

    const confermaForm = async () => {
        let checklistTmp: any = {};
        if (checklist != undefined) {
            checklistTmp = JSON.parse(JSON.stringify(checklist));
        }

        checklistTmp.checklistTemplateIdentificativo = template.value;
        checklistTmp.veicoloIdentificativo = veicolo.identificativo;
        let formsErrorTmp = SchedaChecklistValidator(checklistTmp!, params.id);
        setFormErrors(formsErrorTmp);
        if (Object.keys(formsErrorTmp).length == 0) {
            checklistTmp.userUpdate = utenteLoggato.nome + " " + utenteLoggato.cognome;
            checklistTmp.identificativo = undefined;
            setChecklist(checklistTmp as ChecklistInterface);
            dispatch(fetchIsLoadingAction(true));
            await checklistService.modificaChecklist(sessionStorage.getItem("token"), checklistTmp, params.id).then(response => {
                dispatch(fetchIsLoadingAction(false));
            }).catch(e => {
                console.error(e);
                dispatch(fetchTestoDangerAction("Errore durante il salvataggio!"));
                dispatch(fetchIsLoadingAction(false));
            });
            checklistTmp.userUpdate = utenteLoggato.nome + " " + utenteLoggato.cognome;
            checklistTmp.isCompletato = true
            await checklistService.confermaChecklist(sessionStorage.getItem("token"), checklistTmp, params.id).then(response => {
                dispatch(fetchIsLoadingAction(false));
                dispatch(fetchTestoSuccessAction("Checklist confermata con successo!"));
                setChecklist(response.data);
            }).catch(e => {
                console.error(e);
                dispatch(fetchTestoDangerAction("Errore durante la conferma!"));
                dispatch(fetchIsLoadingAction(false));
            });


        }
    }


    const confermaRiga = async (riga: RigaChecklistInterface) => {
        if (riga.isConfermato) {
            return;
        }
        let templateRigaTmp: any = {};
        templateRigaTmp.isConfermato = !riga.isConfermato;
        templateRigaTmp.note = (document.getElementById("note" + riga.identificativo) as HTMLInputElement)?.value;
        if(templateRigaTmp.note==""){
            templateRigaTmp.note="OK";
        }
        templateRigaTmp.userUpdate = utenteLoggato.nome + " " + utenteLoggato.cognome;
        templateRigaTmp.checklistIdentificativo = riga.checklistIdentificativo;
        templateRigaTmp.identificativo = undefined;
        console.error(templateRigaTmp)

        await checklistService.aggiornaRigaChecklist(sessionStorage.getItem("token"), templateRigaTmp, riga.identificativo).then(response => {
            getRigheChecklist();
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Errore durante il salvataggio!"));
        });
    }

    useEffect(() => {
        if (!ricercaEseguita && isInserimento) {
            getListaTemplate();
            setRicercaEseguita(true);
        } else if (!ricercaEseguita && !isInserimento) {
            getChecklist();
            getRigheChecklist();
            setRicercaEseguita(true);
        }
    });

    return (
        <Layout>
            <h1><i className="fas fa-clipboard-list text-danger pr-3"></i>{isInserimento ? "Aggiungi" : (checklist?.isCompletato ? 'Consulta' : 'Compila')} Checklist</h1>
            <div className="card shadow mt-4 mb-4">
                <div
                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">{checklist?.isCompletato ? 'Consulta le informazioni inserire' : 'Inserisci le informazioni necessarie'}</h6>
                    <div className="dropdown no-arrow">
                        {!checklist?.isCompletato && confermabile && <button onClick={confermaForm} className="btn btn-outline-primary mr-3"
                        ><span className='pr-3'>Conferma checklist</span>
                            <i className="fas fa-lock fa-sm fa-fw "></i>
                        </button>}
                        {!checklist?.isCompletato && <button onClick={submitForm} className="btn btn-primary"
                        ><span className='pr-3'>{isInserimento ? "Registra template" : "Salva modifiche"}</span>
                            <i className="fas fa-save fa-sm fa-fw "></i>
                        </button>}

                    </div>
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className={isInserimento ? 'col-4' : 'col-6'}>
                            <div className="form-group">
                                <label>Nome</label>
                                <input type="text" className={"form-control"} disabled={checklist?.isCompletato} placeholder="" name="nome" value={checklist?.nome} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(event)} />
                                <small className="form-text text-danger">{formErrors.nome}</small>
                            </div>
                        </div>
                        <div className={isInserimento ? 'col-4' : 'col-6'}>
                            <div className="form-group">
                                <label>Note</label>
                                <input type="text" className="form-control" disabled={checklist?.isCompletato} placeholder="" name="note" value={checklist?.note} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(event)} />
                                <small className="form-text text-danger">{formErrors.note}</small>
                            </div>
                        </div>
                        {isInserimento && <div className='col-4'>
                            <div className="form-group">
                                <label>Template</label>
                                <Select
                                    name="form-field-name"
                                    value={template}
                                    onChange={aggiornaTemplate}
                                    isClearable={true}
                                    isSearchable={true}
                                    options={listaTemplate}
                                    isLoading={false}
                                />
                                <small className="form-text text-danger">{formErrors.checklistTemplateIdentificativo}</small>
                            </div>
                        </div>}
                        <div className='col-12'>
                            <small>{checklist?.isCompletato && 'Inviata da ' + checklist.userUpdate + ' il giorno ' + getData(checklist.dateUpdate) + ' alle ore ' + getOra(checklist.dateUpdate)}</small>
                        </div>

                    </div>
                </div>
            </div>



            {!isInserimento && <div className="card shadow mt-4 mb-4">
                <div
                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Elementi della checklist</h6>
                    <div className="dropdown no-arrow">

                    </div>
                </div>
                <div className="card-body">
                    <table className="table table-striped table-responsive-md">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Descrizione</th>
                                <th scope="col">Quantità</th>
                                <th scope="col">Note</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(listaRigheChecklist) && listaRigheChecklist.map((riga: RigaChecklistInterface, index: number) => <tr>
                                    <td key={index}>{riga.nome}</td>
                                    <td>{riga.descrizione}</td>
                                    <td>{riga.quantitaRiferimento}</td>
                                    <td><input type='text' disabled={riga.isConfermato} className='form-control' id={'note' + riga.identificativo} value={riga.note} /></td>
                                    <td><span title={riga.isConfermato ? "Confermato da "+riga.userUpdate + " il "+ getData(riga.dateUpdate)+" alle ore "+ getOra(riga.dateUpdate): ""}  onClick={() => confermaRiga(riga)} className={riga.isConfermato ? 'btn btn-primary disabled' : 'btn btn-primary '}><i className={riga.isConfermato ? "fas fa-lock" : "fas fa-check"} ></i></span></td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>}


        </Layout>
    );

}