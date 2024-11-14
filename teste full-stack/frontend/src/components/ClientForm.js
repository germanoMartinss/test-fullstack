import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import axios from '../axios'; // Certifique-se de que o Axios está configurado corretamente

const clientSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
    cpf: z.string().min(11, 'CPF inválido').max(11, 'CPF inválido'),
    phone: z.string().min(10, 'Número de telefone inválido'),
    status: z.string().min(1, 'Status é obrigatório'),
});

const ClientForm = ({ client }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        status: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        if (client) {
            setFormData({
                name: client.name,
                email: client.email,
                cpf: client.cpf,
                phone: client.phone,
                status: client.status,
            });
        }
    }, [client]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validação do formulário usando Zod
            clientSchema.parse(formData);

            if (client) {
                await axios.put(`/clients/${client.id}`, formData);
            } else {
                await axios.post('/clients', formData);
            }

            navigate('/');
        } catch (error) {
            if (error instanceof z.ZodError) {
                const validationErrors = error.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                setErrors(validationErrors);
            } else {
                console.error("Erro inesperado:", error);
            }
        }
    };

    return (
        <div className="container">
            <h2>{client ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">CPF</label>
                    <input
                        type="text"
                        className="form-control"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                    />
                    {errors.cpf && <div className="text-danger">{errors.cpf}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Telefone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <div className="text-danger">{errors.phone}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <input
                        type="text"
                        className="form-control"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    />
                    {errors.status && <div className="text-danger">{errors.status}</div>}
                </div>

                <button type="submit" className="btn btn-primary">
                    {client ? 'Atualizar' : 'Criar'}
                </button>
            </form>
        </div>
    );
};

export default ClientForm;