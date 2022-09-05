import React from 'react'
import './cards.css'
import weth from '../../assets/weth.png'

const Cards = ({id, name, traits, image}) => {
  return (
    <>
    <div className='container collectioncards_container'>
       <img src={image} alt="" />
       <div className="details">
            <div className="name">
                {name}
                <div className='id'>#{id}</div>
            </div>
            <div className="price_container">
                    <img src={weth} alt="" className='weth_image'/>
                    <div className="price">{traits[0]?.value}</div>
            </div>
       </div>
    </div>
    </>
  )
}

export default Cards