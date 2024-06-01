async function timer() {
    hide.classList.remove("hide");
  }
  
async function removehide() {
    setTimeout(timer,1000);
  }
  
async function separatePDF() {
    let pages = document.getElementById('pages'); 
    let pagesInput = pages.value.trim(); 
  
    let filename1 = document.getElementById('filename1'); 
    const Namefile1 = filename1.value.trim() || 'separated_pdf_1';

    let filename2 = document.getElementById('filename2'); 
    const Namefile2 = filename2.value.trim() || 'separated_pdf_2';
  
    const fileInput = document.getElementById('fileInput');

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

    const separatedPdf1 = await PDFLib.PDFDocument.create();
    const separatedPdf2 = await PDFLib.PDFDocument.create();    

    const totalPages = pdfDoc.getPageCount();

    const selectedPages = pagesInput.split(',')
    .map(page => parseInt(page.trim(), 10))
    .filter(page => !isNaN(page) && page >= 1 && page <= pdfDoc.getPageCount());
    
    const pageRanges = pagesInput.split(',')
    .map(range => range.split('-').map(page => parseInt(page.trim(), 10)))
    .filter(range => range.every(page => !isNaN(page) && page >= 1 && page <= totalPages));

    if (pageRanges.length < 2) {
        alert("Please enter valid page ranges for both documents.");
        return;
    }

    const firstPage = selectedPages[0] - 1;
    const secondPage = selectedPages[1] - 1;

    for (let i = 0; i <= firstPage; i++) {
        console.log(`Copying page ${i + 1} to the first PDF`);
        const [page] = await separatedPdf1.copyPages(pdfDoc, [i]);
        separatedPdf1.addPage(page);
    }

    for (let i = secondPage; i < totalPages; i++) {
        console.log(`Copying page ${i + 1} to the second PDF`);
        const [page] = await separatedPdf2.copyPages(pdfDoc, [i]);
        separatedPdf2.addPage(page);
    }

    const separatedPdfData1 = await separatedPdf1.save();
    const blob1 = new Blob([separatedPdfData1], { type: 'application/pdf' });
    const downloadLink1 = document.getElementById('downloadLink1');

    const separatedPdfData2 = await separatedPdf2.save();
    const blob2 = new Blob([separatedPdfData2], { type: 'application/pdf' });
    const downloadLink2 = document.getElementById('downloadLink2');

    downloadLink1.style.display = 'block';
    downloadLink1.href = URL.createObjectURL(blob1);
    downloadLink1.download = `${Namefile1}.pdf`;

    downloadLink2.style.display = 'block';
    downloadLink2.href = URL.createObjectURL(blob2);
    downloadLink2.download = `${Namefile2}.pdf`;
}