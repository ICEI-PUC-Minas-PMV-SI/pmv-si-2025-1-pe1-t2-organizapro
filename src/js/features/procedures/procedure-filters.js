// src/js/features/procedures/procedure-filters.js

import { FilterManager } from '../common/filter-controls.js';
import {
    obterEtiquetasUnicas,
    obterTiposUnicos,
    obterProcedimentos,
    obterProcedimentosFiltrados,
    toggleFavorito,
    arquivarProcedimento,
    desarquivarProcedimento,
    excluirProcedimento,
} from './procedure-data.js';

import { renderizarProcedureTable, setProcedureFilterManagerInstance } from './procedure-table.js';
import { formatarDataParaBR } from '../../utils/formatters.js';

let procedureSearchInput = null;
let procedureFavoriteButton = null;
let procedureClearAllFiltersButton = null;
let filterableHeaders = null;
let procedureFlatpickrInstance = null;

const procedureFilters = {
    busca: '',
    tipo: [],
    etiquetas: [],
    status: [],
    ultimaAtualizacao: null,
    favoritos: false,
};

function populateProcedureDropdowns() {
    const opcoesTipo = obterTiposUnicos();
    const opcoesEtiquetas = obterEtiquetasUnicas();
    const opcoesStatus = ['Ativo', 'Inativo'];

    const tipoDropdown = document.querySelector('th[data-filter-key="tipo"] .filtro-dropdown');
    if (tipoDropdown) tipoDropdown.innerHTML = createProcedureCheckboxOptions(opcoesTipo, 'tipo');

    const etiquetasDropdown = document.querySelector('th[data-filter-key="etiquetas"] .filtro-dropdown');
    if (etiquetasDropdown) etiquetasDropdown.innerHTML = createProcedureCheckboxOptions(opcoesEtiquetas, 'etiquetas');

    const statusDropdown = document.querySelector('th[data-filter-key="status"] .filtro-dropdown');
    if (statusDropdown) statusDropdown.innerHTML = createProcedureCheckboxOptions(opcoesStatus, 'status');

    const procedureDatepickerInput = document.getElementById('procedure-last-update-datepicker');
    const procedureClearDateFilterBtn = document.getElementById('procedure-clear-date-filter');

    if (procedureDatepickerInput && !procedureFlatpickrInstance) {
        if (typeof window.flatpickr !== 'function') {
            console.error("Flatpickr não está definido como uma função em `window.flatpickr`. Verifique se o script do Flatpickr foi carregado corretamente no HTML.");
            return;
        }

        procedureFlatpickrInstance = window.flatpickr(procedureDatepickerInput, {
            dateFormat: "Y-m-d",
            locale: "pt",
            onChange: function (selectedDates, dateStr) {
                procedureFilters.ultimaAtualizacao = selectedDates.length > 0 ? dateStr : null;
                renderizarProcedureTable(procedureFilters);
                fecharTodosProcedureDropdowns();
            },
            onReady: (selectedDates, dateStr, instance) => {

                if (procedureFilters.ultimaAtualizacao) {
                    instance.setDate(procedureFilters.ultimaAtualizacao, false);
                } else {
                    instance.clear();
                }
            }
        });
    }

    if (procedureClearDateFilterBtn) {
        procedureClearDateFilterBtn.addEventListener('click', () => {
            if (procedureFlatpickrInstance) procedureFlatpickrInstance.clear();
            procedureFilters.ultimaAtualizacao = null;
            renderizarProcedureTable(procedureFilters);
            fecharTodosProcedureDropdowns();
        });
    }


}

function createProcedureCheckboxOptions(options, filterKey) {
    if (!options || options.length === 0) return '<div class="filtro-sem-opcoes">Nenhuma opção</div>';
    return options.map(op => {
        const idOpcao = `proc-filtro-${filterKey}-${op.replace(/\s+/g, '-')}`;
        const isChecked = Array.isArray(procedureFilters[filterKey]) && procedureFilters[filterKey].includes(op) ? 'checked' : '';
        return `
            <label class="filtro-opcao custom-checkbox" for="${idOpcao}">
                <input type="checkbox" id="${idOpcao}" value="${op}" ${isChecked}>
                <span class="checkmark"></span>
                ${op}
            </label>
        `;
    }).join('');
}

function fecharTodosProcedureDropdowns() {
    document.querySelectorAll('.control-panel-table .filtro-dropdown').forEach((d) => {
        if (d.style.display === 'block') d.style.display = 'none';
    });
}

