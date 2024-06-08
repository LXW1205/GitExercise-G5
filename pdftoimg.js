const fileInput = document.getElementById('input-file');

fileInput.addEventListener('change', importpdf);
  async function importpdf() {
    hide.classList.remove("hide"); 

    const file = fileInput.files[0];
    const pdfData = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(pdfData);

    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    document.getElementById('pdf').src = pdfDataUri;

  }

async function convertPDF() {
  pdf.classList.add("hide"); 
  
  const file = fileInput.files[0];
  
  const pdfData = await file.arrayBuffer();

  const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
  const imagesDiv = document.getElementById('images');
  imagesDiv.innerHTML = '';
  
  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;
    
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    imagesDiv.appendChild(img);

    const draw_btn = document.createElement('checkbox');
    draw_btn.classList.add('button-87');
    draw_btn.textContent = 'draw img ' + i;
    draw_btn.onclick = () => {
      localStorage.setItem('imageData', img.src);
      window.location.href = 'draw.html';
    };
    imagesDiv.appendChild(draw_btn);

    const downloadButton = document.createElement('button');
    downloadButton.classList.add('button-87');
    downloadButton.textContent = 'Download img ' + i;
    downloadButton.onclick = (event) => {
      event.preventDefault();
      downloadImage(img.src, `page-${i}.png`);
    };
    imagesDiv.appendChild(downloadButton);
  }
  };

  function downloadImage(dataUrl, filename) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }