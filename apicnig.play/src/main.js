import './style.css'
import Split from 'split-grid'
import {encode, decode} from 'js-base64'
import { createEditor } from './editor.js'
import debounce from './utils/debounce.js'
import { $ } from './utils/dom.js'

const $js = $('#js');
const $css = $('#css');
const $html = $('#html');

const { pathname } = window.location; // Para que esta asignación funcione, la variable debe llamarse igual que la propiedad

const [rawHTML, rawCSS, rawJS] = pathname.slice(1).split('%7C'); // Creamos un array con las cuatro partes del código, HTML, CSS y JS

const html = rawHTML ? decode(rawHTML): '';
const css = rawCSS ? decode(rawCSS): '';
const js = rawJS ? decode(rawJS): '';

const htmlEditor = createEditor({ domElement: $html, language: 'html', value: html })
const cssEditor = createEditor({ domElement: $css, language: 'css', value: css })
const jsEditor = createEditor({ domElement: $js, language: 'javascript', value: js })

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

const MS_UPDATE_DEBOUNCED_TIME = 200
const debouncedUpdate = debounce(update, MS_UPDATE_DEBOUNCED_TIME)

htmlEditor.onDidChangeModelContent(debouncedUpdate)
cssEditor.onDidChangeModelContent(debouncedUpdate)
jsEditor.onDidChangeModelContent(debouncedUpdate)

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
