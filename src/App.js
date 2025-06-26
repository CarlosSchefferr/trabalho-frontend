import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import ServiceList from './pages/ServiceList'; 
import UserList from './pages/UserList'; 
import './App.css';

// Proteger rotas
const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

// Gerenciar o layout
const AppLayout = () => {
    const location = useLocation();
    const noLayoutRoutes = ['/login'];

    return (
        <div className="app-container">
            {!noLayoutRoutes.includes(location.pathname) && <Navbar />}
            <main className="main-content">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/services" element={<PrivateRoute><ServiceList /></PrivateRoute>} />
                    <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
                    {/* Rota padrão */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </main>
            {!noLayoutRoutes.includes(location.pathname) && <Footer />}
        </div>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppLayout />
            </AuthProvider>
        </Router>
    );
}

export default App;