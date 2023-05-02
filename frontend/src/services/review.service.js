import axios from "axios";
import {API_URL} from "../constants";
import authHeader from "./auth-header";

const postReview = async (songReview, songID) => {
  const {data} = await axios.post(`${API_URL}review`, {songReview, songID},{headers: authHeader()})
  console.log(songReview)
  console.log(songID)
  return data;
}

const ReviewService = {
  postReview
}

export default ReviewService;