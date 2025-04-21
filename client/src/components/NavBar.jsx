import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import useUser from '../hooks/useUser';
import useLogout from '../hooks/useLogout';

const NavBar = () => {
    const {user} = useUser()
    const {logout} = useLogout()


    const [active, setActive] = useState("/")

    return (
        <div className={`Navbar`}>
            <div className='logo'>
                <Link to='/'><img src='/assets/Destiny.jpg' alt='Goto Logo'/></Link>
            </div>

            <>
                <div className='nav-links'>
                    <ul>
                        <Link to='/' onClick={() => setActive("/home")} className={active === "/home" ? "active" : ""}>Home</Link>
                        <Link to='/adventure-packages' onClick={() => setActive("/adventure-packages")} className={active === "/adventure-packages" ? "active" : ""}>Adventures</Link>
                        <Link to='/luxury-packages' onClick={() => setActive("/luxury-packages")} className={active === "/luxury-packages" ? "active" : ""}>Luxury</Link>
                        <Link to='/family-packages' onClick={() => setActive("/family-packages")} className={active === "/family-packages" ? "active" : ""}>Family</Link>
                        <Link to='/solo-packages' onClick={() => setActive("/solo-packages")} className={active === "/solo-packages" ? "active" : ""}>Solo travel</Link>
                    </ul>
                </div>
                <div className='profile-access'>
                    <p>{`${user?.name}` || "profile name"}</p>
                    <div className='profile-logo'>
                        <Link to='/profile'><img src={user?.img || "/assets/avatar-placeholder.png"} alt='profile-img' key={user?.img} /></Link>
                    </div>
                    <div className='profile-data'>
                        <ul>
                            <Link to='/profile'><li>View profile</li></Link>
                            <li onClick={()=>logout()}>Logout</li>
                        </ul>
                    </div>
                </div>
            </>
        </div>
    )
}

export default NavBar