import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileGallery({ postData }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/post/${id}`);
      // Optionally, refresh the postData after deletion to update the UI.
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success mb-3 text-capitalize"
          onClick={() => navigate('/uploadform')}
        >
          Upload Books
        </button>
      </div>

      <div className="d-flex flex-wrap w-100">
        {postData?.map((profile) => (
          <div key={profile._id} className="col-md-4 mb-3">
            <div className="card">
              <img
                src={`http://localhost:5000/` + profile.image}
                alt={profile.bookName}
                className=""
                height="150px"
                width="100%"
              />
              <div className="card-body">
                <div className="mb-3">
                  <strong>Book Name:</strong> {profile.bookName}
                </div>
                <div className="mb-3">
                  <strong>Author:</strong> {profile.author}
                </div>
                <div className="mb-3">
                  <strong>Price:</strong> {profile.price}
                </div>
                <div className="mb-3">
                  <strong>Description:</strong> {profile.description}
                </div>
                <button
                  type="button"
                  className="btn btn-danger me-4"
                  onClick={() => handleDelete(profile._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileGallery;
