import React,{useState,useEffect}from 'react'
import Sidebar from './Sidebar'
import Arrow from '@material-ui/icons/ArrowBack'
import {useHistory} from 'react-router-dom'
import Widgets from './Widgets'
import firebase from './firebase'
import './Notification.css';
const Notification = () => {
    const email=  JSON.parse(localStorage.getItem("firebase:authUser:AIzaSyAkUiaMAotBOT7GJHblVk2gC9h37myNPiY:[DEFAULT]")).email;
    const[userName,setUserName]=useState("")
    const[Post,setPosts]=useState([]);
    useEffect(() => {
        firebase.database().ref('regusers').orderByChild('email').equalTo(email).on('value',(snap)=>{
            snap.forEach((s)=>{
               setUserName(s.val().username)
               firebase.database().ref(`posts`).orderByChild('username').equalTo(s.val().username).once('value',(snap)=>{
                    setPosts([]);
                snap.forEach((s)=>{
                  
                    setPosts(prevState=>[...prevState,{posts:s.val(),id:s.key}])
                        
                    
                }) });})})
         
    }, [])
    const history=useHistory();
    return (
        <div className="app" >
        <Sidebar/>
        <div id="feed" >
         <div id="header1">
         <Arrow className="arrow" onClick={()=>history.push('/home')} style={{cursor:"pointer"}}/>
            <div className="head">
               
               <h2>Notification</h2>

            </div>
         </div>
         {Post.map((post)=>{

             return ( post.posts.likedBy && <div className="likes"><p style={{color:"#50b7f5"}}>{post.posts.likedBy}<span> Likes Your Tweet-{post.posts.content}</span></p></div>)
         }
         
         )}
         </div>
         <Widgets/>
         </div>
    )
}

export default Notification
