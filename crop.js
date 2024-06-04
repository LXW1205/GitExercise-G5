  //Global variables
  let file_input = document.getElementById("input-file");
  let drop_area = document.querySelector("#drop_area");
  let image = document.querySelector("img");
  let downloadButton = document.getElementById("download");
  let aspectRatio = document.querySelectorAll(".aspect-ratio li");
  let option = document.querySelector(".aspect-ratio");
  const previewButton = document.getElementById("preview");
  const previewImage = document.getElementById("preview-image");
  let cropper = "";

  let filename = document.getElementById('filename'); 
  let Filerename = filename;

  //Import or Upload Image
  file_input.addEventListener('change', importImage);
  function importImage() {
  file_input.onchange = () => {
    previewImage.src = "";
    downloadButton.classList.add("hide");

    const reader = new FileReader();
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
  }};

  drop_area.addEventListener("dragover", function(e){
    e.preventDefault();
  });
  drop_area.addEventListener("drop", function(e){
    e.preventDefault();
    file_input.files = e.dataTransfer.files;
    importImage();
  })

  aspectRatio.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.innerText == "Custom") {
        cropper.setAspectRatio(NaN);
      } else {
        cropper.setAspectRatio(eval(element.innerText.replace(":", "/")));
      }
    });
  });

  //Download Editied Image
  previewButton.addEventListener("click", (e) => {
    e.preventDefault();
    filename.classList.remove("hide");
    downloadButton.classList.remove("hide");
    let imgSrc = cropper.getCroppedCanvas({}).toDataURL();
    previewImage.src = imgSrc;

    const Namefile = Filerename.value.trim() || 'cropped_image';

    downloadButton.download = `${Namefile}.png`;
    downloadButton.setAttribute("href", imgSrc);
  });

  window.onload = () => {
    download.classList.add("hide");
    option.classList.add("hide");
    previewButton.classList.add("hide");
  }