import React from 'react'
import Verified from '@material-ui/icons/VerifiedUser'
import Person from '@material-ui/icons/AccountCircle'
const Post = () => {
    return (
        <div className="post">
            <div className="post_avatar">
                <Person/>
            </div>
            <div className="post_body">
                <div className="post_header">
                    <div className="post_header_text">
                        <h3>Ashok
                            {" "}
                            <span><Verified/></span>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
