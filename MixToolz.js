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

  var selDiv = "";
      var storedFiles = [];
      $(document).ready(function () {
        $("#input-file").on("change", handleFileSelect);
        selDiv = $(".poster");
      });

      function handleFileSelect(e) {
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);
        filesArr.forEach(function (f) {
          if (!f.type.match("image.*")) {
            return;
          }
          storedFiles.push(f);

          var reader = new FileReader();
          reader.onload = function (e) {
            var html =
              '<img src="' +
              e.target.result +
              "\" data-file='" +
              f.name +
              "alt='Category Image' height='250px' width='200px'>";
            selDiv.html(html);
          };
          reader.readAsDataURL(f);
        });
      }

      window.addEventListener("load", () => {
        const canvas = document.querySelector("#canvas");
        const ctx = canvas.getContext("2d");
    
        //Resizing
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    
        //Variables
        let painting = false;
    
        function startPosition(){
            painting = true;
            draw(e);
        }
        function finishedPosition(){
            painting =false;
            ctx.beginPath();
        }
    
        //e is an event
        function draw(e){
            if(!painting) return;
            ctx.linewidth = 10;
            ctx.lineCap = 'round';
            ctx.strokeStyle = "red";
    
            //clinetX is the position of the mouse at x-axis and vice versa with Y
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
            ctx.beginPath();//optional to add (To make it more pixelated)
            ctx.moveTo(e.clientX, e.clientY);//optional to add (To make it more pixelated)
        }
        //EventListners
        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener("mouseup", finishedPosition);
        canvas.addEventListener("mousemove", draw);
    });

  let file_input = document.getElementById("file");
  let image = document.getElementById("img");
  let downloadButton = document.getElementById("download");
  let aspectRatio = document.querySelectorAll(".aspect-ratio li");
  let option = document.querySelector(".aspect-ratio");
  const previewButton = document.getElementById("preview");
  const previewImage = document.getElementById("preview-image");
  let cropper = "";
  let fileName = "";

  file_input.onchange = () => {
    previewImage.src = "";
    downloadButton.classList.add("hide");

    let reader = new FileReader();
    reader.readAsDataURL(file_input.files[0]);
    reader.onload = () => {
      image.setAttribute("src", reader.result);
      if (cropper) {
        cropper.destroy();
      }

      cropper = new Cropper(image);
      option.classList.remove("hide");
      previewButton.classList.remove("hide");
    };
    fileName = file_input.files[0].name.split(".")[0];
  };

  aspectRatio.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.innerText == "Custom") {
        cropper.setAspectRatio(NaN);
      } else {
        cropper.setAspectRatio(eval(element.innerText.replace(":", "/")));
      }
    });
  });

  previewButton.addEventListener("click", (e) => {
    e.preventDefault();
    downloadButton.classList.remove("hide");
    let imgSrc = cropper.getCroppedCanvas({}).toDataURL();

    previewImage.src = imgSrc;
    downloadButton.download = `cropped_$(fileName).png`;
    downloadButton.setAttribute("href", imgSrc);
  });

  window.onload = () => {
    download.classList.add("hide");
    option.classList.add("hide");
    previewButton.classList.add("hide");
  }