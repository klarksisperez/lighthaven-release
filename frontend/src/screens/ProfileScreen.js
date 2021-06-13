import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(detailsUser(userInfo._id));
      } else {
        setName(user.name);
        setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
        alert('Password and Confirm Password Are Not Matched');
      } else {
        dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };

return (
    
    <div className="container-nonbd">
        {loading ? (
            <LoadingBox></LoadingBox>
            ) : error ? (
            <MessageBox variant="error">{error}</MessageBox>
            ) : (
            <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
            <MessageBox variant="error">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
            <MessageBox variant="success">
                Profile Updated Successfully
            </MessageBox>
            )}
        <div className="row">
            <div className="col-2">
                <h1 className="text-white">My Profile Badge</h1>
                <div className="card card-body bg-custom">
                    <div className="row">
                        <div className="col-1">
                            <img src={user.image} alt={user.image} className="avatar-lg"/>
                            <div className="pos-custom3">
                                <h1 className="text-white">{user.name}</h1>
                                <p className="pos-custom2 text-white italic">{user.email}</p>
                            </div>
                        </div>
                        {user.isAdmin ? (
                            <div className="col-1">
                                <span><h1 className="watermark">lighten.admin</h1></span>
                            </div>
                        ):(
                            <div className="col-1">
                                <span><h1 className="watermark">lighten.user</h1></span>
                            </div>
                        )}
                    </div>
                    
                    <hr/>
                </div>
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <form className="form mg-1rem" onSubmit={submitHandler}>
                        <div>
                            <h1>Update Profile</h1>
                        </div>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter name"
                                    className="text-line bb-black text-white"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                                </div>
                                <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter email"
                                    className="text-line bb-black text-white"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                                </div>
                                <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="text-line bb-black"
                                ></input>
                                </div>
                                <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Enter confirm password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="text-line bb-black"
                                ></input>
                                </div>
                                <div>
                                <label />
                                <button className="primary" type="submit">
                                    Update
                                </button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
        </>
        )}
    </div>
  );
}