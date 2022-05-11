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

    const getPostsFiltered = (search) => {
      axios.get("/api/post/filter/" + search).then((res) => {
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
      console.log("posts", posts);
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
            <TweetBox onSearchClick={(searchText) => { getPostsFiltered(searchText) }} onClearFilter={ () => getPosts() } />

            {/* //<Post/> */}
            {/*Post */}
            {/* {questions.map((question)=>(
               {} console.log(question.question)

                <Post
                //  data={question.question} key={question._id}
                ></Post>
            )
            )} */}
             {posts.map((post, index)=>(
                <Post 
                title={post.title} 
                description={post.description} 
                tags={post.tags} 
                user={post.user} 
                image={post.image} 
                postId={post._id} 
                likes={post.likes} 
                OnLike={(data) => {
                  let list = [...posts];
                  list[index].likes = data.likes;
                  console.log('list[index]', list[index]);
                  setPosts(list);
                }}
                 />
            ))}
        
            {/* AllQuestions when searched */}
                {/* <AllQuestions/> */}

        </div>
    )
}

export default Feed
