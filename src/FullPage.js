import React,{useEffect,useState} from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Widgets from './Widgets'
import firebase from './firebase';
const FullPage = () => {
    const[posts,setPosts]=useState([]);
   
    useEffect(() => {
        firebase.database().ref('/posts').on('value',async(snapshot)=>{
           
            setPosts([]);
         await  snapshot.forEach((snap)=>{  
           
               setPosts(prevState=>[...prevState,({id:snap.key,commentCount:snap.val().commentCount,name:snap.val().name,username:snap.val().username,comment:snap.val().comments,image:snap.val().image,like:snap.val().like,email:snap.val().email,content:snap.val().content,likedBy:snap.val().likedBy})])
           })
        })
      
       
    }, [posts.likedBy]);
    
    return (
        
            <div className="app" >
            <Sidebar/>
           
            <Feed posts={posts} />
          
            <Widgets/>
       
            </div>
       
    )
}

export default FullPage
