  //Global variables
  let image_sel = document.getElementById("input-file");
  let drop_area = document.querySelector(".drop_area");
  let undo_btn = document.querySelector(".undo");
  let redo_btn = document.querySelector(".redo");
  let line_weight = document.querySelector("#size");
  let tools_element = document.querySelector(".tools");
  let shape_btn = document.querySelectorAll(".shape");
  let color_btn = document.querySelectorAll(".tools .option");
  let color_picker = document.querySelector("#color-picker");
  let rename = document.querySelector(".rename");
  let downloadButton = document.getElementById("download");
  let clear = document.querySelector(".clean");
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  let filename = document.getElementById('filename'); 
  let Filerename = filename;
  
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
  
  const imageData = localStorage.getItem("imageData");
  if (imageData) {
    //console.log("Image data found in localStorage");
    const images = new Image();
    images.src = imageData;
    images.onload = () => {
      //console.log("Image loaded successfully");
      canvas.width = images.width;
      canvas.height = images.height;
      ctx.drawImage(images, 0, 0, canvas.width, canvas.height);
      uploaded_img = ctx.getImageData(0, 0, canvas.width, canvas.height);
      tools_element.classList.remove("hide");
      rename.classList.remove("hide");
      saveHistory();
      localStorage.removeItem("imageData");
      //console.log("Image data removed from localStorage");
    }
  }

  //Import or Upload Image
  image_sel.addEventListener('change', importImage);
  function importImage() {
    const reader = new FileReader()
    reader.onload = (e) => {
      const images = new Image()
      images.onload = () => {
        canvas.width = images.width//Resizing
        canvas.height = images.height
        if (images.naturalWidth <= 80 || images.naturalHeight <= 30){
          alert("Please import an image larger than 80px X 30px (width X height).")
        } else if (images.naturalWidth >= 1050 || images.naturalHeight >= 950){
          alert("Please import an image smaller than 1050px X 950px (width X height).")
        } else {      
          ctx.drawImage(images, 0, 0, canvas.width, canvas.height)     
          uploaded_img = ctx.getImageData(0, 0, canvas.width, canvas.height)
          tools_element.classList.remove("hide");
          rename.classList.remove("hide");
          saveHistory();
        }
      }      
      images.src = e.target.result;
      fileName = image_sel.files[0].name.split(".")[0];
    }
    reader.readAsDataURL(image_sel.files[0])
  }

  //Drag and Drop to Import Image
  drop_area.addEventListener("dragover", function(e){
    e.preventDefault();
    drop_area.style = "border: 2px dashed #19DC02";
    drop_area.innerText = "Release your image to upload";
  });
  
  drop_area.addEventListener("drop", function(e){
    e.preventDefault();
    image_sel.files = e.dataTransfer.files;
    drop_area.style = "border: 2px dashed #f7673b";
    drop_area.innerText = "Drag & Drop your image here";
    importImage();
  })

  drop_area.addEventListener("dragleave", function(e){
    e.preventDefault();
    drop_area.style = "border: 2px dashed #f7673b";
    drop_area.innerText = "Drag & Drop your image here";
  });

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
  downloadButton.classList.remove('button-87');
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
  btn.addEventListener("click", () => {
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
    downloadButton.classList.add('button-87');
    let imgSrc = canvas.toDataURL();

    const Namefile = Filerename.value.trim() || 'drawed_image';

    downloadButton.download = `${Namefile}.png`;
    downloadButton.setAttribute("href", imgSrc);
  })

  window.onload = () => {
    localStorage.removeItem("imageData");
    downloadButton.classList.add("hide");
  }