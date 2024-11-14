const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;
const clientRoutes = require('./routes/clientRoutes');
app.use('/api/clients', clientRoutes); 

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
