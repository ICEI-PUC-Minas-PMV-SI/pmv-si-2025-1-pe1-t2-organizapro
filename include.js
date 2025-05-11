window.loadHTML = async function(id, fileName) {
  const targetElement = document.getElementById(id);
  if (!targetElement) return;

  // Caminho base
  const isGitHubPages = window.location.hostname.includes('github.io'); 
  let includePath = '';

  // Live Server
  if (!isGitHubPages) {
    includePath = `../includes/${fileName}`; // Caminho relativo no Live Server
  } else {
    // GitHub Pages
    includePath = `https://icei-puc-minas-pmv-si.github.io/pmv-si-2025-1-pe1-t2-organizapro/includes/${fileName}`;
  }

  try {
    const response = await fetch(includePath);
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
