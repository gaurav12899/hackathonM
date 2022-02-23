import React,{useState,useEffect} from 'react'
import './Feed.css'
import TweetBox from './TweetBox'
import Post from './Post'
import axios from '../../axios'
import AllQuestions from '../AllSearchedQuestions/AllQuestions'


function Feed() {
    const [questions,setQuestions]=useState([]);
    useEffect(() => {
        async function fetchData(){
            const req = await axios.get('molecule/questions')
            setQuestions(req.data)
            
        }
       fetchData();
    }, [])
    return (
        <div className="feed">
            {/*Header */}
            <div className="feed_header">
                <h2>Home</h2>
            </div>
            
            {/*TweetBox */}
            <TweetBox/>

            {/*Post */}
            {questions.map((question)=>(
                // console.log(question.question)

                <Post data={question.question} key={question._id}></Post>
            )
            )}
          
            {/* AllQuestions when searched */}
                {/* <AllQuestions/> */}

        </div>
    )
}

export default Feed
