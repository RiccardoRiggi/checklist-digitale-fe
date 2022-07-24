import { async } from 'q';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginInterface } from '../interfaces/LoginInterface';
import { fetchTestoDangerAction, fetchTestoSuccessAction } from '../modules/feedback/actions';
import { feedbackReducer } from '../modules/feedback/reducer';
import { fetchUtenteAction } from '../modules/utenteLoggato/actions';
import utenteService from '../services/UtenteService';



export default function LoginPage() {
    const dispatch = useDispatch();
    const feedback = useSelector((state: any) => state.feedback); 


    const [isSubmitting, setSubmitting] = React.useState(false);
    const [email, setEmail] = React.useState("info@riccardoriggi.it");
    const [password, setPassword] = React.useState("123456");
    let navigate = useNavigate();
    document.getElementsByTagName("body")[0].classList.add("bg-gradient-danger");

    let utente: LoginInterface;

    const submitForm = async () => {
        setSubmitting(true);
        utente = {
            email: email,
            password: password
        }

        await utenteService.eseguiAutenticazione(utente).then(response => {
            dispatch(fetchUtenteAction(response.data));
            sessionStorage.setItem("token", response.data.token);
            setTimeout(() => { navigate("/"); }, 500);
        }).catch(e => {
            console.error(e);
            dispatch(fetchTestoDangerAction("Credenziali non corrette!"));
            setSubmitting(false);
        });
    }



    return (
        <div className="container">
            <div className="row justify-content-center">

                <div className="col-xl-10 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">

                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4"><i className="fas fa-clipboard-list pr-3 text-primary"></i>Checklist Digitale</h1>
                                           { feedback.testoDanger && <div className="alert alert-danger fade show" role="alert">
                                                {feedback.testoDanger}
                                                
                                            </div> }
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control form-control-user"
                                                    value={email}
                                                    placeholder="Email" />
                                            </div>
                                            <div className="form-group">
                                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control form-control-user"
                                                    placeholder="Password" />
                                            </div>

                                            <span className="btn btn-primary btn-user btn-block" onClick={submitForm}>{!isSubmitting && <span>Login</span>} {isSubmitting && <i className="fas fa-spinner fa-spin"></i>}</span>


                                        </form>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );

}