import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Estilo para o dashboard

const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [serviceCount, setServiceCount] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDataSummary = async () => {
            try {
                // e. Tratamento de exceções (try/catch)
                const usersResponse = await axios.get('http://localhost:3001/users');
                setUserCount(usersResponse.data.length);

                const servicesResponse = await axios.get('http://localhost:3001/services');
                setServiceCount(servicesResponse.data.length);
            } catch (err) {
                setError('Não foi possível carregar os dados do dashboard.');
                console.error(err);
            }
        };

        fetchDataSummary();
    }, []);

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <div className="summary-cards">
                <div className="card">
                    <h2>Usuários Cadastrados</h2>
                    <p className="count">{userCount}</p>
                </div>
                <div className="card">
                    <h2>Serviços Registrados</h2>
                    <p className="count">{serviceCount}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;