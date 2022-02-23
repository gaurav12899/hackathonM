import React from 'react'
import './HomePage.css'
import SideBar from '../SideBar/SideBar'
import Feed from '../Feed/Feed'
import Widgets from '../News/News'
import AllQuestions from '../AllSearchedQuestions/AllQuestions'
function HomePage() {
    return (
        <div className="HomePage">
            {/* SideBar */}
            <SideBar/>

            {/* Feed */}
            {/* <Feed/> */}
            <AllQuestions/>


            {/* Widgets */}
            <Widgets/>
        </div>
    )
}

export default HomePage
