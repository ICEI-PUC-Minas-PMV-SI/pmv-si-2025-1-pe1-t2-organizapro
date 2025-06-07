const colorPalette = [
  '#8FBFE0', '#A8DADC', '#8CC08C', '#FFC15E', '#E0876A',
  '#CCB8A3', '#DDA0DD', '#AFEEEE', '#BDB76B', '#C1E1D1',
  '#A2D9CE', '#F5DEB3', '#E6A0B1', '#B0C4DE', '#FFDAB9', '#D3D3D3'
];

const tagColorsCache = new Map();

function stringToHashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getTagColor(tagName) {
  if (!tagColorsCache.has(tagName)) {
    const index = stringToHashCode(tagName) % colorPalette.length;
    tagColorsCache.set(tagName, colorPalette[index]);
  }
  return tagColorsCache.get(tagName);
}
