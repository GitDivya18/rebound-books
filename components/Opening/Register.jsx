import React, { useRef, useState } from 'react';
import regImage from '../../public/register.jpg';

function Register() {
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const email = emailRef.current.value.trim();
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();

    if (!email || !username || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid Gmail address');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, username, password })
      });

      const data = await response.json();

      if (data.success) {
        alert('Registered Successfully');
        setError('');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Email validation function to accept only Gmail addresses
  const validateEmail = (email) => {
    const re = /^[^\s@]+@gmail\.com$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className='d-flex justify-content-start align-items-center' id='register'>
      <img src={regImage} className='w-100 image-responsive' alt="" style={{ height: '100vh' }} />
      <div className="position-absolute ms-5 col-lg-4">
        <form className='w-200 p-5' onSubmit={handleSubmit}>
          <span className='text-center h2'>Register</span>
          {error && <div className="alert alert-danger my-3" role="alert">{error}</div>}
          <div className="form-group d-flex flex-column justify-content-center h6">
            <label>User Name</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="User Name"
              ref={usernameRef}
            />
            <label>Email address</label>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              ref={emailRef}
            />
            <label>Password</label>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              ref={passwordRef}
            />
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
            />
            <button className="btn btn-success rounded-pill mx-3" type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
            <span className='text-center h5'>Already have an account?</span>
            <a className="btn btn-warning rounded-pill mx-3" href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
