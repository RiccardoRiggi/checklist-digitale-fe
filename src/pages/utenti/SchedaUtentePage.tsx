import React, { ChangeEventHandler, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { UtenteInterface } from '../../interfaces/UtenteInterface';
import { fetchIsLoadingAction, fetchMantieniMessaggiAction, fetchTestoDangerAction, fetchTestoSuccessAction } from '../../modules/feedback/actions';
import utenteService from '../../services/UtenteService';
import SchedaUtenteValidator from '../../validators/SchedaUtenteValidator';
import DatePicker, { registerLocale } from 'react-datepicker';
import it from 'date-fns/locale/it';
registerLocale('it', it)


export default function SchedaUtentePage() {
    const dispatch = useDispatch();
    let params = useParams();
    const utenteLoggato = useSelector((state: any) => state.utenteLoggato.utente);
    const [utente, setUtente] = React.useState<UtenteInterface>();
    const [dataDiNascita, setDataDiNascita] = React.useState(new Date());
    const [ruolo, setRuolo] = React.useState("U");

    const [formErrors, setFormErrors] = React.useState(Object);
    const [isInserimento, setIsInserimento] = React.useState(params.id == null);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    let navigate = useNavigate();



    const getUtente = async () => {
        dispatch(fetchIsLoadingAction(true));
        await utenteService.getUtente(sessionStorage.getItem("token"), params.id).then(response => {
            setUtente(response.data);
            setDataDiNascita(new Date(response.data.dataDiNascita));
            setRuolo(response.data.tRuoloCodice);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Errore durante la ricerca dell'utente!"));
            dispatch(fetchIsLoadingAction(false));
        });


    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputName = e.currentTarget.name;
        let inputValue = e.currentTarget.value;
        console.log(utente);
        let oggettoUtenteOggeto: any = {};
        if (utente != undefined) {
            let oggettoUtenteStringa = JSON.stringify(utente);
            oggettoUtenteOggeto = JSON.parse(oggettoUtenteStringa);
        }
        oggettoUtenteOggeto[inputName] = inputValue;
        setUtente(oggettoUtenteOggeto as UtenteInterface);
    }

    const submitForm = async () => {
        let utenteTmp: any = {};
        if(utente!=undefined){
            utenteTmp = JSON.parse(JSON.stringify(utente));
        }        
        utenteTmp.dataDiNascita = dataDiNascita;
        utenteTmp.tRuoloCodice = ruolo;
        let formsErrorTmp = SchedaUtenteValidator(utente!);
        setFormErrors(formsErrorTmp);
        if (Object.keys(formsErrorTmp).length == 0) {
            if (isInserimento) {
                utenteTmp.userInsert = utenteLoggato.nome + " " + utenteLoggato.cognome;
                setUtente(utenteTmp as UtenteInterface);
                dispatch(fetchIsLoadingAction(true));
                await utenteService.inserisciUtente(sessionStorage.getItem("token"), utente).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    dispatch(fetchTestoSuccessAction("Utente registrato con successo!"));
                    dispatch(fetchMantieniMessaggiAction(true));
                    navigate("/utenti");
                }).catch(e => {
                    console.error(e);
                    dispatch(fetchTestoDangerAction("Errore durante il salvataggio!"));
                    dispatch(fetchIsLoadingAction(false));
                });
            } else {
                utenteTmp.userUpdate = utenteLoggato.nome + " " + utenteLoggato.cognome;
                utenteTmp.identificativo=undefined;
                setUtente(utenteTmp  as UtenteInterface);
                dispatch(fetchIsLoadingAction(true));
                await utenteService.modificaUtente(sessionStorage.getItem("token"), utenteTmp, params.id).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    dispatch(fetchTestoSuccessAction("Utente aggiornato con successo!"));
                }).catch(e => {
                    console.error(e);
                    console.log(JSON.stringify(utente));
                    dispatch(fetchTestoDangerAction("Errore durante il salvataggio!"));
                    dispatch(fetchIsLoadingAction(false));
                });
            }

        }
    }

    useEffect(() => {
        if (!ricercaEseguita && !isInserimento) {
            getUtente();
            setRicercaEseguita(true);
        }
    });

    return (
        <Layout>
            <h1><i className="fas fa-user text-danger pr-3"></i>{isInserimento ? "Aggiungi" : "Modifica"} Utente</h1>
            <div className="card shadow mt-4 mb-4">
                <div
                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Inserisci le informazioni necessarie</h6>
                    <div className="dropdown no-arrow">
                        <button onClick={submitForm} className="btn btn-primary"
                        ><span className='pr-3'>{isInserimento ? "Registra utente" : "Salva modifiche"}</span>
                            <i className="fas fa-save fa-sm fa-fw "></i>
                        </button>

                    </div>
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-4'>
                            <div className="form-group">
                                <label>Nome</label>
                                <input type="text" className="form-control" placeholder="" name="nome" value={utente?.nome} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(event)} />
                                <small className="form-text text-danger">{formErrors.nome}</small>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="form-group">
                                <label>Cognome</label>
                                <input type="text" className="form-control" placeholder="" name="cognome" value={utente?.cognome} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(event)} />
                                <small className="form-text text-danger">{formErrors.cognome}</small>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="form-group">
                                <label>Data di nascita</label>
                                <DatePicker
                                    className='form-control'
                                    locale={it}
                                    selected={dataDiNascita}
                                    onChange={(date: Date) => setDataDiNascita(date)}
                                    dateFormat='dd-MM-yyyy'
                                />
                                <small className="form-text text-danger">{formErrors.dataDiNascita}</small>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="" name="email" value={utente?.email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(event)} />
                                <small className="form-text text-danger">{formErrors.email}</small>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="" name="password" value={utente?.password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(event)} />
                                <small className="form-text">La password deve essere lunga almeno sei caratteri</small>
                                <small className="form-text text-danger">{formErrors.password}</small>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="form-group">
                                <label>Ruolo</label>
                                <select className="form-control" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setRuolo(event.target.value)}>
                                    <option value={"U"}>Utente</option>
                                    <option value={"A"}>Amministratore</option>
                                </select>
                                <small className="form-text text-danger">{formErrors.tRuoloCodice}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

}