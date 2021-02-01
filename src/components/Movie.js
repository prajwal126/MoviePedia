import React , { useEffect,useContext, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { moviedb,api_key } from "../moviedb";
import VerticalMenu from "./VerticalMenu";
import { UserContext } from "../providers/UserProvider";
function Movie(props){
    const user = useContext(UserContext);
    const history = useHistory();
    let id = history.location.search;
    const movieId = id.toString().substr(1);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [cast, setCast] = useState([]);  

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}`)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setCast(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
    }, [])

  const backdrop_url = `https://image.tmdb.org/t/p/w500${items.poster_path}`;
//   const genreList = messages.genre;
  let genres='';
  if(items){
    const genreArray = items.genres;
    let genre={}
    for( genre in genreArray){
        genres+=genreArray[genre].name+ ", ";
      }
    genres = genres.substr(0,genres.length -2)
  }

  let castDetails=[];
  if(cast){
      const castArray = cast.cast;
      let c={}
      for(c in castArray){
        const imgURL=`https://image.tmdb.org/t/p/w500${castArray[c].profile_path}`;
        const card=<div className="ui card"><div className="image"><img src={imgURL}/></div>
        <div className="content">
          <a className="header">{castArray[c].character}</a>
          <div className="description">{castArray[c].name}</div>
        </div>
      </div>
        castDetails.push(card)
      }


  }

  console.log(cast)
  console.log(castDetails);
    return(
      <div>
      <VerticalMenu name={user?user.displayName:''} pic={user?user.photoURL:''}/>
        <div className="ui segments" style={{marginLeft: 'auto', marginRight: 'auto',display: 'block',textAlign: 'center', justifyContent: 'center', width: '50%'}}>
                <div className="ui inverted segment">
                    <img className="ui image" style={{marginLeft: 'auto', marginRight: 'auto',display: 'block'}} src={backdrop_url}/>
                </div>
                <div className="ui inverted segment">
                    <h2 className="ui header">{items.original_title} </h2>

                </div>
                <div className="ui inverted segment">
                    <h5 className="ui header">Genre: {genres} </h5>
                    <h5 className="ui header">
                        Rating: 
                        <i class="red heart icon" style={{marginLeft:'5px'}}></i>
                         {items.vote_average} 
                    </h5>
                    <h5 className="ui header">Release: {items.release_date} </h5>
                </div>
                <div className="ui inverted segment">
                    <p style={{fontStyle:'italic'}}>{items.tagline}</p>
                </div>
                <div className="ui inverted segment">
                    <p>{items.overview} </p>
                </div>
                <div className="ui inverted segment">
                  <div class="ui link cards"> 
                      {castDetails}
                  </div>
                </div>
        </div>
      </div>
    );
}

export default Movie;