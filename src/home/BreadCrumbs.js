import React from 'react';
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

function BreadCrumbs(props) {
  let crumbs = [<Breadcrumb.Item key="home_crumb">
    <Link className="link" to={"/"} id={window.location.hash === "#/analytics/similar_account" ? "hide" : ""}>
      Dashboard
    </Link>
  </Breadcrumb.Item>].concat(props.crumbs.map(
    c => {
      return <Breadcrumb.Item key={c.action+"crumb"}>
        <Link className="link" to={c.action} key={c.action+"link"}>
          {c.name}
        </Link>
      </Breadcrumb.Item>
    }
  ));
  crumbs = crumbs.slice(0,crumbs.length - 1);
  crumbs.push(<Breadcrumb.Item key={"current_page_crumb"}>
    {props.crumbs[props.crumbs.length - 1].name}
  </Breadcrumb.Item>);
  return <React.Fragment>
    <Breadcrumb style={{ fontSize: "110%", fontWeight: "bold", marginLeft: 32}}>
      {crumbs}
    </Breadcrumb>
    <style jsx>{`
      #hide {
        display: none;
      }
    `}</style>
  </React.Fragment>
}

export default BreadCrumbs;
