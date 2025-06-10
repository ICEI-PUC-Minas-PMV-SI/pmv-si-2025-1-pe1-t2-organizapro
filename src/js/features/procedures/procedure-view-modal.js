// procedure-view-modal.js:
import { obterProcedimentoPorId } from './procedure-data.js';
import { createModalController } from '../../core/modal.js';
import { formatarDataParaBR } from '../../utils/formatters.js';
import { getTagColor } from '/src/js/utils/color-helpers.js';
import { obterHistoricoCompleto, obterProcedimentos } from './procedure-data.js';

let fecharVisualizarModalBtn, fecharVisualizarBtn;
let visualizarTitulo, visualizarDescricao, visualizarTipo, visualizarEtiquetas;
let visualizarStatus, visualizarUltimaAtualizacao, visualizarArquivoLink, visualizarArquivoNome, visualizarSemArquivo;
let btnHistorico;
let viewModalController = null;
let modalVisualizar = null;

export async function abrirModalVisualizacao(procedimentoId, procedimentoIdOriginal = null) {
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

    if (btnHistorico) {
        const todosProcedimentos = obterProcedimentos();
        const historico = obterHistoricoCompleto(procedimento, todosProcedimentos);

        if (procedimentoIdOriginal) {
            btnHistorico.textContent = 'Voltar ao histórico';
            btnHistorico.style.display = 'inline-block';
            btnHistorico.onclick = async () => {
                fecharModalVisualizacao();
                try {
                    const { abrirModalHistoricoVersoes } = await import('./procedure-version-modal.js');
                    abrirModalHistoricoVersoes(procedimentoIdOriginal);
                } catch (error) {
                    console.error('Erro ao abrir modal histórico:', error);
                    alert('Não foi possível abrir o histórico de versões.');
                }
            };
        } else if (historico.length > 0) {
            btnHistorico.textContent = 'Ver histórico de versões';
            btnHistorico.style.display = 'inline-block';
            btnHistorico.onclick = async () => {
                fecharModalVisualizacao();
                try {
                    const { abrirModalHistoricoVersoes } = await import('./procedure-version-modal.js');
                    abrirModalHistoricoVersoes(procedimento.id);
                } catch (error) {
                    console.error('Erro ao abrir versões vinculadas:', error);
                    alert('Não foi possível abrir as versões vinculadas.');
                }
            };
        } else {
            btnHistorico.style.display = 'none';
            btnHistorico.onclick = null;
        }
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

    if (btnHistorico) {
        btnHistorico.style.display = 'none';
        btnHistorico.onclick = null;
    }
}

export function initProcedureViewModal() {
    viewModalController = createModalController('modal-visualizar-procedimento', 'visualizarTituloModal');
    if (!viewModalController) {
        console.error("Falha ao inicializar controlador do modal de visualização.");
        return;
    }

    btnHistorico = document.getElementById('btnHistorico');
    if (btnHistorico) {
        btnHistorico.style.display = 'none';
        console.log("Botão btnHistorico inicializado e oculto.");
    } else {
        console.error("ERRO: Botão com ID 'btnHistorico' não encontrado no DOM.");
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
        return `<span class="tag" style="background-color: ${tagColor};">${tag}</span>`;
    }).join(' ');
}