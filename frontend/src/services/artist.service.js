import axios from "axios";
import authHeader from "./auth-header";
import {API_URL} from "../constants";

// For getting all new songs of user's favorite artists
const getNewSongs = async () => {
  const {data} = await axios.get(`${API_URL}artist/favorite/newsongs`,{ headers: authHeader() })
  return data;
}

const ArtistService = {getNewSongs}

export default ArtistService;