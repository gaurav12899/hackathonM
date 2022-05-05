import React from 'react'
import './Header.css'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux';
import { selectUser } from '../../feature/userSlice';
// import Avatar from "@mui/material/Avatar";
import { auth } from "../../firebase";
import { useHistory } from 'react-router';



const Header = () => {
    const user = useSelector(selectUser)
    const history =  useHistory()
    return (
        <div className='Header'>
            <span className='logo'>Atom - Engineering</span>
            <ul className='list'>
                <li className='listItem'>
                    <Avatar src=
                    // {user?.photo}
                    "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" 
                    />

                </li>
             <li className='listItem'>
                    {/* <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                        Gaurav Jain
                    </Link>  */}
                </li>
                <li className='listItem' onClick={
                   () => { 
                       auth.signOut()
                       history.push('/auth')
                    }
                }>Logout</li>
            </ul>
        </div>
    )
};
export default Header
