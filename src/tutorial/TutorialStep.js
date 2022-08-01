import React from 'react';
import { Divider, Typography } from "antd";
const { Text } = Typography;

function getBoldText(text) {
  let texts = [];
  let t = text.split("*");
  let i=0;
  t.map(t1 => {
    if (i%2 === 0) {
      texts.push(<Text strong={false}>{t1}</Text>)
    } else {
      texts.push(<Text strong={true}>{t1}</Text>)
    }
    i++;
  });

  return <Text>
    {texts}
  </Text>
}

function TutorialStep(props) {
  let imgSrc;
  if (props.image) {
    imgSrc = `https://api.profilebud.com/${props.image}.gif`;
  }
  if (props.pngImage) {
    imgSrc = `https://api.profilebud.com/${props.pngImage}.png`
  }
  return <React.Fragment>
    <div style={{
      padding: "2%",
      fontSize: "130%",
      marginLeft: "1%",
      marginRight: "1%",

    }}>
      <strong>Step {props.step}</strong>:&nbsp;
      <Text>{getBoldText(props.name)}</Text>
      {props.image ? <div style={{paddingTop: "2%", marginLeft: "6%"}}><img src={imgSrc} width={"90%"} alt={props.name}/></div> : <React.Fragment />}
      {props.pngImage ? <div style={{paddingTop: "2%", marginLeft: "6%"}}><img src={imgSrc} width={"90%"} alt={props.name}/></div> : <React.Fragment />}
    </div>
  </React.Fragment>
}

export default TutorialStep;
