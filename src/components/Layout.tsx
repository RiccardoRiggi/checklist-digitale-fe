import { async } from 'q';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMantieniMessaggiAction, fetchTestoDangerAction, fetchTestoSuccessAction, fetchTestoWarnAction } from '../modules/feedback/actions';
import { fetchUtenteAction } from '../modules/utenteLoggato/actions';
import utenteService from '../services/UtenteService';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }: any) {
    const dispatch = useDispatch();
    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const feedback = useSelector((state: any) => state.feedback);

    const [eseguitoControlloAutenticazione, setEseguitoControlloAutenticazione] = React.useState(false);


    document.getElementsByTagName("body")[0].classList.remove("bg-gradient-danger");
    let navigate = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        localStorage.clear();
        document.getElementsByTagName("div")[document.getElementsByTagName("div").length - 1].remove();
        document.getElementsByTagName("body")[0].classList.remove("modal-open");
        navigate("/login");
    }

    const verificaAutenticazione = async () => {
        await utenteService.isAutenticato(sessionStorage.getItem("token")).then(response => {
            dispatch(fetchUtenteAction(response.data));
        }).catch(e => {
            console.error(e);
            sessionStorage.clear();
            localStorage.clear();
            dispatch(fetchTestoDangerAction("Sessione scaduta!"));
            navigate("/login");
        });
    }


    useEffect(() => {
        if (!eseguitoControlloAutenticazione) {
            if (feedback.mantieniMessaggi) {
                dispatch(fetchMantieniMessaggiAction(false));
            } else {
                dispatch(fetchTestoDangerAction());
                dispatch(fetchTestoWarnAction());
                dispatch(fetchTestoSuccessAction());
            }
            verificaAutenticazione();
            setEseguitoControlloAutenticazione(true);

        }
    });


    //setInterval(() => { if(sessionStorage.getItem("token") != undefined) verificaAutenticazione() }, 10000);



    return (
        <>
            <div id="wrapper">

                <Sidebar />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <Header />

                        <div className="container-fluid">
                            {feedback.testoDanger && <div className="alert alert-danger" role="alert">{feedback.testoDanger}<button onClick={() => dispatch(fetchTestoDangerAction(""))} type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button></div>}
                            {feedback.testoWarn && <div className="alert alert-warn" role="alert">{feedback.testoWarn}<button onClick={() => dispatch(fetchTestoWarnAction(""))} type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button></div>}
                            {feedback.testoSuccess && <div className="alert alert-success" role="alert">{feedback.testoSuccess}<button onClick={() => dispatch(fetchTestoSuccessAction(""))} type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button></div>}
                            {!feedback.isLoading && children}
                            {feedback.isLoading && <div className='text-center'><i className="fas fa-spinner fa-spin fa-3x text-danger"></i></div>}
                        </div>

                    </div>

                    <Footer />

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            <div className="modal fade" id="logoutModal" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button className="btn btn-primary" onClick={logout} >Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}