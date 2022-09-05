import React from 'react'
import Header from './components/header/Header'
// import Cards from './components/collection_cards/Cards'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Main from './components/main/Main'
import Footer from './components/footer/Footer'
import Bnwlist from './components/bnwlist/Bnwlist'

const App = () => {
  const [bnwListData, setBnwListData] = useState([])
  const [selectedBnw, setSelectedBnw] = useState(0)

  const getMyNfts = async () => {
    const openseaData = await axios.get('https://testnets-api.opensea.io/api/v1/assets?owner=0xE4b174c889832d0f53B36f976aB842EB9c43C229&asset_contract_address=0x994896A788966997224FEc3BD3576745fd859322&order_direction=asc&offset=0&limit=30&include_orders=false')
    console.log(openseaData.data.assets)
    setBnwListData(openseaData.data.assets)
  }

  useEffect(() => {
    getMyNfts()

    return () => {
      getMyNfts()
    }
  },[])

  return (
    <>
    <Header />
    {
      bnwListData.length > 0 && (
        <>
          <Main bnwListData={bnwListData} selectedBnw={selectedBnw}/>
          <Bnwlist bnwListData={bnwListData} setSelectedBnw={setSelectedBnw}/> 
          <Footer />
        </>
      )}
    
    </>
    
  )
}

export default App