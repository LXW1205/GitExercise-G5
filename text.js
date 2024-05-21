const image_sel = document.getElementById("input-file");
const tools_element = document.querySelector(".tools");
const color_btn = document.querySelectorAll(".tools .option");
const color_picker = document.querySelector("#color-picker");
const text = document.getElementById("text");
const text_btn = document.getElementById("text-btn");
const downloadButton = document.getElementById("download");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

//Global variables
let uploaded_img = null;
let images = new Image();
let selected_color = "#000";
let dragging = false;
let drag_x = 0;
let drag_y = 0;
let text_x = 0;
let text_y = 0;
let insert_text = null;


image_sel.addEventListener('change', () => {
    const reader = new FileReader()
    reader.onload = (e) => {      
      images.onload = () => {
        canvas.width = images.width//Resizing
        canvas.height = images.height
        ctx.drawImage(images, 0, 0, canvas.width, canvas.height)     
        uploaded_img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        text_x = canvas.width / 2;
        text_y = canvas.height / 2;      
      }      
      images.src = e.target.result;
      tools_element.classList.remove("hide");
    }
    reader.readAsDataURL(image_sel.files[0])
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

text_btn.addEventListener("click", () => {
  insert_text = text.value;
  inputText();
})

  function inputText() {
    ctx.drawImage(images, 0, 0, canvas.width, canvas.height);
    ctx.borderStyle = "1px dashed black";
    ctx.font = "24px Arial";
    ctx.textBaseline = "middle";
    ctx.fillStyle = selected_color;
    ctx.fillText(insert_text, text_x, text_y);
  }

function mousePosition(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}

function isInsideText(position) {
  const text_width = ctx.measureText(insert_text).width;
  const text_height = 24;
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
})

//Download Edited Image
if (text_btn.addEventListener("click", (e) => {
  e.preventDefault();
  downloadButton.classList.remove("hide"); 
  let imgSrc = canvas.toDataURL();
  const fileName = "edited_image";
  downloadButton.download = `${fileName}.png`;
  downloadButton.setAttribute("href", imgSrc);
})
|| 
canvas.addEventListener)("click", (e) => {
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