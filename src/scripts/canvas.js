import { noop } from "jquery";
import {cursors} from "./images"   
let coords = [];
console.log(cursors)
import { penAction , eraceAction, pickAction, lineAction, fillAction} from "./modes";
window.coords = coords

function toBlob(blob) {
       
   let link = document.getElementById('download-image')
   let href = URL.createObjectURL(blob);
   link.download = 'fff.png'
   link.href = href    
    document.getElementById('previev-canvas-img').src = href
    
    
}


export function paintInit(selector){
let  canv = document.querySelector(selector);
let ctx = canv.getContext('2d'),
lineWidth = 10;
document.querySelector('[data-tool = "pen"]').click()
window.lh = lineWidth
window.ctx = ctx 

let moseMove = false
canv.style.cursor = `url(${cursors.pencil}), auto`
canv.onmousedown = ()=> moseMove = true
canv.onmouseup =  ()=>
{ 
    moseMove = false; ctx.beginPath(); coords.push('mouseup')
    canv.toBlob((blob)=>toBlob(blob), 'image/png');
}

canv.onmousemove = (e)=> penAction(moseMove, ctx, e)


function save(){
    console.log('saved')
    localStorage.setItem('coords', JSON.stringify(window.coords))
}

function clear(){
    ctx.clearRect(0, 0, canv.width, canv.height);
}

function replay (){
   let timer = setInterval(()=>{
       if(coords.length === 0){
           clearInterval()
           ctx.beginPath()
           return
       }
       let crd = coords.shift(),
       e = {
        clientX : crd[0],
        clientY : crd[1],
       }

    ctx.lineTo(e.clientX, e.clientY)
    ctx.stroke()    

    ctx.beginPath()
    ctx.arc(e.clientX ,  e.clientY , window.lh / 2 , 0, Math.PI * 2 )
    ctx.fill()
    ctx.beginPath() 
    ctx.moveTo(e.clientX ,  e.clientY)
    
   }, 30)
}
setTimeout(()=>{
    const tools  = document.getElementById('tools')
    tools.addEventListener('click', toolsHandler)  
}, 1000)
 


function toolsHandler(e){
    canv.onmousedown = ()=> moseMove = true
    canv.onmouseup =  ()=>
    { 
        moseMove = false; ctx.beginPath(); coords.push('mouseup') ;
        canv.toBlob((blob)=>toBlob(blob), 'image/png');
    }
    if(e.target.closest('[data-tool = "broom"]')){
        clear()
    }
    if(e.target.closest('[data-tool = "memorycard"]')){
        save()
    }
    if(e.target.closest('[data-tool = "magicwand"]')){
        coords = JSON.parse(localStorage.getItem('coords'))
        clear()
        replay()
    }
    if(e.target.closest('[data-tool = "pen"]')){
        canv.onmousemove = (e)=> penAction(moseMove, ctx, e);
        canv.style.cursor = `url(${cursors.pencil}), auto`
    }
    if(e.target.closest('[data-tool = "eraser"]')){
        canv.onmousemove = (e)=> eraceAction(moseMove, ctx, e);
        canv.style.cursor = `url(${cursors.erase}), auto`
    }
    if(e.target.closest('[data-tool = "colorpicker"]')){
        let item = document.querySelectorAll('[data-fill]')[1]
        canv.onmousedown = (e)=> pickAction(item,ctx, e);
        canv.onmousemove = (e)=> noop();
        canv.style.cursor = `url(${cursors.dropper}), auto`
    }
    
    if(e.target.closest('[data-tool = "dryclean"]')){
        canv.style.cursor = `url(${cursors.circl}), auto`
    }
    if(e.target.closest('[data-tool = "square"]')){
        canv.style.cursor = `url(${cursors.rectangle}), auto`
    }
    if(e.target.closest('[data-tool = "dashedline"]')){
        canv.onmousemove = (e)=> lineAction(canv, ctx,  e)
        
        canv.style.cursor = `url( ${cursors.stroke}), auto`
    }
    if(e.target.closest('[data-tool = "flip"]')){
        canv.style.cursor = `url(${cursors.mirror}), auto`
    }
    if(e.target.closest('[data-tool = "fill"]')){
        canv.onmousedown = (e)=> fillAction(ctx, e);
        canv.style.cursor = `url(${cursors.buck}), auto`
    }
}


}

   
