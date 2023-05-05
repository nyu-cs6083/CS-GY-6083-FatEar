const AuthService = require('../service/auth');

const getToken = ({ authorization }) => (authorization && authorization.split(' ')[1]) || '';

const loginAuth = async (req, res, next) => {
  try {
    const token = getToken(req.headers);
    console.log(token)
    const {user} = await AuthService.getUserFromToken(token);
    req.user = user;
    next();
  } catch (e) {
    next(e)
  }
};

module.exports = {
  loginAuth
}