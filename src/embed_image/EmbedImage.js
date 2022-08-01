import React from "react";
import watermark from "watermarkjs/lib";
import { blobToDataURL, imgSrcToBlob } from "blob-util";
import { Button, Card, Col, Icon, Row, Slider, Upload, message } from "antd";
import MessageDisplayer from "../common/components/MessageDisplayer";
import { AppContext } from "../home/Home";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import NeedHelp from "../common/components/NeedHelp";
import NeedHelpEnum from "../common/models/NeedHelpEnum";
import fs from "fs";

const heartImage = require("./../common/images/final_heart.png");


const { Dragger } = Upload;

class EmbedImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      finalImage: null,
      opacity: 5,
      heartSize: null,
      reset: false,
      imageBlobURL: null
    };
    this.myRef = React.createRef();
  }

  static resizeSquareImage(sideLength, img) {
    const elem = document.createElement("canvas");
    elem.width = sideLength;
    elem.height = sideLength;
    const ctx = elem.getContext("2d");
    ctx.drawImage(img, 0, 0, sideLength, sideLength);
    const data = ctx.canvas.toDataURL(img);
    var baseImage = new Image();
    baseImage.src = data;
    return baseImage;
  }

  async showImage() {
    var uploadedImageBlob = await blobToDataURL(this.state.file);
    var baseImage = new Image();
    baseImage.src = uploadedImageBlob;
    let uploadedImage = await this.waitTillImageLoads(baseImage);

    let baseHeartImage = new Image();
    baseHeartImage.src = String(heartImage);
    let heartImageBase = await this.waitTillImageLoads(baseHeartImage);

    let heartSide = Math.ceil(uploadedImage.height * (220 / 1200));
    if (this.state.heartSize) {
      heartSide = this.state.heartSize;
    } else {
      this.setState({ heartSize: heartSide });
    }
    if (this.state.reset) {
      heartSide = Math.ceil(uploadedImage.height * (220 / 1200));
      if (uploadedImage.height > 600) {
        heartSide = heartSide - 40;
      }
      this.setState({ reset: false, heartSize: heartSide });
    }

    heartImageBase = EmbedImage.resizeSquareImage(heartSide, heartImageBase);
    let finalImage = await watermark([uploadedImage, heartImageBase]).image(
      watermark.image.center(this.state.opacity * 0.1)
    );

    let blob = await imgSrcToBlob(finalImage.src);
    this.setState({ finalImage: finalImage.src, imageBlobURL: blob });
  }

  waitTillImageLoads(img) {
    return new Promise(resolve => {
      img.onload = function() {
        resolve(img);
      };
    });
  }

  download = (filename, blob) => {
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
  };

  onChangeSliderOpacity = v => {
    ReactGA.event({
      category: AnalyticsCategoryEnum.HEART_IMAGE,
      action: `Opacity Changed`
    });
    this.setState({ opacity: v }, () => {
      this.showImage();
    });
  };

  fileChange = file => {
    ReactGA.event({
      category: AnalyticsCategoryEnum.HEART_IMAGE,
      action: `File uploaded`
    });
    this.setState({ file: file, reset: true }, () => {
      this.showImage();
    });
    // SendFile(file);
    return false;
  };

  onChangeSliderHeartSize = v => {
    ReactGA.event({
      category: AnalyticsCategoryEnum.HEART_IMAGE,
      action: `Heart Size Changed`
    });
    this.setState({ heartSize: v }, () => {
      this.showImage();
    });
  };

  onReset = () => {
    ReactGA.event({
      category: AnalyticsCategoryEnum.HEART_IMAGE,
      action: `Reset Image`
    });
    this.setState({ reset: true, opacity: 5 }, () => {
      this.showImage();
    });
  };

  render() {
    let finalImage = <div />;

    if (this.state.finalImage) {
      finalImage = (
        <div>
          <Row>
            <Col span={12}>
              <Card
                title={<div>Preview</div>}
                style={{ margin: 4, backgroundColor: "#fbfbfb" }}
              >
                <img
                  src={this.state.finalImage}
                  width={550}
                  style={{ border: 2 }}
                />{" "}
                <br />
              </Card>
            </Col>
            <Col span={12} style={{ textAlign: "center" }}>
              <Card
                title={<div>Options</div>}
                style={{ margin: 4, backgroundColor: "#fbfbfb" }}
              >
                Heart Opacity:{" "}
                <Slider
                  min={1}
                  max={10}
                  onChange={this.onChangeSliderOpacity}
                  value={this.state.opacity}
                  style={{ width: 500, textAlign: "center" }}
                />
                <br />
                Heart Size:{" "}
                <Slider
                  min={1}
                  max={this.state.heartSize + 200}
                  onChange={this.onChangeSliderHeartSize}
                  value={this.state.heartSize}
                  style={{ width: 500, textAlign: "center" }}
                />
                <Row>
                  <Col span={12}>
                    <Button onClick={this.onReset}>Reset</Button>
                  </Col>
                  <Col span={12}>
                    <Button
                      onClick={() => {
                        ReactGA.event({
                          category: AnalyticsCategoryEnum.HEART_IMAGE,
                          action: `Heart file Downloaded`
                        });
                        this.download(
                          "Heart_Image.jpg",
                          this.state.imageBlobURL
                        )
                      }}
                    >
                      Download Image
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
    const props = {
      name: "file",
      multiple: false,
      onChange(info) {}
    };
    return (
      <div style={{ textAlign: "center" }}>
        <Dragger
          accept="image/*"
          beforeUpload={this.fileChange}
          name="file"
          multiple={false}
        >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
        <br />
        {finalImage}
      </div>
    );
  }
}

export default EmbedImage;
