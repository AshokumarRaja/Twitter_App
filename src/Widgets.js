import React from 'react'
import './Widgets.css';
import Search from '@material-ui/icons/SearchRounded'
import {TwitterTimelineEmbed} from 'react-twitter-embed'
const Widgets = () => {
    return (
        <div className="widgets">
           <div className="widgets__input">
                <Search className="Widgets_searchIcon" />
                <input placeholder="Search Twitter" type="text" />
           </div>
           <div className="widgets_widgetContainer">
                <h2>What's happening</h2>
                <div className="centerContent">
                    <div className="selfCenter spaceBetween standardWidth">
                        <TwitterTimelineEmbed sourceType="timeline" id="539487832448843776" className="TimeLine" options={{height: 400,tweetLimit: 10}} />
                    </div>
                </div>
           </div>
        </div>
    )
}

export default Widgets
