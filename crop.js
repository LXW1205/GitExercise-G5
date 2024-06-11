  //Global variables
  let file_input = document.getElementById("input-file");
  let drop_area = document.querySelector(".drop_area");
  let image = document.getElementById("img");
  let downloadButton = document.getElementById("download");
  let aspectRatio = document.querySelectorAll(".aspect-ratio li");
  let zoom = document.querySelectorAll(".zoom li");
  let zoom_option = document.querySelector(".zoom");
  let rotate = document.querySelectorAll(".rotate li");
  let rotate_option = document.querySelector(".rotate");
  let option = document.querySelector(".aspect-ratio");
  let rename = document.querySelector(".rename");
  const previewButton = document.getElementById("preview");
  const previewImage = document.getElementById("preview-image");
  let cropper = "";

  let filename = document.getElementById('filename'); 
  let Filerename = filename;

  const imageData = localStorage.getItem("imageData");
  if (imageData) {
    console.log("Image data found in localStorage");
    const images = new Image();
    images.src = imageData;
    images.onload = () => {
      image.src = images.src;
      if (cropper) {
        cropper.destroy();
      }
                  
      cropper = new Cropper(image);
      zoom_option.classList.remove("hide");
      rotate_option.classList.remove("hide");
      option.classList.remove("hide");
      rename.classList.remove("hide");
      previewButton.classList.remove("hide");  
    }
  }

  //Import or Upload Image
  file_input.addEventListener('change', importImage);
  function importImage() {
      previewImage.src = "";
      downloadButton.classList.add("hide");
      
      const reader = new FileReader();
      reader.readAsDataURL(file_input.files[0]);
      reader.onload = () => {    
        image.setAttribute("src", reader.result);
        image.onload = () => {
        if (image.naturalWidth <= 80 || image.naturalHeight <= 30){
          alert("Please upload an image larger than 80px X 30px (width X height).");
          image.src = "";
          return;
        }

        if (cropper) {
          cropper.destroy();
        }
                    
        cropper = new Cropper(image);
        zoom_option.classList.remove("hide");
        rotate_option.classList.remove("hide");
        option.classList.remove("hide");
        rename.classList.remove("hide");
        previewButton.classList.remove("hide");  
      }
    };
    fileName = file_input.files[0].name.split(".")[0];
  }
  
  //Drag and Drop to Import Image
  drop_area.addEventListener("dragover", function(e){
    e.preventDefault();
    drop_area.innerText = "Release your image to upload";
  });
  
  drop_area.addEventListener("drop", function(e){
    e.preventDefault();
    file_input.files = e.dataTransfer.files;
    drop_area.innerText = "Drag & Drop your image here";
    importImage();
  })

  drop_area.addEventListener("dragleave", function(e){
    e.preventDefault();
    drop_area.innerText = "Drag & Drop your image here";
  });

  //Zoom In or Zoom Out Image
  zoom[0].onclick = () => cropper.zoom(0.1);
  zoom[1].onclick = () => cropper.zoom(-0.1);

  //Rotate Image
  rotate[0].onclick = () => cropper.rotate(45);
  rotate[1].onclick = () => cropper.rotate(-45);

  //Aspect Ratio
  aspectRatio.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.innerText == "Custom") {
        cropper.setAspectRatio(NaN);
      } else {
        cropper.setAspectRatio(eval(element.innerText.replace(":", "/")));
      }
    });
  });

  //Download Cropped Image
  previewButton.addEventListener("click", (e) => {
    e.preventDefault();
    filename.classList.remove("hide");
    downloadButton.classList.remove("hide");
    let imgSrc = cropper.getCroppedCanvas({}).toDataURL();
    previewImage.src = imgSrc;

    const Namefile = Filerename.value.trim() || 'cropped_image';

    downloadButton.download = `${Namefile}.png`;
    downloadButton.setAttribute("href", imgSrc);
  });

  window.onload = () => {
    localStorage.removeItem("imageData");
    download.classList.add("hide");
  }