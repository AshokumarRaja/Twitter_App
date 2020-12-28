import React from 'react'
import SidebarOption from './SidebarOption'
import TwitterIcon from '@material-ui/icons/Twitter'
import Home from '@material-ui/icons/Home'
import Explore from '@material-ui/icons/Explore'
import Notification from '@material-ui/icons/NotificationsNone'
import Message from '@material-ui/icons/MailOutline'
import BookMark from '@material-ui/icons/BookmarkBorder'
import List from '@material-ui/icons/ListAlt'
import Profile from '@material-ui/icons/PermIdentity'
import More from '@material-ui/icons/MoreHorizOutlined'
import './sidebar.css'
const Sidebar = () => {
    return (
        <div className="sidebar" >
            <TwitterIcon className="twiiterIcon" />
            <SidebarOption active Icon={Home} text="Home" />
            <SidebarOption Icon={Explore} text="Explore" />
            <SidebarOption Icon={Notification} text="Notification" />
            <SidebarOption Icon={Message} text="Message" />
            <SidebarOption Icon={BookMark} text="BookMark" />
            <SidebarOption Icon={List} text="List" />
            <SidebarOption Icon={Profile} text="Profile" />
            <SidebarOption Icon={More} text="More" />
            <button className="tweet">Tweet</button>
        </div>
    )
}

export default Sidebar
