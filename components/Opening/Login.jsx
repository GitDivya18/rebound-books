import React, { useState } from 'react';
import bannerImage from '../../public/loginn.jpg';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (data.success) {
                // window.location.href = '/user'
                alert('logged in successfully')
                sessionStorage.setItem('token', data.token)
                sessionStorage.setItem('user', JSON.stringify(data.user))

                navigate('/profile')
            } else {
                alert(data.message)
            }
            // You can handle the response data here (e.g., show success/failure message, redirect user)
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <>
            <div className='d-flex justify-content-end align-items-center ' id='login'>
                <img src={bannerImage} className='w-100 image-responsive' alt="" style= {{ height: '100vh' }}/>
                <div className="position-absolute me-1 col-lg-4">
                    <form className=' w-100 p-5' onSubmit={handleSubmit}>
                        <span className='text-center h1' style={{ color: "white" }}>Login</span>
                        <div className="form-group d-flex flex-column justify-content-center h5 ">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mb-3"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className="btn btn-success rounded-pill mx-3">Submit</button>
                            <span className=' text-center h5'>Not a member?</span>
                            <a className="btn btn-warning rounded-pill mx-3 " href="/register">Register</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
