// js/features/common/filter-controls.js

import { renderizarTabela } from '../../features/procedures/procedure-table.js';
import {
    obterEtiquetasUnicas,
    obterTiposUnicos,
    obterProcedimentos,
} from '../../features/procedures/procedure-data.js';
import { formatarDataParaBR } from '/src/js/utils/formatters.js';

const filtrosAtivos = {
    busca: '',
    tipo: [],
    etiquetas: [],
    status: [],
    ultimaAtualizacao: null,
    favoritos: false,
};

let inputBusca;
let btnFavoritos;
let filtrosDropdownElements;
let limparFiltrosBtn;

function obterDatasUnicas() {
    const datas = new Set();
    obterProcedimentos().forEach(p => {
        if (p.ultimaAtualizacao) datas.add(p.ultimaAtualizacao);
    });
    return Array.from(datas).sort((a, b) => b.localeCompare(a));
}

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

function popularDropdown(chave, opcoes) {
    const dropdown = document.querySelector(`th[data-filter-key="${chave}"] .filtro-dropdown`);
    if (dropdown) {
        dropdown.innerHTML = criarOpcoesCheckbox(opcoes, chave);
    }
}

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

function fecharTodosDropdowns() {
    document.querySelectorAll('.filtro-dropdown').forEach((d) => {
        if (d.style.display === 'block') d.style.display = 'none';
    });
}

export function atualizarTabela() {
    renderizarTabela(filtrosAtivos);
}

function resetAllFilters() {
    filtrosAtivos.busca = '';
    filtrosAtivos.tipo = [];
    filtrosAtivos.etiquetas = [];
    filtrosAtivos.status = [];
    filtrosAtivos.ultimaAtualizacao = null;
    filtrosAtivos.favoritos = false;

    if (inputBusca) inputBusca.value = '';

    if (btnFavoritos) {
        btnFavoritos.classList.remove('ativo');
        const icone = btnFavoritos.querySelector(".material-symbols-outlined");
        if (icone) {
            icone.textContent = "favorite_border";
            icone.style.fontVariationSettings = "'FILL' 0";
        }
    }

    if (filtrosDropdownElements && filtrosDropdownElements.length > 0) {
        filtrosDropdownElements.forEach((th) => {
            const dropdown = th.querySelector('.filtro-dropdown');
            if (dropdown) {
                dropdown.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
                if (th.dataset.filterKey === 'ultimaAtualizacao') {
                    dropdown.querySelectorAll('button').forEach(button => {
                        button.classList.remove('ativo');
                        if (button.dataset.valor === '') button.classList.add('ativo');
                    });
                }
            }
        });
    }

    atualizarTabela();
    fecharTodosDropdowns();
}

export function initFilterControls() {
    inputBusca = document.getElementById('procedure-search-input');
    btnFavoritos = document.getElementById('filtro-favoritos');
    limparFiltrosBtn = document.getElementById('limparFiltrosBtn');
    filtrosDropdownElements = document.querySelectorAll('.filterable');

    if (!inputBusca || !btnFavoritos || !limparFiltrosBtn || filtrosDropdownElements.length === 0) {
        console.error("Erro: elementos DOM dos filtros não foram encontrados completamente.");
    }
    
    popularFiltrosUI();

    if (inputBusca) {
        inputBusca.addEventListener('input', (e) => {
            filtrosAtivos.busca = e.target.value.toLowerCase();
            atualizarTabela();
        });

        inputBusca.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
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

    if (limparFiltrosBtn) {
        limparFiltrosBtn.addEventListener('click', resetAllFilters);
    }

    if (filtrosDropdownElements.length > 0) {
        filtrosDropdownElements.forEach((th) => {
            const btnFiltro = th.querySelector('.btn-filtro');
            const dropdown = th.querySelector('.filtro-dropdown');
            
            if (!btnFiltro || !dropdown) return;

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
                    if (!filtroChave || !filtrosAtivos.hasOwnProperty(filtroChave) || !Array.isArray(filtrosAtivos[filtroChave])) return;

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
