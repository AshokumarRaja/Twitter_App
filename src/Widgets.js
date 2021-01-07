import React from 'react'
import './Widgets.css';
import Search from '@material-ui/icons/SearchRounded'

import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
const Widgets = () => {
    return (
        <div className="widgets_list">
        <div className="widgets">
         
           <div className="widgets_widgetContainer">
              
                    <h2>What's happening</h2>
                    <div className="centerContent">
                    <div className="selfCenter spaceBetween standardWidth">
                    <TwitterTimelineEmbed sourceType="timeline" id="539487832448843776" options={{height: 400,tweetLimit: 1}} />
                    </div>
                    </div>
                </div>
               
           </div>
        </div>
    )
}

export default Widgets
