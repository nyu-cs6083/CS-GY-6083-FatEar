import axios from "axios";
import authHeader from "./auth-header";
import {API_URL} from "../constants";

// For getting reccommended songs for current user
const getRecommendedSongsForCurrentUser = async () => {
  const {data} = await axios.get(`${API_URL}songs/recommended`,{ headers: authHeader() })
  console.log(data)
  return data;
}

const ArtistService = {getRecommendedSongsForCurrentUser}

export default ArtistService;