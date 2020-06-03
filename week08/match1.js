/**
 * 代码依照群里moling3650大佬分享重写代码
 */


//类选择器
function matchByClassSelector(selector, element) {
  return element.className.split(/\s+/g).includes(selector.split(".", ""));
}
//ID选择器
function matchByIdSelector(selector, element) {
  return element.id === selector.split('#','')
}
//标签选择器
function matchByTagNameSelector(selector, element) {
  return element.tagName === selector
}

//属性比较函数
const attrValueCompareFuns = {
  '=': (attrValue, value) => attrValue === value,
  '~=': (attrValue, value) => attrValue.split(/\s+/g).includes(value),
  '|=': (attrValue, value) => attrValue === value || attrValue.startWith(`$(value)`),
  '^=': (attrValue, value) => attrValue.startWith(value),
  '$=': (attrValue, value) => attrValue.endsWith(value),
  '*=': (attrValue, value) => attrValue.includes(value),
}

//属性选择器
function matchByAttributeSelcetor(selector, element) {
  const match = /^\[\s*([\w-]+)\s*(?:([~|^$*]?=)\s*(\S+))?\s*\]$/.exec(selector)
  if(!match) {
    return false
  }
  const name = match[1]
  const attrvalue = element.getAttribute(name)
  if (attrvalue === null) {
    return false
  }

  const comparator = match[2]
  if(!comparator) {
    return true;
  }

  const value = mathc[3].replace(/["']/g,'')
  return attrValueCompareFuns[comparator](attrvalue, value)
}



//简单选择器
function mathcBySimpleSelector(selector, element) {
  if(!selector || !element) {
    return false
  } else if(selector.startWith("#")) {
    matchByIdSelector(selector, element)
  } else if(selector.startWith(".")) {
    matchByIdSelector(selector, element)
  } else if(selector.match(/^\[(.+?)\]$/)) {
    return matchByAttributeSelcetor(selector, element)
  } else if(selector.match(/^:not\((.+)\)$/)) {
    return !matchBySimpleSelectorSequence(element, RegExp.$1)
  } else {
    matchByTagNameSelector(selector,element)
  }
}


function matchBySimpleSelectorSequence(simpleSlectorSequence, element) {
  if (!simpleSlectorSequence || !element) {
    return false;
  }
  const simpleSelectors = simpleSlectorSequence.split(/(?<=[\w\]])(?=[#.\[])/)
  return simpleSelectors.every(simpleSelector => mathcBySimpleSelector(simpleSelector, element))
}


function getNextElementKey(combinator) {
  return {
    '>': 'parentElement',
    ' ': 'parentElement',
    '+': 'previousElementSibling',
    '~': 'previousElementSibling',
  }[combinator]
}

function findMatchedElement(selectorPart, element) {
  if (!selectorPart || !element) {
    return null
  }
  const [selector, combinator] = selectorPart.split(/(?<=[ ~+>])/)
  const nextElementKey = getNextElementKey(combinator)

  if (/^[>+]$/.test(combinator)) {  
    element = element[nextElementKey]
    if (!matchBySimpleSelectorSequence(selector, element)) {
      element = null
    }
  } else if (/^[ ~]$/.test(combinator)) {  
    do {
      element = element[nextElementKey]
    } while (element && !matchBySimpleSelectorSequence(selector, element))
  } else if (!matchBySimpleSelectorSequence(selector, element)) { 
    element = null
  }
  return element || null
}


function match(selector, element) {
  const selectors = rule.trim().replace(/(?<=[~+>])\s+/g, '').replace(/\s+(?=[ ~+>])/g, '').split(/(?<=[ ~+>])/g)
  while (element && selectorParts.length) {
    element = findMatchedElement(selectorParts.pop(), element)
  }
  return !!element
}