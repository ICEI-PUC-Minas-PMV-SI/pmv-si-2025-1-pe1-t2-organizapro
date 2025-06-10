import { createModalController } from '../../core/modal.js';
import { formatarDataParaBR } from '../../utils/formatters.js';
import { obterProcedimentoPorId, obterHistoricoCompleto, obterProcedimentos } from './procedure-data.js';
import { abrirModalVisualizacao } from './procedure-view-modal.js';

let historicoModalController = null;
let fecharModalBtn = null;
let fecharModalIcon = null;
let historicoConteudo = null;

export function initProcedureVersionHistoryModal() {
    historicoModalController = createModalController("procedure-version-modal", "historicoVersoesTituloModal");
    if (!historicoModalController) return;

    historicoConteudo = document.getElementById("historicoVersoesConteudo");
    fecharModalBtn = document.getElementById("btn-fechar-historico");
    fecharModalIcon = document.getElementById("fechar-modal-historico");

    fecharModalBtn?.addEventListener("click", historicoModalController.fechar);
    fecharModalIcon?.addEventListener("click", historicoModalController.fechar);

    historicoModalController.definirCallbackDeLimpeza(() => {
        if (historicoConteudo) historicoConteudo.innerHTML = '';
    });
}

export function abrirModalHistoricoVersoes(procedimentoId) {
    if (!historicoModalController) {
        alert("Modal de histórico não está pronto.");
        return;
    }

    const procedimento = obterProcedimentoPorId(procedimentoId);
    if (!procedimento) {
        alert("Procedimento não encontrado.");
        return;
    }


    const todosProcedimentos = obterProcedimentos();
    const historico = obterHistoricoCompleto(procedimento, todosProcedimentos);

    if (!historico || historico.length === 0) {
        if (historicoConteudo) {
            historicoConteudo.innerHTML = "<p>Nenhuma versão vinculada encontrada.</p>";
        }
    } else {
        if (historicoConteudo) {
            historicoConteudo.innerHTML = historico.map(p => `
                <div class="versao-item">
                    <div class="versao-item-conteudo">
                        <p class="title"><strong>${p.titulo || 'Sem título'}</strong></p>
                        <p>Versão: ${p.versao || 'N/A'}</p>
                        <p>Status: <span class="status ${p.status?.toLowerCase() === "ativo" ? "ativo" : "inativo"}">${p.status || 'Indefinido'}</span></p>
                        <p>Última atualização: ${formatarDataParaBR(p.ultimaAtualizacao) || 'Não disponível'}</p>
                    </div>
                    <div class="versao-item-botoes">
                        <button class="button button--visualizar-versao" data-id="${p.id}" data-procedimento-id="${procedimentoId}">Visualizar versão</button>
                    </div>
                </div>
            `).join('');

            historicoConteudo.querySelectorAll('.button--visualizar-versao').forEach(btn => {
                btn.addEventListener('click', e => {
                    const idVersao = e.currentTarget.getAttribute('data-id');
                    const procId = e.currentTarget.getAttribute('data-procedimento-id');

                    // Fecha o modal de histórico de versões antes de abrir a visualização
                    historicoModalController.fechar();

                    // Abre o modal de visualização, passando o id da versão e o id do procedimento original
                    abrirModalVisualizacao(idVersao, procId);
                });
            });
        }
    }

    historicoModalController.setTitulo("Versões vinculadas");
    historicoModalController.abrir();
}