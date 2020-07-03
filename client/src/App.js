import React from 'react';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Navbar from "./components/Navbar/Navbar"
import Register from "./components/Registration/Registration"
import Login from "./components/Login/Login"
import { Provider } from "react-redux";
import store from "./store";


import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
 import EditPosts from "./components/edit-posts.component";
 import CreatePosts from "./components/create-posts.component";
import PostsList from './components/posts-list.component';
// import CreateUser from "./components/create-user.component";
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          
          <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard}  />
              <PrivateRoute exact path="/create" component={CreatePosts} />
              <PrivateRoute exact path="/newsfeed" component={PostsList} />
              <PrivateRoute path="/edit/:id" component={EditPosts} />
            </Switch>
      </div>
    </Router>
    </Provider>
  );
}

export default App;