import React from 'react'
import './Navbar.css'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>
            <span className='logo'>Atom - Engineering</span>
            <ul className='list'>
                <li className='listItem'>
                    <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" />

                </li>
             <li className='listItem'>
                    {/* <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                        Gaurav Jain
                    </Link>  */}
                </li>
                <li className='listItem'>Logout</li>
            </ul>
        </div>
    )
};
export default Navbar
