import { loadHTML } from './utils/include-loader.js';
import { initProcedureForm } from './features/procedures/procedure-form.js';
import { initProcedureTable } from './features/procedures/procedure-table.js';
import { initProcedureViewModal } from './features/procedures/procedure-view-modal.js';
import { initProcedureVersionHistoryModal } from './features/procedures/procedure-version-modal.js';
import { initFavoritesWidget } from './features/common/favorites-widget.js';
import { initTasksSection } from './features/tasks/tasks.js';
import { initTaskFilters } from './features/tasks/task-filters.js';
import { initProcedureFilters } from './features/procedures/procedure-filters.js';
import { initModalButtons } from './features/tasks/task-sidebar-modals.js';
import { initUpdViewModal } from './features/updates/upd-modal.js';
import { initUpdateForm } from './features/updates/upd-form.js';
import { renderizarAtualizacoes } from './features/updates/upd-renderer.js';
import { initUpdPanel } from './features/updates/upd-panel.js';

document.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname;
  const basePath = path.includes('/pages/') ? '../includes/layout/' : 'includes/layout/';
  const modalBasePath = path.includes('/pages/') ? '../includes/modals/' : 'includes/modals/';

  const includes = [
    { name: 'header', targetId: 'header', filePath: `${basePath}header.html` },
    { name: 'sidebar', targetId: 'sidebar', filePath: `${basePath}sidebar.html` },
    { name: 'recent-upd', targetId: 'recent-upd', filePath: 'includes/widgets/recent-upd.html' },
    { name: 'favorites', targetId: 'favorites', filePath: 'includes/widgets/favorites.html' },
    { name: 'modal-view-procedure', targetId: 'modal-view-procedure-placeholder', filePath: `${modalBasePath}modal-view-procedure.html` },
    { name: 'tasks', targetId: 'tasks-placeholder', filePath: 'includes/widgets/tasks.html' },
    { name: 'modal-form-procedure', targetId: 'modal-form-procedure-placeholder', filePath: `${modalBasePath}modal-form-procedure.html` },
    { name: 'task-sidebar-modals', targetId: 'task-sidebar-modals-placeholder', filePath: `${modalBasePath}modal-tasks-sidebar.html` },
    { name: 'modal-form-update', targetId: 'modal-form-update-placeholder', filePath: `${modalBasePath}modal-form-update.html` },
  ];

  if (path.includes('login.html')) {
    includes.push({
      name: 'modal-forgot-password',
      targetId: 'modal-forgot-password-placeholder',
      filePath: `${modalBasePath}modal-forgot-password.html`
    });
  }

  includes.push({
    name: 'modal-tasks-form',
    targetId: 'modal-tasks-form-placeholder',
    filePath: `${modalBasePath}modal-tasks-form.html`
  });

  const loadedFlags = {
    tasksWidget: false,
    modalTaskForm: false,
    modalTaskSidebar: false,
    modalFormUpdate: false,
  };

  function runSpecificInitializations(name) {
    switch (name) {
      case 'modal-form-procedure':
        initProcedureForm();
        break;
      case 'modal-view-procedure':
        initProcedureViewModal();
        break;
      case 'modal-version-procedure':
        initProcedureVersionHistoryModal();
        break;
      case 'favorites':
        initFavoritesWidget();
        break;
    }
  }

  await Promise.all(
    includes.map(async ({ name, targetId, filePath }) => {
      const placeholder = document.getElementById(targetId);
      if (!placeholder) {
        console.warn(`Elemento #${targetId} não encontrado, pulando ${name}.`);
        return;
      }
      try {
        await loadHTML(targetId, filePath);

        if (name === 'modal-form-update') {
          const modal = document.getElementById('modal-form-update');
          if (!modal) {
            console.warn('Modal de atualização "modal-form-update" não encontrado no DOM após loadHTML');
            loadedFlags.modalFormUpdate = false;
          } else {
            loadedFlags.modalFormUpdate = true;
          }
        }

        if (name === 'tasks') loadedFlags.tasksWidget = true;
        if (name === 'modal-tasks-form') loadedFlags.modalTaskForm = true;
        if (name === 'task-sidebar-modals') loadedFlags.modalTaskSidebar = true;

        runSpecificInitializations(name);

      } catch (e) {
        console.error(`Erro ao carregar ${name}:`, e);
      }
    })
  );

  if (loadedFlags.tasksWidget && loadedFlags.modalTaskForm && loadedFlags.modalTaskSidebar) {
    initTasksSection();
    initTaskFilters();
    initModalButtons();
  } else {
    if (!loadedFlags.modalTaskSidebar)
      console.warn('Modal da barra lateral de tarefas não carregado. Modais relacionados a datas podem não funcionar.');
    if (!loadedFlags.modalTaskForm)
      console.warn('Modal de formulário de tarefas não carregado. Funcionalidades relacionadas a formulários de tarefas podem ser limitadas.');
  }

  let formModalController = null;

  if (loadedFlags.modalFormUpdate) {
    initUpdViewModal();
    formModalController = initUpdateForm();
  } else {
    console.warn('Modal de formulário de update não carregado. initUpdViewModal() e initUpdateForm() não serão chamados.');
  }

  if (path.includes('upd-panel.html')) {
    if (formModalController) {
      initUpdPanel(formModalController);
    } else {
      console.error('Erro: A instância de formModalController não foi inicializada. initUpdPanel não pode ser executado.');
    }
  }


  if (path.includes('control-panel.html')) {
    const tabelaProcedimentosElement = document.getElementById('tabela-procedimentos');
    if (tabelaProcedimentosElement) {
      initProcedureTable();
      initProcedureFilters();
    } else {
      console.warn('Elemento #tabela-procedimentos não encontrado na página do Painel de Controle. initProcedureTable e initProcedureFilters não serão chamados.');
    }
  }
});
