import React from 'react'
import { Link } from 'react-router-dom'
import './QuestionList.css'
import { Avatar } from '@material-ui/core'

function QuestionList() {
    return (
        <div className='questionList'>
            <div className='questionList-container'>
                <div className='questionList-left'>
                    <div className='question-Options'>
                        <div className='question-option'>
                            <p>0</p>
                            <span>Votes</span>
                        </div>
                        <div className='question-option'>
                            <p>1</p>
                            <span>Answers</span>
                        </div>
                        <div className='question-option'>
                            <small>0 Views</small>
                        </div>
                    </div> 
                </div>
                <div className='question-answer'>
                    <Link to='question'>How to use drag and drop in ant design? </Link>
                    <div style={{ width: "90%" }}>
                        <div>what i want is an example about how to make the drag and drop of my table that works properly,
                            but i cannot figure out how to make it works
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <span className='question-tags'>
                            react
                        </span>
                        <span className='question-tags'>
                            antd
                        </span> <span className='question-tags'>
                            frontend
                        </span>
                    </div>
                    <div className='author'>
                        <small>TimeStamp</small>
                        <div className='author-details'>
                            <Avatar />
                            <p>Gaurav Jain</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default QuestionList
