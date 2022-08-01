import moment from "moment";

/**
 * @return {string}
 */
function DateInReadableFormat(epochS) {
  return new moment(epochS * 1000).format("h:mm A, MMMM Do YYYY");
}

export default DateInReadableFormat;
