import './scripts/post'
import "./styles/style.scss";
import {images, icons, sideico, asidesIco} from "./scripts/images"
import {Header, ToolBar, SidebarSm , SidebarLg, Canvas} from "./scripts/classes"
import {toBlock , weelHandler} from "./scripts/utils"
import {paintInit} from "./scripts/canvas"
const header = new Header(images.logo, 'New Piskel*')
const main = document.getElementById('main')
const toolBar = new ToolBar(icons, images.change)
const sidebarSm = new SidebarSm(sideico)
const sidebarLg = new SidebarLg(asidesIco)
const canv = new Canvas('canvas')

main.insertAdjacentHTML('beforebegin', header.toHTML())
main.insertAdjacentElement('afterbegin', toolBar.$el)
main.insertAdjacentElement('afterbegin', sidebarSm.$el)
main.insertAdjacentElement('afterbegin', sidebarLg.$el )
main.insertAdjacentHTML('afterbegin', canv.toHTML())
main.querySelector('#canvas').insertAdjacentElement('afterbegin',  canv.$el)
window.addEventListener('wheel', weelHandler)

paintInit('#paint-area')