import React,{useState,useEffect} from 'react'
import './TweetBox.css'
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/Image";
import Person from '@material-ui/icons/AccountCircle'
import firebase from './firebase'
import Smiley from '@material-ui/icons/EmojiEmotions';
import {Redirect,useHistory,useLocation} from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1)
      }
    },
    input: {
      display: "none"
    }
  }));
const TweetBox = (props) => {
  let history = useHistory();
    
    const[name,setName]=useState("");
    const[userName,setUserName]=useState("");
    const[email,setEmail]=useState("");
    const [count,setCount]=useState(0);
    const[id,setId]=useState("");
    const[Profile,setProfile]=useState("");
    const uid=  JSON.parse(localStorage.getItem("firebase:authUser:AIzaSyAkUiaMAotBOT7GJHblVk2gC9h37myNPiY:[DEFAULT]")).uid;
    useEffect(() => {
      firebase.database().ref('regusers').orderByChild('id').equalTo(uid).on('value',async(snap)=>{
         await snap.forEach((s)=>{
            setProfile(s.val().profileImg)
              setId(s.key);
              setName(s.val().name);
              setUserName(s.val().username);
              setEmail(s.val().email);
              setCount(s.val().posts)
          })
      });
     
       
    }, [Profile])
    const[image,setImage]=useState(null);
    const[content,setContent]=useState("");
    const classes = useStyles();
    const Post=(e)=>{
         e.preventDefault();
        if(content){
       
        var storageUrl = 'image/';
        if(image){
        var storageRef = firebase.storage().ref(storageUrl + image[0].name);
        storageRef.put(image[0]);
          firebase.storage().ref(storageUrl).child(image[0].name).getDownloadURL().then((url)=>{
            firebase.database().ref('/posts').push({
                name:name,
                username:userName,
                email,
                content,
                image:url,
                like:0,
                comments:'',
                likedBy:"",
                commentCount:0,
                id:uid,
            })
            firebase.database().ref(`regusers/${id}`).update({
              "posts":count+1
            })
            setCount(prevState=>prevState+1)

         });
        }
        else{
            firebase.database().ref('/posts').push({
                name:name,
                username:userName,
                email,
                content,
                image:'',
                like:0,
                comments:'',
                likedBy:"",
                commentCount:0,
                id:uid
            })
            
            console.log(count);
            firebase.database().ref(`regusers/${id}`).update({
              "posts":count+1
            })
            setCount(prevState=>prevState+1)
            
        }
        setImage("");
        setContent("");
    }
    }
    const handleChange=(e)=>{
      
     setImage(e.target.files);
    }
    const routeChange=()=>{
      history.push('/profile')
    }
   
    return (
        <div className="tweet_box">
            <form>
                <div className="tweet_box_input">
                  {
                    Profile=="" ?
                  
                    <Person className="person" onClick={routeChange}/>
                    :
                    <img src={Profile} className="person view_msg" onClick={routeChange} />
                  }
                    <input type="text" placeholder="what's happening?" value={content} onChange={(e)=>setContent(e.target.value)}/>
               </div>
               <div className="other">
                <div >
                  <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleChange}/>
                  <label htmlFor="icon-button-file"  >
                      <IconButton color="primary" aria-label="upload picture" component="span"  style={{backgroundColor:"transparent",color:"white"}} ><PhotoCamera className="Gif" /></IconButton>
                  </label>
                </div>
                  
                    <button className="tweet_button" onClick={Post}>Tweet</button>
               </div>
            </form>
        </div>
    )
}


export default TweetBox;
