import React from 'react'
import './TweetBox.css'
import {Avatar, Button} from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react';

function TweetBox(props) {

    const [ search, setSearch ] = useState('');

    console.log(search);
    return (
        <div className="tweetBox">
            <form>
                <div className="tweetBox_input">
                    <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png"/>
                    <input placeholder="Ask me anything...." name="search" type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                <input className="tweetBox_imageInput" placeholder="Optional : Enter Image URL" type="text" />
                {/* <link> */}

                <div style={{ textAlign: 'right', display: 'inline-block' }}>
                <Button className="tweetBox_tweetButton" onClick={() => {if (props.onSearchClick) props.onSearchClick(search)}}>Search</Button>
                <Button className="tweetBox_tweetButton" style={{ marginLeft: '12px !important', width: 'auto' }} onClick={() => {if (props.onClearFilter) props.onClearFilter()}}>Clear Filter</Button>
                </div>
            </form>
        </div>
    )
}

export default TweetBox;
