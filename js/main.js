// src/js/main.js

import { getIncludesConfig } from './core/includes-config.js';
import { initializeIncludes } from './core/init-includes.js';
import { runRouteInitializers } from './core/route-initializers.js';

import { initTaskFilters } from './features/tasks/task-filters.js';
import { initTasksSection, renderizarTarefas } from './features/tasks/tasks.js';
import { initModalButtons, updateBadges as updateTaskBadges } from './features/tasks/task-sidebar-modals.js';
import { initSidebarMenu } from './features/common/sidebar-menu.js';


window.updateAllTaskDisplays = function () {
  console.log("DEBUG: Chamando window.updateAllTaskDisplays para atualizar a UI.");

  renderizarTarefas();

  if (updateTaskBadges) {
    updateTaskBadges();
  }

};


document.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname;
  const includes = getIncludesConfig(path);
  console.log('[MAIN] Includes recebidos para a página:', includes);

  const loadedFlags = {
    tasksWidget: false,
    modalTaskForm: false,
    modalTaskSidebar: false,
    modalFormUpdate: false,
    modalFormProcedure: false,
    modalViewProcedure: false,
    modalVersionProcedure: false,
    favoritesWidget: false,
    recentUpd: false,
    modalForgotPassword: false,
    header: false,
    sidebar: false
  };

  await initializeIncludes(includes, loadedFlags);

  runRouteInitializers(path, loadedFlags);

  initTaskFilters();
  initTasksSection();
  initModalButtons();

});

