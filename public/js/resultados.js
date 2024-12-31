let currentPage = 1;
const rowsPerPage = 6;
let tableData = [];

function formatarData(data) {
    if (!data) return 'Não registrado';

    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

function renderTable(page) {
    const tableBody = document.getElementById('patrimonioTableBody');
    tableBody.innerHTML = ''; 

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const rows = tableData.slice(startIndex, endIndex);

    rows.forEach(patrimonio => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patrimonio.nometecnico}</td>
            <td>${patrimonio.equipamento}</td>
            <td>${patrimonio.chamadoici}</td>
            <td>${patrimonio.acao}</td>
            <td>${formatarData(patrimonio.dataEntrada)}</td>
            <td>${formatarData(patrimonio.dataSaida)}</td>
            <td>${patrimonio.patrimonio}</td>
            <td>${patrimonio.local}</td>
        `;
        tableBody.appendChild(row);
    });

    updatePagination();
}

function updatePagination() {
    const pagination = document.getElementById('paginationControls');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(tableData.length / rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('btn', 'btn-outline-primary');
        if (i === currentPage) {
            button.classList.add('active');
        }
        button.onclick = () => {
            currentPage = i;
            renderTable(currentPage);
        };
        pagination.appendChild(button);
    }
}

async function carregarPatrimonios() {
    const filterDate = document.getElementById('filterDate').value;
    const filterTecnico = document.getElementById('filterTecnico').value;
    const filterChamadoICI = document.getElementById('filterChamadoICI').value;

    try {
        const response = await fetch('/api/patrimonios');
        if (!response.ok) {
            throw new Error('Erro ao carregar patrimônios');
        }
        tableData = await response.json();

        if (filterDate) {
            tableData = tableData.filter(patrimonio =>
                String(patrimonio.dataEntrada).startsWith(filterDate)
            );
        }
        if (filterTecnico) {
            tableData = tableData.filter(patrimonio =>
                patrimonio.nometecnico.toLowerCase().includes(filterTecnico.toLowerCase())
            );
        }
        if (filterChamadoICI) {
            tableData = tableData.filter(patrimonio =>
                patrimonio.chamadoici.toLowerCase().includes(filterChamadoICI.toLowerCase())
            );
        }

        currentPage = 1;
        renderTable(currentPage);
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao carregar patrimônios.');
    }
}

function gerarPlanilha(dados, nomeArquivo) {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Patrimonios');
    XLSX.writeFile(workbook, nomeArquivo);
}

function baixarPlanilhaFiltrada() {
    gerarPlanilha(tableData, 'patrimonios_filtrados.xlsx');
}

async function baixarPlanilhaCompleta() {
    try {
        const response = await fetch('/api/patrimonios');
        if (!response.ok) {
            throw new Error('Erro ao carregar patrimônios');
        }
        const allData = await response.json();
        gerarPlanilha(allData, 'todos_patrimonios.xlsx');
    } catch (error) {
        console.error('Erro ao baixar planilha completa:', error);
    }
}

document.getElementById('filterDate').addEventListener('input', carregarPatrimonios);
document.getElementById('filterTecnico').addEventListener('change', carregarPatrimonios);
document.getElementById('filterChamadoICI').addEventListener('input', carregarPatrimonios);
document.getElementById('downloadExcelFiltered').addEventListener('click', baixarPlanilhaFiltrada);
document.getElementById('downloadExcelAll').addEventListener('click', baixarPlanilhaCompleta);

document.addEventListener('DOMContentLoaded', carregarPatrimonios);
