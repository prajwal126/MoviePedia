import React , { useContext, useState, useEffect } from 'react';
import { useAuth } from "../providers/AuthContext";
import { Redirect,useHistory } from 'react-router-dom';
import {firestore} from "../firebase";
import MovieItem from "./MovieItem";
import VerticalMenu from "./VerticalMenu";

function SavedMovies(props){
    const history = useHistory();
    const { currentUser, logout } = useAuth();

    var rootRef = firestore.collection('SavedMovieList').doc(currentUser.email);

    const [messages,setMessages]=useState([]);
    useEffect(async () => {
        let movieList=[];
        var getDoc = rootRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
              } else {
                  let data= doc.data();
                  data = Object.entries(data);
                  movieList.push(data.map(([key,movie]) => {
                      return <MovieItem key={Math.random()} title={movie.props.title} id={movie.props.id} overview={movie.props.overview} poster={movie.props.poster} del='true'/>;
                    })) 
                    setMessages(movieList[0])
              }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });

       },[]);
    return(
        <div>
            <VerticalMenu name={currentUser.displayName} pic={currentUser.photoURL}/>
            <div className="ui segment" style={{marginLeft: 'auto', marginRight: 'auto',display: 'block', justifyContent: 'center', width: '80%', backgroundColor:'#1d1e22'}}>{messages}</div>
        </div>
    )
}

export default SavedMovies;