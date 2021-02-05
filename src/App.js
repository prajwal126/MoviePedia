import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from './components/DashBoard';
import SavedMovies  from './components/SavedMovies';
import { UserContext } from "./providers/UserProvider";
import { AuthProvider } from "./providers/AuthContext";
import Movie from './components/Movie';
import Popular from './components/Popular';
import Login from './components/Login';
import TopMovies from './components/TopMovies';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
      <Router>
         <AuthProvider>
             <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/SavedMovies" component={SavedMovies} />
              <PrivateRoute exact path="/popular" component={Popular} />
              <PrivateRoute path="/Movie" component={Movie} />
              <PrivateRoute exact path="/top_rated" component={TopMovies} />
              <Route path="/" component={Login} />
             </Switch>
         </AuthProvider>
      </Router>
  );
}

export default App;