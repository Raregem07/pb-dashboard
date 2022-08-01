import { notification } from "antd";
import React from "react";

function NewNotification(title, message, isLong = false) {
  let duration = 7;
  if (isLong) {
    duration = 20;
  }
  notification.open({
    message: title,
    description: message,
    duration: duration
  });
}

export default NewNotification;
