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

    const closeButton = element.querySelector('.fechar'); 
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            fechar(); 
        });
    } else {
        console.warn(`Aviso: Botão de fechar com a classe '.fechar' não encontrado para o modal "${modalId}".`);
    }

    let _clearContentCallback = null;

    function onKeyDown(e) {
        if (e.key === "Escape") {
            fechar();
        }
    }

    function onOverlayClick(e) {
        if (e.target === element) {
            fechar();
        }
    }

    function abrir(callback) {
        element.style.display = "flex";
        element.scrollTop = 0;
        element.setAttribute('aria-hidden', 'false');
        element.focus();
        document.addEventListener("keydown", onKeyDown);
        element.addEventListener("click", onOverlayClick);
        console.log(`Modal com ID "${modalId}" aberto.`);

        if (typeof callback === "function") {
            requestAnimationFrame(() => callback());
        }
    }


    function fechar() {
        element.style.display = "none";
        element.setAttribute('aria-hidden', 'true');
        document.removeEventListener("keydown", onKeyDown);
        element.removeEventListener("click", onOverlayClick);
        dispararLimpeza();
        console.log(`Modal com ID "${modalId}" fechado.`);
    }

    function setTitulo(texto) {
        titleElement.textContent = texto;
    }

    function definirCallbackDeLimpeza(callback) {
        if (typeof callback === "function") {
            _clearContentCallback = callback;
        } else {
            console.error("O callback de limpeza precisa ser uma função.");
            _clearContentCallback = null;
        }
    }

    function dispararLimpeza() {
        if (typeof _clearContentCallback === "function") {
            _clearContentCallback();
        }
    }

    return {
        abrir,
        fechar,
        setTitulo,
        definirCallbackDeLimpeza,
        dispararLimpeza,
        element,
        titleElement
    };
}
