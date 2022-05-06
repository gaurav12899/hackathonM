import './HomePage.css'
import SideBar from '../SideBar/SideBar'
import Feed from '../Feed/Feed'
import Widgets from '../News/News'
import AllQuestions from '../AllSearchedQuestions/AllQuestions'
import React, { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
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
        <div className="HomePage">
            {/* SideBar */}
            <SideBar/>

            {/* Feed */}
            <Feed/>


            {/* Widgets */}
            <Widgets/>
        </div>
    )
}

export default HomePage
