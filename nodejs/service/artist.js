const db = require('../db/main');
const InternalServerError = require('../errors/internalServerError');


//  Usecase 3b - Function to get new songs by artist whom user is a fan of
const getNewSongsByFavoriteArtist = async (user) => {

  try {
    return await db.getDBObject().query(`SELECT *
                                         FROM song s
                                                NATURAL JOIN artistPerformsSong a
                                                NATURAL JOIN artist
                                         WHERE a.artistID IN (SELECT artistID
                                                              FROM userFanOfArtist
                                                              WHERE username = "${user}")
                                           AND s.releaseDate >= (SELECT lastlogin FROM users WHERE username = "${user}");`);
  } catch (e) {
    console.error(e)
    console.error('Unable to get new songs by artist whom user is a fan of')
    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    
    throw e;
  }
};

module.exports = {
  getNewSongsByFavoriteArtist
};