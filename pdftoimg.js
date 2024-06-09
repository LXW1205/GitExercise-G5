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

//Drag and Drop to Import PDF
let drop_area = document.querySelector(".drop_area");
  
drop_area.addEventListener("dragover", function(e){
  e.preventDefault();
  drop_area.innerText = "Release your PDF to upload";
});
 
drop_area.addEventListener("drop", function(e){
  e.preventDefault();
  fileInput.files = e.dataTransfer.files;
  drop_area.innerText = "Drag & Drop your PDF here";
  importpdf();
})

drop_area.addEventListener("dragleave", function(e){
  e.preventDefault();
  drop_area.innerText = "Drag & Drop your PDF here";
});

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

    const draw_btn = document.createElement('button');
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