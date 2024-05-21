async function separatePDF() {
  let pages = document.getElementById('pages'); 
  let pagesInput = pages.value; 

  const fileInput = document.getElementById('fileInput');

  const file = fileInput.files[0];

  const pdfData = await file.arrayBuffer();

  const pdfDoc = await PDFLib.PDFDocument.load(pdfData);

  const separatedPdf = await PDFLib.PDFDocument.create();

  const selectedPages = pagesInput.split(',')
    .map(page => parseInt(page.trim(), 10))
    .filter(page => !isNaN(page) && page >= 1 && page <= pdfDoc.getPageCount());

  if (selectedPages.length === 0) {
    alert("No valid pages selected.");
    return;
  }

  for (const pageNum of selectedPages) {
    const [copiedPage] = await separatedPdf.copyPages(pdfDoc, [pageNum - 1]);
    separatedPdf.addPage(copiedPage);
  }

  const separatedPdfData = await separatedPdf.save();
  const blob = new Blob([separatedPdfData], { type: 'application/pdf' });
  const downloadLink = document.getElementById('downloadLink');

  downloadLink.style.display = 'block';
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = 'Separated_pdf.pdf';

}