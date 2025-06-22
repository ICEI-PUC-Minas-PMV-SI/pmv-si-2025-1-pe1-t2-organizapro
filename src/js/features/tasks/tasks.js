import {
    getTasks,
    excluirTarefa,
    toggleConcluida,
    atualizarStatusTarefa,
} from './task-data.js';

import { initializeTaskFormElements, openTaskFormModal } from './task-modal.js';

import { getTagColor } from '/src/js/utils/color-helpers.js';

const QUADRO_SELECTORS = {
    'a-fazer': '#tasks-todo-list',
    'fazendo': '#tasks-doing-list',
    'concluido': '#tasks-done-list'
};

let tasksToDoList = null;
let tasksDoingList = null;
let tasksDoneList = null;
let filtroAtivo = {};
let draggedTaskId = null;

function createTaskCardHTML(tarefa) {
    const tagsHTML = (tarefa.tags && Array.isArray(tarefa.tags))
        ? tarefa.tags.map(tag => {
            const cor = getTagColor(tag);
            return `<span class="tag" style="background-color: ${cor};">${tag}</span>`;
        }).join(' ')
        : '';

    const isChecked = tarefa.concluida ? 'checked' : '';
    const isDisabled = tarefa.concluida ? 'disabled' : '';
    const cardClass = tarefa.concluida ? 'task-card concluida' : 'task-card';
    const formattedDate = tarefa.dataVencimento ? new Date(tarefa.dataVencimento).toLocaleDateString('pt-BR') : '';

    const checkboxId = `task-check-${tarefa.id}`;

    return `
        <div class="${cardClass}" data-task-id="${tarefa.id}" draggable="true">
            <input type="checkbox" id="${checkboxId}" class="task-card__checkbox" ${isChecked} ${isDisabled}>
            <label for="${checkboxId}"></label>

            <div class="task-card__content">
                <div class="task-card__header">
                    <div class="task-card__title">${tarefa.titulo || 'Sem título'}</div>
                    ${tarefa.dataVencimento ? `
                    <div class="task-card__date">
                        <span class="material-symbols-outlined">schedule</span> ${formattedDate}
                    </div>` : ''}
                </div>

                ${tarefa.descricao ? `<div class="task-card__description task-description--truncated">${tarefa.descricao}</div>` : ''}

                ${tagsHTML ? `<div class="task-card__tags">${tagsHTML}</div>` : ''}
            </div>

            <div class="task-card__actions">
                <button class="toggle-description-btn" title="Expandir descrição">
                    <span class="material-symbols-outlined">visibility</span>
                </button>
                <button class="edit-button" title="Editar Tarefa">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="delete-button" title="Excluir Tarefa">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    `;
}

export function renderizarTarefas(activeFilters = filtroAtivo) {
    filtroAtivo = activeFilters;

    const tarefas = getTasks();

    Object.values(QUADRO_SELECTORS).forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.innerHTML = '';
    });

    function bateFiltroBusca(tarefa, busca) {
        if (!busca) return true;
        const termo = busca.toLowerCase();
        const titulo = tarefa.titulo?.toLowerCase() || '';
        const descricao = tarefa.descricao?.toLowerCase() || '';
        const tags = (tarefa.tags || []).join(' ').toLowerCase();
        return titulo.includes(termo) || descricao.includes(termo) || tags.includes(termo);
    }

    function bateFiltroEtiquetas(tarefa, etiquetasFiltro) {
        if (!etiquetasFiltro || etiquetasFiltro.length === 0) return true;
        return etiquetasFiltro.some(etq => (tarefa.tags || []).includes(etq));
    }

    function bateFiltroStatus(tarefa, statusFiltro) {
        if (!statusFiltro || statusFiltro.length === 0) return true;
        return statusFiltro.includes(tarefa.status);
    }

    function bateFiltroDataVencimento(tarefa, dataFiltro) {
        if (!dataFiltro) return true;
        if (!tarefa.dataVencimento) return false;
        const tarefaDate = new Date(tarefa.dataVencimento);
        const filtroDate = new Date(dataFiltro);
        return tarefaDate.toDateString() === filtroDate.toDateString();
    }

    tarefas.forEach(tarefa => {
        if (!bateFiltroBusca(tarefa, activeFilters.busca)) return;
        if (!bateFiltroEtiquetas(tarefa, activeFilters.etiquetas)) return;
        if (!bateFiltroStatus(tarefa, activeFilters.status)) return;
        if (!bateFiltroDataVencimento(tarefa, activeFilters.dataVencimento)) return;

        const boardElement = document.querySelector(QUADRO_SELECTORS[tarefa.status]);
        if (boardElement) {
            boardElement.innerHTML += createTaskCardHTML(tarefa);
        }
    });

    attachTaskEventListeners();
}

