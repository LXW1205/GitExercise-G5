function handleFileSelect(e) {
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

  const fileInput = document.getElementById('fileInput');
const convertButton = document.getElementById('convertButton');
const pdfContainer = document.getElementById('pdfContainer');

convertButton.addEventListener('click', () => {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const doc = new jsPDF();
      doc.addImage(img, 'JPEG', 15, 40, 180, 160);
      doc.save('output.pdf');
      pdfContainer.innerHTML = '<a href="output.pdf" download>Download PDF</a>';
    };
  };
  reader.readAsDataURL(file);
});