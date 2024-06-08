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
  zipbutton.classList.remove("hide"); 

  const imageUrls = [];
  
  const file = fileInput.files[0];
  
  const pdfData = await file.arrayBuffer();

  const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
  const imagesDiv = document.getElementById('images');
  imagesDiv.innerHTML = '';
  
  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale: 1.0 });
    
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
    imageUrls.push({ src: img.src, name: `page-${i}.png` });
  }

  const downloadAllButton = document.getElementById('download-all');
  downloadAllButton.onclick = (event) => {
    event.preventDefault();
    downloadAllImagesAsZip(imageUrls);
  };
  downloadAllButton.style.display = 'block';

  };

  function downloadImage(dataUrl, filename) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function downloadAllImagesAsZip(imageUrls) {
    const zip = new JSZip();
    const imgFolder = zip.folder("images");
  
    for (const image of imageUrls) {
      const response = await fetch(image.src);
      const blob = await response.blob();
      imgFolder.file(image.name, blob);
    }
  
    zip.generateAsync({ type: "blob" }).then(function (content) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'images.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }