import React ,{useState}from 'react'
import firebase from './firebase'
import './SignUp.css'
import TwitterIcon from '@material-ui/icons/Twitter'
const SignUp = (props) => {

    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[mobile,setMobile]=useState("");
    const[error,setError]=useState("");
    const submitValue=(e)=>{
       const random=Math.round( Math.random()*10000);
      
        e.preventDefault();
      
        firebase
     .auth()
     .createUserWithEmailAndPassword(email, password)
     .then((user) => {
         
        firebase.database().ref(`regusers`).push({
            id:user.uid,
            name,
            username:`@${name}${random}`,
            email:email.toLowerCase(),
            password,
            mobile,
            posts:0
        }).then(()=>{
            document.getElementById("myModal").style.display="none";
            
            setName("");
            setEmail("");
            setMobile("");
            setPassword("");
           
        })
     })
     .catch((error) => {
        setError(error);
        console.log(error)
     });
  
    }
    const close=()=>{
        document.getElementById("myModal").style.display="none";
    }
    return (
        <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={close}>&times;</span>
          <div className="form">
           <form onSubmit={submitValue} autoComplete="off" >
               <TwitterIcon  className="twitter_icon"/>
               <h2>Create Your account</h2>
              
               <input type="text"  placeholder="Enter the User Name" id="username" value={name} onChange={(e)=>setName(e.target.value)} required/><br/>
               <input type="email"  placeholder="Enter the Email" value={email} onChange={(e)=>setEmail(e.target.value)} required autoComplete="off" /><br/>
               <input type="password"  placeholder="Enter the Password" value={password} onChange={(e)=>setPassword(e.target.value)} required autoComplete="off" /><br/>
               <input type="number"  placeholder="Enter the Mobile Number" value={mobile} onChange={(e)=>{if(e.target.value.length==11) return false;setMobile(e.target.value)}} required /><br/>
               <button id="submit">Submit</button>
           </form>
          
        </div>
        </div>
      
      </div>
    )
}

export default SignUp
