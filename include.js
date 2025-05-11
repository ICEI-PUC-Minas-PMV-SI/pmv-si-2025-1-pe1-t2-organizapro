window.loadHTML = async function(id, file) {
  const targetElement = document.getElementById(id);
  if (!targetElement) return;

  // Verifica se o site está sendo acessado localmente (live-server)
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const pathPrefix = isLocal ? 'includes/' : '/';  // No local, usa 'includes/', no GitHub Pages usa a raiz

  try {
    const response = await fetch(`${pathPrefix}${file}`);  // Concatena o caminho adequado
    if (!response.ok) throw new Error(`Erro ao carregar "${file}": ${response.statusText}`);
    const html = await response.text();
    targetElement.innerHTML = html;
  } catch (error) {
    console.error(`Erro ao carregar "${file}":`, error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadHTML('header', 'inc-header.html');
  loadHTML('sidebar', 'inc-sidebar.html');
  loadHTML('favorites', 'inc-favorites.html');
  loadHTML('recent-upd', 'inc-recent-upd.html');
  loadHTML('tasks', 'inc-tasks.html');
});
