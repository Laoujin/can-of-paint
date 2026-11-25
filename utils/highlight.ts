const KW = new Set('var new return if else null class void public private protected static using await async readonly struct ref out in fixed unsafe int byte bool string true false this override sealed record throw interface'.split(' '))

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function highlight(code: string): string[] {
  return code.split('\n').map((line) => {
    let out = ''
    const re = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(\b\d[\d_]*\b)|([A-Za-z_]\w*)|(\s+)|(.)/g
    let m: RegExpExecArray | null
    while ((m = re.exec(line))) {
      if (m[1]) out += `<span class="c-com">${esc(m[1])}</span>`
      else if (m[2]) out += `<span class="c-str">${esc(m[2])}</span>`
      else if (m[3]) out += `<span class="c-num">${esc(m[3])}</span>`
      else if (m[4]) out += KW.has(m[4]) ? `<span class="c-kw">${m[4]}</span>` : /^[A-Z]/.test(m[4]) ? `<span class="c-ty">${m[4]}</span>` : m[4]
      else out += esc(m[0])
    }
    return out || ' '
  })
}
