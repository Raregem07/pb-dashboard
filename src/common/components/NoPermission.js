import React from "react";
import NoPermissionImg from "../images/no_permission.png";
import ApplicationConstants from "../constants/ApplicationConstants";


function NoPermission(props) {
  return <React.Fragment>
    <div style={{
      textAlign: "center"
    }}>
      <img src={NoPermissionImg} alt="no permission" height={200}/>
      <br/>
      <div style={{
        font: "Black 46px/56px Roboto;",
        fontSize: "180%",
        marginTop: "4%",
        color: "#001529",
        fontWeight: "bold"
      }}>
        Uh oh!
      </div>
      <div style={{
        font: "Regular 32px/38px Roboto;",
        fontSize: "150%",
        marginTop: "2%",
        color: "#001529"
      }}>
        To access Users by <strong>{props.type}</strong>, you need to purchase the subscription below.
      </div>
      <br/>
      <a style={{
        backgroundColor: "black",
        paddingTop: "1%",
        paddingBottom: "1%",
        color: "white",
        paddingLeft: "2%",
        paddingRight: "2%",
        fontSize: "160%"
      }}
      href={ApplicationConstants.JVZOO.PREMIUM_PURCHASE_LINK}
         target="_blank"
      >
        Buy Now
      </a>
    </div>
  </React.Fragment>;
}

export default NoPermission;
