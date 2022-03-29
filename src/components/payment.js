import { Domain } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import CheckoutProduct from './product_checkout'
import { useStateValue } from './stateprovider'
import {Link} from 'react-router-dom';
import '../static/scss/_payment.css';
import { CardElement , useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from '../axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const[{basket , user} , dispatch] = useStateValue()
    const[error , setError] = useState(null);
    const[disabled , setDisabled] = useState(true);
    const[processing , setProcessing] = useState('');
    const[succeeded , setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);
    const history = useHistory();

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])
    console.log('The client secret is >>>' , clientSecret)

    const handleChange = (event) =>{
        setDisabled(event.empty)
        setError(event.error ? event.error.message : '')
    }

    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret , {
            payment_method:{
                card:elements.getElement(CardElement)
        }
    }).then(({paymentIntent}) =>{
        setSucceeded(true);
        setProcessing(false);
        setError(null);
        history.replace('/orders')
    })
    }
    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout(
                        <Link to = '/checkout'>
                            {basket?.length}items
                        </Link>
                    )
                </h1>
            {/* Payment section delivery address */}
                <div className='payment__section' >
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address' >
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                <div className='payment__section' >
                    <div className='payment__title' >
                        <h3>Review Items and delivery</h3>
                    </div>
                </div>
                <div className='payment__items' >
                    {
                        basket.map(item =>(
                        <CheckoutProduct
                            id = {item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                        ))
                    }
                </div>
                <div className='payment__section' >
                    <div className='payment__title' >
                        <h3>Payment method</h3>
                    </div>
                    <div className='payment__details'>
                        {/* Stripe magic */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                        </form>
                        <div className = 'payment__priceContainer'>
                            <CurrencyFormat 
                                renderText = {(value) =>
                                (
                                    <h3>Order total : {value}</h3>
                                )}
                                decimalScale = {2}
                                value = {getBasketTotal(basket)}
                                displayType = {'text'}
                                thousandSeparator = {true}
                                prefix = {'$'}
                            />
                            <button disabled = {processing || succeeded || disabled}>
                                    <span>
                                        {processing ? <p>Processing</p>:'Buy Now' }
                                    </span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
