import { createModalController } from '../../utils/modal-controller.js';

export function initUpdViewModal() {
    let modalController;
    try {
        modalController = createModalController('modal-form-update', 'tituloModal');
    } catch (error) {
        console.error('Erro ao criar modal controller:', error);
        return;
    }
    if (!modalController) return;

    const { abrir, fechar, definirCallbackDeLimpeza, element } = modalController;

    const btnAbrirModal = document.getElementById('btn-nova-atualizacao');
    const btnFecharModal = document.getElementById('cancelar-upd');
    const btnFecharModalX = document.getElementById('fechar-modal-upd');
    const formAtualizacao = document.getElementById('formUpdate');

    if (!btnAbrirModal || !btnFecharModal || !formAtualizacao) {
        console.warn('Elementos do modal de atualizações não encontrados.');
        return;
    }

    btnAbrirModal.addEventListener('click', () => {
        abrir();
        const inputTitulo = element.querySelector('#tituloUpdate');
        if (inputTitulo) inputTitulo.focus();
    });

    btnFecharModal.addEventListener('click', fechar);
    if (btnFecharModalX) btnFecharModalX.addEventListener('click', fechar);

    definirCallbackDeLimpeza(() => {
        formAtualizacao.reset();
        btnAbrirModal.focus();
    });

    function criarCard(titulo, dataStr, imgUrl) {
        const data = new Date(dataStr);
        if (isNaN(data)) return null;

        const opcoes = { year: 'numeric', month: 'long', day: 'numeric' };
        const dataFormatada = data.toLocaleDateString('pt-BR', opcoes);

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
      <div class="image-container">
        <img src="${imgUrl}" alt="${titulo}" loading="lazy" />
        <div class="image-overlay">
          <div class="texto-atualizacao-overlay">
            <h3>${titulo}</h3>
            <small>${dataFormatada}</small>
          </div>
        </div>
      </div>
    `;
        return card;
    }

    function adicionarAtualizacao(titulo, dataStr, imgUrl) {
        const cardsContainer = document.querySelector('.section-atualizacoes .cards');
        if (!cardsContainer) {
            console.error('Container de cards não encontrado.');
            return;
        }
        const card = criarCard(titulo, dataStr, imgUrl);
        if (card) {
            cardsContainer.prepend(card);
        } else {
            alert('Data inválida, atualização não adicionada.');
        }
    }

    formAtualizacao.addEventListener('submit', (e) => {
        e.preventDefault();

        const titulo = formAtualizacao.titulo.value.trim();
        if (!titulo) {
            alert('Por favor, preencha o título.');
            return;
        }

        fechar();
    });
}
