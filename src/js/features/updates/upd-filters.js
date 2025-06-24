// src/features/updates/upd-filters.js

import { getUniqueUpdateTags } from './upd-data.js';
import { getTagColor } from '/src/js/utils/color-helpers.js';
import { makePopoverDraggable } from '/src/js/features/common/filter-controls.js';


const filtros = {
  busca: '',
  favoritos: false,
  status: ['Ativo'],
  etiquetas: [],
  data: null,
};

const selectors = {
  searchInputId: 'upd-search-input',
  searchClearIconSelector: '.upd-search-clear-icon',
  favButtonId: 'upd-filtro-favoritos',
  btnOpenFiltersId: 'upd-btn-open-filters',
  btnCloseFiltersId: 'upd-btn-close-filters-popover',
  btnApplyFiltersId: 'upd-aplicarFiltrosBtn',
  btnClearFiltersId: 'upd-limparFiltrosBtn',
  clearButtonId: 'upd-limpar-filtros',
  filterPopoverId: 'upd-filter-popover',
  overlayId: 'upd-filter-overlay',
  etiquetasContainerId: 'upd-filter-etiquetas-options',
  chipsContainerId: 'upd-filter-chips-container',
};

const flatpickr = window.flatpickr;
const Portuguese = window.flatpickr.l10ns.pt;

let searchInput, searchClear, favButton;
let btnOpenFilters, btnCloseFilters, btnApplyFilters, btnClearFilters, clearButton;
let filterPopover, overlay, etiquetasContainer, chipsContainer;
let updFlatpickrInstance = null;
let isUpdatingFlatpickr = false;

function createCheckboxOptions(options, filterKey) {
  if (!options || options.length === 0) return '<div class="filtro-sem-opcoes">Nenhuma opção</div>';

  return options.map(opt => {
    const id = `upd-filtro-${filterKey}-${opt.replace(/\s+/g, '-')}`;
    const checked = filtros[filterKey]?.includes(opt) ? 'checked' : '';
    return `
      <label class="filtro-opcao custom-checkbox" for="${id}">
        <input type="checkbox" id="${id}" value="${opt}" ${checked}>
        <span class="checkmark"></span>
        ${opt}
      </label>
    `;
  }).join('');
}

function popularEtiquetas() {
  const etiquetasUnicas = getUniqueUpdateTags();
  const statusOpcoes = ['Ativo', 'Inativo'];

  etiquetasContainer.innerHTML = createCheckboxOptions(etiquetasUnicas, 'etiquetas');
  const statusContainer = filterPopover.querySelector('#upd-filter-status-options');
  if (statusContainer) {
    statusContainer.innerHTML = createCheckboxOptions(statusOpcoes, 'status');
  }

  filterPopover.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', onCheckboxChange);
  });
}

function onCheckboxChange(e) {
  const checkbox = e.target;
  const value = checkbox.value;
  let filterKey = null;

  if (checkbox.closest('#upd-filter-etiquetas-options')) filterKey = 'etiquetas';
  else if (checkbox.closest('#upd-filter-status-options')) filterKey = 'status';

  if (!filterKey) return;

  if (checkbox.checked) {
    if (!filtros[filterKey].includes(value)) filtros[filterKey].push(value);
  } else {
    filtros[filterKey] = filtros[filterKey].filter(v => v !== value);
  }

  if (filterKey === 'status') {
    if (filtros.status.length === 0) {
      filtros.status = ['Ativo'];
    }
  }

}

