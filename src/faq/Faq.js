import React from "react";
import ReactMarkdown from "react-markdown";
import { AppContext } from "../home/Home";

const styles = {
  // bgColor: 'white',
  titleTextColor: "grey",
  rowTitleColor: "#7741A6",
  rowContentColor: "black"
  // arrowColor: "red",
};

class Faq extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            fontSize: "300%",
            marginLeft: "6%",
            marginTop: "1%",
            font: "Black 64px/77px Roboto",
            color: "#001529",
            fontWeight: "bold"
          }}
        >
          FAQs
        </div>
        <div
          style={{
            margin: "4%",
            padding: "4%",
            fontSize: "170%"
          }}
        >
          <ul>
            <li>
              <a href="https://profilemate.wordpress.com/2020/10/02/limits-per-day-for-profilemate/" target="_blank">What are limits per day with Profilebuddy?</a><br />
            </li>
            <li>
              <a href="https://profilemate.wordpress.com/2020/10/02/how-to-rotate-instagram-accounts-to-reset-limits-in-profilemate/" target="_blank">How to Reset Per day limits and get more Users in a day??</a><br />
            </li>
            <li>
              <a href="https://profilemate.wordpress.com/2020/10/01/extract-list-of-followers-of-any-instagram-account/" target="_blank">How to Extract List of Followers and handling cooldown?</a><br />
            </li>
            <li>
              <a href="https://profilemate.wordpress.com/2020/10/01/extract-3x-more-emails-using-profilemate/" target="_blank">Analyse More than 2k users with FrontEnd Profilebuddy?</a><br />
            </li>
            <li>
              <a href="https://profilemate.wordpress.com/2020/10/02/how-to-use-whitelabel-for-profilemate/" target="_blank">How to use Whitelabel?</a><br />
            </li>
          </ul>
          <ReactMarkdown source={this.props.context.faq} />
        </div>
      </React.Fragment>
    );
  }
}

export default props => (
  <AppContext.Consumer>
    {context => <Faq context={context} {...props} />}
  </AppContext.Consumer>
);
