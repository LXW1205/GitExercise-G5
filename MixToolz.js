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

  const input_file = document.querySelector("#input-file");
    var import_img = "";

    input_file.addEventListener("change", function() {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        upload_image = reader.result;
        document.querySelector("#display_img").style.backgroundImage = `url(${upload_image})`;
    });
    reader.readAsDataURL(this.files[0]);
  })

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
