import React from "react";
import {Button} from "antd";
import moment from "moment";
import DownloadAPI from "../common/DownloadAPI";
import Icons from "../common/components/Icons";


class DownloadSimilarUsers extends React.Component {
  constructor(props) {
    super(props);
  }

  downloadData = (similarAccounts, mainAccountName) => {
    let columns = [
      { label: "Username", value: "username" },
      { label: "Full Name", value: "full_name" },
      { label: "Is Private", value: "is_private" },
      { label: "Instagram id of User", value: "id" },
      { label: "Profile Pic URL", value: "profile_pic_url" }
    ];
    DownloadAPI(similarAccounts, columns, mainAccountName+"_similar_users")
  }

  render() {
    if (this.props.similarAccounts.length < 1) {
      return <React.Fragment />
    }
    return <div className="center">
      <Button type={"primary"} onClick={() => {this.downloadData(this.props.similarAccounts, this.props.similarAccountName); this.props.downloadPressed()}}>Download {Icons.DOWNLOAD}</Button>
    </div>
  }
}

export default DownloadSimilarUsers