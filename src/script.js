import { loadHTML } from './js/include-loader.js';
import { initControlPanel } from './js/control-panel.js';

document.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname;
  const basePath = path.includes('/pages/') ? '../includes/' : 'includes/';

  await loadHTML('header', basePath + 'inc-header.html');
  await loadHTML('sidebar', basePath + 'inc-sidebar.html');
  await loadHTML('favorites', basePath + 'inc-favorites.html');
  await loadHTML('recent-upd', basePath + 'inc-recent-upd.html');
  await loadHTML('tasks', basePath + 'inc-tasks.html');

  initControlPanel(); // inicializa seu painel só depois dos includes carregados
});
