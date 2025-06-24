// src/js/features/tasks/task-sidebar-modals.js

import {
    getTarefasDeHoje,
    getTarefasProximos7Dias,
    excluirTarefa,
    toggleConcluida,
    obterTarefaPorId
} from './task-data.js';

import { createModalController } from '../../utils/modal-controller.js';
import { openTaskFormModal } from './task-modal.js';

let tarefasDataModalController = null;
let modalDataTitleTextElement = null;

function createModalTaskCardHTML(tarefa) {
    const tagsHTML = (tarefa.tags && Array.isArray(tarefa.tags))
        ? tarefa.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')
        : '';
    const isChecked = tarefa.concluida ? 'checked' : '';
    const isDisabled = tarefa.concluida ? 'disabled' : '';
    const cardClass = tarefa.concluida ? 'modal-task-card concluida' : 'modal-task-card';
    const formattedDate = tarefa.dataVencimento ? new Date(tarefa.dataVencimento).toLocaleDateString('pt-BR') : '';

    const checkboxId = `task-check-${tarefa.id}`;

    return `
        <div class="${cardClass}" data-task-id="${tarefa.id}">

            <div class="modal-task-card__content">
                
                <div class="modal-task-card__header">

                    <div class="modal-task-card__title">
                        <h4>${tarefa.titulo || 'Sem título'}</h4>
                    </div>

                    <div class="modal-task-card__details">

                        <div class="modal-task-card__date">
                            ${tarefa.dataVencimento ? `
                            <span class="task-date">
                                <span class="material-symbols-outlined">schedule</span> ${formattedDate}
                            </span>` : ''}
                        </div>

                        <div class="modal-task-card__status">
                            <span class="material-symbols-outlined">error</span>
                            <span class="status-${tarefa.status.toLowerCase()}">${tarefa.status || 'Sem status'}</span>
                        </div>

                    </div>

                </div>

                ${tarefa.descricao ? `<p class="modal-task-card__description">${tarefa.descricao}</p>` : ''}

                <div class="task-meta">
                    ${tagsHTML ? `<span class="modal-task-card__tags">${tagsHTML}</span>` : ''}</div>
                </div>

                <div class="modal-task-card-actions">

                    <input id="${checkboxId}" type="checkbox" class="modal-task-card__checkbox-modal" ${isChecked} ${isDisabled} title="${tarefa.concluida ? 'Desmarcar como Concluída' : 'Marcar como Concluída'}"><label for="${checkboxId}"></label>

                <button class="edit-task-modal-btn" data-task-id="${tarefa.id}" title="Editar Tarefa">
                    <span class="material-symbols-outlined">edit</span>
                </button>

                <button class="delete-task-modal-btn" data-task-id="${tarefa.id}" title="Excluir Tarefa">
                    <span class="material-symbols-outlined">delete</span>
                </button>
                
            </div>
        </div>
    `;
}

function renderTasksInModal(tasks, containerId, badgeId, noTasksMsgId) {
    const container = document.getElementById(containerId);
    const badge = document.getElementById(badgeId);
    const noTasksElement = document.getElementById(noTasksMsgId);

    if (!container || !badge || !noTasksElement) {
        console.error(`Erro: Elementos do modal para renderização (${containerId}, ${badgeId}, ${noTasksMsgId}) não encontrados.`);
        return;
    }

    container.innerHTML = '';
    badge.textContent = tasks.length;

    if (tasks.length === 0) {
        noTasksElement.style.display = 'block';
    } else {
        noTasksElement.style.display = 'none';
        tasks.forEach(task => {
            const tempWrapper = document.createElement('div');
            tempWrapper.innerHTML = createModalTaskCardHTML(task);
            const taskCard = tempWrapper.firstElementChild;
            if (taskCard) {
                container.appendChild(taskCard);

                const taskId = task.id;
                const editButton = taskCard.querySelector('.edit-task-modal-btn');
                const deleteButton = taskCard.querySelector('.delete-task-modal-btn');
                const completeCheckbox = taskCard.querySelector('.task-card__checkbox-modal');

                if (editButton) {
                    editButton.addEventListener('click', () => {
                        if (tarefasDataModalController) {
                            tarefasDataModalController.fechar();
                        }
                        openTaskFormModal(taskId);
                    });
                }
                if (deleteButton) {
                    deleteButton.addEventListener('click', () => {
                        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                            excluirTarefa(taskId);
                            window.updateAllTaskDisplays();
                        }
                    });
                }
                if (completeCheckbox) {
                    completeCheckbox.addEventListener('change', (e) => {
                        toggleConcluida(taskId, e.target.checked);
                        window.updateAllTaskDisplays();

                        if (window.updateCurrentSidebarModal) {

                            if (tarefasDataModalController && tarefasDataModalController.currentFilter) {
                                updateCurrentSidebarModalView(tarefasDataModalController.currentFilter);
                            } else {
                                updateCurrentSidebarModalView(modalDataTitleTextElement.textContent.includes('Hoje') ? 'hoje' : '7dias');
                            }
                        }
                    });
                }
            }

        });
    }
}

