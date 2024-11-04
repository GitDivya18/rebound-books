import React from 'react';
import { Link } from 'react-router-dom';
import pic from '../../public/Frontpage.jpg';

function FrontPage() {
  return (
    <div className='d-flex justify-content-center align-items-center position-relative' style={{ height: '100vh' }}>
      <img className='w-100 image-responsive' src={pic} alt="" style={{ height: '100vh', objectFit: 'cover' }} />
      <div className='position-absolute text-center' style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className='display-3 fw-bold text-success bg-white px-4 py-2 rounded-pill mb-4'>
          <span style={{ color: "blue" }}>REBOUND</span>
          <span style={{ color: "red" }}>READS </span>
        </div>
        <div >
          <Link to='/login' className='display-7 fw-bold text-success bg-white px-4 py-2 rounded-pill mb-5'>Login</Link>
          <Link to='/register' className='display-7 fw-bold text-success bg-white px-4 py-2 rounded-pill mb-4'>Register</Link>
        </div>
      </div>
    </div>
  );
} 

export default FrontPage;
