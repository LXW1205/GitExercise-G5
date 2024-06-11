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

document.getElementById('menubar').innerHTML = `
<!--Adding buttons to the navigation bar in home page-->
<button type="button" onclick="location.href='index.html'" id="blocks">
<img id="icon" src="Images/Home.png">
Home 
</button>

<button type="button" onclick="location.href='convertfile2pdf.html'" id="blocks">
<img id="icon" src="Images/Convertpdf.png">
Image to PDF
</button>

<button type="button" onclick="location.href='pdftoimg.html'" id="blocks">
<img id="icon" src="Images/pdftoimg.png">
PDF to Image
</button>

<button type="button" onclick="location.href='extractpdf.html'" id="blocks">
<img id="icon" src="Images/Extract.png">
Extract PDF
</button>

  <button type="button" onclick="location.href='imgembedpdf.html'" id="blocks">
  <img id="icon" src="Images/Embed.png">
  Embed Image
  </button>

  <button type="button" onclick="location.href='removepagepdf.html'" id="blocks">
  <img id="icon" src="Images/Remove.png">
  Remove PDF
  </button>

  <button type="button" onclick="location.href='separatepdf.html'" id="blocks">
  <img id="icon" src="Images/Separate.png">
  Separate PDF
  </button>

  <button type="button" onclick="location.href='mergepdf.html'" id="blocks">
  <img id="icon" src="Images/Merge.png">
  Merge PDF
        </button>

        <button type="button" onclick="location.href='draw.html'" id="blocks">
        <img id="icon" src="Images/Draw.png">
        Draw
        </button>

        <button type="button" onclick="location.href='text.html'" id="blocks">
        <img id="icon" src="Images/Text.png">
        Text
        </button>

        <button type="button" onclick="location.href='crop.html'" id="blocks">
        <img id="icon" src="Images/Crop.png">
        Crop
        </button>

        <button type="button" onclick="location.href='imgConvert.html'" id="blocks">
        <img id="icon" src="Images/img_converter.png">
        Image Convert
        </button>

        <button type="button" onclick="location.href='flatteningpdf.html'" id="blocks">
        <img id="icon" src="Images/Flatten.png">
        Flatten PDF
        </button>

        <button type="button" onclick="location.href='metadatapdf.html'" id="blocks">
        <img id="icon" src="Images/Metadata.png">
        Metadata PDF
        </button>

<button type="button" onclick="location.href='imagetuning.html'" id="blocks">
<img id="icon" src="Images/tuning.png">
Image Tuning
</button>

<button type="button" onclick="location.href='resize.html'" id="blocks">
<img id="icon" src="Images/resize.png">
Resize
</button>
`;

document.getElementById('footer').innerHTML = `
<div class="footer-distributed">
  
  <div class="footer-left">
    <img id="logo2" src= "Images/MixTooLz Logo.png" align="left" margin="0px">
    <br></br>
    <br></br>
    <br></br>
    <h2>by <i style="color:yellow;">TT1L Group 5</i> for <b style="color:orange;">MINI IT PROJECT</b>~</h2>
  </div>

  <div class="footer-center">
    <h3>Checkout our socials:</h3>
  </div>

  <div class="footer-right">
    <h3>Some useful libraries we used:</h3>

    <h3 ><a style="color:red;" href="https://pdf-lib.js.org/">PDF-LIB</a></h3>
    
    <h3 ><a style="color:rgb(75, 179, 66);" href="https://html2canvas.hertzen.com/">html2canvas</a></h3>

    <h3 ><a style="color:lightskyblue;" href="https://jquery.com/">jQuery</a></h3>

    <h3 ><a style="color:blue;" href="https://fengyuanchen.github.io/cropperjs/">Cropper.js</a></h3>

    <h3 ><a style="color:purple;" href="https://parall.ax/products/jspdf">jsPDF</a></h3>

  </div>
</div>
`;