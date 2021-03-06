import React, { useEffect, useContext, useState } from "react";
import { useAuth } from "../providers/AuthContext";
import { moviedb,api_key } from "../moviedb";
import MovieItem from './MovieItem';
import UserProvider from "../providers/UserProvider";
import { Redirect,useHistory } from 'react-router-dom';
import VerticalMenu from "./VerticalMenu";

function Popular(){
  document.body.style = 'background: #feda6a;';
  const history = useHistory();
  const { currentUser, logout } = useAuth();

  const [messages,setMessages]=useState([]);
  useEffect(() => {
    let movieList=[];
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`)
    .then(res => res.json())
    .then(
      (result) => {
        movieList.push(result.results.map((movie) => {
            return <MovieItem key={Math.random()} title={movie.title} id={movie.id} overview={movie.overview} poster={movie.poster_path}/>;
          })) 
          setMessages(movieList[0])
        // setMessages(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error);
      }
    )
  },[])

  return (
    <div>
      <VerticalMenu name={currentUser.displayName} pic={currentUser.photoURL}/>
      <div className="ui segment" style={{marginLeft: 'auto', marginRight: 'auto',display: 'block', justifyContent: 'center', width: '80%', backgroundColor:'#1d1e22'}}>{messages}</div>
    </div>
  );

}
export default Popular;