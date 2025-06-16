// src/features/updates/upd-renderer.js

import { getUpdates, obterUpdatesFiltrados } from './upd-data.js';

export function criarCardPadrao(update) { 
    const data = new Date(update.data_criacao); 

    const dataFormatada = isNaN(data.getTime()) ? 'Data Indisponível' : data.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });

    if (isNaN(data.getTime())) {
        console.warn(`Data inválida (${update.data_criacao}) para o card de atualização "${update.titulo}". Verifique a propriedade 'data_criacao' do objeto de atualização.`);
    }

    const imgUrl = update.url_imagem || 'https://picsum.photos/600/400';
 
    const card = document.createElement('div');
    card.classList.add('card'); 
    card.innerHTML = `
      <div class="image-container">
        <img src="${imgUrl}" alt="Imagem para ${update.titulo}" loading="lazy" />
        <div class="image-overlay">
          <div class="texto-atualizacao-overlay">
            <h3>${update.titulo}</h3>
            <small>${dataFormatada}</small>
          </div>
        </div>
      </div>
    `;
    return card;
}

export async function renderizarAtualizacoes(containerId, cardCreatorFunction, limit = null, filter = null) { 
    const cardsContainer = document.getElementById(containerId);

    if (!cardsContainer) {
        console.warn(`Container de cards #${containerId} não encontrado na página atual. Pulando renderização de atualizações.`);
        return;
    }

    cardsContainer.innerHTML = ''; 

    if (typeof cardCreatorFunction !== 'function') {
        console.error(`Erro: A função criadora de card fornecida para renderizarAtualizacoes não é uma função válida. Recebido: ${typeof cardCreatorFunction}`);
        cardsContainer.innerHTML = '<p>Erro interno: Função de criação de card inválida.</p>';
        return;
    }

    try {
        let atualizacoes;
        if (filter && (filter.busca || filter.favoritos || (filter.status && filter.status.length > 0))) {
            atualizacoes = await obterUpdatesFiltrados(filter);
        } else {
            atualizacoes = await getUpdates();
        }

        if (!Array.isArray(atualizacoes) || atualizacoes.length === 0) {
            cardsContainer.innerHTML = '<p>Nenhuma atualização encontrada.</p>';
            return;
        }

        atualizacoes.sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));

        if (limit !== null && atualizacoes.length > limit) {
            atualizacoes = atualizacoes.slice(0, limit);
        }

        atualizacoes.forEach(upd => {
            const card = cardCreatorFunction(upd); 
            if (card) {
                cardsContainer.appendChild(card);
            }
        });
    } catch (error) {
        console.error('Erro ao carregar ou renderizar atualizações:', error);
        cardsContainer.innerHTML = '<p>Erro ao carregar atualizações.</p>';
    }
}