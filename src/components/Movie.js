import React , { useEffect,useContext, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { moviedb,api_key } from "../moviedb";
import {firestore} from "../firebase";
import firebase from "../firebase";
import { useAuth } from "../providers/AuthContext";
import CommentItem from './CommentItem';
import Moment from 'moment-timezone';
import VerticalMenu from "./VerticalMenu";

function Movie(props){
    document.body.style = 'background: #feda6a;';
    const history = useHistory();
    const { currentUser, logout } = useAuth();

    let id = history.location.search;
    const movieId = id.toString().substr(1);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [cast, setCast] = useState([]);  
    const [messages,setMessages]=useState([]);
    const [comment,setComment]=useState('');

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

    var rootRef = firestore.collection('MovieReviews').doc(movieId);
    function timeConverter(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month;
      return time;
    }
    
    useEffect(async () => {
        let movieList=[];
        let doc = await rootRef.get();
        if (!doc.exists) {
          console.log('No such document!');
        } else {
            let data= doc.data();
            data = Object.entries(data);
            
            movieList.push(data.map(([key,movie]) => {
                return <CommentItem key={Math.random()} timestamp={timeConverter(movie.timestamp)} email={key} pic={movie.pic} comment={movie.comment}/>;
              })) 
              setMessages(movieList[0])
        }
       }, []);

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
      let k=0;
      for(c in castArray){
        if(castArray[c].profile_path!=null && k<5){
          const imgURL=`https://image.tmdb.org/t/p/w500${castArray[c].profile_path}`;
          const card=<div className="ui card"><div className="image"><img src={imgURL}/></div>
          <div className="content">
            <a className="header">{castArray[c].character}</a>
            <div className="description">{castArray[c].name}</div>
          </div>
        </div>
          castDetails.push(card)
          k++;
        }

      }
  }
  const saveComment = () => {
    rootRef.set({[currentUser.email.toString()]:{timestamp: firebase.firestore.FieldValue.serverTimestamp(),comment,pic:currentUser.photoURL}})
    .then(function() {
        console.log("Document successfully written!");
        window.location.replace('/Movie?'+movieId);
    },[messages])
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }


    return(
      <div>
        <VerticalMenu name={currentUser.displayName} pic={currentUser.photoURL}/>
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
        <div class="ui inverted segment" style={{marginLeft: 'auto', marginRight: 'auto', width: '50%'}}>
        <div class="ui inverted form">
          <div class="field">
            <textarea placeholder='Write a short review!'  rows="2" onInput={e => setComment(e.target.value)}></textarea>
          </div>
          <button class="ui primary button" onClick={saveComment}>
            Save
          </button>
        </div>
        <div className="ui comments">
        <h3 className="ui inverted dividing header">User Reviews</h3>
            {messages}
        </div>
      </div>
      </div>
    );
}

export default Movie;