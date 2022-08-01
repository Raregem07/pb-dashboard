import React from 'react';
import HashtagTags from "../analyse_user/HashtagTags";
import { Button, Card, Col, Row } from "antd";
import { CSVLink } from "react-csv";
import ReactGA from "react-ga";
import RelatedHashtags from "../related_hashtags/RelatedHashtags";
import DownloadFileInExcel from "../common/components/DownloadFileInExcel";

function convertHashtagsToData(data) {
  let deepCopyData = JSON.parse(JSON.stringify(data));
  return deepCopyData.sort((a,b) => a['count']>b['count']? -1 : 1);
}

function ShowHashtags(props) {
  let hashtagsToken = RelatedHashtags.extractTokensFromPosts(props.posts, "#");
  const downloadData = convertHashtagsToData(hashtagsToken);
  let columns = [
    {label: "Hashtag Name", value: "name"},
    {label: "Count", value: "count"},
  ];
  return <Card title="Hashtag Analysis of the posts">
    <Row>
      <Col span={16}>Top 10 Hashtags: <HashtagTags
        tagsAndCounts={hashtagsToken.slice(0,10)}
        onTagClick={() => {}}
        justShowTags={true}
      /></Col>
      <Col span={8}>
        <DownloadFileInExcel
          filename={"Hashtags_Summary_by_ProfileMate"}
          columns={columns}
          data={downloadData}
          blueButton={false}
          buttonName="Download all hashtags in XLS (Excel)"
        />
      </Col>
    </Row>
  </Card>
}


export default ShowHashtags;

