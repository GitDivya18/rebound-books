import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ban from '../../public/UploadForm.jpg';

const UploadForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    bookName: '',
    author: '',
    price: '',
    description: '',
  });
  const [img, setImg] = useState(null);
  const [error, setError] = useState('');
  const user = JSON.parse(sessionStorage.getItem('user'));

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onImg = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {  // 5MB limit
      setError('File size should not exceed 5MB');
      setImg(null);
    } else {
      setImg(file);
      setError('');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!state.bookName || !state.author || !state.price || !state.description || !img) {
      setError('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('bookName', state.bookName);
    formData.append('author', state.author);
    formData.append('price', state.price);
    formData.append('description', state.description);
    formData.append('user', user._id);
    formData.append('image', img);

    try {
      await axios.post('http://localhost:5000/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Upload successful! Redirecting to home page...');
      navigate('/home', { state: { reload: true } });
    } catch (error) {
      console.error('Error submitting data:', error);
      setError('Error submitting data. Please try again.');
    }
  };

  return (
    <div className="container-fluid position-absolute">
      <img src={ban} className="w-100" alt="Background" style={{ height: '100vh', objectFit: 'cover' }} />
      <div className="position-absolute" style={{ top: '50%', right: '9%', transform: 'translateY(-50%)', width: '450px' }}>
        <div className="row justify-content-center">
          <div className="col-sm-12 my-2">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="upload-btn-wrapper mb-2">
              <input type="file" onChange={onImg} placeholder="Select image" accept="image/*" />
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <div className="row justify-content-center">
            <div className="col-sm-12 my-3">
              <div className="form-group form-upload me-7">
                <label htmlFor="bookName">Book Name</label>
                <input
                  type="text"
                  name="bookName"
                  onChange={onChange}
                  className="form-control"
                  id="bookName"
                  placeholder="Enter book name"
                  value={state.bookName}
                />
              </div>

              <div className="form-group form-upload">
                <label htmlFor="author" style={{ width: '500px' }}>
                  Author Name
                </label>
                <input
                  type="text"
                  name="author"
                  onChange={onChange}
                  className="form-control"
                  id="author"
                  placeholder="Enter the author name"
                  value={state.author}
                />
              </div>

              <div className="form-group form-upload">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  onChange={onChange}
                  className="form-control"
                  id="price"
                  placeholder="Enter the price"
                  value={state.price}
                />
              </div>

              <div className="form-group form-upload my-7">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  name="description"
                  onChange={onChange}
                  className="form-control"
                  rows="3"
                  id="description"
                  placeholder="Enter the description"
                  value={state.description}
                />
              </div>
            </div>
          </div>

          <button style={{ width: '220px' }} type="submit" className="btn btn-success btn-block">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
