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
                {friendReviews.length ? friendReviews.map((reviewsByFriend)=>{
                    console.log(reviewsByFriend)
                    return(
                        <div>
                            <p>{reviewsByFriend.fname + ' ' + reviewsByFriend.lname + ' has reviewed ' + reviewsByFriend.title}</p>
                            <p>{reviewsByFriend.reviewText}</p>
                            <p>{reviewsByFriend.title}</p>
                            <p>{reviewsByFriend.username}</p>
                            <p>{reviewsByFriend.reviewDate.slice(0,10)}</p>
                        </div>
                    )
                }): <p>You have no new Friends News</p>}
            </div>
            <div id={'followers'}>
                <h5>Followers News</h5>
                {followsReviews.length ? followsReviews.map((reviewsByFollows)=>{
                    return(
                        <div style={{ border: '1px solid', marginTop: '16px'}}>
                            <p style={{color: 'blueviolet'}}>{reviewsByFollows.fname + ' ' + reviewsByFollows.lname + ' has' +
                                ' reviewed ' + reviewsByFollows.title + '!'}</p>
                            <p>{'Review Text: ' + reviewsByFollows.reviewText}</p>
                            <p>{'Review Date: ' + reviewsByFollows.reviewDate.slice(0,10)}</p>
                        </div>
                    )
                }) : <p>You have no new Followers News</p>}
            </div>
        </header>
    </div>
    <div style={{padding: '8px', height: '100vh', width: '40%', border: '2px solid cornflowerblue', backgroundColor: 'lightskyblue'}}>
        <header style={{marginBottom: '1rem'}}>
            <h3>
                New Songs
            </h3>
            {newSongs ? newSongs.map((newSongsByFavoriteArtist)=>{
                const {fname, lname, title, releaseDate, songURL} = newSongsByFavoriteArtist
                    return(
                        <div style={{display: 'flex'}}>
                            <p>{title + ' was released on ' + releaseDate.slice(0,10) + ' by ' + fname + ' ' + lname + '!'}</p>
                            <a style={{marginTop: '8px', marginLeft: '16px', border: '1px solid', height: '24px', color: 'yellow'}} href={`${songURL}`}>Listen Here</a>
                        </div>
                    )
                }): <p>There are no new songs released since you last logged in.</p>}
        </header>
    </div>
</div>)
}

export default Home;