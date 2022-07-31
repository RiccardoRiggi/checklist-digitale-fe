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
import { VeicoloInterface } from '../../interfaces/VeicoloInterface';
import veicoloService from '../../services/VeicoloService';
import SchedaVeicoloValidator from '../../validators/SchedaVeicoloValidator';
registerLocale('it', it)


export default function SchedaVeicoloPage() {
    const dispatch = useDispatch();
    let params = useParams();
    const utenteLoggato = useSelector((state: any) => state.utenteLoggato.utente);
    const [veicolo, setVeicolo] = React.useState<VeicoloInterface>();
    const [tipoVeicolo, setTipoVeicolo] = React.useState(params.id != null ? "" : "A");

    const [formErrors, setFormErrors] = React.useState(Object);
    const [isInserimento, setIsInserimento] = React.useState(params.id == null);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    let navigate = useNavigate();



    const getVeicolo = async () => {
        dispatch(fetchIsLoadingAction(true));
        await veicoloService.getVeicolo(sessionStorage.getItem("token"), params.id).then(response => {
            setVeicolo(response.data);
            setTipoVeicolo(response.data.tVeicoloCodice);
            const select: any = document.getElementById('comboTipoVeicolo');
            if (select != null)
                select.value = response.data.tVeicoloCodice;
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Errore durante la ricerca del veicolo!"));
            dispatch(fetchIsLoadingAction(false));
        });


    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputName = e.currentTarget.name;
        let inputValue = e.currentTarget.value;
        console.log(veicolo);
        let oggettoVeicoloOggeto: any = {};
        if (veicolo != undefined) {
            let oggettoVeicoloStringa = JSON.stringify(veicolo);
            oggettoVeicoloOggeto = JSON.parse(oggettoVeicoloStringa);
        }
        oggettoVeicoloOggeto[inputName] = inputValue;

        setVeicolo(oggettoVeicoloOggeto as VeicoloInterface);
    }

    const submitForm = async () => {
        let veicoloTmp: any = {};
        if (veicolo != undefined) {
            veicoloTmp = JSON.parse(JSON.stringify(veicolo));
        }

        veicoloTmp.tVeicoloCodice = tipoVeicolo;
        let formsErrorTmp = SchedaVeicoloValidator(veicoloTmp!, params.id);
        setFormErrors(formsErrorTmp);
        if (Object.keys(formsErrorTmp).length == 0) {
            if (isInserimento) {
                veicoloTmp.userInsert = utenteLoggato.nome + " " + utenteLoggato.cognome;
                setVeicolo(veicoloTmp as VeicoloInterface);
                dispatch(fetchIsLoadingAction(true));
                await veicoloService.inserisciVeicolo(sessionStorage.getItem("token"), veicoloTmp).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    dispatch(fetchTestoSuccessAction("Veicolo registrato con successo!"));
                    dispatch(fetchMantieniMessaggiAction(true));
                    navigate("/veicoli");
                }).catch(e => {
                    console.error(e);
                    dispatch(fetchTestoDangerAction("Errore durante il salvataggio!"));
                    dispatch(fetchIsLoadingAction(false));
                });
            } else {
                veicoloTmp.userUpdate = utenteLoggato.nome + " " + utenteLoggato.cognome;
                veicoloTmp.identificativo = undefined;
                setVeicolo(veicoloTmp as VeicoloInterface);
                dispatch(fetchIsLoadingAction(true));
                await veicoloService.modificaVeicolo(sessionStorage.getItem("token"), veicoloTmp, params.id).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    dispatch(fetchTestoSuccessAction("Veicolo aggiornato con successo!"));
                    setVeicolo(response.data);
                }).catch(e => {
                    console.error(e);
                    dispatch(fetchTestoDangerAction("Errore durante il salvataggio!"));
                    dispatch(fetchIsLoadingAction(false));
                });
            }

        }
    }

    useEffect(() => {
        if (!ricercaEseguita && !isInserimento) {
            getVeicolo();
            setRicercaEseguita(true);
        }
    });

    return (
        <Layout>
            <h1><i className="fas fa-ambulance text-danger pr-3"></i>{isInserimento ? "Aggiungi" : "Modifica"} Veicolo</h1>
            <div className="card shadow mt-4 mb-4">
                <div
                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Inserisci le informazioni necessarie</h6>
                    <div className="dropdown no-arrow">
                        <button onClick={submitForm} className="btn btn-primary"
                        ><span className='pr-3'>{isInserimento ? "Registra veicolo" : "Salva modifiche"}</span>
                            <i className="fas fa-save fa-sm fa-fw "></i>
                        </button>

                    </div>
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-4'>
                            <div className="form-group">
                                <label>Nome</label>
                                <input type="text" className="form-control" placeholder="" name="nome" value={veicolo?.nome} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(event)} />
                                <small className="form-text text-danger">{formErrors.nome}</small>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="form-group">
                                <label>Selettiva</label>
                                <input type="text" className="form-control" placeholder="" name="selettiva" value={veicolo?.selettiva} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(event)} />
                                <small className="form-text text-danger">{formErrors.selettiva}</small>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="form-group">
                                <label>Tipo veicolo</label>
                                <select id='comboTipoVeicolo' className="form-control" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setTipoVeicolo(event.target.value)}>
                                    <option value={"A"}>Ambulanza</option>
                                    <option value={"M"}>Automedica</option>
                                    <option value={"T"}>Trasporto Disabili</option>
                                    <option value={"V"}>Vettura</option>
                                </select>
                                <small className="form-text text-danger">{formErrors.tVeicoloCodice}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

}