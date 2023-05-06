const db = require('../db/main');
const InternalServerError = require('../errors/internalServerError');
const {ExtendableError} = require("../errors/main");
const FollowRequestSent = require("../errors/followRequestSent");

// Function to allow one user to follow another
const follow = async (follower, follows) => {
  try {

    return await db.getDBObject() .query(
        "INSERT into ?? (follower, followed, createdAt) values(?, ?, ?)",
        [db.FollowsTable, follower, follows, (new Date()).toISOString()]
    )

  } catch (e) {
    console.error(e)
    console.error('Unable to follow user')
    if (e.code && e.code === 'ER_DUP_ENTRY'){
      throw new FollowRequestSent()
    }

    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    
    throw e;
  }
};

//  Usecase 3a - Function to get new reviews made by people whom user follows
const newReviewsByFollowedUsers = async (user) => {
  try {
    return await db.getDBObject().query(`SELECT users.fname, users.lname, users.username, reviewSong.reviewText, reviewSong.reviewDate, song.title  FROM 
    reviewSong NATURAL JOIN 
song NATURAL JOIN users ` +
        `WHERE username IN ( SELECT followed FROM follows WHERE follower = "${user}") AND reviewDate >= (SELECT lastlogin FROM  users WHERE username = "${user}") ORDER BY reviewDate DESC;`);

  } catch (e) {

    console.error(e)
    console.error('Unable to get reviews made by people whom user follows')

    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    
    throw e;
  }
};

module.exports = {
  follow, newReviewsByFollowedUsers
};