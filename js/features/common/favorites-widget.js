import { obterProcedimentos, atualizarOrdemFavoritos, toggleFavorito } from '../procedures/procedure-data.js';
import { abrirModalVisualizacao, initProcedureViewModal } from '../procedures/procedure-view-modal.js';

let animFrameId = null;

function createFavoriteCardHTML(procedimento) {
    const isFavorito = procedimento.favorito ? 'ativo' : '';

    return `
    <article class="favorite-card" draggable="true" data-favorite-id="${procedimento.id}">
      <div class="favorite-details">
        <h3 class="favorite-name">${procedimento.titulo || 'Sem título'}</h3>
        <div class="favorite-actions">
          <button class="toggle-favorite-button ${isFavorito}" title="Remover dos favoritos">
            <span class="material-symbols-outlined">
              ${procedimento.favorito ? 'favorite' : 'favorite_border'}
            </span>
          </button>
        </div>
      </div>
    </article>
  `;
}

export function renderizarFavoritos() {
    const favoritesListContainer = document.getElementById('favorites-list');
    if (!favoritesListContainer) {
        console.error('Elemento #favorites-list não encontrado no DOM.');
        return;
    }

    const favoritos = obterProcedimentos().filter(proc => proc.favorito);

    favoritesListContainer.innerHTML = favoritos.length
        ? favoritos.map(createFavoriteCardHTML).join('')
        : '<p class="no-favorites-message">Você ainda não tem favoritos.</p>';

    attachToggleFavoriteListeners();
    attachDragAndDropListeners();
    attachCardClickListeners();
}

function attachToggleFavoriteListeners() {
    const favoritesListContainer = document.getElementById('favorites-list');
    if (!favoritesListContainer) return;

    favoritesListContainer.querySelectorAll('.toggle-favorite-button').forEach(button => {
        button.onclick = (event) => {
            const card = event.target.closest('.favorite-card');
            if (!card) return;

            const procedimentoId = card.dataset.favoriteId;
            const procedimento = obterProcedimentos().find(p => p.id === procedimentoId);

            if (!procedimento) return;

            if (procedimento.favorito) {
                const confirmar = confirm(`Deseja realmente remover "${procedimento.titulo || 'este procedimento'}" dos favoritos?`);
                if (!confirmar) return;
            }

            toggleFavorito(procedimentoId);
            renderizarFavoritos();
        };
    });
}

function attachDragAndDropListeners() {
    const favoritesListContainer = document.getElementById('favorites-list');
    if (!favoritesListContainer) return;

    let dragSrcEl = null;

    favoritesListContainer.querySelectorAll('.favorite-card').forEach(card => {
        card.addEventListener('dragstart', (e) => {
            dragSrcEl = card;
            card.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', card.dataset.favoriteId);
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            favoritesListContainer.querySelectorAll('.favorite-card').forEach(c => c.classList.remove('drag-over'));
        });

        card.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';

            const bounding = card.getBoundingClientRect();
            const offset = e.clientY - bounding.top;
            const isAfter = offset > bounding.height / 2;
            const parent = card.parentNode;

            if (dragSrcEl !== card) {
                parent.insertBefore(dragSrcEl, isAfter ? card.nextSibling : card);

                if (animFrameId) cancelAnimationFrame(animFrameId);
                animFrameId = requestAnimationFrame(() => {
                    animateReorder(parent);
                    animFrameId = null;
                });
            }
        });


        card.addEventListener('dragleave', () => {
            card.classList.remove('drag-over');
        });

        card.addEventListener('drop', (e) => {
            e.preventDefault();
            if (card === dragSrcEl) return;

            const novosIds = Array.from(favoritesListContainer.querySelectorAll('.favorite-card'))
                .map(card => card.dataset.favoriteId);

            atualizarOrdemFavoritos(novosIds);
        });

    });
}

function attachCardClickListeners() {
    const favoritesListContainer = document.getElementById('favorites-list');
    if (!favoritesListContainer) return;

    favoritesListContainer.querySelectorAll('.favorite-card').forEach(card => {
        card.addEventListener('click', (event) => {
            const isToggleButton = event.target.closest('.toggle-favorite-button');
            if (isToggleButton) return;

            const procedimentoId = card.dataset.favoriteId;
            abrirModalVisualizacao(procedimentoId);
        });
    });
}

export function initFavoritesWidget() {
    renderizarFavoritos();
    console.log('Widget de favoritos inicializado.');
}

function animateReorder(container) {
    const cards = Array.from(container.querySelectorAll('.favorite-card'));

    const firstRects = cards.map(card => card.getBoundingClientRect());

    requestAnimationFrame(() => {
        const lastRects = cards.map(card => card.getBoundingClientRect());

        cards.forEach((card, index) => {
            const deltaX = firstRects[index].left - lastRects[index].left;
            const deltaY = firstRects[index].top - lastRects[index].top;

            if (deltaX || deltaY) {
                card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

                card.offsetHeight;

                card.style.transition = 'transform 300ms ease';
                card.style.transform = '';

                card.addEventListener('transitionend', () => {
                    card.style.transition = '';
                    card.style.transform = '';
                }, { once: true });
            }
        });
    });
}

