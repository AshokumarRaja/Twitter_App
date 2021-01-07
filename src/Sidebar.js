import React,{useEffect,useState} from 'react'
import SidebarOption from './SidebarOption'
import TwitterIcon from '@material-ui/icons/Twitter'
import Home from '@material-ui/icons/Home'
import Notification from '@material-ui/icons/NotificationsNone'
import Profile from '@material-ui/icons/PermIdentity'
import Logout from '@material-ui/icons/MoreHorizRounded'
import './sidebar.css'
import {useHistory} from 'react-router-dom';
import firebase from './firebase'

const Sidebar = () => {
    
    let history = useHistory();
    const[path,setPath]=useState("");
    const email=  JSON.parse(localStorage.getItem("firebase:authUser:AIzaSyAkUiaMAotBOT7GJHblVk2gC9h37myNPiY:[DEFAULT]")).email;
    const[count,setCount]=useState("");
    useEffect(() => {
        setPath(history.location.pathname);
        firebase.database().ref('/regusers').orderByChild('email').equalTo(email).once('value',async(snap)=>{
            await snap.forEach((snap)=>{
                setCount(0);
               firebase.database().ref('/posts').orderByChild('username').equalTo(snap.val().username).once('value',async(snap)=>{
                  await snap.forEach((s)=>{
                       if(s.val().like>0){
                           setCount(prevState=>prevState+1);
                       }
                   })
               })
                
             })
         })
         
        
    }, [])
  
    return (
        
            <div className="sidebar" >
                <div className="sidebar1">
                <TwitterIcon className="twiiterIcon" />
                <SidebarOption active={path=="/home"?true:false} Icon={Home} text="Home" path="/home"  />
                <SidebarOption active={path=="/notification"?true:false} Icon={Notification} text="Notifications" path="/notification" count={count}/>
                <SidebarOption active={path=="/profile"?true:false} Icon={Profile} text="Profile" path="/profile" />
                <SidebarOption  Icon={Logout} text="Logout"  />
                </div>
               
               
            </div>
           
    )
}

export default Sidebar
 