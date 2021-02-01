import React , { useEffect, useContext, useState } from 'react';
import { Redirect,useHistory } from 'react-router-dom';
import { moviedb } from "../moviedb";
import {firestore} from "../firebase";
import { UserContext } from "../providers/UserProvider";

function MovieItem(props){
  const history = useHistory();
  const user = useContext(UserContext);
  const url = `https://image.tmdb.org/t/p/w500${props.poster}`
  const movieUrl  = `${props.id}`

  const loadMovie = () => history.push( { pathname: '/Movie',
  search: movieUrl});

  var rootRef = firestore.collection('SavedMovieList').doc(user.email);
  const saveMovie = () => {
      rootRef.update({[props.id]: {props}})
      .then(function(docRef) {
          console.log("Tutorial created with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding Tutorial: ", error);
      });;
      history.push( { pathname: '/SavedMovies'});
    }
  const deleteMovie = () => {
    let updates = {};
    updates[props.id] = firestore.INTERNAL.delete();
      rootRef.update({
          updates
      });
      history.push( { pathname: '/SavedMovies'});
    }
  
  function saveButton(){
    return (<div class="ui vertical animated button" tabindex="0" onClick={saveMovie}>
      <div class="hidden content">Save</div>
      <div class="visible content">
        <i class="save icon"></i>
      </div>
    </div>)
  }
  function delButton(){
    return (<div class="ui vertical animated button" tabindex="0" onClick={deleteMovie}>
      <div class="hidden content">Delete</div>
      <div class="visible content">
        <i class="trash icon"></i>
      </div>
    </div>)
  }

  

  return(
  <div className="ui divided items">
    <div className="item">
      <div className="image">
          
        <img src={url}/>
      </div>
      <div className="content">
        <a className="header"></a>
        <div className="meta">
          <span className="cinema" style={{color:'whitesmoke'}}>{props.title}</span>
        </div>
        <div className="description">
          <p style={{color:'whitesmoke'}}>{props.overview}</p>
        </div>
        <div className="extra">
          <div class="ui animated button" tabindex="0" onClick={loadMovie}>
            <div class="visible content">View</div>
            <div class="hidden content">
              <i class="right arrow icon"></i>
            </div>
          </div>
          {props.del=='true'?delButton():saveButton()}

        </div>
      </div>
    </div>
    <div class="ui inverted divider"></div>
  </div>
 
  )
}

export default MovieItem;