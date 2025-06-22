const breakpoint = 768;

let menuToggleButton = null;
let sidebarWrapper = null;
let sidebar = null;
let menuIcon = null;
let closeIcon = null;
let mainContainer = null;

function openSidebar() {
    console.log("[SIDEBAR MENU] Abrindo sidebar");

    if (window.innerWidth <= breakpoint) {
        sidebarWrapper.classList.add('is-open');
    } else {
        sidebar.classList.remove('is-closed-desktop');
        mainContainer.classList.remove('sidebar-closed-desktop');
    }
    menuToggleButton.classList.add('is-open');
    menuToggleButton.setAttribute('aria-expanded', 'true');

    if (menuIcon) menuIcon.hidden = true;
    if (closeIcon) closeIcon.hidden = false;
}

function closeSidebar() {
    console.log("[SIDEBAR MENU] Fechando sidebar");

    if (window.innerWidth <= breakpoint) {
        sidebarWrapper.classList.remove('is-open');
    } else {
        sidebar.classList.add('is-closed-desktop');
        mainContainer.classList.add('sidebar-closed-desktop');
    }
    menuToggleButton.classList.remove('is-open');
    menuToggleButton.setAttribute('aria-expanded', 'false');

    if (menuIcon) menuIcon.hidden = false;
    if (closeIcon) closeIcon.hidden = true;
}

function adjustMenuState() {
    if (!menuToggleButton || !sidebarWrapper || !sidebar || !menuIcon || !closeIcon || !mainContainer) {
        console.error("adjustMenuState chamado antes dos elementos serem inicializados.");
        return;
    }

    const width = window.innerWidth;

    console.log("[SIDEBAR MENU] Ajustando estado para largura:", width);

    if (width > breakpoint) {
        sidebar.classList.remove('is-closed-desktop');
        mainContainer.classList.remove('sidebar-closed-desktop');
        sidebarWrapper.classList.remove('is-open');

        menuToggleButton.classList.remove('is-open');
        menuToggleButton.setAttribute('aria-expanded', 'false');

        menuIcon.hidden = false;
        closeIcon.hidden = true;
    } else {
        closeSidebar();
    }
}

export function initSidebarMenu() {
    menuToggleButton = document.querySelector('.menu-toggle-button');
    sidebarWrapper = document.getElementById('sidebar-wrapper');
    sidebar = document.getElementById('sidebar');
    menuIcon = menuToggleButton ? menuToggleButton.querySelector('.menu-icon') : null;
    closeIcon = menuToggleButton ? menuToggleButton.querySelector('.close-icon') : null;
    mainContainer = document.querySelector('.main-container');

    if (!menuToggleButton || !sidebarWrapper || !sidebar || !menuIcon || !closeIcon || !mainContainer) {
        console.error("Erro: Elementos necessários para o menu sanduíche não encontrados.");
        return;
    }

    menuToggleButton.addEventListener('click', () => {
        const width = window.innerWidth;

        const isSidebarCurrentlyOpen = width <= breakpoint ?
            sidebarWrapper.classList.contains('is-open') :
            !sidebar.classList.contains('is-closed-desktop');

        console.log("[SIDEBAR MENU] Toggle clicado. Sidebar está aberta?", isSidebarCurrentlyOpen);

        if (isSidebarCurrentlyOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    sidebar.querySelectorAll('.menu-button').forEach(button => {
        button.addEventListener('click', () => {
            if (window.innerWidth <= breakpoint) {
                console.log("[SIDEBAR MENU] Botão do menu clicado no mobile, fechando sidebar");
                closeSidebar();
            }
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const width = window.innerWidth;
            const isSidebarCurrentlyOpen = width <= breakpoint ?
                sidebarWrapper.classList.contains('is-open') :
                !sidebar.classList.contains('is-closed-desktop');

            if (isSidebarCurrentlyOpen) {
                console.log("[SIDEBAR MENU] Escape pressionado, fechando sidebar");
                closeSidebar();
            }
        }
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustMenuState, 150);
    });

    adjustMenuState();

    console.log("[SIDEBAR MENU] Menu sanduíche inicializado.");
}
