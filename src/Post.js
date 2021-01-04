import React,{useEffect, useState} from 'react'
import Verified from '@material-ui/icons/VerifiedUser'
import Person from '@material-ui/icons/AccountCircle'
import Favourite from '@material-ui/icons/FavoriteBorder'
import Close from '@material-ui/icons/Close'
import Repeat from '@material-ui/icons/RepeatOne'
import Chat from '@material-ui/icons/ChatBubbleOutline'
import Upload from '@material-ui/icons/PublishRounded'
import './Post.css'
import firebase from './firebase'
import Modal from 'react-modal'

import {useHistory} from 'react-router-dom'
const Post = ({name,username,img,like,comments,content,id,likedBy,commentCount}) => {
    console.log(likedBy,like,id)
    let history = useHistory();
    
  const[show,setShow]=useState(false)
  const[comment,setComment]=useState("");
  const[name1,setName]=useState("");
  const[username1,setUserName]=useState("");
  const[Profile,setProfile]=useState("");
  const[Profile1,setProfile1]=useState("");
  const[Profile2,setProfile2]=useState("");
    const customStyles = {
        overlay: {
          
           backgroundColor:"rgba(0, 0, 0, 0.4)",
           zIndex:"100000"
          },
        content: {
          top: '10%',
          left: '43%',
          right: 'auto',
         margin:'0',
          bottom: 'auto',
          marginRight: '-50%',
          width: '35%',
          height:"43%",
          transform: 'translate(-40%, -10%)',
          borderRadius:"15px",
        
         opacity:"1",
         
          backgroundColor:"white"

         
         
        },
      };
    var key;
    const email=  JSON.parse(localStorage.getItem("firebase:authUser:AIzaSyAkUiaMAotBOT7GJHblVk2gC9h37myNPiY:[DEFAULT]")).email;
    useEffect(()=>{
        firebase.database().ref('/regusers').orderByChild('email').equalTo(email).once('value',(snap)=>{
            snap.forEach((snap)=>{
                setProfile1(snap.val().profileImg)
                setName(snap.val().name);
                setUserName(snap.val().username)
            })
        })
        firebase.database().ref('/regusers').orderByChild('username').equalTo(username).once('value',(snap)=>{
            snap.forEach((snap)=>{
                setProfile(snap.val().profileImg);
                
            })
        })
    },[Profile,Profile1])
    console.log(username)
    const Like=(cls)=>{
         
      const val= firebase.database().ref(`posts/${id}/likedBy`).once('value',(snap)=>{
     
        if(snap.val().includes(username1)){
            
            var liked=snap.val();
            firebase.database().ref(`posts/${id}`).update({
                "like":like-1
            })
            if(liked.includes(username1+",")){
                liked = liked.replace(username1+",","");
            }
            else{
                liked =  liked.replace(username1,"");
            }
            firebase.database().ref(`posts/${id}/likedBy`).set(liked);
        }
        else{
           
            var liked=snap.val();
            if(liked==""){
                 liked=username1;
            }
            else{
                liked+=","+username1;
            }
            firebase.database().ref(`posts/${id}/likedBy`).set(liked)
            firebase.database().ref(`posts/${id}`).update({
                "like":like+1
            })
        }
      }); 
          
    }
    const reply=()=>{
        if(comment.length!=0){
        
        firebase.database().ref(`posts/${id}/comments`).push({
            
            name:name1,
            username:username1,
            "comments":comment,
            profileImg:Profile1
        })
        firebase.database().ref(`posts/${id}`).update({
            "commentCount":commentCount+1
        })
        setComment("");
        close();
    }
    }
    const Chat1=()=>{
        setShow(true)
    }
    const close=()=>{
        setShow(false);
    }
    const changeRoute=()=>{
       if( history.location.pathname="/home"  ){
        history.push({
            pathname:`/posts/${id}`,
            state:{
                username:username,
                id:id
            }
        })
       }
    }
    return (
        
        <div className="post">

            <div className="post_avatar">
            {
                    Profile=="" ?
                  
                    <Person className="person1" />
                    :
                    <img src={Profile} className="person1 view_msg"  />
                  }
            </div>
            <div className="post_body">
                <div className="post_header"  onClick={changeRoute}>
                    <div className="post_header_text">
                        <h3>{name}
                            {" "}
                            <span className="post_headerSpecial"><Verified className="post_badge"/>{username}</span>
                        </h3>
                    </div>
                    <div className="post_headerDescription">
                        <p>{content}</p>
                    </div>
                </div>
                <img src={img} alt="" className="Post_Img"/>
                <div className="post_footer">
                    <div  className="chat">
                    <Chat className="chat" onClick={Chat1}/>{commentCount!=0 ? commentCount:""}
                    </div>
                    <div>
                  
                    </div>
                    <div id="like">
                    <Favourite onClick={ Like} className="likeIcon"  /> <span >{like!=0 ? like:""}</span>
                    </div>
                  
                </div>
            </div>
            
            <Modal isOpen={show} style={customStyles} onRequestClose={close} >
            <div  id="close1">
                <Close className="closeIcon" onClick={close}/>
            </div>
            <div id="modal_content">
            {
                    Profile=="" ?
                  
                    <Person className="person1" style={{marginTop:"-5px"}}/>
                    :
                    <img src={Profile} className="person1 view_msg" style={{marginTop:"0px"}}  />
                  }
                <div style={Profile == "" ?{display:"flex",flexDirection:"column",marginLeft:"5px"} :{display:"flex",flexDirection:"column",marginLeft:"10px",marginTop:"-3px"}}>
                    <h3>{name}
                    {" "}
                    <span className="post_headerSpecial"><Verified className="post_badge"/>{username}</span>
                    </h3>
                    <div className="post_headerDescription">
                            <p >{content}</p>
                    </div>
                </div>
            </div>
            <div className="reply">
                <p>Replying To <span>{username}</span></p>
            </div>
            <div className="modal_content_reply">
            {
                    Profile1=="" ?
                  
                    <Person className="person" />
                    :
                    <img src={Profile1} className="person view_msg post_person"   />
                  }
                <input type="text" placeholder="Tweet Your Reply" className="reply_input" value={comment} onChange={(e)=>setComment(e.target.value)}/>
            </div>
            <button className="tweet_button tweet_button_Post"  onClick={reply}>Reply</button>


            </Modal>
        </div>
    )
}

export default Post
