export const escape = s =>
  String(s).replace(
    /[&<>"']/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c],
  )
function wrap(text, max, limit) {
  const lines = []
  for (const word of text.trim().split(/\s+/)) {
    let rest = word
    while (rest.length > max) {
      if (lines.length && lines.at(-1).length < max) lines.push('')
      lines.push(rest.slice(0, max))
      rest = rest.slice(max)
    }
    if (!rest) continue
    if (!lines.length || lines.at(-1).length + rest.length + 1 > max) lines.push(rest)
    else lines[lines.length - 1] += ' ' + rest
  }
  if (lines.length > limit) throw Error('Texto não cabe no card. Reduza o conteúdo.')
  return lines
}
export function cards({ brand, title, body, cta, color, format }) {
  if ([brand, title, body, cta, color, format].some(x => typeof x !== 'string'))
    throw Error('Preencha o card.')
  if (
    !brand.trim() ||
    brand.length > 30 ||
    !title.trim() ||
    title.length > 64 ||
    body.length > 180 ||
    cta.length > 40
  )
    throw Error('Use marca até 30, título até 64, texto até 180 e CTA até 40 caracteres.')
  if (!/^#[a-f0-9]{6}$/i.test(color)) throw Error('Cor deve ter formato #RRGGBB.')
  if (!['square', 'portrait'].includes(format)) throw Error('Formato inválido.')
  const h = format === 'portrait' ? 1350 : 1080
  const lines = wrap(title, 18, 5),
    bodyLines = wrap(body, 35, 7),
    ctaLines = wrap(cta, 30, 2)
  const text = (list, y, size, gap, fill) =>
    list
      .map(
        (l, i) =>
          `<text x="88" y="${y + i * gap}" fill="${fill}" font-size="${size}" font-family="Arial,sans-serif">${escape(l)}</text>`,
      )
      .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="${h}" viewBox="0 0 1080 ${h}" role="img"><title>${escape(title)}</title><rect width="1080" height="${h}" fill="#101014"/><rect x="88" y="88" width="96" height="8" fill="${color}"/><text x="88" y="152" fill="#ece9e4" font-size="26" font-family="Arial,sans-serif">${escape(brand)}</text>${text(lines, 260, 54, 65, '#faf7f2')}<line x1="88" x2="992" y1="${h - 395}" y2="${h - 395}" stroke="${color}"/>${text(bodyLines, h - 345, 25, 34, '#d5d1cc')}${text(ctaLines, h - 92, 27, 35, color)}<text x="992" y="${h - 32}" text-anchor="end" fill="#a09c97" font-size="15" font-family="Arial,sans-serif">Criado com Biziva Cards</text></svg>`
}
export async function process(input) {
  const svg = cards(input)
  return {
    text: svg,
    filename: 'card-biziva.svg',
    mime: 'image/svg+xml',
    visual: svg,
    summary: 'Card vetorial editável, pronto para exportar. PNG disponível na prévia.',
  }
}
