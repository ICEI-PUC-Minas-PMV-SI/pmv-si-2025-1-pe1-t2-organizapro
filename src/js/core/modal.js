// js/core/modal.js

// AQUI NÃO TEM MAIS VARIÁVEIS GLOBAIS _modalElement etc.
// Elas estarão dentro de cada instância do modal.

/**
 * Função que retorna um objeto controlador para um modal HTML específico.
 * Isso permite gerenciar múltiplos modais de forma independente.
 *
 * @param {string} modalId O ID do elemento DIV principal do modal (ex: "modal-procedure", "modal-visualizar-procedimento").
 * @param {string} titleId O ID do elemento do título dentro desse modal (ex: "tituloModal", "visualizarTituloModal").
 * @returns {Object | null} Um objeto controlador para o modal, ou null se os elementos não forem encontrados.
 */
export function createModalController(modalId, titleId) { // <-- FUNÇÃO RENOMEADA E REAPROVEITADA
    const element = document.getElementById(modalId);
    const titleElement = document.getElementById(titleId);

    if (!element) {
        console.error(`Erro: Elemento modal principal com ID "${modalId}" não encontrado no DOM.`);
        return null; // Falha na inicialização
    }
    if (!titleElement) {
        console.error(`Erro: Elemento do título do modal com ID "${titleId}" não encontrado no DOM.`);
        return null; // Falha na inicialização
    }

    let _clearContentCallback = null; // Callback de limpeza específico para esta instância de modal

    return {
        /**
         * Abre este modal específico.
         */
        abrir: function() {
            element.style.display = "flex";
            element.scrollTop = 0;
            console.log(`Modal com ID "${modalId}" aberto.`); 
        },

        /**
         * Fecha este modal específico.
         */
        fechar: function() {
            element.style.display = "none";
            console.log(`Modal com ID "${modalId}" fechado.`); 
        },

        /**
         * Define o título deste modal específico.
         * @param {string} texto O texto a ser exibido como título.
         */
        setTitulo: function(texto) {
            titleElement.textContent = texto;
        },

        /**
         * Registra a função de callback que será chamada para limpar o conteúdo interno deste modal.
         * @param {Function} callback Função de limpeza.
         */
        definirCallbackDeLimpeza: function(callback) {
            if (typeof callback === "function") {
                _clearContentCallback = callback;
            } else {
                console.error("O callback de limpeza precisa ser uma função.");
                _clearContentCallback = null;
            }
        },

        /**
         * Executa o callback de limpeza previamente registrado para este modal.
         */
        dispararLimpeza: function() {
            if (typeof _clearContentCallback === "function") {
                _clearContentCallback();
            }
        },

        // Expor as referências DOM para uso interno nos módulos clientes (opcional, mas útil para o form)
        // Isso permite que os módulos clientes usem 'myModalInstance.element' etc.
        element: element,
        titleElement: titleElement
    };
}