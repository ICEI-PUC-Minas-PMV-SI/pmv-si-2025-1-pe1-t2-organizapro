window.loadHTML = async function(id, fileName) {
  const targetElement = document.getElementById(id);
  if (!targetElement) return;

  // Caminho relativo
  let basePath = window.location.pathname;

  // Ajusta o caminho para buscar a pasta includes
  if (basePath.includes('/pages/')) {
    basePath = basePath.replace('/pages/', '/'); // Ajusta para a raiz
  }

  const fullPath = `../includes/${fileName}`; 

  try {
    const response = await fetch(fullPath);
    if (!response.ok) throw new Error(`Erro ao carregar "${fileName}": ${response.statusText}`);
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
