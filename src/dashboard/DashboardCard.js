import React from "react";
import FeatureList from "./FeatureList";
import FeatureDetails from "../home/FeatureDetails";


// title, color1, color2, identifier, features
function DashboardCard(props) {
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
    icon = <img src={props.img} alt="main_icon_image" height={"15%"} width={"30%"}/>;
  }
  return <React.Fragment>
    <div
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
    </div>
  </React.Fragment>;
}

export default DashboardCard;
