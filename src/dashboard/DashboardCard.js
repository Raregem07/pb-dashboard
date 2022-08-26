/* eslint-disable no-unused-vars */
import React from "react";
import FeatureList from "./FeatureList";
import FeatureDetails from "../home/FeatureDetails";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";


// title, color1, color2, identifier, features
function DashboardCard(props) {
   // const tier1Card = FeatureDetails.TIER_1.MAIN_CARD;
   const tier2Card = FeatureDetails.TIER_2.MAIN_CARD;
   const tier3Card = FeatureDetails.TIER_3.MAIN_CARD;

  let icon = <img src={props.img} alt="main_icon_image" height={"35%"} width={"35%"}/>;
  let paddingTop = "10%";
  let iconPaddingTop = "9%";
  if (props.title === `${FeatureDetails.TIER_3.MAIN_CARD.TITLE}`) {
    paddingTop = "5%";
    icon = <img src={props.img} alt="main_icon_image" height={"40%"} width={"40%"}/>;

  }
  if (props.title === `${FeatureDetails.TIER_2.MAIN_CARD.TITLE}`) {
    paddingTop = "5%";
    iconPaddingTop = "9%";
    icon = <img src={props.img} alt="main_icon_image" height={"15%"} width={"50%"}/>;
  }
  return <React.Fragment>
    <div className="cardWrapper">
    <Link
            className="link"
            to={`${FeatureDetails.TIER_2.ACTION}`}
            onClick={() => {
              ReactGA.event({
                category: AnalyticsCategoryEnum.MAIN_DASHBOARD_OPTION_CHOSE,
                action: `analytics`
              });
            }}
          >
      <div className="leftBox" style={{background:"#006601",padding:"15px 30px", marginLeft:"50px", borderRadius:"8px"}}>
        <div>{icon}</div>
        <div style={{fontSize:"20px",fontWeight:"bold",color:"white"}}>{props.title}</div>
      </div>
      </Link>
      <div>
        <FeatureList
            features={props.features}
            oneIcon={props.oneIcon}
          />
      </div>
    </div>
    {/* <div
      style={{
        width: "100%",
        backgroundColor: "#FFF",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        boxShadow: "0px 3px 10px #00000029",
        marginLeft: "1%",
        marginRight: "1%"
      }}>
      <div style={{
        minHeight: "24vh",
        textAlign: "center",
        background: props.background,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
      }}>
        <div style={{
          paddingTop: iconPaddingTop
        }}>
          {icon}
        </div>
        <div style={{
          color: "#FFF",
          fontSize: "170%",
          paddingTop: paddingTop,
          paddingLeft: "1%",
          paddingBottom: "2%",
          paddingRight: "1%",
          fontWeight: "bold"
        }}>
          {props.title}
        </div>
      </div>

      <div style={{
        backgroundColor: "#FFF",
        minHeight: "35vh",
        marginRight: "4%",
        marginLeft: "4%",
        paddingBottom: "1.3%"
      }}>
        <FeatureList
          features={props.features}
          oneIcon={props.oneIcon}
        />
      </div>
      {/*<div className="center" style={{marginRight: "4%", marginLeft: "4%", paddingBottom: "1.3%"}}>*/}

      {/*</div>*/}
    {/* </div> */} 
    <style jsx>{`
        .cardWrapper {
          display: flex;
          padding: 30px;
          gap: 100px;
          justify-content: flex-start;
          align-items: center;
          background: linear-gradient(to right, #FFF, #33814B, #1D713F);
          width: 70%;
          margin: 0 auto;
        }

        .leftBox:hover {
          background: #047504 !important;
          box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
        }
    `}</style>
  </React.Fragment>;
}

export default DashboardCard;
