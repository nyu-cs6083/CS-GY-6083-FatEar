import axios from "axios";
import authHeader from "./auth-header";
import {API_URL} from "../constants";

const postFollow = async ({follower, follows}) => {
  const {data} = await axios.post(`${API_URL}follow`,{follower,follows},{ headers: authHeader() })
  console.log(data)
  return data;
}

const getFollowsReviews = async () => {
  const {data} = await axios.get(`${API_URL}follows/reviews`,{ headers: authHeader() })
  console.log(data)
  return data;
}

const FollowService = {postFollow, getFollowsReviews}

export default FollowService; 