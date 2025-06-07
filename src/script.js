import { loadHTML } from './js/include-loader.js';
import { initControlPanel } from './js/control-panel.js';
import { renderizarTabela } from './js/table-control-panel.js';
import { initFiltros } from './js/control-panel.js';


document.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname;
  const basePath = path.includes('/pages/') ? '../includes/' : 'includes/';

  await Promise.all([
  loadHTML('header', basePath + 'inc-header.html'),
  loadHTML('sidebar', basePath + 'inc-sidebar.html'),
  loadHTML('favorites', basePath + 'inc-favorites.html'),
  loadHTML('recent-upd', basePath + 'inc-recent-upd.html'),
  loadHTML('tasks', basePath + 'inc-tasks.html')
]);


  initControlPanel(); // inicializa painel depois dos includes carregados
  initFiltros();      // inicializa filtros
  renderizarTabela(); // exibe todos os procedimentos ao carregar
});
