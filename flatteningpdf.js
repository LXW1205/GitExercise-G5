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

async function flattenPDF() {
    pdf.classList.add("hide");
    downloadflattenbutton.classList.remove("hide");

    const imageUrls = [];
  
    const file = fileInput.files[0];
  
    const pdfData = await file.arrayBuffer();
  
    const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
    const imagesDiv = document.getElementById('images');
    imagesDiv.innerHTML = '';
    
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale: 0.8});
      
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
  
    const downloadPdfButton = document.getElementById('download-pdf');
    downloadPdfButton.onclick = (event) => {
      event.preventDefault();
      downloadImagesAsPdf(imageUrls);
    };
    downloadPdfButton.style.display = 'block';
  
    };
  
    function downloadImage(dataUrl, filename) {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    async function downloadImagesAsPdf(imageUrls) {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();
    
      for (let i = 0; i < imageUrls.length; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        const response = await fetch(imageUrls[i].src);
        const blob = await response.blob();
        const img = await blobToBase64(blob);
        pdf.addImage(img, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      }

      let filename = document.getElementById('filename'); 
      let Filerename = filename;
      const Namefile = Filerename.value.trim() || 'flattened_pdf';
    
      pdf.save(`${Namefile}.pdf`);
    }
    
    function blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }