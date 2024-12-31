    async function carregarDadosAvancados() {
        try {
            const totalEquipamentosRes = await fetch('/api/patrimonios');
            const totalEquipamentos = await totalEquipamentosRes.json();

            document.getElementById('total-equipamentos').textContent = totalEquipamentos.length;
            const ativos = totalEquipamentos.filter(e => !e.dataSaida).length;
            const saidas = totalEquipamentos.filter(e => e.dataSaida).length;

            document.getElementById('equipamentos-ativos').textContent = ativos;
            document.getElementById('saidas-registradas').textContent = saidas;
        } catch (error) {
            console.error('Erro ao carregar dados avançados:', error);
        }
    }

    async function carregarDistribuicaoPorTipo() {
        try {
            const res = await fetch('/api/patrimonios/quantidades-equipamentos');
            const data = await res.json();
            const labels = Object.keys(data);
            const valores = Object.values(data);

            new Chart(document.getElementById('pieChartDistribuicao'), {
                type: 'pie',
                data: {
                    labels,
                    datasets: [{
                        data: valores,
                        backgroundColor: ['#4D4DFF', '#FF6347', '#32CD32']
                    }]
                },
                options: { responsive: true }
            });
        } catch (error) {
            console.error('Erro ao carregar distribuição por tipo:', error);
        }
    }

    async function carregarPorcentagemAcoes() {
        try {
            const response = await fetch('/api/patrimonios/acoes-porcentagem');
            const data = await response.json();

            const labels = Object.keys(data);
            const valores = Object.values(data);

            new Chart(document.getElementById('pieChartAcoes'), {
                type: 'pie',
                data: {
                    labels,
                    datasets: [{
                        data: valores,
                        backgroundColor: ['#FF6347', '#4D4DFF', '#32CD32', '#FFD700']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    const total = valores.reduce((a, b) => a + b, 0);
                                    const percent = ((valores[tooltipItem.dataIndex] / total) * 100).toFixed(2);
                                    return `${labels[tooltipItem.dataIndex]}: ${percent}%`;
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Erro ao carregar porcentagem de ações:', error);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        carregarDadosAvancados();
        carregarDistribuicaoPorTipo();
        carregarPorcentagemAcoes();
    });
