import React from "react";
import { Avatar, Button, Checkbox, Col, Row, Spin, Table } from "antd";
import { CSVLink } from "react-csv";
import ReactGA from "react-ga";
import DataDownloader from "../analytics/DataDownloader";
import DownloadPostAsFile from "../common/api_call/DownloadPostAsFile";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import ApiError from "../common/models/ApiError";
import SaveError from "../common/store/SaveError";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import DownloadFileInExcel from "../common/components/DownloadFileInExcel";

const { Column } = Table;

const zip = new JSZip();


class ShowPostsAndOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likesDataNeeded: true,
      commentsDataNeeded: true,
      selectedRowKeys: [],
      loading: false
    };
  }

  downloadImagesVideos = async (posts) => {
    let images = zip.folder("instagram_posts_by_grambuddy");
    this.setState({loading: true});
    for (let i = 0; i < posts.length; i++) {
      let url = posts[i].is_video ? posts[i].video_url : posts[i].display_url;
      let blob;
      try {
        let response = await fetch(url);
        blob = response.blob();
      } catch(e) {
        let detailedError = "could not fetch one of the post url in analyse post";
        let error = new ApiError(e, detailedError, "This seems like an error on instagram side regarding bad url");
        await SaveError(error);
        ReactGA.event({
          category: AnalyticsCategoryEnum.API_ERROR,
          action: "get image/video for download in download posts",
          label: `Status_Code: ${error.status}`
        });
        continue;
      }
      let extension = ".jpeg";
      if (posts[i].is_video) {
        extension = ".mp4";
      }
      images.file(`${i + 1}${extension}`, blob, { binary: true });
    }
    this.setState({loading: false});

    zip.generateAsync({ type: "blob" }).then(function(content) {
      saveAs(content, "instagram_posts_by_grambuddy");
    });
  };

  onCheckboxLikeChange = e => {
    this.setState({ likesDataNeeded: e.target.checked });
  };

  onCheckboxCommentChange = e => {
    this.setState({ commentsDataNeeded: e.target.checked });
  };

  onSubmit = () => {
    let selectedPosts = [];
    // console.log(this.state.selectedRowKeys, "Class: ShowPostsAndOptions, Function: , Line 27 this.state.selectedRowKeys(): ");
    for (let i = 0; i < this.state.selectedRowKeys.length; i++) {
      selectedPosts.push(this.props.posts[this.state.selectedRowKeys[i]]);
    }
    this.props.selectedPostsAndOptionsForAnalysis(
      selectedPosts,
      this.state.likesDataNeeded,
      this.state.commentsDataNeeded
    );
    this.setState({ selectedRowKeys: [] });
  };

  getPostEngagement(post, followerCount) {
    if (followerCount === 0) {
      return "Not available";
    }
    let commentCount = post.comment_count;
    let likeCount = post.like_count;
    if (this.props.likeCountDisabled) {
      return ((commentCount)*100/followerCount).toFixed(2);
    }
    return ((commentCount + likeCount)*100/followerCount).toFixed(2);
  }

  postData = () => {
    let posts = this.props.posts;
    let key = 0;
    let followerCount = 0;
    if (this.props.detailedUser !== null) {
      followerCount = this.props.detailedUser.followerCount;
    }
    return posts.map(p => ({
      key: key++,
      postURL: p.display_url,
      postBio: p.text,
      likeCount: p.like_count,
      commentCount: p.comment_count,
      postDate: p.postDateInReadableFormat(),
      isVideo: p.is_video,
      videoURL: p.video_url,
      postEngagement: this.getPostEngagement(p, followerCount)
    }));
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  downloadPostsSendEvent = (type) => {
    ReactGA.event({
      category: type,
      action: `Download Button Clicked`
    });
  };

  getPostsData() {

    let posts = this.props.posts;
    return posts.map(d => {
      d["is_video_string"] = DataDownloader.makeTrueFalseAsString(d["is_video"]);
      d["time_of_post"] = d.postDateInReadableFormat();
      d["post_url"] = "https://www.instagram.com/p/"+d.shortcode+"/";
      d["text"]=d.text;
      return d;
    });
  }

  render() {
    if (this.props.posts.length === 0) {
      return <div />
    }
    if (!this.props.showPosts) {
      return <div style={{
        margin: 16
      }}>
        <Button icon="step-backward" onClick={this.props.showPostsButtonPressed}>Go Back to Posts</Button>
      </div>
    }
    let columns = [
      {label: "ID", value: "id"},
      {label: "Comments Count", value: "comment_count"},
      {label: "Likes Count", value: "like_count"},
      {label: "Time of Post", value: "time_of_post"},
      {label: "Is video?", value: "is_video_string"},
      {label: "Post URL", value: "post_url"},
      {label: "Post Caption", value: "text"},
    ];
    let xlsData = this.getPostsData();

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <React.Fragment>
        <div style={{ textAlign: "center" }}>
          {this.state.loading ? <Spin size="large" /> : <div />}
          <div style={{
            width: "93%",
            height: 60,

            margin: 16,
            padding: 12,

            backgroundColor: "white",

            fontSize: 20,
            boxShadow: "0px 3px 6px #00000029",
            borderRadius: 11,
            font: "Medium 32px/38px Roboto",
            color: "#707070",
          }}>
          <Row gutter={24}>
            <Col span={12}>
              <DownloadFileInExcel
                filename="posts_data"
                columns={columns}
                data={xlsData}
                blueButton={true}
                buttonName="Download Posts Data in XLS (Excel)"
              />
            </Col>
            <Col span={12}>
              <Button type="primary" icon="download" style={{ marginBottom: 16 }} onClick={() => {
                this.downloadImagesVideos(this.props.posts);
              }}>
                Download all Images/Videos
              </Button>
            </Col>
          </Row>
          </div>


          <div style={{
            width: "93%",
            height: "20%",

            margin: 8,
            paddingTop: 4,
            paddingBottom: 4,

            backgroundColor: "white",

            fontSize: 20,
            boxShadow: "0px 3px 6px #00000029",
            borderRadius: 11,
            font: "Medium 32px/38px Roboto",
            color: "#707070",
          }}>
          Select the posts by checkmarking the post from below for which you want likers/commenters analysis<br />
          <Checkbox
            onChange={this.onCheckboxLikeChange}
            defaultChecked={this.state.likesDataNeeded}
          >
            Likers
          </Checkbox>
          <Checkbox
            onChange={this.onCheckboxCommentChange}
            defaultChecked={this.state.commentsDataNeeded}
          >
            Commenters
          </Checkbox> &nbsp; &nbsp;
          <Button onClick={this.onSubmit} disabled={!hasSelected}>
            Submit
          </Button>
          </div>
        </div>
        <div style={{margin: 12}} className="center"><strong>Total Posts: {this.props.posts.length}</strong></div>
        <Table
          pagination={{
            pageSize: 50,
            pageSizeOptions: ["50", "100", "500", "1000", "10000"],
            showSizeChanger: true
          }}
          rowSelection={rowSelection}
          dataSource={this.postData()}
        >
          <Column
            title="Post Display"
            dataIndex="postURL"
            key="postURL"
            render={(cell, row, index) => {
              return <Avatar shape="square" size={128} src={cell}/>;
            }}
          />
          <Column title="Post Bio" dataIndex="postBio" key="postBio"/>
          <Column
            title={this.props.likeCountDisabled ? "Comment Engagement on Post" : "Post Engagement"}
            dataIndex="postEngagement"
            key="postEngagement"
            sorter={(a, b) => a.postEngagement - b.postEngagement}
            render={(cell, row, index) => {
              return <div>{cell}%</div>
            }}
          />
          {this.props.likeCountDisabled ? <React.Fragment /> : <Column
            title="Like Count"
            dataIndex="likeCount"
            key="likeCount"
            sorter={(a, b) => a.likeCount - b.likeCount}
          />}
          <Column
            title="Comment Count"
            dataIndex="commentCount"
            key="commentCount"
            sorter={(a, b) => a.commentCount - b.commentCount}
          />

          <Column
            title="Download"
            key="download"
            render={(cell, row, index) => {
              return <Button icon="download" onClick={() => {
                DownloadPostAsFile(cell.isVideo, cell.postURL, cell.videoURL, cell.postDate);
              }}/>;
            }}
          />
          <Column title="Post Date" dataIndex="postDate" key="postDate"/>
        </Table>
      </React.Fragment>
    );
  }
}

export default ShowPostsAndOptions;
