//Global variables
let image_sel = document.getElementById("input-file");
let drop_area = document.querySelector(".drop_area");
let tools_element = document.querySelector(".tools");
let undo_btn = document.querySelector(".undo");
let redo_btn = document.querySelector(".redo");
let size = document.querySelector("#size");
let style = document.querySelector(".checkbox");
let bold_style = document.querySelector("#bold");
let italic_style = document.querySelector("#italic");
let font = document.querySelector("#fonts");
let color_btn = document.querySelectorAll(".tools .option");
let color_picker = document.querySelector("#color-picker");
let clear = document.querySelector(".clean");
let text = document.getElementById("text");
let text_btn = document.getElementById("text-btn");
let text_btn2 = document.getElementById("text-btn2");
let downloadButton = document.getElementById("download");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

//Global variables set as default
let uploaded_img = null;
let images = new Image();
let text_style = "";
let style_status = [];
let text_size = "24px";
let text_font = "Arial";
let selected_color = "#000";
let dragging = false;
let drag_x = 0;
let drag_y = 0;
let text_x = 0;
let text_y = 0;
let insert_text = null;
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
      images.onload = () => {
        canvas.width = images.width//Resizing
        canvas.height = images.height
        if (images.naturalWidth <= 80 || images.naturalHeight <= 30) {
          alert("Please import an image larger than 80px X 30px (width X height). ")
        } else if (images.naturalWidth >= 1050 || images.naturalHeight >= 950) {
          alert("Please import an image smaller than 1050px X 950px (width X height). ")
        } else {
          ctx.drawImage(images, 0, 0, canvas.width, canvas.height)
          tools_element.classList.remove("hide");
          uploaded_img = ctx.getImageData(0, 0, canvas.width, canvas.height)
          saveHistory()
        }
      }      
      images.src = e.target.result;
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
    importImage();
    drop_area.style = "border: 2px dashed #f7673b";
    drop_area.innerText = "Drag & Drop your image here";
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
  history.push({image : ctx.getImageData(0, 0, canvas.width, canvas.height), text_x : text_x, text_y : text_y});
  historywork++;
}

//Undo
undo_btn.addEventListener("click", () => {
  if (historywork === 0) {
    return;
  } else {
    historywork -= 1;
    ctx.putImageData(history[historywork].image, 0, 0);
    text_x = history[historywork].text_x;
    text_y = history[historywork].text_y;
  }
  })

//Redo
redo_btn.addEventListener("click", () => {
  if (historywork === history.length - 1) {
    return;
  } else{
    historywork += 1;
    ctx.putImageData(history[historywork].image, 0, 0);
    text_x = history[historywork].text_x;
    text_y = history[historywork].text_y;
  }
  })  

//Text Size
size.addEventListener("change", () => {
  text_size = size.value + "px";
  inputText();
  saveHistory();
})

//Text Style
style.addEventListener("change", () => {
  const text_style1 = bold_style.checked ? "bold" : "";
  const text_style2 = italic_style.checked ? "italic" : "";
  text_style = `${text_style1} ${text_style2}`.trim();
  inputText();
  saveHistory();
})

//Text Font
font.addEventListener("change", () => {
  text_font = font.value;
  inputText();
  saveHistory();
})

//Color Selection
color_btn.forEach(btn => {
  btn.addEventListener("click", () => {
    const select = document.querySelector(".tools .option .selected")
      if (select) {
        select.classList.remove("selected");
      }
    btn.classList.add("selected");
    selected_color = window.getComputedStyle(btn).getPropertyValue("background-color");
    inputText();
    saveHistory();
  })
})

//Color Picker
color_picker.addEventListener("change", () => {
  color_picker.parentElement.style.background = color_picker.value;
  color_picker.parentElement.click();
  inputText();
  saveHistory();
})

//Clear Text
clear.addEventListener("click", () => {
  ctx.putImageData(uploaded_img, 0, 0); //To clear the whole text
  download.classList.add("hide");
  downloadButton.classList.remove('button-87');
  saveHistory();
})

text_btn.addEventListener("click", () => {
  insert_text = text.value;
  text_x = Math.floor((canvas.width - ctx.measureText(insert_text).width) / 2); 
  text_y = Math.floor((canvas.height + parseInt(text_size, 10)) / 2); 
  downloadButton.classList.remove("hide");
  downloadButton.classList.add('button-87'); 
  inputText();
  saveHistory();
})

  function inputText() {
    ctx.putImageData(uploaded_img, 0, 0);
    ctx.font = `${text_style} ${text_size} ${text_font}`;
    ctx.textBaseline = "middle";
    ctx.fillStyle = selected_color;

    const lines = insert_text.split('\n');
    const lineHeight = parseInt(text_size, 10);
    for (let i = 0; i <= lines.length - 1; i++) {            	
      ctx.fillText(lines[i], text_x, text_y + i * lineHeight);       
    }   
  }

function mousePosition(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}

function isInsideText(position) {
  const lines = insert_text.split('\n');
  const text_width = ctx.measureText(lines).width;
  const text_height = lines.length * (i * (parseInt(text_size, 10)));
  return position.x >= text_x &&
         position.x <= text_x + text_width &&
         position.y >= text_y - text_height / 2 &&
         position.y <= text_y + text_height / 2;
}

//Dragging Text
canvas.addEventListener("mousedown", (e) => {
  const position = mousePosition(canvas, e);
  if (isInsideText(position)) {
    dragging = true;
    drag_x = position.x - text_x;
    drag_y = position.y - text_y;    
  } 
})

canvas.addEventListener("mousemove", (e) => {
  if (dragging) {
    const position = mousePosition(canvas, e);
    text_x = position.x - drag_x;
    text_y = position.y - drag_y;
    inputText();
  }
})

canvas.addEventListener("mouseup", () => {
  dragging = false;
  saveHistory();
})

//Download Edited Image
downloadButton.addEventListener("click", () => {
  const imgSrc = canvas.toDataURL();
  const fileName = "edited_image";
  downloadButton.download = `${fileName}.png`;
  downloadButton.setAttribute("href", imgSrc);
})

window.onload = () => {
  localStorage.removeItem("imageData");
  downloadButton.classList.add("hide");
}