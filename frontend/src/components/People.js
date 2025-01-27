import PeopleService from '../services/people.service';
import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import {isEmpty} from "lodash";
import AuthService from "../services/auth.service";
import FollowService from '../services/follow.service';
import {UserModal} from "./UserModal";

const People = () => {
    const [values, setValues] = useState({});
    const [isDisabled, setIsDisabled] = useState(false)
    const [peopleResults, setPeopleResults] = useState([])
    const [showUserModal, setShowUserModal] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [userInView, setUserInView] = useState(undefined)
    const handleChange = event => {
        setValues(prevValues => ({
            ...prevValues,
            // we use the name to tell Formik which key of `values` to update
            [event.target.name]: event.target.value
        }))

    }


    const handleSubmit = async (values) => {
        setHasSubmitted(true)
        const peopleResults = await PeopleService.getPeopleResults({...values})
        if (!isEmpty(peopleResults)) {
            setPeopleResults(peopleResults)
        }
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: ''
        },
        onSubmit: (values) => handleSubmit(values),
        handleChange
    });

    useEffect(() => {
        if (Object.values(formik.values).every((v) => !v)) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [formik.values])

  const currentUser = AuthService.getCurrentUser();
    return (
        <div style={{display: 'flex', height: '100%', width: '100%', marginLeft: '32px', marginTop: '32px'}}>
            {showUserModal && <UserModal setShowUserModal={setShowUserModal} user={userInView} />}
            <div>
                <h3>User Search</h3>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    />

                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <div style={{marginTop: '1rem'}}>
                        <button type="submit" disabled={isDisabled}>Find</button>
                    </div>
                </form>
            </div>
            {!hasSubmitted ? <div></div> : isEmpty(peopleResults) ?
                <div style={{marginLeft: '10rem'}}> There are no results from your search. Please try again. </div> :
                <table style={{marginLeft: '10rem', height: 'fit-content'}}>
                    <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email Address</th>
                      <th>Profile</th>
                    </tr>
                    </thead>
                    <tbody>
                    {peopleResults.map((res, idx) => {
                        return (<tr key={idx}>
                          <td onClick={()=>{setShowUserModal(true)
                          setUserInView(res)}}>{res.fname} {res.lname}</td>
                          <td>{res.email}</td>
                          <td>{res.userProfile}</td>
                        </tr>)
                    })}
                    </tbody>
                </table>}

        </div>

    );
};

export default People;