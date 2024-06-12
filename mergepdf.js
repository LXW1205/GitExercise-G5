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

  fileInput2.addEventListener('change', importpdf2);
  async function importpdf2() {
    hide.classList.remove("hide");  

  const file2 = fileInput2.files[0];

  const pdfData2 = await file2.arrayBuffer();

  const pdfDoc2 = await PDFLib.PDFDocument.load(pdfData2);

  const pdfDataUri2 = await pdfDoc2.saveAsBase64({ dataUri: true });
  document.getElementById('pdf2').src = pdfDataUri2;

  }

//Drag and Drop to Import PDF 1
let drop_area1 = document.querySelector(".drop_area");

  drop_area1.addEventListener("dragover", function(e){
    e.preventDefault();
    drop_area1.innerText = "Release your PDF 1 to upload";
  });

  drop_area1.addEventListener("drop", function(e){
    e.preventDefault();
    fileInput1.files = e.dataTransfer.files;
    drop_area1.innerText = "Drag & Drop your PDF 1 here";
    importpdf1();
  })

  drop_area1.addEventListener("dragleave", function(e){
    e.preventDefault();
    drop_area1.innerText = "Drag & Drop your PDF 1 here";
  });

//Drag and Drop to Import PDF 2
let drop_area2 = document.querySelector(".drop_area2");

  drop_area2.addEventListener("dragover", function(e){
    e.preventDefault();
    drop_area2.innerText = "Release your PDF 2 to upload";
  });

  drop_area2.addEventListener("drop", function(e){
    e.preventDefault();
    fileInput2.files = e.dataTransfer.files;
    drop_area2.innerText = "Drag & Drop your PDF 2 here";
    importpdf2();
  })

  drop_area2.addEventListener("dragleave", function(e){
    e.preventDefault();
    drop_area2.innerText = "Drag & Drop your PDF 2 here";
  });

async function mergePDFs() {
    pdf1.classList.add("hide");
    pdf2.classList.add("hide");
    pdf3.classList.remove("hide");
  
    const file1 = fileInput1.files[0];
    const file2 = fileInput2.files[0];

    uploadedFileName = fileInput1.files[0].name.split('.')[0];
    let filename = document.getElementById('filename'); 
    let Filerename = filename;
    const Namefile = Filerename.value.trim() || uploadedFileName;
  
    if (!file1 || !file2) {
      alert("Please select two PDF files.");
      return;
    }
  
  const pdfData1 = await file1.arrayBuffer();
  const pdfData2 = await file2.arrayBuffer();

  const pdfDoc1 = await PDFLib.PDFDocument.load(pdfData1);
  const pdfDoc2 = await PDFLib.PDFDocument.load(pdfData2);

  const mergedPdf = await PDFLib.PDFDocument.create();

  // first pdf
  for (let i = 0; i < pdfDoc1.getPageCount(); i++) {
    const [page] = await mergedPdf.copyPages(pdfDoc1, [i]);
    mergedPdf.addPage(page);
  }

  //second pdf
  for (let i = 0; i < pdfDoc2.getPageCount(); i++) {
    const [page] = await mergedPdf.copyPages(pdfDoc2, [i]);
    mergedPdf.addPage(page);
  }

  const mergedPdfData = await mergedPdf.save();
  const blob = new Blob([mergedPdfData], { type: 'application/pdf' });
  const downloadLink = document.getElementById('downloadLink');

  const pdfDataUri = await mergedPdf.saveAsBase64({ dataUri: true });
  document.getElementById('pdf3').src = pdfDataUri;

  downloadLink.style.display = 'block';
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `${Namefile}.pdf`;
}