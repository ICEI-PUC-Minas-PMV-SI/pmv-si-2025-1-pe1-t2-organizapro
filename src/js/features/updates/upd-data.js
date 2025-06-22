// src/features/updates/upd-data.js

const STORAGE_KEY = 'updates-v2';

function gerarId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function obterDataAtualISO() {
  return new Date().toISOString();
}

export function limparBaseDeAtualizacoes() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getUpdates() {
  const dados = localStorage.getItem(STORAGE_KEY);
  if (!dados) return [];

  try {
    const lista = JSON.parse(dados);
    return Array.isArray(lista) ? lista : [];
  } catch (erro) {
    console.error('Erro ao ler updates do localStorage:', erro);
    return [];
  }
}

export function saveUpdates(lista) {
  try {
    const ordenada = [...lista].sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ordenada));
  } catch (erro) {
    console.error('Erro ao salvar updates:', erro);
  }
}

export function salvarUpdate(dados, editId = null) {
  const lista = getUpdates();
  const agora = obterDataAtualISO();

  const novo = {
    ...dados,
    id: editId || gerarId(),
    data_criacao: editId ? dados.data_criacao : agora,
    ultima_atualizacao: agora,
    favorito: dados.favorito || false,
    inativo: dados.status?.toLowerCase() === 'inativo'
  };

  const idx = lista.findIndex(u => u.id === novo.id);
  if (idx >= 0) {
    lista[idx] = novo;
  } else {
    lista.push(novo);
  }

  saveUpdates(lista);
}

export function getUniqueUpdateTags() {
  const updatesRaw = localStorage.getItem('updates-v2');
  console.log('Updates raw no localStorage:', updatesRaw);
  if (!updatesRaw) return [];

  const updates = JSON.parse(updatesRaw);
  if (!Array.isArray(updates)) return [];

  const allTags = updates.flatMap(update => update.etiquetas || []);
  const uniqueTags = [...new Set(allTags)];
  console.log('Etiquetas únicas obtidas:', uniqueTags);
  return uniqueTags;
}


export function excluirUpdate(id) {
  const lista = getUpdates().filter(u => u.id !== id);
  saveUpdates(lista);
}

export function obterUpdatePorId(id) {
  return getUpdates().find(u => u.id === id) || null;
}

export function toggleFavorito(id) {
  const lista = getUpdates();
  const idx = lista.findIndex(u => u.id === id);
  if (idx === -1) return;

  lista[idx].favorito = !lista[idx].favorito;
  lista[idx].ultima_atualizacao = obterDataAtualISO();
  saveUpdates(lista);
}

export function arquivarUpdate(id) {
  const lista = getUpdates();
  const idx = lista.findIndex(u => u.id === id);
  if (idx === -1) return;

  lista[idx].inativo = true;
  lista[idx].status = 'Inativo';
  lista[idx].ultima_atualizacao = obterDataAtualISO();
  saveUpdates(lista);
}

export function desarquivarUpdate(id) {
  const lista = getUpdates();
  const idx = lista.findIndex(u => u.id === id);
  if (idx === -1) return;

  lista[idx].inativo = false;
  lista[idx].status = 'Ativo';
  lista[idx].ultima_atualizacao = obterDataAtualISO();
  saveUpdates(lista);
}