function updateCurrentSidebarModalView(filtro) {
    let tasksToRender = [];

    if (tarefasDataModalController) {
        tarefasDataModalController.currentFilter = filtro;
    }

    if (filtro === 'hoje') {
        tasksToRender = getTarefasDeHoje();
        if (modalDataTitleTextElement) {
            modalDataTitleTextElement.textContent = 'Tarefas de Hoje';
        }
    } else if (filtro === '7dias') {
        tasksToRender = getTarefasProximos7Dias();
        if (modalDataTitleTextElement) {
            modalDataTitleTextElement.textContent = 'Próximos 7 Dias';
        }
    } else {
        tasksToRender = [];
        if (modalDataTitleTextElement) {
            modalDataTitleTextElement.textContent = '';
        }
    }

    renderTasksInModal(tasksToRender, 'tarefas-data-lista', 'badge-modal-data', 'no-tasks-data');
}

export function initModalButtons() {
    const btnHoje = document.getElementById('btn-tarefas-hoje');
    const btnProximos7Dias = document.getElementById('btn-tarefas-proximos-7-dias');

    tarefasDataModalController = createModalController('modal-task-sidebar', 'modal-data-title');

    if (!tarefasDataModalController) {
        console.error("Não foi possível inicializar o controlador do modal de tarefas por data. Verifique os IDs 'modal-task-sidebar' e 'modal-data-title' no HTML.");
        return;
    }

    modalDataTitleTextElement = document.getElementById('modal-data-title');

    tarefasDataModalController.definirCallbackDeLimpeza(() => {
        const container = document.getElementById('tarefas-data-lista');
        const noTasksDataElement = document.getElementById('no-tasks-data');
        const badge = document.getElementById('badge-modal-data');

        if (container) container.innerHTML = '';
        if (noTasksDataElement) noTasksDataElement.style.display = 'none';
        if (badge) badge.textContent = '0';
    });

    if (btnHoje) {
        btnHoje.addEventListener('click', () => {
            updateCurrentSidebarModalView('hoje');
            tarefasDataModalController.abrir();
        });
    }

    if (btnProximos7Dias) {
        btnProximos7Dias.addEventListener('click', () => {
            updateCurrentSidebarModalView('7dias');
            tarefasDataModalController.abrir();
        });
    }

    updateBadges();

    window.updateCurrentSidebarModal = updateCurrentSidebarModalView;
}

export function updateBadges() {
    const tasksToday = getTarefasDeHoje();
    const badgeHojeElement = document.getElementById('badge-hoje');
    if (badgeHojeElement) {
        badgeHojeElement.textContent = tasksToday.length;
    } else {
        console.warn("Elemento badgeHoje (ID 'badge-hoje') não encontrado.");
    }

    const tasksNext7Days = getTarefasProximos7Dias();
    const badgeProximos7DiasElement = document.getElementById('badge-proximos-7-dias');
    if (badgeProximos7DiasElement) {
        badgeProximos7DiasElement.textContent = tasksNext7Days.length;
    } else {
        console.warn("Elemento badgeProximos7Dias (ID 'badge-proximos-7-dias') não encontrado.");
    }
}