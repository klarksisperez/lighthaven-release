import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setIsActivated(user.isActivated);
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email, isAdmin, isActivated }));
  };
  return (
    <div className="row center">
      <div className="form-container bg-custom text-white pd-6">
            <form className="form mg-0a" onSubmit={submitHandler}>
                <div>
                <h1>Edit User: <u>{name}</u> </h1>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && (
                    <MessageBox variant="error">{errorUpdate}</MessageBox>
                )}
                </div>
                {loading ? (
                <LoadingBox />
                ) : error ? (
                <MessageBox variant="error">{error}</MessageBox>
                ) : (
                <>
                    <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter name"
                        className="text-line bb-white text-form-inner"
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
                        className="text-line bb-white text-form-inner"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    </div>
                    <div>
                    <label htmlFor="isAdmin">Admin Status</label>
                    <ul>
                        <li>
                            <input
                            id="isAdmin"
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            ></input>
                            Checked means ADMIN
                        </li>
                    </ul>
                    </div>
                    <div>
                    <p>Activation Status</p>
                    <ul>
                        <li>
                            <input
                            name="isActivated"
                            id="isActivatedTrue"
                            type="radio"
                            value = "true"
                            onChange={(e) => setIsActivated(e.target.value)}
                            ></input>
                            <label for="isActivatedTrue">Activated</label>
                        </li>
                        <li>
                            <input
                            name="isActivated"
                            id="isActivatedFalse"
                            type="radio"
                            value = "false"
                            onChange={(e) => setIsActivated(e.target.value)}
                            ></input>
                            <label for="isActivatedFalse">Deactivated</label>
                        </li>
                    </ul>
                    <br/>
                    </div>
                    <div>
                    <button type="submit" className="primary">
                        Update
                    </button>
                    </div>
                </>
                )}
            </form>
        </div>
    </div>
  );
}