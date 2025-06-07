import { modal } from "./modal.js";
import { renderizarTabela } from './table-control-panel.js'; // Onde a renderização da tabela está agora adaptada para IDs
import {
    obterEtiquetasUnicas,
    obterTiposUnicos,
    salvarProcedimento,
    obterProcedimentos, // Ainda útil para popular filtros, etc.
} from './procedimentos.js'; // Certifique-se de que este arquivo é a V1 com IDs

export function initControlPanel() {
    const botaoCriar = document.querySelector(".button--criar");
    const fechar = document.getElementById("fechar-modal");
    const cancelar = document.getElementById("cancelar");
    const salvar = document.getElementById("salvar");
    const tipoProcedimento = document.getElementById('tipoProcedimento');
    const etiquetasProcedimento = document.getElementById("etiquetasProcedimento");

    const customContainer = document.getElementById('custom-type-container');
    const customTypeInput = document.getElementById('custom-type-input');
    const customEtiquetaContainer = document.getElementById('custom-etiquetas-container');
    const customEtiquetaInput = document.getElementById('custom-etiquetas-input');

    // Mude de window.editIndex para window.editId
    window.editId = null;

    function fecharModal() {
        modal.fechar();
        modal.limparFormulario();
        if (customContainer) customContainer.style.display = 'none';
        if (customEtiquetaContainer) customEtiquetaContainer.style.display = 'none';
        // Limpa o ID de edição ao fechar o modal
        window.editId = null; 
    }

    function popularTipos() {
        if (!tipoProcedimento) return;
        const tipos = obterTiposUnicos();
        const existentes = Array.from(tipoProcedimento.options).map(opt => opt.value);
        tipos.forEach(tipo => {
            if (!existentes.includes(tipo)) {
                const option = document.createElement('option');
                option.value = tipo;
                option.textContent = tipo;
                const customOption = tipoProcedimento.querySelector('option[value="custom"]');
                if (customOption) tipoProcedimento.insertBefore(option, customOption);
                else tipoProcedimento.appendChild(option);
            }
        });
    }

    function popularEtiquetas() {
        if (!etiquetasProcedimento) return;
        const etiquetas = obterEtiquetasUnicas();
        const existentes = Array.from(etiquetasProcedimento.options).map(opt => opt.value);
        etiquetas.forEach(etiqueta => {
            if (!existentes.includes(etiqueta)) {
                const option = document.createElement('option');
                option.value = etiqueta;
                option.textContent = etiqueta;
                const customOption = etiquetasProcedimento.querySelector('option[value="custom"]');
                if (customOption) etiquetasProcedimento.insertBefore(option, customOption);
                else etiquetasProcedimento.appendChild(option);
            }
        });
    }

    if (botaoCriar) {
        botaoCriar.addEventListener("click", () => {
            modal.limparFormulario();
            modal.setTitulo("Novo Procedimento");
            if (customContainer) customContainer.style.display = 'none';
            if (customEtiquetaContainer) customEtiquetaContainer.style.display = 'none';
            if (tipoProcedimento) tipoProcedimento.value = '';
            if (etiquetasProcedimento) etiquetasProcedimento.value = '';
            popularTipos();
            popularEtiquetas();
            modal.abrir();
            // Ao criar um novo, não há ID de edição
            window.editId = null; 
        });
    }

    if (fechar) fechar.addEventListener("click", fecharModal);
    if (cancelar) cancelar.addEventListener("click", fecharModal);

    if (salvar) {
        salvar.addEventListener("click", (event) => {
            event.preventDefault();
            const titulo = document.getElementById("tituloProcedimento").value.trim();
            const descricao = document.getElementById("descricaoProcedimento").value.trim();
            let etiquetasArray;
            if (etiquetasProcedimento && etiquetasProcedimento.value === 'custom') {
                if (!customEtiquetaInput) { alert('Erro: Campo de input para etiqueta customizada não encontrado.'); return; }
                const customTag = customEtiquetaInput.value.trim();
                if (!customTag) { alert('Por favor, informe a etiqueta personalizada.'); return; }
                etiquetasArray = [customTag];
            } else if (etiquetasProcedimento && etiquetasProcedimento.value) {
                etiquetasArray = [etiquetasProcedimento.value];
            } else {
                etiquetasArray = [];
            }
            const status = document.getElementById("statusProcedimento").value;
            let tipoSelecionado = tipoProcedimento ? tipoProcedimento.value : "";
            if (tipoSelecionado === 'custom') {
                if (!customTypeInput) { alert('Erro: Campo de input para tipo customizado não encontrado.'); return; }
                tipoSelecionado = customTypeInput.value.trim();
                if (!tipoSelecionado) { alert('Por favor, informe o tipo personalizado.'); return; }
            }
            if (!titulo) { alert("Por favor, preencha o título do procedimento."); return; }
            const etiquetasUnicas = [...new Set(etiquetasArray)];
            // Esta validação pode ser mais complexa se permitirmos múltiplas etiquetas customizadas.
            // Por enquanto, ela verifica duplicatas apenas se o array inicial tiver mais de um item.
            if (etiquetasArray.length > 1 && etiquetasUnicas.length !== etiquetasArray.length) {
                alert('Existem etiquetas duplicadas, por favor remova as duplicatas.');
                return;
            }
            const arquivoInput = document.getElementById("arquivoProcedimento");
            const nomeArquivo = arquivoInput?.files[0]?.name || "";
            
            // AQUI ESTÁ A MUDANÇA PRINCIPAL: passamos window.editId
            salvarProcedimento({ titulo, descricao, etiquetas: etiquetasUnicas, status, tipo: tipoSelecionado, arquivo: nomeArquivo }, window.editId);
            
            atualizarTabela();
            fecharModal();
        });
    }

    if (tipoProcedimento && customContainer && customTypeInput) {
        tipoProcedimento.addEventListener('change', function () {
            customContainer.style.display = this.value === 'custom' ? 'block' : 'none';
            if (this.value !== 'custom') customTypeInput.value = '';
        });
    }

    if (etiquetasProcedimento && customEtiquetaContainer && customEtiquetaInput) {
        etiquetasProcedimento.addEventListener('change', function () {
            customEtiquetaContainer.style.display = this.value === 'custom' ? 'block' : 'none';
            if (this.value !== 'custom') customEtiquetaInput.value = '';
        });
    }

    popularTipos();
    popularEtiquetas(); // Adicionado para garantir que etiquetas também sejam populadas ao iniciar
}

