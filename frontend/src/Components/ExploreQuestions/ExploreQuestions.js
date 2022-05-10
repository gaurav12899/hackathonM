
import React, { useEffect, useState } from "react";
import axios from "axios";
import AllQuestions from '../AllSearchedQuestions/AllQuestions'
import SideBar from "../SideBar/SideBar";
import './ExploreQuestions.css'

function ExploreQuestions() {
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
        <div className="ExploreQuestions">
            <SideBar />
            <AllQuestions questions={questions} />

        </div>
    )
}

export default ExploreQuestions