import px2rem2js,{EvenTypes} from './index.esm.js'
const p2r2js = new px2rem2js()
p2r2js.initRem()
const render = ()=>{
    const oldRoot = document.getElementById('root')
    if(oldRoot) oldRoot.parentNode.removeChild(oldRoot)
    const remEle = `
    <p>100px width in 750 design = ${p2r2js.getRem(100)}：</p>
    <div style="width:${p2r2js.getRem(100)};height:${p2r2js.getRem(100)};background-color:red"></div>
    <p>50px width in 750 design = ${p2r2js.getRem(50)}(no rem suffix!!)：</p>
    <div style="width:${p2r2js.getRem(50,{suffix:false})}rem;height:${p2r2js.getRem(50,{suffix:false})}rem;background-color:blue"><div>
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