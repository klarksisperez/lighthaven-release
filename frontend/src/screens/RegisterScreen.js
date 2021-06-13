import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match');
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div className="row center">
        <div className="form-container bg-custom text-white pd-6">
      <form className="form mg-0a" onSubmit={submitHandler}>
        <div>
          <h1 className="fz-lg">Create Account</h1>
          <p className="pos-custom1">Join the World of <b>Lighthaven</b> here!</p>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="error">{error}</MessageBox>}
        <div>
          <label htmlFor="name" className="col-form-label">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            className="text-line bb-white text-form-inner"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
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
          <label htmlFor="password" className="col-form-label">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className="text-line bb-white text-form-inner"
            pattern=".{8,}" 
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword" className="col-form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="text-line bb-white text-form-inner"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{' '}
            <Link className="backLink" to={`/signin?redirect=${redirect}`}>Login</Link>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
}