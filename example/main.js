import px2rem2js,{EvenTypes} from './index.esm.js'
const p2r2js = new px2rem2js()
p2r2js.initRem()
const render = ()=>{
    const oldRoot = document.getElementById('root')
    if(oldRoot) oldRoot.parentNode.removeChild(oldRoot)
    const remEle = `
    <p style="font-size:${p2r2js.getRem(100)}">Hello World!!(100px in 750 design = ${p2r2js.getRem(100)})</p>
    <p style="font-size:${p2r2js.getRem(50,{suffix:false})}rem">no rem suffix!!(50px in 750 design = ${p2r2js.getRem(50)})<p>
    `
    const dom = document.createElement('div')
    dom.id='root'
    dom.innerHTML = `
    <p>Root Font-Size:${document.documentElement.style.fontSize}</p>
    ${remEle}
    `
    document.body.appendChild(dom)
}
p2r2js.on(EvenTypes.RESIZE,()=>{
    render()
})
render()