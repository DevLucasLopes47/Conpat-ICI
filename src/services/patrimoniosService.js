const patrimoniosModel = require('../models/patrimoniosModel');

exports.createPatrimonio = async (data) => {
    try {
        return await patrimoniosModel.insertPatrimonio(data);
    } catch (error) {
        console.error('Erro no serviço ao criar patrimônio:', error);
        throw error;
    }
};

exports.updatePatrimonioSaida = async (patrimonio, dataSaida) => {
    try {
        return await patrimoniosModel.updatePatrimonioSaida(patrimonio, dataSaida);
    } catch (error) {
        console.error('Erro no serviço ao atualizar saída do patrimônio:', error);
        throw error;
    }
};

exports.getAllPatrimonios = async () => {
    try {
        return await patrimoniosModel.selectAllPatrimonios();
    } catch (error) {
        console.error('Erro no serviço ao buscar todos os patrimônios:', error);
        throw error;
    }
};

exports.getUltimosPatrimonios = async () => {
    try {
        return await patrimoniosModel.selectUltimosPatrimonios();
    } catch (error) {
        console.error('Erro no serviço ao buscar últimos patrimônios:', error);
        throw error;
    }
};

exports.getEntradasMensais = async () => {
    try {
        return await patrimoniosModel.selectEntradasMensais();
    } catch (error) {
        console.error('Erro no serviço ao buscar entradas mensais:', error);
        throw error;
    }
};

exports.getEquipamentosQuantidades = async () => {
    return await patrimoniosModel.selectEquipamentosQuantidades();
};

exports.getAcoesPorcentagem = async () => {
    try {
        return await patrimoniosModel.selectAcoesPorcentagem();
    } catch (error) {
        console.error('Erro no serviço ao buscar porcentagens de ações:', error);
        throw error;
    }
};
