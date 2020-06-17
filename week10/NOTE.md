# 每周总结可以写在这里

>  第10周学习总结

## DOM API

### 1.Range API

```js
var Range = new Range()

range.setStart(element, 9)

range.setEnd(element, 4)

var range  = document.getSelection().getRangeAt(0)
```



- [`selectNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/selectNode)
- [`selectNodeContents()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/selectNodeContents)
- [`setEnd()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setEnd)
- [`setEndAfter()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setEndAfter)
- [`setEndBefore()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setEndBefore) 
- [`setStart()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setStart)
- [`setStartAfter()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setStartAfter)
- [`setStartBefore()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setStartBefore)



```js
var fragment = range.extractContents();

range.insertNode(document.createTextNode('aaaa'));
```



### 2.CSSOM

document.styleSheets



#### 2.1 Rule

```js
document.styleSheets[0].cssRules
document.styleSheets[0].insertRule('p {color: pink}', 0)
document.styleSheets[0].removeRule(0)
```



#### 2.2 CSSStyleRule

- selectorText String
- style K-V结构



#### 2.3 getComputedStyle

window.getComputedStyle(elt, pseudoElt)

elt: 元素

pseudoElt： 伪元素



#### 2.4 View相关API

- scroll
- window.open
- getClientRects()
- **getBoundingClientRect()**
- window.innerHeight innerWidth
- window.devicePixelRatio

