export function penAction(mouseMove, ctx, e){
    
    if(mouseMove){
    ctx = window.ctx    
    ctx.lineWidth = window.lh 
    
    window.coords.push([e.offsetX, e.offsetY])    
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()    
    
    ctx.beginPath()
    ctx.arc(e.offsetX ,  e.offsetY , window.lh / 2 , 0, Math.PI * 2 )
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(e.offsetX ,  e.offsetY)
}}

export function eraceAction(mouseMove, ctx, e){
    if(mouseMove){
    ctx = window.ctx    
    ctx.lineWidth = window.lh 
    
    window.coords.push([e.offsetX, e.offsetY])    
    
    ctx.beginPath()
    ctx.clearRect(e.offsetX ,  e.offsetY , window.lh * 1.2 , window.lh ,)
   
    }
    
}
export function pickAction(item, ctx, e){
   let bincolor = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data
   let rgb = `rgb(${bincolor.slice(0, 3).join(',')})`
   item.style.background = rgb
   item.dataset.color = rgb
}

export function lineAction(canv,  ctx,e){
    ctx = window.ctx    
    ctx.lineWidth = window.lh 
    
    window.coords.push([e.offsetX, e.offsetY])  
    let c1,c2
    let mouse = false
    canv.onmousedown = (e)=> {
    c1 = e.offsetX
    c2 = e.offsetY
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    mouse = true
    }  
   
    // canv.onmousemove = (e)=>{
    //     if(mouse){
        
    //     ctx.moveTo(c1,c2)
    //     ctx.lineTo(e.offsetX, e.offsetY)
    //     ctx.stroke()
    //     ctx.clearRect(0, 0, canv.width, canv.height);
    // }
    // }
        
    
    canv.onmouseup = (e)=>{
      mouse = false
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      ctx.beginPath();
    }

}


export function fillAction(canv, ctx, e){
   
}

// let imgData = context.getImageData(0, 0, 1, 1);
// var imgDataArray = context.getImageData(0, 0, 2, 2);
// var imageData = context.getImageData(0,0,canv.width,canv.height);
// var pixelStack = [[1, 3]];
// while(pixelStack.length)
// {
// newPos = pixelStack.pop();
// x = newPos[0];
// y = newPos[1];
// }
// pixelPos = (y*canv.width + x) * 4;
// while(y-- >= 0 && matchStartColor(pixelPos))
// {
// pixelPos -= canvasWidth * 4;
// }



// function matchStartColor(pixelPos)
// {
// var r = colorLayer.data[pixelPos];	
// var g = colorLayer.data[pixelPos+1];	
// var b = colorLayer.data[pixelPos+2];

// return (r == startR && g == startG && b == startB);
// }

// pixelPos += canvasWidth * 4;
// ++y;
// reachLeft = false;
// reachRight = false;
// while(y++ < canvasHeight-1 && matchStartColor(pixelPos))
// {
// colorPixel(pixelPos);

// }
// if(x > 0)
// {
//   if(matchStartColor(pixelPos - 4))
//   {
//     if(!reachLeft){
//       pixelStack.push([x - 1, y]);
//       reachLeft = true;
//     }
//   }
//   else if(reachLeft)
//   {
//     reachLeft = false;
//   }
// }
// if(x < canvasWidth-1)
// {
//   if(matchStartColor(pixelPos + 4))
//   {
//     if(!reachRight)
//     {
//       pixelStack.push([x + 1, y]);
//       reachRight = true;
//     }
//   }
//   else if(reachRight)
//   {
//     reachRight = false;
//   }
// }
        
// pixelPos += canvasWidth * 4;
// pixelStack = [[startX, startY]];

// while(pixelStack.length)
// {
// var newPos, x, y, pixelPos, reachLeft, reachRight;
// newPos = pixelStack.pop();
// x = newPos[0];
// y = newPos[1];

// pixelPos = (y*canvasWidth + x) * 4;
// while(y-- >= drawingBoundTop && matchStartColor(pixelPos))
// {
// pixelPos -= canvasWidth * 4;
// }
// pixelPos += canvasWidth * 4;
// ++y;
// reachLeft = false;
// reachRight = false;
// while(y++ < canvasHeight-1 && matchStartColor(pixelPos))
// {
// colorPixel(pixelPos);

// if(x > 0)
// {
//   if(matchStartColor(pixelPos - 4))
//   {
//     if(!reachLeft){
//       pixelStack.push([x - 1, y]);
//       reachLeft = true;
//     }
//   }
//   else if(reachLeft)
//   {
//     reachLeft = false;
//   }
// }

// if(x < canvasWidth-1)
// {
//   if(matchStartColor(pixelPos + 4))
//   {
//     if(!reachRight)
//     {
//       pixelStack.push([x + 1, y]);
//       reachRight = true;
//     }
//   }
//   else if(reachRight)
//   {
//     reachRight = false;
//   }
// }
        
// pixelPos += canvasWidth * 4;
// }
// }
// context.putImageData(colorLayer, 0, 0);

// function matchStartColor(pixelPos)
// {
// var r = colorLayer.data[pixelPos];	
// var g = colorLayer.data[pixelPos+1];	
// var b = colorLayer.data[pixelPos+2];

// return (r == startR && g == startG && b == startB);
// }

// function colorPixel(pixelPos)
// {
// colorLayer.data[pixelPos] = fillColorR;
// colorLayer.data[pixelPos+1] = fillColorG;
// colorLayer.data[pixelPos+2] = fillColorB;
// colorLayer.data[pixelPos+3] = 255;
// }