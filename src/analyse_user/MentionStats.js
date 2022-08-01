import React from 'react';
import RelatedHashtags from "../related_hashtags/RelatedHashtags";
import { Button, Card, Col, Row, Table } from "antd";
import Icons from "../common/components/Icons";
import { CSVLink } from "react-csv";
import ReactGA from "react-ga";
import DownloadFileInExcel from "../common/components/DownloadFileInExcel";

const {Column} = Table;

function downloadButtonPressed(type) {
  ReactGA.event({
    category: type,
    action: `Download Button Clicked`
  });
}

function MentionStats(props) {
  let posts = props.posts;
  let mentions = RelatedHashtags.extractTokensFromPosts(posts, "@");


  let columns = [
    {label: "Username Mentioned", value: "name"},
    {label: "Number of times", value: "count"},
    ];
  let deepCopyData = JSON.parse(JSON.stringify(mentions));
  deepCopyData = deepCopyData.sort((a,b) => a['count']>b['count']? -1 : 1);

  return <Card
    title={<div>
      <Row>
        <Col span={12}>{Icons.MENTION} &nbsp;&nbsp;&nbsp;User Mentions
        </Col>
        <Col span={12}>
          <DownloadFileInExcel
            filename="user_mentions"
            columns={columns}
            data={deepCopyData}
            blueButton={false}
            buttonName="Download Data in XLS (Excel)"
          />
        </Col>

      </Row>
    </div>}
    style={{ margin: 12, backgroundColor: "#fbfbfb"}}
  >
    <Table dataSource={mentions} rowKey="name" scroll={{ y: 240 }} pagination={false}>
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Count" dataIndex="count" key="count" />
    </Table>
  </Card>;
}

export default MentionStats;
