import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import History from "@material-ui/icons/History";
import Bookmark from "@material-ui/icons/Bookmark";
import Avatar from '@material-ui/core/Avatar/Avatar'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css' //quill css
import './MainQuestion.css'



function MainQuestion() {
  const [show, setShow] = useState(false);
  return (<div className='main'>
    <div className='main-container'>
      <div className='main-top'>
        <h2 className='main-question'>This is question's title</h2>
        <Link to='/add-question'>
          <button className='button'>Ask a new question</button>
        </Link>
      </div>
      <div className='main-desc'>
        <div className='info'>
          <p>Timestamp</p>
          <p>Active<span>Today</span></p>
          <p>Viewed<span>40 times</span></p>
        </div>
      </div>
      <hr/>
      <div className='all-questions'
        style={{ flexDirection: 'column' }}>
        <div className='all-questions-container'>
          <div className='all-questions-left'>
            <div className='all-options'>
              {/* <LikeIcon/> */}
              <p className='arrow'><ThumbUp color='action' /> </p>
              <p className='arrow'>0</p>
              <p className='arrow'><ThumbDown color='action' /></p>
              <History color='action' />
              <Bookmark color='action' />
            </div>
          </div>


          <div className='question-answer'>
            <p>This is a Question body</p>
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            <div className='author'>
              <small>asked "Timestamp"</small>
              <div className='auth-details'>
                <Avatar />
                <p>Gaurav Jain</p>
              </div>
            </div>
            <div className='comments'>
              <div className='comment'>
                <p>
                This is a comment - <span>User Name</span><small> Timestamp</small>
                </p>
              </div>
              <p onClick={() => setShow(!show)}>Add a comment</p>
              {
                show && (<div className='title'>
                  <textarea type='text' placeholder='Add a comment...' rows={5} style={{
                    margin: '5px 0px',
                    padding: '10px',
                    border: '1px solid rgba(0,0,0,0.2)',
                    borderRadius: '3px',
                    outline: 'none',

                  }}></textarea>
                  <button className='button'>Add comment</button>
                </div>)
              }
            </div>

          </div>

        </div>
      </div>
      <hr />

      <div className='all-questions' style={{ flexDirection: 'column' }} >
        <p style={{ marginBottom: "20px",fontSize:"1.3rem" ,fontWeight:'300' }}>No. of answer</p>
        <div className='all-questions-container'>
          <div className='all-questions-left'>
            <div className='all-options'>
              {/* <LikeIcon/> */}
              <p className='arrow'><ThumbUp color='action' /> </p>
              <p className='arrow'>0</p>
              <p className='arrow'><ThumbDown color='action' /></p>
              <History color='action' />
              <Bookmark color='action' />
            </div>
          </div>
          <div className='question-answer'>
            <p>This is a Question body</p>
            <p>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
            <div className='author'>
              <small>asked "Timestamp"</small>
              <div className='auth-details'>
                <Avatar />
                <p>Gaurav Jain</p>
              </div>
            </div>



          </div>
        </div>
      </div>
    </div>
    <hr />
    <div className='main-answer'>
      <h3 style={{
        fontSize: "22px",
        margin: "10px 0",
        fontWeight: "400",
      }}>
        Your Answer
      </h3>
      <ReactQuill className='react-quill' theme='snow' style={{
        height: '200px'
      }} />
    
    </div>
    <button className='button' style={{
      margin:"50px 0px",
      maxWidth: 'fit-content'
    
    }}>Post your answer</button>
  </div>);
}

export default MainQuestion;
