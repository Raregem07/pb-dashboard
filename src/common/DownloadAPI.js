/*global chrome*/


import SendEvent from "./Helpers/SendEvent";
import AnalyticsCategoryEnum from "./constants/AnalyticsCategoryEnum";

function DownloadAPI(data, columns, filename) {
  let rows = data;
  var csvFile = "";
  
  if (process.env.NODE_ENV === "development") {
    console.log(data, 'Class: DownloadAPI, Function: , Line 12 data(): ');
  }

  SendEvent(AnalyticsCategoryEnum.DOWNLOAD_DATA_IN_CSV, filename, "");

  columns.map(c => {
    csvFile += c.label + ","
  });
  csvFile = csvFile.substring(0, csvFile.length-1);
  csvFile += "\n";

  for (var i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i], columns);
  }
  var blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
  var url = URL.createObjectURL(blob);
  if (process.env.NODE_ENV === "production") {
    chrome.downloads.download({
      url: url,
      filename: filename+".csv"
    });
  } else {
    console.log(url, "Class: onButtonClick, Function: , Line 37 url(): ");
  }
}

function processRow(row, columns) {
  var finalVal = "";
  for (let i = 0; i < columns.length; i++) {
    let v = row[columns[i].value];
    if (!v) {
      finalVal += ",";
    } else {
      let stringV = v.toString();
      stringV = stringV.split(",").join(" | ");
      stringV = stringV.split("\n").join(" | ");
      finalVal += stringV + ",";

    }
  }
  finalVal = finalVal.substring(0, finalVal.length - 1);
  return finalVal + "\n";
}



export default DownloadAPI;
