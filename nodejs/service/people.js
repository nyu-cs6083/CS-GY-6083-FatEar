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

//  Get list of follows for specified username 
const getUserFollows = async (username) => {
  try {
    const results =  await db.getDBObject().query(`SELECT fname, lname, email FROM users `+
                                                  `WHERE users.username IN (SELECT followed FROM follows WHERE follower = "${username}");`)
    
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

//  Get list of songs reviewed by specified username 
const getReviewedSongs = async (username) => {
  try {
    const results =  await db.getDBObject().query(`SELECT * FROM reviewSong `+
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

module.exports = {
  getPeopleResults, getUserFriends, getUserFollows, getReviewedSongs, getRatedSongs
}