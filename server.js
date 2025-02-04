const express = require('express');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
app.use(express.json());

// Rutas
app.use('/api/items', itemRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(` Servidor en http://localhost:${PORT}`));