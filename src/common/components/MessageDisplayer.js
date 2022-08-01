import React from 'react';
import Icons from "./Icons";

function MessageDisplayer(props) {
  return props.messageToShow.length > 0 ?
    <div style={{ backgroundColor: '#f5f5f5', textAlign: "center", padding: 4, margin: 4, marginBottom: 12 }}>{Icons.INFO}&nbsp;&nbsp;{props.messageToShow}
    </div>
    : <React.Fragment/>;
}

export default MessageDisplayer;
