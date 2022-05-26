import './style.css'
import Split from 'split-grid'

/*
const getEl = selector => document.querySelector(selector) // Con esta función no repetimos contantemente el document.querySelector
const $js = getEl('#js');
const $css = getEl('#css');
const $html = getEl('#html');
// Refactorizamos esto 👇
*/
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

/*
document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
*/

const $js = $('#js');
const $css = $('#css');
const $html = $('#html');

$js.addEventListener('input', update);
$css.addEventListener('input', update);
$html.addEventListener('input', update);

function init(){

  const { pathname } = window.location; // Para que esta asignación funcione, la variable debe llamarse igual que la propiedad

  const [rawHTML, rawCSS, rawJS] = pathname.slice(1).split('%7C');

  const html = window.atob(rawHTML);
  const css = window.atob(rawCSS);
  const js = window.atob(rawJS);

  $html.value = html;
  $css.value = css;
  $js.value = js;

  const htmlForPreview=createHTML({html,css,js});
  $('iframe').setAttribute('srcdoc',htmlForPreview);

}



function update() {
  const html = $html.value;
  const css = $css.value;
  const js = $js.value;

  const hashedCode = `${window.btoa(html)}|${window.btoa(css)}|${window.btoa(js)}`;
  window.history.replaceState(null,null, `/${hashedCode}`); // Así cambiamos la URL en el navegador sin dirigir
  

  const htmlForPreview=createHTML({html,css,js});
  $('iframe').setAttribute('srcdoc',htmlForPreview);
}

const createHTML = ({html,css,js}) =>{


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

init();