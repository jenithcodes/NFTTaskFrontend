import React, { useState } from 'react';
import axios from 'axios';
import './addNFT.css';

const AddNft = ({ refreshNfts }) => {
    const [nft, setNft] = useState({

        title: '',
        imageUrl: '',
        price: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNft({ ...nft, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://nft-task-backend.vercel.app/upload', nft);
            setSuccess('NFT added successfully!');
            setError(null);
            setNft({ title: '', imageUrl: '', price: '' }); // Reset the form

            // Call the refreshNfts function to update the NFT list on the homepage
            refreshNfts();
        } catch (err) {
            setError('Error adding NFT: ' + err.message);
            setSuccess(null);
        }
    };

    return (
        <div className="add-nft-container">
            <h2>Add New NFT</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={nft.title}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Image URL:
                        <input
                            type="url"
                            name="imageUrl"
                            value={nft.imageUrl}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input
                            type="text"
                            name="price"
                            value={nft.price}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Add NFT</button>
            </form>
            {success && <div className="success">{success}</div>}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default AddNft;
