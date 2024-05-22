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

    //only image file can be chosen
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


//display img in the border
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
    var fileInput = document.getElementById('imageUpload');
    var file = fileInput.files[0];

    if (file) {
        var allowedExtensions = /(\.jpg|\.jpeg)$/i;
        var pngExtension = /(\.png)$/i;

        downloadLink.style.display = 'none';

        if (pngExtension.exec(file.name)) {
            alert('The image you chosen is already in PNG format.');
            fileInput.value = '';
            return false;
        }

        var reader = new FileReader();
        
        reader.onload = function(event) {
            var img = new Image();
            img.onload = function() {
                
                var canvas = document.getElementById('canvas');
                var ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                // convert img to png
                var pngDataUrl = canvas.toDataURL('image/png');
                
                var downloadLink = document.getElementById('downloadLink');
                downloadLink.href = pngDataUrl;
                downloadLink.download = 'converted-image.png';
                downloadLink.style.display = 'block';
                downloadLink.textContent = 'Download PNG';
            }
            img.src = event.target.result;
        }
        
        reader.readAsDataURL(file)
    }
}
    


  

  

    