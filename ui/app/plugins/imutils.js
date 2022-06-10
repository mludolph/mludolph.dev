const readFile = (file, { base64 = true } = {}) => {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = (ev) => {
      resolve(ev.target.result);
    };
    if (base64) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
};

const getImageMeta = (url) => {
  var img = new Image();
  return new Promise((resolve) => {
    img.onload = function () {
      resolve({ img, width: img.width, height: img.height });
    };
    img.src = url;
  });
};

const cropImage = async (
  input,
  {
    cropWidth = 224,
    cropHeight = 224,
    flip = false,
    imageFormat = "image/jpeg",
  } = {}
) => {
  let img, width, height;
  if (typeof input === "string" || input instanceof String) {
    const meta = await getImageMeta(input);
    img = meta.img;
    width = meta.width;
    height = meta.height;
  } else if (input.videoWidth !== null) {
    img = input;
    width = img.videoWidth;
    height = img.videoHeight;
  } else {
    img = input;
    width = img.width;
    height = img.height;
  }

  let canvas = document.getElementById("canvas");

  if (canvas === null) {
    canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
  }
  var ctx = canvas.getContext("2d");
  canvas.width = cropWidth;
  canvas.height = cropHeight;

  const horizontal = width > height;
  const crop = Math.abs(width - height) / 2;
  const fac = flip ? -1 : 1;
  ctx.scale(fac, 1);

  ctx.drawImage(
    img,
    horizontal ? crop : 0,
    horizontal ? 0 : crop,
    horizontal ? width - 2 * crop : width,
    horizontal ? height : height - 2 * crop,
    0,
    0,
    fac * cropWidth,
    cropHeight
  );

  return canvas.toDataURL(imageFormat);
};

const imutils = {
  getImageMeta,
  cropImage,
  readFile,
};

export default (_, inject) => {
  inject("imutils", imutils);
};
