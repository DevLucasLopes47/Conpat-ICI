const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const app = express();

// Configurações do servidor
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

// Configuração do Banco de Dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'conpat',
};

// Função para obter conexão ao banco de dados
async function getConnection() {
    return mysql.createConnection(dbConfig);
}

// Middleware para autenticação
const authenticate = (req, res, next) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        req.session.authenticated = true;
        return next();
    }
    res.status(401).json({ message: 'Acesso negado' });
};

// Middleware para verificar sessão
const isAuthenticated = (req, res, next) => {
    if (req.session.authenticated) {
        return next();
    }
    res.redirect('/html/tela');
};

// Rotas do Sistema

// Tela de Login
app.post('/login', authenticate, (req, res) => {
    res.redirect('/html/index.html');
});

app.get('/html/tela', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'tela.html'));
});

app.get('/', (req, res) => {
    res.redirect('/html/tela');
});

app.get('/html/index.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Rota para adicionar patrimônio
app.post('/api/patrimonios', async (req, res) => {
    const { nometecnico, equipamento, chamadoici, acao, dataEntrada, patrimonio, local } = req.body;

    if (!nometecnico || !equipamento || !chamadoici || !acao || !dataEntrada || !patrimonio || !local) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const connection = await getConnection();
        const query = `
            INSERT INTO patrimonios (nometecnico, equipamento, chamadoici, acao, dataEntrada, patrimonio, local)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await connection.execute(query, [
            nometecnico,
            equipamento,
            chamadoici,
            acao,
            dataEntrada,
            patrimonio,
            local,
        ]);
        await connection.end();
        res.status(201).json({ message: 'Patrimônio cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar patrimônio:', error);
        res.status(500).json({ message: 'Erro ao cadastrar patrimônio.' });
    }
});

// Rota para atualizar saída de patrimônio
app.put('/api/patrimonios', async (req, res) => {
    const { patrimonio, dataSaida } = req.body;

    if (!patrimonio || !dataSaida) {
        return res.status(400).json({ message: 'Patrimônio e Data de Saída são obrigatórios.' });
    }

    try {
        const connection = await getConnection();
        const query = `
            UPDATE patrimonios
            SET dataSaida = ?
            WHERE patrimonio = ?
        `;
        const [result] = await connection.execute(query, [dataSaida, patrimonio]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Patrimônio não encontrado.' });
        }

        res.status(200).json({ message: 'Data de saída atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar saída:', error);
        res.status(500).json({ message: 'Erro ao atualizar saída.' });
    }
});

// Rota para listar patrimônios
app.get('/api/patrimonios', async (req, res) => {
    try {
        const connection = await getConnection();
        const [results] = await connection.query('SELECT * FROM patrimonios');
        await connection.end();
        res.json(results);
    } catch (error) {
        console.error('Erro ao listar patrimônios:', error);
        res.status(500).json({ message: 'Erro ao listar patrimônios.' });
    }
});

// Rota para obter últimos registros
app.get('/api/ultimos-patrimonios', async (req, res) => {
    try {
        const connection = await getConnection();
        const query = 'SELECT id, equipamento, local, acao FROM patrimonios ORDER BY id DESC LIMIT 8';
        const [results] = await connection.execute(query);
        await connection.end();
        res.json(results);
    } catch (err) {
        console.error('Erro ao obter últimos patrimônios:', err);
        res.status(500).json({ message: 'Erro ao obter últimos patrimônios' });
    }
});

// Rota para obter entradas mensais
app.get('/api/entradas-mensais', async (req, res) => {
    try {
        const connection = await getConnection();
        const query = `
            SELECT 
                MONTH(dataEntrada) AS mes, 
                YEAR(dataEntrada) AS ano, 
                COUNT(*) AS entradas
            FROM patrimonios
            GROUP BY ano, mes
            ORDER BY ano DESC, mes DESC
        `;
        const [results] = await connection.execute(query);
        await connection.end();
        res.json(results);
    } catch (err) {
        console.error('Erro ao obter dados das entradas mensais:', err);
        res.status(500).json({ message: 'Erro ao obter dados das entradas mensais' });
    }
});

// Rota para contagem de equipamentos
app.get('/api/quantidades-equipamentos', async (req, res) => {
    try {
        const connection = await getConnection();
        const query = `
            SELECT equipamento, COUNT(*) AS quantidade
            FROM patrimonios
            GROUP BY equipamento
        `;
        const [results] = await connection.execute(query);
        await connection.end();

        const response = { computadores: 0, monitores: 0, notebooks: 0 };
        results.forEach((item) => {
            const equipamento = item.equipamento.toLowerCase();
            if (equipamento.includes('computador')) response.computadores += item.quantidade;
            if (equipamento.includes('monitor')) response.monitores += item.quantidade;
            if (equipamento.includes('notebook')) response.notebooks += item.quantidade;
        });

        res.json(response);
    } catch (err) {
        console.error('Erro ao obter quantidades de equipamentos:', err);
        res.status(500).json({ message: 'Erro ao obter quantidades de equipamentos' });
    }
});
app.get('/api/acoes-porcentagem', async (req, res) => {
    try {
        const connection = await getConnection();
        const query = `
            SELECT acao, COUNT(*) AS quantidade
            FROM patrimonios
            GROUP BY acao
        `;
        const [results] = await connection.execute(query);
        await connection.end();

        const total = results.reduce((sum, item) => sum + item.quantidade, 0);
        const porcentagem = results.reduce((acc, item) => {
            acc[item.acao] = ((item.quantidade / total) * 100).toFixed(2);
            return acc;
        }, {});

        res.json(porcentagem);
    } catch (error) {
        console.error('Erro ao calcular porcentagem de ações:', error);
        res.status(500).json({ message: 'Erro ao calcular porcentagem de ações.' });
    }
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Inicializar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
