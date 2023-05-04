import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import {Navigate} from "react-router-dom";
import FriendService from "../services/friend.service";
import FollowService from "../services/follow.service";
import ArtistService from "../services/artist.service";

const Home = () => {
    const currentUser = AuthService.getCurrentUser();
    const [friendReviews, setFriendReviews] = useState([])
    const [followsReviews, setFollowsReviews] = useState([])
    const [newSongs, setNewSongs] = useState([])

    useEffect(async()=>{

        const reviewsByFriend = await FriendService.getFriendReviews()
        setFriendReviews(reviewsByFriend)

        const reviewsByFollows = await FollowService.getFollowsReviews()
        setFollowsReviews(reviewsByFollows)

        const newSongsByFavoriteArtist = await ArtistService.getNewSongs()
        setNewSongs(newSongsByFavoriteArtist)

    },[])


console.log(friendReviews)
    if (!currentUser) {
        return <Navigate to="/login" replace={true} />;
    }

    console.log(followsReviews)
    if (!currentUser) {
        return <Navigate to="/login" replace={true} />;
    }

return (<div style={{display: 'flex', justifyContent: 'space-between', width: '100%', height: '100vh', backgroundColor: 'cornflowerblue'}}>
    <div style={{padding: '8px', height: '100vh', width: '30%', border: '2px solid cornflowerblue', backgroundColor: 'snow'}}>
        <header style={{marginBottom: '1rem'}}>
            <h3>
                User Profile
            </h3>
        </header>
        <p>
            <strong>Username: </strong> {currentUser.username}
        </p>
        <p>
            <strong>First Name: </strong> {currentUser.fname}
        </p>
        <p>
            <strong>Last Name: </strong> {currentUser.lname}
        </p>
        <p>
            <strong>Email: </strong> {currentUser.email}
        </p>
        <p>
            <strong>Profile: </strong> {currentUser.userProfile}
        </p>
    </div>
    <div style={{padding: '8px', height: '100vh', width: '30%', border: '2px solid cornflowerblue', backgroundColor: 'azure'}}>
        <header style={{marginBottom: '1rem', display: 'flex', flexDirection: 'column'}}>
            <h3>
                Newsfeed
            </h3>
            <div id={'friends'} style={{height: 'fit-content'}}>
                <h5>Friends News</h5>
                {friendReviews && friendReviews.map((reviewsByFriend)=>{
                    return(
                        <div>
                            <p>{reviewsByFriend.reviewText}</p>
                            <p>{reviewsByFriend.title}</p>
                            <p>{reviewsByFriend.username}</p>
                            <p>{reviewsByFriend.reviewDate.slice(0,10)}</p>
                        </div>
                    )
                })}
            </div>
            <div id={'followers'}>
                <h5>Followers News</h5>
                {followsReviews && followsReviews.map((reviewsByFollows)=>{
                    return(
                        <div>
                            <p>{reviewsByFollows.reviewText}</p>
                            <p>{reviewsByFollows.title}</p>
                            <p>{reviewsByFollows.username}</p>
                            <p>{reviewsByFollows.reviewDate.slice(0,10)}</p>
                        </div>
                    )
                })}
            </div>
        </header>
    </div>
    <div style={{padding: '8px', height: '100vh', width: '40%', border: '2px solid cornflowerblue', backgroundColor: 'lightskyblue'}}>
        <header style={{marginBottom: '1rem'}}>
            <h3>
                New Songs
            </h3>
            {newSongs && newSongs.map((newSongsByFavoriteArtist)=>{
                    return(
                        <div>
                            <p>{newSongsByFavoriteArtist.title}</p>
                            <p>{newSongsByFavoriteArtist.releaseDate}</p>
                            <p>{newSongsByFavoriteArtist.songURL}</p>
                        </div>
                    )
                })}
        </header>
    </div>
</div>)
}

export default Home;