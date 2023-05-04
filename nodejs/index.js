const express = require("express");
const cors = require("cors");
const db = require("./db/main")
const AuthService = require('./service/auth');
const AuthMiddleWare = require('./middleware/auth');
const RecipeService = require('./service/recipe');
const RatingService = require('./service/rating'); // Added by Nigel
const ReviewService = require('./service/review'); // Added by Nigel
const SearchService = require('./service/search');
const PeopleService = require('./service/people');
const FollowService = require('./service/follow');
const FriendService = require('./service/friend');
const artistService = require('./service/artist');
const SongsService = require('./service/songs');
const errorHandler = require("./middleware/errorHandler");
const morgan = require('morgan');

require("dotenv").config();

const app = express();

app.use(morgan('common'));


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post('/signup', async (req, res, next) => {
  try {
    const {
      userName, password, firstName, lastName, email, profile
    } = req.body;
    const user = await AuthService.registerUser(userName, password, firstName, lastName, email, profile);
    res.json(user)
  } catch (e) {
    console.error(e);
    next(e);
  }
})

app.post('/login', async (req, res, next) => {
  try {
    const {
      userName, password
    } = req.body;
    const user = await AuthService.login(userName, password);
    res.json(user)
  } catch (e) {
    console.error(e);
    next(e);
  }
})

app.get('/search', async(req,res,next)=>{
  try {
    const {song, artist, album, genre, songRating} = req.query
    const searchResults = await SearchService.getSearchResults(song,artist,album,genre,songRating)
    res.json(searchResults)
  } catch (e) {
    console.error(e);
    next(e);
  }
})


// Added by Nigel
// Need to create a get rating
app.get('/rating/:songID', async (req,res, next) => {
  try {
    // console.log({req})
  const {songID} = req.params
  // console.log(req.headers)
  const songRatings = await RatingService.getSongRatings(Number(songID))
  //console.log(songRatings)
  res.json(songRatings)
  } catch (e) {
    console.error(e);
    next(e);
  }
})

// Added by Nigel
// Need to create a get rating
app.get('/review/:songID', async (req,res, next) => {
  try {
    // console.log({req})
  const {songID} = req.params
  // console.log(req.headers)
  const songReviews = await ReviewService.getSongReview(Number(songID))
  //console.log(songRatings)
  res.json(songReviews)
  } catch (e) {
    console.error(e);
    next(e);
  }
})

// all routes defined after this middleware requires auth token
app.use(AuthMiddleWare.loginAuth);

app.get('/user', async (req,res, next) => {
  try {
    if(!req.user) {
      throw new USER_NOT_FOUND();
    }
    res.json(req.user);
  } catch (e) {
    console.error(e);
    next(e);
  }
})





// Added by Nigel
// Need to create a get review



// Added by Nigel
// Needs to be modified to post a rating

app.post('/rating', async (req, res, next) => {
  try {
    const {
      songRating,
      songID
    } = req.body;
    const username = req.user.username;
    const postedRating = await RatingService.insertRating(username, songID, songRating);
    res.json(postedRating);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// GET route to search for users
app.get('/people', async(req,res,next)=>{
  try {
    const {firstName, lastName, email} = req.query
    const peopleResults = await PeopleService.getPeopleResults(firstName, lastName, email)
    res.json(peopleResults)
  } catch (error) {
    console.error(e);
    next(e);
  }
})

// POST route to follow user
app.post('/follow', async (req, res, next) => {

  const currentUser = req.user.username;

  try {
    const {
        username
    } = req.body;
    const postFollow = await FollowService.follow(currentUser, username);
    res.json(postFollow);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// POST route to send friend request
app.post('/friend/invite', async (req, res, next) => {

  const currentUser = req.user.username;

  try {
    const {
        username
    } = req.body;
    const postFriend = await FriendService.inviteFriend(currentUser, username);
    res.json(postFriend);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// POST route to accept friend request
app.post('/friend/accept', async (req, res, next) => {

  const currentUser = req.user.username;

  try {
    const {
        username
    } = req.body;
    const postFriend = await FriendService.acceptFriend(username, currentUser);
    res.json(postFriend);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// POST route to decline friend request
app.post('/friend/decline', async (req, res, next) => {

  const currentUser = req.user.username;

  try {
    const {
        username
    } = req.body;
    const postFriend = await FriendService.declineFriend(username, currentUser);
    res.json(postFriend);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// GET route to get reviews for users' friends
app.get('/friend/reviews', async(req,res,next)=>{
  try {
    const currentUser = req.user.username;
    const results = await FriendService.newReviewsByFriends(currentUser)
    res.json(results)
  } catch (error) {
    console.error(e);
    next(e);
  }
})

// GET route to get reviews from people users follows
app.get('/follows/reviews', async(req,res,next)=>{
  try {
    const currentUser = req.user.username;
    const results = await FollowService.newReviewsByFollowedUsers(currentUser)
    res.json(results)
  } catch (error) {
    console.error(e);
    next(e);
  }
})

// GET route to get new songs by artists user is fan of
app.get('/artist/favorite/newsongs', async(req,res,next)=>{
  try {
    const currentUser = req.user.username;
    const results = await artistService.getNewSongsByFavoriteArtist(currentUser)
    res.json(results)
  } catch (error) {
    console.error(e);
    next(e);
  }
})

// GET all friend requests
app.get('/friend/requests', async(req,res,next)=>{
  try {
    const currentUser = req.user.username;
    const results = await FriendService.getFriendRequests(currentUser)
    res.json(results)
  } catch (error) {
    console.error(e);
    next(e);
  }
})


// GET recommended songs for current user
app.get('/songs/recommended', async(req,res,next)=>{
  try {
    const currentUser = req.user.username;
    const results = await SongsService.getRecommendedSongsForCurrentUser(currentUser)
    res.json(results)
  } catch (error) {
    console.error(e);
    next(e);
  }
})

// GET all friends for specific
app.get('/people/:username/friends', async (req,res, next) => {
  try {
  const {username} = req.params
  const results = await PeopleService.getUserFriends(username)

  res.json(results)
  } catch (e) {
    console.error(e);
    next(e);
  }
})

// GET all follows for specific
app.get('/people/:username/follows', async (req,res, next) => {
  try {
  const {username} = req.params
  const results = await PeopleService.getUserFollows(username)

  res.json(results)
  } catch (e) {
    console.error(e);
    next(e);
  }
})

// GET all songs rated by specific
app.get('/people/:username/songs/rated', async (req,res, next) => {
  try {
  const {username} = req.params
  const results = await PeopleService.getRatedSongs(username)

  res.json(results)
  } catch (e) {
    console.error(e);
    next(e);
  }
})

// GET all songs reviewed by specific
app.get('/people/:username/songs/reviewed', async (req,res, next) => {
  try {
  const {username} = req.params
  const results = await PeopleService.getReviewedSongs(username)
  res.json(results)
  } catch (e) {
    console.error(e);
    next(e);
  }
})

// Added by Nigel
// Needs to be modified to post a review

app.post('/review', async (req, res, next) => {
  try {
    const {
      songReview,
      songID
    } = req.body;
    const username = req.user.username;
    const postedReview = await ReviewService.insertReview(username, songID, songReview);
    res.json(postedReview);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  db.initDBConnection()
  console.log(`Server is running on port ${PORT}.`);
});