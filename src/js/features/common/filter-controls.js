import { getTagColor } from '/src/js/utils/color-helpers.js';

class FilterManager {
    constructor(config) {
        this.#validateConfig(config);

        this.elements = config.elements;
        this.callbacks = config.callbacks;
        this.initialFilters = JSON.parse(JSON.stringify(config.initialFilters || this.#getDefaultFilters()));

        this.filtrosAtivos = { ...this.initialFilters };
        this.filtrosEmEdicao = { ...this.initialFilters };

        this.#init();
    }

    #getDefaultFilters() {
        return {
            busca: '',
            tipo: [],
            etiquetas: [],
            status: [],
            ultimaAtualizacao: null,
            dataVencimento: null,
            favoritos: false,
        };
    }

    #validateConfig(config) {
        const requiredCallbacks = ['getFilterOptions', 'onFilterChange', 'formatDate'];
        const isValidConfig = config && config.elements && config.callbacks &&
            requiredCallbacks.every(cb => typeof config.callbacks[cb] === 'function');

        if (!isValidConfig) {
            console.error("Configuração inválida para FilterManager. Verifique 'elements' e 'callbacks'.", config);
            throw new Error("Configuração inválida para FilterManager.");
        }
    }

    #init() {
        this.#cacheDOMElements();
        this.#bindEvents();
        this.renderActiveFilterChips();
    }

    #cacheDOMElements() {
        const {
            searchInputId, searchClearIconSelector, favoriteButtonId, openFilterButtonId,
            popoverId, closeFilterButtonId, applyFiltersButtonId, clearAllFiltersButtonId,
            overlayId, chipsContainerId, filterOptionGroupIds
        } = this.elements;

        this.inputBusca = document.getElementById(searchInputId);
        this.searchClearIcon = document.querySelector(searchClearIconSelector);
        this.btnFavoritos = document.getElementById(favoriteButtonId);
        this.btnOpenFilters = document.getElementById(openFilterButtonId);

        this.filterPopover = document.getElementById(popoverId);
        this.btnCloseFilters = document.getElementById(closeFilterButtonId);
        this.aplicarFiltrosBtn = document.getElementById(applyFiltersButtonId);
        this.limparFiltrosBtn = document.getElementById(clearAllFiltersButtonId);
        this.filterOverlay = overlayId ? document.getElementById(overlayId) : null;

        this.activeFiltersChipsContainer = document.getElementById(chipsContainerId);

        this.filterOptionGroups = {};
        for (const key in filterOptionGroupIds) {
            this.filterOptionGroups[key] = document.getElementById(filterOptionGroupIds[key]);
        }

        this.#logMissingElements();
    }

    #logMissingElements() {
        const requiredElements = {
            inputBusca: this.elements.searchInputId,
            searchClearIcon: this.elements.searchClearIconSelector,
            btnOpenFilters: this.elements.openFilterButtonId,
            filterPopover: this.elements.popoverId,
            activeFiltersChipsContainer: this.elements.chipsContainerId,
        };

        const missingElements = Object.entries(requiredElements)
            .filter(([prop, id]) => !this[prop])
            .map(([prop, id]) => `${prop}: ${id}`);

        if (missingElements.length > 0) {
            console.warn(`FilterManager: Alguns elementos DOM essenciais não foram encontrados para a instância ${this.elements.searchInputId}. Isso pode causar problemas:`, missingElements);
        }
    }

    #bindEvents() {
        this.#bindSearchEvents();
        this.#bindFavoriteButtonEvents();
        this.#bindPopoverToggleEvents();
        this.#bindPopoverFilterEvents();
        this.#bindActiveChipsEvents();
    }

    #bindSearchEvents() {
        if (!this.inputBusca) return;

        this.inputBusca.addEventListener('input', (e) => {
            this.filtrosAtivos.busca = e.target.value.toLowerCase();
            if (this.searchClearIcon) {
                this.searchClearIcon.style.display = e.target.value ? 'block' : 'none';
            }
            this.callbacks.onFilterChange(this.filtrosAtivos);
            this.renderActiveFilterChips();
        });

        if (this.searchClearIcon) {
            this.searchClearIcon.addEventListener('click', () => {
                this.inputBusca.value = '';
                this.filtrosAtivos.busca = '';
                this.searchClearIcon.style.display = 'none';
                this.callbacks.onFilterChange(this.filtrosAtivos);
                this.renderActiveFilterChips();
            });
        }

        this.inputBusca.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.inputBusca.blur();
            }
        });
    }

    #bindFavoriteButtonEvents() {
        if (this.btnFavoritos) {
            this.btnFavoritos.addEventListener('click', () => {
                this.filtrosAtivos.favoritos = !this.filtrosAtivos.favoritos;
                this.btnFavoritos.classList.toggle('ativo', this.filtrosAtivos.favoritos);
                const icone = this.btnFavoritos.querySelector(".material-symbols-outlined");
                if (icone) {
                    icone.textContent = this.filtrosAtivos.favoritos ? "favorite" : "favorite_border";
                    icone.style.fontVariationSettings = this.filtrosAtivos.favoritos ? "'FILL' 1" : "'FILL' 0";
                }
                this.callbacks.onFilterChange(this.filtrosAtivos);
                this.renderActiveFilterChips();
            });
        }
    }

    #bindPopoverToggleEvents() {
        if (this.btnOpenFilters && this.filterPopover) {
            this.btnOpenFilters.addEventListener('click', (event) => {
                event.stopPropagation();
                this.toggleFilterPopover(true);
            });
        }
        if (this.btnCloseFilters) {
            this.btnCloseFilters.addEventListener('click', () => this.toggleFilterPopover(false));
        }
        if (this.filterOverlay) {
            this.filterOverlay.addEventListener('click', () => this.toggleFilterPopover(false));
        }

        if (this.filterPopover) {
            document.addEventListener('click', (event) => {
                if (this.filterPopover.classList.contains('open') &&
                    !this.filterPopover.contains(event.target) &&
                    (!this.btnOpenFilters || !this.btnOpenFilters.contains(event.target))) {
                    this.toggleFilterPopover(false);
                }
            });
        }
    }

    #bindPopoverFilterEvents() {
        if (this.limparFiltrosBtn) {
            this.limparFiltrosBtn.addEventListener('click', () => {
                this.resetAllFilters(false);
            });
        }

        if (this.aplicarFiltrosBtn) {
            this.aplicarFiltrosBtn.addEventListener('click', () => this.applyFiltersFromPopover());
        }

        if (this.filterPopover) {
            this.filterPopover.addEventListener('change', (event) => {
                if (event.target.type === 'checkbox') {
                    const checkbox = event.target;
                    const { filterKey } = checkbox.dataset;
                    const { value: optionValue } = checkbox;

                    if (filterKey && this.filtrosEmEdicao.hasOwnProperty(filterKey) && Array.isArray(this.filtrosEmEdicao[filterKey])) {
                        const filterArray = this.filtrosEmEdicao[filterKey];
                        if (checkbox.checked) {
                            if (!filterArray.includes(optionValue)) filterArray.push(optionValue);
                        } else {
                            const index = filterArray.indexOf(optionValue);
                            if (index > -1) filterArray.splice(index, 1);
                        }
                        this.applyFiltersRealTime();
                    }
                }
            });

            this.filterPopover.addEventListener('click', (event) => {
                const targetButton = event.target.closest('button[data-filter-key]');
                if (targetButton && targetButton.tagName === 'BUTTON') {
                    const { valor: dataValue } = targetButton.dataset;
                    const { filterKey } = targetButton.dataset;

                    if (filterKey === 'ultimaAtualizacao') {
                        const parentGroup = targetButton.closest('.filter-options-group');
                        parentGroup?.querySelectorAll('button').forEach(btn => btn.classList.remove('ativo'));
                        targetButton.classList.add('ativo');
                        this.filtrosEmEdicao.ultimaAtualizacao = dataValue || null;
                        this.applyFiltersRealTime();
                    }
                }
            });
        }
    }

    #bindActiveChipsEvents() {
        if (this.activeFiltersChipsContainer) {
            this.activeFiltersChipsContainer.addEventListener('click', (e) => {
                const clearIcon = e.target.closest('.material-symbols-outlined[data-clear-key]');
                if (clearIcon) {
                    const keyToRemove = clearIcon.dataset.clearKey;
                    const valueToRemove = clearIcon.dataset.clearValue;

                    if (!this.filtrosAtivos.hasOwnProperty(keyToRemove)) return;

                    if (keyToRemove === 'etiquetas' && valueToRemove) {
                        const index = this.filtrosAtivos.etiquetas.indexOf(valueToRemove);
                        if (index > -1) {
                            this.filtrosAtivos.etiquetas.splice(index, 1);
                        }
                    } else if (Array.isArray(this.filtrosAtivos[keyToRemove])) {
                        this.filtrosAtivos[keyToRemove] = [];
                    } else {
                        this.filtrosAtivos[keyToRemove] = this.initialFilters[keyToRemove] ?? null;
                    }

                    Object.assign(this.filtrosEmEdicao, this.filtrosAtivos);
                    this.callbacks.onFilterChange(this.filtrosAtivos);
                    this.renderActiveFilterChips();
                    this.populatePopoverUI();
                }
            });

        }
    }

    toggleFilterPopover(open) {
        if (!this.filterPopover) return;

        if (open) {
            Object.assign(this.filtrosEmEdicao, this.filtrosAtivos);
            this.populatePopoverUI();
            this.filterPopover.classList.add('open');
            this.filterOverlay?.classList.add('open'); 
        } else {
            this.filterPopover.classList.remove('open');
            this.filterOverlay?.classList.remove('open'); 
        }
    }

    populatePopoverUI() {
        if (!this.callbacks.getFilterOptions) {
            console.error("FilterManager: 'getFilterOptions' callback não fornecido.");
            return;
        }

        const optionsData = this.callbacks.getFilterOptions();

        for (const key in this.filterOptionGroups) {
            const container = this.filterOptionGroups[key];
            if (container) {
                if (key !== 'ultimaAtualizacao') {
                    container.innerHTML = optionsData[key] && optionsData[key].length > 0
                        ? this.createCheckboxOptions(optionsData[key], key)
                        : '<div class="filtro-sem-opcoes">Nenhuma opção disponível</div>';
                }
            }
        }

        const ultimaAtualizacaoGroup = this.filterOptionGroups.ultimaAtualizacao;
        if (ultimaAtualizacaoGroup) {
            ultimaAtualizacaoGroup.querySelectorAll('button[data-valor]').forEach(btn => {
                if (btn.dataset.valor === this.filtrosEmEdicao.ultimaAtualizacao) {
                    btn.classList.add('ativo');
                } else {
                    btn.classList.remove('ativo');
                }
            });
        }
    }

    createCheckboxOptions(options, filterKey) {
        if (!options || options.length === 0) return '<div class="filtro-sem-opcoes">Nenhuma opção</div>';
        return options.map(op => {
            const idOpcao = `filtro-${filterKey}-${op.replace(/\s+/g, '-')}-${Math.random().toString(36).substr(2, 9)}`;
            const isChecked = Array.isArray(this.filtrosEmEdicao[filterKey]) && this.filtrosEmEdicao[filterKey].includes(op) ? 'checked' : '';
            return `
                <label class="filtro-opcao custom-checkbox" for="${idOpcao}">
                    <input type="checkbox" id="${idOpcao}" value="${op}" ${isChecked} data-filter-key="${filterKey}">
                    <span class="checkmark"></span>
                    ${op}
                </label>
            `;
        }).join('');
    }

    applyFiltersRealTime() {
        Object.assign(this.filtrosAtivos, this.filtrosEmEdicao);
        this.callbacks.onFilterChange(this.filtrosAtivos);
        this.renderActiveFilterChips();
    }

    applyFiltersFromPopover() {
        console.log('applyFiltersFromPopover chamado');


        Object.assign(this.filtrosAtivos, this.filtrosEmEdicao);
        this.callbacks.onFilterChange(this.filtrosAtivos);
        this.renderActiveFilterChips();
        this.toggleFilterPopover(false);
    }

    resetAllFilters(closePopover = true) {
        console.log('Estado inicialFilters antes do reset:', this.initialFilters);

        this.filtrosAtivos = JSON.parse(JSON.stringify(this.initialFilters));
        this.filtrosEmEdicao = JSON.parse(JSON.stringify(this.initialFilters));

        this.filtrosAtivos.etiquetas = [];
        this.filtrosEmEdicao.etiquetas = [];

        console.log('Filtros em edição após reset:', this.filtrosEmEdicao);

        if (this.inputBusca) {
            this.inputBusca.value = '';
            if (this.searchClearIcon) {
                this.searchClearIcon.style.display = 'none';
            }
        }

        if (this.btnFavoritos) {
            this.btnFavoritos.classList.remove('ativo');
            const icone = this.btnFavoritos.querySelector(".material-symbols-outlined");
            if (icone) {
                icone.textContent = "favorite_border";
                icone.style.fontVariationSettings = "'FILL' 0";
            }
        }

        Object.values(this.filterOptionGroups).forEach(container => {
            if (container) {
                container.querySelectorAll('input[type=checkbox]').forEach(cb => {
                    cb.checked = false;
                });
                container.querySelectorAll('button.ativo').forEach(btn => btn.classList.remove('ativo'));
            }
        });

        this.populatePopoverUI();

        this.callbacks.onFilterChange(this.filtrosAtivos);

        this.renderActiveFilterChips();

        if (closePopover) {
            this.toggleFilterPopover(false);
        }
    }

    resetFilter(key) {
        if (!this.filtrosAtivos.hasOwnProperty(key)) return;

        if (Array.isArray(this.filtrosAtivos[key])) {
            this.filtrosAtivos[key] = [];
            this.filtrosEmEdicao[key] = [];
        } else {
            const defaultValue = this.initialFilters[key] ?? null;
            this.filtrosAtivos[key] = defaultValue;
            this.filtrosEmEdicao[key] = defaultValue;
        }

        if (key === 'busca' && this.inputBusca) {
            this.inputBusca.value = '';
            this.searchClearIcon.style.display = 'none';
        }

        if (key === 'favoritos' && this.btnFavoritos) {
            this.btnFavoritos.classList.remove('ativo');
            const icone = this.btnFavoritos.querySelector(".material-symbols-outlined");
            if (icone) {
                icone.textContent = "favorite_border";
                icone.style.fontVariationSettings = "'FILL' 0";
            }
        }

        this.populatePopoverUI();
        this.callbacks.onFilterChange(this.filtrosAtivos);
        this.renderActiveFilterChips();
    }

    renderActiveFilterChips() {
        if (!this.activeFiltersChipsContainer) return;
        this.activeFiltersChipsContainer.innerHTML = '';

        const chips = [];

        if (this.filtrosAtivos.busca) {
            chips.push({ key: 'busca', label: `Busca: "${this.filtrosAtivos.busca}"` });
        }

        if (Array.isArray(this.filtrosAtivos.etiquetas) && this.filtrosAtivos.etiquetas.length > 0) {
            this.filtrosAtivos.etiquetas.forEach(etiqueta => {
                chips.push({
                    key: 'etiquetas',
                    label: etiqueta,
                    value: etiqueta,
                    color: getTagColor(etiqueta)
                });

            });
        }

        for (const key in this.filtrosAtivos) {
            if (this.initialFilters.hasOwnProperty(key) &&
                !['busca', 'favoritos', 'ultimaAtualizacao', 'etiquetas'].includes(key)) {
                if (Array.isArray(this.filtrosAtivos[key]) && this.filtrosAtivos[key].length > 0) {
                    const labelKey = key.charAt(0).toUpperCase() + key.slice(1);
                    chips.push({ key: key, label: `${labelKey}: ${this.filtrosAtivos[key].join(', ')}` });
                }
            }
        }

        if (this.filtrosAtivos.ultimaAtualizacao) {
            chips.push({ key: 'ultimaAtualizacao', label: `Data: ${this.callbacks.formatDate(this.filtrosAtivos.ultimaAtualizacao)}` });
        }

        if (this.filtrosAtivos.favoritos) {
            chips.push({ key: 'favoritos', label: 'Apenas Favoritos' });
        }

        chips.forEach(chipData => {
            const chip = document.createElement('div');
            chip.className = 'filter-chip';
            if (chipData.key === 'etiquetas' && chipData.color) {
                chip.style.backgroundColor = chipData.color;
            }
            chip.innerHTML = `<span>${chipData.label}</span>
            <span class="material-symbols-outlined" data-clear-key="${chipData.key}" data-clear-value="${chipData.value ?? ''}">close</span>`;

            this.activeFiltersChipsContainer.appendChild(chip);
        });

        if (chips.length > 0) {
            this.activeFiltersChipsContainer.style.display = 'flex';
            const clearAllChip = document.createElement('div');
            clearAllChip.className = 'filter-chip clear-all-chip';
            clearAllChip.innerHTML = `
                <span class="material-symbols-outlined">filter_alt_off</span>
                <span>Limpar</span>
                
            `;
            clearAllChip.addEventListener('click', () => this.resetAllFilters());
            this.activeFiltersChipsContainer.appendChild(clearAllChip);
        } else {
            this.activeFiltersChipsContainer.style.display = 'none';
        }
    }

    get activeFilters() {
        return { ...this.filtrosAtivos };
    }

    addEtiqueta(novaTag) {
    novaTag = novaTag.trim();
    if (!novaTag) return;

    if (!this.filtrosAtivos.etiquetas.includes(novaTag)) {
      this.filtrosAtivos.etiquetas.push(novaTag);
      this.filtrosEmEdicao.etiquetas = [...this.filtrosAtivos.etiquetas];

      this.callbacks.onFilterChange(this.filtrosAtivos);
      this.renderActiveFilterChips();
    }
  }
    setFilter(key, value) {
        if (!this.filtrosAtivos.hasOwnProperty(key)) {
            console.warn(`FilterManager: Chave de filtro '${key}' não existe.`);
            return;
        }
        this.filtrosAtivos[key] = value;
        this.filtrosEmEdicao[key] = value;
        this.callbacks.onFilterChange(this.filtrosAtivos);
        this.renderActiveFilterChips();
    }

}

function makePopoverDraggable(popoverSelector) {
    const popover = document.querySelector(popoverSelector);
    const header = popover?.querySelector('.popover-header');

    if (!popover || !header) return;

    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - popover.offsetLeft;
        offsetY = e.clientY - popover.offsetTop;
        document.body.style.userSelect = 'none'; 
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const left = e.clientX - offsetX;
        const top = e.clientY - offsetY;
        popover.style.left = `${left}px`;
        popover.style.top = `${top}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.userSelect = ''; 
    });
}

export { FilterManager, makePopoverDraggable };
