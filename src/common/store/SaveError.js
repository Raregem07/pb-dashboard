import ConcatToArray from "./ConcatToArray";
import DatabaseKeys from "../models/DatabaseKeys";

async function SaveError(apiError) {
  await ConcatToArray(DatabaseKeys.API_ERROR, [apiError])
}
export default SaveError;
