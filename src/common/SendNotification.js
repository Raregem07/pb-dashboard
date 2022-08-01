import {Icon, notification} from "antd";
import React from "react";
import NotificationTypeEnum from "./models/NotificationTypeEnum";

function sendNotification(title, message, isLong=false) {
  let icon;
  if (title === NotificationTypeEnum.Failure) {
    icon = <Icon type="frown" style={{color: '#108ee9'}}/>;
  } else {
    icon = <Icon type="smile" style={{color: '#108ee9'}} />
  }
  let duration = 7;
  if (isLong) {
    duration = 20;
  }
  notification.open({
    message: title,
    description:
    message,
    icon: icon,
    duration: duration
  });
}

export default sendNotification;
