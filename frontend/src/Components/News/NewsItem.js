import './News.css'
import React,{useState,useEffect} from 'react'

function NewsItem({news}) {

    return (
        <div className="NewsItem">
                <div className="my-3">
                <div className="card">
                  <img
                  width={120}
                    className="card-img-top"
                    src={news.urlToImage}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                      {console.log(news.title)}
                    <h5 className="card-title">{news.title}</h5>
                    <p className="card-text">{news.description}</p>
                    <a href={news.url} target="_blank" className="btn btn-sm btn-primary knowBtn">Know more</a>
                    <br/>
                  </div>
                </div>
              </div>
        </div>
    )
}

export default NewsItem
