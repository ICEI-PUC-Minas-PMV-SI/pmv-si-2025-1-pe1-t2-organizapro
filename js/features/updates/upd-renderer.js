import { getUpdates } from './upd-data.js';
import { getTagColor } from '../../utils/color-helpers.js';

function formatarData(dataString) {
  const data = new Date(dataString);
  if (isNaN(data.getTime())) return 'Data Inválida';

  return data.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function criarCardWidget(update) {
  const card = document.createElement('div');
  card.className = 'card-widget';
  card.dataset.id = update.id;

  const imgUrl = update.url_imagem || `https://picsum.photos/seed/${encodeURIComponent(update.id)}/300/200`;
  const dataFormatada = formatarData(update.data_criacao);
  const descricaoLimpa = (update.descricao || '').replace(/<[^>]+>/g, '').slice(0, 100);

  card.innerHTML = `
      <a href="/pages/upd-panel.html#update-${update.id}" class="card-widget-link" title="Ver detalhes">
    <img src="${imgUrl}" alt="Imagem da atualização" class="card-widget-img" onerror="this.src='https://via.placeholder.com/300x200'" />
    <div class="card-widget-content">
      <h4 class="card-widget-title">${update.titulo || 'Sem Título'}</h4>
      <span class="card-widget-date">${dataFormatada}</span>
    </div>
  `;

  card.addEventListener('click', () => {
    const painelCard = document.querySelector(`.card-painel[data-update-id="${update.id}"]`);
    if (painelCard) {
      painelCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

      painelCard.classList.add('destaque-temporario');
      setTimeout(() => {
        painelCard.classList.remove('destaque-temporario');
      }, 2500);
    } else {
      console.warn(`Card do painel para update id ${update.id} não encontrado.`);
    }
  });

  return card;
}

export function criarCardPainel(update) {
  const card = document.createElement('div');
  card.className = 'card-painel';
  card.dataset.updateId = update.id;

  const imgUrl = update.url_imagem || `https://picsum.photos/seed/${encodeURIComponent(update.id)}/600/400`;
  const dataFormatada = formatarData(update.data_criacao);

  const descricaoHtml = update.descricao || '';

  const etiquetasHTML = (update.etiquetas || [])
    .map(tag => {
      const color = getTagColor(tag);
      return `<span class="card-tag" style="background-color: ${color}">${tag}</span>`;
    })
    .join(' ');

  card.innerHTML = `
    <div class="card-painel-image">
      <img src="${imgUrl}" alt="Imagem da atualização" onerror="this.src='https://via.placeholder.com/600x400'" />
    </div>
    <div class="card-painel-content">
      <h3 class="card-painel-title">${update.titulo || 'Sem Título'}</h3>
      <span class="card-painel-date">${dataFormatada}</span>
      <div class="card-tags">${etiquetasHTML}</div>
      
      <div class="card-painel-desc">
        <div class="descricao-curta">${descricaoHtml}</div>
      </div>

      <div class="card-actions">
        <button class="favoritar-update" data-id="${update.id}" title="Favoritar">
          <span class="material-symbols-outlined ${update.favorito ? 'favorito-ativo' : ''}" style="font-variation-settings: 'FILL' ${update.favorito ? 1 : 0};">
            ${update.favorito ? "favorite" : "favorite_border"}
          </span>
        </button>
        <button class="editar-update" data-id="${update.id}" title="Editar">
          <span class="material-symbols-outlined">edit</span>
        </button>
        ${update.status === "Ativo" ? `
          <button class="arquivar-update" title="Arquivar" data-id="${update.id}">
            <span class="material-symbols-outlined">archive</span>
          </button>` : `
          <button class="desarquivar-update" title="Reativar" data-id="${update.id}">
            <span class="material-symbols-outlined">refresh</span>
          </button>`}
        <button class="excluir-update" title="Excluir" data-id="${update.id}">
          <span class="material-symbols-outlined">delete_forever</span>
        </button>
      </div>
    </div>
  `;

  const textoLimpo = descricaoHtml.replace(/<[^>]+>/g, '');
  if (textoLimpo.length > 300) {
    const descCurta = card.querySelector('.descricao-curta');
    const cardActions = card.querySelector('.card-actions');

    const btnToggle = document.createElement('button');
    btnToggle.className = 'toggle-desc';
    btnToggle.title = 'Expandir';
    btnToggle.innerHTML = `<span class="material-symbols-outlined">visibility</span>`;

    btnToggle.addEventListener('click', () => {
      const isExpanded = descCurta.classList.toggle('expanded');

      if (isExpanded) {
        btnToggle.innerHTML = `<span class="material-symbols-outlined">visibility_off</span>`;
        btnToggle.title = 'Ocultar';
      } else {
        btnToggle.innerHTML = `<span class="material-symbols-outlined">visibility</span>`;
        btnToggle.title = 'Expandir';
      }
    });

    const btnFavoritar = cardActions.querySelector('.favoritar-update');
    cardActions.insertBefore(btnToggle, btnFavoritar);
  }

  return card;

}

export async function renderizarAtualizacoes(containerId, criarCardFunc, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Container com id '${containerId}' não encontrado.`);
    return;
  }

  let updates = getUpdates();

  updates.sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));

  const filtro = options.filtro || {};

  if (filtro.busca) {
    const buscaLower = filtro.busca.toLowerCase();
    updates = updates.filter(u =>
      (u.titulo || '').toLowerCase().includes(buscaLower) ||
      (u.descricao || '').toLowerCase().includes(buscaLower)
    );
  }

  if (filtro.favoritos) {
    updates = updates.filter(u => u.favorito === true);
  }

  if (filtro.status && Array.isArray(filtro.status) && filtro.status.length > 0) {
  const statusLowerCase = filtro.status.map(s => s.trim().toLowerCase());
  updates = updates.filter(u => statusLowerCase.includes((u.status || '').trim().toLowerCase()));
}

  if (filtro.etiquetas && filtro.etiquetas.length > 0) {
    updates = updates.filter(update =>
      update.etiquetas && filtro.etiquetas.every(tag => update.etiquetas.includes(tag))
    );
  }

  if (filtro.data) {
    const filtroData = new Date(filtro.data);
    filtroData.setHours(0, 0, 0, 0);

    updates = updates.filter(u => {
      const dataCriacao = new Date(u.data_criacao);
      dataCriacao.setHours(0, 0, 0, 0);
      return dataCriacao.getTime() === filtroData.getTime();
    });
  }

  if (options.limite && Number.isInteger(options.limite)) {
    updates = updates.slice(0, options.limite);
  }

  container.innerHTML = '';

  if (updates.length === 0) {
    container.innerHTML = '<p>Nenhuma atualização encontrada.</p>';
    return;
  }

  for (const update of updates) {
    const card = criarCardFunc(update);
    container.appendChild(card);
  }
}
