import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import {Navigate} from "react-router-dom";
import FriendService from "../services/friend.service";
import FollowService from "../services/follow.service";
import ArtistService from "../services/artist.service";
import PeopleService from "../services/people.service";
import SongsService from "../services/songs.service";
import {isEmpty} from "lodash";

const Home = () => {
    const currentUser = AuthService.getCurrentUser();
    const [friendReviews, setFriendReviews] = useState([])
    const [followsReviews, setFollowsReviews] = useState([])
    const [newSongs, setNewSongs] = useState([])
    const [recommendedSongs, setRecommendedSongs] = useState([])

    useEffect(async()=>{

        const reviewsByFriend = await FriendService.getFriendReviews()
        setFriendReviews(reviewsByFriend)

        const reviewsByFollows = await FollowService.getFollowsReviews()
        setFollowsReviews(reviewsByFollows)

        const newSongsByFavoriteArtist = await ArtistService.getNewSongs()
        setNewSongs(newSongsByFavoriteArtist)

        await PeopleService.getProfile(currentUser.username)

        const recommendedSongs = await SongsService.getRecommendedSongsForCurrentUser()
        setRecommendedSongs(recommendedSongs)

    },[])


    if (!currentUser) {
        return <Navigate to="/login" replace={true} />;
    }

    const userProfile = PeopleService.getCurrentUserProfile()
return (<div style={{display: 'flex', justifyContent: 'space-between', width: '100%', height: '100vh', backgroundColor: 'cornflowerblue'}}>
    <div style={{padding: '8px', height: '100vh', width: '30%', border: '2px solid cornflowerblue', backgroundColor: 'snow'}}>
        <header style={{marginBottom: '1rem'}}>
            <h3>
                User Profile
            </h3>
        </header>
        <p>
            <strong>Username: </strong> {userProfile.username}
        </p>
        <p>
            <strong>First Name: </strong> {userProfile.fname}
        </p>
        <p>
            <strong>Last Name: </strong> {userProfile.lname}
        </p>
        <p>
            <strong>Email: </strong> {userProfile.email}
        </p>
        <p>
            <strong>Profile: </strong> {userProfile.userProfile}
        </p>
        <p>
            {userProfile.numFriends ?? 0} Friends
        </p>
        <p>
            {userProfile.numFollowers ?? 0} Followers
        </p>
    </div>
    <div style={{padding: '8px', height: '100vh', width: '30%', border: '2px solid cornflowerblue', backgroundColor: 'azure'}}>
        <header style={{marginBottom: '1rem', display: 'flex', flexDirection: 'column'}}>
            <h3>
                Newsfeed
            </h3>
            <div id={'friends'} style={{height: 'fit-content', marginBottom: '16px'}}>
                <h5 style={{color: 'mediumblue'}}>Friends News</h5>
                {friendReviews.length ? friendReviews.map((reviewsByFriend)=>{
                    return(
                        <div style={{ border: '1px solid', marginTop: '16px', backgroundColor: 'lavenderblush'}}>
                            <p style={{color: 'blueviolet'}}>{reviewsByFriend.fname + ' ' + reviewsByFriend.lname + ' has' +
                                ' reviewed ' + reviewsByFriend.title + ' by ' + reviewsByFriend.artistFname + ' ' + reviewsByFriend.artistLname + '!'}</p>
                            <p>{'Review Text: ' + reviewsByFriend.reviewText}</p>
                            <p>{'Review Date: ' + reviewsByFriend.reviewDate.slice(0,10)}</p>
                        </div>
                    )
                }): <p>You have no new Friends News</p>}
            </div>
            <div id={'followers'}>
                <h5 style={{color: 'mediumblue'}}>Followers News</h5>
                {followsReviews.length ? followsReviews.map((reviewsByFollows)=>{
                    return(
                        <div style={{ border: '1px solid', marginTop: '16px', backgroundColor: 'lavender'}}>
                            <p style={{color: 'blueviolet'}}>{reviewsByFollows.fname + ' ' + reviewsByFollows.lname + ' has' +
                                ' reviewed ' + reviewsByFollows.title + ' by ' + reviewsByFollows.artistFname + ' ' + reviewsByFollows.artistLname + '!'}</p>
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
            {!isEmpty(newSongs) ? newSongs.map((newSongsByFavoriteArtist)=>{
                const {fname, lname, title, releaseDate, songURL} = newSongsByFavoriteArtist
                    return(
                        <div style={{display: 'flex'}}>
                            <p>{title + ' was released on ' + releaseDate.slice(0,10) + ' by ' + fname + ' ' + lname + '!'}</p>
                            <a style={{marginTop: '8px', marginLeft: '16px', border: '1px solid', height: 'fit-content', color: 'yellow'}} href={`${songURL}`}>Listen Here</a>
                        </div>
                    )
                }): <p>There are no new songs released since you last logged in.</p>}
            <h3 style={{marginTop: '16px'}}>
               Songs You Might Like...
            </h3>
            {!isEmpty(recommendedSongs) ? recommendedSongs.map((song)=>{
                const {fname, lname, title, releaseDate, songURL} = song
                return ( <div style={{display: 'flex'}}>
                    <p>{title + ' was released on ' + releaseDate.slice(0,10) + ' by ' + fname + ' ' + lname + '!'}</p>
                    <a style={{marginTop: '8px', marginLeft: '16px', border: '1px solid', height: 'fit-content', color: 'yellow'}} href={`${songURL}`}>Listen Here</a>
                </div>)
            }) : <span>Unable to make recommendations as you are a new user</span>}
        </header>
    </div>
</div>)
}

export default Home;