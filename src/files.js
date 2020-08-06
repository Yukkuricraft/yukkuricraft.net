export function removeExtension(file, extension) {
  return file.endsWith(extension) ? file.substring(0, file.length - extension.length) : file
}
