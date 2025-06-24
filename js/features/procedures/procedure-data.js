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

    lista[index].inativo = true;
    lista[index].status = "Inativo";
    lista[index].ultimaAtualizacao = new Date().toISOString().split('T')[0];

    salvarProcedimentos(lista);
}

export function desarquivarProcedimento(id) {
    const lista = obterProcedimentos();
    const index = obterIndicePorId(id);
    if (index === -1) {
        console.warn(`Procedimento com ID ${id} não encontrado para desarquivamento.`);
        return;
    }

    lista[index].inativo = false;
    lista[index].status = "Ativo";
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
        inativo: dados.status && dados.status.toLowerCase() === "Inativo",
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
        titulo: `${original.titulo} (cópia)`,
        versao: 1, 
        idPai: null,
        versoesFilhas: [],
        ultimaAtualizacao: new Date().toISOString().split('T')[0],
        favorito: false,
        inativo: false,
        status: "Ativo"
    };
}


function obterProximaVersao(filtro, lista) {
  const relacionados = lista.filter(filtro);
  const versoes = relacionados.map(p => p.versao || 1);
  const maxVersao = versoes.length ? Math.max(...versoes) : 0;
  return maxVersao + 1;
}

export async function criarNovaVersaoComHistorico(originalId, novosDados) {
  const lista = obterProcedimentos();
  const indexOriginal = lista.findIndex(p => p.id === originalId);

  if (indexOriginal === -1) {
    console.warn(`Procedimento original com ID ${originalId} não encontrado.`);
    return null;
  }

  const procedimentoOriginal = lista[indexOriginal];
  const dataAtual = new Date().toISOString().split('T')[0];

  const novaVersaoNumero = obterProximaVersao(p => p.idPai === originalId || p.id === originalId, lista);

  procedimentoOriginal.status = "Inativo";
  procedimentoOriginal.inativo = true;
  procedimentoOriginal.favorito = false;
  procedimentoOriginal.ultimaAtualizacao = dataAtual;

  if (!Array.isArray(procedimentoOriginal.versoesFilhas)) {
    procedimentoOriginal.versoesFilhas = [];
  }

  const novoProcedimento = {
    ...novosDados,
    id: gerarId(),
    titulo: novosDados.titulo || procedimentoOriginal.titulo,
    versao: novaVersaoNumero,
    idPai: originalId,
    status: "Ativo",
    inativo: false,
    favorito: false,
    ultimaAtualizacao: dataAtual,
    dataCriacao: dataAtual,
    etiquetas: Array.isArray(novosDados.etiquetas)
      ? [...new Set(novosDados.etiquetas.map(e => e.trim()))]
      : [],
    versoesFilhas: [], 
  };

  lista[indexOriginal] = procedimentoOriginal;
  lista.push(novoProcedimento);

  procedimentoOriginal.versoesFilhas.push(novoProcedimento.id);

  salvarProcedimentos(lista);

  return novoProcedimento;
}

export function obterHistoricoCompleto(procedimento, listaProcedimentos) {
  if (!procedimento.idPai) {
    const filhas = (procedimento.versoesFilhas || []).map(id => listaProcedimentos.find(p => p.id === id)).filter(Boolean);
    return [procedimento, ...filhas];
  } else {
    const pai = listaProcedimentos.find(p => p.id === procedimento.idPai);
    if (!pai) return [procedimento];

    const filhas = (pai.versoesFilhas || []).map(id => listaProcedimentos.find(p => p.id === id)).filter(Boolean);
    return [pai, ...filhas];
  }
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

export function atualizarOrdemFavoritos(novaOrdemIds) {
    const procedimentos = obterProcedimentos();

    const favoritosOrdenados = novaOrdemIds
        .map(id => procedimentos.find(p => p.id === id))
        .filter(Boolean); 

    const naoFavoritos = procedimentos.filter(p => !p.favorito);

    const novaLista = [...favoritosOrdenados, ...naoFavoritos];
    salvarProcedimentos(novaLista);
}
