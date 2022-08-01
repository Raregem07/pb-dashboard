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
import PostsDisplay from "./PostsDisplay";
import DownloadFileInExcel from "../common/components/DownloadFileInExcel";
import SendEvent from "../common/Helpers/SendEvent";

const { Column } = Table;

const zip = new JSZip();

// Props: Detailed User, posts, Like Count Disabled, username
class NewShowPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    SendEvent(AnalyticsCategoryEnum.NEW_ANALYSE_POSTS, `Download Images Completed`, "");
    zip.generateAsync({ type: "blob" }).then(function(content) {
      saveAs(content, "instagram_posts_by_grambuddy");
    });
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
      return <div/>;
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

    return (
      <React.Fragment>
        <div style={{ textAlign: "center" }}>
          {this.state.loading ? <Spin /> : <div />}
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
                SendEvent(AnalyticsCategoryEnum.NEW_ANALYSE_POSTS, `Download Images & Videos button pressed`, "");
                this.downloadImagesVideos(this.props.posts);
              }}>
                Download all Images/Videos
              </Button>
            </Col>
          </Row>


        </div>
        <div style={{margin: 12}} className="center"><strong>Total Posts: {this.props.posts.length}</strong></div>
        <PostsDisplay
          posts={this.props.posts}
          detailedUser={this.props.detailedUser}
          likeCountDisabled={this.props.likeCountDisabled}
        />
      </React.Fragment>
    );
  }
}

export default NewShowPosts;
