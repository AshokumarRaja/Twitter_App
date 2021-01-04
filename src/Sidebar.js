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
    useEffect(() => {
        setPath(history.location.pathname)
    }, [])
   
    return (
        
            <div className="sidebar" >
                <div className="sidebar1">
                <TwitterIcon className="twiiterIcon" />
                <SidebarOption active={path=="/home"?true:false} Icon={Home} text="Home" path="/home"  />
                <SidebarOption active={path=="/notification"?true:false} Icon={Notification} text="Notifications" path="/notification"/>
                <SidebarOption active={path=="/profile"?true:false} Icon={Profile} text="Profile" path="/profile" />
                <SidebarOption  Icon={Logout} text="Logout"  />
                </div>
               
               
            </div>
           
    )
}

export default Sidebar
 