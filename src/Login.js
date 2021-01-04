import React ,{useState}from 'react'
import firebase from './firebase'
import Twitter from './img/twitter2.png'
import './Login.css'
import SignUp from './SignUp'
import {Redirect,useHistory,useLocation} from 'react-router-dom'
const Login = (props) => {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/home" } };
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const login=(e)=>{
        e.preventDefault();
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
            localStorage.setItem("auth-token",user.uid);
            history.replace(from);
           
         })
        .catch((error) => {
         
          console.log(error)
        });     
  
    }
    const signUp=()=>{
        
       const modal= document.getElementById("myModal").style.display="block";
       
    }
    return (
        <div className="main">
             <div className="img">
                <img src={Twitter} className="twitter_backimg"/>
            </div>
            <div className="input">
            <h2>Login In To Tweeter</h2>
                <form onSubmit={login} autoComplete="off">
                    <input type="email"  placeholder="phone,email, or username" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}  />
                    <input type="password"  placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="off"/>
                    <button className="login" >Login</button>
                    <button className="signup" id="myBtn" onClick={signUp}>Sigup</button>
                </form>
              
            </div>
            <SignUp/>
        </div>
    )
}

  

export default Login;
