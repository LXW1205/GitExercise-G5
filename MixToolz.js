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

  const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");    

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    let drawing = false;

    function initial_position(){
      drawing = true;
      draw(e);
    }

    function final_position(){
      drawing = false;
      ctx.beginPath();
    }

    function draw(e){
      if(!drawing) return;
      ctx.linewidth = 10;
      ctx.lineCap = 'round';

      ctx.lineTo(e.clientx, e.clientY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
    }

    canvas.addEventListener("mousedown", initial_position);
    canvas.addEventListener("mouseup", final_position);
    canvas.addEventListener("mousemove", draw);

    $(document).ready(function () {
      $(draw(e)).on("change", handleFileSelect);
      selDiv = $(reader.readAsDataURL(f));
    });
