  //Global variables
  let image_sel = document.getElementById("input-file");
  let drop_area = document.querySelector("#drop_area");
  let undo_btn = document.querySelector(".undo");
  let redo_btn = document.querySelector(".redo");
  let line_weight = document.querySelector("#size");
  let tools_element = document.querySelector(".tools");
  let shape_btn = document.querySelectorAll(".shape");
  let color_btn = document.querySelectorAll(".tools .option");
  let color_picker = document.querySelector("#color-picker");
  let downloadButton = document.getElementById("download");
  let clear = document.querySelector(".clean");
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  
  //Global variables set as default
  let draw_weight = 5;
  let selected_color = "#000";
  let uploaded_img = null;
  let drawing = false;
  let selected_shape = "free";
  let prevMouseX;
  let prevMouseY;
  let snapshot;
  let history = [];
  let historywork = 0;
  
  //Import or Upload Image
  image_sel.addEventListener('change', importImage);
  function importImage() {
    const reader = new FileReader()
    reader.onload = (e) => {
      const images = new Image()
      images.onload = () => {
        canvas.width = images.width//Resizing
        canvas.height = images.height
        ctx.drawImage(images, 0, 0, canvas.width, canvas.height)     
        uploaded_img = ctx.getImageData(0, 0, canvas.width, canvas.height)
        saveHistory();
      }      
      images.src = e.target.result;
      tools_element.classList.remove("hide");
    }
    reader.readAsDataURL(image_sel.files[0])
  }

  drop_area.addEventListener("dragover", function(e){
    e.preventDefault();
  });
  drop_area.addEventListener("drop", function(e){
    e.preventDefault();
    image_sel.files = e.dataTransfer.files;
    importImage();
  })

//Undo and Redo Function
let state = {
  position: history[0]
}

//Save Event History
const saveHistory = () => {
  history = history.slice(0, historywork + 1);
  history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  historywork++;
}

//Undo
undo_btn.addEventListener("click", () => {
  if (historywork === 0) {
    return;
  } else {
    historywork -= 1;
    ctx.putImageData(history[historywork], 0, 0);
  }
  })

//Redo
redo_btn.addEventListener("click", () => {
  if (historywork === history.length - 1) {
    return;
  } else {
    historywork += 1;
    ctx.putImageData(history[historywork], 0, 0);
  }
  })  

//Tools Weight/Width
line_weight.addEventListener("change", () => {
  draw_weight = line_weight.value;
})

//Clear Drawing
clear.addEventListener("click", () => {
  ctx.putImageData(uploaded_img, 0, 0); //To clear the whole drawing
  download.classList.add("hide");
  saveHistory();
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

//Draw Line Shape
const drawLine = (e) => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

//Draw Rectangle Shape
const drawRectangle = (e) => {
  ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

//Draw Circle Shape
const drawCircle = (e) => {
  ctx.beginPath();
  let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

shape_btn.forEach(btn => {
  btn.addEventListener("click", (e) => {
    selected_shape = btn.id;
  })
})

  //Draw  
  canvas.onmousedown = (e) => {
    //console.log('mousedown', e.clientX, e.clientY);
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
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
    if (!drawing) return;
    ctx.putImageData(snapshot, 0, 0);
    if (selected_shape === "free") {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    } else if (selected_shape === "line") {
      drawLine(e);
    } else if (selected_shape === "rectangle"){
      drawRectangle(e)
    } else {
      drawCircle(e);
    }
  }

  canvas.onmouseup = function () {
    //console.log('mousemove', e.clientX, e.clientY);
    drawing = false;
    ctx.closePath();
    saveHistory();
  }

  //Download Edited Image
  canvas.addEventListener("click", (e) => {
    e.preventDefault();
    downloadButton.classList.remove("hide");
    let imgSrc = canvas.toDataURL();

    let filename = document.getElementById('filename'); 
    let Filerename = filename;
    const Namefile = Filerename.value.trim() || 'drawed_image';

    downloadButton.download = `${Namefile}.png`;
    downloadButton.setAttribute("href", imgSrc);
  })

  window.onload = () => {
    download.classList.add("hide");
  }