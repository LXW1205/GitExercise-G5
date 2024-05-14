  const image_sel = document.getElementById("input-file");
  const color_btn = document.querySelectorAll(".colors .option");
  const color_picker = document.querySelector("#color-picker");
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  
  //Global variables
  let img = null
  let selected_color = "#000";
      
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

color_btn.forEach(btn => {
  btn.addEventListener("click", () => {
    const select = document.querySelector(".colors .option .selected")
      if (select){
        select.classList.remove("selected");
      }
    btn.classList.add("selected");
    selected_color = window.getComputedStyle(btn).getPropertyValue("background-color");
  })
})

color_picker.addEventListener("change", () => {
  color_picker.parentElement.style.background = color_picker.value;
  color_picker.parentElement.click();
})

  //Draw
  let drawing;
  canvas.onmousedown = (e) => {
    //console.log('mousedown', e.clientX, e.clientY);
    drawing = true;
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = selected_color;
    ctx.fillStyle = selected_color;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.moveTo(e.offsetX, e.offsetY);
  }

  canvas.onmousemove = (e) => {
    //console.log('mousemove', e.clientX, e.clientY);
    if (drawing) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  }

  canvas.onmouseup = function () {
    //console.log('mousemove', e.clientX, e.clientY);
    drawing = false;
    ctx.closePath();
  }