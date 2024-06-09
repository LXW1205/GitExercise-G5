const fileInput = document.getElementById('input-file');

fileInput.addEventListener('change', importpdf);
  async function importpdf() {
    hide.classList.remove("hide");  

    const file = fileInput.files[0];

    const pdfData = await file.arrayBuffer();
    pdfDoc = await PDFLib.PDFDocument.load(pdfData, { updateMetadata: false });

    const orititle = pdfDoc.getTitle()
    const oriauthor = pdfDoc.getAuthor()
    const orisubject = pdfDoc.getSubject()
    const oricreator = pdfDoc.getCreator()
    const orikeywords = pdfDoc.getKeywords()
    const oriproducer = pdfDoc.getProducer()
    const oricreationdate = pdfDoc.getCreationDate()
    const orimodificationdate = pdfDoc.getModificationDate()

    document.getElementById('metadata-list').innerHTML = `
        <h2>Enter or change the metadata of your PDF</h2>
        <h3>Title:</h3>
        <textarea id="title" rows="3" cols="35" placeholder="${orititle}"></textarea><br>
        <h3>Author:</h3>
        <textarea id="author" rows="3" cols="35" placeholder="${oriauthor}"></textarea><br>
        <h3>Subject:</h3>
        <textarea id="subject" rows="3" cols="35" placeholder="${orisubject}"></textarea><br>
        <h3>Creator:</h3>
        <textarea id="creator" rows="3" cols="35" placeholder="${oricreator}"></textarea><br>
        <h3>Keywords:</h3>
        <textarea id="keywords" rows="3" cols="35" placeholder="${orikeywords}"></textarea><br>
        <h3>Producer:</h3>
        <textarea id="producer" rows="3" cols="35" placeholder="${oriproducer}"></textarea><br>
        <h3>Creation Date:</h3>
        <textarea id="creationdate" rows="3" cols="35" placeholder="${oricreationdate.toISOString()}"></textarea><br>
        <h3>Modification Date:</h3>
        <textarea id="modificationdate" rows="3" cols="35" placeholder="${orimodificationdate.toISOString()}"></textarea>
    `;

    document.getElementById('savePDFButton').style.display = 'block';
}

//Drag and Drop to Import PDF 
let drop_area = document.querySelector(".drop_area");

    drop_area.addEventListener("dragover", function(e){
    e.preventDefault();
    });

    drop_area.addEventListener("drop", function(e){
    e.preventDefault();
    fileInput.files = e.dataTransfer.files;
    importpdf();
    })

async function setdataPDF() {
    let title = document.getElementById('title').value || (await pdfDoc.getTitle()) || "";
    let author = document.getElementById('author').value || (await pdfDoc.getAuthor()) || "";
    let subject = document.getElementById('subject').value || (await pdfDoc.getSubject()) || "";
    let creator = document.getElementById('creator').value || (await pdfDoc.getCreator()) || "";
    let keywords = document.getElementById('keywords').value || (await pdfDoc.getKeywords()) || "";
    let producer = document.getElementById('producer').value || (await pdfDoc.getProducer()) || "";
    let creationdate = document.getElementById('creationdate').value || (await pdfDoc.getCreationDate()).toISOString() || "";
    let modificationdate = document.getElementById('modificationdate').value || (await pdfDoc.getModificationDate()).toISOString() || "";

    // keywords from string to an array got otherwise error
    keywords = keywords.split(',').map(keyword => keyword.trim());

    pdfDoc.setTitle(title);
    pdfDoc.setAuthor(author);
    pdfDoc.setSubject(subject);
    pdfDoc.setKeywords(keywords);
    pdfDoc.setProducer(producer);
    pdfDoc.setCreator(creator);
    pdfDoc.setCreationDate(new Date(creationdate));
    pdfDoc.setModificationDate(new Date(modificationdate));

    const pdfData = await pdfDoc.save();
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const downloadLink = document.getElementById('downloadLink');

    downloadLink.style.display = 'block';
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `modified_PDF.pdf`;
}

document.getElementById('loadPDFButton').addEventListener('click', readdataPDF);
document.getElementById('savePDFButton').addEventListener('click', setdataPDF);