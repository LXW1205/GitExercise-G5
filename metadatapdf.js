async function readdataPDF() {
    const fileInput = document.getElementById('input-file');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a PDF file.");
        return;
    }

    const pdfData = await file.arrayBuffer();
    pdfDoc = await PDFLib.PDFDocument.load(pdfData, { updateMetadata: false });

    const orititle = await pdfDoc.getTitle() || "";
    const oriauthor = await pdfDoc.getAuthor() || "";
    const orisubject = await pdfDoc.getSubject() || "";
    const oricreator = await pdfDoc.getCreator() || "";
    const orikeywords = await pdfDoc.getKeywords() || "";
    const oriproducer = await pdfDoc.getProducer() || "";
    const oricreationdate = await pdfDoc.getCreationDate() || new Date();
    const orimodificationdate = await pdfDoc.getModificationDate() || new Date();

    document.getElementById('metadata-list').innerHTML = `
        <h2>Enter or change the metadata of your PDF</h2>
        <textarea id="title" rows="3" cols="35" placeholder="${orititle}"></textarea><br>
        <textarea id="author" rows="3" cols="35" placeholder="${oriauthor}"></textarea><br>
        <textarea id="subject" rows="3" cols="35" placeholder="${orisubject}"></textarea><br>
        <textarea id="creator" rows="3" cols="35" placeholder="${oricreator}"></textarea><br>
        <textarea id="keywords" rows="3" cols="35" placeholder="${orikeywords}"></textarea><br>
        <textarea id="producer" rows="3" cols="35" placeholder="${oriproducer}"></textarea><br>
        <textarea id="creationdate" rows="3" cols="35" placeholder="${oricreationdate.toISOString()}"></textarea><br>
        <textarea id="modificationdate" rows="3" cols="35" placeholder="${orimodificationdate.toISOString()}"></textarea>
    `;

    document.getElementById('savePDFButton').style.display = 'block';
}

async function setdataPDF() {
    let title = document.getElementById('title').value || (await pdfDoc.getTitle()) || "";
    let author = document.getElementById('author').value || (await pdfDoc.getAuthor()) || "";
    let subject = document.getElementById('subject').value || (await pdfDoc.getSubject()) || "";
    let creator = document.getElementById('creator').value || (await pdfDoc.getCreator()) || "";
    let keywords = document.getElementById('keywords').value || (await pdfDoc.getKeywords()).join(', ') || "";
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