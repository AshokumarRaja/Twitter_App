import React from 'react'
import './SidebarOption.css'
import {useHistory} from 'react-router-dom'
import firebase from './firebase'
const SidebarOption = ({active,text,Icon,path}) => {
    const logout=()=>{
        firebase.auth().signOut().then(() => {
            localStorage.setItem("auth-token","");
            history.push('/');
          }).catch((error) => {
           console.log(error)
          }); console.log("logout");
          
    }
    let history = useHistory();
    return (
        <div className={`SidebarOption ${active && "sidebar--active"}` } onClick={()=>history.push(path)}>
           
            <Icon/>
            <h2 onClick={text=="Logout" ? logout:""}>{text}</h2>
           
           
        </div>
    )
}

export default SidebarOption
