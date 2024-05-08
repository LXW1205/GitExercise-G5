async function separatePDF() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    
    reader.onload = async function(event) {
      const pdfBytes = new Uint8Array(event.target.result);
      const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
      
      const numPages = pdfDoc.getPageCount();
      const outputDiv = document.getElementById('output');
      outputDiv.innerHTML = "";

      for (let i = 0; i < numPages; i++) {
        const page = pdfDoc.getPage(i);
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d');

        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;

        const img = new Image();
        img.src = canvas.toDataURL();

        outputDiv.appendChild(img);
      }
    };
  }