import React , { useEffect, useState } from 'react';
import MovieItem from './MovieItem';
import { moviedb,api_key } from "../moviedb";

function MovieDetails(props){

  const [messages,setMessages]=useState([]);
  const movie_name= props.movie;
  useEffect(() => {
    let movieList=[];
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query='${movie_name}`)
    .then(res => res.json())
    .then(
      (result) => {
        movieList.push(result.results.map((movie) => {
          return <MovieItem key={Math.random()} title={movie.title} id={movie.id} overview={movie.overview} poster={movie.poster_path}/>;
        })) 
        setMessages(movieList[0])
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
      {messages}
    </div>
  );

}
export default MovieDetails;