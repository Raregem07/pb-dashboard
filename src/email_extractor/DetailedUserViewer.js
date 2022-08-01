import React from 'react';
import { Button, Card, Col, Row } from "antd";
import Icons from "../common/components/Icons";
import ProgressBar from "../common/components/ProgressBar";

// usersScrapedSoFar, totalUsers, detailedAnalysisState, changeDetailedUserState
class DetailedUserViewer extends React.Component {
  constructor(props) {
    super(props);
  }

  getButtonClassName = () => {
    if (this.props.detailedAnalysisState) {
      return "danger"
    }
    return "primary";
  };

  getButtonName = () => {
    if (this.props.detailedAnalysisState) {
      return "Stop Extracting Users"
    }
    return "Continue Extracting Users";
  };

  changeScrapingState = () => {
    this.props.changeDetailedUserState(!this.props.detailedAnalysisState);
  };


  render() {
    return <React.Fragment>
      <Card
        title={
          <div>
            <Row>
              <Col span={1}>{Icons.USER}</Col>
              <Col span={5}>User Details Extractor</Col>
            </Row>
          </div>
        }
        style={{ margin: 4, marginBottom: 12, marginTop: 12, backgroundColor: "#fbfbfb" }}
      >
        <div className="center">
          <ProgressBar notShowOnZero={true} percentage={Math.ceil((100 * this.props.usersScrapedSoFar)/this.props.totalUsers)}/>
          <div>
            Status: {this.props.usersScrapedSoFar}/{this.props.totalUsers}
          </div>
        </div>
      </Card>
    </React.Fragment>
  }

}

export default DetailedUserViewer;
