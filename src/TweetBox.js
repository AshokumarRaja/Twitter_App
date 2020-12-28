import React from 'react'
import './TweetBox.css'
import Person from '@material-ui/icons/AccountCircle'
const TweetBox = () => {
    return (
        <div className="tweet_box">
            <form>
                <div className="tweet_box_input">
                    <Person className="person"/>
                    <input type="text" placeholder="what's happening?"/>
               </div>
               <button className="tweet_button">Tweet</button>
            </form>
        </div>
    )
}

export default TweetBox
