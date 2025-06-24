import {
  toggleFavorito,
  arquivarUpdate,
  desarquivarUpdate,
  excluirUpdate,
  getUpdates,
  saveUpdates,
} from './upd-data.js';
import { setUpdateForEditing } from './upd-form.js';

function delegarEvento(container, seletor, evento, handler) {
  container.addEventListener(evento, (e) => {
    const alvo = e.target.closest(seletor);
    if (alvo) handler(alvo, e);
  });
}

export function inicializarEventos(containerId, atualizarPainelCallback) {
  const container = document.getElementById(containerId); 
  if (!container) {
    console.error(`Container com id '${containerId}' não encontrado para inicializar eventos.`);
    return;
  }

  delegarEvento(container, '.favoritar-update', 'click', (el) => {
    toggleFavorito(el.dataset.id);
    atualizarPainelCallback();
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
    atualizarPainelCallback();
  });

  delegarEvento(container, '.excluir-update', 'click', (el) => {
    if (confirm('Deseja realmente excluir esta atualização?')) {
      excluirUpdate(el.dataset.id);
      atualizarPainelCallback();
    }
  });
}
