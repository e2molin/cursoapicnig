import * as monaco from 'monaco-editor'

/**
 * Opciones de configuración
 * https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html
 */
 const COMMON_EDITOR_OPTIONS = {
  automaticLayout: true,
  theme: 'vs-dark',
  fontSize: 14,
  minimap: {
    enabled: false
  },
  padding: {
    top: 16
  },
  scrollBeyondLastLine: false,
  lineNumbers: false,
  roundedSelection: false,
  wordWrap: true,
  fontFamily: 'Cascadia Code,Monaco,monospace',
  fontLigatures: true,
}

export const createEditor = ({ domElement, language, value }) => {
  monaco.editor.create(domElement, {
    value,
    language,
    ...COMMON_EDITOR_OPTIONS
  })
}