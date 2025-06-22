import {
  toggleFavorito,
  arquivarUpdate,
  desarquivarUpdate,
  excluirUpdate,
  getUpdates,
  saveUpdates
} from './upd-data.js';
import { renderizarAtualizacoes, criarCardPainel } from './upd-renderer.js';
import { setUpdateForEditing } from './upd-form.js';

function delegarEvento(container, seletor, evento, handler) {
  container.addEventListener(evento, (e) => {
    const alvo = e.target.closest(seletor);
    if (alvo) handler(alvo, e);
  });
}

export function inicializarEventos(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  delegarEvento(container, '.favoritar-update', 'click', (el) => {
    toggleFavorito(el.dataset.id);
    renderizarAtualizacoes(containerId, criarCardPainel);
  });

  delegarEvento(container, '.editar-update', 'click', (el) => {
    const card = el.closest('[data-update-id]');
    const id = card ? card.dataset.updateId : null;
    if (!id) {
      alert('ID da atualização não encontrado.');
      return;
    }

    const updates = getUpdates();
    const update = updates.find(u => u.id === id);
    if (update) {
      setUpdateForEditing(update); 
    } else {
      alert('Atualização não encontrada para edição.');
    }
  });

  delegarEvento(container, '.arquivar-update, .desarquivar-update', 'click', (el) => {
    const id = el.dataset.id;
    if (el.classList.contains('arquivar-update')) {
      arquivarUpdate(id);
    } else {
      desarquivarUpdate(id);
    }
    renderizarAtualizacoes(containerId, criarCardPainel);
  });

  delegarEvento(container, '.excluir-update', 'click', (el) => {
    if (confirm('Deseja realmente excluir esta atualização?')) {
      excluirUpdate(el.dataset.id);
      renderizarAtualizacoes(containerId, criarCardPainel);
    }
  });
}
