// import axie from "../tile.jpeg";
import {
    Link
  } from "react-router-dom";

function NFTTile (data) {
    const newTo = {
        pathname:"/nftPage/"+data.data.tokenId
    }
    // convert number to string and to shorten it
    const address = data.data.seller;
    const subAddress = `${address}`.substring(0,8)+'...'
    
    return (
        <Link to={newTo}>
            <div className="max-w-xs overflow-hidden bg-grey-800 rounded-lg shadow-lg bg-white m-3 pb-2">
                <div className="px-4 py-2">

                    <div className="flex flex-row my-2">
                        <div className="w-8 h-8 overflow-hidden border-2 border-gray-800 rounded-full bg-white">
                            <img src="./1.jpeg" className="object-cover w-full h-full bg-white" alt="avatar" />
                        </div>
                            <span className="ml-2 text-black pt-1 overflow-hidden">{subAddress}</span>
                    </div>

                    <img src={data.data.image} alt="" className="object-cover w-full h-full mt-2" />

                    <h3 className="text-xl font-bold py-3 text-gray-800">{data.data.name}</h3>    
                    
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                        <h1 className="text-lg font-bold text-white">{data.data.price}ETH</h1>
                        <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">Buy</button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NFTTile;
