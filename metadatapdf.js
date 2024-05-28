async function readdataPDF() {
    const fileInput = document.getElementById('fileInput');
  
    const file = fileInput.files[0];
  
    const arrayBuffer = await file.arrayBuffer();

    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    
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

        <textarea id="title" rows="3" cols="35" placeholder=${orititle}></textarea>
        <br></br>
        <textarea id="author" rows="3" cols="35" placeholder=${oriauthor}></textarea>
        <br></br>
        <textarea id="subject" rows="3" cols="35" placeholder=${orisubject}></textarea>
        <br></br>
        <textarea id="creator" rows="3" cols="35" placeholder=${oricreator}></textarea>
        <br></br>
        <textarea id="keywords" rows="3" cols="35" placeholder=${orikeywords}></textarea>
        <br></br>
        <textarea id="producer" rows="3" cols="35" placeholder=${oriproducer}></textarea>
        <br></br>
        <textarea id="creationdate" rows="3" cols="35" placeholder=${oricreationdate.toISOString()}></textarea>
        <br></br>
        <textarea id="modificationdate" rows="3" cols="35" placeholder=${orimodificationdate.toISOString()}></textarea>
                
                
        </div>
                
    `;
}

async function setdataPDF() {
    let title = document.getElementById('title').value || orititle || "";
    let author = document.getElementById('author').value || oriauthor || "";
    let subject = document.getElementById('subject').value || orisubject || "";
    let creator = document.getElementById('creator').value || oricreator || "";
    let keywords = document.getElementById('keywords').value || orikeywords || "";
    let producer = document.getElementById('producer').value || oriproducer || "";
    let creationdate = document.getElementById('creationdate').value || oricreationdate || new Date();
    let modificationdate = document.getElementById('modificationdate').value || orimodificationdate || new Date();

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