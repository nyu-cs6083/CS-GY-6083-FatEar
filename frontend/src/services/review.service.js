import axios from "axios";
import {API_URL} from "../constants";
import authHeader from "./auth-header";

const postReview = async (songReview, songID) => {
  const {data} = await axios.post(`${API_URL}review`, {songReview, songID},{headers: authHeader()})
  console.log(songReview)
  console.log(songID)
  return data;
}

const getReview = async (songID) => {
  console.log(songID)
  const {data} = await axios.get(`${API_URL}review/${songID}`,{ headers: authHeader() })
  console.log(data)
  return data;
};

const ReviewService = {
  postReview, getReview
}

export default ReviewService;