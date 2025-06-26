import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';

const UserForm = ({ user, refreshList, closeForm }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'User',
        createdAt: new Date().toISOString().split('T')[0]
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({ ...user, password: '' });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (user && !formData.password) {
            delete formData.password;
        }

        try {
            if (user && user.id) {
                await axios.put(`http://localhost:3001/users/${user.id}`, formData);
            } else {
                await axios.post('http://localhost:3001/users', formData);
            }
            refreshList();
            closeForm();
        } catch (err) {
            setError('Erro ao salvar o usuário. Verifique os dados.');
            console.error(err);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h3>{user ? 'Editar Usuário' : 'Novo Usuário'}</h3>
                {error && <p className="error-message">{error}</p>}

                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nome Completo" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" required />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder={user ? "Deixe em branco para não alterar a senha" : "Senha"} required={!user} />
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="User">Usuário</option>
                    <option value="Admin">Admin</option>
                </select>
                <input type="date" name="createdAt" value={formData.createdAt} onChange={handleChange} required />

                <div className="form-actions">
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={closeForm}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;