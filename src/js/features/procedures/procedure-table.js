import {
    duplicarProcedimento,
    toggleFavorito,
    arquivarProcedimento,
    excluirProcedimento,
    obterProcedimentos, 
    obterProcedimentosFiltrados 
} from './procedure-data.js';

import { setProcedimentoParaEdicao } from './procedure-form.js';
import { atualizarTabela } from '../../features/common/filter-controls.js';
import { formatarDataParaBR, formatarEtiquetasParaExibicao } from '/src/js/utils/formatters.js';
import { abrirModalVisualizacao } from './procedure-view-modal.js';
import { getTagColor } from '/src/js/utils/color-helpers.js';

let corpoTabela; 

function renderizarEtiquetasAsChips(etiquetasArray) {
    if (!etiquetasArray || !Array.isArray(etiquetasArray) || etiquetasArray.length === 0) {
        return "indefinido"; 
    }
    const tagsValidas = etiquetasArray.filter(tag => tag && String(tag).trim() !== "");
    if (tagsValidas.length === 0) return "indefinido"; 

    return tagsValidas.map(tag => {
        const tagColor = getTagColor(tag); 
        return `<span class="tag-chip-table" style="background-color: ${tagColor};">${tag}</span>`;
    }).join(' '); 
}

function handleFavoritoClick(event) {
    const id = event.currentTarget.dataset.id;
    toggleFavorito(id);
    atualizarTabela();
}

function handleEditarClick(event) {
    const id = event.currentTarget.dataset.id;
    const procedimento = obterProcedimentos().find(p => p.id === id); 
    if (procedimento) {
        setProcedimentoParaEdicao(procedimento, false); 
    } else {
        console.warn(`Procedimento com ID ${id} não encontrado para edição.`);
    }
}

function handleDuplicarClick(event) {
    const id = event.currentTarget.dataset.id;
    const copia = duplicarProcedimento(id);
    if (copia) {
        setProcedimentoParaEdicao(copia, true); 
    } else {
        console.warn(`Procedimento com ID ${id} não encontrado para duplicação.`);
    }
}

function handleArquivarClick(event) {
    const id = event.currentTarget.dataset.id;
    if (confirm("Tem certeza que deseja arquivar este procedimento?")) {
        arquivarProcedimento(id);
        atualizarTabela();
    }
}

function handleExcluirClick(event) {
    const id = event.currentTarget.dataset.id;
    if (confirm("Tem certeza que deseja excluir este procedimento permanentemente? Esta ação não pode ser desfeita.")) {
        excluirProcedimento(id);
        atualizarTabela();
    }
}

function handleVisualizarClick(event) {
    const id = event.currentTarget.dataset.id;
    abrirModalVisualizacao(id); 
}

function handleTabelaClick(event) {
    const target = event.target.closest('button.acao, span.icon-favorito');
    if (!target) return;

    const id = target.dataset.id;
    if (!id) {
        console.warn("ID do procedimento não encontrado no elemento de ação.");
        return;
    }

    if (target.classList.contains('favorito') || target.classList.contains('icon-favorito')) {
        handleFavoritoClick({ currentTarget: target });
    } else if (target.classList.contains('editar')) {
        handleEditarClick({ currentTarget: target });
    } else if (target.classList.contains('duplicar')) {
        handleDuplicarClick({ currentTarget: target });
    } else if (target.classList.contains('arquivar')) {
        handleArquivarClick({ currentTarget: target });
    } else if (target.classList.contains('excluir')) {
        handleExcluirClick({ currentTarget: target });
    } else if (target.classList.contains('visualizar')) {
        handleVisualizarClick({ currentTarget: target });
    } else if (target.classList.contains('gerar-pdf')) {
        console.log(`Gerar PDF para ID: ${id}`);
    }
}

function adicionarEventosTabela() {
    if (!corpoTabela) {
        console.error("adicionarEventosTabela chamado antes da inicialização de corpoTabela.");
        return;
    }
    corpoTabela.removeEventListener('click', handleTabelaClick);
    corpoTabela.addEventListener('click', handleTabelaClick);
}

export function renderizarTabela(filtros = {}) {
    if (!corpoTabela) {
        console.error("Erro: renderizarTabela chamado antes de initProcedureTable(). 'corpoTabela' não está definido.");
        return;
    }

    corpoTabela.innerHTML = "";

    const procedimentos = obterProcedimentosFiltrados(filtros);

    if (!procedimentos.length) {
        corpoTabela.innerHTML = "<tr class='no-results-message'><td colspan='6'>Nenhum procedimento encontrado.</td></tr>";
        return;
    }

    procedimentos.forEach(proc => {
        const linha = document.createElement("tr");
        linha.dataset.id = proc.id;

        const tituloFormatado = proc.titulo || "indefinido";
        const tipoFormatado = proc.tipo || "indefinido";
        const etiquetasFormatadasHTML = renderizarEtiquetasAsChips(proc.etiquetas); 
        const dataFormatada = formatarDataParaBR(proc.ultimaAtualizacao);
        const statusFormatado = proc.status || "indefinido";

        linha.innerHTML = `
            <td>${tituloFormatado}</td>
            <td>${tipoFormatado}</td>
            <td>${etiquetasFormatadasHTML}</td>
            <td>${dataFormatada}</td>
            <td>${statusFormatado}</td>
            <td>
                <button class="acao visualizar" title="Visualizar" data-id="${proc.id}">
                    <span class="material-symbols-outlined">visibility</span>
                </button>
                <button class="acao favorito" title="Favoritar" data-id="${proc.id}">
                    <span class="material-symbols-outlined ${proc.favorito ? 'favorito-ativo' : ''}" style="font-variation-settings: 'FILL' ${proc.favorito ? 1 : 0};">
                        ${proc.favorito ? "favorite" : "favorite_border"}
                    </span>
                </button>
                <button class="acao editar" title="Editar" data-id="${proc.id}">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="acao duplicar" title="Duplicar" data-id="${proc.id}">
                    <span class="material-symbols-outlined">content_copy</span>
                </button>
                <button class="acao gerar-pdf" title="Gerar PDF" data-id="${proc.id}">
                    <span class="material-symbols-outlined">picture_as_pdf</span>
                </button>
                <button class="acao arquivar" title="Arquivar" data-id="${proc.id}">
                    <span class="material-symbols-outlined">archive</span>
                </button>
                <button class="acao excluir" title="Excluir" data-id="${proc.id}">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        `;

        corpoTabela.appendChild(linha);
    });

    adicionarEventosTabela(); 
}

export function initProcedureTable() {
    corpoTabela = document.getElementById("tabela-procedimentos");
    if (!corpoTabela) {
        console.error("Erro: initProcedureTable() chamado, mas o elemento 'tabela-procedimentos' não foi encontrado. Verifique o HTML.");
        return; 
    }

    adicionarEventosTabela();
}
