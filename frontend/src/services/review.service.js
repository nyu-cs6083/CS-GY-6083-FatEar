import axios from "axios";
import {API_URL} from "../constants";
import authHeader from "./auth-header";

const postReview = async (songReview, songID) => {
  const {data} = await axios.post(`${API_URL}review`, {songReview, songID},{headers: authHeader()})
  return data;
}

const getReview = async (songID) => {
  const {data} = await axios.get(`${API_URL}review/${songID}`,{ headers: authHeader() })
  return data;
};

const ReviewService = {
  postReview, getReview
}

export default ReviewService;