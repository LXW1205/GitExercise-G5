async function flattenPDF() {

    let filename = document.getElementById('filename'); 
    let Filerename = filename;

    const Namefile = Filerename.value.trim() || 'flattened_pdf';
  
    const fileInput = document.getElementById('input-file');
  
    const file = fileInput.files[0];
    
    if (!file) {
      alert("Please select PDF file.");
      return;
    }
  
    const pdfData = await file.arrayBuffer();
  
    const pdfDoc = await PDFLib.PDFDocument.load(pdfData);

    const pages = pdfDoc.getPages();

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();

        // Create a canvas for each page
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');

        // Render PDF page to canvas
        const renderContext = {
            canvasContext: context,
            viewport: {
                width: width,
                height: height
            }
        };

        await page.render(renderContext).promise;
        const imgData = canvas.toDataURL('image/png');

        if (i > 0) {
            pdf.addPage([width, height]);
        }
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    }

    // Save the new flattened PDF
    pdf.save('flattened.pdf');
  
    const flattenedPdfData = await flattenedPdf.save();
  
  };