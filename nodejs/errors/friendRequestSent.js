const MainError = require('./main');

class FriendRequestSent extends MainError.ExtendableError {
    constructor(info = 'Friend request sent already') {
        super({ code: MainError.DUPLICATE_FRIEND_REQUEST, info });
    }
}

module.exports = FriendRequestSent;