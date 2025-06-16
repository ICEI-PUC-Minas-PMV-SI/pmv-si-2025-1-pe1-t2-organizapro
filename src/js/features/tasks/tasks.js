import {
    getTasks,
    excluirTarefa,
    toggleConcluida,
    atualizarStatusTarefa,
} from './task-data.js';

import { initializeTaskFormElements, openTaskFormModal } from './task-modal.js';

const QUADRO_SELECTORS = {
    'a-fazer': '#tasks-todo-list',
    'fazendo': '#tasks-doing-list',
    'concluido': '#tasks-done-list'
};

let tasksToDoList = null;
let tasksDoingList = null;
let tasksDoneList = null;

let draggedTaskId = null;

function createTaskCardHTML(tarefa) {
    const tagsHTML = (tarefa.tags && Array.isArray(tarefa.tags))
        ? tarefa.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')
        : '';
    const isChecked = tarefa.concluida ? 'checked' : '';
    const isDisabled = tarefa.concluida ? 'disabled' : '';
    const cardClass = tarefa.concluida ? 'tarefa-card concluida' : 'tarefa-card';
    const formattedDate = tarefa.dataVencimento ? new Date(tarefa.dataVencimento).toLocaleDateString('pt-BR') : '';

    return `
        <div class="${cardClass}" data-task-id="${tarefa.id}" draggable="true">
            <div class="tarefa-conteudo">
                <input type="checkbox" class="tarefa-check" ${isChecked} ${isDisabled}>
                <div class="tarefa-titulo">${tarefa.titulo || 'Sem título'}</div>
                ${tarefa.descricao ? `<p class="tarefa-descricao">${tarefa.descricao}</p>` : ''}
                <div class="tarefa-dados">
                    ${tagsHTML ? `<div class="tarefa-tags">${tagsHTML}</div>` : ''}
                    ${tarefa.dataVencimento ? `
                    <div class="tarefa-data">
                        <span class="material-symbols-outlined">schedule</span> ${formattedDate}
                    </div>` : ''}
                </div>
            </div>
            <div class="tarefa-acoes">
                <button class="edit-button" title="Editar Tarefa"><span class="material-symbols-outlined">edit</span></button>
                <button class="delete-button" title="Excluir Tarefa"><span class="material-symbols-outlined">delete</span></button>
            </div>
        </div>
    `;
}

export function renderizarTarefas(activeFilters = {}) {
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
    document.querySelectorAll('.tarefa-check').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const card = e.target.closest('.tarefa-card');
            toggleConcluida(card.dataset.taskId, e.target.checked);
            renderizarTarefas();
        });
    });

    document.querySelectorAll('.edit-button').forEach(btn => {
        btn.addEventListener('click', e => {
            const card = e.target.closest('.tarefa-card');
            openTaskFormModal(card.dataset.taskId);
        });
    });

    document.querySelectorAll('.delete-button').forEach(btn => {
        btn.addEventListener('click', e => {
            const card = e.target.closest('.tarefa-card');
            if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                excluirTarefa(card.dataset.taskId);
                renderizarTarefas();
            }
        });
    });

    document.querySelectorAll('.tarefa-card').forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });
}

function handleDragStart(e) {
    const card = e.target.closest('.tarefa-card');
    draggedTaskId = card.dataset.taskId;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', draggedTaskId);
    setTimeout(() => card.classList.add('dragging'), 0);
}

function handleDragEnd(e) {
    const card = e.target.closest('.tarefa-card');
    card.classList.remove('dragging');
    draggedTaskId = null;
}

function handleDragOver(e) {
    e.preventDefault();
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
            renderizarTarefas();
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
    });

    renderizarTarefas();
}
