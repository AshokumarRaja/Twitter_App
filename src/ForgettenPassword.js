import React,{useState} from 'react'
import Image from './img1/logo .png'
import firebase from './firebase'
const ForgettenPassword = () => {
    const[email,setEmail]=useState("");
    const[error,setError]=useState("");
    const close=()=>{
        document.getElementsByClassName("modal1")[0].style.display="none";
        setError("");
        setEmail("");
    }

    const Forgetten=(e)=>{
        e.preventDefault();
      
        firebase
     .auth().sendPasswordResetEmail(email).then((user)=>{
        document.getElementsByClassName("modal1")[0].style.display="none";
        alert("Reset Link Sent Your Mail");
        setEmail("");
        setError("");
     }).catch((err)=>{
         setError(err);
     })
    
       
    }
   
    return (
        <div id="myModal" className="modal modal1">
        <div className="modal-content">
          <span className="close" onClick={close}>&times;</span>
          <div className="form">
           <form  autoComplete="off"  onSubmit={Forgetten} >
           <img src={Image}   className="twitter_icon"/>
               <h2>Forgetten Password</h2>
                
               <input type="text"  placeholder="Enter the Email" id="username1" value={email} onChange={(e)=>setEmail(e.target.value)} required/><br/>
               <p style={{textAlign:"center",color:"red",marginBottom:"10px"}}>{error.message}</p>
               <button id="submit"  >Submit</button>
           </form>
          
        </div>
        </div>
      
      </div>
    )
}

export default ForgettenPassword
