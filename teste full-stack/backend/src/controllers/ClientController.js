let clients = [];  // Corrigido o nome para 'clients'
let idCounter = 1;

class ClientController {
    async getAllClients(req, res) {
        res.json(clients);
    }

    async createClient(req, res) {
        const { name, email, cpf, phone, status } = req.body;
        
        if (!name || !email || !cpf || !phone || !status) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newClient = {
            id: idCounter++,
            name,
            email,
            cpf,
            phone,
            status
        };

        clients.push(newClient);
        res.status(201).json(newClient);
    }

    async updateClient(req, res) {
        const { id } = req.params;
        const { name, email, cpf, phone, status } = req.body;

        const clientIndex = clients.findIndex(client => client.id === parseInt(id));

        if (clientIndex === -1) {
            return res.status(404).json({ error: 'Client not found' });
        }

        const updatedClient = {
            ...clients[clientIndex],
            name,
            email,
            cpf,
            phone,
            status
        };

        clients[clientIndex] = updatedClient;
        res.json(updatedClient);
    }

    async deleteClient(req, res) {
        const { id } = req.params;
        const clientIndex = clients.findIndex(client => client.id === parseInt(id));

        if (clientIndex === -1) {
            return res.status(404).json({ error: 'Client not found' });
        }

        clients.splice(clientIndex, 1);
        res.sendStatus(204);
    }
}

module.exports = new ClientController();
