// Added by Nigel and adapted from recipe.js
const db = require('../db/main');
const InternalServerError = require('../errors/internalServerError');

// Nigel: Do I just need to pass the stars and ratingDate? Can I access the username and songID through a variable?
// UPDATE: to catch for duplicate rating using SQL query from Whatsapp 
const insertRating = async (username, songID, stars) => {
  try {
    const ratingDate = new Date()
      .toISOString()
      .split('T')
      .join(' ')
      .split('Z')
      .join('');
    const insertResult = await db.getDBObject()
    .query(
      "INSERT into ?? (username, songID, stars, ratingDate) values(?, ?, ?, ?)",
      [db.RateSongTable, username, songID, stars, ratingDate]
      
    )
    console.log(insertResult)
    return {
      ratingID: insertResult.insertId,
      username,
      songID,
      stars,
      ratingDate
    };
  } catch (e) {
    console.error("unable to insert rating");
    console.error(e);
    throw new InternalServerError();
  }
};


const getSongRatings = async (song) => {
  try {
    console.log(song)
    const ratingRow = await db
      .getDBObject()
      .query(
        'SELECT songID, avgRating FROM (SELECT songID, AVG(stars) as avgRating FROM ?? GROUP BY songID) as avgSongRatings WHERE songID = ?',
        [db.RateSongTable, song]
      );
    if (ratingRow.length == 0) {
      throw new Error('Song ratings not found');
    }
    console.log(ratingRow)
    return ratingRow;
  } catch (e) {
    console.error('unable to find ratings');
    console.error(e);
    //throw new UserNotFound(); // Got rid of special error message bc no time to write
  }
};


module.exports = {
  insertRating, getSongRatings
}