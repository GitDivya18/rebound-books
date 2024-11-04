    import React, { useState } from 'react';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';

    const Profile = () => {
        const navigate = useNavigate();
        const [data, setData] = useState({
            profileImg: '',
            username: '',
            thought: '',
            dob: '',
            phone: '',
            address: ''
        });

        const onChange = (e) => {
            const { name, value } = e.target;
            setData({ ...data, [name]: value });
        };

        const onSubmit = async (e) => {
            e.preventDefault();

            // Validation checks
            if (!data.username || !data.phone || !data.dob || !data.address || !data.thought) {
                alert("Please fill in all fields.");
                return;
            }
            if (!/^\d{10}$/.test(data.phone)) {
                alert('Please enter a valid 10-digit phone number.');
                return;
            }

            try {
                const res = await axios.post("http://localhost:5000/api/add", data, {
                    headers: {
                        "Authorization": sessionStorage.getItem('token')
                    },
                });
                console.log(res);
                navigate('/home');
            } catch (error) {
                console.error("Error while saving profile:", error);
                alert("Failed to save profile. Please try again.");
            }
        };

        return (
            <div>
                <div className="container rounded pt-2 mb-3">
                    <div className="row profileform">
                        <div className="col-sm-4 mx-5 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-4 py-1">
                                <img
                                    className="rounded-circle mt-5"
                                    width="350px"
                                    height="50"
                                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                    style={{ height: '80vh' }}
                                    alt="Profile"
                                />
                                <span> </span>
                            </div>
                        </div>
                        <div className="col-sm-6 border-right">
                            <div className="p-5 py-3">
                                <div className="d-flex justify-content-center mb-3">
                                    <h2 className="text-right">Profile Settings</h2>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-12">
                                        <label className="labels">Username</label>
                                        <input type="text" className="form-control" name="username" onChange={onChange} />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-12">
                                        <label className="labels">Mobile Number</label>
                                        <input type="text" name="phone" onChange={onChange} className="form-control" />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Date of birth</label>
                                        <input type="date" name="dob" onChange={onChange} className="form-control" />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Address</label>
                                        <input type="text" name="address" onChange={onChange} className="form-control" />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Your Thought</label>
                                        <textarea className="form-control" name="thought" onChange={onChange} id="thought" cols="25" rows="2"></textarea>
                                    </div>
                                </div>

                                <div className="mt-4 text-center">
                                    <button className="btn btn-success profile-button mx-4" type="submit" onClick={onSubmit}>
                                        Save Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default Profile;
