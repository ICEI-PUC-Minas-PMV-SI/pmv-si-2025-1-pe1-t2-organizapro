// src/js/include-loader.js

export async function loadHTML(id, file) {
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
