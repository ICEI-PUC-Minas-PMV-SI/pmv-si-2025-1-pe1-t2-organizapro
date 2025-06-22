// src/js/core/route-initializers.js

import { initTasksSection } from '../features/tasks/tasks.js';
import { initTaskFilters } from '../features/tasks/task-filters.js';
import { initModalButtons } from '../features/tasks/task-sidebar-modals.js';
import { initProcedureTable } from '../features/procedures/procedure-table.js';
import { initProcedureFilters } from '../features/procedures/procedure-filters.js';
import { initUpdViewModal } from '../features/updates/upd-modal.js';
import { initUpdateForm } from '../features/updates/upd-form.js';
import { criarCardWidget, criarCardPainel, renderizarAtualizacoes } from '../features/updates/upd-renderer.js';

import { initProcedureForm } from '../features/procedures/procedure-form.js';
import { initProcedureViewModal } from '../features/procedures/procedure-view-modal.js';
import { initProcedureVersionHistoryModal } from '../features/procedures/procedure-version-modal.js';
import { initFavoritesWidget } from '../features/common/favorites-widget.js';
import { initUpdPanel } from '../features/updates/upd-panel.js';
import { initSidebarMenu } from '../features/common/sidebar-menu.js';

export function runRouteInitializers(path, loadedFlags) {
    console.log('Flags recebidas para inicialização (em route-initializers):', loadedFlags);
    let formModalController = null;

    // --- Inicialização do Menu Lateral (Sidebar) ---
    if (loadedFlags.sidebar) {
        console.log('[ROUTE INIT] Inicializando sidebar menu...');
        initSidebarMenu();
    } else {
        console.warn('[ROUTE INIT] Sidebar não carregado. initSidebarMenu não será chamado.');
    }

    // --- Inicializações de Tarefas ---
    if (loadedFlags.tasksWidget && loadedFlags.modalTaskForm && loadedFlags.modalTaskSidebar) {
        initTasksSection();
        initTaskFilters();
        initModalButtons();
    } else {
        console.warn('Funções de Tarefas não serão chamadas. Flags de tarefas ou modais relacionadas ausentes:', {
            tasksWidget: loadedFlags.tasksWidget,
            modalTaskForm: loadedFlags.modalTaskForm,
            modalTaskSidebar: loadedFlags.modalTaskSidebar
        });
    }

    // --- Inicialização do Modal de Atualização ---
    if (loadedFlags.modalFormUpdate) {
        initUpdViewModal();
        formModalController = initUpdateForm();
    } else {
        console.warn('Modal de formulário de update não carregado. Funções relacionadas não serão chamadas.');
    }

    // --- Inicializações de Procedimentos no Painel de Controle ---
    if (path.includes('control-panel.html')) {
        const tabelaProcedimentosElement = document.getElementById('tabela-procedimentos');
        if (tabelaProcedimentosElement) {
            initProcedureTable();
            initProcedureFilters();
        } else {
            console.warn('Elemento #tabela-procedimentos não encontrado na página do Painel de Controle. initProcedureTable e initProcedureFilters não serão chamados.');
        }

        if (loadedFlags.modalFormProcedure) {
            initProcedureForm();
        } else {
            console.warn('Modal de formulário de procedimento não carregado (flag: modalFormProcedure). initProcedureForm não será chamado no Painel de Controle.');
        }

        if (loadedFlags.modalVersionProcedure) {
            initProcedureVersionHistoryModal();
        } else {
            console.warn('Modal de histórico de versão de procedimento não carregado (flag: modalVersionProcedure).');
        }
    } else {
        console.log('Não está na página de Painel de Controle. Funções específicas de procedimento não serão chamadas.');
    }

    // --- Inicialização do Modal de Visualização de Procedimento ---
    if (loadedFlags.modalViewProcedure) {
        initProcedureViewModal();
    } else {
        console.warn('Modal de visualização de procedimento não carregado (flag: modalViewProcedure).');
    }

    // --- Inicialização do Widget de Favoritos ---
    if (loadedFlags.favoritesWidget) {
        initFavoritesWidget();
    } else {
        console.warn('Widget de Favoritos não carregado. initFavoritesWidget não será chamado.');
    }

    // --- Inicialização do Painel de Atualizações  ---
    if (path.includes('upd-panel.html')) {
        if (formModalController) {
            initUpdPanel(formModalController);
        } else {
            console.error('Erro: A instância de formModalController não foi inicializada. initUpdPanel não pode ser executado.');
        }
    }

    // --- Renderização de Cards (Widgets) ---
    if (document.getElementById('index-cards-container')) {
        renderizarAtualizacoes('index-cards-container', criarCardWidget, { limite: 3 });
    }

    if (document.getElementById('panel-cards-container')) {
        renderizarAtualizacoes('panel-cards-container', criarCardPainel);
    }

    return formModalController;
}
