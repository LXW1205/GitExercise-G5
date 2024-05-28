
        let pdfDoc;
        let orititle, oriauthor, orisubject, oricreator, orikeywords, oriproducer, oricreationdate, orimodificationdate;

        async function readdataPDF() {
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];
            const arrayBuffer = await file.arrayBuffer();

            pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            
            orititle = pdfDoc.getTitle();
            oriauthor = pdfDoc.getAuthor();
            orisubject = pdfDoc.getSubject();
            oricreator = pdfDoc.getCreator();
            orikeywords = pdfDoc.getKeywords();
            oriproducer = pdfDoc.getProducer();
            oricreationdate = pdfDoc.getCreationDate();
            orimodificationdate = pdfDoc.getModificationDate();

            document.getElementById('metadata-list').innerHTML = `
                <li>Title: ${orititle}</li>
                <li>Author: ${oriauthor}</li>
                <li>Subject: ${orisubject}</li>
                <li>Creator: ${oricreator}</li>
                <li>Keywords: ${orikeywords}</li>
                <li>Producer: ${oriproducer}</li>
                <li>Creation Date: ${oricreationdate.toISOString()}</li>
                <li>Modification Date: ${orimodificationdate.toISOString()}</li>
                
                <h2>Enter or change the metadata of your PDF</h2>
                
                <textarea id="title" rows="3" cols="35" placeholder="${orititle || ''}"></textarea>
                <br>
                <textarea id="author" rows="3" cols="35" placeholder="${oriauthor || ''}"></textarea>
                <br>
                <textarea id="subject" rows="3" cols="35" placeholder="${orisubject || ''}"></textarea>
                <br>
                <textarea id="creator" rows="3" cols="35" placeholder="${oricreator || ''}"></textarea>
                <br>
                <textarea id="keywords" rows="3" cols="35" placeholder="${orikeywords || ''}"></textarea>
                <br>
                <textarea id="producer" rows="3" cols="35" placeholder="${oriproducer || ''}"></textarea>
                <br>
                <textarea id="creationdate" rows="3" cols="35" placeholder="${oricreationdate ? oricreationdate.toISOString() : ''}"></textarea>
                <br>
                <textarea id="modificationdate" rows="3" cols="35" placeholder="${orimodificationdate ? orimodificationdate.toISOString() : ''}"></textarea>
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