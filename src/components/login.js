import React , { useEffect, useContext, useState } from 'react';
import { signInWithGoogle } from "../firebase";
import { UserContext } from '../providers/UserProvider';
import { useHistory,Redirect  } from 'react-router-dom';
import { useAuth } from "../providers/AuthContext"

function Login() {
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  document.body.style = 'background: #feda6a;';

  async function handleSubmit() {
    try {
      setError("")
      setLoading(true)
      await login();
      history.push("/dashboard")
      
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <div style={{ height: '100vh',width: '100vw',display: 'grid', placeContent: 'center'}}>
    <div className="ui raised very padded text container center aligned inverted segment" style={{padding:' 100px',textAlign: 'center'}}>
        <h2 className="ui header" >Login to MoviePedia!</h2>
        
        <button className="ui primary button" onClick={handleSubmit}>
        <i className="google icon"></i>
        <span> SignIn with Google</span>
       </button>
      </div>
    </div>
  );
}

export default Login;