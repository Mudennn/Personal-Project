import React from 'react'
import Cards from '../collection_cards/Cards'
import './bnwlist.css'

const Bnwlist = ({bnwListData, setSelectedBnw}) => {
  return (
    <div className="container bnwlist_container">
        {bnwListData.map(bnw => (
            <div onClick={() => setSelectedBnw(bnw.token_id)}>
                <Cards 
                key={bnw.token_id}
                description={bnw.description}
                id={bnw.token_id}
                name={bnw.name}
                traits={bnw.traits}
                image={bnw.image_original_url} 
                />
            </div>

        ))}
    </div>
  )
}

export default Bnwlist