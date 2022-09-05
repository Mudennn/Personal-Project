import { useParams } from 'react-router-dom';
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import NFTTile from "./NFTTile";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

export default function Profile () {
    const [data, updateData] = useState([]);
    const [address, updateAddress] = useState("0x");
    const [totalPrice, updateTotalPrice] = useState("0");
    const [dataFetched, updateFetched] = useState(false);

    async function getNFTData(tokenId) {
        const ethers = require("ethers");
        let sumPrice = 0;
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)

        //create an NFT Token
        let transaction = await contract.getMyNFTs()

        /*
        * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
        * and creates an object of information that is to be displayed
        */
        
        const items = await Promise.all(transaction.map(async i => {
            const tokenURI = await contract.tokenURI(i.tokenId);
            let meta = await axios.get(tokenURI);
            meta = meta.data;

            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.image,
                name: meta.name,
                description: meta.description,
            }
            sumPrice += Number(price);
            return item;
        }))

        updateData(items);
        updateFetched(true);
        updateAddress(addr);
        updateTotalPrice(sumPrice.toPrecision(3));
    }

    const params = useParams();
    const tokenId = params.tokenId;
    if(!dataFetched)
        getNFTData(tokenId);
    
    // convert number to string and to shorten it
    const addressOwner = address;
    const subAddress = `${addressOwner}`.substring(0,8)+'...'

    return (
        <div className='min-h-screen'>
        <Navbar />
        <div className='flex flex-col text-center mt-11 md:text-2xl text-white items-center'>
          <div className='mb-5'>
            <h2 className='font-bold'>Wallet Address</h2>
            <div className='text-black py-2 px-4 border border-blue-70 rounded my-2 bg-white w-full hover:bg-gray-200 text-base text-center' >
              <button onClick={() => navigator.clipboard.writeText(address)}>{subAddress}</button>
            </div>
            
          </div>
        </div>
        <div className='flex flex-row text-center justify-center mt-10 md:text-2xl text-white'>
          <div>
            <h2 className='font-bold'>No. of NFTs</h2>
            {data.length}
          </div>
          <div className='ml-20'>
            <h2 className='font-bold'>Total Value</h2>
            {totalPrice} ETH
          </div>
        </div>
        <div className='flex flex-col text-center items-center mt-11 text-white'>
          <h2 className='font-bold text-xl md:text-2xl my-5'>Your NFTs</h2>
          <div className='flex justify-center flex-wrap max-w-screen-xl'>
          {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                    })}

          </div>
          <div className='mt-10 text-xl'>
          {data.length === 0 ? "Oops, No NFT data to display (Are you logged in?)":""}

          </div>
        </div>
        <Footer /> 
    </div>
    )
};