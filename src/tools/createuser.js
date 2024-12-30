const bcrypt = require('bcrypt');
const db = require('../models/db'); // Conexão ao banco de dados

// Função para criar um novo usuário
async function criarUsuario(username, password) {
    try {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const query = 'INSERT INTO usuarios (username, password_hash) VALUES (?, ?)';
        await db.query(query, [username, passwordHash]);
        console.log(`Usuário '${username}' criado com sucesso!`);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
    } finally {
        process.exit(); // Fecha o processo Node.js após execução
    }
}

// Substitua pelos dados desejados
const username = '';
const password = '';

// Chamada da função
criarUsuario(username, password);
