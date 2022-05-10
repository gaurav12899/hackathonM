import React from "react"
import AllQuestions from "../AllSearchedQuestions/AllQuestions"
import SideBar from "../SideBar/SideBar"
import './Freelancing.css'
import RegisterFreeLance from "./RegisterFreeLance"
const Freelancing = () => {
    return (
        <div>
            <div className="freelancing">
                <SideBar />
                <div className="RegisterButton" onClick={RegisterFreeLance}>
                    <p>{"Register as a Freelancer"}</p>
                </div>
            </div>
        </div>
    )
}
export default Freelancing
