const fileInput = document.getElementById('input-file');
const fileInput2 = document.getElementById('input-file2');

fileInput.addEventListener('change', importpdf);
  async function importpdf() {
    hide.classList.remove("hide");  

    const file = fileInput.files[0];
    const pdfData = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(pdfData);

    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    document.getElementById('pdf').src = pdfDataUri;
  }

  fileInput2.addEventListener('change', importimg);
  async function importimg() {
    const reader = new FileReader()
    reader.onload = (e) => {
      const images = new Image()
      images.onload = () => {
        const canvas = document.querySelector("#canvas");
        const context = canvas.getContext("2d");
        canvas.width = images.width
        canvas.height = images.height

        context.drawImage(images, 0, 0, canvas.width, canvas.height)
      }      
      images.src = e.target.result;
    }
    reader.readAsDataURL(fileInput2.files[0])
  }

//Drag and Drop to Import PDF 
let drop_area1 = document.querySelector(".drop_area");

  drop_area1.addEventListener("dragover", function(e){
    e.preventDefault();
    drop_area1.innerText = "Release your PDF to upload";
  });

  drop_area1.addEventListener("drop", function(e){
    e.preventDefault();
    fileInput.files = e.dataTransfer.files;
    drop_area1.innerText = "Drag & Drop your PDF here";
    importpdf1();
  })

  drop_area1.addEventListener("dragleave", function(e){
    e.preventDefault();
    drop_area1.innerText = "Drag & Drop your PDF here";
  });

//Drag and Drop to Import Image
let drop_area2 = document.querySelector(".drop_area2");

  drop_area2.addEventListener("dragover", function(e){
    e.preventDefault();
    drop_area2.innerText = "Release your image to upload";
  });

  drop_area2.addEventListener("drop", function(e){
    e.preventDefault();
    fileInput2.files = e.dataTransfer.files;
    drop_area2.innerText = "Drag & Drop your image here";
    importimg();
  })

  drop_area2.addEventListener("dragleave", function(e){
    e.preventDefault();
    drop_area2.innerText = "Drag & Drop your image here";
  });

async function embedimg() {

  let pages = document.getElementById('pages'); 
  let pagesInput = pages.value; 

  let scale = document.getElementById('scale'); 
  let Imgscale = scale.value; 

  let xcor = document.getElementById('x-cor'); 
  let x_cord = xcor.value; 

  let ycor = document.getElementById('y-cor'); 
  let y_cord = ycor.value; 

  let filename = document.getElementById('filename'); 
  let Filerename = filename;
  const Namefile = Filerename.value.trim() || 'embeded_pdf';
  
  const file = fileInput.files[0];
  
  const pdfData = await file.arrayBuffer();
  
  const pdfDoc = await PDFLib.PDFDocument.load(pdfData);

  const embedPdf = await PDFLib.PDFDocument.create();

  const [copiedPage] = await embedPdf.copyPages(pdfDoc, [pagesInput - 1]);
  embedPdf.addPage(copiedPage);

  if (fileInput2.type === 'image/jpeg') {
    const jpgImageBytes = await fetch(fileInput2).then((res) => res.arrayBuffer())

    const jpgImage = await embedPdf.embedJpg(jpgImageBytes)
    const jpgDims = jpgImage.scale(Imgscale)

    embedPdf.drawImage(jpgImage, {
    x: x_cord,
    y: y_cord,
    width: jpgDims.width,
    height: jpgDims.height,})
    } 

  else if (fileInput2.type === 'image/png') {
    const pngImageBytes = await fetch(fileInput2).then((res) => res.arrayBuffer())

    const pngImage = await embedPdf.embedPng(pngImageBytes)
    const pngDims = pngImage.scale(Imgscale)

    embedPdf.drawImage(pngImage, {
    x: x_cord,
    y: y_cord,
    width: pngDims.width,
    height: pngDims.height,})
    } 

  else {
      alert("Unable to embed Image because of the file format");
      }

  const embededPdfData = await embedPdf.save();
  const blob = new Blob([embededPdfData], { type: 'application/pdf' });
  const downloadLink = document.getElementById('downloadLink');
  
  downloadLink.style.display = 'block';
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `${Namefile}.pdf`;
  
};