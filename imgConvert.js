const fileInput = document.getElementById('container');
const selectedBanner = document.getElementById('output');

fileInput.addEventListener('change', () => {
  const files = fileInput.files;
  const filesArr = Array.prototype.slice.call(files);
  filesArr.forEach(function (f) {
    if (!f.type.match("image.*")) {
      return;
    }
    storedFiles.push(f);

    var reader = new FileReader();
    reader.onload = function (e) {
      var html =
        '<img src="' +
        e.target.result +
        "\" data-file='" +
        f.name +
        "alt='Category Image' >";
      selectedBanner.innerHTML = html;
    };
    reader.readAsDataURL(f);
  });
});


function displayImage(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const output = document.getElementById('output');
          output.src = e.target.result;
      };
      reader.readAsDataURL(file);
  }
}

function convertToPng() {
    var canvas = document.createElement('canvas');
    var img = document.getElementById('output');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.href = dataURL;
    link.download = 'converted.png';
    link.click();
  }

  function convertToPng() {
    // Check if user selected a file
    if (fileInput) {
      var filePath = fileInput.name;
      var allowedExtensions = /(\.jpg|\.jpeg)$/i;
  
      // Check if file is a PNG
      if (!allowedExtensions.exec(filePath)) {
        alert('Please upload a JPG or JPEG file.');
        return false;
      }
    }
}

  

  

    