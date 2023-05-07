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
      "INSERT into ?? (username, songID, reviewText, reviewDate) values(?, ?, ?, ?) ON DUPLICATE KEY UPDATE reviewText=?, reviewDate=?",
      [db.ReviewSongTable, username, songID, reviewText, reviewDate, reviewText, reviewDate]
      
    )
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

const getSongReview = async (song) => {
  try {
    console.log(song)
    const review = await db
      .getDBObject()
      .query(
        'SELECT fname, lname, reviewText, reviewDate FROM ?? NATURAL JOIN ?? WHERE songID = ?',
        [db.ReviewSongTable, db.UserTable, song]
      );
    if (review.length === 0) {
      throw new Error('Song reviews not found');
    }
    console.log(review)
    return review;
  } catch (e) {
    console.error('unable to find ratings');
    console.error(e);

  }
};

module.exports = {
  insertReview, getSongReview
};