const fileInput = document.getElementById('input-file');

fileInput.addEventListener('change', importpdf);
  async function importpdf() {
    hide.classList.remove("hide");  

    const file = fileInput.files[0];
    const pdfData = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(pdfData);

    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    document.getElementById('pdf1').src = pdfDataUri;

  }

async function separatePDF() {
    pdf1.classList.add("hide");
    pdf2.classList.remove("hide");
    pdf3.classList.remove("hide");

    let pages = document.getElementById('pages'); 
    let pagesInput = pages.value.trim(); 
  
    let filename1 = document.getElementById('filename1'); 
    const Namefile1 = filename1.value.trim() || 'separated_pdf_1';

    let filename2 = document.getElementById('filename2'); 
    const Namefile2 = filename2.value.trim() || 'separated_pdf_2';
  
    const fileInput = document.getElementById('input-file');

    const file = fileInput.files[0];
    
    if (!file) {
        alert("Please select a PDF file.");
        return;
    }
  
    if (!pagesInput) {
        alert("Please enter the pages you want to separate.");
        return;
    }

    const pdfData = await file.arrayBuffer();

    const pdfDoc = await PDFLib.PDFDocument.load(pdfData);
    
    const totalPages = pdfDoc.getPageCount();

    const separatedPdf1 = await PDFLib.PDFDocument.create();
    const separatedPdf2 = await PDFLib.PDFDocument.create();    

    const firstPage = pagesInput[0] - 2;

    const secondPage = pagesInput[0] - 1 ;

    for (let i = 0; i <= firstPage; i++) {
        const [page] = await separatedPdf1.copyPages(pdfDoc, [i]);
        separatedPdf1.addPage(page);
    }

    for (let i = secondPage; i < totalPages; i++) {
        const [page] = await separatedPdf2.copyPages(pdfDoc, [i]);
        separatedPdf2.addPage(page);
    }

    const separatedPdfData1 = await separatedPdf1.save();
    const blob1 = new Blob([separatedPdfData1], { type: 'application/pdf' });
    const downloadLink1 = document.getElementById('downloadLink1');

    const pdfDataUri1 = await separatedPdf1.saveAsBase64({ dataUri: true });
    document.getElementById('pdf2').src = pdfDataUri1;

    const separatedPdfData2 = await separatedPdf2.save();
    const blob2 = new Blob([separatedPdfData2], { type: 'application/pdf' });
    const downloadLink2 = document.getElementById('downloadLink2');

    const pdfDataUri2 = await separatedPdf2.saveAsBase64({ dataUri: true });
    document.getElementById('pdf3').src = pdfDataUri2;

    downloadLink1.style.display = 'block';
    downloadLink1.href = URL.createObjectURL(blob1);
    downloadLink1.download = `${Namefile1}.pdf`;

    downloadLink2.style.display = 'block';
    downloadLink2.href = URL.createObjectURL(blob2);
    downloadLink2.download = `${Namefile2}.pdf`;
}