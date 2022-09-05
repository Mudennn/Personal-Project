import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Marketplace() {
const sampleData = [
    {
        "name": "NFT#1",
        "description": "First NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmQwX3ecdmj5DPFrYs1Yuf3f14Wjg5PzBiCxq3wKvCXM5q",
        "price":"0.03",
        "currentlySelling":"True",
        "address":"0xE4b174c889832d0f53B36f976aB842EB9c43C229",
    },
    {
        "name": "NFT#2",
        "description": "Second NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmQwX3ecdmj5DPFrYs1Yuf3f14Wjg5PzBiCxq3wKvCXM5q",
        "price":"0.03",
        "currentlySelling":"True",
        "address":"0xE4b174c889832d0f53B36f976aB842EB9c43C229",
    },
    {
        "name": "NFT#3",
        "description": "Third NFT",
        "website":"http://axieinfinity.io",
        "image": "https://gateway.pinata.cloud/ipfs/QmQwX3ecdmj5DPFrYs1Yuf3f14Wjg5PzBiCxq3wKvCXM5q",
        "price":"0.03",
        "currentlySelling":"True",
        "address":"0xE4b174c889832d0f53B36f976aB842EB9c43C229",
    },
];
const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);



async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    //create an NFT Token
    let transaction = await contract.getAllNFTs()

    //Fetch all the details of every NFT from the contract and display
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
        return item;
    }))

    updateFetched(true);
    updateData(items);
}

if(!dataFetched)
    getAllNFTs();

return (
    <div>
        <Navbar />
        <div className="dark:bg-gray-800 dark:text-gray-100">
            <div className="container flex flex-col justify-center p-6 mx-auto items-center gap-0 sm:py-12 lg:py-14 lg:flex-row md:gap-5 lg:gap-[10rem]">
                <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                    <h2 className="text-4xl font-bold leading-none sm:text-4xl">What is NFT?</h2>
                    <p className="font-light mt-6 mb-8 text-base sm:mb-12 md:text-lg ">NFT means non-fungible tokens (NFTs), which are generally created using the same 
                        type of programming used for cryptocurrencies. 
                        In simple terms these cryptographic assets are based on blockchain technology. 
                        They cannot be exchanged or traded equivalently like other cryptographic assets.</p>
                   
                    <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                        <a rel="noopener noreferrer" href="https://www.simplilearn.com/tutorials/blockchain-tutorial/what-is-nft" target="_blank" 
                        className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-400 hover:bg-violet-700 dark:text-gray-900">Learn More</a>
                    </div>
                </div> 
                
                <div className="bg-white border-xl rounded  flex items-center justify-center p-5 mt-8 w-[15rem] md:w-[25rem] ">
                    <img src="./1.jpeg" className="object-contain " alt="..."/>
                </div>
                
            </div>
        </div>
        <div className="flex flex-col place-items-center mt-20">
            <div className="md:text-[2rem] font-bold text-white ">
                Top NFTs
            </div>
            <div className="flex mt-5 justify-center flex-wrap max-w-screen-xl text-center">
                {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
        </div> 
        <Footer />           
    </div>
);

}