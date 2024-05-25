async function Removehide() {
  hide.classList.remove("hide");
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

    pages.forEach(page => {
      const annotations = page.node.Annots();
      
      if (annotations) {
        // Loop through each annotation
        annotations.asArray().forEach(annotationRef => {
          const annotation = annotationRef.lookup();
          const type = annotation.lookup('Subtype');
  
          // Check if it's a text annotation or other visible annotation
          if (type && (type.name === 'Text' || type.name === 'Highlight' || type.name === 'Underline' || type.name === 'StrikeOut')) {
            // Get the appearance stream
            const appearanceStreamRef = annotation.lookup('AP');
            if (appearanceStreamRef) {
              const appearanceStream = appearanceStreamRef.lookup('N');
              if (appearanceStream) {
                // Render the appearance stream into the page content
                const { context } = page;
                context.drawObject(appearanceStream);
              }
            }
          }
        });
  
        annotations.remove();
      }
    });

    flattenedPdf.addPage(form);
  
    const flattenedPdfData = await flattenedPdf.save();
    const blob = new Blob([flattenedPdfData], { type: 'application/pdf' });
    const downloadLink = document.getElementById('downloadLink');
  
    downloadLink.style.display = 'block';
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${Namefile}.pdf`;
  
  };