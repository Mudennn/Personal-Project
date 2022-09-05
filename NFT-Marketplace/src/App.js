import Navbar from './components/Navbar.js';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';
import SellNFT from './pages/SellNFT';
import NFTPage from './pages/NFTpage';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Navbar />
        <Routes>
          <Route path="/" element={<Marketplace />}/>
          <Route path="/nftPage" element={<NFTPage />}/>        
          <Route path="/profile" element={<Profile />}/>
          <Route path="/sellNFT" element={<SellNFT />}/>                  
        </Routes>
    </div>
  );
}

export default App;