function normalizarData(date) {
  if (!date) return null;
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function initFlatpickr() {
  const input = document.getElementById('upd-data-datepicker');
  if (!input) {
    console.warn('Input de data "upd-data-datepicker" não encontrado.');
    return;
  }

  updFlatpickrInstance = flatpickr(input, {
    dateFormat: "Y-m-d",
    locale: Portuguese,
    allowInput: false,
    onChange: ([selected]) => {
      if (isUpdatingFlatpickr) return;
      filtros.data = selected ? normalizarData(selected).toISOString() : null;
      atualizarPainel();
      renderChips();
    },
  });

  syncDatePickerWithFilter(filtros.data);
}

function syncDatePickerWithFilter(dateISO) {
  if (!updFlatpickrInstance) return;

  isUpdatingFlatpickr = true;
  try {
    const localDate = normalizarData(dateISO);
    updFlatpickrInstance.setDate(localDate, false);
  } finally {
    isUpdatingFlatpickr = false;
  }
}

function atualizarBotaoFavoritosUI() {
  if (filtros.favoritos) {
    favButton.classList.add('ativo');
  } else {
    favButton.classList.remove('ativo');
  }
}

function renderChips() {
  const chips = [];

  if (filtros.busca) {
    chips.push(createChip('', filtros.busca, () => {
      filtros.busca = '';
      searchInput.value = '';
      atualizarPainel();
      renderChips();
    }));
  }

  filtros.status.forEach(status => {
    chips.push(createChip('', status, () => {
      filtros.status = filtros.status.filter(s => s !== status);
      if (filtros.status.length === 0) {
        filtros.status = [];
      }
      atualizarPainel();
      popularEtiquetas();
      renderChips();
    }));
  });


  filtros.etiquetas.forEach(etiqueta => {
    chips.push(createChip('', etiqueta, () => {
      filtros.etiquetas = filtros.etiquetas.filter(e => e !== etiqueta);
      atualizarPainel();
      renderChips();
    }));
  });

  if (filtros.data) {
    const dataFormatada = new Date(filtros.data).toLocaleDateString('pt-BR');
    chips.push(createChip('', dataFormatada, () => {
      filtros.data = null;
      if (updFlatpickrInstance) updFlatpickrInstance.clear();
      atualizarPainel();
      renderChips();
    }));
  }

  chipsContainer.innerHTML = chips.join('');
}

function createChip(tipo, texto, onRemove) {
  const id = `chip-${tipo.toLowerCase()}-${texto.replace(/\s+/g, '-')}`;

  const textoChip = (typeof tipo === 'string' && tipo.trim().length > 0)
    ? `${tipo.trim()}: ${texto}`
    : texto;

  const backgroundColor = getTagColor(texto);

  const chipHTML = `
    <div class="filter-chip" id="${id}" style="background-color: ${backgroundColor};">
      <span class="chip-text">${textoChip}</span>
      <button type="button" class="chip-remove" aria-label="Remover filtro ${texto}">&times;</button>
    </div>
  `;

  setTimeout(() => {
    const chipEl = document.getElementById(id);
    if (chipEl) {
      chipEl.querySelector('.chip-remove').onclick = () => {
        onRemove();
      };
    }
  }, 0);

  return chipHTML;
}

function resetFilters() {
  filtros.busca = '';
  filtros.favoritos = false;
  filtros.status = [];
  filtros.etiquetas = [];
  searchInput.value = '';
  if (updFlatpickrInstance) updFlatpickrInstance.clear();
  atualizarBotaoFavoritosUI();
  popularEtiquetas();
  renderChips();
  atualizarPainel();
}

let atualizarPainelCallback = null;
async function atualizarPainel() {
  if (typeof atualizarPainelCallback === 'function') {
    await atualizarPainelCallback(filtros);
  }
}

function abrirPopover() {
  filterPopover.classList.add('open');
  overlay.classList.add('visible');
  popularEtiquetas();
}

function fecharPopover() {
  filterPopover.classList.remove('open');
  overlay.classList.remove('visible');
}

export function criarFiltros({ filtro, atualizarPainel: atualizarCb, containers, buttons }) {
  searchInput = document.getElementById(selectors.searchInputId);
  searchClear = document.querySelector(selectors.searchClearIconSelector);
  favButton = buttons?.favButton || document.getElementById(selectors.favButtonId);
  btnOpenFilters = document.getElementById(selectors.btnOpenFiltersId);
  btnCloseFilters = document.getElementById(selectors.btnCloseFiltersId);
  btnApplyFilters = document.getElementById(selectors.btnApplyFiltersId);
  btnClearFilters = document.getElementById(selectors.btnClearFiltersId);
  clearButton = document.getElementById(selectors.clearButtonId);
  filterPopover = document.getElementById(selectors.filterPopoverId);
  overlay = document.getElementById(selectors.overlayId);
  etiquetasContainer = document.getElementById(selectors.etiquetasContainerId);
  chipsContainer = document.getElementById(selectors.chipsContainerId);

  Object.assign(filtros, filtro);

  atualizarPainelCallback = atualizarCb;

  let debounceTimer = null;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      filtros.busca = e.target.value.trim();
      atualizarPainel();
      renderChips();
    }, 300);
  });

  searchClear.addEventListener('click', () => {
    filtros.busca = '';
    searchInput.value = '';
    atualizarPainel();
    renderChips();
  });

  favButton.addEventListener('click', () => {
    filtros.favoritos = !filtros.favoritos;
    atualizarBotaoFavoritosUI();
    atualizarPainel();
    renderChips();
  });

  btnOpenFilters.addEventListener('click', abrirPopover);
  btnCloseFilters.addEventListener('click', fecharPopover);
  overlay.addEventListener('click', fecharPopover);

  btnApplyFilters.addEventListener('click', () => {
    fecharPopover();
    atualizarPainel();
    renderChips();
  });

  btnClearFilters.addEventListener('click', () => {
    resetFilters();
  });

  clearButton.addEventListener('click', () => {
    resetFilters();
  });

  document.addEventListener('click', (e) => {
    if (!filterPopover.contains(e.target) && e.target !== btnOpenFilters) {
      fecharPopover();
    }
  });

  popularEtiquetas();
  renderChips();
  initFlatpickr();

  makePopoverDraggable('#upd-filter-popover');


  const clearDateBtn = document.getElementById('upd-clear-data-filter');
  if (clearDateBtn) {
    clearDateBtn.addEventListener('click', () => {
      filtros.data = null;
      if (updFlatpickrInstance) updFlatpickrInstance.clear();
      atualizarPainel();
      renderChips();
    });
  }


  return {
    filtro: filtros,
    renderChips,
  };
}
