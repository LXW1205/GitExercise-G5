let image_sel = document.getElementById("input-file");
image_sel.addEventListener('change', displayImage);
let originalFileName;

function displayImage() {
    let file = event.target.files[0];
    originalFileName = file.name;
    const reader = new FileReader();
    reader.onload = function(e) {
      const poster = document.querySelector('.poster img');
      poster.src = e.target.result;
      poster.style.filter = '';

      //brightness and contrast range
      const brightnessInput = document.getElementById('brightness');
      const contrastInput = document.getElementById('contrast');
      const displayhide = document.querySelector('.hide');
      brightnessInput.value = 100;
      contrastInput.value = 100;
      
      displayhide.classList.remove('hide');
    };
    reader.readAsDataURL(image_sel.files[0]);
  }

//Drag and Drop to Import Image
let drop_area = document.querySelector(".drop_area");
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
  displayImage();
});

drop_area.addEventListener("dragleave", function(e){
  e.preventDefault();
  drop_area.style = "border: 2px dashed #f7673b";
  drop_area.innerText = "Drag & Drop your image here";
});

function updateImageFilter() {
  const img = document.querySelector('.poster img');
  const brightness = document.getElementById('brightness').value;
  const contrast = document.getElementById('contrast').value;
  img.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
}

function download() {
  const img = document.querySelector('#output');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.filter = img.style.filter;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const link = document.createElement('a');
  link.download = originalFileName;
  link.href = canvas.toDataURL();
  link.click();
}

//Event Listener
document.getElementById('brightness').addEventListener('input', updateImageFilter);
document.getElementById('contrast').addEventListener('input', updateImageFilter);
