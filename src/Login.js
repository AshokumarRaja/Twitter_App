import React ,{useState}from 'react'
import Twitter from './img/twitter2.png'
import './Login.css'
import SignUp from './SignUp'
const Login = () => {
    const[userId,setUserId]=useState("");
    const[password,setPassword]=useState("");
    const Login=(e)=>{
        e.preventDefault();
        setUserId("");
        setPassword("");
    }
    const signUp=()=>{
        console.log("1");
       const modal= document.getElementById("myModal").style.display="block";
       console.log(modal)
    }
    return (
        <div className="main">
             <div className="img">
                <img src={Twitter} className="twitter_backimg"/>
            </div>
            <div className="input">
            <h2>Login In To Tweeter</h2>
                <form onClick={Login}>
                    <input type="text"  placeholder="phone,email, or username" name="userId" id="name" value={userId} onChange={(e)=>setUserId(e.target.value)} required/>
                    <input type="password"  placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <button className="login" >Login</button>
                    <button className="signup" id="myBtn" onClick={signUp}>Sigup</button>
                </form>
              
            </div>
            <SignUp/>
        </div>
    )
}

export default Login
