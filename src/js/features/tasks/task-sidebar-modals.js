// src\js\features\tasks\task-sidebar-modals.js

import { 
    getTasks, 
    excluirTarefa, 
    toggleConcluida, 
    obterTarefaPorId, 
    getTarefasDeHoje, 
    getTarefasProximos7Dias 
} from './task-data.js';

import { formatarDataParaBR } from '../../utils/formatters.js'; 
import { createModalController } from '../../utils/modal-controller.js';
import { openTaskFormModal } from './task-modal.js'; 

let tarefasDataModalController = null;
let modalDataTitleTextElement = null;
let noTasksDataElement = null;

function createModalTaskCardHTML(tarefa) {
    const tagsHTML = (tarefa.tags && Array.isArray(tarefa.tags))
        ? tarefa.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')
        : '';
    const isChecked = tarefa.concluida ? 'checked' : '';
    const isDisabled = tarefa.concluida ? 'disabled' : '';
    const cardClass = tarefa.concluida ? 'modal-task-card concluida' : 'modal-task-card';
    const formattedDate = tarefa.dataVencimento ? new Date(tarefa.dataVencimento).toLocaleDateString('pt-BR') : ''; 

    return `
        <div class="${cardClass}" data-task-id="${tarefa.id}">
            <div class="modal-task-card-content">
                <div>
                    <h4>${tarefa.titulo || 'Sem título'}</h4>
                    ${tarefa.descricao ? `<p class="task-description">${tarefa.descricao}</p>` : ''}
                </div>
                <div class="task-meta">
                    ${tagsHTML ? `<span class="task-tags">${tagsHTML}</span>` : ''}
                    ${tarefa.dataVencimento ? `
                    <span class="task-date">
                        <span class="material-symbols-outlined">schedule</span> ${formattedDate}
                    </span>` : ''}
                    <span class="task-status status-${tarefa.status.toLowerCase()}">${tarefa.status || 'Sem status'}</span>
                </div>
            </div>
            <div class="modal-task-actions">
                <input type="checkbox" class="tarefa-check-modal" ${isChecked} ${isDisabled} title="${tarefa.concluida ? 'Desmarcar como Concluída' : 'Marcar como Concluída'}">
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
            const taskItemDiv = document.createElement('div');
            taskItemDiv.innerHTML = createModalTaskCardHTML(task);
            container.appendChild(taskItemDiv.firstElementChild); 

            const taskId = task.id; 
            const currentTaskCard = container.querySelector(`[data-task-id="${taskId}"]`);

            if (currentTaskCard) {
                const editButton = currentTaskCard.querySelector('.edit-task-modal-btn');
                const deleteButton = currentTaskCard.querySelector('.delete-task-modal-btn');
                const completeCheckbox = currentTaskCard.querySelector('.tarefa-check-modal');

                if (editButton) {
                    editButton.addEventListener('click', () => {
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
                    });
                }
            }
        });
    }
}

function updateCurrentSidebarModalView() {
    const currentTitle = modalDataTitleTextElement ? modalDataTitleTextElement.textContent : '';

    let tasksToRender = [];
    if (currentTitle === 'Tarefas de Hoje') {
        tasksToRender = getTarefasDeHoje(); 
    } else if (currentTitle === 'Próximos 7 Dias') {
        tasksToRender = getTarefasProximos7Dias(); 
    }
    
    if (currentTitle) { 
        renderTasksInModal(tasksToRender, 'tarefas-data-lista', 'badge-modal-data', 'no-tasks-data');
    }
}


export function initModalButtons() {
    const btnHoje = document.getElementById('btn-tarefas-hoje');
    const btnProximos7Dias = document.getElementById('btn-tarefas-proximos-7-dias');

    tarefasDataModalController = createModalController('modal-tasks-sidebar', 'modal-data-title');

    if (!tarefasDataModalController) {
        console.error("Não foi possível inicializar o controlador do modal de tarefas por data. Verifique os IDs 'modal-tasks-sidebar' e 'modal-data-title' no HTML.");
        return;
    }

    modalDataTitleTextElement = document.getElementById('modal-data-title-text');
    noTasksDataElement = document.getElementById('no-tasks-data');

    tarefasDataModalController.definirCallbackDeLimpeza(() => {
        if (noTasksDataElement) noTasksDataElement.style.display = 'none';
    });

    function updateBadges() {
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

    if (btnHoje) {
        btnHoje.addEventListener('click', () => {
            if (modalDataTitleTextElement) {
                modalDataTitleTextElement.textContent = 'Tarefas de Hoje';
            }
            updateCurrentSidebarModalView(); 
            tarefasDataModalController.abrir();
        });
    }

    if (btnProximos7Dias) {
        btnProximos7Dias.addEventListener('click', () => {
            if (modalDataTitleTextElement) {
                modalDataTitleTextElement.textContent = 'Próximos 7 Dias';
            }
            updateCurrentSidebarModalView(); 
            tarefasDataModalController.abrir();
        });
    }

    updateBadges();

    window.updateTaskBadges = updateBadges;
    window.updateCurrentSidebarModal = updateCurrentSidebarModalView;
}