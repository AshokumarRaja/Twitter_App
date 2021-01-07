import React,{useEffect,useState} from 'react'
import './Feed.css'
import './TweetBox'
import Star from '@material-ui/icons/StarBorderRounded'
import TweetBox from './TweetBox'
import Post from './Post'

const Feed = ({posts}) => {
    
    return (
        <div id="feed">
          
           <div id="header">
                <h2 id="home1">Home</h2>
                <Star />
           </div>
           <TweetBox/>
           {  
               posts.map((post,index)=>{
              
                  return <Post key= {post.id} name={post.name} username={post.username} like={post.like} img={post.image} content={post.content} comments={post.comment} id={post.id} likedBy={post.likedBy} commentCount={post.commentCount} index={index} length={posts.length}/>
               })
            //    :(
            //        
            //    )
           }
           
        
        </div>
    )
}

export default Feed
