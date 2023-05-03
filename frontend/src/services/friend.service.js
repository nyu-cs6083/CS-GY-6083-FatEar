import axios from "axios";
import authHeader from "./auth-header";
import {API_URL} from "../constants";

const postFriend = async ({user1, user2}) => {
  const {data} = await axios.post(`${API_URL}friend/invite`,{user1,user2},{ headers: authHeader() })
  console.log(data)
  return data;
}

const getFriendReviews = async () => {
  const {data} = await axios.get(`${API_URL}friend/reviews`,{ headers: authHeader() })
  console.log(data)
  return data;
}

const FriendService = {postFriend,getFriendReviews}

export default FriendService; 