import React,{useState,useEffect} from 'react'
import './Feed.css'
import TweetBox from './TweetBox'
import Post from './Post'
import axios from "axios";
import AllQuestions from '../AllSearchedQuestions/AllQuestions'
import { Link } from 'react-router-dom';


function Feed() {
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        async function getQuestion() {
          await axios.get("/api/question").then((res) => {
            setQuestions(res.data.reverse());
          });
        }
        getQuestion();
      }, []);
    return (
        <div className="feed">
            {/*Header */}
            <div className="feed_header">
                <h2>Home</h2>
                 <Link to="/add-post" className='add_question_link'>
                <button variant="outlined" className="sidebar__tweet" fullWidth >+Post</button>
            </Link>

            </div>
            
            {/*TweetBox */}
            <TweetBox/>

            {/* //<Post/> */}
            {/*Post */}
            {/* {questions.map((question)=>(
               {} console.log(question.question)

                <Post
                //  data={question.question} key={question._id}
                ></Post>
            )
            )} */}
             {questions.map((question)=>(
                <Post/>
            ))}
        
            {/* AllQuestions when searched */}
                {/* <AllQuestions/> */}

        </div>
    )
}

export default Feed
