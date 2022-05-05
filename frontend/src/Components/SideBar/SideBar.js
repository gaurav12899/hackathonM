import React from 'react'
import './SideBar.css'
// import Logo from '../assets/Icons/icon2.png'
import SideBarOption from './SideBarOption';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import logo from '../../assets/Icons/moleculelogo.jpeg'
function SideBar() {
    return (
        <div className="sidebar">

            {/* Icons */}
            <img className="logo" src={logo} alt="logo" />
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                <SideBarOption active Icon={HomeIcon} text='Home' />
            </Link>
            <Link to="/exploreQuestions" style={{ textDecoration: 'none', color: 'black' }}>
            <SideBarOption Icon={SearchIcon} text='Exlpore' />
            </Link>
            <SideBarOption Icon={NotificationsNoneIcon} text='Notifications' />
            <SideBarOption Icon={MailOutlineIcon} text='Messages' />
            <Link to="/bookmarks" style={{ textDecoration: 'none', color: 'black' }}>
                <SideBarOption Icon={BookmarkBorderIcon} text='Bookmarks' />
            </Link>
            <SideBarOption Icon={ListAltIcon} text='Lists' />
            <Link to='/updateProfileA' style={{ textDecoration: 'none', color: 'black' }} >
                <SideBarOption Icon={PermIdentityIcon} text='Profile' />
            </Link>
            <Link to="/add-question" className='add_question_link'>
                <Button variant="outlined" className="sidebar__tweet" fullWidth >+Question</Button>
            </Link>

        </div>
    )
}

export default SideBar
