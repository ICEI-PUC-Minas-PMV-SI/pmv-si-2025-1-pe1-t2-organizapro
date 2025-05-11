// js/include.js

/**
 * Carrega conteúdo HTML externo em um elemento específico da página.
 * Ignora se o elemento não estiver presente no DOM.
 * 
 * @param {string} id - ID do elemento onde o HTML será inserido.
 * @param {string} file - Caminho para o arquivo HTML a ser carregado.
 * @returns {Promise<void>}
 */
function loadHTML(id, file) {
  const targetElement = document.getElementById(id);
  if (!targetElement) return Promise.resolve(); // Ignora se o ID não estiver na página

  return fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Erro ao carregar "${file}": ${response.statusText}`);
      return response.text();
    })
    .then(html => {
      targetElement.innerHTML = html;
    })
    .catch(error => console.error(`Erro ao carregar "${file}":`, error));
}

/**
 * Corrige o link do logotipo para apontar corretamente para /src/
 */
function fixLogoLink() {
  const links = document.querySelectorAll('a[href="index.html"], a[href="./index.html"], a.logo');
  links.forEach(link => {
    link.href = '/src/';
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const isPageInsidePagesFolder = window.location.pathname.includes('/pages/');
  const basePath = isPageInsidePagesFolder ? '../includes/' : 'includes/';

  const includes = ["header", "sidebar", "tasks", "recent-upd", "favorites"];

  Promise.all(
    includes.map(id => loadHTML(id, `${basePath}${id}.html`))
  )
    .then(() => {
      fixLogoLink();
    })
    .catch(err => {
      console.error("Erro ao carregar includes:", err);
    });
});
