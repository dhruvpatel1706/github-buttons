import { document } from './globals'

export const createElementInDocument = function (document) {
  return function (tag, props, children) {
    const el = document.createElement(tag)
    if (props) {
      for (let prop in props) {
        const val = props[prop]
        if (val != null) {
          if (el[prop] != null) {
            el[prop] = val
          } else {
            el.setAttribute(prop, val)
          }
        }
      }
    }
    if (children) {
      for (let i = 0, len = children.length; i < len; i++) {
        const child = children[i]
        el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child)
      }
    }
    return el
  }
}

export const createElement = createElementInDocument(document)

export const dispatchOnce = function (func) {
  let onceToken = 0
  return function () {
    if (!onceToken && (onceToken = 1)) {
      func.apply(this, arguments)
    }
  }
}