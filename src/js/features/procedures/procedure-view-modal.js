// js/features/procedures/procedure-view-modal.js

// Importa a função para buscar os dados completos de um procedimento pelo ID
import { obterProcedimentoPorId } from './procedure-data.js';

// Importa o módulo modal principal para usar sua função que CRIA um controlador de modal
import { createModalController } from '../../core/modal.js'; // <-- AGORA IMPORTA createModalController

// Importa as funções de formatação do novo módulo de utilitários
import { formatarDataParaBR, formatarEtiquetasParaExibicao } from '../../utils/formatters.js'; // <-- IMPORTA DE UTILS

import { getTagColor } from '/src/js/utils/color-helpers.js'; // <-- IMPORTAÇÃO DE color-helpers.js

// --- Variáveis para Referências aos Elementos DOM do Modal de Visualização (declaradas com 'let') ---
// Estas variáveis serão preenchidas dentro da função initProcedureViewModal().
let modalVisualizar;
let fecharVisualizarModalBtn;
let fecharVisualizarBtn;

let visualizarTitulo;
let visualizarDescricao;
let visualizarTipo;
let visualizarEtiquetas;
let visualizarStatus;
let visualizarUltimaAtualizacao;
let visualizarArquivoLink;
let visualizarArquivoNome;
let visualizarSemArquivo;

// NOVO: Instância específica do controlador do modal de visualização
let viewModalController = null; // Será atribuído em initProcedureViewModal


/**
 * Abre o modal de visualização e preenche com os dados do procedimento.
 * @param {string} procedimentoId O ID do procedimento a ser visualizado.
 */
export function abrirModalVisualizacao(procedimentoId) {
    // É crucial que 'viewModalController' já tenha sido inicializado
    if (!viewModalController) {
        console.error("Erro: O modal de visualização não foi inicializado. Chame initProcedureViewModal() primeiro.");
        alert("O modal de visualização não está pronto. Tente recarregar a página.");
        return;
    }

    const procedimento = obterProcedimentoPorId(procedimentoId);

    if (!procedimento) {
        console.error(`Procedimento com ID ${procedimentoId} não encontrado para visualização.`);
        alert('Erro: Procedimento não encontrado. Por favor, recarregue a página.');
        return;
    }

    // Preenche os elementos do modal com os dados do procedimento
    visualizarTitulo.textContent = procedimento.titulo || 'N/A';
    visualizarDescricao.innerHTML = procedimento.descricao || 'N/A';
    visualizarTipo.textContent = procedimento.tipo || 'N/A';
    visualizarEtiquetas.innerHTML = renderizarEtiquetasVisuaisAsChips(procedimento.etiquetas);
    visualizarStatus.textContent = procedimento.status || 'N/A';
    visualizarUltimaAtualizacao.textContent = formatarDataParaBR(procedimento.ultimaAtualizacao);

    // Lógica para o campo de documento anexado
    if (procedimento.arquivo) {
        visualizarArquivoLink.href = `/uploads/${procedimento.arquivo}`; // Ajuste o caminho do upload se necessário
        visualizarArquivoLink.textContent = `Visualizar / Download: ${procedimento.arquivo}`;
        visualizarArquivoLink.style.display = 'block'; // Mostra o link
        if (visualizarArquivoNome) visualizarArquivoNome.style.display = 'none'; // Garante que o span de nome (se usado) esteja oculto
        visualizarSemArquivo.style.display = 'none'; // Oculta a mensagem de "nenhum documento"
    } else {
        visualizarArquivoLink.href = '#';
        visualizarArquivoLink.style.display = 'none';
        if (visualizarArquivoNome) visualizarArquivoNome.style.display = 'none';
        visualizarSemArquivo.style.display = 'block'; // Mostra a mensagem de "sem arquivo"
    }
    
    // Exibe o modal usando a instância específica do controlador
    viewModalController.abrir();
}

/**
 * Fecha o modal de visualização.
 */
