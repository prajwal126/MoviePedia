import React , { useEffect, useContext, useState } from 'react';
import { signInWithGoogle } from "../firebase";
import { UserContext } from '../providers/UserProvider';
import { useHistory } from 'react-router-dom';

function Login() {
   const user = useContext(UserContext)

   const history = useHistory();
   useEffect(() => {
    if (user) {
      history.push("/dashboard");
    }
  })

  return (
    <div style={{ height: '100vh',width: '100vw',display: 'grid', placeContent: 'center',backgroundColor: '#fff'}}>
    <div className="ui raised very padded text container center aligned segment" style={{padding:' 100px',textAlign: 'center',backgroundColor: '#fff'}}>
        <h2 className="ui header" >LogIn to MoviePedia!</h2>
        
        <button className="ui secondary button" onClick={signInWithGoogle}>
        <i class="google icon"></i>
        <span> SignIn with Google</span>
       </button>
      </div>
    </div>
  );
}

export default Login;