async function loadHTML(id, file) {
    const targetElement = document.getElementById(id);
    if (!targetElement) return;

    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Erro ao carregar "${file}": ${response.statusText}`);
        const html = await response.text();
        targetElement.innerHTML = html;
    } catch (error) {
        console.error(`Erro ao carregar "${file}":`, error);
        targetElement.innerHTML = `<p style="color:red;">Erro ao carregar conteúdo.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadHTML('header', 'inc-header.html');          // Carrega o header
    loadHTML('sidebar', 'inc-sidebar.html');        // Carrega o sidebar
    loadHTML('favorites', 'inc-favorites.html');    // Carrega os favoritos
    loadHTML('recent-upd', 'inc-recent-upd.html');  // Carrega as atualizações recentes
    loadHTML('tasks', 'inc-tasks.html');            // Carrega as tarefas
});
