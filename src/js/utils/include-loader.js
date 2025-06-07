// src/js/include-loader.js

export async function loadHTML(id, file) {
    const targetElement = document.getElementById(id);
    if (!targetElement) {
        console.warn(`Elemento com ID "${id}" não encontrado para carregar ${file}.`);
        return Promise.reject(new Error(`Elemento HTML com ID "${id}" não encontrado.`)); 
    }

    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`Erro HTTP ao carregar "${file}": ${response.status} ${response.statusText}`);
        }
        const html = await response.text();
        
        targetElement.innerHTML = html;
        
        return id; 
    } catch (error) {
        console.error(`Erro ao carregar HTML de "${file}":`, error);
        targetElement.innerHTML = `<p style="color:red;">Erro ao carregar conteúdo: ${error.message}</p>`;
        throw error; 
    }
}