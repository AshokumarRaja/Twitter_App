import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";
import "./Profile.css";
import Arrow from "@material-ui/icons/ArrowBack";
import firebase from "./firebase";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Camera from "@material-ui/icons/CameraAlt";
import IconButton from "@material-ui/core/IconButton";
import { FaUser, FaUserCircle, FaPlus } from "react-icons/fa";
import PhotoCamera from "@material-ui/icons/Image";
import Posts from "./Post";
import { useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    "&.active, &:hover, &.active:hover": {
      color: "transparent",

      boxShadow: "none",
      border: "none",
      outline: "none",
    },
  },
  input: {
    display: "none",
  },
}));
const UserProfile = () => {
  const location = useLocation();

  let image;
  const classes = useStyles();
  let history = useHistory();
  const email = JSON.parse(
    localStorage.getItem(
      "firebase:authUser:AIzaSyAkUiaMAotBOT7GJHblVk2gC9h37myNPiY:[DEFAULT]"
    )
  ).email;
  const [id, setId] = useState("");
  const [Profile, setProfile] = useState("");
  const [Profile1, setProfile1] = useState("");
  const [count, setCount] = useState(0);
  const [userName, setUserName] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Post, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [burl, setBUrl] = useState("");
  const [postCount, setPostCount] = useState("");
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const database = firebase.database();
  const storage = firebase.storage();
  useEffect(() => {
    database
      .ref("regusers")
      .orderByChild("id")
      .equalTo(location.state.id)
      .on("value", async (snap) => {
        await snap.forEach((s) => {
          setId(s.key);
          setUserName(s.val().username);
          setName(s.val().name);
          setPostCount(s.val().Posts);
          setMobile(s.val().mobile);
          database
            .ref(`posts`)
            .orderByChild("username")
            .equalTo(s.val().username)
            .once("value", async (snap) => {
              setPosts([]);
              setCount2(0);
              await snap.forEach((s) => {
                setPosts((prevState) => [
                  ...prevState,
                  { posts: s.val(), id: s.key },
                ]);
                setCount2((prevState) => prevState + 1);
              });
            });
        });
      });
    database
      .ref("regusers")
      .orderByChild("id")
      .equalTo(location.state.id)
      .once("value", async (snap) => {
        await snap.forEach((s) => {
          setProfile1(s.val().profileImgBackdrop);
          setProfile(s.val().profileImg);
          setCount(s.val().posts);
        });
      });
  }, [image, count1]);

  return (
    <div className="app" onClick={() => setCount1(count1 + 1)}>
      <Sidebar />
      <div id="feed">
        <div id="header1">
          <Arrow className="arrow" onClick={() => history.push("/home")} />
          <div className="head">
            <h2>{name}</h2>
            <p>{count2}Tweets</p>
          </div>
        </div>
        <div id="body">
          <div id="background_img">
            <label htmlFor="icon-button-file">
              {Profile1 == "" ? (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  style={{ backgroundColor: "transparent", color: "white" }}
                >
                  <Camera className="show" />
                </IconButton>
              ) : (
                <img src={Profile1} className="profile_img1" />
              )}
            </label>
          </div>
          <div className="person_icon_hide">
            <label htmlFor="icon-button-file1">
              {Profile == "" ? (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  style={{ backgroundColor: "transparent", color: "white" }}
                >
                  <FaUserCircle className="profile_img" />
                </IconButton>
              ) : (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  style={{ backgroundColor: "transparent", color: "white" }}
                >
                  <img src={Profile} className="profile_img profile_img2" />
                </IconButton>
              )}
            </label>
          </div>
        </div>
        <div className="names">
          <h3>{name}</h3>
          <p>{userName}</p>
          {Mobile && <p>+91-{Mobile}</p>}
        </div>
        <div className="tweets">
          <h3>Tweets &amp; Replies</h3>
        </div>
        {Post.map((post, index) => {
          return (
            <Posts
              key={post.id}
              name={post.posts.name}
              username={post.posts.username}
              like={post.posts.like}
              img={post.posts.image}
              content={post.posts.content}
              comments={post.posts.comment}
              id={post.id}
              likedBy={post.posts.likedBy}
              commentCount={post.posts.commentCount}
              index={index}
            />
          );
        })}
      </div>
      <Widgets />
    </div>
  );
};

export default UserProfile;
