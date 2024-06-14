var coll = document.getElementsByClassName("collapsible");
var i;
  
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

class SpecialHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div>
        <button type="button" onclick="location.href='index.html'" id="blocks">
            <img id="icon" src="Images/Home.png" alt="Home"> Home
        </button>

        <button type="button" onclick="location.href='convertfile2pdf.html'" id="blocks">
            <img id="icon" src="Images/Convertpdf.png" alt="Convert to PDF"> Image to PDF
        </button>

        <button type="button" onclick="location.href='pdftoimg.html'" id="blocks">
            <img id="icon" src="Images/pdftoimg.png" alt="PDF to Image"> PDF to Image
        </button>

        <button type="button" onclick="location.href='extractpdf.html'" id="blocks">
            <img id="icon" src="Images/Extract.png" alt="Extract PDF"> Extract PDF
        </button>

        <button type="button" onclick="location.href='imgembedpdf.html'" id="blocks">
            <img id="icon" src="Images/Embed.png" alt="Embed Image"> Embed Image
        </button>

        <button type="button" onclick="location.href='removepagepdf.html'" id="blocks">
            <img id="icon" src="Images/Remove.png" alt="Remove PDF"> Remove PDF
        </button>

        <button type="button" onclick="location.href='separatepdf.html'" id="blocks">
            <img id="icon" src="Images/Separate.png" alt="Separate PDF"> Separate PDF
        </button>

        <button type="button" onclick="location.href='flatteningpdf.html'" id="blocks">
            <img id="icon" src="Images/Flatten.png" alt="Flatten PDF"> Flatten PDF
        </button>

        <button type="button" onclick="location.href='metadatapdf.html'" id="blocks">
            <img id="icon" src="Images/Metadata.png" alt="Metadata PDF"> Metadata PDF
        </button>        

        <button type="button" onclick="location.href='mergepdf.html'" id="blocks">
            <img id="icon" src="Images/Merge.png" alt="Merge PDF"> Merge PDF
        </button>

        <button type="button" onclick="location.href='draw.html'" id="blocks">
            <img id="icon" src="Images/Draw.png" alt="Draw"> Draw
        </button>

        <button type="button" onclick="location.href='text.html'" id="blocks">
            <img id="icon" src="Images/Text.png" alt="Text"> Text
        </button>

        <button type="button" onclick="location.href='crop.html'" id="blocks">
            <img id="icon" src="Images/Crop.png" alt="Crop"> Crop
        </button>

        <button type="button" onclick="location.href='imgConvert.html'" id="blocks">
            <img id="icon" src="Images/img_converter.png" alt="Image Convert"> Image Convert
        </button>

        <button type="button" onclick="location.href='imagetuning.html'" id="blocks">
            <img id="icon" src="Images/tuning.png" alt="Image Tuning"> Image Tuning
        </button>

        <button type="button" onclick="location.href='resize.html'" id="blocks">
            <img id="icon" src="Images/resize.png" alt="Resize"> Resize
        </button>
    </div>
    `
  }
}


class SpecialFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="footer-distributed">
      
    <div class="footer-left">
      <img id="logo2" src= "Images/MixTooLz Logo.png" align="left" margin="0px">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h2>by <i style="color:yellow;">TT1L Group 5</i> for <b style="color:orange;">MINI IT PROJECT</b>~</h2>
    </div>

    <div class="footer-center">
      <h3>Checkout our socials:</h3>

        <h4><img id="social_icon" src= "Images/insta.png" align="left" margin="0px">&nbsp;&nbsp;&nbsp;
        <a style="color:white;" href="https://www.instagram.com/xiuwei05?igsh=MXFzdzRqM2R2OHBucg==">Xiu Wei</a></h4>

        <br></br>

        <h4><img id="social_icon" src= "Images/insta.png" align="left" margin="0px">&nbsp;&nbsp;&nbsp;
        <a style="color:white;" href="https://www.instagram.com/jiekit_2005?igsh=YmJmdWtiMHZoMWkw">Jie Kit</a></h4>

        <br></br>

        <h4><img id="social_icon" src= "Images/face.png" align="left" margin="0px">&nbsp;&nbsp;&nbsp;
        <a style="color:white;" href="https://www.facebook.com/minghein.teng?mibextid=JRoKGi">Ming Hein</a></h4>

    </div>

    <div class="footer-right">
      <h3>Some useful libraries we used:</h3>

      <h4><a style="color:red;" href="https://pdf-lib.js.org/">PDF-LIB</a></h4>

      <h4><a style="color: #8D52FB;" href="https://parall.ax/products/jspdf">jsPDF</a></h4>
      
      <h4><a style="color:rgb(75, 179, 66);" href="https://html2canvas.hertzen.com/">html2canvas</a></h4>

      <h4><a style="color:lightskyblue;" href="https://jquery.com/">jQuery</a></h3>

      <h4><a style="color:pink;" href="https://fengyuanchen.github.io/cropperjs/">Cropper.js</a></h4>

    </div>
    </div>
    `
  }
}

customElements.define('special-header',SpecialHeader)
customElements.define('special-footer',SpecialFooter)