import React from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Link } from "react-router-dom";


export default function Header() {

    const pages = ['Products', 'Pricing', 'Blog'];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);

    //Gestione MENU Utenti
    const [anchorElUtenti, setAnchorElUtenti] = React.useState(null);
    const openUtenti = Boolean(anchorElUtenti)
    const handleClickUtenti = (event) => {
        setAnchorElUtenti(event.currentTarget);
    };
    const handleCloseUtenti = () => {
        setAnchorElUtenti(null);
    };

    //Gestione MENU Veicoli
    const [anchorElVeicoli, setAnchorElVeicoli] = React.useState(null);
    const openVeicoli = Boolean(anchorElVeicoli)
    const handleClickVeicoli = (event) => {
        setAnchorElVeicoli(event.currentTarget);
    };
    const handleCloseVeicoli = () => {
        setAnchorElVeicoli(null);
    };

    //Gestione MENU Template
    const [anchorElTemplate, setAnchorElTemplate] = React.useState(null);
    const openTemplate = Boolean(anchorElTemplate)
    const handleClickTemplate = (event) => {
        setAnchorElTemplate(event.currentTarget);
    };
    const handleCloseTemplate = () => {
        setAnchorElTemplate(null);
    };

    //Gestione MENU Checklist
    const [anchorElChecklist, setAnchorElChecklist] = React.useState(null);
    const openChecklist = Boolean(anchorElChecklist)
    const handleClickChecklist = (event) => {
        setAnchorElChecklist(event.currentTarget);
    };
    const handleCloseChecklist = () => {
        setAnchorElChecklist(null);
    };







    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <PlaylistAddCheckIcon fontSize='large' />Checklist Digitale
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >


                            <Button
                                id="basic-button"
                                aria-controls={openUtenti ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openUtenti ? 'true' : undefined}
                                onClick={handleClickUtenti}
                                sx={{ color: 'black' }}
                            >
                                Utenti
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorElUtenti}
                                open={openUtenti}
                                onClose={handleCloseUtenti}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}

                            >
                                <MenuItem onClick={handleCloseUtenti}><Link style={{ textDecoration: 'none' }} to="/aggiungi-utente"><span style={{ color: 'black' }}>Aggiungi Utente</span></Link></MenuItem>
                                <MenuItem onClick={handleCloseUtenti}><Link style={{ textDecoration: 'none' }} to="/lista-utenti"><span style={{ color: 'black' }}>Lista Utenti</span></Link></MenuItem>
                            </Menu>

                            <Button
                                id="basic-button"
                                aria-controls={openVeicoli ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openVeicoli ? 'true' : undefined}
                                onClick={handleClickVeicoli}
                                sx={{ color: 'black' }}
                            >
                                Veicoli
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorElVeicoli}
                                open={openVeicoli}
                                onClose={handleCloseVeicoli}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}

                            >
                                <MenuItem onClick={handleCloseVeicoli}><Link style={{ textDecoration: 'none' }} to="/aggiungi-veicolo"><span style={{ color: 'black' }}>Aggiungi Veicolo</span></Link></MenuItem>
                                <MenuItem onClick={handleCloseVeicoli}><Link style={{ textDecoration: 'none' }} to="/lista-veicoli"><span style={{ color: 'black' }}>Lista Veicoli</span></Link></MenuItem>
                            </Menu>

                            <Button
                                id="basic-button"
                                aria-controls={openTemplate ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openTemplate ? 'true' : undefined}
                                onClick={handleClickTemplate}
                                sx={{ color: 'black' }}
                            >
                                Checklist Template
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorElTemplate}
                                open={openTemplate}
                                onClose={handleCloseTemplate}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}

                            >
                                <MenuItem onClick={handleCloseTemplate}><Link style={{ textDecoration: 'none' }} to="/aggiungi-veicolo"><span style={{ color: 'black' }}>Aggiungi Template</span></Link></MenuItem>
                                <MenuItem onClick={handleCloseTemplate}><Link style={{ textDecoration: 'none' }} to="/lista-veicoli"><span style={{ color: 'black' }}>Lista Template</span></Link></MenuItem>
                            </Menu>

                            <Button
                                id="basic-button"
                                aria-controls={openChecklist ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openChecklist ? 'true' : undefined}
                                onClick={handleClickChecklist}
                                sx={{ color: 'black' }}
                            >
                                Checklist
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorElChecklist}
                                open={openChecklist}
                                onClose={handleCloseChecklist}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}

                            >
                                <MenuItem onClick={handleCloseChecklist}><Link style={{ textDecoration: 'none' }} to="/aggiungi-veicolo"><span style={{ color: 'black' }}>Aggiungi Checklist</span></Link></MenuItem>
                                <MenuItem onClick={handleCloseChecklist}><Link style={{ textDecoration: 'none' }} to="/lista-veicoli"><span style={{ color: 'black' }}>Lista Checklist</span></Link></MenuItem>
                            </Menu>

                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <PlaylistAddCheckIcon fontSize='large' />Checklist Digitale
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            id="basic-button"
                            aria-controls={openUtenti ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openUtenti ? 'true' : undefined}
                            onClick={handleClickUtenti}
                            sx={{ color: 'white' }}
                        >
                            Utenti
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorElUtenti}
                            open={openUtenti}
                            onClose={handleCloseUtenti}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}

                        >
                            <MenuItem onClick={handleCloseUtenti}><Link style={{ textDecoration: 'none' }} to="/aggiungi-utente"><span style={{ color: 'black' }}>Aggiungi Utente</span></Link></MenuItem>
                            <MenuItem onClick={handleCloseUtenti}><Link style={{ textDecoration: 'none' }} to="/lista-utenti"><span style={{ color: 'black' }}>Lista Utenti</span></Link></MenuItem>
                        </Menu>

                        <Button
                            id="basic-button"
                            aria-controls={openVeicoli ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openVeicoli ? 'true' : undefined}
                            onClick={handleClickVeicoli}
                            sx={{ color: 'white' }}
                        >
                            Veicoli
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorElVeicoli}
                            open={openVeicoli}
                            onClose={handleCloseVeicoli}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}

                        >
                            <MenuItem onClick={handleCloseVeicoli}><Link style={{ textDecoration: 'none' }} to="/aggiungi-veicolo"><span style={{ color: 'black' }}>Aggiungi Veicolo</span></Link></MenuItem>
                            <MenuItem onClick={handleCloseVeicoli}><Link style={{ textDecoration: 'none' }} to="/lista-veicoli"><span style={{ color: 'black' }}>Lista Veicoli</span></Link></MenuItem>
                        </Menu>

                        <Button
                            id="basic-button"
                            aria-controls={openTemplate ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openTemplate ? 'true' : undefined}
                            onClick={handleClickTemplate}
                            sx={{ color: 'white' }}
                        >
                            Checklist Template
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorElTemplate}
                            open={openTemplate}
                            onClose={handleCloseTemplate}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}

                        >
                            <MenuItem onClick={handleCloseTemplate}><Link style={{ textDecoration: 'none' }} to="/aggiungi-veicolo"><span style={{ color: 'black' }}>Aggiungi Template</span></Link></MenuItem>
                            <MenuItem onClick={handleCloseTemplate}><Link style={{ textDecoration: 'none' }} to="/lista-veicoli"><span style={{ color: 'black' }}>Lista Template</span></Link></MenuItem>
                        </Menu>

                        <Button
                            id="basic-button"
                            aria-controls={openChecklist ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openChecklist ? 'true' : undefined}
                            onClick={handleClickChecklist}
                            sx={{ color: 'white' }}
                        >
                            Checklist
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorElChecklist}
                            open={openChecklist}
                            onClose={handleCloseChecklist}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}

                        >
                            <MenuItem onClick={handleCloseChecklist}><Link style={{ textDecoration: 'none' }} to="/aggiungi-veicolo"><span style={{ color: 'black' }}>Aggiungi Checklist</span></Link></MenuItem>
                            <MenuItem onClick={handleCloseChecklist}><Link style={{ textDecoration: 'none' }} to="/lista-veicoli"><span style={{ color: 'black' }}>Lista Checklist</span></Link></MenuItem>
                        </Menu>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Typography
                            onClick={handleOpenUserMenu}
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', md: 'inline' }, cursor: 'pointer' }}

                        >
                            Bentornato {JSON.parse(localStorage.getItem("user")).nome}!
                        </Typography>
                        <Typography
                            onClick={handleOpenUserMenu}
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, cursor: 'pointer' }}

                        >
                            {JSON.parse(localStorage.getItem("user")).nome.toString().charAt(0)}
                        </Typography>

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >


                            <MenuItem key="utenteCorrente" onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: 'none' }} to="/utente-corrente">Utente corrente</Link></Typography>
                            </MenuItem>
                            <MenuItem key="logout" onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: 'none' }} to="/login">Logout</Link></Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );


}