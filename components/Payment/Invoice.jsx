import React from 'react';

function Invoice() {
    return (
        <div className="card-body" style={{ width: '100vw', height: 'auto' }}>
            <div className="container mb-5 mt-3">
                <div className="row d-flex align-items-baseline">
                    <div className="col-xl-9">
                        <p style={{ color: '#8f8061' }} >Invoice &gt;&gt; <strong>ID: #123-123</strong></p>
                    </div>
                </div>
                <div className="container">
                    <div className="col-md-12">
                        <div className="text-center">
                        <span style={{ color: "red" }}>Hommie</span>
          <span style={{ color: "green"}}>Food </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-8">
                            <ul className="list-unstyled">
                                <li className="text-muted">To: <span style={{ color: '#8f8061' }}>John Bootstrap</span></li>
                                <li className="text-muted">Street, City</li>
                                <li className="text-muted">State, Country</li>
                                <li className="text-muted"><i className="fas fa-phone"></i> 123-456-789</li>
                            </ul>
                        </div>
                        <div className="col-xl-4">
                            <p className="text-muted">Invoice</p>
                            <ul className="list-unstyled">
                                <li className="text-muted"><i className="fas fa-circle" style={{ color: '#8f8061' }} ></i> <span
                                    className="fw-bold">ID:</span>#123-456</li>
                                <li className="text-muted"><i className="fas fa-circle" style={{ color: '#8f8061' }}></i> <span
                                    className="fw-bold">Creation Date: </span>Jun 23,2021</li>
                                <li className="text-muted"><i className="fas fa-circle" style={{ color: '#8f8061' }}></i> <span
                                    className="me-1 fw-bold">Status:</span><span className="badge bg-warning text-black fw-bold">
                                        Unpaid</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row my-2 mx-1 justify-content-center">
                        <div className="col-md-2 mb-4 mb-md-0">
                            <div className=" bg-image ripple rounded-5 mb-4 overflow-hidden d-block" data-ripple-color="light">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp"
                                    style={{ width: "95%", height: "70%" }}  alt="Elegant shoes and shirt" />
                                <a href="#!">
                                    <div className="hover-overlay"></div>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-7 mb-4 mb-md-0">
                            <p className="fw-bold">Custom suit</p>
                            <p className="mb-1">
                                <span className="text-muted me-2">Size:</span><span>8.5</span>
                            </p>
                            <p>
                                <span className="text-muted me-2">Color:</span><span>Gray</span>
                            </p>
                        </div>
                        <div className="col-md-3 mb-4 mb-md-0">
                            <h5 className="mb-2">
                                <s className="text-muted me-2 small align-middle">$1500</s><span className="align-middle">$1050</span>
                            </h5>
                            <p className="text-danger"><small>You save 25%</small></p>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-xl-8">
                            <p className="ms-3">Add additional notes and payment information</p>
                        </div>
                        <div className="col-xl-3">
                            <ul className="list-unstyled">
                                <li className="text-muted ms-3"><span className="text-black me-4">SubTotal</span>$1050</li>
                                <li className="text-muted ms-3 mt-2"><span className="text-black me-4">Shipping</span>$15</li>
                            </ul>
                            <p className="text-black float-start"><span className="text-black me-3"> Total Amount</span><span
                                style={{ fontSize: "25px" }}>$1065</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Invoice;
