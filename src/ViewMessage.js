import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

import Widgets from "./Widgets";
import firebase from "./firebase";
import Post from "./Post";
import "./ViewMessage.css";
import Person from "@material-ui/icons/AccountCircle";
import { useLocation, useHistory } from "react-router-dom";
import Arrow from "@material-ui/icons/ArrowBack";
const ViewMessage = ({ match }) => {
  const history = useHistory();
  const location = useLocation();
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState(location.state.id);
  const [comments1, setComments] = useState([]);
  const [profileImg, setProFileImg] = useState("");
  let Profile = "";
  const database = firebase.database();
  useEffect(() => {
    database.ref(`posts/${location.state.id}`).on("value", async (snap) => {
      await setPosts(snap.val());
    });
    database
      .ref(`posts/${location.state.id}/comments`)
      .on("value", async (snap) => {
        setComments([]);
        await snap.forEach((snap) => {
          var pimage = "";

          database
            .ref(`/regusers`)
            .orderByChild("username")
            .equalTo(snap.val().username)
            .once("value", async (snapshot) => {
              await snapshot.forEach((s) => {
                setComments((prevState) => [
                  ...prevState,
                  {
                    comment: snap.val().comments,
                    name: snap.val().name,
                    username: snap.val().username,
                    profileImg: s.val().profileImg,
                  },
                ]);
                return;
              });
            });
        });
      });
  }, [count]);

  console.log(location.state);

  return (
    <div>
      <div className="app">
        <Sidebar />
        <div id="feed">
          <div id="header1">
            <Arrow
              className="arrow"
              onClick={() => history.push("/home")}
              style={{ cursor: "pointer" }}
            />
            <h2 id="home1 view_msg_home" style={{ marginLeft: "10px" }}>
              Tweet
            </h2>
          </div>
          <div className="posts">
            <Post
              key={posts.username}
              name={posts.name}
              username={location.state.username}
              like={posts.like}
              img={posts.image}
              content={posts.content}
              comments={posts.comment}
              id={id}
              likedBy={location.state.likedBy}
              commentCount={posts.commentCount}
            />

            {comments1.map((comment) => {
              return (
                <div className="message_reply">
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    className="msg"
                  >
                    <div className="profile_details_msg">
                      {comment.profileImg == "" ? (
                        <Person className="person1" />
                      ) : (
                        <img
                          src={comment.profileImg}
                          className="person1 view_msg"
                        />
                      )}
                      <p className="name">
                        {comment.name}
                        <span style={{ marginLeft: "2px" }}>
                          {comment.username}
                        </span>
                      </p>
                    </div>
                    <div className="msg_content">
                      <p className="reply_msg1">
                        Replying To{" "}
                        <span className="reply_username">{posts.username}</span>
                      </p>
                      <p className="view_msg_comment">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Widgets />
      </div>
    </div>
  );
};

export default ViewMessage;
