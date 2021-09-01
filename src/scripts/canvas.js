import {cursors} from "./images"   
let coords = [];
console.log(cursors)


// (e)=>{
//     if(moseMove){
//     ctx = window.ctx    
//     ctx.lineWidth = window.lh 
    
//     coords.push([e.offsetX, e.offsetY])    
//     ctx.lineTo(e.offsetX, e.offsetY)
//     ctx.stroke()    
    
//     ctx.beginPath()
//     ctx.arc(e.offsetX ,  e.offsetY , window.lh / 2 , 0, Math.PI * 2 )
//     ctx.fill()

//     ctx.beginPath()
//     ctx.moveTo(e.offsetX ,  e.offsetY)
    
//     }
// }
function penAction(mouseMove){
    if(mouseMove){
    ctx = window.ctx    
    ctx.lineWidth = window.lh 
    
    coords.push([e.offsetX, e.offsetY])    
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()    
    
    ctx.beginPath()
    ctx.arc(e.offsetX ,  e.offsetY , window.lh / 2 , 0, Math.PI * 2 )
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(e.offsetX ,  e.offsetY)
}}

export function paintInit(selector){
let  canv = document.querySelector(selector);
let ctx = canv.getContext('2d'),
lineWidth = 10;
document.querySelector('[data-tool = "pen"]').click()
window.lh = lineWidth
window.ctx = ctx 
let moseMove = false

canv.addEventListener('mousedown',()=> moseMove = true)
canv.addEventListener('mouseup', ()=>{ moseMove = false; ctx.beginPath(); coords.push('mouseup') }) 

canv.onmousemove =  (e)=>{
    if(moseMove){
    ctx = window.ctx    
    ctx.lineWidth = window.lh 
    
    coords.push([e.offsetX, e.offsetY])    
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()    
    
    ctx.beginPath()
    ctx.arc(e.offsetX ,  e.offsetY , window.lh / 2 , 0, Math.PI * 2 )
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(e.offsetX ,  e.offsetY)
    
    }
}

canvasDraw(penAction)
function save(){
    console.log('saved')
    localStorage.setItem('coords', JSON.stringify(coords))
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
       
        canv.style.cursor = `url(${cursors.pencil}), auto`
    }
    if(e.target.closest('[data-tool = "eraser"]')){
        canv.style.cursor = `url(${cursors.erase}), auto`
    }
    if(e.target.closest('[data-tool = "eraser"]')){
        canv.style.cursor = `url(${cursors.erase}), auto`
    }
    if(e.target.closest('[data-tool = "dryclean"]')){
        canv.style.cursor = `url(${cursors.circl}), auto`
    }
    if(e.target.closest('[data-tool = "square"]')){
        canv.style.cursor = `url(${cursors.rectangle}), auto`
    }
    if(e.target.closest('[data-tool = "dashedline"]')){
        canv.style.cursor = `url(${cursors.stroke}), auto`
    }
    if(e.target.closest('[data-tool = "flip"]')){
        canv.style.cursor = `url(${cursors.mirror}), auto`
    }
    if(e.target.closest('[data-tool = "fill"]')){
        canv.style.cursor = `url(${cursors.buck}), auto`
    }
}


}
// document.addEventListener('keyup',(e)=>{

//     if(e.keyCode === 83){
//        save()
//        console.log('saved')
//     }
    
//     if(e.keyCode === 82){
        // coords = JSON.parse(localStorage.getItem('coords'))
        // clear()
//         replay()


//        console.log('replayed')
//     }

//     if(e.keyCode === 67){
//         clear()
//     }

// })
   
