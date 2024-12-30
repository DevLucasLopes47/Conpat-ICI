# Conpat-ICI

## Descrição
Conpat-ICI é uma aplicação web projetada para gerenciar patrimônios. Este sistema inclui funcionalidades de autenticação de usuário, visualização de relatórios, e dashboards dinâmicos que exibem informações como quantidades de equipamentos, gráficos e registros recentes.

---

## Estrutura do Projeto

```
project/
├── /src
│   ├── /routes
│   │   ├── authRoutes.js          # Rotas de autenticação (login, logout, validação)
│   │   ├── patrimoniosRoutes.js   # Rotas relacionadas aos patrimônios
│   ├── /controllers
│   │   ├── patrimoniosController.js # Lógica dos dados de patrimônio
│   ├── /services
│   │   ├── patrimoniosService.js    # Lógica de negócio e comunicação com o banco
│   ├── /models
│   │   ├── db.js                    # Configuração e conexão com o banco de dados
│   ├── /tools
│   │   ├── createUser.js            # Script para criar usuários no banco
│   ├── server.js                    # Configuração principal do servidor
├── /config
│   ├── dbConfig.js                  # Configurações do banco de dados (via .env)
│   └── .env                         # Variáveis de ambiente
├── /public
│   ├── /html
│   │   ├── tela.html                # Tela de login
│   │   ├── index.html               # Dashboard principal
│   ├── /css                         # Arquivos de estilo
│   ├── /js                          # Scripts frontend
│       ├── index.js                 # Lógica para o dashboard
│       ├── tela.js                  # Lógica para login
├── package.json                     # Dependências do projeto
├── README.md                        # Documentação do projeto
```

---

## Funcionalidades

- **Autenticação**:
  - Tela de login com validação de usuários (dados armazenados no banco de dados).
  - Sessões seguras para proteger rotas e conteúdo sensível.
- **Dashboard**:
  - Visualização de dados de equipamentos.
  - Gráficos dinâmicos gerados com base em dados do banco.
  - Listagem de registros recentes.
- **Controle de Acesso**:
  - Todas as rotas e páginas estão protegidas por autenticação.

---
## Visualizações do Sistema
<table>
  <tr>
    <td align="center" style="width: 300px; height: 300px;" colspan="2">
      <h3>Tela de Login</h3>
      <img src="https://github.com/user-attachments/assets/4890e602-4765-4d2a-8326-db7292157cae" style="width: 100%; height: auto;" alt="">
    </td>
  </tr>
  <tr>
    <td align="center" style="width: 300px; height: 300px;" colspan="2">
      <h3>Tela Inicial</h3>
      <img src="https://github.com/user-attachments/assets/b61dec15-3e70-4fef-8d3c-14cf5331c123" style="width: 100%; height: auto;" alt="">
    </td>
  </tr>
  <tr>
    <td align="center" style="width: 300px; height: 300px;"colspan="2">
      <h3>Tela de Entrada dos Equipamentos</h3>
      <img src="https://github.com/user-attachments/assets/7372dedc-6354-4d39-b8cc-29aa0c633b59" style="width: 100%; height: auto;" alt="">
    </td>
  </tr>
      <tr>
    <td align="center" style="width: 300px; height: 300px;"colspan="2">
      <h3>Tela de Saida dos Equipamentos</h3>
      <img src="https://github.com/user-attachments/assets/effeefe1-d23b-4b5d-949c-a91340647138" style="width: 100%; height: auto;" alt="">
    </td>
  </tr>
  <tr>
    <td align="center" style="width: 300px; height: 300px;"colspan="2">
      <h3>Tela de Visualização dos Equipamentos</h3>
      <img src="https://github.com/user-attachments/assets/7f0f030a-f7cd-4b29-83ff-8833f185d125" style="width: 100%; height: auto;" alt=""><br>
    </td>
     </tr>
  <tr>
    <td align="center" style="width: 300px; height: 300px;" colspan="2">
      <h3>Tela Dashboard</h3>
      <img src="https://github.com/user-attachments/assets/140bc4cf-eed0-4167-a1b1-f2382239fe4a" style="width: 100%; height: auto;" alt="">
    </td>
  </tr>
</table>

## Tecnologias Utilizadas

- **Backend**:
  - Node.js
  - Express
  - express-session
  - bcrypt (para criptografia de senhas)
  - mysql2 (para comunicação com o banco de dados)

- **Frontend**:
  - HTML5, CSS3
  - Bootstrap 4.5
  - JavaScript (vanilla)

- **Banco de Dados**:
  - MySQL

---

## Instalação

### 1. Clone o Repositório
```bash
git clone https://github.com/DevLucasLopes47/Conpat-ICI.git
cd Conpat-ICI
```

### 2. Configure o Ambiente
Crie o arquivo `.env` na pasta `/config` com as seguintes variáveis:
```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
DB_PORT=3306
SESSION_SECRET=sua_chave_secreta
```

### 3. Instale as Dependências
```bash
npm install
```

### 4. Configure o Banco de Dados
- Execute o script SQL para criar a tabela `usuarios`:
```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- Utilize o script `createUser.js` para criar um usuário admin:
```bash
node src/tools/createUser.js
```

---

## Uso

### 1. Inicie o Servidor
```bash
node src/server.js
```
O servidor estará rodando em [http://localhost:3000](http://localhost:3000).

### 2. Acesse o Sistema
- Abra o navegador e acesse `http://localhost:3000/html/tela.html`.
- Faça login com o usuário criado (ex.: admin/senha).

---

## Scripts Disponíveis

- **Criar Usuários**:
  ```bash
  node src/tools/createUser.js
  ```
  Cria um novo usuário no banco de dados com credenciais criptografadas.

- **Iniciar o Servidor**:
  ```bash
  node src/server.js
  ```
  Inicia o servidor para acessar o sistema.

---

## Melhorias Futuras

- Integração com APIs externas para relatórios.
- Melhorias no frontend com frameworks modernos (React/Vue).
- Implementação de testes automatizados para backend e frontend.
- Sistema de permissões para diferentes níveis de usuários.

---

## Contribuição

Contribuições são bem-vindas! Para contribuir:
1. Fork este repositório.
2. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça o commit de suas alterações:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Faça o push para a branch:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

---

## Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

