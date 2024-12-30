// Alternar menu lateral
const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    content.classList.toggle('shifted');
});

// Submissão do formulário de saída
const form = document.getElementById('patrimonioForm');
form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const patrimonio = document.getElementById('patrimonio').value;
    const dataSaida = document.getElementById('dataSaida').value;

    if (!patrimonio || !dataSaida) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    try {
        const response = await fetch('/api/patrimonios', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ patrimonio, dataSaida }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || 'Saída registrada com sucesso!');
            form.reset();
        } else {
            alert(result.message || 'Erro ao registrar a saída.');
        }
    } catch (error) {
        console.error('Erro ao registrar saída:', error);
        alert('Erro ao registrar saída. Tente novamente.');
    }
});
