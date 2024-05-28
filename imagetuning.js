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

