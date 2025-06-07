const STORAGE_KEY = "procedimentos";

function gerarId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export function obterProcedimentos() {
    const dados = localStorage.getItem(STORAGE_KEY);
    if (!dados) return [];

    try {
        const lista = JSON.parse(dados);
        return Array.isArray(lista)
            ? lista.filter(item => item && typeof item === "object" && !Array.isArray(item))
            : [];
    } catch (erro) {
        console.warn("Erro ao ler procedimentos do localStorage:", erro);
        return [];
    }
}

export function salvarProcedimentos(lista) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    } catch (e) {
        console.error("Erro ao salvar procedimentos no localStorage:", e);
    }
}

export function excluirProcedimento(id) {
    let procedimentos = obterProcedimentos();
    const tamanhoOriginal = procedimentos.length;
    procedimentos = procedimentos.filter(proc => proc.id !== id);
    if (procedimentos.length < tamanhoOriginal) {
        salvarProcedimentos(procedimentos);
    } else {
        console.warn(`Procedimento com ID ${id} não encontrado para exclusão.`);
    }
}

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

function obterIndicePorId(id) {
    const lista = obterProcedimentos();
    return lista.findIndex(p => p.id === id);
}

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

export function arquivarProcedimento(id) {
    const lista = obterProcedimentos();
    const index = obterIndicePorId(id);
    if (index === -1) {
        console.warn(`Procedimento com ID ${id} não encontrado para arquivamento.`);
        return;
    }

    lista[index].arquivado = true;
    lista[index].status = "Inativo";
    lista[index].ultimaAtualizacao = new Date().toISOString().split('T')[0];

    salvarProcedimentos(lista);
}

export function obterProcedimentoPorId(id) {
    const lista = obterProcedimentos();
    const procedimento = lista.find(p => p.id === id);
    return procedimento ? { ...procedimento } : null;
}

export function salvarProcedimento(dados, editId = null) {
    const lista = obterProcedimentos();
    const dataAtual = new Date().toISOString().split('T')[0];

    const etiquetasProcessadas = Array.isArray(dados.etiquetas)
        ? [...new Set(dados.etiquetas.filter(e => e && typeof e === 'string' && e.trim() !== '').map(e => e.trim()))]
        : [];

    let procedimentoASalvar = {
        ...dados,
        etiquetas: etiquetasProcessadas,
        ultimaAtualizacao: dataAtual,
        arquivado: dados.status && dados.status.toLowerCase() === "inativo",
    };

    if (editId) {
        const index = lista.findIndex(p => p.id === editId);
        if (index === -1) {
            console.warn(`Procedimento com ID ${editId} não encontrado para edição (salvar).`);
            return;
        }

        procedimentoASalvar.favorito = lista[index].favorito || false;
        procedimentoASalvar.id = editId;

        lista[index] = { ...lista[index], ...procedimentoASalvar };
    } else {
        procedimentoASalvar.id = gerarId();
        procedimentoASalvar.favorito = false;

        if (procedimentoASalvar.titulo && !/\s*\(versão\s*\d+\)$/i.test(procedimentoASalvar.titulo)) {
            procedimentoASalvar.versao = 1;
        }

        lista.push(procedimentoASalvar);
    }

    salvarProcedimentos(lista);
}

export function duplicarProcedimento(id) {
    const original = obterProcedimentoPorId(id);
    if (!original) return null;

    return {
        ...original,
        id: gerarId(),
        titulo: original.titulo,
        ultimaAtualizacao: new Date().toISOString().split('T')[0],
        favorito: false,
        arquivado: false,
    };
}

function obterProximaVersao(tituloBase, listaProcedimentos) {
    let maiorVersao = 0;

    listaProcedimentos.forEach(proc => {
        const regexVersao = /\s*\(versão\s*(\d+)\)$/i;
        const match = proc.titulo?.match(regexVersao);

        let procTituloBase = (proc.titulo || "").replace(regexVersao, '').trim();

        if (procTituloBase === tituloBase) {
            if (match) {
                const versao = parseInt(match[1], 10);
                if (!isNaN(versao) && versao > maiorVersao) {
                    maiorVersao = versao;
                }
            } else {
                if (maiorVersao < 1) {
                    maiorVersao = 1;
                }
            }
        }
    });

    return maiorVersao + 1;
}

export function criarNovaVersaoProcedimento(originalId, novosDados) {
    const lista = obterProcedimentos();
    const indexOriginal = lista.findIndex(p => p.id === originalId);

    if (indexOriginal === -1) {
        console.warn(`Procedimento original com ID ${originalId} não encontrado para criar nova versão.`);
        return null;
    }

    const procedimentoOriginal = lista[indexOriginal];
    const dataAtual = new Date().toISOString().split('T')[0];

    procedimentoOriginal.status = "Inativo";
    procedimentoOriginal.arquivado = true;
    procedimentoOriginal.ultimaAtualizacao = dataAtual;

    const tituloBase = (procedimentoOriginal.titulo || "").replace(/\s*\(versão\s*\d+\)$/i, "").trim();

    const novaVersaoNumero = obterProximaVersao(tituloBase, lista);

    const etiquetasProcessadas = Array.isArray(novosDados.etiquetas)
        ? [...new Set(novosDados.etiquetas.filter(e => e && typeof e === 'string' && e.trim() !== '').map(e => e.trim()))]
        : [];

    const novoProcedimento = {
        ...novosDados,
        id: gerarId(),
        titulo: `${tituloBase} (versão ${novaVersaoNumero})`,
        versao: novaVersaoNumero,
        status: "Ativo",
        ultimaAtualizacao: dataAtual,
        dataCriacao: dataAtual,
        favorito: false,
        arquivado: false,
        etiquetas: etiquetasProcessadas,
    };

    lista.push(novoProcedimento);
    salvarProcedimentos(lista);

    return novoProcedimento;
}

export function obterProcedimentosFiltrados(filtros = {}) {
    const procedimentos = obterProcedimentos();

    return procedimentos.filter(proc => {
        if (!proc || typeof proc !== 'object') return false;

        const termoBusca = filtros.busca?.toLowerCase();

        if (termoBusca) {
            const tituloMatch = (proc.titulo || "").toLowerCase().includes(termoBusca);
            const descricaoMatch = (proc.descricao || "").toLowerCase().includes(termoBusca);
            const tipoMatch = (proc.tipo || "").toLowerCase().includes(termoBusca);
            const etiquetasMatch = (Array.isArray(proc.etiquetas) ? proc.etiquetas : [])
                .some(etq => (etq || "").toLowerCase().includes(termoBusca));

            if (!tituloMatch && !descricaoMatch && !tipoMatch && !etiquetasMatch) {
                return false;
            }
        }

        if (filtros.tipo?.length && !filtros.tipo.includes(proc.tipo)) {
            return false;
        }

        if (filtros.etiquetas?.length) {
            const etiquetasProc = Array.isArray(proc.etiquetas) ? proc.etiquetas : [];
            const temEtiqueta = etiquetasProc.some(tag => filtros.etiquetas.includes(tag));
            if (!temEtiqueta) return false;
        }

        if (filtros.status?.length && !filtros.status.includes(proc.status)) {
            return false;
        }

        if (filtros.ultimaAtualizacao) {
            const dataFiltroStr = filtros.ultimaAtualizacao.split('T')[0];
            const dataProcStr = proc.ultimaAtualizacao?.split('T')[0];

            if (dataProcStr !== dataFiltroStr) {
                return false;
            }
        }

        if (filtros.favoritos && !proc.favorito) {
            return false;
        }

        return true;
    });
}