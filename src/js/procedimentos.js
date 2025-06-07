const STORAGE_KEY = "procedimentos";

// Gera ID único para novo procedimento
function gerarId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Retorna todos os procedimentos armazenados no localStorage
export function obterProcedimentos() {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
}

// Salva todos os procedimentos no localStorage
export function salvarProcedimentos(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

// Retorna os tipos únicos existentes entre os procedimentos
export function obterTiposUnicos() {
  const tipos = new Set();
  for (const { tipo } of obterProcedimentos()) {
    if (tipo?.trim()) tipos.add(tipo.trim());
  }
  return Array.from(tipos).sort();
}

// Retorna etiquetas únicas
export function obterEtiquetasUnicas() {
  return Array.from(
    new Set(
      obterProcedimentos()
        .flatMap(p => Array.isArray(p.etiquetas) ? p.etiquetas : [])
        .map(e => e?.trim())
        .filter(e => e)
    )
  ).sort();
}

// Busca o índice de um procedimento pelo ID
function obterIndicePorId(id) {
  const lista = obterProcedimentos();
  return lista.findIndex(p => p.id === id);
}

// Alterna o status de favorito de um procedimento
export function toggleFavorito(id) {
  const lista = obterProcedimentos();
  const index = obterIndicePorId(id);
  if (index === -1) return;

  lista[index].favorito = !lista[index].favorito;
  salvarProcedimentos(lista);
}

// Arquiva o procedimento e atualiza o status
export function arquivarProcedimento(id) {
  const lista = obterProcedimentos();
  const index = obterIndicePorId(id);
  if (index === -1) return;

  lista[index].arquivado = true;
  lista[index].status = "Inativo";
  lista[index].ultimaAtualizacao = new Date().toISOString().split('T')[0];

  salvarProcedimentos(lista);
}

// Retorna o procedimento para edição
export function editarProcedimento(id) {
  const lista = obterProcedimentos();
  return lista.find(p => p.id === id) || null;
}

// Salva um novo procedimento ou atualiza um existente
export function salvarProcedimento(dados, editId = null) {
  const lista = obterProcedimentos();
  const dataAtual = new Date().toISOString().split('T')[0];

  let novoProcedimento = {
    ...dados,
    ultimaAtualizacao: dataAtual,
    arquivado: dados.status?.toLowerCase() === "inativo",
  };

  if (editId) {
    const index = lista.findIndex(p => p.id === editId);
    if (index === -1) return;

    novoProcedimento.favorito = lista[index].favorito || false;
    novoProcedimento.id = editId;
    lista[index] = { ...lista[index], ...novoProcedimento };
  } else {
    novoProcedimento.id = gerarId();
    novoProcedimento.favorito = false;
    lista.push(novoProcedimento);
  }

  salvarProcedimentos(lista);
}

// Retorna uma cópia de um procedimento com título ajustado
export function duplicarProcedimento(id) {
  const lista = obterProcedimentos();
  const original = lista.find(p => p.id === id);
  if (!original) return null;

  return {
    ...original,
    id: gerarId(),
    titulo: original.titulo + " (cópia)",
    ultimaAtualizacao: new Date().toISOString().split('T')[0],
    favorito: false,
    arquivado: original.status?.toLowerCase() === "inativo",
  };
}

// Filtra procedimentos conforme os filtros aplicados
export function obterProcedimentosFiltrados(filtros) {
  const procedimentos = obterProcedimentos();

  return procedimentos.filter(proc => {
    const busca = filtros.busca?.toLowerCase();

    if (
      busca &&
      !proc.titulo.toLowerCase().includes(busca) &&
      !(proc.etiquetas && proc.etiquetas.some(etq => etq.toLowerCase().includes(busca))) &&
      !(proc.descricao && proc.descricao.toLowerCase().includes(busca))
    ) {
      return false;
    }

    if (filtros.tipo && filtros.tipo.length > 0 && !filtros.tipo.includes(proc.tipo)) {
      return false;
    }

    if (filtros.etiquetas && filtros.etiquetas.length > 0) {
      if (!proc.etiquetas || !proc.etiquetas.some(tagProc => filtros.etiquetas.includes(tagProc))) {
        return false;
      }
    }

    if (filtros.status && filtros.status.length > 0 && !filtros.status.includes(proc.status)) {
      return false;
    }

    if (filtros.ultimaAtualizacao) {
      const dataFiltro = new Date(filtros.ultimaAtualizacao);
      const dataProc = new Date(proc.ultimaAtualizacao);

      if (isNaN(dataFiltro.getTime()) || isNaN(dataProc.getTime())) {
        console.warn("Data inválida", { dataFiltro, dataProc });
        return false;
      }

      if (dataProc < dataFiltro) return false;
    }

    if (filtros.favoritos && !proc.favorito) return false;

    return true;
  });
}
