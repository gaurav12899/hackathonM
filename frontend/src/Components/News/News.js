import './News.css'

import React,{useState,useEffect} from 'react'
// import Feed from '../Feed/Feed.css'
import Post from'../Feed/Post.js'
import axios from '../../axios'

function News() {
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
        <div className="News">
            <h2>Current News</h2>
            {news.map((theNews)=>(
                // console.log(question.question)

                <Post data={theNews.title} key={theNews._id}></Post>
            )
            )}
        </div>
    )
}

export default News




