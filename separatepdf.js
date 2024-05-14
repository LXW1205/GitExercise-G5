async function separatePDF() {
  let pages = document.getElementById('pages'); 
  let pagesInput = pages.value; 

  const fileInput = document.getElementById('fileInput');

  const file = fileInput.files[0];

  const pdfData = await file.arrayBuffer();

  const pdfDoc = await PDFLib.PDFDocument.load(pdfData);

  const separatedPdf = await PDFLib.PDFDocument.create();

  // var totalpages = pdfDoc.getPageCount()

  //Extract pages
  const [page] = await separatedPdf.copyPages(pdfDoc, [(pagesInput)-(1)]);
  separatedPdf.addPage(page);

  const separatedPdfData = await separatedPdf.save();
  const blob = new Blob([separatedPdfData], { type: 'application/pdf' });
  const downloadLink = document.getElementById('downloadLink');

  downloadLink.style.display = 'block';
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = 'Separated_pdf.pdf';

}