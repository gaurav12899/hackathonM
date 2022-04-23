import React from 'react'
import './SideBar.css'
// import Logo from '../assets/Icons/icon2.png'
import SideBarOption from './SideBarOption';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { Button } from '@material-ui/core'
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
