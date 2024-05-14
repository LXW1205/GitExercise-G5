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

function convertToPDF() {
  const { jsPDF } = window.jspdf;
  const img = document.getElementById('output');
  const pdf = new jsPDF();
  if (img.src) {
      pdf.addImage(img.src, 'JPEG', 15, 40, 180, 160);
      pdf.save('download.pdf');
  } else {
      alert("Please upload an image first.");
  }
}


      
     
    
















