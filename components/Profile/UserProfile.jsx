import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileGallary from './ProfileGallary';

function UserProfile() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [dataChange, setDataChange] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    address: '',
    thought: '',
    profileImage: '' // Add profileImage field
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5000/api/Profile/${id}`);
        setData(response.data.profile);
        setFormData({
          username: response.data.profile.username || '',
          phone: response.data.profile.phone || '',
          address: response.data.profile.address || '',
          thought: response.data.profile.thought || '',
          profileImage: response.data.profile.profileImage || '' // Add profileImage from response
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [id, dataChange]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/api/update-profile/${id}`, formData);
      setDataChange(!dataChange);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex">
        <div className="col-md-4">
          <h2 className="text-center mb-4">User Profile</h2>
          {data ? (
            <div>
              {/* Add profile image */}
              {data.profileImage && (
                <div className="text-center mb-3">
                  <img src={data.profileImage} alt="Profile" className="img-fluid rounded-circle" style={{ maxWidth: '150px' }} />
                </div>
              )}
              <div className="mb-3"><strong>Username:</strong> {data.user.username}</div>
              <div className="mb-3"><strong>Email:</strong> {data.user.email}</div>
              <div className="mb-3"><strong>Phone:</strong> {data.phone}</div>
              <div className="mb-3"><strong>Date:</strong> {new Date(data.date).toLocaleDateString()}</div>
              <div className="mb-3"><strong>Address:</strong> {data.address}</div>
              <div className="mb-3"><strong>Thoughts:</strong> {data.thought}</div>
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>Edit Profile</button>
            </div>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
        <div className="col-md-8">
          <ProfileGallary postData={data?.user.post} />
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Thoughts</label>
                  <input type="text" className="form-control" name="thought" value={formData.thought} onChange={handleChange} />
                </div>
                {/* <div className="form-group">
                  <label>Profile Image URL</label>
                  <input type="text" className="form-control" name="profileImage" value={formData.profileImage} onChange={handleChange} />
                </div> */}
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* End Bootstrap Modal */}
    </div>
  );
}

export default UserProfile;
