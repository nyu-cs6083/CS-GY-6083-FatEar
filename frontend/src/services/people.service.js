import axios from "axios";
import authHeader from "./auth-header";
import {API_URL} from "../constants";

// Search for users based on certain criteria
const getPeopleResults = async ({firstName, lastName, email}) => {
  const {data} = await axios.get(`${API_URL}people?firstName=${firstName}&lastName=${lastName}&email=${email}`,{ headers: authHeader() })
  console.log(data)
  return data;
}

// Get all friends of specific user
const getUserFriends = async (username) => {
  const {data} = await axios.get(`${API_URL}people/${username}/friends`,{ headers: authHeader() })
  return data;
}

// Get all follows of specific user
const getUserFollows = async (username) => {
  const {data} = await axios.get(`${API_URL}people/${username}/follows`,{ headers: authHeader() })
  return data;
}

// Get all followers of specific user
const getUserFollowers = async (username) => {
  const {data} = await axios.get(`${API_URL}people/${username}/followers`,{ headers: authHeader() })
  console.log(data)
  return data;
}

// Get specific user profile
const getProfile = async (username) => {
  const {data} = await axios.get(`${API_URL}people/${username}/profile`,{ headers: authHeader() })
  console.log(data)
  return data;
}


// Get favorite songs of current user
const getFavoriteSongs = async (username) => {
  const {data} = await axios.get(`${API_URL}people/${username}/favorite/songs`,{ headers: authHeader() })
  console.log(data)
  return data;
}


// Get all songs rated by specific user
const getRatedSongs = async (username) => {
  const {data} = await axios.get(`${API_URL}people/${username}/songs/rated`,{ headers: authHeader() })
  return data;
}

// Get all songs reviewed by specific user
const getReviewedSongs = async (username) => {
  const {data} = await axios.get(`${API_URL}people/${username}/songs/reviewed`,{ headers: authHeader() })
  return data;
}

const PeopleService = {
  getPeopleResults, getUserFriends, getUserFollows, getUserFollowers, getRatedSongs, getReviewedSongs, getProfile, getFavoriteSongs
}

export default PeopleService; 