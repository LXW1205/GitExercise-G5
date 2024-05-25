async function timer() {
  hide.classList.remove("hide");
}

async function timer() {
  hide.classList.remove("hide");
}

async function removehide() {
  setTimeout(timer,1000);
}
  setTimeout(timer,1000);
}

async function flattenPDF() {

    let filename = document.getElementById('filename'); 
    let Filerename = filename;

    const Namefile = Filerename.value.trim() || 'flattened_pdf';
  
    const fileInput = document.getElementById('fileInput');
  
    const file = fileInput.files[0];
  
    const pdfData = await file.arrayBuffer();
  
    const pdfDoc = await PDFLib.PDFDocument.load(pdfData);
  
    const flattenedPdf = await PDFLib.PDFDocument.create();

    const form = pdfDoc.getForm();

    form.flatten();

  const pages = pdfDoc.getPages();
  
  for (let i = 0; i < pages.length; i++) {
    const [copiedPage] = await flattenedPdf.copyPages(pdfDoc, [i]);
    flattenedPdf.addPage(copiedPage);
  }
  
    const flattenedPdfData = await flattenedPdf.save();
    
    const blob = new Blob([flattenedPdfData], { type: 'application/pdf' });
    const downloadLink = document.getElementById('downloadLink');
  
    downloadLink.style.display = 'block';
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${Namefile}.pdf`;
  
  };