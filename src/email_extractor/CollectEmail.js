import DatabaseKeys from "../common/models/DatabaseKeys";
import GetOrSetValue from "../common/store/GetOrSetValue";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import SaveObject from "../common/chrome/SaveObject";
import CollectEmails from "../common/api_call/CollectEmails";

async function AddToPot(emailUser) {
  let emailsToCollect = await GetOrSetValue(DatabaseKeys.EMAILS_TO_COLLECT, []);
  let finalEmailsToCollect = emailsToCollect.concat([emailUser]);
  if (ApplicationConstants.BUNCH_SIZE_OF_EMAILS_TO_COLLECT <= finalEmailsToCollect.length) {
    await CollectEmails(finalEmailsToCollect);
    await SaveObject(DatabaseKeys.EMAILS_TO_COLLECT, []);
  } else {
    await SaveObject(DatabaseKeys.EMAILS_TO_COLLECT, finalEmailsToCollect);
  }
}

async function CollectEmail(emailUser, detailedUsers, campaignName) {
  let detailedUser;
  if (!emailUser) {
    return;
  }
  // console.log(emailUser,"Email User", 'Class: CollectEmail, Function: , Line 24 emailUser(): ');
  for (let i=0;i<detailedUsers.length;i++) {
    if (!detailedUsers[i].id) {
      break;
    }

    if (!emailUser.id) {
      break;
    }

    if (emailUser.id.toString() === detailedUsers[i].id.toString()) {
      detailedUser = detailedUsers[i];
      break;
    }
  }

  let emailFromEmailCall = emailUser.email;
  let emailFromDetailedUser;
  if (detailedUser && detailedUser.email && detailedUser.email.length !== 0) {
    emailFromDetailedUser = detailedUser.email;
  }

  if (emailFromDetailedUser) {
    emailFromEmailCall += emailFromDetailedUser;
  }

  emailUser.setCampaignName(campaignName);

  if (detailedUser && emailFromEmailCall && emailFromEmailCall.length !== 0) {
    emailUser.setMoreDetails(emailFromEmailCall, detailedUser.getEngagementRate());
    await AddToPot(emailUser);
    return;
  }

  if (!detailedUser && emailFromEmailCall && emailFromEmailCall.length !== 0) {
    await AddToPot(emailUser);
    return
  }

  if (detailedUser && emailUser.publicPhoneNumber && emailUser.publicPhoneNumber.length !== 0) {
    emailUser.setEngagementRate(detailedUser.getEngagementRate());
    await AddToPot(emailUser);
    return
  }

  if (!detailedUser && emailUser.publicPhoneNumber && emailUser.publicPhoneNumber.length !== 0) {
    await AddToPot(emailUser);
  }
}

export default CollectEmail;
