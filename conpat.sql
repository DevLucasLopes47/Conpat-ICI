CREATE DATABASE conpat;
USE conpat;

CREATE TABLE patrimonios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    responsavel VARCHAR(255) NOT NULL,
    usuario VARCHAR(255) NOT NULL,
    dataCadastro DATE NOT NULL,
    matricula VARCHAR(255) NOT NULL,
    matriculaAntiga VARCHAR(255),
    modelo VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    movimentacao VARCHAR(255) NOT NULL,
    secretaria VARCHAR(255)
);


    if (tableExists) {
      console.log('Tabela "patrimonios" existente');
    } else {
      // Cria a tabela se não existir
      await connection.execute(
        `CREATE TABLE patrimonios (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nometecnico VARCHAR(255) NOT NULL,
          equipamento VARCHAR(255) NOT NULL,
          chamadoici VARCHAR(255) NOT NULL,
          acao VARCHAR(255) NOT NULL,
          dataEntrada DATE NOT NULL,
          dataSaida DATE NOT NULL
          patrimonio VARCHAR(255) NOT NULL,
          local VARCHAR(255) NOT NULL
        )`
      );
      console.log('Tabela "patrimonios" criada com sucesso');
    }
