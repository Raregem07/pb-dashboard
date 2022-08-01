/*global chrome*/

import React from "react";
import { Button } from "antd";
import ReactExport from "react-export-excel";
import SendEvent from "../Helpers/SendEvent";
import AnalyticsCategoryEnum from "../constants/AnalyticsCategoryEnum";

/* props:
- filename: string
- columns: [
  {label: "Username", value: "username"},
]
- data: [{username: "abhnv_rai", ....}, ]
- blueButton: true/false
- buttonName

 */

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


function DownloadFileInExcel(props) {
  let filename = props.filename + ".xlsx";
  let className = "";
  if (props.blueButton) {
    className = "primary";
  }
  let data = props.data;
  let buttonName = props.buttonName;
  let columns = props.columns;

  let columnElements = [];
  for (let i = 0; i < columns.length; i++) {
    columnElements.push(
      <ExcelColumn label={columns[i].label} value={columns[i].value}
                   key={"download_column_" + filename + i.toString()}/>
    );
  }

  return <React.Fragment>
    <ExcelFile filename={filename} element={
      <Button type={className} icon="download" onClick={() => {
        SendEvent(AnalyticsCategoryEnum.DOWNLOAD_IN_EXCEL, props.filename, "");
      }}>
        {buttonName}
      </Button>
    }>
      <ExcelSheet data={data} name="data_by_profilebud">
        {columnElements}
      </ExcelSheet>
    </ExcelFile>
  </React.Fragment>;
}

export default DownloadFileInExcel;
