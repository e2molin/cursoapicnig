/**
 * Acceso a los objetos del DOM
 * 
 * @param {*} selector 
 * @param {*} context 
 * @returns 
 */

export const $ = (selector, context = document) =>
  context.querySelector(selector)

export const $$ = (selector, context = document) =>
  context.querySelectorAll(selector)