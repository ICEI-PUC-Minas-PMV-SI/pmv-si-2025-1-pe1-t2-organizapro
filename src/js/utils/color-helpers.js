// js/utils/color-helpers.js

// NOVO: PALETA DE CORES MAIS ELEGANTE
// Escolha cores que são visualmente distintas e funcionam bem com texto escuro (como #333)
// Sinta-se à vontade para ajustar esta paleta com suas cores preferidas!
const colorPalette = [
    '#8FBFE0', // Azul Suave
    '#A8DADC', // Azul Esverdeado Muted
    '#8CC08C', // Verde Sálvia
    '#FFC15E', // Laranja Pêssego
    '#E0876A', // Terracota
    '#CCB8A3', // Bege Acinzentado
    '#DDA0DD', // Ameixa Clara
    '#AFEEEE', // Turquesa Pálido
    '#BDB76B', // Caqui Escuro
    '#C1E1D1', // Menta Clara
    '#A2D9CE', // Verde Mar
    '#F5DEB3', // Trigo
    '#E6A0B1', // Rosa Empoeirado
    '#B0C4DE', // Azul Aço Claro
    '#FFDAB9', // Pêssego
    '#D3D3D3'  // Cinza Claro
];

// Cache de Cores para Etiquetas (para não recalcular)
const tagColorsCache = new Map();

/**
 * Gera um valor hash numérico a partir de uma string.
 * Usado para criar cores determinísticas.
 * @param {string} str A string de entrada (nome da etiqueta).
 * @returns {number} Um valor hash numérico.
 */
function stringToHashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return Math.abs(hash);
}

/**
 * Obtém uma cor consistente para uma dada etiqueta a partir de uma paleta predefinida.
 * A mesma etiqueta sempre terá a mesma cor.
 * @param {string} tagName O nome da etiqueta.
 * @returns {string} A string da cor (hex ou HSL) da paleta.
 */
export function getTagColor(tagName) { // <-- AGORA EXPORTADA
    if (!tagColorsCache.has(tagName)) {
        const hash = stringToHashCode(tagName);
        const colorIndex = hash % colorPalette.length;
        tagColorsCache.set(tagName, colorPalette[colorIndex]);
    }
    return tagColorsCache.get(tagName);
}