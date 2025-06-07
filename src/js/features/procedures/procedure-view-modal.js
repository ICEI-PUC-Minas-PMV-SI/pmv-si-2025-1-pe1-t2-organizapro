import { obterProcedimentoPorId } from './procedure-data.js';
import { createModalController } from '../../core/modal.js';
import { formatarDataParaBR } from '../../utils/formatters.js';
import { getTagColor } from '/src/js/utils/color-helpers.js';

let modalVisualizar, fecharVisualizarModalBtn, fecharVisualizarBtn;
let visualizarTitulo, visualizarDescricao, visualizarTipo, visualizarEtiquetas;
let visualizarStatus, visualizarUltimaAtualizacao, visualizarArquivoLink, visualizarArquivoNome, visualizarSemArquivo;
let viewModalController = null;

export function abrirModalVisualizacao(procedimentoId) {
    if (!viewModalController) {
        console.error("Modal de visualização não inicializado. Chame initProcedureViewModal() primeiro.");
        alert("Modal de visualização não está pronto. Recarregue a página.");
        return;
    }

    const procedimento = obterProcedimentoPorId(procedimentoId);

    if (!procedimento) {
        console.error(`Procedimento com ID ${procedimentoId} não encontrado.`);
        alert('Erro: Procedimento não encontrado. Recarregue a página.');
        return;
    }

    visualizarTitulo.textContent = procedimento.titulo || 'N/A';
    visualizarDescricao.innerHTML = procedimento.descricao || 'N/A';
    visualizarTipo.textContent = procedimento.tipo || 'N/A';
    visualizarEtiquetas.innerHTML = renderizarEtiquetasVisuaisAsChips(procedimento.etiquetas);
    visualizarStatus.textContent = procedimento.status || 'N/A';
    visualizarUltimaAtualizacao.textContent = formatarDataParaBR(procedimento.ultimaAtualizacao);

    if (procedimento.arquivo) {
        visualizarArquivoLink.href = `/uploads/${procedimento.arquivo}`;
        visualizarArquivoLink.textContent = `Visualizar / Download: ${procedimento.arquivo}`;
        visualizarArquivoLink.style.display = 'block';
        if (visualizarArquivoNome) visualizarArquivoNome.style.display = 'none';
        visualizarSemArquivo.style.display = 'none';
    } else {
        visualizarArquivoLink.href = '#';
        visualizarArquivoLink.style.display = 'none';
        if (visualizarArquivoNome) visualizarArquivoNome.style.display = 'none';
        visualizarSemArquivo.style.display = 'block';
    }

    viewModalController.abrir();
}

function fecharModalVisualizacao() {
    if (!viewModalController) return;

    viewModalController.fechar();

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

export function initProcedureViewModal() {
    viewModalController = createModalController('modal-visualizar-procedimento', 'visualizarTituloModal');
    if (!viewModalController) {
        console.error("Falha ao inicializar controlador do modal de visualização.");
        return;
    }

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

    fecharVisualizarModalBtn?.addEventListener('click', fecharModalVisualizacao);
    fecharVisualizarBtn?.addEventListener('click', fecharModalVisualizacao);
}

function renderizarEtiquetasVisuaisAsChips(etiquetasArray) {
    if (!Array.isArray(etiquetasArray) || etiquetasArray.length === 0) return "indefinido";

    const tagsValidas = etiquetasArray.filter(tag => tag && tag.trim() !== "");
    if (tagsValidas.length === 0) return "indefinido";

    return tagsValidas.map(tag => {
        const tagColor = getTagColor(tag);
        return `<span class="tag-chip-view-modal" style="background-color: ${tagColor};">${tag}</span>`;
    }).join(' ');
}
