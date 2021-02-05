import React, { useEffect, useContext, useState } from "react";
import { logOut } from "../firebase";
import { useAuth } from "../providers/AuthContext"
import { Redirect,useHistory } from 'react-router-dom';
function VerticalMenu(props){
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    async function handleLogout() {
        setError("")
        try {
          await logout()
          history.push("/")
        } catch {
          setError("Failed to log out")
        }
      }
    return(
        <div className="ui inverted pointing menu" style={{marginLeft: 'auto', marginRight: 'auto',justifyContent: 'center', width: '50%'}}>
        <div className="item">
            <img className="ui mini image" src={props.pic} style={{marginRight:'10px'}}/>
            <span>Welcome, {props.name}</span>
        </div>
        <a className="item" onClick={()=>{history.push( { pathname: '/dashboard'})}}>Home</a>
        <a className="item" onClick={()=>{history.push( { pathname: '/top_rated'})}}>G.O.A.T</a>
        <a className="item" onClick={()=>{history.push( { pathname: '/popular'})}}>Popular</a>
        <a className="item" onClick={()=>{history.push( { pathname: '/SavedMovies'})}}>Watchlist</a>
        <a className="item" onClick={handleLogout}>
        <i className="google icon"></i>
        <span>Sign-Out</span>    
        </a>
        </div>
    );

}

export default VerticalMenu;