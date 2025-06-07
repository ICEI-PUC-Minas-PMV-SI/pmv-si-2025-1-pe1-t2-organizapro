export function formatarDataParaBR(data) {
  if (!data || typeof data !== 'string' || !data.trim() || data.toLowerCase() === 'undefined') 
    return 'indefinido';

  if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return data;

  return 'indefinido';
}

export function formatarEtiquetasParaExibicao(etiquetas) {
  if (!etiquetas) return 'indefinido';

  if (Array.isArray(etiquetas)) {
    const validas = etiquetas.filter(tag => typeof tag === 'string' && tag.trim());
    return validas.length ? validas.join(', ') : 'indefinido';
  }

  const str = String(etiquetas).trim();
  return str ? str : 'indefinido';
}
