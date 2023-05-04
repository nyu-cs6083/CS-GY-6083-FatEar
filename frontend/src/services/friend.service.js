import axios from "axios";
import authHeader from "./auth-header";
import {API_URL} from "../constants";

// For sending friend request
const inviteFriend = async ({username}) => {
  const {data} = await axios.post(`${API_URL}friend/invite`,{username},{ headers: authHeader() })
  console.log(data)
  return data;
}

// For geting all friend requests that other users have sent to current user
const getFriendRequests= async () => {
  const {data} = await axios.get(`${API_URL}friend/requests`,{ headers: authHeader() })
  console.log(data)
  return data;
}

// For accepting friend request
const acceptFriend = async ({username}) => {
  const {data} = await axios.post(`${API_URL}friend/accept`,{username},{ headers: authHeader() })
  console.log(data)
  return data;
}

// For declining friend request
const declineFriend = async ({username}) => {
  const {data} = await axios.post(`${API_URL}friend/decline`,{username},{ headers: authHeader() })
  console.log(data)
  return data;
}

// For getting all reviews made by friends
const getFriendReviews = async () => {
  const {data} = await axios.get(`${API_URL}friend/reviews`,{ headers: authHeader() })
  console.log(data)
  return data;
}

const FriendService = {inviteFriend, getFriendRequests, acceptFriend, declineFriend, getFriendReviews}

export default FriendService; 