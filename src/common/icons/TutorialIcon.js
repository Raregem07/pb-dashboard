import React from "react";
import { Icon } from "antd";

const TutorialSVG = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 38.105">
  <path className="tutorial-icon"
        d="M56.584,0H82.237a1.029,1.029,0,0,1,1.025,1.026v28.63c-.045.8-1.078.818-2.194.77H56.206a2.806,2.806,0,1,0,0,5.612H81.068V33.052h2.194v3.8A1.26,1.26,0,0,1,82,38.1H56.313a5.065,5.065,0,0,1-5.051-5.051V5.323A5.338,5.338,0,0,1,56.584,0Zm.989,4.155h.887a.76.76,0,0,1,.823.667V25.744a.76.76,0,0,1-.823.667h-.887a.76.76,0,0,1-.823-.667V4.821a.76.76,0,0,1,.823-.667Z"
        transform="translate(-51.262)"/>
</svg>);


const TutorialIcon = props => <Icon component={TutorialSVG} {...props} />;

export default TutorialIcon;
