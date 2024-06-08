const fileInput = document.getElementById('input-file');
const fileInput2 = document.getElementById('input-file2');

fileInput.addEventListener('change', importpdf1);
  async function importpdf1() {
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
        uploaded_img = images
        canvas.width = images.width
        canvas.height = images.height
        input_width.value = images.naturalWidth 
        input_height.value = images.naturalHeight
        initial_ratio = images.naturalWidth / images.naturalHeight
        document.querySelector(".poster").classList.add("active")
        ctx.drawImage(images, 0, 0, canvas.width, canvas.height)
      }      
      images.src = e.target.result;
      tools_element.classList.remove("hide");
    }
    reader.readAsDataURL(fileInput2.files[0])
  }

async function embedimg() {
  let filename = document.getElementById('filename'); 
  let Filerename = filename;
  const Namefile = Filerename.value.trim() || 'embeded_pdf';
  
  const file = fileInput1.files[0];
  
  const pdfData = await file.arrayBuffer();
  
  const pdfDoc = await PDFLib.PDFDocument.load(pdfData);

  const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())
  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
  const jpgDims = jpgImage.scale(0.5)

  const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
  const pngImage = await pdfDoc.embedPng(pngImageBytes)
  const pngDims = pngImage.scale(0.5)

  const page = pdfDoc.addPage()

  page.drawImage(jpgImage, {
    x: page.getWidth() / 2 - jpgDims.width / 2,
    y: page.getHeight() / 2 - jpgDims.height / 2 + 250,
    width: jpgDims.width,
    height: jpgDims.height,
  })

  page.drawImage(pngImage, {
    x: page.getWidth() / 2 - pngDims.width / 2 + 75,
    y: page.getHeight() / 2 - pngDims.height + 250,
    width: pngDims.width,
    height: pngDims.height,
  })

  const embededPdfData = await pdfDoc.save();
  const blob = new Blob([embededPdfData], { type: 'application/pdf' });
  const downloadLink = document.getElementById('downloadLink');
  
  downloadLink.style.display = 'block';
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `${Namefile}.pdf`;
  
  };