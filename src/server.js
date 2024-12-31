require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const app = express();

// Rotas do projeto
const patrimoniosRoutes = require('./routes/patrimoniosRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware para JSON e formulários
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Configuração de sessões
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'fallback-secret-key',
        resave: false,
        saveUninitialized: true,
    })
);

// Middleware de autenticação
app.use((req, res, next) => {
    const rotasPublicas = [
        '/auth/login',
        '/html/tela.html',
        '/auth/logout',
        '/css/',
        '/images/',
        '/js/',
    ];
    const isRotaPublica = rotasPublicas.some((rota) => req.path.startsWith(rota));

    if (isRotaPublica || req.session.usuarioAutenticado) {
        next();
    } else {
        res.redirect('/html/tela.html'); // Redireciona para a tela de login
    }
});

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas de patrimônio
app.use('/api/patrimonios', patrimoniosRoutes);

// Configuração para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Rota principal (raiz) direciona para a tela de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/tela.html'));
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
