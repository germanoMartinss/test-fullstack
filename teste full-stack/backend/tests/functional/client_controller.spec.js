const { test, beforeEach, expect } = require('@japa/runner');
const sinon = require('sinon');
const app = require('../../start/app');

let clients = [];
let idCounter = 1;

beforeEach(async () => {
    clients = [];
    idCounter = 1;
});

test.group('ClientController', () => {
    test('Deve criar um novo cliente', async ({ client }) => {
        const response = await client.post('/api/clients').json({
            name: 'João',
            email: 'joao@teste.com',
            cpf: '12345678901',
            phone: '1234567890',
            status: 'Ativo'
        });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('João');
        expect(response.body.email).toBe('joao@teste.com');
        expect(response.body.cpf).isNumber();
        expect(response.body.phone).toBe('1234567890');
        expect(response.body.status).toBe('active');
    });

    test('Deve listar todos os clientes', async ({ client }) => {
        const response = await client.get('/api/clients');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    test('Deve atualizar um cliente', async ({ client }) => {
        const response = await client.post('/api/clients').json({
            name: 'João',
            email: 'joao@teste.com',
            cpf: '12345678901',
            phone: '1234567890',
            status: 'Desativado'
        });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('João');
        expect(response.body.email).toBe('joao@teste.com');
        expect(response.body.cpf).isNumber();
        expect(response.body.phone).toBe('1234567890');
        expect(response.body.status).toBe('active');
    });

    test('Deve deletar um cliente', async ({ client }) => {
        const response = await client.delete('/api/clients/1');
        expect(response.status).toBe(204);
    });
})