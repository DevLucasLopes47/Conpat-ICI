const patrimoniosService = require('../services/patrimoniosService');

// Criar um novo patrimônio
exports.createPatrimonio = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log para depuração
        const patrimonio = await patrimoniosService.createPatrimonio(req.body);
        res.status(201).json({ message: 'Patrimônio cadastrado com sucesso!', patrimonio });
    } catch (error) {
        console.error('Erro ao cadastrar patrimônio:', error); // Log para depuração
        res.status(500).json({ message: 'Erro ao cadastrar patrimônio.', error });
    }
};

// Atualizar a saída de um patrimônio
exports.updatePatrimonioSaida = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log para depuração
        const { patrimonio, dataSaida } = req.body;
        const result = await patrimoniosService.updatePatrimonioSaida(patrimonio, dataSaida);
        res.status(200).json({ message: 'Saída registrada com sucesso!', result });
    } catch (error) {
        console.error('Erro ao atualizar patrimônio:', error); // Log para depuração
        res.status(500).json({ message: 'Erro ao atualizar saída.', error });
    }
};

// Obter todos os patrimônios
exports.getAllPatrimonios = async (req, res) => {
    try {
        const patrimonios = await patrimoniosService.getAllPatrimonios();
        res.status(200).json(patrimonios);
    } catch (error) {
        console.error('Erro ao listar patrimônios:', error); // Log para depuração
        res.status(500).json({ message: 'Erro ao listar patrimônios.', error });
    }
};

// Obter os últimos patrimônios cadastrados
exports.getUltimosPatrimonios = async (req, res) => {
    try {
        const patrimonios = await patrimoniosService.getUltimosPatrimonios();
        res.status(200).json(patrimonios);
    } catch (error) {
        console.error('Erro ao listar últimos patrimônios:', error); // Log para depuração
        res.status(500).json({ message: 'Erro ao listar últimos patrimônios.', error });
    }
};

// Obter entradas mensais
exports.getEntradasMensais = async (req, res) => {
    try {
        const entradas = await patrimoniosService.getEntradasMensais();
        res.status(200).json(entradas);
    } catch (error) {
        console.error('Erro ao listar entradas mensais:', error); // Log para depuração
        res.status(500).json({ message: 'Erro ao listar entradas mensais.', error });
    }
};

// Obter quantidades por tipo de equipamento
exports.getEquipamentosQuantidades = async (req, res) => {
    try {
        const quantidades = await patrimoniosService.getEquipamentosQuantidades();
        res.status(200).json(quantidades);
    } catch (error) {
        console.error('Erro ao listar quantidades de equipamentos:', error);
        res.status(500).json({ message: 'Erro ao listar quantidades de equipamentos.' });
    }
};

// Obter porcentagem de ações realizadas
exports.getAcoesPorcentagem = async (req, res) => {
    try {
        const porcentagens = await patrimoniosService.getAcoesPorcentagem();
        res.status(200).json(porcentagens);
    } catch (error) {
        console.error('Erro ao listar porcentagens de ações:', error); // Log para depuração
        res.status(500).json({ message: 'Erro ao listar porcentagens de ações.', error });
    }
};
