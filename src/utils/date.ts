export function formatDate(d: string | Date | number, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (!d) {
    return 'N/A'
  }

  let format = fmt
  const date = new Date(d)
  const tokens: Record<string, number> = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }

  const yearMatch = format.match(/y+/)
  if (yearMatch) {
    const year = `${date.getFullYear()}`
    format = format.replace(
      yearMatch[0],
      year.slice(year.length - yearMatch[0].length),
    )
  }

  for (const [key, value] of Object.entries(tokens)) {
    const match = format.match(new RegExp(`(${key})`))
    if (!match) {
      continue
    }
    const token = match[0]
    const str = `${value}`
    const padded = token.length === 1 ? str : str.padStart(token.length, '0')
    format = format.replace(token, padded)
  }

  return format
}

export function str2Date(dateStr: string, separator: string = '-') {
  const dateArr = dateStr.split(separator)
  const year = Number.parseInt(dateArr[0])
  let month
  // 处理月份为04这样的情况
  if (Number(dateArr[1].indexOf('0')) === 0) {
    month = Number.parseInt(dateArr[1].substring(1))
  }
  else {
    month = Number.parseInt(dateArr[1])
  }
  const day = Number.parseInt(dateArr[2])
  const date = new Date(year, month - 1, day)
  return date
}
