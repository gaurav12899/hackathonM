import { Avatar } from '@material-ui/core'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PublishIcon from '@material-ui/icons/Publish';


import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import React from 'react'
import './Post.css'
function Post(
    // displayName,
    // username,
    // verified,
    // text,
    // image,
    // avatar,
    props
) {
    return (
        <div className="post">
            <div className="post__avatar">
                <Avatar src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80" />
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__headerText">
                        <h3>
                            James Anderson{" "}
                            <span className="post__headerSpecial">
                                <VerifiedUserIcon className="post__badge"/>
                            @james@123
                            </span>
                        </h3>
                    </div>
                    <div className="post__headerDescription">
                       { console.log(props.data)}
                        <p>{props.data}
                            {/* what is wrong with this code. Can anyone please ans my question. */}
                        </p>
                    </div>
                </div>
                <img src="https://media.giphy.com/media/j5P0DQIOf4PonLi55G/giphy.gif" alt=""/>
                <div className="post__footer">
                    <ChatBubbleOutlineIcon fontSize="small"/>
                    <RepeatIcon fontSize="small"/>
                    <FavoriteBorderIcon fontSize="small"/>
                    <PublishIcon fontSize="small"/>
                </div>
            </div>
        </div>
    )
}

export default Post
