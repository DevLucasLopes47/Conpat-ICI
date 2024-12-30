// Alternar visibilidade do menu lateral
const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    content.classList.toggle('expanded');
});

// Função para carregar gráfico de entradas mensais
async function carregarGrafico() {
    try {
        const response = await fetch('/api/patrimonios/entradas-mensais');
        const dados = await response.json();

        const meses = dados.map(item => `${item.mes}/${item.ano}`);
        const entradas = dados.map(item => item.entradas);

        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Entradas Mensais',
                    data: entradas,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    } catch (error) {
        console.error('Erro ao carregar gráfico:', error);
    }
}

// Função para carregar últimos registros
async function carregarUltimosRegistros() {
    try {
        const response = await fetch('/api/patrimonios/ultimos-patrimonios');
        const registros = await response.json();

        const registrosContainer = document.getElementById('ultimos-registros-list');
        registrosContainer.innerHTML = '';

        // Exibir os três últimos registros
        registros.slice(-3).forEach(registro => {
            const registroCard = document.createElement('div');
            registroCard.className = 'list-group-item';
            registroCard.innerHTML = `
                <strong>Equipamento:</strong> ${registro.equipamento}<br>
                <strong>Local:</strong> ${registro.local}<br>
                <strong>Ação:</strong> ${registro.acao}<br>
            `;
            registrosContainer.appendChild(registroCard);
        });
    } catch (error) {
        console.error('Erro ao carregar últimos registros:', error);
    }
}

// Função para carregar quantidades de equipamentos
async function carregarQuantidades() {
    try {
        const response = await fetch('/api/patrimonios/quantidades-equipamentos');
        const data = await response.json();

        // Mapeia os dados retornados pela API para os IDs do DOM
        document.getElementById('computadores-quantidade').textContent = data.Computador || 0;
        document.getElementById('monitores-quantidade').textContent = data.Monitor || 0;
        document.getElementById('notebooks-quantidade').textContent = data.Notebook || 0;
    } catch (error) {
        console.error('Erro ao carregar quantidades de equipamentos:', error);
    }
}
// Função para carregar o nome do usuário logado
async function carregarUsuarioLogado() {
    try {
        const response = await fetch('/auth/me'); // Faz requisição para obter dados do usuário
        if (response.ok) {
            const data = await response.json();
            document.getElementById('nome-usuario').textContent = data.username; // Atualiza o DOM
        } else {
            // Se não estiver autenticado, redireciona para a tela de login
            window.location.href = '/html/tela.html';
        }
    } catch (error) {
        console.error('Erro ao carregar o usuário logado:', error);
        window.location.href = '/html/tela.html'; // Redireciona em caso de erro
    }
}

// Inicializar o carregamento de dados ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarUsuarioLogado(); // Carrega o usuário logado
    carregarGrafico(); // Já existente
    carregarUltimosRegistros(); // Já existente
    carregarQuantidades(); // Já existente
});

// Função para alternar menu (caso necessário)
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}
