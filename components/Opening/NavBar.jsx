import React from 'react'


function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-nav navbar-light ">
        <label className="navbar-brand" href="#"><span style={{ color: "red" }}>Hommie</span><span style={{ color: "green" }}>Food </span></label>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">

              <a className="btn btn-danger rounded-pill mx-3" href="#login">Login </a>
            </li>
            <li className="nav-item">
              <a className="btn btn-danger rounded-pill mx-3'" href="#register">Register</a>
            </li>
          

          </ul>
        </div>
      </nav>

    </div>
  )
}

export default NavBar
