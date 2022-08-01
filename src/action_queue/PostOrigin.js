import React from 'react';
import {Card, Avatar, Tooltip} from "antd";
import UserPostOriginEnum from "../common/models/UserPostOriginEnum";

const {Meta} = Card;

class PostOrigin extends React.Component {
  constructor(props) {
    super(props);
  }

  static getTitleFromOrigin(origin) {
    let title;
    if (origin.type === UserPostOriginEnum.HASHTAG_POST) {
        title="Hashtag - #" + origin.hashtag.name;
    }
    else if (origin.type === UserPostOriginEnum.LOCATION_POST) {
        title="Location - 📍" + origin.location.title
    }
    else if (origin.type === UserPostOriginEnum.SIMILAR_ACCOUNT_FOLLOWER_POST) {
      title = `Follower of ${origin.similarAccount.username}`;
    }
    else if (origin.type === UserPostOriginEnum.SIMILAR_ACCOUNT_POSTS_LIKER_POST) {
      title = `Liker of ${origin.similarAccount.username}`;
    }
    else if (origin.type === UserPostOriginEnum.SIMILAR_ACCOUNT_POSTS_COMMENTER_POST) {
      title = `Commenter of ${origin.similarAccount.username}`;
    }
    return title;
  }

  render() {
    let origin = this.props.origin;
    let mainOriginTag;
    if (origin.type === UserPostOriginEnum.HASHTAG_POST) {
      mainOriginTag = <Meta
        title={"Hashtag - #" + origin.hashtag.name}
      />
    }
    else if (origin.type === UserPostOriginEnum.LOCATION_POST) {
      mainOriginTag = <Meta
        title={"Location - 📍" + origin.location.title}
      />
    }
    else if (origin.type === UserPostOriginEnum.SIMILAR_ACCOUNT_FOLLOWER_POST) {
      let title = `Follower of ${origin.similarAccount.username}`;
      mainOriginTag = <Meta
        description={title}
        avatar={<Avatar src={origin.similarAccount.profileURL} />}
      />
    }
    else if (origin.type === UserPostOriginEnum.SIMILAR_ACCOUNT_POSTS_LIKER_POST) {
      let title = `Liker of ${origin.similarAccount.username}`;
      mainOriginTag = <Meta
        description={title}
        avatar={<Avatar src={origin.similarAccount.profileURL} />}
      />
    }
    else if (origin.type === UserPostOriginEnum.SIMILAR_ACCOUNT_POSTS_COMMENTER_POST) {
      let title = `Commenter of ${origin.similarAccount.username}`;
      mainOriginTag = <Meta
        description={title}
        avatar={<Avatar src={origin.similarAccount.profileURL} />}
      />
    }
    else {
      let title = origin.type;
      mainOriginTag = <Meta
        description={title}
      />
    }

    return <Tooltip title="Why this task? Because of the reason mentioned.">{mainOriginTag}</Tooltip>
  }
}

export default PostOrigin;
