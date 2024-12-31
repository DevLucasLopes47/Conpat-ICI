const db = require('./db');

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

exports.updatePatrimonioSaida = async (patrimonio, dataSaida) => {
    const query = `
        UPDATE patrimonios
        SET dataSaida = ?
        WHERE patrimonio = ?
    `;
    const [result] = await db.query(query, [dataSaida, patrimonio]);
    return result;
};

exports.selectAllPatrimonios = async () => {
    const query = `
        SELECT * FROM patrimonios
    `;
    const [rows] = await db.query(query);
    return rows;
};

exports.selectUltimosPatrimonios = async () => {
    const query = `
        SELECT * FROM patrimonios
        ORDER BY dataEntrada DESC
        LIMIT 5
    `;
    const [rows] = await db.query(query);
    return rows;
};

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

exports.selectAcoesPorcentagem = async () => {
    const query = `
        SELECT 
            acao, 
            COUNT(*) AS quantidade
        FROM patrimonios
        GROUP BY acao
    `;
    const [rows] = await db.query(query);

    const result = {};
    rows.forEach(row => {
        result[row.acao] = row.quantidade;
    });
    return result;
};
