const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    content.classList.toggle('expanded');
});

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

async function carregarUltimosRegistros() {
    try {
        const response = await fetch('/api/patrimonios/ultimos-patrimonios');
        const registros = await response.json();

        const registrosContainer = document.getElementById('ultimos-registros-list');
        registrosContainer.innerHTML = '';
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

async function carregarQuantidades() {
    try {
        const response = await fetch('/api/patrimonios/quantidades-equipamentos');
        const data = await response.json();

        document.getElementById('computadores-quantidade').textContent = data.Computador || 0;
        document.getElementById('monitores-quantidade').textContent = data.Monitor || 0;
        document.getElementById('notebooks-quantidade').textContent = data.Notebook || 0;
    } catch (error) {
        console.error('Erro ao carregar quantidades de equipamentos:', error);
    }
}

async function carregarUsuarioLogado() {
    try {
        const response = await fetch('/auth/me'); 
        if (response.ok) {
            const data = await response.json();
            document.getElementById('nome-usuario').textContent = data.username; 
        } else {
            window.location.href = '/html/tela.html';
        }
    } catch (error) {
        console.error('Erro ao carregar o usuário logado:', error);
        window.location.href = '/html/tela.html'; 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarUsuarioLogado(); 
    carregarGrafico(); 
    carregarUltimosRegistros(); // 
    carregarQuantidades(); /
});

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}
