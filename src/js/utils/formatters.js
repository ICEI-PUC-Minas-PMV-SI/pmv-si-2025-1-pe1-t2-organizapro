// js/utils/formatters.js

/**
 * Formata uma string de data no formato ISO (AAAA-MM-DD) para o formato brasileiro (DD/MM/AAAA).
 * Lida com valores nulos, indefinidos ou em branco retornando "indefinido".
 * Também aceita datas já no formato BR para compatibilidade.
 *
 * @param {string | undefined | null} dataISO String da data no formato "AAAA-MM-DD" ou "DD/MM/AAAA".
 * @returns {string} Data formatada como "DD/MM/AAAA" ou a string "indefinido".
 */
export function formatarDataParaBR(dataISO) {
    // Retorna "indefinido" se a data for nula, indefinida, string vazia ou a string "undefined"
    if (!dataISO || typeof dataISO !== 'string' || dataISO.trim() === "" || dataISO.toLowerCase() === "undefined") {
        return "indefinido";
    }

    // Tenta primeiro o formato AAAA-MM-DD
    const partesISO = dataISO.split('-');
    if (partesISO.length === 3 && partesISO[0].length === 4) { // Verifica se é AAAA-MM-DD
        return `${partesISO[2]}/${partesISO[1]}/${partesISO[0]}`; // Retorna DD/MM/AAAA
    }

    // Se não for AAAA-MM-DD, verifica se já está em DD/MM/AAAA
    const partesBr = dataISO.split('/');
    if (partesBr.length === 3 && partesBr[2].length === 4) {
        return dataISO; // Já está no formato DD/MM/AAAA
    }

    // Se nenhum formato reconhecido, retorna o valor original (ou um fallback se preferir)
    return "indefinido"; // Ou 'dataISO' se quiser retornar o valor não formatado
}

/**
 * Formata um array de strings de etiquetas para uma única string separada por vírgulas e espaços.
 * Lida com valores nulos, indefinidos ou arrays vazios/inválidos, retornando "indefinido".
 *
 * @param {string[] | undefined | null} etiquetas Um array de strings de etiquetas.
 * @returns {string} As etiquetas formatadas como "tag1, tag2, tag3" ou a string "indefinido".
 */
export function formatarEtiquetasParaExibicao(etiquetas) {
    // Retorna "indefinido" se as etiquetas forem nulas ou indefinidas
    if (!etiquetas) {
        return "indefinido";
    }

    // Se for um array
    if (Array.isArray(etiquetas)) {
        // Filtra para garantir que cada tag seja uma string válida e não vazia após trim
        const tagsValidas = etiquetas.filter(tag => tag && typeof tag === 'string' && tag.trim() !== "").map(String);
        
        // Se houver tags válidas, junta-as com ", ". Caso contrário, retorna "indefinido".
        return tagsValidas.length > 0 ? tagsValidas.join(", ") : "indefinido";
    }

    // Se não for um array (pode ser uma string única, por exemplo, de dados antigos)
    // Converte para string e verifica se não está vazia após trim.
    const stringEtiquetas = String(etiquetas).trim();
    return stringEtiquetas !== "" ? stringEtiquetas : "indefinido";
}