function resetAllProcedureFilters() {
    procedureFilters.busca = '';
    procedureFilters.tipo = [];
    procedureFilters.etiquetas = [];
    procedureFilters.status = [];
    procedureFilters.ultimaAtualizacao = null;
    procedureFilters.favoritos = false;

    if (procedureSearchInput) procedureSearchInput.value = '';

    if (procedureFavoriteButton) {
        procedureFavoriteButton.classList.remove('ativo');
        const icone = procedureFavoriteButton.querySelector(".material-symbols-outlined");
        if (icone) {
            icone.textContent = "favorite_border";
            icone.style.fontVariationSettings = "'FILL' 0";
        }
    }

    if (procedureFlatpickrInstance) procedureFlatpickrInstance.clear();

    if (filterableHeaders && filterableHeaders.length > 0) {
        filterableHeaders.forEach((th) => {
            const dropdown = th.querySelector('.filtro-dropdown');
            if (dropdown) {
                dropdown.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
            }
        });
    }

    renderizarProcedureTable(procedureFilters);
    fecharTodosProcedureDropdowns();
}


export function initProcedureFilters() {
    procedureSearchInput = document.getElementById('procedure-search-input');
    procedureFavoriteButton = document.getElementById('procedure-filtro-favoritos');
    procedureClearAllFiltersButton = document.getElementById('procedure-limpar-filtros');
    filterableHeaders = document.querySelectorAll('.control-panel-table .filterable');

    if (!procedureSearchInput) { console.error("initProcedureFilters: Elemento 'procedure-search-input' não encontrado."); return; }
    if (!procedureFavoriteButton) { console.error("initProcedureFilters: Elemento 'procedure-filtro-favoritos' não encontrado."); return; }
    if (!procedureClearAllFiltersButton) { console.error("initProcedureFilters: Elemento 'procedure-limpar-filtros' não encontrado."); return; }

    const initialProcedureFiltersForManager = { ...procedureFilters };
    const procedureFilterManagerInstance = new FilterManager({
        elements: {
            searchInputId: 'procedure-search-input',
            searchClearIconSelector: '.procedure-search-clear-icon',
            favoriteButtonId: 'procedure-filtro-favoritos',
            openFilterButtonId: 'dummy-proc-open-drawer',
            closeFilterButtonId: 'dummy-proc-close-drawer',
            applyFiltersButtonId: 'dummy-proc-apply-filters',
            clearAllFiltersButtonId: 'dummy-proc-clear-drawer-filters',
            drawerId: 'dummy-proc-drawer',
            overlayId: 'dummy-proc-overlay',
            chipsContainerId: 'dummy-proc-chips-container',
            filterOptionGroupIds: {}
        },
        callbacks: {
            getFilterOptions: () => ({}),
            onFilterChange: (activeFilters) => {
                procedureFilters.busca = activeFilters.busca;
                procedureFilters.favoritos = activeFilters.favoritos;
                renderizarProcedureTable(procedureFilters);
                if (procedureFlatpickrInstance) {
                    if (procedureFilters.ultimaAtualizacao) {
                        procedureFlatpickrInstance.setDate(procedureFilters.ultimaAtualizacao, false);
                    } else {
                        procedureFlatpickrInstance.clear();
                    }
                }
            },
            formatDate: formatarDataParaBR
        },
        initialFilters: initialProcedureFiltersForManager
    });
    setProcedureFilterManagerInstance(procedureFilterManagerInstance);



    populateProcedureDropdowns();


    if (filterableHeaders.length > 0) {
        filterableHeaders.forEach((th) => {
            const btnFiltro = th.querySelector('.btn-filtro');
            const dropdown = th.querySelector('.filtro-dropdown');

            if (!btnFiltro || !dropdown) return;

            btnFiltro.addEventListener('click', (event) => {
                event.stopPropagation();
                const isOpen = dropdown.style.display === 'block';
                fecharTodosProcedureDropdowns();
                dropdown.style.display = isOpen ? 'none' : 'block';
            });

            dropdown.addEventListener('change', (event) => {
                if (event.target.type === 'checkbox') {
                    const checkbox = event.target;
                    const filterKey = th.dataset.filterKey;
                    const optionValue = checkbox.value;

                    if (filterKey && procedureFilters.hasOwnProperty(filterKey) && Array.isArray(procedureFilters[filterKey])) {
                        const filterArray = procedureFilters[filterKey];
                        if (checkbox.checked) {
                            if (!filterArray.includes(optionValue)) filterArray.push(optionValue);
                        } else {
                            const index = filterArray.indexOf(optionValue);
                            if (index > -1) filterArray.splice(index, 1);
                        }
                        renderizarProcedureTable(procedureFilters);
                    }
                }
            });


        });
    }

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.control-panel-table .filterable') && !event.target.closest('.control-panel-table .filtro-dropdown')) {
            fecharTodosProcedureDropdowns();
        }
    });

    if (procedureClearAllFiltersButton) {
        procedureClearAllFiltersButton.addEventListener('click', () => {
            resetAllProcedureFilters();
            if (procedureFilterManagerInstance) {
                procedureFilterManagerInstance.resetAllFilters();
            }
        });
    }

    renderizarProcedureTable(procedureFilters);
} 