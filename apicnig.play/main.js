import './style.css'
import Split from 'split-grid'
import {encode, decode} from 'js-base64'
import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
/*import { createEditor } from '/editor.js'*/

// Creamos un objeto en el window que se llama MonacoEnvironment
window.MonacoEnvironment = {
  getWorker (_,label){
    if (label==='html') return new HtmlWorker()
    if (label==='javascript') return new JsWorker()
    if (label==='css') return new CssWorker()
  }
}

const $ = selector => document.querySelector(selector) // Con esta función no repetimos contantemente el document.querySelector

Split({
    columnGutters:[{
      track:1,
      element: $('.vertical-gutter')
    }],
    rowGutters:[{
      track:1,
      element: $('.horizontal-gutter')

    }]

});

const $js = $('#js');
const $css = $('#css');
const $html = $('#html');

const { pathname } = window.location; // Para que esta asignación funcione, la variable debe llamarse igual que la propiedad

const [rawHTML, rawCSS, rawJS] = pathname.slice(1).split('%7C');

const html = rawHTML ? decode(rawHTML): '';
const css = rawCSS ? decode(rawCSS): '';
const js = rawJS ? decode(rawJS): '';


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


const htmlEditor = monaco.editor.create($html,{
  value: html,
  language: 'html',
  ...COMMON_EDITOR_OPTIONS
})

const cssEditor = monaco.editor.create($css,{
  value: css,
  language: 'css',
  ...COMMON_EDITOR_OPTIONS
})

const jsEditor = monaco.editor.create($js,{
  value: js,
  language: 'javascript',
  ...COMMON_EDITOR_OPTIONS
})


// Al usar MonacoEditor cambia la definición de eventos
htmlEditor.onDidChangeModelContent((e)=>{
  update();// Con esto recuperamos el contenido
})
cssEditor.onDidChangeModelContent(update)
jsEditor.onDidChangeModelContent(update)

const htmlForPreview=createHTML({html,css,js});
$('iframe').setAttribute('srcdoc',htmlForPreview);


function update() {
  const html = htmlEditor.getValue();
  const css =  cssEditor.getValue();
  const js =  jsEditor.getValue();

  //const hashedCode = `${window.btoa(html)}|${window.btoa(css)}|${window.btoa(js)}`;
  const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`;
  window.history.replaceState(null,null, `/${hashedCode}`); // Así cambiamos la URL en el navegador sin dirigir
  

  const htmlForPreview=createHTML({html,css,js});
  $('iframe').setAttribute('srcdoc',htmlForPreview);
}

function createHTML ({html,css,js}) {

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          ${js}
        </sc` + `ript>
      </body>
    </html>
  `

}
