import getDetailedUserObjectFromUsername from "../common/api_call/GetDetailedUserObjectFromUsername";
import AddLevel3Calls from "../common/Helpers/AddLevel3Calls";
import GetDetailedUserFromUsernamePersonal from "../common/api_call/new_api_calls/GetDetailedUserFromUsernamePersonal";
import GetDetailsFromSadam from "../common/api_call/new_api_calls/GetDetailsFromSadam";
import sleep from "../common/Sleep";
import DetailedUser from "../common/models/DetailedUser";
import ApplicationConstants from "../common/constants/ApplicationConstants";
import SendEvent from "../common/Helpers/SendEvent";
import AnalyticsCategoryEnum from "../common/constants/AnalyticsCategoryEnum";
import GetSearchUserForStory from "../common/api_call/new_api_calls/GetSearchUserForStory";
import AddSadamCalls from "../common/Helpers/AddSadamCalls";
import GetUsersFromIDsByIndra from "../common/api_call/GetUsersFromIDsByIndra";
import AddDailyBasicUserSadamCalls from "./AddDailyBasicUserSadamCalls";


class DetailedDataBrain {
  constructor(reflectProgress, completedUsersCallback, sadamCallsLeft, igID, isPremiumUser, dummyUsersStartedCallback, trialOverCallback, waitForSomeTimeCallback, freeSadamCalls) {
    this.brainState = 0;
    this.usernames = [];
    this.completedUsernameMap = {};
    this.completedUsernames = [];
    this.currentRunningState = false;
    this.reflectProgress = reflectProgress;
    this.completedUsersCallback = completedUsersCallback;
    this.sadamCallsLeft = sadamCallsLeft + freeSadamCalls;
    this.idID = igID;
    this.personalCalls = 0;
    this.dummyUsersStartedCallback = dummyUsersStartedCallback;
    this.trialOverCallback = trialOverCallback;
    this.waitForSomeTimeCallback = waitForSomeTimeCallback;
    this.strikeForUserIDCallFailed = 0;
    this.sadamFailedStrike = 0;
    this.isPremiumUser = isPremiumUser;
    this.isProcessStopped = false;
  }

  setUsernames = (usernames) => {
    this.usernames = usernames;
  };

  stopProcess = () => {
    this.isProcessStopped = true;
  };

  setDataFieldsToDownload = (dataFieldsToDownload) => {
    this.dataFieldsToDownload = dataFieldsToDownload;
  };

  changeRunningState = (v) => {
    this.currentRunningState = v;
    this.startProcess();
  };

  setCompletedUsernamesMap = () => {
    this.completedUsernames.map(u => {
      this.completedUsernameMap[u] = true;
    });
  };

