const db = require('../db/main');
const InternalServerError = require('../errors/internalServerError');
const {ExtendableError} = require("../errors/main");
const FriendRequestSent = require("../errors/friendRequestSent");
const timestamp = (new Date()).toISOString();

// Usecase 6b -  Function to send friend request
const inviteFriend = async (user1, user2) => {
    try {

        return await db.getDBObject().query(
            "INSERT into ?? (user1, user2, acceptStatus, requestSentBy, createdAt, updatedAt) values(?, ?, ?,?,?,?)",
            [db.FriendTable, user1, user2, 'Pending', user1, timestamp, timestamp]
        )

    } catch (e) {

        console.error(e)
        console.error('Unable to friend user')
        if (e.code && e.code === 'ER_DUP_ENTRY') {
            throw new FriendRequestSent()
        }

        if (!(e instanceof ExtendableError)) {
            console.error(e);
            throw new InternalServerError();
        }

        throw e;
    }
};

// Usecase 6a - Function to accept friend request
const acceptFriend = async (user1, user2) => {
    try {
        await db.getDBObject().query(
            "UPDATE " + db.FriendTable + " SET acceptStatus = 'Accepted', updatedAt = '" + timestamp + "' WHERE user1 = '" + user1 + "' AND user2 = '" + user2 + "'"
        )
    } catch (e) {

        console.error(e)
        console.error('Unable to accept friend request')

        if (!(e instanceof ExtendableError)) {
            console.error(e);
            throw new InternalServerError();
        }

        throw e;
    }
};

// Usecase 6a - Function to decline friend request
const declineFriend = async (user1, user2) => {
    try {
        await db.getDBObject().query(
            "UPDATE " + db.FriendTable + " SET acceptStatus = 'Not Accepted', updatedAt = '" + timestamp + "' WHERE user1 = '" + user1 + "' AND user2 = '" + user2 + "'"
        )
    } catch (e) {

        console.error(e)
        console.error('Unable to decline friend request')

        if (!(e instanceof ExtendableError)) {
            console.error(e);
            throw new InternalServerError();
        }

        throw e;
    }
};

// Usecase 3a - Function to get new reviews made by a user's friends
const newReviewsByFriends = async (user) => {
    try {
        const queryString = `SELECT * FROM (SELECT users.fname, users.lname, users.username, reviewSong.reviewText, reviewSong.reviewDate, song.title, song.songID
    FROM reviewSong
             NATURAL JOIN song
             NATURAL JOIN users
    WHERE username IN (SELECT user2
                       FROM friend
                       WHERE acceptStatus = 'Accepted'
                         AND user1 = "${user}"
                       UNION
                       SELECT user1
                       FROM friend
                       WHERE acceptStatus = 'Accepted'
                         AND user2 = "${user}") 
      AND reviewDate >= (SELECT lastlogin FROM users WHERE username = "${user}") 
    ORDER BY reviewDate DESC) as newReviewsByFriends
       JOIN artistPerformsSong ON newReviewsByFriends.songID = artistPerformsSong.songID JOIN (SELECT artist.fname as artistFname, artist.lname as artistLname, artist.artistID FROM artist) 
       as artistNames ON artistPerformsSong.artistID = artistNames.artistID;`.replaceAll('\n', '')

        const reviewByfriends = await db.getDBObject().query(queryString)


        return reviewByfriends;

    } catch (e) {

        console.error(e)
        console.error('Unable to get reviews by friends')

        if (!(e instanceof ExtendableError)) {
            console.error(e);
            throw new InternalServerError();
        }

        throw e;
    }
};


// Usecase 6a - Function to retrieve all friend requests
const getFriendRequests = async (user) => {
    try {
        const friendRequests = await db.getDBObject().query(`SELECT u.username, u.fname, u.lname, u.email, f.createdAt
                                                             FROM friend f
                                                                      JOIN users u ON f.user1 = u.username ` +
            `WHERE f.user2 = "${user}" AND f.acceptStatus = 'Pending';`)

        console.log(friendRequests)

        return friendRequests;

    } catch (e) {

        console.error(e)
        console.error('Unable to get all friend requests')

        if (!(e instanceof ExtendableError)) {
            console.error(e);
            throw new InternalServerError();
        }

        throw e;
    }
};

module.exports = {
    inviteFriend, getFriendRequests, acceptFriend, declineFriend, newReviewsByFriends
};