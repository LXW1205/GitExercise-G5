async function timer() {
    document.getElementById('hide').classList.remove("hide");
}

async function removehide() {
    setTimeout(timer, 1000);
}

async function setdataPDF() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a PDF file.");
        return;
    }

    const pdfData = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(pdfData);

    const metadata = pdfDoc.getMetadata();
    
    let title = document.getElementById('title').value || metadata?.title || "";
    let author = document.getElementById('author').value || metadata?.author || "";
    let subject = document.getElementById('subject').value || metadata?.subject || "";
    let keywords = document.getElementById('keywords').value || metadata?.keywords || "";
    let producer = document.getElementById('producer').value || metadata?.producer || "";
    let creator = document.getElementById('creator').value || metadata?.creator || "";
    let creationdate = document.getElementById('creationdate').value || metadata?.creationDate || new Date();
    let modificationdate = document.getElementById('modificationdate').value || metadata?.modificationDate || new Date();

    pdfDoc.setTitle(title);
    pdfDoc.setAuthor(author);
    pdfDoc.setSubject(subject);
    pdfDoc.setKeywords(keywords);
    pdfDoc.setProducer(producer);
    pdfDoc.setCreator(creator);
    pdfDoc.setCreationDate(new Date(creationdate));
    pdfDoc.setModificationDate(new Date(modificationdate));

    const PdfData = await pdfDoc.save();
    const blob = new Blob([PdfData], { type: 'application/pdf' });
    const downloadLink = document.getElementById('downloadLink');

    downloadLink.style.display = 'block';
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `modified_PDF.pdf`;
}