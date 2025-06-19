import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import './List.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            setUsers(response.data);
        } catch (err) {
            setError('Não foi possível carregar os usuários.');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                await axios.delete(`http://localhost:3001/users/${id}`);
                fetchUsers();
            } catch (err) {
                setError('Falha ao excluir o usuário.');
                console.error(err);
            }
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setSelectedUser(null);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedUser(null);
    };

    return (
        <div className="list-container">
            <div className="list-header">
                <h2>Gerenciamento de Usuários</h2>
                <button onClick={handleAddNew}>Novo Usuário</button>
            </div>

            {error && <p className="error-message">{error}</p>}

            {showForm && (
                <UserForm
                    user={selectedUser}
                    refreshList={fetchUsers}
                    closeForm={handleCloseForm}
                />
            )}

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Cargo</th>
                        <th>Criado em</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(user)}>Editar</button>
                                <button className="delete-btn" onClick={() => handleDelete(user.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;