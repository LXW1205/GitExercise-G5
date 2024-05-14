async function mergePDFs() {
    const fileInput1 = document.getElementById('file1');
    const fileInput2 = document.getElementById('file2');
  
    const file1 = fileInput1.files[0];
    const file2 = fileInput2.files[0];
  
    if (!file1 || !file2) {
      alert("Please select two PDF files.");
      return;
    }
  
    const pdfData1 = await file1.arrayBuffer();
  const pdfData2 = await file2.arrayBuffer();

  const pdfDoc1 = await PDFLib.PDFDocument.load(pdfData1);
  const pdfDoc2 = await PDFLib.PDFDocument.load(pdfData2);

  const mergedPdf = await PDFLib.PDFDocument.create();

  // first pdf
  for (let i = 0; i < pdfDoc1.getPageCount(); i++) {
    const [page] = await mergedPdf.copyPages(pdfDoc1, [i]);
    mergedPdf.addPage(page);
  }

  //second pdf
  for (let i = 0; i < pdfDoc2.getPageCount(); i++) {
    const [page] = await mergedPdf.copyPages(pdfDoc2, [i]);
    mergedPdf.addPage(page);
  }

  const mergedPdfData = await mergedPdf.save();
  const blob = new Blob([mergedPdfData], { type: 'application/pdf' });
  const downloadLink = document.getElementById('downloadLink');

  downloadLink.style.display = 'block';
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = 'merged_pdf.pdf';
}