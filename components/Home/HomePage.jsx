import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomePage({ search }) {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [userProfile, setUserProfile] = useState(null); 
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Function to fetch books from the server
    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/books');
            console.log('Fetched books:', response.data);  
            setData(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    // Initial fetch of books
    useEffect(() => {
        fetchBooks();
    }, []);

    // Fetch user profile data
    useEffect(() => {
        async function fetchUserProfile() {
            if (sessionStorage.getItem('token')) {
                try {
                    const response = await axios.get('http://localhost:5000/api/user-profile-homepage', {
                        headers: {
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                        }
                    });
                    setUserProfile(response.data.profile);
                    console.log('Fetched user profile:', response.data.profile);  
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            }
        }

        fetchUserProfile();
    }, []);

    // Check for user authentication
    if (!sessionStorage.getItem('token')) {
        alert('Please Login to view content');
        navigate('/login');
        return null;
    }

    const handleOrderClick = (book) => {
        setSelectedBook(book);
        setShowModal(true);
    };

    const filteredData = data?.filter(book => 
        book.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="container py-4 my-4">
                {userProfile && (
                    <div className="mb-4">
                        <h3>Welcome, {userProfile.username}</h3>
                        <p><strong>Thought:</strong> {userProfile.thought}</p>
                        <p><strong>Preferences:</strong> {userProfile.prefrences}</p>
                    </div>
                )}
                <div className="d-flex flex-wrap w-100">
                    {filteredData?.map(book => (
                        <div key={book._id} className="col-md-3 mb-3">
                            <div className="card">
                                <img src={`http://localhost:5000/${book.image}`} alt={book.title} className="" height='150px' width='100%' />
                                <div className="card-body">
                                    <div className="mb-3"><strong>Title:</strong> {book.title}</div>
                                    <div className="mb-3"><strong>Author:</strong> {book.author}</div>
                                    <div className="mb-3"><strong>Uploaded By:</strong> {book.user?.username || 'Unknown'}</div>
                                    <div className="mb-3"><strong>Price:</strong> {book.price}</div>
                                    <div className="mb-3"><strong>Description:</strong> {book.description}</div>
                                    <button type="button" className="btn btn-danger me-5" onClick={() => handleOrderClick(book)}>Order</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedBook && (
                <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Order {selectedBook?.title}</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Quantity</label>
                                    <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" />
                                </div>
                                <Link className="btn btn-primary" to={`/payment/${selectedBook?._id}`}>Place Order</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;  
