  var coll = document.getElementsByClassName("collapsible");
  var i;
  
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      } 
    });
  }

  const image_sel = document.getElementById('input-file');
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');    
  let img = null
      
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

  let drawing;
  canvas.onmousedown = (e) => {
    //console.log('mousedown', e.clientX, e.clientY);
    drawing = true;
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "red";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.moveTo(e.offsetX, e.offsetY);
  };

  canvas.onmousemove = (e) => {
    //console.log('mousemove', e.clientX, e.clientY);
    if (drawing) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  };

  canvas.onmouseup = function () {
    //console.log('mousemove', e.clientX, e.clientY);
    drawing = false;
    ctx.closePath();
  };
    
        
        
    
        

  let file_input = document.getElementById("file");
  let image = document.getElementById("img");
  let downloadButton = document.getElementById("download");
  let aspectRatio = document.querySelectorAll(".aspect-ratio li");
  let option = document.querySelector(".aspect-ratio");
  const previewButton = document.getElementById("preview");
  const previewImage = document.getElementById("preview-image");
  let cropper = "";
  let fileName = "";

  file_input.onchange = () => {
    previewImage.src = "";
    downloadButton.classList.add("hide");

    let reader = new FileReader();
    reader.readAsDataURL(file_input.files[0]);
    reader.onload = () => {
      image.setAttribute("src", reader.result);
      if (cropper) {
        cropper.destroy();
      }

      cropper = new Cropper(image);
      option.classList.remove("hide");
      previewButton.classList.remove("hide");
    };
    fileName = file_input.files[0].name.split(".")[0];
  };

  aspectRatio.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.innerText == "Custom") {
        cropper.setAspectRatio(NaN);
      } else {
        cropper.setAspectRatio(eval(element.innerText.replace(":", "/")));
      }
    });
  });

  previewButton.addEventListener("click", (e) => {
    e.preventDefault();
    downloadButton.classList.remove("hide");
    let imgSrc = cropper.getCroppedCanvas({}).toDataURL();

    previewImage.src = imgSrc;
    downloadButton.download = `cropped_$(fileName).png`;
    downloadButton.setAttribute("href", imgSrc);
  });

  window.onload = () => {
    download.classList.add("hide");
    option.classList.add("hide");
    previewButton.classList.add("hide");
  }