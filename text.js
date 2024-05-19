const image_sel = document.getElementById("input-file");
const tools_element = document.querySelector(".tools");
const color_btn = document.querySelectorAll(".tools .option");
const color_picker = document.querySelector("#color-picker");
const text = document.getElementById("text");
const text_btn = document.getElementById("text-btn");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

//Global variables
let uploaded_img = null;
let images = new Image();
let selected_color = "#000";
let dragging = false;

image_sel.addEventListener('change', () => {
    const reader = new FileReader()
    reader.onload = (e) => {      
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
  text.addEventListener('input', () => {
    insert_text = text.value;
    ctx.drawImage(images, 0, 0, canvas.width, canvas.height);
    ctx.borderStyle = "1px dashed black";
    ctx.font = "24px Arial";
    ctx.textBaseline = "middle";
    ctx.fillStyle = selected_color;
    ctx.fillText(insert_text, canvas.width / 2, canvas.height / 2);
  })
})