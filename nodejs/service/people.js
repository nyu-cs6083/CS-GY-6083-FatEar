const db = require('../db/main');
const InternalServerError = require('../errors/internalServerError');

// Function to search for people
const getPeopleResults = async (firstName, lastName, email) => {
  try {

    const filters = []

    if (firstName){
      filters.push(`users.fname LIKE "%${firstName}%"`)
    }
    if (lastName){
      filters.push(`users.lname LIKE "%${lastName}%"`)
    }
    if (email) {
      filters.push(`users.email LIKE "%${email}%"`)
    }

    const filtersQueryString = filters.join(' AND ')

    console.log('SELECT * FROM users WHERE ' + filtersQueryString)

   const peopleResults = await db.getDBObject().query('SELECT fname, lname, email, userProfile FROM users WHERE '
        + filtersQueryString)

   console.log(peopleResults)

   return peopleResults;

  } catch (e) {
    console.error(e)
    console.error('unable to find person')
    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    throw e;
  }
}


//  Get list of friends for specified username
const getUserFriends = async (username) => {
  try {
    const results =  await db.getDBObject().query(`SELECT fname, lname, email FROM users `+
                                                  `WHERE users.username IN (SELECT user2 FROM friend WHERE acceptStatus = "Accepted" AND user1 = "${username}" UNION SELECT  user1 FROM friend WHERE acceptStatus = "Accepted" AND user2 = "${username}");`)
    
    return results;

  } catch (e) {

    console.error(e)
    console.error('Unable to get all friends for current user')

    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    
    throw e;
  }
};

//  Get list of follows for specified username 
const getUserFollows = async (username) => {
  try {
    const results =  await db.getDBObject().query(`SELECT  fname, lname, email FROM users JOIN follows ON users.username = follows.followed WHERE follows.follower = '${username}';`)
    
    return results;

  } catch (e) {

    console.error(e)
    console.error('Unable to get all friends for current user')

    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    
    throw e;
  }
};

//  Get list of followers for specified username 
const getUserFollowers = async (username) => {
  try {
    const results =  await db.getDBObject().query(`SELECT  fname, lname, email FROM users JOIN follows ON users.username = follows.follower WHERE follows.followed = '${username}';`)
    
    console.log(results)
    
    return results;

  } catch (e) {

    console.error(e)
    console.error('Unable to get all follower of current user')

    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    
    throw e;
  }
};

//  Get list of songs reviewed by specified username 
const getReviewedSongs = async (username) => {
  try {
    const results =  await db.getDBObject().query(`SELECT * FROM reviewSong `+
                                                  `NATURAL JOIN song `+
                                                  `NATURAL JOIN user` +
                                                  `WHERE username = "${username}";`)
    
    return results;

  } catch (e) {

    console.error(e)
    console.error('Unable to get all friends for current user')

    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    
    throw e;
  }
};

//  Get list of songs rated by specified username 
const getRatedSongs = async (username) => {
  try {
    const results =  await db.getDBObject().query(`SELECT * FROM rateSong `+
                                                  `NATURAL JOIN song `+
                                                  `WHERE username = "${username}";`)
    
    console.log(results)
    
    return results;

  } catch (e) {

    console.error(e)
    console.error('Unable to get all friends for current user')

    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    
    throw e;
  }
};

//  Get user profile by username
const getProfile = async (username) => {
  try {
    const results =  await db.getDBObject().query(`SELECT username, fname, lname, numFriends, COUNT(follows.followed) as numFollowers 
                                                   FROM (SELECT username, fname, lname, COUNT(friend.user2) as numFriends FROM users JOIN friend ON users.username = friend.user1 WHERE users.username = "${username}" AND friend.acceptStatus = 'Accepted' GROUP BY users.username) AS numFriendsTableByUser
                                                   JOIN follows ON numFriendsTableByUser.username = follows.followed GROUP BY username;`
    )
    
    console.log(results)
    
    return results;

  } catch (e) {

    console.error(e)
    console.error('Unable to get profile')

    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    
    throw e;
  }
};

//  Get favorite songs by username
const getFavoriteSongs = async (username) => {
  try {
    const results =  await db.getDBObject().query(`SELECT song.title, song.releaseDate, song.songURL, rateSong.stars, artist.fname as artistFname, artist.lname as artistlname
                                                   FROM users NATURAL JOIN userFanOfArtist JOIN artist ON artist.artistID = userFanOfArtist.artistID
                                                   JOIN artistPerformsSong ON artistPerformsSong.artistID = userFanOfArtist.artistID NATURAL JOIN song NATURAL JOIN rateSong WHERE users.username = "${username}" AND rateSong.stars >=4 AND rateSong.username = "${username}";`
     )
    
    console.log(results)
    
    return results;

  } catch (e) {

    console.error(e)
    console.error('Unable to get profile')

    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    
    throw e;
  }
};

module.exports = {
  getPeopleResults, getUserFriends, getUserFollows, getUserFollowers, getReviewedSongs, getRatedSongs, getProfile, getFavoriteSongs
}