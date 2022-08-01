import OptionsModel from "../models/OptionsModel";
import AutomationBrain from "../../home/AutomationBrain";
import SpeedOptionsEnum from "../models/SpeedOptionsEnum";
import TaskEnum from "../../analytics/TaskEnum";
import ApplicationConstants from "./ApplicationConstants";

let ab = new AutomationBrain();
let likeDelay = 0;
let followDelay = 0;
let commentDelay = 0;

const OptionsDefaultValue = new OptionsModel(50, 50, followDelay, likeDelay, 1, ApplicationConstants.SLEEP_TIME_BEFORE_NEXT_REQUEST, commentDelay, SpeedOptionsEnum.MEDIUM);

export default OptionsDefaultValue;