// src/js/features/tasks/task-filters.js 

const flatpickr = window.flatpickr;
const Portuguese = window.flatpickr.l10ns.pt;

import { FilterManager, makePopoverDraggable } from '../common/filter-controls.js';
import { getUniqueTaskTags } from './task-data.js';
import { renderizarTarefas } from './tasks.js';
import { formatarDataParaBR } from '../../utils/formatters.js';

let taskFlatpickrInstance = null;
let taskFilterManagerInstance = null;
let isUpdatingFlatpickr = false;
let cleanupDragEvents = null;

const initialTaskFilters = {
    busca: '',
    etiquetas: [],
    status: [],
    dataVencimento: null,
    favoritos: false,
};

export function initTaskFilters() {
    if (cleanupDragEvents) {
        cleanupDragEvents();
    }

    taskFilterManagerInstance = new FilterManager({
        elements: {
            searchInputId: 'task-search-input',
            searchClearIconSelector: '#task-search-clear-icon',
            favoriteButtonId: 'task-filtro-favoritos',
            openFilterButtonId: 'task-btn-open-filters',
            closeFilterButtonId: 'task-btn-close-filters-popover',
            applyFiltersButtonId: 'task-aplicarFiltrosBtn',
            clearAllFiltersButtonId: 'task-limparFiltrosBtn',
            popoverId: 'task-filter-popover',
            overlayId: 'task-filter-sidebar-overlay',
            chipsContainerId: 'task-active-filters-container',
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
            onFilterChange: handleFilterChange,
            formatDate: formatarDataParaBR,
        },
        initialFilters: initialTaskFilters,
    });

    initFlatpickr();
    bindClearButtons();
    cleanupDragEvents = makePopoverDraggable('#task-filter-popover');


    renderizarTarefas(taskFilterManagerInstance.activeFilters);
}

function handleFilterChange(activeFilters) {
    renderizarTarefas(activeFilters);
    syncDatePickerWithFilter(activeFilters.dataVencimento);
}

function normalizarData(date) {
    if (!date) return null;
    const normalizada = new Date(date);
    normalizada.setHours(0, 0, 0, 0);
    return normalizada;
}

function initFlatpickr() {
    const input = document.getElementById('task-due-date-datepicker');
    if (!input) {
        console.warn('Input de data com id "task-due-date-datepicker" não encontrado.');
        return;
    }

    taskFlatpickrInstance = flatpickr(input, {
        dateFormat: "Y-m-d",
        locale: Portuguese,
        onChange: ([selected]) => {
            if (isUpdatingFlatpickr) return;
            const date = selected ? normalizarData(selected).toISOString() : null;
            taskFilterManagerInstance.setFilter('dataVencimento', date);
        },
        onReady: (selectedDates, dateStr, instance) => {
        },
    });

    if (taskFlatpickrInstance) {
        syncDatePickerWithFilter(taskFilterManagerInstance.activeFilters.dataVencimento);
    }
}

function syncDatePickerWithFilter(dateISO) {
    if (!taskFlatpickrInstance) return;

    isUpdatingFlatpickr = true;
    try {
        const localDate = normalizarData(dateISO);
        taskFlatpickrInstance.setDate(localDate, false);
    } finally {
        isUpdatingFlatpickr = false;
    }
}

function bindClearButtons() {
    const clearDateBtn = document.getElementById('task-clear-date-filter');
    if (clearDateBtn) {
        clearDateBtn.addEventListener('click', e => {
            e.preventDefault();
            clearDateFilter();
        });
    }
}

function clearDateFilter() {
    if (taskFlatpickrInstance) {
        taskFlatpickrInstance.clear();
    }
}

function clearAllFilters() {
    if (taskFlatpickrInstance) {
        taskFlatpickrInstance.clear();
    }
    taskFilterManagerInstance.resetAllFilters(true);
}

export { taskFilterManagerInstance };
