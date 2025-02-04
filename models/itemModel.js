const db = require('../config/db');

// Crear tabla si no existe
db.query(`
CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  quantity INT DEFAULT 0,
  price DECIMAL(10,2) NOT NULL
)`, err => {
    if (err) console.error('Error al crear la tabla:', err);
    else console.log(' Tabla lista');
});

// Inserto datos de prueba si la tabla esta vacia
db.query('SELECT COUNT(*) AS count FROM items', (err, result) => {
    if (err) return console.error('Error al verificar articulos:', err);
    if (result[0].count === 0) {
        db.query(`
        INSERT INTO items (name, description, quantity, price) VALUES 
        ('Laptop', 'Laptop de ultima generacion', 5, 1200.99),
        ('Telefono', 'Smartphone moderno', 10, 799.50),
        ('Teclado', 'Teclado mecanico RGB', 15, 99.99)`,
            err => err ? console.error('Error insertando articulos:', err) : console.log(' Articulos insertados')
        );
    }
});

// Funcion para obtener todos los articulos
const getAllItems = callback => {
    db.query('SELECT * FROM items', callback);
};

// Funcion para insertar un articulo
const addItem = (itemData, callback) => {
    db.query('INSERT INTO items SET ?', itemData, callback);
};

module.exports = { getAllItems, addItem };
