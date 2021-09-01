import { noop } from "jquery";

export function toBlock(content, name, id){
 return ` <div class="${name}" id="${id}">${content}</div>`
}
let scale = 1
export function weelHandler(e){
   if(e.target.closest('#canvas')){
    let delta = e.deltaY || e.detail || e.wheelDelta;
    
    delta > 0 ? scale < 3 ? scale += 0.1 : noop() : scale > -0.15 ? scale -= 0.1 : noop();
    e.target.closest('#paint-area')? e.target.closest('#paint-area').style.transform = `scale(${scale})` :
    e.target.querySelector('#paint-area').style.transform = `scale(${scale})`

   }
}

export function toName(str){
   return str
   .replace(/localhost/g, "")
   .replace(/http/ig, "")
   .replace(/\W/ig, "")
   .replace(/svg/ig, '')
   .replace(/8080/ig, '')
}
