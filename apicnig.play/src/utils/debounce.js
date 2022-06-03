/**
 * Para optimizar el rendimiento a veces es interesante que una función no se ejecute en el momento de su invocación.
 * Podemos hacer que espere unos milisegundos, cancelándose su ejecución su durante el tiempo de espera es invocada mútiples veces
 * @param {*} func 
 * @param {*} msWait 
 * @returns 
 */

export default function debounce (func, msWait) {
  let timeout
  return function (...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), msWait)
  }
}
