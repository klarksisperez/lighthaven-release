import {BrowserRouter, Link, Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import PrivateRoute from './components/PrivateRoute';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen'
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import logo1 from './images/lighten-logo.png';
  
import SearchScreen from './screens/SearchScreen';

function App() {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
      dispatch(signout());
    };
  return (
  <BrowserRouter>
    <div className="grid-container">
        <header className="row">
            <div className="res">
                {userInfo && userInfo.isAdmin ?(
                    <Link to="/"><img className="logo1" src={logo1} alt="lighthaven-logo"/><h6 className="logo2">Lighthaven Admin</h6></Link>
                ):(
                    <Link to="/"><img className="logo1" src={logo1} alt="lighthaven-logo"/><h6 className="logo2">Lighthaven</h6></Link>
                )}
            </div>
            <div className="links">
                {userInfo && userInfo.isAdmin && (
                <div className="dropdown"> 
                    <Link to="#admin">
                    Admin Tools&nbsp;<i className="fa fa-caret-down"></i>
                    </Link>
                    <ul className="dropdown-content">
                        <li>
                            <Link to="/productlist">Prod. CRUD</Link>
                        </li>
                        <li>
                            <Link to="/userlist">Users CRUD</Link>
                        </li>
                    </ul>
                </div>
                )}
                {userInfo ? (
                <div className="dropdown">
                    <Link to="#">
                    {userInfo.name}&nbsp;<i className="fa fa-caret-down"></i>{' '}
                    </Link>
                    <ul className="dropdown-content">

                    <li>
                        <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                        <Link to="/#signout" onClick={signoutHandler}>
                        Sign Out
                        </Link>
                    </li>
                    </ul>
                </div>
                ) : (
                <Link to="/signin">Log in</Link>
                )}
            </div>
        </header>
        <main>
            <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
            <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>

            <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
            <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
            <Route exact path="/" component={HomeScreen}></Route>
            <Route exact path="/product/:id/edit" component={ProductEditScreen}></Route>
            <Route exact path="/product/:id" component={ProductScreen}></Route>
            <Route exact path="/fb_lighten" render={() => (window.location = "https://www.facebook.com")} />
            <Route exact path="/ig_lighten" render={() => (window.location = "https://www.instagram.com")} /> 
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            
            <Route
            path="/search/title/:title?"
            component={SearchScreen}
            exact
            ></Route>

        </main>
        <footer className="row center">
            <div className="col-1 pd-6">
                <span className="fz-2">
                    <Link to="/fb_lighthaven" target="_blank"><i className="fa fa-facebook-square"></i></Link>
                    &nbsp;&nbsp;
                    <Link to="/ig_lighthaven" target="_blank"><i className="fa fa-instagram"></i></Link>
                    &nbsp;
                    |
                </span>
                &nbsp;&nbsp;©2021 Lighthaven. All Rights Reserved.
            </div>  
        </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
