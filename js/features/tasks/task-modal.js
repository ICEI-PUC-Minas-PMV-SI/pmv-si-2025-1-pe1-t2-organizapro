import { salvarTarefa, obterTarefaPorId } from './task-data.js';
import { createModalController } from '../../utils/modal-controller.js';
import { initTagInputComponent } from '../../features/common/tag-input-component.js';
import { renderizarTarefas } from './tasks.js';
import { taskFilterManagerInstance } from './task-filters.js';
import { getUniqueTaskTags } from './task-data.js';

let taskForm = null;
let taskTitleInput = null;
let taskDueDateInput = null;
let taskStatusSelect = null;
let taskFormMessage = null;
let saveTaskButton = null;
let cancelTaskButton = null;
let taskFormModalController = null;

let taskTagsComponent = null;

let currentEditingTaskId = null;

function clearTaskForm() {
    if (taskTitleInput) taskTitleInput.value = '';
    if (typeof tinymce !== 'undefined' && tinymce.get('taskDescription')) {
        tinymce.get('taskDescription').setContent('');
    }
    if (taskDueDateInput) taskDueDateInput.value = '';
    if (taskStatusSelect) taskStatusSelect.value = 'a-fazer';
    if (taskFormMessage) {
        taskFormMessage.textContent = '';
        taskFormMessage.classList.remove('success', 'error');
    }
    if (taskTagsComponent) taskTagsComponent.clearTags();
    currentEditingTaskId = null;
    if (taskFormModalController?.setTitulo) {
        taskFormModalController.setTitulo('Nova Tarefa');
    }
}

function handleTaskFormSubmit(event) {
    event.preventDefault();

    const tags = taskTagsComponent ? taskTagsComponent.getTags() : [];
    console.log('Tags antes de salvar:', tags);

    const titulo = taskTitleInput?.value.trim() || '';
    const descricao = (typeof tinymce !== 'undefined' && tinymce.get('taskDescription'))
        ? tinymce.get('taskDescription').getContent({ format: 'html' }).trim()
        : '';
    const dataVencimento = taskDueDateInput?.value || '';
    const status = taskStatusSelect?.value || 'a-fazer';

    if (!titulo) {
        if (taskFormMessage) {
            taskFormMessage.textContent = 'O título da tarefa é obrigatório.';
            taskFormMessage.classList.add('error');
        }
        return;
    }

    const tarefaDados = {
        titulo,
        descricao,
        tags,
        dataVencimento,
        status,
        concluida: status === 'concluido'
    };

    const savedTask = salvarTarefa(tarefaDados, currentEditingTaskId);

    if (savedTask) {
        if (taskFormMessage) {
            taskFormMessage.textContent = `Tarefa "${savedTask.titulo}" ${currentEditingTaskId ? 'atualizada' : 'adicionada'} com sucesso!`;
            taskFormMessage.classList.remove('error');
            taskFormMessage.classList.add('success');
        }

        if (typeof window.updateAllTaskDisplays === 'function') {
            window.updateAllTaskDisplays();
        } else {
            renderizarTarefas(taskFilterManagerInstance?.activeFilters || {});
        }

        atualizarSugestoesDeTags();

        setTimeout(() => {
            taskFormModalController?.fechar();
            clearTaskForm();
        }, 1000);
    } else {
        if (taskFormMessage) {
            taskFormMessage.textContent = 'Erro ao salvar a tarefa.';
            taskFormMessage.classList.remove('success');
            taskFormMessage.classList.add('error');
        }
    }
}

export function initializeTaskFormElements() {
    if (taskTagsComponent) {
        return true;
    }

    taskForm = document.getElementById('taskForm');
    taskTitleInput = document.getElementById('taskTitle');
    taskDueDateInput = document.getElementById('taskDueDate');
    taskStatusSelect = document.getElementById('taskStatus');
    taskFormMessage = document.getElementById('taskFormMessage');
    saveTaskButton = document.getElementById('saveTaskButton');
    cancelTaskButton = document.getElementById('cancelTaskButton');

    const taskTagsElement = document.getElementById('taskTags');

    if (!taskForm || !taskTitleInput || !taskStatusSelect || !taskFormMessage || !saveTaskButton || !taskTagsElement) {
        console.error('Erro crítico: algum elemento do formulário de tarefa não foi encontrado.', {
            taskForm, taskTitleInput, taskStatusSelect, taskFormMessage, saveTaskButton, taskTagsElement
        });
        return false;
    }

    if (typeof tinymce !== 'undefined' && !tinymce.get('taskDescription')) {
        tinymce.init({
            selector: '#taskDescription',
            menubar: false,
            height: 200,
            plugins: 'lists link',
            toolbar: 'undo redo | bold italic | bullist numlist | link'
        });
    }

    taskFormModalController = createModalController('taskFormModal', 'taskFormModalTitle');
    if (!taskFormModalController) return false;

    taskTagsComponent = initTagInputComponent(
        'taskTags',
        'task-selected-tags-display',
        'task-tags-suggestions',
        'task-tags-container'
    );

    taskForm.addEventListener('submit', handleTaskFormSubmit);

    document.querySelector('#taskFormModal .fechar')?.addEventListener('click', () => {
        taskFormModalController.fechar();
        clearTaskForm();
    });

    cancelTaskButton?.addEventListener('click', () => {
        taskFormModalController.fechar();
        clearTaskForm();
    });

    taskFormModalController.definirCallbackDeLimpeza(clearTaskForm);

    window.taskTagsComponent = taskTagsComponent;
    console.log('taskTagsComponent inicializado:', taskTagsComponent);

    return true;
}

function atualizarSugestoesDeTags() {
    if (taskTagsComponent) {
        const tagsUnicas = getUniqueTaskTags();
        taskTagsComponent.atualizarSugestoes(tagsUnicas);
        console.log('Sugestões de tags atualizadas:', tagsUnicas);
    }
}

export function openTaskFormModal(taskId = null) {
    if (!taskFormModalController || !taskForm) {
        if (!initializeTaskFormElements()) {
            console.error("Erro ao inicializar elementos do formulário.");
            return;
        }
    }

    clearTaskForm();

    if (taskId) {
        const tarefa = obterTarefaPorId(taskId);
        if (tarefa) {
            currentEditingTaskId = taskId;
            taskFormModalController.setTitulo?.('Editar Tarefa');
            taskTitleInput.value = tarefa.titulo || '';
            tinymce?.get('taskDescription')?.setContent(tarefa.descricao || '');
            taskTagsComponent?.setTags(Array.isArray(tarefa.tags) ? tarefa.tags : []);
            taskDueDateInput.value = tarefa.dataVencimento?.split('T')[0] || '';
            taskStatusSelect.value = tarefa.status || 'a-fazer';
        } else {
            console.warn(`Tarefa com ID ${taskId} não encontrada.`);
        }
    } else {
        taskFormModalController.setTitulo?.('Nova Tarefa');
    }

    taskFormModalController.abrir();
}
