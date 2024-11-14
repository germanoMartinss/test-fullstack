import api from "../axios";

export const getAllClients = async () => {
    try {
        const response = await api.get("/clients");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        throw error;
    }
};

export const createClient = async (clientData) => {
    try {
        const response = await api.post("/clients", clientData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar cliente:", error);
        throw error;
    }
};

export const updateClient = async (id, clientData) => {
    try {
        const response = await api.put(`/clients/${id}`, clientData);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
        throw error;
    }
};

export const deleteClient = async (id) => {
    try {
        const response = await api.delete(`/clients/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        throw error;
    }
};