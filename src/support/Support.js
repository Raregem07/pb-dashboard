/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {Button, Card, Divider, Spin, Typography} from "antd";
import Faq from "react-faq-component";
import GetFAQs from "../common/api_call/GetFaqs";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import { Link } from "react-router-dom";

const {Title} = Typography;

class Support extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faqs: [],
      loading: true
    };
  }

  async componentDidMount() {
    let faqs = await GetFAQs();
    console.log(faqs, 'Class: FAQ, Function: , Line 21 faqs(): ');
    let finalFAQs = faqs.map(f => {
      return {title: f.q, content: f.a}
    });
    this.setState({faqs: finalFAQs, loading: false});
  }

  render() {
    if (this.state.loading) {
      return <div className="vertically-center">Loading ....<br/><Spin/></div>
    }
    const faq = this.state.faqs;
    let faqComponent = <h2>Coming soon ...</h2>;


    const styles = {
      bgColor: '#001628',
      titleTextColor: "#FFF",
      rowTitleColor: "#FFF",
      rowContentColor: '#FFF',
      arrowColor: "#FFF",
      rowContentPaddingTop: '1%',
      rowContentPaddingBottom: '1%',
      rowContentPaddingLeft: '1%',
      rowTitlePaddingLeft: '1%',
      rowContentPaddingRight: '1%',
      transitionDuration: "0.3s",
    };

    const config = {
      animate: true,
      // arrowIcon: "V",
      // tabFocus: true
    };

    if (faq.length !== 0) {
      faqComponent =
        <Card style={{
          marginLeft: "3%",
          marginRight: "6%",
          backgroundColor: "#001628",
          borderRadius: 6,
          boxShadow: "0px 3px 6px #00000029"
        }}>
          <Faq data={{title: "FAQs", rows: faq}} styles={styles} config={config}/>
        </Card>;
    }

    return <div style={{marginLeft: "4%", marginTop: "13%"}}>
      <Title level={4}>Please go through our FAQs first. If they don't answer your question, then only raise the
        ticket.</Title>
      <br/>
      {faqComponent}
      <Divider/>
      <div className="center">
        <Button type="primary">
          {/* <a href={ApplicationConstants.SUPPORT_LINK} target={"_blank"}>Raise Support Ticket</a> */}
          <Link to="../mail_support">Raise Support Ticket</Link>
        </Button>
      </div>

    </div>;
  }
}

export default Support