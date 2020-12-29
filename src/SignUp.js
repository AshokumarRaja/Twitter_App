import React ,{useState}from 'react'
import firebase from './firebase'
import './SignUp.css'
import TwitterIcon from '@material-ui/icons/Twitter'
const SignUp = (props) => {
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[mobile,setMobile]=useState("");
    const[dob,setDob]=useState("");
    const[error,setError]=useState("");
    const submitValue=(e)=>{
        e.preventDefault();
      
        firebase
     .auth()
     .createUserWithEmailAndPassword(email, password)
     .then((user) => {
        firebase.database().ref('regusers').push({
            name,
            email,
            password,
            mobile,
            dob
        }).then(()=>{
            props.history.push('/login')
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
           <form onSubmit={submitValue} autoComplete="off">
               <TwitterIcon  className="twitter_icon"/>
               <h2>Create Your account</h2>
              
               <input type="text"  placeholder="Enter the User Name" id="username" value={name} onChange={(e)=>setName(e.target.value)} required/><br/>
               
               <input type="password"  placeholder="Enter the Passwprd" value={password} onChange={(e)=>setPassword(e.target.value)} required autoComplete="off" /><br/>
               
               <input type="number"  placeholder="Enter the Mobile Number" value={mobile} onChange={(e)=>setMobile(e.target.value)} required /><br/>
               
               <input type="date"  placeholder="Enter the Passwprd" value={dob} onChange={(e)=>setDob(e.target.value)} required/><br/>
               <button id="submit">Submit</button>
           </form>
        </div>
        </div>
      
      </div>
    )
}

export default SignUp
