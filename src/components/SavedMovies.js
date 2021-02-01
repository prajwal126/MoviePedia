import React , { useContext, useState, useEffect } from 'react';
import { UserContext } from "../providers/UserProvider";
import { Redirect,useHistory } from 'react-router-dom';
import {firestore} from "../firebase";
import VerticalMenu from "./VerticalMenu";
import MovieItem from "./MovieItem";

function SavedMovies(props){
    const history = useHistory();
    const user = useContext(UserContext);
    var rootRef = firestore.collection('SavedMovieList').doc(user.email);
    const [messages,setMessages]=useState([]);
    useEffect(async () => {
        let movieList=[];
        let doc = await rootRef.get();
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
       }, []);
    return(
        <div>
            <VerticalMenu name={user?user.displayName:''} pic={user?user.photoURL:''}/>
            <div className="ui segment" style={{marginLeft: 'auto', marginRight: 'auto',display: 'block', justifyContent: 'center', width: '80%', backgroundColor:'#1d1e22'}}>{messages}</div>
        </div>
    )
}

export default SavedMovies;