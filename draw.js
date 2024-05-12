  const image_sel = document.getElementById('input-file');
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');    
  let img = null
      
  image_sel.addEventListener('change', () => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const images = new Image()
      images.onload = () => {
        canvas.width = images.width//Resizing
        canvas.height = images.height
        ctx.drawImage(images, 0, 0, canvas.width, canvas.height)        
      }      
      images.src = e.target.result
    }
    reader.readAsDataURL(image_sel.files[0])
  })

  //Draw
  let drawing;
  canvas.onmousedown = (e) => {
    //console.log('mousedown', e.clientX, e.clientY);
    drawing = true;
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = color;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.moveTo(e.offsetX, e.offsetY);
  };

  canvas.onmousemove = (e) => {
    //console.log('mousemove', e.clientX, e.clientY);
    if (drawing) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  };

  canvas.onmouseup = function () {
    //console.log('mousemove', e.clientX, e.clientY);
    drawing = false;
    ctx.closePath();
  };  