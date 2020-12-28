import React from 'react'
import Verified from '@material-ui/icons/VerifiedUser'
import Person from '@material-ui/icons/AccountCircle'
import Img from './img/a.png'
import Favourite from '@material-ui/icons/FavoriteBorder'
import Repeat from '@material-ui/icons/RepeatOne'
import Chat from '@material-ui/icons/ChatBubbleOutline'
import Upload from '@material-ui/icons/PublishRounded'
import './Post.css'
const Post = () => {
    return (
        <div className="post">
            <div className="post_avatar">
                <Person className="person"/>
            </div>
            <div className="post_body">
                <div className="post_header">
                    <div className="post_header_text">
                        <h3>Ashok
                            {" "}
                            <span className="post_headerSpecial"><Verified className="post_badge"/>@ashok@877</span>
                        </h3>
                    </div>
                    <div className="post_headerDescription">
                        <p>I challenge yotu to build a Twitter Clone</p>
                    </div>
                </div>
                <img src={Img} alt="" width="500px"/>
                <div className="post_footer">
                    <Chat/>
                    <Repeat/>
                    <Favourite/>
                    <Upload/>
                </div>
            </div>
        </div>
    )
}

export default Post
