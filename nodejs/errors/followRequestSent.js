const MainError = require('./main');

class FollowRequestSent extends MainError.ExtendableError {
    constructor(info = 'Follow request sent already') {
        super({ code: MainError.DUPLICATE_FOLLOW_REQUEST, info });
    }
}

module.exports = FollowRequestSent;