  startProcess = async () => {
    if (!this.currentRunningState || this.isProcessStopped) {
      return;
    }
    let i = 0;
    this.setCompletedUsernamesMap();

    let users = this.usernames;


    for (; i < users.length; i++) {
      if (!this.completedUsernameMap[users[i]]) {
        break;
      }
    }

    // console.log(i, "Class: DetailedDataBrain, Function: , Line 57 i(): ");


    for (; i < users.length;) {

      if (!this.currentRunningState || this.isProcessStopped) {
        return;
      }

      let usersToScrapeAtOnce = 1;

      if (this.brainState === 0) {
        if (i + 3 < users.length) {
          usersToScrapeAtOnce = 4;
        }
        let completedUsers = [];
        try {
          if (!ApplicationConstants.DEBUG_EMAIL_SCRAPER.ANONYMYSED_CALLS_ON) {
            throw new Error("Anonymysed calls off");
          }
          completedUsers = await this.getMultipleAtOnce(users.slice(i, i + usersToScrapeAtOnce));
        } catch (e) {
          this.brainState++;
          continue;
        }
        this.reflectProgress(
          i + usersToScrapeAtOnce,
          users.length
        );
        this.completedUsersCallback(completedUsers);
        i += usersToScrapeAtOnce;
        await sleep(500);
      }
      else if (this.brainState === 1) {
        if (this.personalCalls >= ApplicationConstants.MAX_PERSONAL_CALLS) {
          this.brainState++;
        }
        if (i + 3 < users.length) {
          usersToScrapeAtOnce = 4;
        }
        let completedUsers = [];
        try {
          if (!ApplicationConstants.DEBUG_EMAIL_SCRAPER.PERSONALISED_CALLS_ON) {
            throw new Error("personalised calls off");
          }
          completedUsers = await this.getMultiplePersonalAtOnce(users.slice(i, i + usersToScrapeAtOnce));
        } catch (e) {
          this.brainState++;
          continue;
        }
        this.personalCalls += usersToScrapeAtOnce;
        this.reflectProgress(
          i + usersToScrapeAtOnce,
          users.length
        );
        this.completedUsersCallback(completedUsers);
        i += usersToScrapeAtOnce;
        await sleep(500);
      }
      else if (this.brainState === 2) {
        if (this.sadamCallsLeft <= 0) {
          console.log("STN CALLS OVER", 'Class: DetailedDataBrain, Function: , Line 131 "SADAM CALLS OVER"(): ');
          this.brainState++;
          continue;
        }
        let usersInOneGo;
        if (i + ApplicationConstants.SADAM_MAX_USERS_IN_1_CALL < users.length) {
          usersToScrapeAtOnce = ApplicationConstants.SADAM_MAX_USERS_IN_1_CALL;
          usersInOneGo = users.slice(i, i + usersToScrapeAtOnce);
        } else {
          usersToScrapeAtOnce = users.length - i;
          usersInOneGo = users.slice(i, users.length);
        }
        let completedUsers = [];
        try {
          if (!ApplicationConstants.DEBUG_EMAIL_SCRAPER.SADAM_ON) {
            this.brainState++;
            continue;
          }
          completedUsers = await GetDetailsFromSadam(usersInOneGo, this.idID, this.dataFieldsToDownload);
          this.sadamFailedStrike = 0;
          SendEvent(AnalyticsCategoryEnum.CALL_TO_SADAM, `Success`, `${usersInOneGo} users | ${this.idID}`);
        } catch (e) {
          SendEvent(AnalyticsCategoryEnum.CALL_TO_SADAM, `FAILED`, `${usersInOneGo} users | ${this.idID}`);
          this.sadamFailedStrike++;
          await sleep(120000);
          if (this.sadamFailedStrike === 3) {
            this.brainState++;
          }
          continue;
        }
        this.sadamCallsLeft -= usersToScrapeAtOnce;
        if (this.isPremiumUser) {
          await AddSadamCalls(usersToScrapeAtOnce);
        } else {
          await AddDailyBasicUserSadamCalls(usersToScrapeAtOnce);
        }
        this.reflectProgress(
          i + usersToScrapeAtOnce,
          users.length
        );
        this.completedUsersCallback(completedUsers);
        i += usersToScrapeAtOnce;
        // console.log("sleeping for 20 sec", "Class: DetailedDataBrain, Function: , Line 136 \"sleeping for 20 sec\"(): ");
        await sleep(ApplicationConstants.SLEEP_TIME_FOR_SADAM_MS);
      }
      else if (this.brainState === 3) {
        let u = new DetailedUser();
        u.username = users[i];
        u.isBusinessAccount = true;
        try {
          let us = await GetSearchUserForStory(users[i]);
          u.id = us.id;
          this.strikeForUserIDCallFailed = 0;
        } catch (e) {
          console.log(e, "GET SEARCH USER FOR STORY FAILED", 'Class: DetailedDataBrain, Function: , Line 180 "GET SEARCH USER FOR STORY FAILED"(): ');
          this.strikeForUserIDCallFailed++;
          if (this.strikeForUserIDCallFailed > 5) {
            this.brainState++;
            continue;
          } else {
            this.reflectProgress(
              i + usersToScrapeAtOnce,
              users.length
            );
            i += usersToScrapeAtOnce;
            continue;
          }
        }
        u.setAsDummy();
        this.reflectProgress(
          i + usersToScrapeAtOnce,
          users.length
        );
        this.completedUsersCallback([u]);
        this.dummyUsersStartedCallback();
        i += usersToScrapeAtOnce;
        await sleep(ApplicationConstants.WAIT_TIME_FOR_NORMAL_USER_WITHOUT_SADAM);
      }
      else {
        this.waitForSomeTimeCallback();
        break;
      }

    }


  };

  async getMultiplePersonalAtOnce(usernames) {
    if (usernames.length === 1) {
      return await Promise.all([GetDetailedUserFromUsernamePersonal(usernames[0])]);
    }

    let [a, b, c, d] = await Promise.all([
      GetDetailedUserFromUsernamePersonal(usernames[0]),
      GetDetailedUserFromUsernamePersonal(usernames[1]),
      GetDetailedUserFromUsernamePersonal(usernames[2]),
      GetDetailedUserFromUsernamePersonal(usernames[3])
    ]);
    return [a, b, c, d];
  }

  async getMultipleAtOnce(usernames) {
    if (usernames.length === 1) {
      return await Promise.all([getDetailedUserObjectFromUsername(usernames[0], false)]);
    }

    let [a, b, c, d] = await Promise.all([
      getDetailedUserObjectFromUsername(usernames[0], false),
      getDetailedUserObjectFromUsername(usernames[1], false),
      getDetailedUserObjectFromUsername(usernames[2], false),
      getDetailedUserObjectFromUsername(usernames[3], false)
    ]);
    return [a, b, c, d];
  }
}


export default DetailedDataBrain;