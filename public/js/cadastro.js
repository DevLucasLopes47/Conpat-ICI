document.getElementById('patrimonioForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nometecnico = document.getElementById('nometecnico').value;
    const equipamento = document.getElementById('equipamento').value;
    const chamadoici = document.getElementById('chamadoici').value;
    const acao = document.getElementById('acao').value;
    const dataEntrada = document.getElementById('Data-Entrada').value;
    const patrimonio = document.getElementById('patrimonio').value;
    const local = document.getElementById('local').value;

    if (!nometecnico || !equipamento || !chamadoici || !acao || !dataEntrada || !patrimonio || !local) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const patrimonioData = {
        nometecnico,
        equipamento,
        chamadoici,
        acao,
        dataEntrada,
        patrimonio,
        local,
        dataSaida: null
    };

    fetch('/api/patrimonios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patrimonioData)
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message || 'Patrimônio cadastrado com sucesso!');
            document.getElementById('patrimonioForm').reset();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao cadastrar patrimônio. Tente novamente.');
        });
});