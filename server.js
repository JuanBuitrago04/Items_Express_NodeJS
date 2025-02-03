const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MySQLJuan',
    database: 'articulos'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) return console.error('Error de conexión:', err.stack);
    console.log('Conectado a la base de datos');

    // Creo la tabla 'items' si no existe
    db.query(`
    CREATE TABLE IF NOT EXISTS items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      quantity INT DEFAULT 0,
      price DECIMAL(10,2) NOT NULL
    )`, err => {
        if (err) return console.error('Error al crear la tabla:', err);
        console.log('Tabla lista');

        // Verifico si la tabla contiene articulos
        db.query('SELECT COUNT(*) AS count FROM items', (err, result) => {
            if (err) return console.error('Error al verificar articulos:', err);
            if (result[0].count === 0) { // Si la tabla esta vacia insertar algunos articulos de prueba
                db.query(`
            INSERT INTO items (name, description, quantity, price) VALUES 
            ('Laptop', 'Laptop de ultima generacion', 5, 1200.99),
            ('Telefono', 'Smartphone moderno', 10, 799.50),
            ('Teclado', 'Teclado mecanico RGB', 15, 99.99)`,
                    err => err ? console.error('Error insertando articulos:', err) : console.log('Articulos insertados')
                );
            }
        });
    });
});

// Ruta para agregar un nuevo articulo a la base de datos
app.post('/api/items', (req, res) => {
    db.query('INSERT INTO items SET ?', req.body, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al insertar' });
        res.status(201).json({ message: 'Artículo creado', id: result.insertId });
    });
});

// Ruta para obtener todos los articulos de la base de datos
app.get('/api/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener articulos' });
        res.json(results);
    });
});

// Inicio el servidor en el puerto 3000
app.listen(3000, () => console.log('Servidor en http://localhost:3000'));