export function createModalController(modalId, titleId) {
    const element = document.getElementById(modalId);
    const titleElement = document.getElementById(titleId);

    if (!element) {
        console.error(`Erro: Elemento modal principal com ID "${modalId}" não encontrado no DOM.`);
        return null;
    }
    if (!titleElement) {
        console.error(`Erro: Elemento do título do modal com ID "${titleId}" não encontrado no DOM.`);
        return null;
    }

    let _clearContentCallback = null;

    return {
        abrir: function () {
            element.style.display = "flex";
            element.scrollTop = 0;
            console.log(`Modal com ID "${modalId}" aberto.`);
        },

        fechar: function () {
            element.style.display = "none";
            console.log(`Modal com ID "${modalId}" fechado.`);
        },

        setTitulo: function (texto) {
            titleElement.textContent = texto;
        },

        definirCallbackDeLimpeza: function (callback) {
            if (typeof callback === "function") {
                _clearContentCallback = callback;
            } else {
                console.error("O callback de limpeza precisa ser uma função.");
                _clearContentCallback = null;
            }
        },

        dispararLimpeza: function () {
            if (typeof _clearContentCallback === "function") {
                _clearContentCallback();
            }
        },

        element,
        titleElement
    };
}
