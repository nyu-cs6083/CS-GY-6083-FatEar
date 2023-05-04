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
  console.log(data)
  return data;
}

// Get all follows of specific user
const getUserFollows = async (username) => {
  const {data} = await axios.get(`${API_URL}people/${username}/follows`,{ headers: authHeader() })
  console.log(data)
  return data;
}

// Get all songs rated by specific user
const getRatedSongs = async (username) => {
  const {data} = await axios.get(`${API_URL}people/${username}/songs/rated`,{ headers: authHeader() })
  console.log(data)
  return data;
}

// Get all songs reviewed by specific user
const getReviewedSongs = async (username) => {
  const {data} = await axios.get(`${API_URL}people/${username}/songs/reviewed`,{ headers: authHeader() })
  console.log(data)
  return data;
}

const PeopleService = {
  getPeopleResults, getUserFriends, getUserFollows, getRatedSongs, getReviewedSongs
}

export default PeopleService; 