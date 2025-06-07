import { 
    editarProcedimento, 
    duplicarProcedimento, 
    toggleFavorito, 
    arquivarProcedimento, 
    obterProcedimentos, 
    obterProcedimentosFiltrados 
} from './procedimentos.js'; 
import { modal } from './modal.js';
import { atualizarTabela } from './control-panel.js'; 

// --- Funções Auxiliares (mantidas, pois não dependem de ID/Index) ---

// Função auxiliar para formatar data de AAAA-MM-DD para DD/MM/AAAA ou "undefined"
function formatarDataParaBR(dataISO) {
    if (dataISO === undefined || dataISO === null || typeof dataISO !== 'string' || dataISO.trim() === "") {
        return "undefined"; 
    }
    // Se já for "undefined" (string de dados antigos), mantém
    if (dataISO.toLowerCase() === "undefined") {
        return "undefined";
    }
    const partes = dataISO.split('-');
    if (partes.length === 3 && partes[0].length === 4) { // Verifica se é AAAA-MM-DD
        return `${partes[2]}/${partes[1]}/${partes[0]}`; // Retorna DD/MM/AAAA
    }
    // Tenta formatar se já estiver em DD/MM/AAAA (para dados muito antigos que não foram convertidos no storage)
    const partesBr = dataISO.split('/');
    if (partesBr.length === 3 && partesBr[2].length === 4) {
        return dataISO; // Já está em DD/MM/AAAA
    }
    return dataISO; // Retorna o valor original se não reconhecer o formato AAAA-MM-DD nem DD/MM/AAAA
}

// Função auxiliar para formatar etiquetas para exibição
function formatarEtiquetasParaExibicao(etiquetas) {
    if (etiquetas === undefined) {
        return "undefined"; // Exibe a string "undefined"
    }
    if (Array.isArray(etiquetas)) {
        if (etiquetas.length === 0) return ""; // Array vazio, string vazia
        // Filtra possíveis valores undefined/null dentro do array antes de juntar
        const tagsValidas = etiquetas.filter(tag => tag !== undefined && tag !== null).map(String);
        if (tagsValidas.length === 0 && etiquetas.length > 0) return "undefined"; // Se todas as tags no array eram undefined/null
        return tagsValidas.join(", ");
    }
    // Se 'etiquetas' não for array mas também não for undefined (ex: null ou string vazia)
    return etiquetas || ""; 
}
// Renderiza todos os procedimentos na tabela
export function renderizarTabela(filtros = null) {
    const corpoTabela = document.getElementById("tabela-procedimentos");
    if (!corpoTabela) {
        console.error("Elemento 'tabela-procedimentos' não encontrado.");
        return;
    }
    corpoTabela.innerHTML = "";

    const procedimentosParaRenderizar = obterProcedimentosFiltrados(filtros || {});

    if (procedimentosParaRenderizar.length === 0) {
        corpoTabela.innerHTML = "<tr><td colspan='7'>Nenhum procedimento encontrado.</td></tr>";
        return;
    }

    procedimentosParaRenderizar.forEach(proc => {
        const procedimentoId = proc.id; 

        const linha = document.createElement("tr");

        // Usando as funções de formatação para tipo, etiquetas e data
        const tipoFormatado = proc.tipo === undefined || proc.tipo === null || proc.tipo.trim() === "" ? "undefined" : proc.tipo;
        const etiquetasFormatadas = formatarEtiquetasParaExibicao(proc.etiquetas);
        const dataFormatada = formatarDataParaBR(proc.ultimaAtualizacao);

        linha.innerHTML = `
            <td>${proc.titulo || "undefined"}</td>
            <td>${tipoFormatado}</td>
            <td>${etiquetasFormatadas}</td>
            <td>${dataFormatada}</td>
            <td>${proc.status || "undefined"}</td>
            <td>
                <button title="Visualizar" data-id="${procedimentoId}">
                    <span class="material-symbols-outlined">visibility</span>
                </button>

                <button class="acao favorito" title="Favoritar" data-id="${procedimentoId}">
                    <span class="material-symbols-outlined ${proc.favorito ? 'favorito-ativo' : ''}" style="font-variation-settings: 'FILL' ${proc.favorito ? 1 : 0};">
                        ${proc.favorito ? "favorite" : "favorite_border"}
                    </span>
                </button>

                <button class="acao editar" title="Editar" data-id="${procedimentoId}">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="acao duplicar" title="Duplicar" data-id="${procedimentoId}">
                    <span class="material-symbols-outlined">content_copy</span>
                </button>
                <button title="Gerar PDF" data-id="${procedimentoId}">
                    <span class="material-symbols-outlined">picture_as_pdf</span>
                </button>
                <button class="acao arquivar" title="Arquivar" data-id="${procedimentoId}">
                    <span class="material-symbols-outlined">archive</span>
                </button>
            </td>
        `;

        corpoTabela.appendChild(linha);
    });

    adicionarEventos();
}

