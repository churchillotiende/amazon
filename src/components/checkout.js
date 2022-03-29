import React from 'react'
import '../static/scss/_checkout.css';
import CheckoutProduct from './product_checkout';
import { useStateValue } from './stateprovider';
import Subtotal from './subtotal';

export default function Checkout() {
    const[{user , basket}, dispatch] = useStateValue();
    return (
        <div className='checkout' >
            <div className='checkout_left' >
                <img
                className="checkout__ad"
                src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                alt=""
                />
                <div className='checkout_title'>
                    <h3>Hello {user?.email}</h3>
                    <h1 className='checkout_title' >Your shopping basket</h1>
                    {
                     basket.map(item => (
                        <CheckoutProduct
                          id={item.id}
                          title={item.title}
                          image={item.image}
                          price={item.price}
                          rating={item.rating}
                    />
                    ))}
                </div>
            </div>
            <div className='checkout_right' >
                <Subtotal />
            </div>
        </div>
    )
}
