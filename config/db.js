const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MySQLJuan',
    database: 'articulos'
});

db.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err.stack);
        return;
    }
    console.log('✅ Conectado a la base de datos');
});

module.exports = db;
