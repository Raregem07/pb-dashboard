import React from "react";
import { Button } from "antd";
import DownloadAPI from "../common/DownloadAPI";

class UnprocessedUsernames extends React.Component {
  constructor(props) {
    super(props);
  }

  downloadUnprocessed = () => {
    let columns = [
      { label: "Username", value: "username" }
    ];
    let allUsernames = this.props.allUsernames;
    let processedUsernames = this.props.processedUsernames;
    let processedUsernamesMap = {};
    processedUsernames.map(du => {
      processedUsernamesMap[du.username] = true;
    });
    for (let i=processedUsernames.length-1;i>=0;i--) {
      if (processedUsernames[i] && processedUsernames[i].email && processedUsernames[i].isEmailUser) {
        console.log(i, processedUsernames.length, processedUsernames[i], 'Line 25 | Class: UnprocessedUsernames | Function: downloadUnprocessed: ')
        break;
      }
      processedUsernamesMap[processedUsernames[i].username] = false;
    }

    let unprocessedUsernames = [];
    allUsernames.map(u => {
      if (!processedUsernamesMap[u]) {
        unprocessedUsernames.push({ username: u });
      }
    });
    DownloadAPI(unprocessedUsernames, columns, "Unprocessed_Usernames");
  };

  render() {
    return <React.Fragment>
      <Button onClick={this.downloadUnprocessed}>Download Usernames which didn't get Process</Button>
    </React.Fragment>;
  }
}

export default UnprocessedUsernames;