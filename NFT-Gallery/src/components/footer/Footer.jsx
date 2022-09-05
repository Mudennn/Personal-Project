import React from 'react'
import './footer.css'
import {FaInstagram} from 'react-icons/fa'
import {FiTwitter} from 'react-icons/fi'
import {FiLinkedin} from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="footer_copyright">
        <small>&copy; Muden. All right reserved</small>
          <div className="footer_link">
                <a href="https://www.instagram.com/mudennn/" target="_blank" rel='noreferrer'><FaInstagram/></a>
                <a href="https://twitter.com/Mudennn" target="_blank" rel='noreferrer'><FiTwitter/></a>
                <a href="https://www.linkedin.com/in/muhammad-najmuddin/" target="_blank" rel='noreferrer'><FiLinkedin/></a>
          </div>
      </footer>
  )
}

export default Footer