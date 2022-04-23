import React from 'react'
import { Link } from 'react-router-dom'
import './AllQuestions.css'
import FilterList from "@material-ui/icons/FilterList";
import QuestionList from './QuestionList';
function AllQuestions({ questions }) {
    
      
    return (
            <div className='AllQuestions'>
                <div className='AllQuestions-container'>
                    <div className='AllQuestions-desc-top'>
                        <h2>Some Interesting Questions</h2>
                    </div>
                    <div className="AllQuestions-desc">
                        <p style={{fontWeight:"bold"}}>{questions.length} questions</p>
                        <div className='AllQuestions-filter'>
                            <div className='AllQuestions-tabs'>
                                <div className='AllQuestions-tab'>
                                    <Link>Newest</Link>
                                </div>
                                <div className='AllQuestions-tab'>
                                    <Link>Active</Link>
                                </div>    <div className='AllQuestions-tab'>
                                    <Link>More</Link>
                                </div>
                            </div>
                            <div className='AllQuestions-filter-item'>
                                <FilterList />
                                <p>Filter</p>
                            </div>
                        </div>
                    </div>
                    <div className='questions'>
                        {questions?.map((_q) => (
                            <div className="question">
                                <QuestionList data={_q} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
    )
}

export default AllQuestions
