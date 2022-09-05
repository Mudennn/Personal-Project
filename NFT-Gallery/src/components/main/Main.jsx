import React from 'react'
import './main.css'
import { useState, useEffect } from 'react'
import {FaInstagram} from 'react-icons/fa'
import {FiTwitter} from 'react-icons/fi'
import {FiLinkedin} from 'react-icons/fi'

const Main = ({selectedBnw, bnwListData}) => {
    const [activeBnw, setActiveBnw] = useState(bnwListData[0])

    useEffect(() => {
        setActiveBnw(bnwListData[selectedBnw])
    }, [bnwListData, selectedBnw])

  return (
    <div className="main">
        <div className="tittle_container">
            <h2 className='main_tittle'>Welcome to my NFT Gallery! 📸 </h2>
        </div>
        <div className="main_content">
            <div className="bnw_highlight">
                <div className="bnw_container">
                    <img src={activeBnw.image_original_url} alt="" className='selected_bnw' />
                </div>
                </div>

                    <div className="bnw_details">
                        <div className="title">
                            {activeBnw.name}
                            <span className="item_number">.#{activeBnw.token_id}</span>
                            <div className='description'>
                                <h3>{activeBnw.description}</h3>
                            </div>
                        </div>
                        <div className="owner">
                            <div className="owenerImage_container">
                                <img src={activeBnw.owner.profile_img_url} alt="" />
                            </div>
                        
                            <div className="owner_details">
                                <div className="owner_nameandhandle">
                                    <small>{activeBnw.owner.address}</small>
                                    <div className="owner_handle">@najmuddin</div>
                                </div>
                                <div className="owner_link">
                                    <a href="https://www.instagram.com/mudennn/" target="_blank" rel='noreferrer'><FaInstagram/></a>
                                </div>
                                <div className="owner_link">
                                    <a href="https://twitter.com/Mudennn" target="_blank" rel='noreferrer'><FiTwitter/></a>
                                    
                                </div>
                                <div className="owner_link">
                                    <a href="https://www.linkedin.com/in/muhammad-najmuddin/" target="_blank" rel='noreferrer'><FiLinkedin/></a>
                                </div>
                        </div>
                </div>
            </div>
        </div>
        <div className='click_description'>
            <h4>Click the photo to read the description!</h4>
            </div>
    </div>
  )
}

export default Main