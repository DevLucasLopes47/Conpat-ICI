const db = require('./db');

// Inserir um novo patrimônio
exports.insertPatrimonio = async (data) => {
    const query = `
        INSERT INTO patrimonios (nometecnico, equipamento, chamadoici, acao, dataEntrada, patrimonio, local)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        data.nometecnico,
        data.equipamento,
        data.chamadoici,
        data.acao,
        data.dataEntrada,
        data.patrimonio,
        data.local,
    ];

    const [result] = await db.query(query, values);
    return result;
};

// Atualizar saída de um patrimônio
exports.updatePatrimonioSaida = async (patrimonio, dataSaida) => {
    const query = `
        UPDATE patrimonios
        SET dataSaida = ?
        WHERE patrimonio = ?
    `;
    const [result] = await db.query(query, [dataSaida, patrimonio]);
    return result;
};

// Selecionar todos os patrimônios
exports.selectAllPatrimonios = async () => {
    const query = `
        SELECT * FROM patrimonios
    `;
    const [rows] = await db.query(query);
    return rows;
};

// Selecionar os últimos patrimônios cadastrados
exports.selectUltimosPatrimonios = async () => {
    const query = `
        SELECT * FROM patrimonios
        ORDER BY dataEntrada DESC
        LIMIT 5
    `;
    const [rows] = await db.query(query);
    return rows;
};

// Selecionar entradas mensais
exports.selectEntradasMensais = async () => {
    const query = `
        SELECT 
            MONTH(dataEntrada) AS mes,
            YEAR(dataEntrada) AS ano,
            COUNT(*) AS entradas
        FROM patrimonios
        GROUP BY YEAR(dataEntrada), MONTH(dataEntrada)
        ORDER BY ano DESC, mes DESC
    `;
    const [rows] = await db.query(query);
    return rows;
};

// Selecionar quantidades por tipo de equipamento
exports.selectEquipamentosQuantidades = async () => {
    const query = `
        SELECT 
            equipamento, 
            COUNT(*) AS quantidade
        FROM patrimonios
        GROUP BY equipamento
    `;
    const [rows] = await db.query(query);

    const result = {};
    rows.forEach(row => {
        result[row.equipamento] = row.quantidade;
    });
    return result;
};


// Selecionar porcentagem de ações realizadas
exports.selectAcoesPorcentagem = async () => {
    const query = `
        SELECT 
            acao, 
            COUNT(*) AS quantidade
        FROM patrimonios
        GROUP BY acao
    `;
    const [rows] = await db.query(query);

    // Transformar os dados em um objeto
    const result = {};
    rows.forEach(row => {
        result[row.acao] = row.quantidade;
    });
    return result;
};
