export function removeExtension(file: string, extension: string): string {
  return file.endsWith(extension) ? file.substring(0, file.length - extension.length) : file
}
