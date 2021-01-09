import React, { useState } from "react";
import firebase from "./firebase";
import "./SignUp.css";
import Image from "./img1/logo .png";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const auth = firebase.auth();
  const database=firebase.database();
  const submitValue = (e) => {
    const length = mobile.length;
    console.log(length);
    if (length == 10) {
      setError("");
      const random = Math.round(Math.random() * 10000);

      e.preventDefault();

      auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          database
            .ref(`regusers`)
            .push({
              id: user.uid,
              name,
              username: `@${name}${random}`,
              email: email.toLowerCase(),
              password,
              mobile,
              posts: 0,
              profileImg: "",
              profileImgBackdrop: "",
            })
            .then(() => {
              document.getElementById("myModal").style.display = "none";

              setName("");
              setEmail("");
              setMobile("");
              setPassword("");
              setError("");
            });
        })
        .catch((error) => {
          setError(error.message);
          console.log(error);
        });
    } else {
      e.preventDefault();
      setError("Enter Mininum 10 Numbers");
    }
  };
  const close = () => {
    document.getElementById("myModal").style.display = "none";
    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setError("");
  };
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={close}>
          &times;
        </span>
        <div className="form">
          <form onSubmit={submitValue} autoComplete="off">
            <img src={Image} className="twitter_icon" />
            <h2>Create Your account</h2>

            <input
              type="text"
              placeholder="Enter the User Name"
              id="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />
            <input
              type="email"
              placeholder="Enter the Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
            <br />
            <input
              type="password"
              placeholder="Enter the Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
            />
            <br />
            <input
              type="number"
              placeholder="Enter the Mobile Number"
              value={mobile}
              onChange={(e) => {
                if (e.target.value.length == 11) return false;
                setMobile(e.target.value);
              }}
              required
            />
            <br />
            <p
              style={{
                textAlign: "center",
                color: "red",
                marginBottom: "15px",
              }}
            >
              {error}
            </p>
            <p></p>
            <button id="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
