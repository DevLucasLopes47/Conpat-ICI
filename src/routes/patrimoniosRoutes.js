const express = require('express');
const router = express.Router();
const patrimoniosController = require('../controllers/patrimoniosController');

router.post('/', patrimoniosController.createPatrimonio);

router.put('/', patrimoniosController.updatePatrimonioSaida);

router.get('/', patrimoniosController.getAllPatrimonios);

router.get('/ultimos-patrimonios', patrimoniosController.getUltimosPatrimonios);

router.get('/entradas-mensais', patrimoniosController.getEntradasMensais);

router.get('/quantidades-equipamentos', patrimoniosController.getEquipamentosQuantidades);

router.get('/acoes-porcentagem', patrimoniosController.getAcoesPorcentagem);

module.exports = router;
