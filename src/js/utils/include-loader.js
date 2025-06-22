// src/js/utils/include-loader.js

export async function loadHTML(id, file) {
    const targetElement = document.getElementById(id);
    if (!targetElement) {
        console.warn(`[LOAD HTML] Elemento com ID "${id}" não encontrado para carregar ${file}.`);
        return Promise.reject(new Error(`Elemento HTML com ID "${id}" não encontrado.`));
    }

    try {
        console.log(`[LOAD HTML] Tentando fetch de: "${file}" para o elemento #${id}`);
        const response = await fetch(file);

        if (!response.ok) {
            console.error(`[LOAD HTML] ERRO HTTP ${response.status} ao carregar "${file}" (para #${id}): ${response.statusText}`);
            throw new Error(`Erro HTTP ao carregar "${file}": ${response.status} ${response.statusText}`);
        }

        const html = await response.text();
        targetElement.innerHTML = html;
        console.log(`[LOAD HTML] Conteúdo de "${file}" carregado com sucesso para #${id}.`);

        return id;
    } catch (error) {
        console.error(`[LOAD HTML] ERRO GERAL ao carregar HTML de "${file}" para #${id}:`, error);
        targetElement.innerHTML = `<p style="color:red;">Erro ao carregar conteúdo: ${error.message}</p>`;
        throw error;
    }

}