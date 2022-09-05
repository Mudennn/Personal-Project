import React from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import Web3Modal from "web3modal";
import { providers } from "ethers";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
    const[walletConnected, setWalletConnected] = useState(false);
    const web3ModalRef = useRef();
    const [currAddress, updateAddress] = useState("0x");
    const [open,setOpen]= useState(false);
    
      /**
     * Returns a Provider or Signer object representing the Ethereum RPC with or without the
     * signing capabilities of metamask attached
     *
     * A `Provider` is needed to interact with the blockchain - reading transactions, reading balances, reading state, etc.
     *
     * A `Signer` is a special type of Provider used in case a `write` transaction needs to be made to the blockchain, which involves the connected account
     * needing to make a digital signature to authorize the transaction being sent. Metamask exposes a Signer API to allow your website to
     * request signatures from the user using Signer functions.
     *
     * needSigner - True if you need the signer, default false otherwise
     */
        
    const getProviderOrSigner = async (needSigner = false) => {
        // Connect to Metamask
        // Store `web3Modal` as a reference, need to access the `current` value to get access to the underlying object
        const provider = await web3ModalRef.current.connect();
        const web3Provider = new providers.Web3Provider(provider);
       
        const { chainId } = await web3Provider.getNetwork()
        if(chainId !== '0x5')
        {
          //alert('Incorrect network! Switch your metamask network to Georli');
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x5' }],
         })
        }

        if(needSigner) {
            const signer = web3Provider.getSigner();
            return signer;
        }
        return web3Provider;
    }

    async function getAddress() {
        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        updateAddress(addr);
      }
      
    function updateButton() {
    const ethereumButton = document.querySelector('.enableEthereumButton');
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
    }

    const connectWallet = async () => {
        try {
            await getProviderOrSigner();
            setWalletConnected(true);
            updateButton()
            getAddress()
        } catch (err) {
            console.error(err);
        }
    }

    
    useEffect(() => {
        if (!walletConnected) {
            web3ModalRef.current = new Web3Modal({
                network: "georli",
                providerOptions: {},
                disableInjectedProvider: false,
                });
                connectWallet();
            }
        });


    

  return (
    <div>
        {/* RESPONSIVE NAVBAR*/}
            <div className='shadow-md w-full top-0 left-0'>
                <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
                    <Link to="/" className='text-3xl font-bold text-transparent sm:text-4xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'>NFTs</Link>
                
                {/* Open and close menu for mobile or tablet */}
                <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
                <ion-icon name={open ? 'close':'menu'}></ion-icon>
                </div>

                    <ul className={`md:flex md:items-center gap-5 md:py-0 py-10  absolute md:static bg-white left-0 w-full md:w-auto  md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-[4.2rem] ':'top-[-490px]'}`}>
                        <CustomLink className='md:mt-0 mt-4 md:text-base text-xl hover:text-purple-600 cursor-pointer' to="/">Marketplace</CustomLink>
                        <CustomLink className='md:mt-0 mt-4 md:text-base text-xl hover:text-purple-600 cursor-pointer' to="/profile">Profile</CustomLink>
                        <CustomLink className='md:mt-0 mt-4 md:text-base text-xl hover:text-purple-600 cursor-pointer' to="/sellnft">List My NFT</CustomLink>
                        <button className=" enableEthereumButton bg-blue-500 md:mt-0 mt-5 text-white font-bold py-2 px-4 border border-blue-70 rounded">
                        <img src="./mm.png" alt="" className='h-5 mr-2 inline' />
                        {walletConnected ? (currAddress.substring(0,8)+'...'):"Connect Wallet"}
                        </button>
                    </ul>
                </div>
            </div>
                        
    </div>
  )

   function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true}) 
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
        
    )
  }
}

export default Navbar