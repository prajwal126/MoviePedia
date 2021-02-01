import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { Redirect,useHistory } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import VerticalMenu from "./VerticalMenu";
export default function Dashboard() {
    document.body.style = 'background: #feda6a;';
    const user = useContext(UserContext);
    const history = useHistory();
    const [input, setInput] = useState('');
    const [messages,setMessages]=useState([]);
    useEffect(() => {
        if (user==null) {
          history.push("/");
      }
    })
    
  console.log(messages)
  return (
    <div>
      <VerticalMenu name={user?user.displayName:''} pic={user?user.photoURL:''}/>
      <h1 className="ui header" style={{	fontFamily: '"Dancing Script",cursive"',fontSize: '80px',marginBottom: '30px',textAlign:'center'}}>MoviePedia <span><i className="video icon"></i></span></h1>  
      <div className="ui inverted segment">
        <div class="ui fluid inverted transparent action input">
          <input value={input} type="text" placeholder="Search Movies.." onInput={e => setInput(e.target.value)}/>
          <button class="ui icon button" onClick={()=>setMessages( <MovieDetails key={Math.random()} movie={input}/>)}>
            <i class="search icon"></i>
          </button>
        </div>
      </div>
      
        {Object.keys(messages).length>0?<div className="ui segment"  style={{marginLeft: 'auto', marginRight: 'auto',display: 'block', justifyContent: 'center', width: '80%', backgroundColor:'#1d1e22'}}>{messages}</div>:<div></div>}
      
    </div>
  );
}