window.loadHTML = async function(id, file) {
  const targetElement = document.getElementById(id);
  if (!targetElement) return;

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Erro ao carregar "${file}": ${response.statusText}`);
    const html = await response.text();
    targetElement.innerHTML = html;
  } catch (error) {
    console.error(`Erro ao carregar "${file}":`, error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadHTML('header', '../includes/header.html');
  loadHTML('sidebar', '../includes/sidebar.html');
  loadHTML('favorites', '../includes/favorites.html');
  loadHTML('recent-upd', '../includes/recent-upd.html');
  loadHTML('tasks', '../includes/tasks.html');
});
