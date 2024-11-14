import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllClients, deleteClient } from '../services/clientService';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const data = await getAllClients();
      setClients(data);
    };
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    await deleteClient(id);
    setClients(clients.filter(client => client.id !== id));
  };

  return (
    <div className="container mt-5">
      <header className="d-flex justify-content-between align-items-center mb-4">
      <h2>Lista de Clientes</h2>
      
      <Link to="/add" className="btn btn-primary">Novo Cliente</Link>
      
      </header>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.cpf}</td>
              <td>{client.phone}</td>
              <td className='text-color' style={{ color: client.status === 'Ativo' ? 'green' : 'red' }}>{client.status}</td>
              <td className="d-flex justify-content-center align-items-center">
                <Link to={`/edit/${client.id}`} className="btn btn-primary mr-2 m-2">Editar</Link>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="btn btn-danger"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;