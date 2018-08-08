import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {logoutUser, setCurrentUser} from './actions/authActions';
import {clearCurrentProfile} from './actions/profileActions';

import {Provider} from 'react-redux'
import store from './store';

import './App.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Regiser from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dasboard/Dashboard';

//check token
if(localStorage.jwtToken) {
    //set auth token header auth
    setAuthToken(localStorage.jwtToken);
    //Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    //Set user and isAuth
    store.dispatch(setCurrentUser(decoded));
    //Check for expire token
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
        //Logout user
        store.dispatch(logoutUser());
        //Clear current profile
	    store.dispatch(clearCurrentProfile());
        //Redirect user
        window.location.href = '/login'
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar />

                        <Route exact path='/' component={Landing}/>

                        <div className="container">
                            <Route exact path='/register' component={Regiser}/>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/dashboard' component={Dashboard}/>
                        </div>

                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
