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

  let ori_img = document.querySelector("none");
    let import_img = document.querySelector("import-file");

    import_img.addEventListener("change", () => {
      ori_img.src = URL.createObjectURL(import_img.files[0]);
             
    });