import React,{useState,useEffect} from 'react'
import './Feed.css'
import TweetBox from './TweetBox'
import Post from './Post'
import axios from '../../axios'


function News() {
    const [questions,setQuestions]=useState([]);
    useEffect(() => {
        async function fetchData(){
            const req = await axios.get('molecule/questions')
            setQuestions(req.data)
            
        }
       fetchData();
    }, [])


    const [news,setNews]=useState([]);
    useEffect(() => {
        async function fetchNews(){
            const req = await axios.get('/news')
            setNews(req.data['articles'])
            console.log(req.data)
            
        }
       fetchNews();
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
            {news.map((theNews)=>(
                // console.log(question.question)

                <Post data={theNews.title} key={theNews._id}></Post>
            )
            )}
            {/* <Post/>
            <Post/>
            <Post/>
            <Post/> */}


        </div>
    )
}

export default Feed
