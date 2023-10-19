import React from 'react'
import {
   FaFacebookF,
   FaInstagram,
   FaTwitter,
   FaLinkedin,
} from "react-icons/fa";


import "./Footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
   <footer className="footer">
      <div className="container">
         <div className="contentWrapper">
            <ul className="menuItems">
               <li className="menuItem">
               <Link className='text-dark' to='/privacy-policy'>Privacy-Policy</Link>
               </li>
               <li className="menuItem">
                  <Link className='text-dark' to='/contact'>Contact</Link>
               </li>
               <li className="menuItem">
                  <Link className='text-dark' to='/about'>About</Link>
               </li>
               <li className="menuItem">
               <Link className='text-dark' to='/blog'>Blog</Link>
               </li>
               <li className="menuItem">
               <Link className='text-dark' to='/faq'>FAQ</Link>
               </li>
            </ul>
         <div className="infoText">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur.
         </div>
         <div className="socialIcons">
            <span className="icon">
                  <FaFacebookF />
            </span>
            <span className="icon">
                  <FaInstagram />
            </span>
            <span className="icon">
                  <FaTwitter />
            </span>
            <span className="icon">
                  <FaLinkedin />
            </span>
         </div>
         </div>
      </div>
</footer>
  )
}

export default Footer