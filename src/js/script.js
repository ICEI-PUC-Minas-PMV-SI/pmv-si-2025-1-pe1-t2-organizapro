import { loadHTML } from './utils/include-loader.js';
import { initProcedureForm } from './features/procedures/procedure-form.js';
import { initProcedureTable } from './features/procedures/procedure-table.js';
import { atualizarTabela, initFilterControls } from './features/common/filter-controls.js';
import { initProcedureViewModal } from './features/procedures/procedure-view-modal.js';

document.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname;
  const basePath = path.includes('/pages/') ? '../includes/layout/' : 'includes/layout/';
  const modalBasePath = path.includes('/pages/') ? '../includes/modals/' : 'includes/modals/';

  const includes = [
    { name: 'header', targetId: 'header', filePath: `${basePath}header.html` },
    { name: 'sidebar', targetId: 'sidebar', filePath: `${basePath}sidebar.html` },
    { name: 'recent-upd', targetId: 'recent-upd', filePath: 'includes/widgets/recent-upd.html' },
    { name: 'favorites', targetId: 'favorites', filePath: 'includes/widgets/favorites.html' },
    { name: 'tasks', targetId: 'tasks', filePath: 'includes/widgets/tasks.html' }
  ];

  if (path.includes('pg-control-panel.html')) {
    includes.push(
      { name: 'modal-form-procedure', targetId: 'modal-form-procedure-placeholder', filePath: `${modalBasePath}modal-form-procedure.html` },
      { name: 'modal-view-procedure', targetId: 'modal-view-procedure-placeholder', filePath: `${modalBasePath}modal-view-procedure.html` }
    );
  }

  await Promise.all(
  includes.map(({ name, targetId, filePath }) => {
    const el = document.getElementById(targetId);
    if (!el) {
      console.warn(`Elemento #${targetId} não encontrado, pulando ${name}.`);
      return Promise.resolve();
    }
    return loadHTML(targetId, filePath)
      .then(() => {
        if (name === 'modal-form-procedure') initProcedureForm();
        if (name === 'modal-view-procedure') initProcedureViewModal();
      })
      .catch(e => console.error(`Erro ao carregar ${name}:`, e));
  })
);


  if (path.includes('pg-control-panel.html')) {
    initProcedureTable();
    initFilterControls();
    atualizarTabela();
  }
});
