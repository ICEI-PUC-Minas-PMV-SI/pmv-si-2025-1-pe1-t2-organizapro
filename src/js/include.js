// js/include.js

function loadHTML(id, file) {
    return fetch(file)
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar " + file);
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(err => console.error(err));
}

function fixLogoLink() {
    // Corrige o href do logo para sempre apontar para /src/ para garantir que o index.html seja carregado corretamente
    const links = document.querySelectorAll('a[href="index.html"], a[href="./index.html"], a.logo');
    links.forEach(link => {
        link.href = '/src/';
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const isFlowsPage = window.location.pathname.includes('/pages/');
    const basePath = isFlowsPage ? '../includes/' : 'includes/';

    const elementsToLoad = ["header", "sidebar", "tasks", "recent-upd", "favorites", "user"];

    Promise.all(elementsToLoad.map(element => loadHTML(element, `${basePath}${element}.html`)))
        .then(() => {
            fixLogoLink();
        })
        .catch(err => console.error("Erro ao carregar includes:", err));
});
