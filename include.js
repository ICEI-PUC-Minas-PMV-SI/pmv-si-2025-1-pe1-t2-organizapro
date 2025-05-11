window.loadHTML = async function(id, fileName) {
  const targetElement = document.getElementById(id);
  if (!targetElement) return;

  // Determina o caminho correto para o arquivo
  const isInPages = window.location.pathname.includes('/pages/');
  const fullPath = isInPages ? `../includes/${fileName}` : `/includes/${fileName}`;

  try {
    const response = await fetch(fullPath);
    if (!response.ok) {
      throw new Error(`Erro ao carregar "${fileName}": ${response.statusText}`);
    }
    const html = await response.text();
    targetElement.innerHTML = html;
  } catch (error) {
    console.error(`Erro ao carregar "${fileName}":`, error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const components = ['header', 'sidebar', 'favorites', 'recent-upd', 'tasks'];
  components.forEach(component => loadHTML(component, `${component}.html`));
});
