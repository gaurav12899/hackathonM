import React from 'react'
import { Link } from 'react-router-dom'
import './QuestionList.css'
import { Avatar } from '@material-ui/core'
// import { stringAvatar } from "../../utils/Avatar";

import ReactHtmlParser from "react-html-parser";

function QuestionList({ data }) {
    // function truncate(str, n) {
    //     return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    // }

    let tags = JSON.parse(data.tags[0]);
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
                            <p>{data.answerDetails.length}</p>
                            <span>Answers</span>
                        </div>
                        <div className='question-option'>
                            <small>0 Views</small>
                        </div>
                    </div>
                </div>
                <div className='question-answer'>
                    <Link to={`/question?q=${data._id}`}>{data.title}</Link>
                    <div style={{ maxWidth: "90%" }}>
                    {/* <div>{ReactHtmlParser(truncate(data.body, 200))}</div> */}
                    </div>
                    <div style={{ display: "flex" }}>
                        {tags.map((_tag) => (
                            <p
                                style={{
                                    margin: "10px 5px",
                                    padding: "5px 10px",
                                    backgroundColor: "#007cd446",
                                    borderRadius: "3px",
                                }}
                            >
                                {_tag}
                            </p>
                        ))}
                    </div>
                    <div className='author'>
                        <small>{data.create_at}</small>
                        <div className='author-details'>
                            <Avatar  />
                            {/* <p> {data.user.displayName
                                ? data.user.displayName
                                : "Gaurav Jain"}</p> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default QuestionList
