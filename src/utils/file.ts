const staticBaseUrl = 'https://hzspfile.oss-cn-hangzhou.aliyuncs.com/aruran'

export function getFileUrl(filePath: string) {
  if (filePath.startsWith('http')) {
    return filePath
  }
  return `${staticBaseUrl}${filePath}`
}
