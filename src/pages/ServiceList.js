import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceForm from './ServiceForm';
import './List.css';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:3001/services');
            setServices(response.data);
        } catch (err) {
            setError('Não foi possível carregar os serviços.');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
            try {
                await axios.delete(`http://localhost:3001/services/${id}`);
                fetchServices();
            } catch (err) {
                setError('Falha ao excluir o serviço.');
                console.error(err);
            }
        }
    };

    const handleEdit = (service) => {
        setSelectedService(service);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setSelectedService(null);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedService(null);
    };

    return (
        <div className="list-container">
            <div className="list-header">
                <h2>Gerenciamento de Serviços</h2>
                <button onClick={handleAddNew}>Novo Serviço</button>
            </div>

            {error && <p className="error-message">{error}</p>}

            {showForm && (
                <ServiceForm
                    service={selectedService}
                    refreshList={fetchServices}
                    closeForm={handleCloseForm}
                />
            )}

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Custo</th>
                        <th>Status</th>
                        <th>Cliente</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => (
                        <tr key={service.id}>
                            <td>{service.name}</td>
                            <td>R$ {parseFloat(service.cost).toFixed(2)}</td>
                            <td>{service.status}</td>
                            <td>{service.client}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(service)}>Editar</button>
                                <button className="delete-btn" onClick={() => handleDelete(service.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceList;