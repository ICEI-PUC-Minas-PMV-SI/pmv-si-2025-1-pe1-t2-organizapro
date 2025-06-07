// js/features/common/filter-controls.js

// Importa a função de renderização da tabela do módulo 'procedure-table'
import { renderizarTabela } from '../../features/procedures/procedure-table.js';
// Importa as funções de dados necessárias do módulo 'procedure-data'
import {
    obterEtiquetasUnicas,
    obterTiposUnicos,
    obterProcedimentos, // Necessário para obterDatasUnicas
} from '../../features/procedures/procedure-data.js';
// Importa a função de formatação de data do módulo de utilitários
import { formatarDataParaBR } from '/src/js/utils/formatters.js';

// Define os filtros ativos como um objeto com propriedades para cada filtro
const filtrosAtivos = {
    busca: '',
    tipo: [],
    etiquetas: [],
    status: [],
    ultimaAtualizacao: null,
    favoritos: false,
};

// Variáveis para as referências DOM (declaradas com 'let', serão atribuídas em initFilterControls)
let inputBusca;
let btnFavoritos;
let filtrosDropdownElements;
let limparFiltrosBtn; // Variável para o botão "Limpar Filtros"


/**
 * Obtém as datas de última atualização únicas dos procedimentos.
 * @returns {string[]} Um array de datas únicas no formato ISO, ordenadas decrescentemente.
 */
function obterDatasUnicas() {
    const datas = new Set();
    obterProcedimentos().forEach(p => {
        if (p.ultimaAtualizacao) datas.add(p.ultimaAtualizacao);
    });
    return Array.from(datas).sort((a, b) => b.localeCompare(a));
}

/**
 * Cria o HTML para as opções de checkbox dentro de um dropdown de filtro.
 * @param {string[]} opcoes Array de opções para os checkboxes.
 * @param {string} chaveFiltro A chave do filtro (ex: 'tipo', 'etiquetas').
 * @returns {string} O HTML das opções de checkbox.
 */
function criarOpcoesCheckbox(opcoes, chaveFiltro) {
    if (!opcoes || opcoes.length === 0) return '<div class="filtro-sem-opcoes">Nenhuma opção</div>';
    return opcoes.map(op => {
        const idOpcao = `filtro-${chaveFiltro}-${op.replace(/\s+/g, '-')}`;
        const isChecked = Array.isArray(filtrosAtivos[chaveFiltro]) && filtrosAtivos[chaveFiltro].includes(op) ? 'checked' : '';
        return `
            <label class="filtro-opcao custom-checkbox" for="${idOpcao}">
                <input type="checkbox" id="${idOpcao}" value="${op}" ${isChecked}>
                <span class="checkmark"></span>
                ${op}
            </label>
        `;
    }).join('');
}

/**
 * Popula um dropdown de filtro na UI com as opções geradas.
 * @param {string} chave A chave do filtro (data-filter-key do th).
 * @param {string[]} opcoes As opções a serem exibidas no dropdown.
 */
function popularDropdown(chave, opcoes) {
    const dropdown = document.querySelector(`th[data-filter-key="${chave}"] .filtro-dropdown`);
    if (dropdown) {
        dropdown.innerHTML = criarOpcoesCheckbox(opcoes, chave);
    }
}

/**
 * Popula todos os dropdowns de filtro na UI.
 * Assume que os elementos filterable estão no DOM.
 */
function popularFiltrosUI() {
    const opcoesTipo = obterTiposUnicos();
    const opcoesEtiquetas = obterEtiquetasUnicas();
    const opcoesStatus = ['Ativo', 'Inativo'];
    const opcoesUltimaAtualizacao = obterDatasUnicas();

    popularDropdown('tipo', opcoesTipo);
    popularDropdown('etiquetas', opcoesEtiquetas);
    popularDropdown('status', opcoesStatus);

    const dropdownUltimaAtualizacao = document.querySelector('th[data-filter-key="ultimaAtualizacao"] .filtro-dropdown');
    if (dropdownUltimaAtualizacao) {
        const isAnyDateSelected = filtrosAtivos.ultimaAtualizacao === null ? 'ativo' : '';
        dropdownUltimaAtualizacao.innerHTML = opcoesUltimaAtualizacao.map(dataISO => {
            const dataBR = formatarDataParaBR(dataISO);
            const isButtonSelected = filtrosAtivos.ultimaAtualizacao === dataISO ? 'ativo' : '';
            return `<button type="button" data-valor="${dataISO}" class="${isButtonSelected}">${dataBR}</button>`;
        }).join('') + `<button type="button" class="filtro-limpar ${isAnyDateSelected}" data-valor="">Qualquer Data</button>`;
    }
}

/**
 * Fecha todos os dropdowns de filtro abertos na interface.
 */
function fecharTodosDropdowns() {
    document.querySelectorAll('.filtro-dropdown').forEach((d) => {
        if (d.style.display === 'block') d.style.display = 'none';
    });
}

/**
 * Atualiza a tabela de procedimentos aplicando os filtros ativos.
 * Esta função é exportada para que outros módulos (como procedure-form.js) possam chamá-la.
 */
export function atualizarTabela() {
    console.log("FILTROS ATIVOS:", JSON.stringify(filtrosAtivos));
    renderizarTabela(filtrosAtivos); // Chama a função do procedure-table.js
}

/**
 * Reseta todos os filtros ativos (busca, tipo, etiquetas, status, ultimaAtualizacao, favoritos)
 * e atualiza a interface para refletir o reset.
 */
function resetAllFilters() { // <-- FUNÇÃO POSICIONADA AQUI, ANTES DE initFilterControls
    // 1. Resetar o objeto de filtros ativos
    filtrosAtivos.busca = '';
    filtrosAtivos.tipo = [];
    filtrosAtivos.etiquetas = [];
    filtrosAtivos.status = [];
    filtrosAtivos.ultimaAtualizacao = null;
    filtrosAtivos.favoritos = false;

    // 2. Resetar a interface visual
    // Limpar o campo de busca
    if (inputBusca) {
        inputBusca.value = '';
    }

    // Resetar o botão de favoritos
    if (btnFavoritos) {
        btnFavoritos.classList.remove('ativo');
        const icone = btnFavoritos.querySelector(".material-symbols-outlined");
        if (icone) {
            icone.textContent = "favorite_border"; // Ícone de coração vazado
            icone.style.fontVariationSettings = "'FILL' 0"; // Sem preenchimento
        }
    }

    // Resetar os dropdowns de filtro (desmarcar checkboxes, desativar botões de data)
    // Isso deve ser feito após popularFiltrosUI ter criado os elementos.
    if (filtrosDropdownElements && filtrosDropdownElements.length > 0) {
        filtrosDropdownElements.forEach((th) => {
            const dropdown = th.querySelector('.filtro-dropdown');
            if (dropdown) {
                // Desmarcar todos os checkboxes
                dropdown.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
                // Desativar todos os botões de data e ativar "Qualquer Data" se for o filtro de data
                if (th.dataset.filterKey === 'ultimaAtualizacao') {
                    dropdown.querySelectorAll('button').forEach(button => {
                        button.classList.remove('ativo');
                        if (button.dataset.valor === '') { // O botão "Qualquer Data"
                            button.classList.add('ativo');
                        }
                    });
                }
            }
        });
    }


    // 3. Renderizar a tabela novamente com os filtros resetados
    atualizarTabela();
    // Opcional: Fechar todos os dropdowns de filtro abertos após a limpeza
    fecharTodosDropdowns();
}


/**
 * Inicializa a lógica de controle de filtros da tabela.
 * DEVE ser chamada uma única vez pelo app.js APÓS o HTML dos filtros estar no DOM.
 */
