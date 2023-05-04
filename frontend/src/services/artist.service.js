import axios from "axios";
import authHeader from "./auth-header";
import {API_URL} from "../constants";

const getNewSongs = async () => {
  const {data} = await axios.get(`${API_URL}artist/favorite/newsongs`,{ headers: authHeader() })
  console.log(data)
  return data;
}

const ArtistService = {getNewSongs}

export default ArtistService; 