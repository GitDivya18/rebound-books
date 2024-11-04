import React from 'react';
import { Link as Linkroll, useNavigate } from 'react-router-dom';

function Homenav({ setSearch }) {
  const navigate = useNavigate();

  const log = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Linkroll className="navbar-brand" to="/">
          <span style={{ color: "blue" }}>ReBound</span>
          <span style={{ color: "red" }}>Reads</span>
        </Linkroll>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mx-3" id="navbarNav">
          <div className="navbar-nav ms-auto col-sm-4 search">
            <input type="text" className='search form-control' onChange={e => setSearch(e.target.value)} name="search-item" style={{ borderRadius: "50px" }} placeholder='Search' />
          </div>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Linkroll className='btn btn-danger rounded-pill mx-3' to={`/userprofile/${JSON.parse(sessionStorage?.getItem('user'))._id}`}>Profile</Linkroll>
            </li>
            <li className="nav-item">
              <Linkroll className='btn btn-danger rounded-pill mx-3' to='/home'>Home</Linkroll>
            </li>
            <li className="nav-item">
              <button className='btn btn-danger rounded-pill' onClick={log}>Log Out</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Homenav;
