// src/features/updates/upd-panel.js

import {
    obterUpdatePorId,
    toggleFavorito,
    excluirUpdate,
    arquivarUpdate,
    desarquivarUpdate,
    obterUpdatesFiltrados,
} from './upd-data.js';

import { renderizarAtualizacoes, criarCardPadrao } from './upd-renderer.js';

function formatarDataParaExibicao(dataString) {
    if (!dataString) return '';
    const data = new Date(dataString);
    if (isNaN(data.getTime())) return 'Data Inválida';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return data.toLocaleDateString('pt-BR', options);
}

export function criarCardPainel(update) { 
    const card = document.createElement('div');
    card.classList.add('news-card'); 

    if (update.favorito) card.classList.add('favorited-card');
    if (update.inativo) card.classList.add('archived-card');

    const fileExtension = update.arquivo ? update.arquivo.split('.').pop().toLowerCase() : '';
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(fileExtension);
    const imgUrl = update.url_imagem || (isImage ? `/uploads/${update.arquivo}` : `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`);

    const cardTitle = update.titulo + (update.versao && update.versao > 1 ? ` (v${update.versao})` : '');
    const shortDescription = update.descricao ? update.descricao.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '';

    const dataPublicacao = formatarDataParaExibicao(update.dataCriacao || update.data_criacao);
    const dataUltimaAtualizacao = formatarDataParaExibicao(update.ultimaAtualizacao || update.data_criacao);

    card.innerHTML = `
        <img class="news-img-right" src="${imgUrl}" alt="Imagem da atualização"
            loading="lazy" width="200" height="200" onerror="this.onerror=null;this.src='https://via.placeholder.com/200x200?text=Sem+Imagem';" />
        <div class="news-content-left">
            <h3 class="news-title">${cardTitle}</h3>
            <span class="news-date">Publicado: ${dataPublicacao} (Última Atualização: ${dataUltimaAtualizacao})</span>
            <p class="news-description">${shortDescription}</p>
            <div class="panel-actions">
                <span class="material-symbols-outlined view-icon" title="Visualizar" role="button" tabindex="0" data-id="${update.id}">visibility</span>
                <span class="material-symbols-outlined edit-icon" title="Editar" role="button" tabindex="0" data-id="${update.id}">edit</span>
                <span class="material-symbols-outlined favorite-icon ${update.favorito ? 'favorited' : ''}" title="Favoritar" role="button" tabindex="0" data-id="${update.id}">favorite</span>
                <span class="material-symbols-outlined ${update.inativo ? 'unarchive-icon' : 'archive-icon'}" title="${update.inativo ? 'Desarquivar' : 'Arquivar'}" role="button" tabindex="0" data-id="${update.id}">${update.inativo ? 'unarchive' : 'archive'}</span>
                <span class="material-symbols-outlined delete-icon" title="Excluir" role="button" tabindex="0" data-id="${update.id}">delete</span>
                <button class="button button--acessar" data-id="${update.id}">Acessar item alterado</button>
            </div>
        </div>
    `;
    return card;
}

export function initUpdPanel(formModalControllerInstance, setUpdateForEditingFunc, initUpdViewModalFunc) {

    const btnNovaAtualizacao = document.getElementById('btn-nova-atualizacao');
    const updSearchInput = document.getElementById('upd-search-input');
    const updSearchClearIcon = document.querySelector('.upd-search-clear-icon');
    const updFiltroFavoritosBtn = document.getElementById('upd-filtro-favoritos');
    const updLimparFiltrosBtn = document.getElementById('upd-limpar-filtros');

    const PANEL_CARDS_CONTAINER_ID = 'panel-cards-container';

    let currentFilter = {
        busca: '',
        favoritos: false,
        status: ['Ativo']
    };

    async function refreshPanelUpdates() {
        await renderizarAtualizacoes(PANEL_CARDS_CONTAINER_ID, criarCardPainel, null, currentFilter);
    }

    if (updSearchInput) {
        updSearchInput.addEventListener('input', (event) => {
            currentFilter.busca = event.target.value.trim();
            if (updSearchClearIcon) updSearchClearIcon.style.display = currentFilter.busca ? 'block' : 'none';
            refreshPanelUpdates();
        });
    }

    if (updSearchClearIcon) {
        updSearchClearIcon.addEventListener('click', () => {
            if (updSearchInput) updSearchInput.value = '';
            updSearchClearIcon.style.display = 'none';
            currentFilter.busca = '';
            refreshPanelUpdates();
        });
    }

    if (updFiltroFavoritosBtn) {
        updFiltroFavoritosBtn.addEventListener('click', () => {
            currentFilter.favoritos = !currentFilter.favoritos;
            updFiltroFavoritosBtn.classList.toggle('active', currentFilter.favoritos);
            refreshPanelUpdates();
        });
    }

    if (updLimparFiltrosBtn) {
        updLimparFiltrosBtn.addEventListener('click', () => {
            currentFilter = {
                busca: '',
                favoritos: false,
                status: ['Ativo']
            };
            if (updSearchInput) updSearchInput.value = '';
            if (updSearchClearIcon) updSearchClearIcon.style.display = 'none';
            if (updFiltroFavoritosBtn) updFiltroFavoritosBtn.classList.remove('active');
            refreshPanelUpdates();
        });
    }

    if (btnNovaAtualizacao) {
        btnNovaAtualizacao.addEventListener('click', () => {
            if (formModalControllerInstance) {
                formModalControllerInstance.setTitulo("Nova Atualização");
                formModalControllerInstance.dispararLimpeza();
                formModalControllerInstance.abrir();
            } else {
                console.error("Erro: A instância de formModalController não foi passada para initUpdPanel.");
            }
        });
    }

    if (document.body) {
        document.body.addEventListener('click', async (event) => {
            const target = event.target;
            const cardElement = target.closest('.news-card'); 
            if (!cardElement) return; 

            const updateId = cardElement.querySelector('[data-id]')?.dataset.id || target.dataset.id; 
            if (!updateId) { console.warn('ID da atualização não encontrado no elemento clicado ou no card pai.'); return; }

            const update = await obterUpdatePorId(updateId); 
            if (!update) { console.warn(`Atualização com ID ${updateId} não encontrada.`); return; }

            if (target.classList.contains('view-icon')) {
                if (initUpdViewModalFunc) initUpdViewModalFunc(updateId); 
            } else if (target.classList.contains('edit-icon')) {
                if (setUpdateForEditingFunc) setUpdateForEditingFunc(update, false); 
            } else if (target.classList.contains('favorite-icon')) {
                await toggleFavorito(update.id);
                refreshPanelUpdates();
            } else if (target.classList.contains('delete-icon')) {
                if (confirm(`Tem certeza que deseja excluir a atualização "${update.titulo}"? Esta ação é irreversível.`)) {
                    await excluirUpdate(update.id);
                    alert('Atualização excluída com sucesso!');
                    refreshPanelUpdates();
                }
            } else if (target.classList.contains('archive-icon') || target.classList.contains('unarchive-icon')) {
                if (update.inativo) {
                    await desarquivarUpdate(update.id);
                    alert(`Atualização "${update.titulo}" desarquivada!`);
                } else {
                    await arquivarUpdate(update.id);
                    alert(`Atualização "${update.titulo}" arquivada!`);
                }
                refreshPanelUpdates();
            } else if (target.classList.contains('button--acessar')) { 
                console.log(`Acessar item alterado para o ID: ${update.id}`);
            }
        });
    }

        refreshPanelUpdates();
}