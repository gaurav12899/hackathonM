import React,{useState,useEffect} from 'react'
import './Feed.css'
import TweetBox from './TweetBox'
import Post from './Post'
import axios from "axios";
import AllQuestions from '../AllSearchedQuestions/AllQuestions'
import { Link } from 'react-router-dom';


function Feed() {
    const [questions, setQuestions] = useState([]);
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
      axios.get("/api/post").then((res) => {
        setPosts(res.data.reverse());
      }).then((res) => {
        setPosts(res.data);
      });
    }

    useEffect(() => {
        async function getQuestion() {
          await axios.get("/api/question").then((res) => {
            setQuestions(res.data.reverse());
          });
        }
        getQuestion();
        getPosts();
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
             {posts.map((post)=>(
                <Post text={post.text} description={post.description} tags={post.tags} user={post.user} />
            ))}
        
            {/* AllQuestions when searched */}
                {/* <AllQuestions/> */}

        </div>
    )
}

export default Feed
