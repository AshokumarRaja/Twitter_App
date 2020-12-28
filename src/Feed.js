import React from 'react'
import './Feed.css'
import './TweetBox'
import Star from '@material-ui/icons/StarBorderRounded'
import TweetBox from './TweetBox'
import Post from './Post'
const Feed = () => {
    return (
        <div id="feed">
           <div id="header">
                <h2 id="home1">Home</h2>
                <Star />
           </div>
           <TweetBox/>
           <Post/>
        </div>
    )
}

export default Feed
