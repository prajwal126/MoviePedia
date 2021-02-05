import React , { useEffect, useContext, useState } from 'react';
import { Redirect,useHistory } from 'react-router-dom';
import { moviedb } from "../moviedb";
import {firestore} from "../firebase";
import firebase from "../firebase";
import { useAuth } from "../providers/AuthContext";

function MovieItem(props){
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  const url = `https://image.tmdb.org/t/p/w500${props.poster}`
  const movieUrl  = `${props.id}`
  const [error,setError]=useState();
  const loadMovie = () => history.push( { pathname: '/Movie',
  search: movieUrl});

  var rootRef = firestore.collection('SavedMovieList').doc(currentUser.email);
  const saveMovie = () => {
    let flag=false;
    rootRef.get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          rootRef.update({[props.id]: {props}})
          .then(function(docRef) {
              console.log("Tutorial created with ID: ", docRef.id);
              flag=true;
          })
          .catch(function(err) {
              setError(err);
          });;

        } else {
          rootRef.set({[props.id]: {props}})
          .then(function() {
              console.log("Document successfully written!");
              flag=true;
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });
        }
        window.location.replace('/SavedMovies');
    });
        
    }

  const deleteMovie = () => {
      rootRef.update({
        [props.id]:firebase.firestore.FieldValue.delete()
      }).then(()=>{
        window.location.replace('/SavedMovies');
      })   
    }
  
  function saveButton(){
    return (<div className="ui vertical animated button" tabIndex="0" onClick={saveMovie}>
      <div className="hidden content">Save</div>
      <div className="visible content">
        <i className="save icon"></i>
      </div>
    </div>)
  }
  function delButton(){
    return (<div className="ui vertical animated button" tabIndex="0" onClick={deleteMovie}>
      <div className="hidden content">Delete</div>
      <div className="visible content">
        <i className="trash icon"></i>
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
          <div className="ui animated button" tabIndex="0" onClick={loadMovie}>
            <div className="visible content">View</div>
            <div className="hidden content">
              <i className="right arrow icon"></i>
            </div>
          </div>
          {props.del=='true'?delButton():saveButton()}

        </div>
      </div>
    </div>
    <div className="ui inverted divider"></div>
  </div>
 
  )
}

export default MovieItem;