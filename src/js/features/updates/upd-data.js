const STORAGE_KEY = "updates";

function gerarId() {
    return "_" + Math.random().toString(36).substr(2, 9);
}

export function getUpdates() {
    const dados = localStorage.getItem(STORAGE_KEY);
    if (!dados) return [];

    try {
        const lista = JSON.parse(dados);
        return Array.isArray(lista)
            ? lista.filter(
                (item) => item && typeof item === "object" && !Array.isArray(item)
            )
            : [];
    } catch (erro) {
        console.warn("Erro ao ler atualizações do localStorage:", erro);
        return [];
    }
}

export function saveUpdates(lista) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    } catch (e) {
        console.error("Erro ao salvar atualizações no localStorage:", e);
    }
}

export function excluirUpdate(id) {
    let updates = getUpdates();
    const tamanhoOriginal = updates.length;
    updates = updates.filter((upd) => upd.id !== id);
    if (updates.length < tamanhoOriginal) {
        saveUpdates(updates);
    } else {
        console.warn(`Update com ID ${id} não encontrado para exclusão.`);
    }
}

export function obterEtiquetasUnicas() {
    const etiquetasSet = new Set();
    const updates = getUpdates();

    updates.forEach((upd) => {
        if (Array.isArray(upd.etiquetas)) {
            upd.etiquetas.forEach((e) => {
                if (typeof e === "string" && e.trim()) {
                    etiquetasSet.add(e.trim());
                }
            });
        }
    });
    return Array.from(etiquetasSet).sort();
}

function obterIndicePorId(id) {
    const lista = getUpdates();
    return lista.findIndex((upd) => upd.id === id);
}

export function toggleFavorito(id) {
    const lista = getUpdates();
    const index = obterIndicePorId(id);
    if (index === -1) {
        console.warn(`Update com ID ${id} não encontrado para alternar favorito.`);
        return;
    }

    lista[index].favorito = !lista[index].favorito;
    saveUpdates(lista);
}

export function arquivarUpdate(id) {
    const lista = getUpdates();
    const index = obterIndicePorId(id);
    if (index === -1) {
        console.warn(`Update com ID ${id} não encontrado para arquivamento.`);
        return;
    }

    lista[index].inativo = true;
    lista[index].status = "Inativo";
    lista[index].ultimaAtualizacao = new Date().toISOString().split("T")[0];

    saveUpdates(lista);
}

export function desarquivarUpdate(id) {
    const lista = getUpdates();
    const index = obterIndicePorId(id);
    if (index === -1) {
        console.warn(`Update com ID ${id} não encontrado para desarquivamento.`);
        return;
    }

    lista[index].inativo = false;
    lista[index].status = "Ativo";
    lista[index].ultimaAtualizacao = new Date().toISOString().split("T")[0];

    saveUpdates(lista);
}

export function obterUpdatePorId(id) {
    const lista = getUpdates();
    const update = lista.find((upd) => upd.id === id);
    return update ? { ...update } : null;
}

export function salvarUpdate(dados, editId = null) {
    const lista = getUpdates();
    const dataAtual = new Date().toISOString().split("T")[0];

    const etiquetasProcessadas = Array.isArray(dados.etiquetas)
        ? [
            ...new Set(
                dados.etiquetas
                    .filter((e) => e && typeof e === "string" && e.trim() !== "")
                    .map((e) => e.trim())
            ),
        ]
        : [];

    let updateASalvar = {
        ...dados,
        etiquetas: etiquetasProcessadas,
        ultimaAtualizacao: dataAtual,
        inativo: dados.status && dados.status.toLowerCase() === "inativo",
    };

    if (editId) {
        const index = lista.findIndex((upd) => upd.id === editId);
        if (index === -1) {
            console.warn(`Update com ID ${editId} não encontrado para edição.`);
            return;
        }

        updateASalvar.favorito = lista[index].favorito || false;
        updateASalvar.id = editId;

        lista[index] = { ...lista[index], ...updateASalvar };
    } else {
        updateASalvar.id = gerarId();
        updateASalvar.favorito = false;

        if (
            updateASalvar.titulo &&
            !/\s*\(versão\s*\d+\)$/i.test(updateASalvar.titulo)
        ) {
            updateASalvar.versao = 1;
        }

        lista.push(updateASalvar);
    }

    saveUpdates(lista);
}

export function duplicarUpdate(id) {
    const original = obterUpdatePorId(id);
    if (!original) return null;

    return {
        ...original,
        id: gerarId(),
        titulo: original.titulo,
        ultimaAtualizacao: new Date().toISOString().split("T")[0],
        favorito: false,
        inativo: false,
    };
}

export function obterUpdatesFiltrados(filtros = {}) {
    const updates = getUpdates();

    return updates.filter((upd) => {
        if (!upd || typeof upd !== "object") return false;

        const termoBusca = filtros.busca?.toLowerCase();

        if (termoBusca) {
            const tituloMatch = (upd.titulo || "").toLowerCase().includes(termoBusca);
            const descricaoMatch = (upd.descricao || "")
                .toLowerCase()
                .includes(termoBusca);
            const tipoMatch = (upd.tipo || "").toLowerCase().includes(termoBusca);
            const etiquetasMatch = (Array.isArray(upd.etiquetas) ? upd.etiquetas : [])
                .some((etq) => (etq || "").toLowerCase().includes(termoBusca));

            if (!tituloMatch && !descricaoMatch && !tipoMatch && !etiquetasMatch) {
                return false;
            }
        }

        if (filtros.tipo?.length && !filtros.tipo.includes(upd.tipo)) {
            return false;
        }

        if (filtros.etiquetas?.length) {
            const etiquetasUpd = Array.isArray(upd.etiquetas) ? upd.etiquetas : [];
            const temEtiqueta = etiquetasUpd.some((tag) =>
                filtros.etiquetas.includes(tag)
            );
            if (!temEtiqueta) return false;
        }

        if (filtros.status?.length && !filtros.status.includes(upd.status)) {
            return false;
        }

        if (filtros.ultimaAtualizacao) {
            const dataFiltroStr = filtros.ultimaAtualizacao.split("T")[0];
            const dataUpdStr = upd.ultimaAtualizacao?.split("T")[0];

            if (dataUpdStr !== dataFiltroStr) {
                return false;
            }
        }

        if (filtros.favoritos && !upd.favorito) {
            return false;
        }

        return true;
    });
}

export function atualizarOrdemFavoritos(novaOrdemIds) {
    const updates = getUpdates();

    const favoritosOrdenados = novaOrdemIds
        .map((id) => updates.find((upd) => upd.id === id))
        .filter(Boolean); 

    const naoFavoritos = updates.filter((upd) => !upd.favorito);

    const novaLista = [...favoritosOrdenados, ...naoFavoritos];
    saveUpdates(novaLista);
}
