import axios from "axios";
import authHeader from "./auth-header";
import {API_URL} from "../constants";

// For allowing current user to follow another user
const postFollow = async ({username}) => {
  const {data} = await axios.post(`${API_URL}follow`,{username},{ headers: authHeader() })
  return data;
}

// For getting all reviews made by all users current user follows
const getFollowsReviews = async () => {
  const {data} = await axios.get(`${API_URL}follows/reviews`,{ headers: authHeader() })
  return data;
}

const FollowService = {postFollow, getFollowsReviews}

export default FollowService; 