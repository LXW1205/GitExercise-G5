async function timer() {
    hide.classList.remove("hide");
  }
  
  async function removehide() {
    setTimeout(timer,1000);
  }
  
  async function removePDF() {
    let pages = document.getElementById('pages'); 
    let pagesInput = pages.value; 
  
    let filename = document.getElementById('filename'); 
    let Filerename = filename;
    const Namefile = Filerename.value.trim() || 'Changed_pdf';
  
    const fileInput = document.getElementById('fileInput');
  
    const file = fileInput.files[0];
  
    if (!file) {
      alert("Please select PDF file.");
      return;
    }
  
    if (!pagesInput) {
      alert("Please enter the pages you want to extract.");
      return;
    }
  
    const pdfData = await file.arrayBuffer();
  
    const pdfDoc = await PDFLib.PDFDocument.load(pdfData);
  
    const removedPdf = await PDFLib.PDFDocument.create();
  
    const selectedPages = document.getElementById('pages').value.split(',').map(Number);

    const pagesToKeep = [];

    for (let i = 0; i < totalPages; i++) {
        if (!selectedPages.includes(i + 1)) {
            pagesToKeep.push(i);
        }
    }
  
    if (selectedPages.length === 0) {
      alert("No valid pages selected.");
      return;
    }


    const removedPdfData = await removedPdf.save();
    const blob = new Blob([removedPdfData], { type: 'application/pdf' });
    const downloadLink = document.getElementById('downloadLink');
  
    downloadLink.style.display = 'block';
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${Namefile}.pdf`;
  
  };