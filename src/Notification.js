import React,{useState,useEffect}from 'react'
import Sidebar from './Sidebar'
import Arrow from '@material-ui/icons/ArrowBack'
import {useHistory} from 'react-router-dom'
import Widgets from './Widgets'
import firebase from './firebase'
import './Notification.css';
import Person from '@material-ui/icons/AccountCircle';
import Verified from '@material-ui/icons/VerifiedUser';
import Favourite from '@material-ui/icons/FavoriteRounded'
const Notification = () => {
    const email=  JSON.parse(localStorage.getItem("firebase:authUser:AIzaSyAkUiaMAotBOT7GJHblVk2gC9h37myNPiY:[DEFAULT]")).email;
    const[userName,setUserName]=useState("")
   var Name;
    const[Post,setPosts]=useState([]);
    const[image,setImage]=useState("");
    useEffect(() => {
        firebase.database().ref('regusers').orderByChild('email').equalTo(email).on('value',async(snap)=>{
           await snap.forEach((s)=>{
               setUserName(s.val().username)
               setImage(s.val().profileImg)
               firebase.database().ref(`posts`).orderByChild('username').equalTo(s.val().username).once('value',async(snap)=>{
                    setPosts([]);
              await  snap.forEach((s)=>{
                  
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
 
Name=post.posts.likedBy.split(",");
Name= Name.filter((name)=>{
return name!=""
})
console.log(Name)
             return ( post.posts.like!=0 && 
            <div className="post_border">
               <div className="post_header1">
                <Favourite className="favourite1"/>
               <p> <span className="bold">{Name[0]}</span>{post.posts.like>1?` and ${post.posts.like-1} others liked Your Tweet`:" liked Your Tweet"}</p>
               </div>
            <div className="notification_post">
             <div className="likes">
              <div className="post_avatar">
            {
                    image=="" ?
                  
                    <Person className="person1" />
                    :
                    <img src={image} className=" post_header_img"  />
                  }
            </div>
            <div className="post_body" style={{marginLeft:"-10px"}}>
                <div className="post_header" style={{marginTop:"12px"}}>
                    <div className="post_header_text">
                        <h3>{post.posts.name}
                            {" "}
                            <span className="post_headerSpecial"><Verified className="post_badge"/>{post.posts.username}</span>
                        </h3>
                    </div>
                    
                </div>
               
               
            </div>
   

             </div>
             
             <div className="notification_content">
               {post.posts.content}
             </div>
                 </div>
        </div>
             )
         }
         
         )
         
         }
         
         </div>
         <Widgets/>
         </div>
    )
}

export default Notification
