require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

// Inicialização do app
const app = express();

const patrimoniosRoutes = require('./routes/patrimoniosRoutes');
const authRoutes = require('./routes/authRoutes');

// Configuração de middleware
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

// Middleware global para proteger todas as rotas
app.use((req, res, next) => {
    const rotasPublicas = ['/auth/login', '/html/tela.html', '/auth/logout', '/css/', '/images/', '/js/'];
    const isRotaPublica = rotasPublicas.some((rota) => req.path.startsWith(rota));

    if (isRotaPublica || req.session.usuarioAutenticado) {
        next(); // Permite acesso às rotas públicas ou ao usuário autenticado
    } else {
        res.redirect('/html/tela.html'); // Redireciona para a tela de login
    }
});

// Rotas públicas para autenticação
app.use('/auth', authRoutes);

// Rotas protegidas da API
app.use('/api/patrimonios', patrimoniosRoutes);

// Servir arquivos estáticos (frontend protegido pelo middleware global)
app.use(express.static(path.join(__dirname, '../public')));

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
