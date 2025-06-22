import { renderizarAtualizacoes, criarCardPainel } from './upd-renderer.js';
import { criarFiltros } from './upd-filters.js';
import { inicializarEventos } from './upd-events.js';

export async function initUpdPanel() {
  const panelCardsContainerID = 'panel-cards-container';

  const searchInput = document.getElementById('upd-search-input');
  const searchClear = document.querySelector('.upd-search-clear-icon');
  const favButton = document.getElementById('upd-filtro-favoritos');
  const clearButton = document.getElementById('upd-limpar-filtros');

  const btnOpenFilters = document.getElementById('upd-btn-open-filters');
  const filterPopover = document.getElementById('upd-filter-popover');
  const btnCloseFilters = document.getElementById('upd-btn-close-filters-popover');
  const btnApplyFilters = document.getElementById('upd-aplicarFiltrosBtn');
  const btnClearFilters = document.getElementById('upd-limparFiltrosBtn');
  const overlay = document.getElementById('upd-filter-overlay');

  const etiquetasContainer = document.getElementById('upd-filter-etiquetas-options');

  const filtroInicial = {
    busca: '',
    favoritos: false,
    status: ['Ativo'],
    etiquetas: [],
    data: null,
  };

  const filtrosModule = criarFiltros({
    filtro: filtroInicial,
    atualizarPainel: atualizarPainel,
    containers: {
      filterPopover,
      overlay,
      etiquetasContainer
    },
    buttons: {
      favButton,
      btnOpenFilters,
      btnCloseFilters,
      btnApplyFilters,
      btnClearFilters,
      clearButton,
    },
    searchInput,
    searchClear
  });

  async function atualizarPainel() {
    const filtroAplicado = {
      ...filtrosModule.filtro,
      status: filtrosModule.filtro.status 
    };

    await renderizarAtualizacoes(panelCardsContainerID, criarCardPainel, {
      limite: null,
      filtro: filtroAplicado
    });

    filtrosModule.renderChips();
  }

  async function focarCardPorIdNaUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('updateId');
    if (!id) return;

    const container = document.getElementById(panelCardsContainerID);
    const card = container?.querySelector(`[data-update-id="${id}"]`);
    if (card) {
      card.classList.add('highlight');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  await atualizarPainel();
  inicializarEventos(panelCardsContainerID);
  await focarCardPorIdNaUrl();

  window.addEventListener('load', () => {
    const hash = window.location.hash; 
    if (hash && hash.startsWith('#update-')) {
      const updateId = hash.replace('#update-', '');
      const cardPainel = document.querySelector(`.card-painel[data-update-id="${updateId}"]`);
      if (cardPainel) {
        cardPainel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        cardPainel.classList.add('destaque-temporario');
        setTimeout(() => cardPainel.classList.remove('destaque-temporario'), 2000);
      }
    }
  });

}
