// js/features/procedures/procedure-data.js

const STORAGE_KEY = "procedimentos";

/**
 * Gera um ID único simples para um novo procedimento.
 * @returns {string} Um ID único.
 */
function gerarId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Retorna todos os procedimentos armazenados no localStorage.
 * Inclui validação básica para garantir que os dados são um array de objetos.
 * @returns {Array<Object>} Uma lista de objetos procedimento. Retorna um array vazio em caso de erro ou sem dados.
 */
export function obterProcedimentos() {
    const dados = localStorage.getItem(STORAGE_KEY);
    if (!dados) return [];

    try {
        const lista = JSON.parse(dados);
        // Garante que é um array e que cada item é um objeto válido (não null, undefined, etc.)
        return Array.isArray(lista)
            ? lista.filter(item => item && typeof item === "object" && !Array.isArray(item))
            : [];
    } catch (erro) {
        console.warn("Erro ao ler procedimentos do localStorage:", erro);
        return []; // Retorna array vazio em caso de erro de parsing JSON
    }
}

/**
 * Salva a lista completa de procedimentos no localStorage.
 * @param {Array<Object>} lista A lista de procedimentos a ser salva.
 */
export function salvarProcedimentos(lista) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    } catch (e) {
        console.error("Erro ao salvar procedimentos no localStorage:", e);
        // Em um ambiente de produção, pode-se adicionar feedback ao usuário aqui.
    }
}

/**
 * Exclui um procedimento da lista pelo seu ID e salva as alterações.
 * @param {string} id O ID do procedimento a ser excluído.
 */
export function excluirProcedimento(id) {
    let procedimentos = obterProcedimentos();
    const tamanhoOriginal = procedimentos.length;
    procedimentos = procedimentos.filter(proc => proc.id !== id);
    if (procedimentos.length < tamanhoOriginal) { // Apenas salva se algo foi realmente removido
        salvarProcedimentos(procedimentos);
    } else {
        console.warn(`Procedimento com ID ${id} não encontrado para exclusão.`);
    }
}

/**
 * Retorna uma lista de todos os tipos únicos de procedimentos existentes.
 * @returns {string[]} Um array de strings contendo os tipos únicos, ordenados alfabeticamente.
 */
export function obterTiposUnicos() {
    const tipos = new Set();
    const procedimentos = obterProcedimentos();
    for (const proc of procedimentos) {
        if (proc.tipo && typeof proc.tipo === 'string' && proc.tipo.trim()) {
            tipos.add(proc.tipo.trim());
        }
    }
    return Array.from(tipos).sort();
}

/**
 * Retorna uma lista de todas as etiquetas únicas de procedimentos existentes.
 * @returns {string[]} Um array de strings contendo as etiquetas únicas, ordenadas alfabeticamente.
 */
export function obterEtiquetasUnicas() {
    const etiquetasSet = new Set();
    const procedimentos = obterProcedimentos();

    procedimentos.forEach(p => {
        if (Array.isArray(p.etiquetas)) {
            p.etiquetas.forEach(e => {
                if (typeof e === 'string' && e.trim()) {
                    etiquetasSet.add(e.trim());
                }
            });
        }
    });
    return Array.from(etiquetasSet).sort();
}

/**
 * Encontra e retorna o índice de um procedimento na lista pelo seu ID.
 * @param {string} id O ID do procedimento a ser encontrado.
 * @returns {number} O índice do procedimento na lista, ou -1 se não for encontrado.
 */
function obterIndicePorId(id) {
    const lista = obterProcedimentos();
    return lista.findIndex(p => p.id === id);
}

/**
 * Alterna o status de favorito de um procedimento e salva as alterações.
 * @param {string} id O ID do procedimento.
 */
export function toggleFavorito(id) {
    const lista = obterProcedimentos();
    const index = obterIndicePorId(id);
    if (index === -1) {
        console.warn(`Procedimento com ID ${id} não encontrado para alternar favorito.`);
        return;
    }

    lista[index].favorito = !lista[index].favorito;
    salvarProcedimentos(lista);
}

/**
 * Arquiva o procedimento, atualizando seu status para "Inativo" e a data da última atualização.
 * @param {string} id O ID do procedimento a ser arquivado.
 */
export function arquivarProcedimento(id) {
    const lista = obterProcedimentos();
    const index = obterIndicePorId(id);
    if (index === -1) {
        console.warn(`Procedimento com ID ${id} não encontrado para arquivamento.`);
        return;
    }

    lista[index].arquivado = true;
    lista[index].status = "Inativo"; // Define explicitamente como Inativo ao arquivar
    lista[index].ultimaAtualizacao = new Date().toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD

    salvarProcedimentos(lista);
}

/**
 * Retorna uma CÓPIA de um procedimento pelo seu ID.
 * Útil para operações de edição ou visualização que não devem modificar o original diretamente.
 * @param {string} id O ID do procedimento a ser retornado.
 * @returns {Object | null} Uma cópia do objeto procedimento, ou null se não for encontrado.
 */
export function obterProcedimentoPorId(id) {
    const lista = obterProcedimentos();
    const procedimento = lista.find(p => p.id === id);
    return procedimento ? { ...procedimento } : null; // Retorna uma cópia defensiva
}


/**
 * Salva um novo procedimento ou atualiza um existente.
 * Se 'editId' for fornecido, atualiza o procedimento correspondente.
 * Caso contrário, cria um novo procedimento.
 * @param {Object} dados Objeto contendo os dados do procedimento.
 * @param {string | null} [editId=null] O ID do procedimento a ser editado.
 */
