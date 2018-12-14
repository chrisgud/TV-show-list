import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Redux imports
import { Provider } from "react-redux";
import store from "./store";

import Home from "./pages/Home";
import Search from "./pages/Search";
import WatchList from "./pages/WatchList";
import NoMatch from "./pages/NoMatch";
import TemporaryDrawer from "./components/Nav";
//import Landing from "./components/Landing";
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import SimpleMenu from "./components/Menu"


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
        <div className="App">
          <TemporaryDrawer />
          <SimpleMenu />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/watch-list" component={WatchList} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