export function initFilterControls() {
    // 1. CAPTURA AS REFERÊNCIAS DOM AQUI DENTRO, AGORA QUE O HTML DEVE ESTAR PRESENTE.
    inputBusca = document.getElementById('procedure-search-input');
    console.log("initFilterControls: Tentando encontrar inputBusca (via ID 'procedure-search-input'):", inputBusca);

    btnFavoritos = document.getElementById('filtro-favoritos');
    limparFiltrosBtn = document.getElementById('limparFiltrosBtn'); 

    filtrosDropdownElements = document.querySelectorAll('.filterable');

    // Validação básica para garantir que os elementos foram encontrados
    if (!inputBusca || !btnFavoritos || !limparFiltrosBtn || filtrosDropdownElements.length === 0) {
        console.error("Erro: initFilterControls() chamado, mas elementos DOM dos filtros não foram encontrados completamente. Funcionalidade será limitada.");
    }
    
    // 2. Popula a UI dos filtros (pode depender de inputBusca, btnFavoritos, etc.)
    // Esta chamada precisa ser feita depois que as refs DOM são capturadas.
    popularFiltrosUI();

    // 3. Adiciona os event listeners
    if (inputBusca) {
        inputBusca.addEventListener('input', (e) => {
            console.log("InputBusca: Evento 'input' disparado. Valor:", e.target.value);
            filtrosAtivos.busca = e.target.value.toLowerCase();
            atualizarTabela();
        });

        inputBusca.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                console.log("InputBusca: Tecla 'Enter' pressionada. Valor:", e.target.value);
                filtrosAtivos.busca = e.target.value.toLowerCase();
                atualizarTabela();
                e.target.blur();
            }
        });
    }

    if (btnFavoritos) {
        btnFavoritos.addEventListener('click', () => {
            filtrosAtivos.favoritos = !filtrosAtivos.favoritos;
            btnFavoritos.classList.toggle('ativo', filtrosAtivos.favoritos);
            const icone = btnFavoritos.querySelector(".material-symbols-outlined");
            if (icone) {
                icone.textContent = filtrosAtivos.favoritos ? "favorite" : "favorite_border";
                icone.style.fontVariationSettings = filtrosAtivos.favoritos ? "'FILL' 1" : "'FILL' 0";
            }
            atualizarTabela();
        });
    }

    // NOVO: Adiciona o listener para o botão "Limpar Filtros"
    if (limparFiltrosBtn) {
        limparFiltrosBtn.addEventListener('click', resetAllFilters);
    }

    // Listener para os checkboxes de tipo, etiquetas e status (delegação)
    if (filtrosDropdownElements.length > 0) {
        filtrosDropdownElements.forEach((th) => {
            const btnFiltro = th.querySelector('.btn-filtro');
            const dropdown = th.querySelector('.filtro-dropdown');
            
            if (!btnFiltro || !dropdown) {
                console.warn(`Elemento filterable com data-filter-key="${th.dataset.filterKey}" não tem botões ou dropdowns completos.`);
                return; 
            }

            btnFiltro.addEventListener('click', (event) => {
                event.stopPropagation();
                const aberto = dropdown.style.display === 'block';
                fecharTodosDropdowns();
                dropdown.style.display = aberto ? 'none' : 'block';
            });

            dropdown.addEventListener('change', (event) => {
                if (event.target.type === 'checkbox') {
                    const checkbox = event.target;
                    const filtroChave = th.dataset.filterKey;
                    const valorOpcao = checkbox.value;
                    if (!filtroChave || !filtrosAtivos.hasOwnProperty(filtroChave) || !Array.isArray(filtrosAtivos[filtroChave])) {
                        console.warn(`Filtro "${filtroChave}" não é um array ou não existe.`);
                        return;
                    }

                    const filtroArray = filtrosAtivos[filtroChave];
                    if (checkbox.checked) {
                        if (!filtroArray.includes(valorOpcao)) filtroArray.push(valorOpcao);
                    } else {
                        const index = filtroArray.indexOf(valorOpcao);
                        if (index > -1) filtroArray.splice(index, 1);
                    }
                    atualizarTabela();
                }
            });

            if (th.dataset.filterKey === 'ultimaAtualizacao') {
                dropdown.addEventListener('click', (event) => {
                    if (event.target.tagName === 'BUTTON') {
                        const button = event.target;
                        const valorData = button.dataset.valor || null;

                        dropdown.querySelectorAll('button').forEach(btn => btn.classList.remove('ativo'));
                        button.classList.add('ativo');

                        filtrosAtivos.ultimaAtualizacao = valorData;
                        atualizarTabela();
                        fecharTodosDropdowns();
                    }
                });
            }
        });
    }

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.filterable') && !event.target.closest('.filtro-dropdown')) {
            fecharTodosDropdowns();
        }
    });
}