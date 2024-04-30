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

  const canvas = document.getElementById("#drawing-board");
    const ctx = canvas.getContext("2d");    

    const canvasOffsetX = canvas.offsetLeft;
    const canvasOffsetY = canvas.offsetTop;

    canvas.width = window.innerWidth - canvasOffsetX;
    canvas.height = window.innerHeight - canvasOffsetY;
    
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

import ReactCrop from "react-image-crop";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = () => {

  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState();
  const [error, selfError] = useState('')

  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", () => {
          const { naturalwidth , naturalHeight } = e.currentTarget;
          if (naturalwidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
              SetError("Image must be at least 150 x 150 pixels.");
              setImgSrc("");
              return setImgSrc("");
          }
      });
      setImgSrc(imageUrl);
  });
  reader.readAsDataURL(file);
};

const onImageLoad =(e) => {
  const { width , height } = e.currentTarget;
  const cropweightInPercent = (MIN_DIMENSION / width) * 100;
  
  const crop = makeAspectCrop(
      {
          unit: "%",
          width: cropweightInPercent,
      }, 
      ASPECT_RATIO,
      width,
      height
  );
  const centeredCrop = centerCrop(crop, width, height)
  setCrop(centeredCrop);
}

class wall extends ReactCrop {
  render(){
    return(
      <>
        <label className="block mb-3 w-fit">
            <span className="sr-only">Choose profile photo</span>
            <input
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
            />
        </label>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        {imgSrc && 
          <div className="flex flex-col items-center">{
          <ReactCrop
                  crop={crop}
                  onChange={(pixelCrop, percentCrop)=>setCrop(percentlCrop)}                        
                  squareCrop
                  keepSelection
                  aspect={ASPECT_RATIO}
                  minWidth={MIN_DIMENSION}
              >
                  <img
                      src={imgSrc}
                      alt="Upload"
                      style={{ maxHeight:"70vh" }}
                      onload={onImageLoad}
                  />
              </ReactCrop>}
              <button className="text-white font-nono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600">
                  Crop Image
              </button>
          </div>
        }
      </>
    )
  }
}

ReactDom.render(<wall />, document.getElementById('input-file'))