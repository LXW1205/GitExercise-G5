const fileInput1 = document.getElementById('input-file');
const fileInput2 = document.getElementById('input-file2');

fileInput1.addEventListener('change', importpdf1);
  async function importpdf1() {
    hide.classList.remove("hide");  

  const file1 = fileInput1.files[0];

  const pdfData1 = await file1.arrayBuffer();

  const pdfDoc1 = await PDFLib.PDFDocument.load(pdfData1);

  const pdfDataUri1 = await pdfDoc1.saveAsBase64({ dataUri: true });
  document.getElementById('pdf1').src = pdfDataUri1;

  }

  fileInput2.addEventListener('change', importimg);
  async function importimg() {
    hide.classList.remove("hide");  

  const file2 = fileInput2.files[0];

  const pdfData2 = await file2.arrayBuffer();

  const pdfDoc2 = await PDFLib.PDFDocument.load(pdfData2);

  const pdfDataUri2 = await pdfDoc2.saveAsBase64({ dataUri: true });
  document.getElementById('pdf2').src = pdfDataUri2;

  }

async function removePDF() {
  let pages = document.getElementById('pages'); 
  let pagesInput = pages.value; 
  
  let filename = document.getElementById('filename'); 
  let Filerename = filename;
  const Namefile = Filerename.value.trim() || 'edited_pdf';
  
  const file = fileInput.files[0];
  
  
  const pdfData = await file.arrayBuffer();
  
  const pdfDoc = await PDFLib.PDFDocument.load(pdfData);
  
  const file = event.target.files[0];
            if (file && file.type === 'application/pdf') {
                const reader = new FileReader();
                reader.onload = async function(e) {
                    const arrayBuffer = e.target.result;
                    const pdfDoc = await PDFLib.PDFDocument.load(new Uint8Array(arrayBuffer));
                    const pdfPage = pdfDoc.getPage(0);
                    
                    const viewport = pdfPage.getViewport({ scale: 2 });
                    const canvas = document.getElementById('pdf-canvas');
                    const context = canvas.getContext('2d');
                    
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };

                    await pdfPage.render(renderContext);

                    // Convert the canvas to an image
                    html2canvas(canvas).then(function(canvas) {
                        const img = document.getElementById('pdf-image');
                        img.src = canvas.toDataURL('image/png');
                        img.style.display = 'block';
                    });
                };
                reader.readAsArrayBuffer(file);
            }


  const removedPdfData = await pdfDoc.save();
  const blob = new Blob([removedPdfData], { type: 'application/pdf' });
  const downloadLink = document.getElementById('downloadLink');
  
  downloadLink.style.display = 'block';
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `${Namefile}.pdf`;
  
  };