import * as monaco from 'monaco-editor'
import { emmetHTML } from 'emmet-monaco-es'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { getState } from './state.js'

const {
  fontSize,
  lineNumbers,
  minimap,
  theme,
  wordWrap
} = getState()

/**
 * Opciones de configuración
 * https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html
 */
 const COMMON_EDITOR_OPTIONS = {
  automaticLayout: true,
  theme: 'vs-dark',
  fontSize: 14,
  fixedOverflowWidgets: true,
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

emmetHTML(monaco)

window.MonacoEnvironment = {
  getWorker (_, label) {
    if (label === 'html') return new HtmlWorker()
    if (label === 'javascript') return new JsWorker()
    if (label === 'css') return new CssWorker()
  }
}

export const createEditor = ({ domElement, language, value }) => {
  return monaco.editor.create(domElement, {
    value,
    language,
    ...COMMON_EDITOR_OPTIONS
  })
}