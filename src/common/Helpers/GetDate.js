import moment from "moment";

function GetDate() {
  return moment(new Date()).format("MM/DD/YYYY");
}

export default GetDate;
