import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';



import { userActions } from '../_actions';

function LoginPage() {
    const alert = useSelector(state => state.alert);
    const [open, setOpen] = React.useState(true);

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { email, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (email && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(email, password, from));
        }

        setSubmitted(false);
    }

    return (<>
        <Grid container spacing={0} container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
            sx={{ bgcolor: 'primary.main' }}>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4} align="center">
            <Typography style={{ color: 'white' }} variant="h4" component="h4">
                    <PlaylistAddCheckIcon fontSize='large' />Checklist Digitale
                </Typography>
            {alert.message &&
                            <Box sx={{ width: '100%' }}>
                                <Collapse in={open}>
                                    <Alert
                                        color={alert.type}
                                        
                                    >
                                        {alert.message}                                    </Alert>
                                </Collapse>
                            </Box>
                    }
                
                
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <TextField color="success" style={{
                            backgroundColor: "white"
                        }} label="Email" variant="filled" type="text" name="email" value={email} onChange={handleChange} className={'form-control' + (submitted && !email ? ' is-invalid' : '')} />
                        {submitted && !email &&
                            <div className="invalid-feedback">Email is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <TextField variant="filled" label="Password" style={{
                            backgroundColor: "white"
                        }} type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                        {submitted && !password &&
                            <div className="invalid-feedback">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        {submitted && !open? <CircularProgress style={{ color: '#fff' }} />
                            : <Button size='large' onClick={handleSubmit} variant="contained" style={{ color: '#1976d2', backgroundColor:'#fff' }} endIcon={<LoginIcon />}>
                                {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Login
                            </Button>}

                    </div>
                </Box>
            </Grid>
            <Grid item xs={4}>
            </Grid>

        </Grid>

    </>
    );
}

export { LoginPage };