import React from 'react'
import SideBar from '../SideBar/SideBar'
import MainQuestion from './MainQuestion'
import './ViewQuestion.css'
function ViewQuestion() {
    return (
        <div className="HomePage">
            {/* SideBar */}
            <SideBar/>
            <MainQuestion/>
    
        </div>
    )
}

export default ViewQuestion
