import React from "react";
import { Button } from "antd";
import { imgSrcToBlob } from "blob-util";

async function downloadImages(images) {
  for (let i = 0; i < images.length; i++) {
    for (let j = 0; j < images[i].length; j++) {
      let blob = await imgSrcToBlob(images[i][j]);
      let i1 = images.length - i;
      let j1 = images[i].length - j;
      let name= String(i1 * j1)+".jpg" ;
      download(name, blob);
    }
  }
}

function download(filename, blob) {
  var element = document.createElement("a");
  var dataBlob = blob;
  element.setAttribute("href", URL.createObjectURL(dataBlob));
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  var clickHandler;
  element.addEventListener(
    "click",
    (clickHandler = function() {
      // ..and to wait a frame
      requestAnimationFrame(function() {
        URL.revokeObjectURL(element.href);
      });

      element.removeAttribute("href");
      element.removeEventListener("click", clickHandler);
    })
  );
  document.body.removeChild(element);
}

function DownloadImages(props) {
  let images = props.images;
  return <Button type="primary" onClick={() => {downloadImages(images)}}>Download</Button>
}

export default DownloadImages;
