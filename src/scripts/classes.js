import { noop } from "jquery"
import { toName} from './utils'

let counter = 1
function creator(element, cls, attr = false, attrval){
    const el = document.createElement(element)
    el.className = cls
    attr? el.setAttribute(attr, attrval) : noop()
    return el
}

function classIterator(parent, cls, e){
  let arr = parent.querySelectorAll(cls)
  arr.forEach(item => item.classList.remove('active'))
  e ?  e.target.closest(cls).classList.add('active') : noop()
}

function swapColors(arr){
 let col1 = arr[0].style.backgroundColor
 let col2 = arr[1].style.backgroundColor
 arr[0].style.backgroundColor = col2
 arr[1].style.backgroundColor = col1
}
function colSwapper(el, color){
 el.dataset.color = color
 el.style.background = color
}

export class Header{
    constructor(logo, title){
        this.logo = logo
        this.title = title
        
    }

    toHTML(){
     
        return `
        <header class="header" id="header">
        <div class="header__logo"><img src="${this.logo}" alt=""></div>
        <div class="header__text">${this.title}</div>
        <div class="header-buttons">
          <a id="download-image" class="header-buttons__btn button">Download sprite</a>
          <button class="header-buttons__btn button">Sing in</button>
        </div>
      </header>
        `
    }
    
}

export class ToolBar{
    constructor(icons, icon, options){
        this.icons = icons
        this.icon =  icon
        this.$el = creator('div', 'tools', 'id', 'tools')
        this.$el.innerHTML = this.toHTML()
        this.$el.addEventListener('click',this.delegate)
        
    }
    toHTML(){
        let html= ''
        this.icons.map(item=> html += ` <div class="tools-toolbox__item" data-tool="${toName(item)}"><img src="${item}" alt=""></div>`)
        return `
        
        <div class="tools__wrapper">
        <div class="tools-sizes" id="sizes">
          <span class="tools-sizes__item" data-size="2"></span>
          <span class="tools-sizes__item"  data-size="5" ></span>
          <span class="tools-sizes__item"  data-size="10"></span>
          <span class="tools-sizes__item"  data-size="25"></span>
        </div>
        <div class="tools-toolbox" id="tool-box">
         ${html}
        </div>
         <div class="tools-color" id="color-picker">
         <input class="tools-color__picker" data-color="1" type="color">
         <div class="tools-color__block">
           <div class="tools-color__color" data-fill="#fff" style="background:#fff;">
           </div>
         </div>
         <div class="tools-color__block">
         
          <div class="tools-color__color" data-fill="#000" style="background:#000;"></div>
        </div>
          <div class="tools-color__arrow"><img data-action ="swap" src="${this.icon}" alt=""></div>
        </div>
      </duv>
    </div>


    <div class="tools-previev" id="tools-previev">
    <div class="dd">
    <div class="tools-previev__item active">
      <div class="tools-previev__number">1</div>
    </div>
    </div>
    <button class="tools-previev__button" data-action = "create"><i class="bi bi-plus-lg"></i> <div class="label">Add new frame</div></button>
  </div> `
    }
  
   
   delegate(e){
    
   const et = e.target
     if(et.closest('.tools-toolbox__item')) classIterator(this,'.tools-toolbox__item', e)
     
     if(et.closest('.tools-sizes__item')){ 
       classIterator(this,'.tools-sizes__item', e)
        window.lh = et.dataset.size
      }
     

    if(et.closest('[data-action="create"]')){
      counter++
      let block = creator('div', 'tools-previev__item', `data-canvas`, counter)
      block.innerHTML = ` <div class="tools-previev__number">${counter}</div>`
      this.querySelector('.dd').insertAdjacentElement('beforeend', block)
      
     }
    if(et.closest('.tools-previev__item')) classIterator(this, '.tools-previev__item', e)


    if(et.dataset.action === 'swap'){
      let els = et.closest('#color-picker').querySelectorAll('.tools-color__color')
      window.ctx.fillStyle = els[0].style.background
      window.ctx.strokeStyle = els[0].style.background
      swapColors(els)

     }

    if(et.dataset.fill){
     let input =  et.closest('#color-picker').querySelector('input')
     input.click()
     input.onchange = ()=>{
      colSwapper(et, input.value);
      window.ctx.fillStyle =  et.style.background
      window.ctx.strokeStyle = et.style.background
    } }

    // if(et.dataset.tool) ? ()=>{

      if(et.closest('[data-tool = "eraser"]')){
        
      }
      
    // }
    // : noop()

    }
    
  }
   
    


export class SidebarSm{
  constructor(icons){
    this.icons = icons
    this.$el = creator('div', 'settings', 'id', 'settings')
    this.$el.innerHTML = this.toHTML()
  }
  toHTML(){
    let html= ''
    this.icons.map(item=> html += ` <div class="tools-toolbox__item"><img src="${item}" alt=""></div>`)
    return html
  }
}

