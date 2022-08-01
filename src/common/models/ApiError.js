import moment from "moment";

class ApiError {
  constructor(axiosError, detailedError, displayLine) {
    let status=400;
    if (axiosError.response && axiosError.response.status) {
      status = axiosError.response.status;
    }
    this.status = status;
    this.time =  moment(new Date().getTime()).format('h:mm A, MMMM Do, YYYY');
    this.timeInEpoch = (new Date()).getTime();
    this.detailedError = detailedError;
    this.displayLine = displayLine;
  }
}

export default ApiError;
