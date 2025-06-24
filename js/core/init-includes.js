import { loadHTML } from '../utils/include-loader.js';

export async function initializeIncludes(includes, loadedFlags) {
    await Promise.all(
        includes.map(async ({ name, targetId, filePath }) => {
            const placeholder = document.getElementById(targetId);
            if (!placeholder) {
                console.warn(`Elemento #${targetId} não encontrado na página atual (${window.location.pathname}), pulando include '${name}'.`);
                return;
            }

            try {
                console.log(`[INIT INCLUDES] Tentando carregar include '${name}' para #${targetId} de '${filePath}'`);
                await loadHTML(targetId, filePath);

                switch (name) {
                    case 'tasksWidget': loadedFlags.tasksWidget = true; break;
                    case 'modalTaskForm': loadedFlags.modalTaskForm = true; break;
                    case 'modalTaskSidebar': loadedFlags.modalTaskSidebar = true; break;
                    case 'modalFormUpdate': loadedFlags.modalFormUpdate = true; break;
                    case 'modalFormProcedure': loadedFlags.modalFormProcedure = true; break;
                    case 'modalViewProcedure': loadedFlags.modalViewProcedure = true; break;
                    case 'modalVersionProcedure': loadedFlags.modalVersionProcedure = true; break;
                    case 'favoritesWidget': loadedFlags.favoritesWidget = true; break;
                    case 'recentUpd': loadedFlags.recentUpd = true; break;
                    case 'modalForgotPassword': loadedFlags.modalForgotPassword = true; break;
                    case 'header': loadedFlags.header = true; break;
                    case 'sidebar': loadedFlags.sidebar = true; break;
                    default:
                        console.warn(`Include '${name}' carregado, mas sem flag correspondente no switch de init-includes.js.`);
                }

                console.log(`[INIT INCLUDES] Include '${name}' carregado com sucesso e flag definida como true.`);
            } catch (error) {
                console.error(`[INIT INCLUDES] ERRO ao carregar include '${name}':`, error);
            }
        })
    );

}