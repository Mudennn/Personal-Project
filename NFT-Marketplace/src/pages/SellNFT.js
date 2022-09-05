import React from 'react'
import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from '../pinata';
import Marketplace from '../Marketplace.json';
// import { useLocation } from "react-router"
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";


export default function SellNFT () {
  const [formParams, updateFormParams] = useState({name: '', description: '', price: ''});
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState('');
  // const location = useLocation();
  const [selectedImage, setSelectedImage] = useState();
  

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    var file = e.target.files[0];
    //check for file extension

    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if(response.success === true && e.target.files && e.target.files.length > 0 ){
        console.log("Uploaded image to Pinata: ", response.pinataURL)
        setSelectedImage(e.target.files[0]);
        setFileURL(response.pinataURL);  
      }
    } catch(e) {
      console.log("Error during file upload", e);
    }
  }

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const {name, description, price} = formParams;
    //Make sure that none of the fields are empty
    if( !name || !description || !price || !fileURL)
      return;

    const nftJSON = {
      name, description, price, image: fileURL
    }

    try {
      //upload the metadata JSCN to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if(response.success === true){
        console.log("Uploaded JSON to Pinata: ", response)
        return response.pinataURL;
      }
    } catch(e) {
        console.log("error uploading JSON metadata:", e)
    }
  }

  async function listNFT(e) {
    e.preventDefault();

    //Upload data to IPFS
    try {
    const metadataURL = await uploadMetadataToIPFS();
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    updateMessage("Please wait.. uploading (upto 5 mins)")

    //Pull the deployed contract instance
    let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

    //massage the params to be sent to the create NFT request
    const price = ethers.utils.parseUnits(formParams.price, 'ether')
    let listingPrice = await contract.getListPrice()
    listingPrice = listingPrice.toString()

    //actually create the NFT
    let transaction = await contract.createToken(metadataURL, price, { value : listingPrice })
    await transaction.wait()

    alert("Successfully listed your NFT!");
    updateMessage("");
    updateFormParams({ name: '', description: '', price: ''});
    window.location.replace("/")
  }
  catch(e) {
    alert("Upload error"+e)
  }
}

console.log("Working", process.env)


// This function will be triggered when the "Remove This Image" button is clicked
const removeSelectedImage = () => {
  setSelectedImage();
};

return (
  <div>
    <Navbar />
      <div className='container flex flex-col justify-center mx-auto p-6 items-center sm:py-12 lg:py-24 lg:flex-row gap-5 md:gap-5 xl:gap-0'>
        {/* PREVIEW IMAGE  */}
        <div className='mx-auto flex flex-col items-center w-2/3 md:w-1/3'>
            {selectedImage && (
              <div className='flex flex-col px-2 pt-2 bg-white rounded '>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  className = ''
                  alt=""
                />
                <button onClick={removeSelectedImage} className='cursor-pointer py-2 my-4 rounded text-white bg-red-700 hover:bg-red-500 border-none text-xs'>
                  Remove This Image
                </button>
              </div>
            )}
            <div className='mt-4 items-center text-center mx-auto'>
            <input
                accept="image/*"
                type="file"
                onChange={OnChangeFile}
                className= 'text-white text-sm'
              />
          </div>
          
        </div>
        {/* FORM FOR UPLOAD NFT */}
        <div className='flex flex-col items-center m-auto'>
          <form className='bg-white shadow-md rounded px-8 pt-4 pb-9 '>
            <h3 className='text-center font-bold text-black mb-6 mt-1'>Upload your NFT to the marketplace</h3>
              <div className='mb-4'>
                <label className= 'block text-black text-sm font-bold mb-2' htmlFor="name">NFT Name</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="name" type="text" placeholder='DraftPunk#1234' onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
              </div>
              <div className='mb-'>
                <label className="block text-black text-sm font-bold mb-2" htmlFor="description">NFT Description</label>
                <textarea className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' cols="40" rows="5" id="description" type="text" placeholder='DraftPunk Collection' value={formParams.description} onChange={e => updateFormParams({...formParams, description: e.target.value})} ></textarea>
              </div>
              <div className=''>
                <label className='block text-black text-sm font-bold mb-2' htmlFor='price'>Price (in ETH)</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="number" placeholder='Min 0.005 ETH' step="0.005" value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}></input>
              </div>
              <br></br>
          <div className='text-green text-center'>{message}</div>
          <button onClick = {listNFT} className='font-bold mt-5 w-full dark:bg-violet-400 hover:bg-violet-700 dark:text-gray-900  rounded p-2 shadow-lg'>List NFT</button>
          </form>
        </div>
      </div>
      <Footer /> 
  </div>
)
}

