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

async function removePDF() {
  let pages = document.getElementById('pages'); 
  let pagesInput = pages.value; 
  
  uploadedFileName = fileInput.files[0].name.split('.')[0];
  let filename = document.getElementById('filename'); 
  let Filerename = filename;
  const Namefile = Filerename.value.trim() || uploadedFileName;

  const file = fileInput.files[0];
  
  if (!pagesInput) {
      alert("Please enter the pages you want to remove.");
      return;
    }
  
  const pdfData = await file.arrayBuffer();
  
  const pdfDoc = await PDFLib.PDFDocument.load(pdfData);
  
  const totalPages = pdfDoc.getPageCount();

  const selectedPages = pagesInput.split(',')
    .map(page => parseInt(page.trim(), 10))
    .filter(page => !isNaN(page) && page >= 1 && page <= totalPages)
    .sort((a, b) => b - a);

  for (const page of selectedPages) {
    pdfDoc.removePage(page - 1);
  }

  const removedPdfData = await pdfDoc.save();
  const blob = new Blob([removedPdfData], { type: 'application/pdf' });
  const downloadLink = document.getElementById('downloadLink');

  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  document.getElementById('pdf').src = pdfDataUri;
  
  downloadLink.style.display = 'block';
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `${Namefile}.pdf`;
  
  };