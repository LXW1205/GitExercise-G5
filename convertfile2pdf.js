function choosefile() {
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
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
        selDiv.html(html);
      };
      reader.readAsDataURL(f);
  
      // Hide the file input field, label, and submit button
      $("#pwd").hide();
      $("#pwd + label").hide();
      $(".btn-default").hide();
    });
  }

  var selDiv = "";
      var storedFiles = [];
      $(document).ready(function () {
        $("#input-file").on("change", handleFileSelect);
        selDiv = $(".poster");
      });

      '1'

 



const fileInput = document.getElementById('fileInput');
const selectedBanner = document.getElementById('selectedBanner');

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
      selectedBanner.style.display = 'none';
    };
    reader.readAsDataURL(f);
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