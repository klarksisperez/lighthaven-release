import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
  ? props.location.search.split('=')[1]
  : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="row center">
        <div className="form-container wd-custom1 bg-custom text-white pd-6">
        <form className="form mg-0a" onSubmit={submitHandler}>
            <div>
                <h1 className="fz-lg">Log-in</h1>
                <p className="pos-custom1">Access limitless possibilities at <b>Lighthaven</b></p>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="error">{error}</MessageBox>}
            <div>
                <label htmlFor="email" className="col-form-label">Email address</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    className="text-line bb-white text-form-inner"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    className="text-line bb-white text-form-inner"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
            </div>
            <div>
                <label />
                <button className="primary" type="submit">
                    Sign In
                </button>
                </div>
                <div>
                <label />
                    <div>
                        New customer?{' '}
                        <Link className="backLink" to={`/register?redirect=${redirect}`}>
                            Create your account
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
}