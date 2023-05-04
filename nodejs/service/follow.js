const db = require('../db/main');
const InternalServerError = require('../errors/internalServerError');

// Function to allow one user to follow another
const follow = async (follower, follows) => {
  try {

    await db.getDBObject() .query(
        "INSERT into ?? (follower, followed, createdAt) values(?, ?, ?)",
        [db.FollowsTable, follower, follows, (new Date()).toISOString()]
    )

  } catch (e) {

    console.error(e)
    console.error('Unable to follow user')

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
    const reviewByFollows =  await db.getDBObject().query(`SELECT * FROM reviewSong NATURAL JOIN song ` + 
                                                          `WHERE username IN ( SELECT followed FROM follows WHERE follower = "${user}") AND reviewDate >= (SELECT lastlogin FROM  users WHERE username = "${user}") ORDER BY reviewDate DESC;`)
    
    console.log(reviewByFollows)
    
    return reviewByFollows;

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