// ------------------------- Filtros -------------------------

const filtrosAtivos = {
    busca: '',
    tipo: [],
    etiquetas: [],
    status: [],
    ultimaAtualizacao: null,
    favoritos: false,
};

function obterDatasUnicas() {
    const datas = new Set();
    obterProcedimentos().forEach(p => {
        if (p.ultimaAtualizacao) datas.add(p.ultimaAtualizacao);
    });
    return Array.from(datas).sort((a, b) => b.localeCompare(a));
}

function popularFiltros() {
    const opcoesTipo = obterTiposUnicos();
    const opcoesEtiquetas = obterEtiquetasUnicas();
    const opcoesStatus = ['Ativo', 'Inativo'];
    const opcoesUltimaAtualizacao = obterDatasUnicas();

    const criarOpcoesCheckbox = (opcoes, chaveFiltro) => {
        if (!opcoes || opcoes.length === 0) return '<div class="filtro-sem-opcoes">Nenhuma opção</div>';
        return opcoes.map(op => {
            const idOpcao = `filtro-${chaveFiltro}-${op.replace(/\s+/g, '-')}`;
            return `
                <label class="filtro-opcao custom-checkbox" for="${idOpcao}">
                    <input type="checkbox" id="${idOpcao}" value="${op}">
                    <span class="checkmark"></span>
                    ${op}
                </label>
            `;
        }).join('');
    };

    const popularDropdown = (chave, opcoes) => {
        const dropdown = document.querySelector(`th[data-filter-key="${chave}"] .filtro-dropdown`);
        if (dropdown) {
            dropdown.innerHTML = criarOpcoesCheckbox(opcoes, chave);
        }
    };

    popularDropdown('tipo', opcoesTipo);
    popularDropdown('etiquetas', opcoesEtiquetas);
    popularDropdown('status', opcoesStatus);

    const dropdownUltimaAtualizacao = document.querySelector('th[data-filter-key="ultimaAtualizacao"] .filtro-dropdown');
    if (dropdownUltimaAtualizacao) {
        dropdownUltimaAtualizacao.innerHTML = opcoesUltimaAtualizacao.map(dataISO => {
            const partes = dataISO.split('-');
            const dataBR = partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : dataISO;
            return `<button type="button" data-valor="${dataISO}">${dataBR}</button>`;
        }).join('') + '<button type="button" class="filtro-limpar" data-valor="">Qualquer Data</button>';
    }
}

export function initFiltros() {
    popularFiltros();

    const inputBusca = document.querySelector('.search-bar input[type="text"]');
    if (inputBusca) {
        inputBusca.addEventListener('input', (e) => {
            filtrosAtivos.busca = e.target.value.toLowerCase();
            atualizarTabela();
        });
    }

    const btnFavoritos = document.getElementById('filtro-favoritos');
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

    const filtrosDropdown = document.querySelectorAll('.filterable');
    filtrosDropdown.forEach((th) => {
        const btnFiltro = th.querySelector('.btn-filtro');
        const dropdown = th.querySelector('.filtro-dropdown');
        if (!btnFiltro || !dropdown) return;

        btnFiltro.addEventListener('click', (event) => {
            event.stopPropagation();
            const aberto = dropdown.style.display === 'block';
            fecharTodosDropdowns();
            dropdown.style.display = aberto ? 'none' : 'block';
        });

        // Listener para CHECKBOXES
        dropdown.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
                const filtroChave = th.dataset.filterKey;
                const valorOpcao = checkbox.value;
                if (!filtroChave || !filtrosAtivos.hasOwnProperty(filtroChave)) return;

                const filtroArray = filtrosAtivos[filtroChave];
                if (checkbox.checked) {
                    if (!filtroArray.includes(valorOpcao)) filtroArray.push(valorOpcao);
                } else {
                    const index = filtroArray.indexOf(valorOpcao);
                    if (index > -1) filtroArray.splice(index, 1);
                }
                atualizarTabela();
            });
        });

        // Listener para BOTÕES (usado no filtro de data e para limpar outros)
        dropdown.querySelectorAll('button').forEach((button) => {
            button.addEventListener('click', () => {
                const filtroChave = th.dataset.filterKey;
                if (filtroChave === 'ultimaAtualizacao') {
                    filtrosAtivos.ultimaAtualizacao = button.dataset.valor || null;
                    atualizarTabela();
                    fecharTodosDropdowns();
                }
            });
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.filterable')) fecharTodosDropdowns();
    });

    function fecharTodosDropdowns() {
        document.querySelectorAll('.filtro-dropdown').forEach((d) => {
            if (d.style.display === 'block') d.style.display = 'none';
        });
    }
}

export function atualizarTabela() {
    console.log("FILTROS ATIVOS:", JSON.stringify(filtrosAtivos));
    renderizarTabela(filtrosAtivos);
}

// Inicia os filtros ao carregar a página
atualizarTabela();