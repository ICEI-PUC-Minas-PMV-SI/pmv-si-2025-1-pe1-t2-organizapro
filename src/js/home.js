
document.addEventListener('DOMContentLoaded', () => {
    initBuscaMenu();
    initCriarTarefa();
    initModoEscuro();
    initLogout();
    initToggleQuadros();
});
function initBuscaMenu() {
    const inputBusca = document.querySelector('.search-wrapper input');
    inputBusca.addEventListener('input', function (e) {
        const termo = e.target.value.toLowerCase();
        document.querySelectorAll('.menu-button').forEach(btn => {
            const texto = btn.textContent.toLowerCase();
            btn.style.display = texto.includes(termo) ? 'block' : 'none';
        });
    });
}
function initCriarTarefa() {
    const botaoCriar = document.querySelector('.criar');
    botaoCriar.addEventListener('click', () => {
        const titulo = prompt('Digite o nome da nova tarefa:');
        if (titulo) {
            const novaTarefa = criarTarefaCard(titulo);
            const quadroAFazer = document.querySelector('.quadro:nth-child(1)');
            quadroAFazer.appendChild(novaTarefa);
        }
    });
}

function criarTarefaCard(titulo) {
    const card = document.createElement('div');
    card.className = 'tarefa-card';
    card.innerHTML = `
        <div>${titulo}</div>
        <div><span class="tag">nova</span></div>
        <div><i class="fas fa-calendar-alt"></i> ${formatarData(new Date())}</div>
    `;
    return card;
}

function formatarData(data) {
    const opcoes = { day: '2-digit', month: 'long', year: 'numeric' };
    return data.toLocaleDateString('pt-BR', opcoes);
}
document.addEventListener('DOMContentLoaded', () => {
    initDragAndDrop();
    initModoEscuro();
    initLogout();
    initCriarTarefa();
});

function initDragAndDrop() {
    const tarefaCards = document.querySelectorAll('.tarefa-card');
    const quadros = document.querySelectorAll('.quadro');

    tarefaCards.forEach(card => {
        habilitarDrag(card);
    });

    quadros.forEach(quadro => {
        quadro.addEventListener('dragover', e => {
            e.preventDefault();
            quadro.classList.add('quadro-hover');
        });

        quadro.addEventListener('dragleave', () => {
            quadro.classList.remove('quadro-hover');
        });

        quadro.addEventListener('drop', e => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            const tarefa = document.getElementById(id);
            if (tarefa) {
                quadro.appendChild(tarefa);
                quadro.classList.remove('quadro-hover');
            }
        });
    });
}

function habilitarDrag(card) {
    card.setAttribute('draggable', true);
    card.id = card.id || `tarefa-${Date.now() + Math.floor(Math.random() * 1000)}`;

    card.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', card.id);
        setTimeout(() => {
            card.classList.add('invisivel');
        }, 0);
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('invisivel');
    });
}
function initLogout() {
    const botaoSair = document.querySelector('.fa-sign-out-alt');
    botaoSair.addEventListener('click', () => {
        if (confirm('Deseja realmente sair da sua conta?')) {
            alert('Sessão encerrada. Redirecionando...');
            window.location.href = '/login.html';
        }
    });
}
