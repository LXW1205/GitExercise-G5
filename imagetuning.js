function displayImage(event) {
  const file = event.target.files[0];
  if (file) {
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
    reader.readAsDataURL(file);
  }
}

function updateImageFilter() {
  // Get the image element
  const img = document.querySelector('.poster img');

  // Get the current values of brightness and contrast
  const brightness = document.getElementById('brightness').value;
  const contrast = document.getElementById('contrast').value;

  // Update the filter style of the image
  img.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
}

// Add event listeners to the input elements
document.getElementById('brightness').addEventListener('input', updateImageFilter);
document.getElementById('contrast').addEventListener('input', updateImageFilter);