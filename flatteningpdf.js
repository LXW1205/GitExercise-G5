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

    flattenedPdf.addPage(form);
  
    const flattenedPdfData = await flattenedPdf.save();
    const blob = new Blob([flattenedPdfData], { type: 'application/pdf' });
    const downloadLink = document.getElementById('downloadLink');
  
    downloadLink.style.display = 'block';
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${Namefile}.pdf`;
  
  };