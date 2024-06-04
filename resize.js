//Globbal Variables
let image_sel = document.getElementById("input-file");
let drop_area = document.querySelector("#drop_area");
let tools_element = document.querySelector(".tools");
let input_width = document.querySelector("#width_input");
let input_height = document.querySelector("#height_input");
let downloadButton = document.getElementById("download");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

//Global variables set as default
let uploaded_img = null;
let initial_ratio;

//Import or Upload Image
image_sel.addEventListener('change', importImage);
function importImage() {
    const reader = new FileReader()
    reader.onload = (e) => {
      const images = new Image()
      images.onload = () => {
        uploaded_img = images
        canvas.width = images.width //Resizing
        canvas.height = images.height
        input_width.value = images.naturalWidth 
        input_height.value = images.naturalHeight
        initial_ratio = images.naturalWidth / images.naturalHeight
        document.querySelector(".poster").classList.add("active")
        ctx.drawImage(images, 0, 0, canvas.width, canvas.height)
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

  input_width.addEventListener("keyup", () => {
    const new_height = input_width.value / initial_ratio;
    input_height.value = Math.floor(new_height);    
    canvas.width = input_width.value;
    canvas.height = input_height.value;
    if (uploaded_img) {
      ctx.drawImage(uploaded_img, 0, 0, canvas.width, canvas.height);
    }
    downloadAppear();
  })

  input_height.addEventListener("keyup", () => {
    const new_width = input_height.value * initial_ratio;
    input_width.value = Math.floor(new_width);
    canvas.width = input_width.value;
    canvas.height = input_height.value;
    if (uploaded_img) {
      ctx.drawImage(uploaded_img, 0, 0, canvas.width, canvas.height);
    }
    downloadAppear();
  })

  //Show Download Button
  const downloadAppear = () => {
    downloadButton.classList.remove("hide");
  }
  
  //Download Edited Image
  downloadButton.addEventListener("click", (e) => {
    e.preventDefault();
    let imgSrc = canvas.toDataURL();    
    const fileName = "resized_image";
    const a = document.createElement("a");
    a.href = imgSrc;
    a.download = `${fileName}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    })

  window.onload = () => {
    downloadButton.classList.add("hide");
  };