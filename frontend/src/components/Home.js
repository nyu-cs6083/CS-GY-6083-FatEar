import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import {Navigate} from "react-router-dom";
import FriendService from "../services/friend.service";

const Home = () => {
    const currentUser = AuthService.getCurrentUser();
    const [friendReviews, setFriendReviews] = useState([])

    useEffect(async()=>{
        const reviews = await FriendService.getFriendReviews()
        setFriendReviews(reviews)
    },[])
console.log(friendReviews)
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
                {friendReviews && friendReviews.map((review)=>{
                    return(
                        <div>
                            <p>{review.reviewText}</p>
                            <p>{review.title}</p>
                            <p>{review.username}</p>
                            <p>{review.reviewDate.slice(0,10)}</p>
                        </div>
                    )
                })}
            </div>
            <div id={'followers'}>
                <h5>Followers News</h5>
            </div>
        </header>
    </div>
    <div style={{padding: '8px', height: '100vh', width: '40%', border: '2px solid cornflowerblue', backgroundColor: 'lightskyblue'}}>
        <header style={{marginBottom: '1rem'}}>
            <h3>
                New Songs
            </h3>
        </header>
    </div>
</div>)
}

export default Home;