import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/dashboard">Sistema</Link>
            </div>
            <div className="navbar-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/services">Serviços</Link>
                <Link to="/users">Usuários</Link>
            </div>
            <div className="navbar-user">
                <span>Olá, {user?.name}</span>
                <button onClick={logout}>Sair</button>
            </div>
        </nav>
    );
};

export default Navbar;