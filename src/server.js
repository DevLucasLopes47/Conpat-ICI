require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const app = express();

const patrimoniosRoutes = require('./routes/patrimoniosRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'fallback-secret-key',
        resave: false,
        saveUninitialized: true,
    })
);

app.use((req, res, next) => {
    const rotasPublicas = ['/auth/login', '/html/tela.html', '/auth/logout', '/css/', '/images/', '/js/'];
    const isRotaPublica = rotasPublicas.some((rota) => req.path.startsWith(rota));

    if (isRotaPublica || req.session.usuarioAutenticado) {
        next();
    } else {
        res.redirect('/html/tela.html'); 
    }
});

app.use('/auth', authRoutes);

app.use('/api/patrimonios', patrimoniosRoutes);

app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
