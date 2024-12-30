# Conpat-ICI

## Visão Geral do Projeto
Conpat-ICI é uma solução completa para o gerenciamento de patrimônios dentro de organizações. Projetada com uma arquitetura modular e baseada em boas práticas, esta aplicação utiliza tecnologias modernas para oferecer funcionalidades robustas, seguras e escaláveis. Entre os principais recursos estão o controle de autenticação, dashboard dinâmico com gráficos, listagem de registros e interação direta com um banco de dados MySQL para gerenciamento seguro de informações.

---

## Estrutura de Diretórios

O projeto segue uma estrutura bem definida para separar responsabilidades e facilitar a manutenção e expansão:

```
project/
├── /src
│   ├── /routes
│   │   ├── authRoutes.js          # Gerenciamento de login, logout e validação de sessão
│   │   ├── patrimoniosRoutes.js   # Rotas relacionadas a patrimônios
│   ├── /controllers
│   │   ├── patrimoniosController.js # Controlador para lógica de negócio dos patrimônios
│   ├── /services
│   │   ├── patrimoniosService.js    # Funções de serviço e comunicação com o banco
│   ├── /models
│   │   ├── db.js                    # Configuração e inicialização do banco de dados
│   ├── /tools
│   │   ├── createUser.js            # Script para criar usuários com senhas criptografadas
│   ├── server.js                    # Configuração principal do servidor
├── /config
│   ├── dbConfig.js                  # Configuração do banco de dados com variáveis de ambiente
│   └── .env                         # Arquivo de variáveis de ambiente
├── /public
│   ├── /html
│   │   ├── tela.html                # Tela de login
│   │   ├── index.html               # Dashboard principal
│   ├── /css                         # Arquivos de estilo
│   ├── /js                          # Scripts de frontend
│       ├── index.js                 # Lógica do dashboard
│       ├── tela.js                  # Lógica de autenticação
├── package.json                     # Dependências e scripts do Node.js
├── README.md                        # Documentação principal do projeto
```

---

## Principais Funcionalidades

- **Autenticação Segura:**
  - Login baseado em sessão com validação de credenciais armazenadas no banco de dados.
  - Senhas criptografadas utilizando `bcrypt` para maior segurança.

- **Dashboard Dinâmico:**
  - Visualização de gráficos gerados dinamicamente com base nos dados do banco.
  - Listagem de registros recentes.
  - Exibição de estatísticas importantes como contagem de equipamentos.

- **Controle de Acesso:**
  - Todas as rotas e páginas são protegidas por middleware de autenticação.
  - Redirecionamento automático para a tela de login caso o usuário não esteja autenticado.

- **Banco de Dados:**
  - MySQL para armazenamento seguro e eficiente de dados.
  - Script dedicado para criação de usuários administradores.

---

## Tecnologias Utilizadas

- **Backend:**
  - Node.js com Express.
  - express-session para gerenciamento de sessões.
  - bcrypt para criptografia de senhas.
  - mysql2 para comunicação com o banco de dados.

- **Frontend:**
  - HTML5, CSS3, Bootstrap 4.5.
  - JavaScript puro para interações dinâmicas.

- **Banco de Dados:**
  - MySQL.

---

## Como Configurar o Projeto

### 1. Clonar o Repositório
```bash
git clone https://github.com/DevLucasLopes47/Conpat-ICI.git
cd Conpat-ICI
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na pasta `/config` com o seguinte conteúdo:
```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=conpat
DB_PORT=3306
SESSION_SECRET=sua_chave_secreta
```

### 4. Configurar o Banco de Dados
Execute o seguinte script SQL para criar a tabela de usuários:
```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
Comandos para criar tabela patrimonios
```sql
CREATE TABLE patrimonios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipamento VARCHAR(50) NOT NULL,       -- Nome do equipamento
    local VARCHAR(100) NOT NULL,            -- Local onde o equipamento está
    acao VARCHAR(100) NOT NULL,             -- Ação realizada
    dataEntrada DATE NOT NULL,              -- Data de entrada do equipamento
    nomeTecnico VARCHAR(100) NOT NULL,      -- Nome do técnico responsável
    chamadoIci VARCHAR(50) NOT NULL,        -- Número do chamado
    patrimonio VARCHAR(50) NOT NULL,        -- Número do patrimônio
    dataSaida DATE DEFAULT NULL             -- Data de saída do equipamento (pode ser NULL)
);
```

### 5. Criar Usuário Administrador
Utilize o script `createUser.js` para criar um usuário admin:
```bash
node src/tools/createUser.js
```

### 6. Iniciar o Servidor
```bash
node src/server.js
```
O servidor estará disponível em [http://localhost:3000](http://localhost:3000).

---

## Scripts Disponíveis

- **Criar Usuários:**
  Crie novos usuários com senhas criptografadas utilizando:
  ```bash
  node src/tools/createUser.js
  ```

- **Iniciar o Servidor:**
  Inicia o servidor local para desenvolvimento:
  ```bash
  node src/server.js
  ```

---

## Possíveis Melhorias

- Integração com APIs externas para relatórios detalhados.
- Implementação de testes automatizados com Jest ou Mocha.
- Melhorias no frontend utilizando frameworks modernos como React ou Vue.
- Sistema de permissões com diferentes níveis de acesso (admin, usuário regular, etc.).

---

