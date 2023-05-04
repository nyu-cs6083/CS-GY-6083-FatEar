const db = require('../db/main');
const InternalServerError = require('../errors/internalServerError');


// Extra functionality for 3 member team - Function to get selection of top songs (maximum of 5) rated by 4 stars or higher by friends and people whom user follows
const getRecommendedSongsForCurrentUser = async (user) => {

  try {
    const recommendedSongs =  await db.getDBObject() .query(`SELECT DISTINCT * FROM rateSong NATURAL JOIN song `+
                                                    `WHERE rateSong.username IN (SELECT user2 FROM friend WHERE acceptStatus = 'Accepted' AND user1 = "${user}" UNION SELECT  user1 FROM friend WHERE acceptStatus = "Accepted" AND user2 = "${user}" UNION SELECT followed FROM follows WHERE follower = "${user}") ` + 
                                                    `AND rateSong.stars >= 4 ` +
                                                    `GROUP BY rateSong.username ` +
                                                    `ORDER BY stars DESC ` +
                                                    `LIMIT 5;`);
    
    console.log(recommendedSongs)
    
    return recommendedSongs;
    
  } catch (e) {

    console.error(e)
    console.error('Unable to get recommended songs')

    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    
    throw e;
  }
};

module.exports = {
  getRecommendedSongsForCurrentUser
};
