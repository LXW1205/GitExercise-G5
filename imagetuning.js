let image_sel = document.getElementById("input-file");
image_sel.addEventListener('change', displayImage);
function displayImage() {
    const reader = new FileReader();
    reader.onload = function(e) {
      const poster = document.querySelector('.poster img');
      poster.src = e.target.result;

      // Reset the brightness and contrast inputs
      const brightnessInput = document.getElementById('brightness');
      const contrastInput = document.getElementById('contrast');
      const displayhide = document.querySelector('.hide');
      brightnessInput.value = 100;
      contrastInput.value = 100;

      // Update the image filter
      updateImageFilter();
      displayhide.classList.remove('hide');
    };
    reader.readAsDataURL(image_sel.files[0]);
  }

//Drag and Drop to Import Image
let drop_area = document.querySelector(".drop_area");
drop_area.addEventListener("dragover", function(e){
  e.preventDefault();
});

drop_area.addEventListener("drop", function(e){
  e.preventDefault();
  image_sel.files = e.dataTransfer.files;
  displayImage();
});

function updateImageFilter() {
  // Get the image element
  const img = document.querySelector('.poster img');

  // Get the current values of brightness and contrast
  const brightness = document.getElementById('brightness').value;
  const contrast = document.getElementById('contrast').value;

  // Update the filter style of the image
  img.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
}

function download() {
  // Get the image element
  const img = document.querySelector('#output');

  // Create a canvas and a context
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set the canvas dimensions
  canvas.width = img.width;
  canvas.height = img.height;

  // Draw the image on the canvas with the filter
  ctx.filter = img.style.filter;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Create the download link
  const link = document.createElement('a');
  link.download = 'adjusted-image.png';
  link.href = canvas.toDataURL();
  link.click();
}

// Add event listeners to the input elements
document.getElementById('brightness').addEventListener('input', updateImageFilter);
document.getElementById('contrast').addEventListener('input', updateImageFilter);
