// src/js/features/tasks/task-modal.js

import { salvarTarefa, obterTarefaPorId } from './task-data.js';
import { createModalController } from '../../utils/modal-controller.js';
import { initTagInputComponent } from '../../features/common/tag-input-component.js';

let taskForm = null;
let taskTitleInput = null;
let taskTagsInput = null;
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
    if (tinymce && tinymce.get('taskDescription')) tinymce.get('taskDescription').setContent('');
    if (taskDueDateInput) taskDueDateInput.value = '';
    if (taskStatusSelect) taskStatusSelect.value = 'a-fazer';
    if (taskFormMessage) {
        taskFormMessage.textContent = '';
        taskFormMessage.classList.remove('success', 'error');
    }
    if (taskTagsComponent) taskTagsComponent.clearTags();
    currentEditingTaskId = null;
    if (taskFormModalController && typeof taskFormModalController.setTitulo === 'function') {
        taskFormModalController.setTitulo('Nova Tarefa');
    }
}

function handleTaskFormSubmit(event) {
    event.preventDefault();

    const titulo = taskTitleInput?.value.trim() || '';
    const descricao = (tinymce && tinymce.get('taskDescription')) ? tinymce.get('taskDescription').getContent({ format: 'text' }).trim() : '';
    const tags = taskTagsComponent ? taskTagsComponent.getTags() : [];
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

        if (window.updateAllTaskDisplays) {
            window.updateAllTaskDisplays();
        } else {
            console.warn('window.updateAllTaskDisplays não está definida. Verifique a inicialização em main.js.');
        }

        setTimeout(() => {
            if (taskFormModalController) taskFormModalController.fechar();
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
    taskForm = document.getElementById('taskForm');
    taskTitleInput = document.getElementById('taskTitle');
    taskDueDateInput = document.getElementById('taskDueDate');
    taskStatusSelect = document.getElementById('taskStatus');
    taskFormMessage = document.getElementById('taskFormMessage');
    saveTaskButton = document.getElementById('saveTaskButton');
    cancelTaskButton = document.getElementById('cancelTaskButton');

    const taskTagsElement = document.getElementById('taskTags');

    if (!taskForm || !taskTitleInput || !taskStatusSelect || !taskFormMessage || !saveTaskButton || !taskTagsElement) {
        console.error('Erro crítico: algum elemento do formulário de tarefa não foi encontrado. Verifique os IDs no HTML.', {
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
    if (!taskFormModalController) {
        console.error('Erro crítico: não foi possível criar o controlador do modal para o formulário de tarefa.');
        return false;
    }

    taskForm.addEventListener('submit', handleTaskFormSubmit);

    const fecharButton = document.querySelector('#taskFormModal .fechar'); 
    if (fecharButton) {
        fecharButton.addEventListener('click', () => {
            taskFormModalController.fechar();
            clearTaskForm();
        });
    }

    if (cancelTaskButton) {
        cancelTaskButton.addEventListener('click', () => {
            taskFormModalController.fechar();
            clearTaskForm();
        });
    }

    taskFormModalController.definirCallbackDeLimpeza(clearTaskForm);

    taskTagsComponent = initTagInputComponent(
        'taskTags', 
        'task-selected-tags-display', 
        'task-tags-suggestions', 
        'task-tags-container' 
    );

    return true;
}

export function openTaskFormModal(taskId = null) {
    
    if (!taskFormModalController || !taskForm) {
        if (!initializeTaskFormElements()) {
            console.error("Não foi possível inicializar os elementos do formulário de tarefa. Abrir modal cancelado.");
            return;
        }
    }

    clearTaskForm(); 

    if (taskId) {
        const tarefa = obterTarefaPorId(taskId);
        if (tarefa) {
            currentEditingTaskId = taskId;
            if (taskFormModalController && typeof taskFormModalController.setTitulo === 'function') {
                taskFormModalController.setTitulo('Editar Tarefa');
            }
            if (taskTitleInput) taskTitleInput.value = tarefa.titulo || '';
            if (tinymce && tinymce.get('taskDescription')) tinymce.get('taskDescription').setContent(tarefa.descricao || '');
            if (taskTagsComponent && tarefa.tags && Array.isArray(tarefa.tags)) {
                taskTagsComponent.setTags(tarefa.tags);
            } else if (taskTagsComponent) {
                taskTagsComponent.clearTags();
            }
            if (taskDueDateInput) taskDueDateInput.value = tarefa.dataVencimento || '';
            if (taskStatusSelect) taskStatusSelect.value = tarefa.status || 'a-fazer';
        } else {
            console.warn(`Tarefa com ID ${taskId} não encontrada para edição. Abrindo como nova tarefa.`);
        }
    } else {
        if (taskFormModalController && typeof taskFormModalController.setTitulo === 'function') {
            taskFormModalController.setTitulo('Nova Tarefa');
        }
    }
    taskFormModalController.abrir();
}