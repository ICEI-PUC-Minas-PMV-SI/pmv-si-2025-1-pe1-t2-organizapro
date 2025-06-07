// src/script.js

import { loadHTML } from './utils/include-loader.js';
import { initProcedureForm } from './features/procedures/procedure-form.js';
import { initProcedureTable } from './features/procedures/procedure-table.js';
import { atualizarTabela, initFilterControls } from './features/common/filter-controls.js';
import { initProcedureViewModal } from './features/procedures/procedure-view-modal.js';


document.addEventListener('DOMContentLoaded', async () => {
    const path = window.location.pathname;
    const basePath = path.includes('/pages/') ? '../includes/layout/' : 'includes/layout/';

    // Define quais includes carregar com base na página atual
    const includesToLoadInCurrentPage = [];

    // Includes UNIVERSAIS (header, sidebar)
    includesToLoadInCurrentPage.push(
        { name: 'header', targetId: 'header', filePath: `${basePath}header.html` },
        { name: 'sidebar', targetId: 'sidebar', filePath: `${basePath}sidebar.html` },
        { name: 'recent-upd', targetId: 'recent-upd', filePath: `includes/widgets/recent-upd.html` },
        { name: 'favorites', targetId: 'favorites', filePath: `includes/widgets/favorites.html` },
        { name: 'tasks', targetId: 'tasks', filePath: `includes/widgets/tasks.html` }
    );

    // Includes ESPECÍFICOS da página 'pg-control-panel.html'
    // Se a página é 'pg-control-panel.html', carregue os modais de procedimento.
    if (path.includes('pg-control-panel.html')) {
        const modalBasePath = path.includes('/pages/') ? '../includes/modals/' : 'includes/modals/';
        includesToLoadInCurrentPage.push(
            { name: 'modal-form-procedure', targetId: 'modal-form-procedure-placeholder', filePath: `${modalBasePath}modal-form-procedure.html` },
            { name: 'modal-view-procedure', targetId: 'modal-view-procedure-placeholder', filePath: `${modalBasePath}modal-view-procedure.html` }
        );
    }

    const loadPromises = [];

    // Mapeia a configuração para chamadas loadHTML, com inicialização condicional para modais
    includesToLoadInCurrentPage.forEach(config => {
    const targetElement = document.getElementById(config.targetId);
    if (targetElement) {
        loadHTML(config.targetId, config.filePath)
            .then(() => {
                // Inicializações
            })
            .catch(error => {
                console.error(`Falha ao carregar ou inicializar ${config.name}:`, error);
            });
    } else {
        console.warn(`Elemento com ID "${config.targetId}" não existe na página, pulando carregamento de ${config.name}.`);
    }
});


    await Promise.all(loadPromises); // Espera que todos os includes carreguem e inicializem o JS dependente

    // Inicializa módulos ESPECÍFICOS DESTA PÁGINA (pg-control-panel.html)
    // SOMENTE se a página atual for pg-control-panel.html
    if (path.includes('pg-control-panel.html')) {
        initProcedureTable(); // A tabela principal já deve estar no DOM da página base
        initFilterControls(); // Depende da tabela e do search-bar que também estão na página base
        atualizarTabela();    // Renderiza a tabela inicial (todos os elementos já devem estar no DOM)
    }
});