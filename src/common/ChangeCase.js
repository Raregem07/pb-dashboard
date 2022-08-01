import LanguageCaseEnum from "./models/LanguageCaseEnum";

/**
 * @return {string}
 */
function ChangeCase(text, caseType) {
  if (text.length < 1) {
    return text;
  }
  if (caseType === LanguageCaseEnum.ALL_CAPS) {
    return text.toUpperCase();
  }
  if (caseType === LanguageCaseEnum.ALL_LOWER) {
    return text.toLowerCase();
  }
  if (caseType === LanguageCaseEnum.CAMEL_CASE) {
    return text.charAt(0).toUpperCase() + text.substring(1);
  }
}

export default ChangeCase;
