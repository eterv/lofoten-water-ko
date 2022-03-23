export function fontFace(
  name: string,
  weight: number,
  file: string,
  types: string[] = ['woff']
): string {
  const ext: Record<string, string> = {
    woff: 'woff',
    woff2: 'woff2',
    truetype: 'ttf',
    opentype: 'oft',
  };

  const src: string[] = [];
  types.forEach((type) => {
    src.push(`url('${file}.${ext[type]}') format('${type}')`);
  });

  return `
    @font-face {
      font-family: ${name}; font-weight: ${weight};
      src: ${src.join(',')};
    }
  `;
}
