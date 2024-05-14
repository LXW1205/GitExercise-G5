  const image_sel = document.getElementById("input-file");
  const line_weight = document.querySelector("#size");
  const tools_element = document.querySelector(".tools");
  const color_btn = document.querySelectorAll(".tools .option");
  const color_picker = document.querySelector("#color-picker");
  const downloadButton = document.getElementById("download");
  const clear = document.querySelector(".clean");
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  
  //Global variables
  let img = null;
  let draw_weight = 5;
  let selected_color = "#000";
  let uploaded_img = null;
      
  image_sel.addEventListener('change', () => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const images = new Image()
      images.onload = () => {
        canvas.width = images.width//Resizing
        canvas.height = images.height
        ctx.drawImage(images, 0, 0, canvas.width, canvas.height)     
        uploaded_img = ctx.getImageData(0, 0, canvas.width, canvas.height);   
      }      
      images.src = e.target.result;
      tools_element.classList.remove("hide");
    }
    reader.readAsDataURL(image_sel.files[0])
  })

//Tools Weight/Width
line_weight.addEventListener("change", () => 
  draw_weight = line_weight.value
);

//Clear Drawing
clear.addEventListener("click", (e) => {
  ctx.putImageData(uploaded_img, 0, 0); //To clear the whole drawing
  
})

//Color Selection
color_btn.forEach(btn => {
  btn.addEventListener("click", () => {
    const select = document.querySelector(".tools .option .selected")
      if (select){
        select.classList.remove("selected");
      }
    btn.classList.add("selected");
    selected_color = window.getComputedStyle(btn).getPropertyValue("background-color");
  })
})

//Color Picker
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
    ctx.lineWidth = draw_weight;
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

  //Download Edited Image
  canvas.addEventListener("click", (e) => {
    e.preventDefault();
    downloadButton.classList.remove("hide");
    let imgSrc = canvas.toDataURL();
    const fileName = "edited_image";
    downloadButton.download = `${fileName}.png`;
    downloadButton.setAttribute("href", imgSrc);
  })

  window.onload = () => {
    download.classList.add("hide");
  }