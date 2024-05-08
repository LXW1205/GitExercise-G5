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
          "alt='Category Image' >";
        selDiv.html(html);
      };
      reader.readAsDataURL(f);
  
      // Hide the file input field, label, and submit button
      $("#pwd").hide();
      $("#pwd + label").hide();
      $(".btn-default").hide();
    });
  }