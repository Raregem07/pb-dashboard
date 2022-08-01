import React from 'react';

function SplitImagesViewer(props) {
  let images = props.images;
  let finalRender = [];
  for (let i =0;i<images.length;i++) {
    for (let j=0;j<images[i].length;j++) {
      finalRender.push(<img alt={`Crop_${i}-${j}`} src={images[i][j]} style={{padding: 2, maxWidth: '100%'}} />);
    }
    finalRender.push(<br />)
  }
  return finalRender;
}

export default SplitImagesViewer;
