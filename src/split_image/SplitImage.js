import React from "react";
import { Card, Col, Icon, InputNumber, Row, Upload } from "antd";
import ReactCrop from "react-image-crop";
import { blobToDataURL } from "blob-util";
import "react-image-crop/dist/ReactCrop.css";
import SplitImagesViewer from "./SplitImagesViewer";
import DownloadImages from "./DownloadImages";
import NeedHelp from "../common/components/NeedHelp";
import NeedHelpEnum from "../common/models/NeedHelpEnum";

const { Dragger } = Upload;

class SplitImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 1
      },
      dividedImages: null,
      rows: 3,
      columns: 3,
      src: null
    };
  }

  fileChange = file => {
    this.makeSrcForFile(file);
    return false;
  };

  makeSrcForFile = async file => {
    var src = await blobToDataURL(file);
    this.setState({ src });
  };

  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      let a = this.state.rows,
        b = this.state.columns;
      let width = Math.ceil(crop.width / b);
      let height = Math.ceil(crop.height / a);
      let newCrop = {
        x: null,
        y: null,
        width: width,
        height: height,
        unit: "px"
      };
      let dividedImages = [];
      for (let i = 0; i < a; i++) {
        let dividedImagesX = [];
        newCrop.y = crop.y + height * i;
        for (let j = 0; j < b; j++) {
          newCrop.x = crop.x + width * j;
          let name = `${i}-${j}.png`;
          dividedImagesX.push(
            this.getCroppedImg(this.imageRef, newCrop, name)
          );
        }
        dividedImages.push(dividedImagesX);
      }
      this.setState({ dividedImages });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return ctx.canvas.toDataURL(image);
  }

  setAspectRatio() {
    let { rows, columns } = this.state;

    let crop = { ...this.state.crop };
    crop.aspect = columns / rows;
    this.setState({ crop });
  }

  changeRows = v => {
    this.setState({ rows: v }, () => {
      this.setAspectRatio();
    });
  };

  changeColumns = v => {
    this.setState({ columns: v }, () => {
      this.setAspectRatio();
    });
  };

  displayCropper() {
    return (
      <Row gutter={24}>
        <Col span={16}>
          <div className="center">
            <ReactCrop
              src={this.state.src}
              crop={this.state.crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
              style={{ maxWidth: 600 }}
            />
          </div>
        </Col>
        <Col span={8}>
          <div className="center">
            <br />
            <br />
            Rows:{" "}
            <InputNumber
              defaultValue={this.state.rows}
              onChange={this.changeRows}
            />
            Columns:{" "}
            <InputNumber
              defaultValue={this.state.columns}
              onChange={this.changeColumns}
            />
          </div>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <React.Fragment>
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
        {this.state.src ? (
          <div>
            <br />
            {this.displayCropper()}
            <br />
            {this.state.dividedImages ? (
              <Card title="Preview" className="center">
                <Row gutter={24}>
                  <Col span={18}>
                    <SplitImagesViewer images={this.state.dividedImages} />{" "}
                  </Col>
                  <Col span={6}>
                    <DownloadImages images={this.state.dividedImages} />
                  </Col>
                </Row>
              </Card>
            ) : (
              <div />
            )}
          </div>
        ) : (
          <div />
        )}
      </React.Fragment>
    );
  }
}

export default SplitImage;
