import React from "react";
import SearchType from "../home/SearchType";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import InstagramSearch from "../common/components/InstagramSearch";
import NewNotification from "../common/components/NewNotification";


class AccountChosen extends React.Component {
  constructor(props) {
    super(props);

  }

  onSelect = async (searchUser) => {
    this.props.onAccountChosen(searchUser);
  };


  render() {
    return <React.Fragment>
      <InstagramSearch
        type={SearchType.USERS}
        onSelect={this.onSelect}
        placeholder="Enter Instagram Username here & Select from list"
        clearStateOnSelection={false}
        analyticsCategory={
          AnalyticsCategoryEnum.SIMILAR_ACCOUNT
        }
      />
    </React.Fragment>
  }
}

export default AccountChosen