import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import AddNft from './components/addNFT';
import './App.css';

function App() {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch NFTs
    const fetchNfts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/nft');
            setNfts(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNfts();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <Router>
            <div className="app">
                <header>
                    <h1>NFT Marketplace</h1>
                    <nav>
                        <Link to="/">Home</Link> | <Link to="/add-nft">Add New NFT</Link>
                    </nav>
                </header>

                <Routes>
                    <Route path="/" element={<NFTMarketplace nfts={nfts} />} />
                    <Route path="/add-nft" element={<AddNft refreshNfts={fetchNfts} />} />
                </Routes>
            </div>
        </Router>
    );
}

const NFTMarketplace = ({ nfts }) => {
    return (
        <div className="nft-marketplace">
            <h2>NFT Collection</h2>
            <div className="nft-grid">
                {nfts.map((nft) => (
                    <div className="nft-card" key={nft._id}>
                        <img src={nft.imageUrl} alt={nft.title} className="nft-image" />
                        <h3 className="nft-title">{nft.title}</h3>
                        <p className="nft-price">${nft.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