// Adiciona eventos aos botões da tabela
function adicionarEventos() {
    document.querySelectorAll("#tabela-procedimentos .acao.favorito").forEach(btn => {
        btn.addEventListener("click", () => {
            // Passa o ID, não o índice
            toggleFavorito(btn.dataset.id); 
            atualizarTabela();
        });
    });

    document.querySelectorAll("#tabela-procedimentos .acao.editar").forEach(btn => {
        btn.addEventListener("click", () => {
            // Passa o ID, não o índice
            const id = btn.dataset.id;
            const procedimento = editarProcedimento(id); // A função 'editarProcedimento' da V1 aceita ID
            if (!procedimento) return;

            modal.limparFormulario();
            modal.setTitulo("Editar Procedimento");
            document.getElementById("tituloProcedimento").value = procedimento.titulo || "";
            document.getElementById("descricaoProcedimento").value = procedimento.descricao || "";
            
            // Lógica para popular o select de etiquetas no modo de edição
            const selectEtiquetas = document.getElementById("etiquetasProcedimento");
            const customEtiquetaInput = document.getElementById('custom-etiquetas-input'); 
            const customEtiquetaContainer = document.getElementById('custom-etiquetas-container');

            if (selectEtiquetas && customEtiquetaInput && customEtiquetaContainer) {
                if (procedimento.etiquetas && procedimento.etiquetas.length > 0) {
                    const primeiraEtiqueta = procedimento.etiquetas[0]; 
                    if ([...selectEtiquetas.options].some(opt => opt.value === primeiraEtiqueta)) {
                        selectEtiquetas.value = primeiraEtiqueta;
                        customEtiquetaInput.value = '';
                        customEtiquetaContainer.style.display = 'none';
                    } else { 
                        selectEtiquetas.value = "custom";
                        customEtiquetaInput.value = primeiraEtiqueta || ""; 
                        customEtiquetaContainer.style.display = 'block';
                    }
                } else {
                    selectEtiquetas.value = ""; 
                    customEtiquetaInput.value = '';
                    customEtiquetaContainer.style.display = 'none';
                }
            }
            
            document.getElementById("statusProcedimento").value = procedimento.status || "";
            document.getElementById("arquivoProcedimento").value = ""; 

            const tipoSelect = document.getElementById("tipoProcedimento");
            const customInput = document.getElementById("custom-type-input");
            const customContainer = document.getElementById("custom-type-container");

            if (tipoSelect && customInput && customContainer) {
                if (procedimento.tipo && [...tipoSelect.options].some(opt => opt.value === procedimento.tipo)) {
                    tipoSelect.value = procedimento.tipo;
                    customInput.value = "";
                    customContainer.style.display = "none";
                } else {
                    tipoSelect.value = "custom";
                    customInput.value = procedimento.tipo || ""; 
                    customContainer.style.display = "block";
                }
            }

            modal.abrir();
            // Passa o ID do procedimento para o estado global, não o índice
            window.editId = id; 
        });
    });

    document.querySelectorAll("#tabela-procedimentos .acao.duplicar").forEach(btn => {
        btn.addEventListener("click", () => {
            // Passa o ID, não o índice
            const id = btn.dataset.id;
            const copia = duplicarProcedimento(id); // A função 'duplicarProcedimento' da V1 aceita ID
            if (!copia) return;

            modal.limparFormulario();
            modal.setTitulo("Duplicar Procedimento");

            document.getElementById("tituloProcedimento").value = copia.titulo || "";
            document.getElementById("descricaoProcedimento").value = copia.descricao || "";
            
            const selectEtiquetasDup = document.getElementById("etiquetasProcedimento");
            const customEtiquetaInputDup = document.getElementById('custom-etiquetas-input');
            const customEtiquetaContainerDup = document.getElementById('custom-etiquetas-container');

            if (selectEtiquetasDup && customEtiquetaInputDup && customEtiquetaContainerDup) {
                if (copia.etiquetas && copia.etiquetas.length > 0) {
                    const primeiraEtiquetaDup = copia.etiquetas[0];
                    if ([...selectEtiquetasDup.options].some(opt => opt.value === primeiraEtiquetaDup)) {
                        selectEtiquetasDup.value = primeiraEtiquetaDup;
                        customEtiquetaInputDup.value = '';
                        customEtiquetaContainerDup.style.display = 'none';
                    } else {
                        selectEtiquetasDup.value = "custom";
                        customEtiquetaInputDup.value = primeiraEtiquetaDup || "";
                        customEtiquetaContainerDup.style.display = 'block';
                    }
                } else {
                    selectEtiquetasDup.value = "";
                    customEtiquetaInputDup.value = '';
                    customEtiquetaContainerDup.style.display = 'none';
                }
            }
            
            document.getElementById("statusProcedimento").value = copia.status || "";
            document.getElementById("arquivoProcedimento").value = ""; 

            const tipoSelect = document.getElementById("tipoProcedimento");
            const customInput = document.getElementById("custom-type-input"); 
            const customContainer = document.getElementById("custom-type-container"); 

            if (tipoSelect && customInput && customContainer) {
                if (copia.tipo && [...tipoSelect.options].some(opt => opt.value === copia.tipo)) {
                    tipoSelect.value = copia.tipo;
                    customInput.value = "";
                    customContainer.style.display = "none";
                } else {
                    tipoSelect.value = "custom";
                    customInput.value = copia.tipo || "";
                    customContainer.style.display = "block";
                }
            }
            
            modal.abrir();
            // Quando duplicando, não estamos editando um existente, então editId deve ser nulo
            window.editId = null; 
        });
    });

    document.querySelectorAll("#tabela-procedimentos .acao.arquivar").forEach(btn => {
        btn.addEventListener("click", () => {
            // Passa o ID, não o índice
            const id = btn.dataset.id;
            arquivarProcedimento(id); // A função 'arquivarProcedimento' da V1 aceita ID
            atualizarTabela();
        });
    });
}