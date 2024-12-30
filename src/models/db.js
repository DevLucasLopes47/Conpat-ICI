const mysql = require('mysql2/promise');
const dbConfig = require('../../config/dbConfig');

const pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

(async function testConnection() {
    try {
        await pool.query('SELECT 1');
        console.log('Conexão bem-sucedida ao banco de dados!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
})();

module.exports = pool;