function attachTaskEventListeners() {
    document.querySelectorAll('.task-card__checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const card = e.target.closest('.task-card');
            toggleConcluida(card.dataset.taskId, e.target.checked);
            renderizarTarefas(filtroAtivo);
        });
    });

    document.querySelectorAll('.edit-button').forEach(btn => {
        btn.addEventListener('click', e => {
            const card = e.target.closest('.task-card');
            openTaskFormModal(card.dataset.taskId);
        });
    });

    document.querySelectorAll('.delete-button').forEach(btn => {
        btn.addEventListener('click', e => {
            const card = e.target.closest('.task-card');
            if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                excluirTarefa(card.dataset.taskId);
                renderizarTarefas(filtroAtivo);
            }
        });
    });

    document.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('dragenter', handleDragEnter);
        card.addEventListener('dragleave', handleDragLeave);
    });

    document.querySelectorAll('.toggle-description-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const card = e.target.closest('.task-card');
            const descriptionEl = card.querySelector('.task-card__description');
            const icon = btn.querySelector('.material-symbols-outlined');

            if (descriptionEl) {
                descriptionEl.classList.toggle('expanded');
                const isExpanded = descriptionEl.classList.contains('expanded');
                icon.textContent = isExpanded ? 'visibility_off' : 'visibility';
                btn.title = isExpanded ? 'Recolher descrição' : 'Expandir descrição';
            }
        });
    });

}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task-card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: -Infinity }).element;
}

function handleDragEnter(e) {
    e.preventDefault();
    if (e.target.classList.contains('task-card') || e.target.closest('.tarefa-board')) {
        e.currentTarget.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDragStart(e) {
    const card = e.target.closest('.task-card');
    draggedTaskId = card.dataset.taskId;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', draggedTaskId);
    setTimeout(() => card.classList.add('dragging'), 0);
}

function handleDragEnd(e) {
    const card = e.target.closest('.task-card');
    card.classList.remove('dragging');
    draggedTaskId = null;
}
function handleBoardDragEnter(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over-board');
}

function handleBoardDragLeave(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
        e.currentTarget.classList.remove('drag-over-board');
    }
}
function handleDragOver(e) {
    e.preventDefault();
    const container = e.currentTarget;
    const afterElement = getDragAfterElement(container, e.clientY);
    const dragging = document.querySelector('.dragging');

    if (dragging) {
        document.querySelectorAll('.task-card.drag-highlight').forEach(card => {
            card.classList.remove('drag-highlight');
            card.style.borderTop = '';
            card.style.borderBottom = '';
        });

        if (afterElement == null) {
            container.classList.add('drag-over-end');
        } else {
            container.classList.remove('drag-over-end');
            if (afterElement) {
                afterElement.classList.add('task-card-highlight');
            }
        }
    }
}

function handleDrop(e) {
    e.preventDefault();

    const container = e.currentTarget;
    const droppedTaskId = e.dataTransfer.getData('text/plain');

    if (!droppedTaskId) return;

    const newStatusKey = Object.keys(QUADRO_SELECTORS).find(
        key => QUADRO_SELECTORS[key] === `#${container.id}`
    );

    if (newStatusKey) {
        const atualizado = atualizarStatusTarefa(droppedTaskId, newStatusKey);
        if (atualizado) {
            if (window.updateAllTaskDisplays && typeof window.updateAllTaskDisplays === 'function') {
                window.updateAllTaskDisplays();
            } else {
                console.warn("window.updateAllTaskDisplays não está definida ou não é uma função. Chamando renderizarTarefas como fallback.");
                renderizarTarefas(filtroAtivo);
            }
        } else {
            console.error(`Não foi possível atualizar a tarefa ${droppedTaskId}`);
        }
    }
}

export function initTasksSection() {
    tasksToDoList = document.querySelector(QUADRO_SELECTORS['a-fazer']);
    tasksDoingList = document.querySelector(QUADRO_SELECTORS['fazendo']);
    tasksDoneList = document.querySelector(QUADRO_SELECTORS['concluido']);

    if (!tasksToDoList || !tasksDoingList || !tasksDoneList) {
        console.error('Containers de tarefas não encontrados no DOM.');
        return;
    }

    initializeTaskFormElements();

    const addBtn = document.getElementById('add-new-task-button');
    if (addBtn) {
        addBtn.addEventListener('click', () => openTaskFormModal(null));
    }

    [tasksToDoList, tasksDoingList, tasksDoneList].forEach(board => {
        board.addEventListener('dragover', handleDragOver);
        board.addEventListener('drop', handleDrop);
        board.addEventListener('dragenter', handleBoardDragEnter);
        board.addEventListener('dragleave', handleBoardDragLeave);
    });

    renderizarTarefas();
}