function fecharModalVisualizacao() {
    if (viewModalController) {
        viewModalController.fechar();
        // Limpar o conteúdo do modal ao fechar para evitar dados antigos visíveis brevemente
        visualizarTitulo.textContent = '';
        visualizarDescricao.innerHTML = '';
        visualizarTipo.textContent = '';
        visualizarEtiquetas.textContent = '';
        visualizarStatus.textContent = '';
        visualizarUltimaAtualizacao.textContent = '';
        visualizarArquivoLink.href = '#';
        visualizarArquivoLink.textContent = '';
        visualizarArquivoLink.style.display = 'none';
        if (visualizarArquivoNome) visualizarArquivoNome.style.display = 'none';
        visualizarSemArquivo.style.display = 'block';
    }
}

/**
 * Inicializa os event listeners para o modal de visualização.
 * Esta função deve ser chamada uma única vez pelo `script.js` (ou `app.js`)
 * APÓS o HTML do modal ter sido carregado no DOM.
 */
export function initProcedureViewModal() {
    // 1. INICIALIZA A INSTÂNCIA DO CONTROLADOR DO MODAL DE VISUALIZAÇÃO
    // IDs: 'modal-visualizar-procedimento' (container principal), 'visualizarTituloModal' (título dentro dele)
    viewModalController = createModalController('modal-visualizar-procedimento', 'visualizarTituloModal');
    if (!viewModalController) {
        console.error("Falha ao inicializar o controlador do modal de visualização. Verifique os IDs HTML e o DOM.");
        return; // Sai da função se o controlador não puder ser criado
    }

    // 2. CAPTURA AS REFERÊNCIAS DOM DOS ELEMENTOS ESPECÍFICOS DO MODAL DE VISUALIZAÇÃO AQUI DENTRO.
    // Atribui às variáveis 'let' declaradas no topo do arquivo.
    modalVisualizar = document.getElementById('modal-visualizar-procedimento');
    fecharVisualizarModalBtn = document.getElementById('fechar-visualizar-modal');
    fecharVisualizarBtn = document.getElementById('fechar-visualizar-btn');
    visualizarTitulo = document.getElementById('visualizarProcedimentoTitulo');
    visualizarDescricao = document.getElementById('visualizarProcedimentoDescricao');
    visualizarTipo = document.getElementById('visualizarProcedimentoTipo');
    visualizarEtiquetas = document.getElementById('visualizarProcedimentoEtiquetas');
    visualizarStatus = document.getElementById('visualizarProcedimentoStatus');
    visualizarUltimaAtualizacao = document.getElementById('visualizarProcedimentoUltimaAtualizacao');
    visualizarArquivoLink = document.getElementById('visualizarProcedimentoArquivo');
    visualizarArquivoNome = document.getElementById('visualizarProcedimentoArquivoNome');
    visualizarSemArquivo = document.getElementById('visualizarProcedimentoSemArquivo');

    // 3. Adiciona os event listeners
    if (fecharVisualizarModalBtn) {
        fecharVisualizarModalBtn.addEventListener('click', fecharModalVisualizacao);
    }
    if (fecharVisualizarBtn) {
        fecharVisualizarBtn.addEventListener('click', fecharModalVisualizacao);
    }
}

/**
 * Renderiza um array de etiquetas como chips HTML para exibição no modal de visualização.
 * @param {string[]} etiquetasArray O array de etiquetas.
 * @returns {string} O HTML das etiquetas formatadas como chips.
 */
function renderizarEtiquetasVisuaisAsChips(etiquetasArray) { // Nova função para visualização
    if (!etiquetasArray || !Array.isArray(etiquetasArray) || etiquetasArray.length === 0) {
        return "indefinido";
    }
    const tagsValidas = etiquetasArray.filter(tag => tag && String(tag).trim() !== "");
    if (tagsValidas.length === 0) return "indefinido";

    return tagsValidas.map(tag => {
        const tagColor = getTagColor(tag); // Obtém a cor
        // Usa a classe CSS para chips visuais (pode ser a mesma ou diferente da tabela)
        return '<span class="tag-chip-view-modal" style="background-color: ' + tagColor + ';">' + tag + '</span>';

    }).join(' '); // Espaço entre os chips
}