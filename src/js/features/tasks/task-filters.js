// src/js/features/tasks/task-filters.js

const flatpickr = window.flatpickr;
const Portuguese = window.flatpickr.l10ns.pt;

import { FilterManager } from '../common/filter-controls.js';
import {
    getUniqueTaskTags,
    getTasks
} from './task-data.js';

import { renderizarTarefas } from './tasks.js';
import { formatarDataParaBR } from '../../utils/formatters.js';

let taskFlatpickrInstance = null;
let taskFilterManagerInstance = null;
let isUpdatingFlatpickrProgrammaticamente = false;

export function initTaskFilters() {
    const initialTaskFilters = {
        busca: '',
        etiquetas: [],
        status: [],
        ultimaAtualizacao: null,
        favoritos: false,
    };

    const taskDatepickerInput = document.getElementById('task-due-date-datepicker');
    const taskClearDateFilterBtn = document.getElementById('task-clear-date-filter');
    const taskClearAllFiltersBtn = document.getElementById('task-limparFiltrosBtn');

    taskFilterManagerInstance = new FilterManager({
        elements: {
            searchInputId: 'task-search-input',
            searchClearIconSelector: '.task-search-clear-icon',
            favoriteButtonId: 'task-filtro-favoritos',
            openFilterButtonId: 'task-btn-open-filters',
            closeFilterButtonId: 'task-btn-close-filters-popover',
            applyFiltersButtonId: 'task-aplicarFiltrosBtn',
            clearAllFiltersButtonId: 'task-limparFiltrosBtn',
            popoverId: 'task-filter-popover',
            overlayId: 'task-filter-sidebar-overlay',
            chipsContainerId: 'task-active-filters-chips-container',
            filterOptionGroupIds: {
                etiquetas: 'task-filter-etiquetas-options',
                status: 'task-filter-status-options',
            }
        },
        callbacks: {
            getFilterOptions: () => ({
                etiquetas: getUniqueTaskTags(),
                status: ['a-fazer', 'fazendo', 'concluido'],
            }),
            onFilterChange: (activeFilters) => {
                renderizarTarefas(activeFilters);
                if (taskFlatpickrInstance) {
                    isUpdatingFlatpickrProgrammaticamente = true;
                    try {
                        if (activeFilters.ultimaAtualizacao) {
                            taskFlatpickrInstance.setDate(activeFilters.ultimaAtualizacao, false);
                        } else {
                            taskFlatpickrInstance.clear();
                        }
                    } finally {
                        isUpdatingFlatpickrProgrammaticamente = false;
                    }
                }
            },
            formatDate: formatarDataParaBR
        },
        initialFilters: initialTaskFilters
    });

    window.taskFilterManagerInstance = taskFilterManagerInstance;

    if (taskDatepickerInput) {
        taskFlatpickrInstance = flatpickr(taskDatepickerInput, {
            dateFormat: "Y-m-d",
            locale: Portuguese,
            onChange: function (selectedDates, dateStr) {
                if (isUpdatingFlatpickrProgrammaticamente) return;

                taskFilterManagerInstance.filtrosEmEdicao.ultimaAtualizacao = selectedDates.length > 0 ? dateStr : null;
                taskFilterManagerInstance.applyFiltersRealTime();
            },
            onReady: (selectedDates, dateStr, instance) => {
                isUpdatingFlatpickrProgrammaticamente = true;
                try {
                    if (initialTaskFilters.ultimaAtualizacao) {
                        instance.setDate(initialTaskFilters.ultimaAtualizacao, false);
                    } else {
                        instance.clear();
                    }
                } finally {
                    isUpdatingFlatpickrProgrammaticamente = false;
                }
            }
        });
    } else {
        console.warn('Input de data com id "task-due-date-datepicker" não encontrado.');
    }

    if (taskClearDateFilterBtn) {
        taskClearDateFilterBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (taskFlatpickrInstance) {
                isUpdatingFlatpickrProgrammaticamente = true;
                try {
                    taskFlatpickrInstance.clear();
                } finally {
                    isUpdatingFlatpickrProgrammaticamente = false;
                }
            }
            taskFilterManagerInstance.filtrosEmEdicao.ultimaAtualizacao = null;
            taskFilterManagerInstance.applyFiltersRealTime();
        });
    }

    if (taskClearAllFiltersBtn) {
        taskClearAllFiltersBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (taskFlatpickrInstance) {
                isUpdatingFlatpickrProgrammaticamente = true;
                try {
                    taskFlatpickrInstance.clear();
                } finally {
                    isUpdatingFlatpickrProgrammaticamente = false;
                }
            }
            taskFilterManagerInstance.resetAllFilters();
        });
    }

    const popover = document.querySelector('.filter-popover');
    const header = document.querySelector('.filter-popover-header');

    if (popover && header) {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            const rect = popover.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                popover.style.left = `${e.clientX - offsetX}px`;
                popover.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.userSelect = '';
        });
    }

    renderizarTarefas(initialTaskFilters);
}