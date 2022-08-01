import User from "./models/User";

// makeUserObjects takes the followers and following array which it got from graphql and makes the user object
function makeUserObjects(followers, following, alreadyFilledUsers=[]) {
  let data = [];
  if (!followers) {
    followers = [];
  }

  let alreadyUsersMap = {};
  alreadyFilledUsers.map(
    u => {
      alreadyUsersMap[u.username] = true;
    }
  );

  let followersWithFollowingAlready = {};
  let followingsWithFollowersAlready = {};

  let users = {};
  for (let i = 0; i < followers.length; i++) {
    let user = followers[i];

    if (alreadyUsersMap[user.username]) {
      followersWithFollowingAlready[user.username] = user;
      continue;
    }

    if (!users[user.username]) {
      users[user.username] = {
        isFollower: true,
        isAlreadyDone: false
      };
    } else {
      users[user.username].isFollower = true;
    }

    let followerUser = new User(
      user.profilePic,
      user.username,
      user.fullName,
      user.id,
      user.followedByViewer,
      false,
      true,
      user.isVerified,
      user.isPrivate
    );
    data.push(followerUser);
  }

  if (!following) {
    following = [];
  }
  for (let i = 0; i < following.length; i++) {
    let user = following[i];

    if (alreadyUsersMap[user.username]) {
      followingsWithFollowersAlready[user.username] = user;
      continue;
    }
    // it means it's a new user

    if (!users[user.username]) {
      users[user.username] = {
        iFollow: true,
        isAlreadyDone: false
      };
    } else {
      users[user.username].iFollow = true;
    }
    let followingUser = new User(
      user.profilePic,
      user.username,
      user.fullName,
      user.id,
      user.followedByViewer,
      true,
      false,
      user.isVerified,
      user.isPrivate
    );
    data.push(followingUser);
  }

  let finalData = [];
  for (let i = 0; i < data.length; i++) {
    let username = data[i].username;
    if (users[username].iFollow && users[username].isFollower) {
      if (users[username].isAlreadyDone) {
        continue;
      }
      data[i].userFollowsSubject = true;
      data[i].subjectFollowsUser = true;
      finalData.push(data[i]);
      users[username].isAlreadyDone = true;
    } else {
      finalData.push(data[i]);
    }
  }

  if (finalData.length === 0) {
    return alreadyFilledUsers;
  }

  let existingUpdatedUsers = alreadyFilledUsers.map(u => {
    let username = u.username;
    if (followersWithFollowingAlready[username]) {
      u.subjectFollowsUser = true;
    }
    if (followingsWithFollowersAlready[username]) {
      u.userFollowsSubject = true;
    }
    return u;
  });

  let final = existingUpdatedUsers.concat(finalData);
  return final;
}


export default makeUserObjects;