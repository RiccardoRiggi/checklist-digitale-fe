import { async } from 'q';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginInterface } from '../interfaces/LoginInterface';
import utenteService from '../services/UtenteService';



export default function LoginPage() {

    const [isLoading, setLoading] = React.useState(false);
    const [isSubmitting, setSubmitting] = React.useState(false);
    const [email, setEmail] = React.useState("info@riccardoriggi.it");
    const [password, setPassword] = React.useState("123456");
    const [testoDanger, setTestoDanger] = React.useState("");
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
            console.log(response.data);
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("identificativo", response.data.identificativo.toString());
            sessionStorage.setItem("nome", response.data.nome);
            sessionStorage.setItem("cognome", response.data.cognome);
            sessionStorage.setItem("dataDiNascita", response.data.dataDiNascita);
            sessionStorage.setItem("email", response.data.email);
            sessionStorage.setItem("ruolo", response.data.tRuoloCodice);
            window.location.replace("/");
        }).catch(e => {
            console.error(e);
            setTestoDanger("Credenziali non corrette!");
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
                                            {testoDanger && <div className="alert alert-danger" role="alert">{testoDanger}</div>}
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

                                            <span className="btn btn-primary btn-user btn-block" onClick={submitForm}>Login</span>


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