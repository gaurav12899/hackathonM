import './News.css'

import React,{useState,useEffect} from 'react'
// import Feed from '../Feed/Feed.css'
import Post from'../Feed/Post.js'
import axios from 'axios'
import NewsItem from './NewsItem'

function News() {
    const [news,setNews]=useState([]);
    useEffect(() => {
        async function fetchNews(){
            const req = await axios.get('/api/news')
            setNews(req.data['articles'])
            console.log(req.data)
            
        }
       fetchNews();
    }, [])
    
    return (
        <div className="News">
            <h2>Current News</h2>
           
            {news.map((theNews)=>(
               <NewsItem news = {theNews}/>
            )
            )}
        </div>
    )
}

export default News




