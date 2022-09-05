import React from 'react'
import './header.css'
import Search from '../../assets/header/search.png'


const Header = () => {
  return (
    
    <header className='container header_container'>
        <div className='logo_container'>
            <h1>Muden</h1>
        </div>
        

        <div className="searchbar_container">
            <div className="searchbar_icon">
                <img src={Search} alt="search_icon"/>
            </div>
            <input type="text" className='searchbar' placeholder='Collection, item or user' />
        </div>
        {/* END OF SEARCH BAR  */}

        <div className="header_items">
            <p>Drops</p>
            <p>Marketplace</p>
            <p>Create</p>
        </div>

        {/* END OF HEADER ITEMS */}

        <button className='btn btn-primary'>Get In</button>

        
    </header>
  )
}

export default Header