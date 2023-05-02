// Added by Nigel and adapted from rating.js
const db = require('../db/main');
const InternalServerError = require('../errors/internalServerError');

// Nigel
const insertReview = async (username, songID, reviewText) => {
  try {
    const reviewDate = new Date()
      .toISOString()
      .split('T')
      .join(' ')
      .split('Z')
      .join('');
    const insertResult = await db.getDBObject()
    .query(
      "INSERT into ?? (username, songID, reviewText, reviewDate) values(?, ?, ?, ?)",
      [db.ReviewSongTable, username, songID, reviewText, reviewDate]
      
    )
    console.log(insertResult)
    return {
      reviewID: insertResult.insertId,
      username,
      songID,
      reviewText,
      reviewDate
    };
  } catch (e) {
    console.error("unable to insert review");
    console.error(e);
    throw new InternalServerError();
  }
};

module.exports = {
  insertReview
};