//Globbal Variables
let image_sel = document.getElementById("input-file");
let tools_element = document.querySelector(".tools");
let input_width = document.querySelector("#width_input");
let input_height = document.querySelector("#height_input");
let downloadButton = document.getElementById("download");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let uploaded_img = null;
let new_width, new_height;

//Import or Upload Image
image_sel.addEventListener('change', () => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const images = new Image()
      images.onload = () => {
        uploaded_img = images
        canvas.width = images.width //Resizing
        canvas.height = images.height
        input_width.value = images.naturalWidth 
        input_height.value = images.naturalHeight
        document.querySelector(".poster").classList.add("active")
        ctx.drawImage(images, 0, 0, canvas.width, canvas.height)
      }      
      images.src = e.target.result;
      tools_element.classList.remove("hide");
    }
    reader.readAsDataURL(image_sel.files[0])
  })

  input_width.addEventListener("input", () => {
    new_width = Math.floor(input_width.value);
    canvas.width = new_width;
    if (uploaded_img) {
      ctx.drawImage(uploaded_img, 0, 0, canvas.width, canvas.height);
    }
    downloadAppear();
  })

  input_height.addEventListener("input", () => {
    new_height = Math.floor(input_height.value);
    canvas.height = new_height;
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
  canvas.addEventListener("click", (e) => {
    e.preventDefault();
    let imgSrc = canvas.toDataURL();    
    const fileName = "resized_image";
    downloadButton.download = `${fileName}.png`;
    downloadButton.setAttribute("href", imgSrc);
  })

  window.onload = () => {
    downloadButton.classList.add("hide");
  };