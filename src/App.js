import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from './components/DashBoard';
import SavedMovies  from './components/SavedMovies';
import Movie from './components/Movie';
import Popular from './components/Popular';
import Login from './components/login';
import UserProvider from "./providers/UserProvider";
import TopMovies from './components/TopMovies';

function App() {

  // let userPath = `/${user}/SavedMovies`;
  return (
    <UserProvider>
    <Router>
    <div>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/SavedMovies">
            <SavedMovies />
          </Route>
          <Route path="/Movie">
            <Movie />
          </Route>
          <Route path="/popular">
            <Popular />
          </Route>
          <Route path="/top_rated">
            <TopMovies />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>

    </div>
    </Router>
    </UserProvider>
  );
}

export default App;