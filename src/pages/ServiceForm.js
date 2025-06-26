import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';

const ServiceForm = ({ service, refreshList, closeForm }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        cost: '',
        status: 'Pendente',
        client: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (service) {
            setFormData(service);
        }
    }, [service]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const dataToSubmit = {
            ...formData,
            cost: parseFloat(formData.cost)
        };

        try {
            if (service && service.id) {

                await axios.put(`http://localhost:3001/services/${service.id}`, dataToSubmit);
            } else {

                await axios.post('http://localhost:3001/services', dataToSubmit);
            }
            refreshList();
            closeForm();
        } catch (err) {
            setError('Erro ao salvar o serviço. Verifique os dados.');
            console.error(err);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h3>{service ? 'Editar Serviço' : 'Novo Serviço'}</h3>
                {error && <p className="error-message">{error}</p>}

                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nome do Serviço" required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descrição" required />
                <input type="number" name="cost" value={formData.cost} onChange={handleChange} placeholder="Custo (ex: 5000.00)" required />
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Pendente">Pendente</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Concluído">Concluído</option>
                </select>
                <input type="text" name="client" value={formData.client} onChange={handleChange} placeholder="Nome do Cliente" required />

                <div className="form-actions">
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={closeForm}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default ServiceForm;