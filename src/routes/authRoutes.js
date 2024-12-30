const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models/db'); // Conexão ao banco de dados
const router = express.Router();

// Rota de login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Busca o usuário no banco de dados
        const query = 'SELECT * FROM usuarios WHERE username = ?';
        const [rows] = await db.query(query, [username]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos!' });
        }

        const user = rows[0];

        // Compara a senha inserida com o hash armazenado
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos!' });
        }

        // Salva o usuário na sessão
        req.session.usuarioAutenticado = username;
        res.status(200).json({ message: 'Login bem-sucedido!' });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});

// Rota para obter informações do usuário logado
router.get('/me', (req, res) => {
    if (req.session.usuarioAutenticado) {
        res.status(200).json({ username: req.session.usuarioAutenticado });
    } else {
        res.status(401).json({ message: 'Usuário não autenticado' });
    }
});

// Rota de logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao encerrar a sessão.' });
        }
        res.status(200).json({ message: 'Logout bem-sucedido!' });
    });
});

module.exports = router;
