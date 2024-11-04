import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

function Payment() {
    const [state, setState] = useState('');
    const params = useParams()
    const [dishData, setDishData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5000/post/single/${params.id}`);
                setDishData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [params.id]);

    function validate() {
        if (!sessionStorage.getItem('user')) {
            window.location.href = '/'
        }
    }

    function handler(token) {
        const subtotal = dishData.price
        const currentUser = JSON.parse(sessionStorage.getItem('user'))
        const cartItems = dishData._id
        axios.post('http://localhost:5000/payment/placeorder', { token, subtotal, currentUser, cartItems }).then(res => {
            navigate('/home')
        }).catch(err => {
            console.log(err)
        })
    }

    if (dishData)
        return (
            <div>

                <div className="d-flex justify-content-center container p-2" style={{ marginTop: "100px" }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-10 pb-8">
                            <div className="d-flex justify-content-center">
                                <div className="col-sm-10">
                                    <div className="row bg-light my-4 p-3">
                                        <div className="row col-sm-12 mb-3">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="formTextExample1">Dish Name</label>
                                                <input type="text" id="formTextExample1" value={dishData.dishName} className="form-control" aria-describedby="textExample1" disabled />
                                            </div>
                                        </div>
                                        <div className="row col-sm-12 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlTextarea1">Description</label>
                                                <textarea className="form-control" value={dishData.description} disabled id="exampleFormControlTextarea1" rows="3"></textarea>
                                            </div>
                                        </div>
                                        <div className="row col-sm-12">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="formTextExample1">Price</label>
                                                <input type="text" id="formTextExample1" className="form-control" aria-describedby="textExample1" value={dishData.price} disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-5">
                            <StripeCheckout
                                token={handler}
                                amount={dishData.price * 100}
                                shippingAddress
                                currency='INR'
                                stripeKey='pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ'
                            >

                                <button className="btn btn-success" onClick={validate}>PAY NOW</button>

                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            </div>

        )
}

export default Payment;
