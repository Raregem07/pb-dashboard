import React from 'react';
import { Button, Card, Col, Row } from "antd";
import Icons from "../common/components/Icons";
import { TagCloud } from "react-tagcloud";
import * as htmlToImage from "html-to-image";
import { CSVLink } from "react-csv";
import ReactGA from "react-ga";
import DownloadFileInExcel from "../common/components/DownloadFileInExcel";

function save(context) {
  htmlToImage
    .toJpeg(document.getElementById("posterDisplay"), { quality: 0.95 })
    .then(function(dataUrl) {
      var link = document.createElement("a");
      link.download = `${context}-poster.jpeg`;
      link.href = dataUrl;
      link.click();
    });
}

function downloadButtonPressed(type) {
  ReactGA.event({
    category: type,
    action: `Download Button Clicked`
  });
}

// Props: data, icon, title, context
function ShowDataAndCountAsPoster(props) {
  let minSize = 25;
  let postsLength = props.data.length;
  if (postsLength > 80) {
    postsLength = 80;
  }
  minSize -= Math.floor((13 / 80) * postsLength);
  let csvData = [];
  // csvData.push(headerRow);
  let deepCopyData = JSON.parse(JSON.stringify(props.data));
  deepCopyData = deepCopyData.sort((a,b) => a['count']>b['count']? -1 : 1)

  let columns = [
    {label: `${props.context} Name`, value: `value`},
    {label: `Count`, value: `count`}
  ];


  return <Card
    title={
      <div>
        <Row>
          <Col span={8}>
            {Icons[props.icon]} &nbsp;&nbsp;&nbsp;{props.title}
          </Col>
          <Col span={9}>
            <DownloadFileInExcel
              filename={props.context}
              columns={columns}
              data={deepCopyData}
              blueButton={false}
              buttonName="Download Data XLS (Excel)"
            />
          </Col>
          <Col span={7}>
            {" "}
            <Button onClick={() => save(props.context)}>
              Save poster as Image
            </Button>
          </Col>
        </Row>
      </div>
    }
    style={{ margin: 12, backgroundColor: "#ffffff" }}
  >
    <div
      style={{ textAlign: "center", backgroundColor: "#ffffff" }}
      id="posterDisplay"
    >
      <TagCloud
        minSize={minSize}
        maxSize={50}
        tags={props.data}
        shuffle={false}
        colorOptions={{
          luminosity: "dark",
          format: "rgb",
          fontWeight: "bold"
        }}
      />
    </div>
  </Card>
}

export default ShowDataAndCountAsPoster;