export class SidebarLg{
  constructor(icons){
    this.icons = icons
    this.$el = creator('aside', 'sidebar', 'id', 'sidebar')
    this.$el.innerHTML = this.toHTML()
    this.$range =  this.$el.querySelector('[data-input="fps"]')
    this.$el.addEventListener('click',this.delegate)
    this.$range.addEventListener('input', this.changeFPS)
  }

  toHTML(){
    let html= ''
    this.icons.map(item=> html += ` <div class="tools-toolbox__item"><img src="${item}" alt=""></div>`)

    return `
    <div class="sidebar__content">
      <div class="sidebar-previev">
  
        <div class="sidebar-canvas" >
        <img id ="previev-canvas-img" src = "http://localhost:8080/phone.png">
          <div class="sidebar-canvas__overlay">
            <div class="sidebar-canvas__head">
              <div class="sidebar-canvas__drops">
                <span class="sidebar-canvas__item sidebar-canvas__item--hidden">x1</span>
                <span class="sidebar-canvas__item sidebar-canvas__item--hidden">x6</span>
                <span class="sidebar-canvas__item" >full</span>
       
              </div>
              <span class="sidebar-canvas__item"><i class="bi bi-grid-3x3-gap-fill"></i></span>
              <span class="sidebar-canvas__item"><i class="bi bi-download"></i></span>
            </div>
          </div>
        </div>
        <div class="sidebar-canvas-footer">
          <div class="sidebar-canvas-footer__icon"><i class="bi bi-lightning-fill"></i></div>
          <span class="sidebar-canvas-footer__fps" data-label="fps">12 FPS</span>
          <input class="sidebar-canvas-footer__input" type="range" min="1" value="12" max="24" data-input="fps">
        </div>
      </div>
  
      <div class="sidebar-layers">
        <div class="sidebar-layers__head"><span>Layers</span> <i class="bi bi-eye-fill hover-icon active"></i></div>
        <div class="sidebar-layers__buttons">
          <button class="sidebar-layers__button"><i class="bi bi-plus-lg"></i></button>
          <button class="sidebar-layers__button" disabled="disabled"><i class="bi bi-arrow-up-short"></i></button>
          <button class="sidebar-layers__button" disabled="disabled"><i class="bi bi-arrow-down-short"></i></button>
          <button class="sidebar-layers__button"><i class="bi bi-pen-fill"></i></button>
          <button class="sidebar-layers__button" disabled="disabled"><i class="bi bi-download"></i></button>
          <button class="sidebar-layers__button" disabled="disabled"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="sidebar-layers__footer">
           <span data-label="opacity">Layer 1</span>
           <span data-action="opacity">a</span> 
        </div>
      </div>
  
      <div class="sidebar-transform sidebar-layers">
        <div class="sidebar-layers__head"><span>Transform</span><i class="bi bi-plus-lg hover-icon active"></i></div>
        <div class="sidebar-transform__wrapper">
         ${html}
        </div> 
  
      </div>
      <div class="sidebar-layers sidebar-colors">
        <div class="sidebar-layers__head"><span>Pallettes</span></div>
        <div class="sidebar-layers__buttons">
          <button class="sidebar-layers__button"><i class="bi bi-plus-lg"></i></button>
          <select class="palletes-list-select">
            <option value="current-color">Current color</option>
            <option selected value="pallete">New pallete</option>
          </select>
          <button class="sidebar-layers__button"><i class="bi bi-pen-fill"></i></button>
  
        </div>
        <div class="sidebar-colors-pallete">
          <div class="sidebar-colors-pallete__item"><span class="sidebar-colors-pallete__num">1</span></div>
          
        </div>
      </div>
    </div>
  
  
  
  <div class="sidebar-footer">
   <span data-info="quality">X8.11</span>
   <span data-info="location">[32X32] 9132</span>
   <span>1/1</span>
  </div>  `
  }

  delegate(e){
    const et = e.target
    if(et.closest('.tools-toolbox__item')) classIterator(this,'.tools-toolbox__item', e)
    else{classIterator(this,'.tools-toolbox__item')}
  }

  changeFPS(e){
    this.parentNode.querySelector('[data-label="fps"]')
    .textContent = e.target.value + ' FPS'
  }
}






export class Canvas{
  constructor(name){
   this.$el = document.createElement('canvas')
   this.$el.width = window.innerWidth / 2
   this.$el.height = window.innerHeight -70
   this.$el.id = 'paint-area'
   
   
  }
  toHTML(){
   return `
   <div style="height : ${window.innerHeight -70}px; width: ${window.innerWidth}px " id="canvas">
   
   </div>`
  }
}