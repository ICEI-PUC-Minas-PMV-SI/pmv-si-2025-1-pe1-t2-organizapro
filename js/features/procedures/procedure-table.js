// src/js/features/procedures/procedure-table.js

import {
    duplicarProcedimento,
    toggleFavorito,
    arquivarProcedimento,
    desarquivarProcedimento,
    excluirProcedimento,
    obterProcedimentos,
    obterProcedimentosFiltrados
} from './procedure-data.js';

import { setProcedimentoParaEdicao, setProcedimentoParaDuplicar } from './procedure-form.js';
import { formatarDataParaBR } from '/js/utils/formatters.js';
import { abrirModalVisualizacao } from './procedure-view-modal.js';
import { getTagColor } from '/js/utils/color-helpers.js';
import { abrirModalHistoricoVersoes } from './procedure-version-modal.js';

let procedureFilterManagerInstance = null;
export function setProcedureFilterManagerInstance(instance) {
    procedureFilterManagerInstance = instance;
}

let corpoTabela;

function renderizarEtiquetasAsChips(etiquetasArray) {
    if (!etiquetasArray || !Array.isArray(etiquetasArray) || etiquetasArray.length === 0) {
        return "indefinido";
    }
    const tagsValidas = etiquetasArray.filter(tag => tag && String(tag).trim() !== "");
    if (tagsValidas.length === 0) return "indefinido";

    return tagsValidas.map(tag => {
        const tagColor = getTagColor(tag);
        return `<span class="tag" style="background-color: ${tagColor};">${tag}</span>`;
    }).join(' ');
}

function handleFavoritoClick(event) {
    const id = event.currentTarget.dataset.id;
    toggleFavorito(id);
    if (procedureFilterManagerInstance) {
        renderizarProcedureTable(procedureFilterManagerInstance.activeFilters);
    } else {
        renderizarProcedureTable({}); 
    }
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
        setProcedimentoParaDuplicar(copia);
        if (procedureFilterManagerInstance) {
            renderizarProcedureTable(procedureFilterManagerInstance.activeFilters);
        } else {
            renderizarProcedureTable({});
        }
    } else {
        console.warn(`Procedimento com ID ${id} não encontrado para duplicação.`);
    }
}

function handleArquivarClick(event) {
    const id = event.currentTarget.dataset.id;
    if (confirm("Tem certeza que deseja arquivar este procedimento?")) {
        arquivarProcedimento(id);
        if (procedureFilterManagerInstance) {
            renderizarProcedureTable(procedureFilterManagerInstance.activeFilters);
        } else {
            renderizarProcedureTable({});
        }
    }
}

function handleDesarquivarClick(event) {
    const id = event.currentTarget.dataset.id;
    if (confirm("Deseja desarquivar este procedimento?")) {
        desarquivarProcedimento(id);
        if (procedureFilterManagerInstance) {
            renderizarProcedureTable(procedureFilterManagerInstance.activeFilters);
        } else {
            renderizarProcedureTable({});
        }
    }
}

function handleExcluirClick(event) {
    const id = event.currentTarget.dataset.id;
    if (confirm("Tem certeza que deseja excluir este procedimento permanentemente? Esta ação não pode ser desfeita.")) {
        excluirProcedimento(id);
        if (procedureFilterManagerInstance) {
            renderizarProcedureTable(procedureFilterManagerInstance.activeFilters);
        } else {
            renderizarProcedureTable({});
        }
    }
}

function handleVisualizarClick(event) {
    const id = event.currentTarget.dataset.id;
    abrirModalVisualizacao(id);
}

function handleVersoesClick(event) {
    const id = event.currentTarget.dataset.id;
    abrirModalHistoricoVersoes(id);
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
    } else if (target.classList.contains('desarquivar')) {
        handleDesarquivarClick({ currentTarget: target });
    } else if (target.classList.contains('excluir')) {
        handleExcluirClick({ currentTarget: target });
    } else if (target.classList.contains('visualizar')) {
        handleVisualizarClick({ currentTarget: target });
    } else if (target.classList.contains('versoes')) {
        handleVersoesClick({ currentTarget: target });
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

export function renderizarProcedureTable(filtros = {}) { 
    if (!corpoTabela) {
        console.error("Erro: renderizarProcedureTable chamado antes de initProcedureTable(). 'corpoTabela' não está definido.");
        return;
    }

    corpoTabela.innerHTML = "";

    const procedimentos = obterProcedimentosFiltrados(filtros);

    procedimentos.sort((a, b) => {
        const dataA = new Date(a.ultimaAtualizacao);
        const dataB = new Date(b.ultimaAtualizacao);
        return dataB - dataA; 
    });

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
        const mostrarBotaoVersoes = !!proc.idPai || (Array.isArray(proc.versoesFilhas) && proc.versoesFilhas.length > 0);


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

                ${mostrarBotaoVersoes ? `<button class="acao versoes" title="Versões" data-id="${proc.id}"><span class="material-symbols-outlined">database</span></button>` : ''}

                ${proc.status === "Ativo" ? `<button class="acao arquivar" title="Arquivar" data-id="${proc.id}"><span class="material-symbols-outlined">archive</span></button>` : `<button class="acao desarquivar" title="Reativar" data-id="${proc.id}"><span class="material-symbols-outlined">refresh</span></button>`}
                <button class="acao excluir" title="Excluir" data-id="${proc.id}">
                    <span class="material-symbols-outlined">delete_forever</span>
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

}