import px2rem2js from './index.esm.js'
const p2r2js = new px2rem2js()
p2r2js.initRem()
const h1dom = document.createElement('div')
h1dom.style.fontSize = p2r2js.getRem(100)
h1dom.innerHTML = `Hello World!!
no suffix：${p2r2js.getRem(100,{suffix:false})}rrem`
document.body.appendChild(h1dom)