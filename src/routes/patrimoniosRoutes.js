const express = require('express');
const router = express.Router();
const patrimoniosController = require('../controllers/patrimoniosController');

// Rota para criar um novo patrimônio
router.post('/', patrimoniosController.createPatrimonio);

// Rota para atualizar a saída de um patrimônio
router.put('/', patrimoniosController.updatePatrimonioSaida);

// Rota para obter todos os patrimônios
router.get('/', patrimoniosController.getAllPatrimonios);

// Rota para obter os últimos patrimônios cadastrados
router.get('/ultimos-patrimonios', patrimoniosController.getUltimosPatrimonios);

// Rota para obter entradas mensais
router.get('/entradas-mensais', patrimoniosController.getEntradasMensais);

// Rota para obter quantidades por tipo de equipamento
router.get('/quantidades-equipamentos', patrimoniosController.getEquipamentosQuantidades);

// Rota para obter porcentagem de ações realizadas
router.get('/acoes-porcentagem', patrimoniosController.getAcoesPorcentagem);

module.exports = router;