export function salvarProcedimento(dados, editId = null) {
    const lista = obterProcedimentos();
    const dataAtual = new Date().toISOString().split('T')[0];

    // Garante que 'etiquetas' é um array de strings limpas e únicas.
    const etiquetasProcessadas = Array.isArray(dados.etiquetas)
        ? [...new Set(dados.etiquetas.filter(e => e && typeof e === 'string' && e.trim() !== '').map(e => e.trim()))]
        : [];

    let procedimentoASalvar = {
        ...dados,
        etiquetas: etiquetasProcessadas, // Usa as etiquetas processadas
        ultimaAtualizacao: dataAtual,
        arquivado: dados.status && dados.status.toLowerCase() === "inativo",
    };

    if (editId) {
        // Edição de um procedimento existente
        const index = lista.findIndex(p => p.id === editId);
        if (index === -1) {
            console.warn(`Procedimento com ID ${editId} não encontrado para edição (salvar).`);
            return;
        }

        if (procedimentoASalvar.arquivo === "" && lista[index].arquivo) {
            procedimentoASalvar.arquivo = lista[index].arquivo;
        }

        // Mantém o status de favorito original se não for explicitamente alterado
        procedimentoASalvar.favorito = lista[index].favorito || false;
        procedimentoASalvar.id = editId; // Garante que o ID original é mantido

        // Mescla os dados existentes com os novos dados, garantindo que o ID e favorito não sejam perdidos
        lista[index] = { ...lista[index], ...procedimentoASalvar };
    } else {
        // Criação de um novo procedimento
        procedimentoASalvar.id = gerarId();
        procedimentoASalvar.favorito = false; // Novos procedimentos começam como não favoritos
        lista.push(procedimentoASalvar);
    }

    salvarProcedimentos(lista);
}

/**
 * Retorna uma cópia de um procedimento existente, com um novo ID e título ajustado.
 * @param {string} id O ID do procedimento original a ser duplicado.
 * @returns {Object | null} Um novo objeto procedimento (cópia), ou null se o original não for encontrado.
 */
export function duplicarProcedimento(id) {
    const original = obterProcedimentoPorId(id); // Usa a função corretamente nomeada
    if (!original) return null;

    return {
        ...original,
        id: gerarId(), // Novo ID para a cópia
        titulo: original.titulo, // O título será ajustado no formulário, não aqui
        ultimaAtualizacao: new Date().toISOString().split('T')[0],
        favorito: false, // Cópia não começa como favorito
        arquivado: false, // Cópia não começa arquivada
    };
}

/**
 * Filtra a lista de procedimentos com base nos critérios fornecidos.
 * @param {Object} [filtros={}] Objeto contendo os critérios de filtro (busca, tipo, etiquetas, status, ultimaAtualizacao, favoritos).
 * @returns {Array<Object>} Uma lista de procedimentos que correspondem aos filtros.
 */
export function obterProcedimentosFiltrados(filtros = {}) {
    const procedimentos = obterProcedimentos();

    return procedimentos.filter(proc => {
        // Ignora procedimentos nulos ou não objetos
        if (!proc || typeof proc !== 'object') return false;

        const termoBusca = filtros.busca?.toLowerCase();

        // --- LÓGICA DE BUSCA GERAL: Título, Descrição, Tipo, Etiquetas ---
        if (termoBusca) {
            const tituloMatch = (proc.titulo || "").toLowerCase().includes(termoBusca);
            const descricaoMatch = (proc.descricao || "").toLowerCase().includes(termoBusca);
            const tipoMatch = (proc.tipo || "").toLowerCase().includes(termoBusca); // <-- NOVO: Busca por tipo
            const etiquetasMatch = (Array.isArray(proc.etiquetas) ? proc.etiquetas : [])
                .some(etq => (etq || "").toLowerCase().includes(termoBusca));

            // Se a busca não corresponder a NENHUM desses campos, exclui o procedimento
            if (!tituloMatch && !descricaoMatch && !tipoMatch && !etiquetasMatch) { // <-- Inclui tipo na condição
                return false;
            }
        }

        // --- LÓGICA DE FILTROS ESPECÍFICOS (mantida) ---

        // Filtro por Tipo (via checkboxes de filtro, se houver)
        if (filtros.tipo?.length && !filtros.tipo.includes(proc.tipo)) {
            return false;
        }

        // Filtro por Etiquetas (via checkboxes de filtro)
        if (filtros.etiquetas?.length) {
            const etiquetasProc = Array.isArray(proc.etiquetas) ? proc.etiquetas : [];
            const temEtiqueta = etiquetasProc.some(tag => filtros.etiquetas.includes(tag));
            if (!temEtiqueta) return false;
        }

        // Filtro por Status
        if (filtros.status?.length && !filtros.status.includes(proc.status)) {
            return false;
        }

        // Filtro por Última Atualização (compara apenas o dia)
        if (filtros.ultimaAtualizacao) {
            const dataFiltroStr = filtros.ultimaAtualizacao.split('T')[0]; // Pega só a parte da data
            const dataProcStr = proc.ultimaAtualizacao?.split('T')[0]; // Pega só a parte da data

            if (dataProcStr !== dataFiltroStr) {
                return false;
            }
        }
        
        // Filtro por Favoritos
        if (filtros.favoritos && !proc.favorito) {
            return false;
        }

        return true; // Passou por todos os filtros
    });
}