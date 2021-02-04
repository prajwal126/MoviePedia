import React, { useEffect, useContext, useState } from "react";
import { useAuth } from "../providers/AuthContext";
import { Redirect,useHistory } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import VerticalMenu from "./VerticalMenu";

export default function Dashboard() {
    document.body.style = 'background: #feda6a;';
    const history = useHistory();
    const { currentUser, logout } = useAuth();
   
    const [input, setInput] = useState('');
    const [messages,setMessages]=useState([]);
    
  return (
    
    <div>
      <VerticalMenu name={currentUser.displayName} pic={currentUser.photoURL}/>
      <h1 className="ui header" style={{	fontFamily: '"Dancing Script",cursive"',fontSize: '80px',marginBottom: '30px',textAlign:'center'}}>MoviePedia <span><i className="video icon"></i></span></h1>  
      <div className="ui inverted segment">
        <div className="ui fluid inverted transparent action input">
          <input value={input} type="text" placeholder="Search Movies.." onInput={e => setInput(e.target.value)}/>
          <button className="ui icon button" onClick={()=>setMessages( <MovieDetails key={Math.random()} movie={input}/>)}>
            <i className="search icon"></i>
          </button>
        </div>
      </div>
      
        {Object.keys(messages).length>0?<div className="ui segment"  style={{marginLeft: 'auto', marginRight: 'auto',display: 'block', justifyContent: 'center', width: '80%', backgroundColor:'#1d1e22'}}>{messages}</div>:<div></div>}
      
    </div>
  );
}