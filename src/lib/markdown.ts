function parseBold(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

function parseItalic(text: string): string {
  return text.replace(/\*(.+?)\*/g, '<em>$1</em>')
}

function parseInlineCode(text: string): string {
  return text.replace(/`(.+?)`/g, '<code>$1</code>')
}

function parseImages(text: string): string {
  return text.replace(
    /!\[(.*?)\]\(([^)]*?)\)/g,
    (_, alt: string, url: string) => `<img src="${url}" alt="${alt || ''}" />`
  )
}

function parseLinks(text: string): string {
  return text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
}

function parseHeadings(text: string): string {
  return text
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
}

function parseUnorderedList(text: string): string {
  return text.replace(
    /(^|\r?\n)((?:\s*- .+(?:\r?\n|$))+)/g,
    (_, prefix, block) => {
      const items = block
        .trim()
        .split(/\r?\n/)
        .map((line: string) => line.replace(/^\s*- /, '').trim())
        .filter(Boolean)
        .map((item: string) => `<li>${item}</li>`)
        .join('')
      return `${prefix}<ul>${items}</ul>`
    }
  )
}

function parseOrderedList(text: string): string {
  return text.replace(
    /(^|\r?\n)((?:\d+\. .+(?:\r?\n|$))+)/g,
    (_, prefix, block) => {
      const items = block
        .trim()
        .split(/\r?\n/)
        .map((line: string) => line.replace(/^\d+\. /, '').trim())
        .filter(Boolean)
        .map((item: string) => `<li>${item}</li>`)
        .join('')
      return `${prefix}<ol>${items}</ol>`
    }
  )
}

function parseLineBreaks(text: string): string {
  return text.replace(
    /(?<!<\/ul>|<\/ol>|<\/li>|<\/h1>|<\/h2>|<\/h3>)\n/g,
    '<br/>'
  )
}

export function markdownToHtml(markdown: string): string {
  let html = markdown

  html = parseBold(html)
  html = parseItalic(html)
  html = parseInlineCode(html)
  html = parseImages(html)
  html = parseLinks(html)
  html = parseHeadings(html)
  html = parseUnorderedList(html)
  html = parseOrderedList(html)
  html = parseLineBreaks(html)

  return html
}
