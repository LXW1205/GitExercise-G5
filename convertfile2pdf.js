let uploadedFileName = '';
  function displayImage(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const output = document.getElementById('output');
          output.src = e.target.result;
          uploadedFileName = file.name.split('.')[0];
      };
      reader.readAsDataURL(file);
  }
}

function convertToPDF() {
  const { jsPDF } = window.jspdf;
  const img = document.getElementById('output');
  const pdf = new jsPDF();
  if (img.src) {
      pdf.addImage(img.src, 'image/*', 15, 40, 180, 160);
      const pdfFileName = uploadedFileName ? `${uploadedFileName}.pdf` : 'download.pdf';
        pdf.save(pdfFileName);
  } else {
      alert("Please upload an image first.");
  }
}  