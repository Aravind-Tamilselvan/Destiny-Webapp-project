import React from 'react'
import {FaInstagram, FaFacebook} from "react-icons/fa";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <h1>Never stop living</h1>
                <div className="footer-app">
                    <img src="/assets/qr_code.png" alt='scan for details' className='qr-code' />
                    <div className="app-content">
                        <h2>Download Our App</h2>
                        <a href="https://play.google.com/store/games?hl=en&pli=1"><img src="/assets/playstore.png" alt='scan for details' /></a>
                        <a href="https://www.apple.com/in/app-store/"><img src="/assets/appstore.png" alt='scan for details' /></a>
                        <h3>Follow us on</h3>
                        <a href="#instagram"><FaInstagram /></a>
                        <a href="#facebook"><FaFacebook /></a>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <p>It is a prototype of our final year project Destiny - "An innovative travel booking app", Done by Aravind.T </p>
            </div>
        </footer>
    )
}

export default Footer
