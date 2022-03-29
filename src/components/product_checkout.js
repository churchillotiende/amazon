import React from 'react'
import '../static/scss/_product_checkout.css'
import { useStateValue } from './stateprovider'
export default function CheckoutProduct({id , title , price, image , rating }) {
    const[{basket} , dispatch] = useStateValue()
    const removeFromBasket = () =>
    {
        dispatch({
            type:'REMOVE_FROM_BASKET',
            id:id
        })
    }
    return (
            <div className='checkout_product'>
                <div className='checkoutProduct__image' >{image}</div>
                <div className='checkoutProduct__info'>
                    <p className='checkoutProduct__title'>{title}</p>
                    <p className="checkoutProduct__price">
                        <small>$</small>
                        <strong>{price}</strong>
                    </p>
                    <div className="checkoutProduct__rating">
                        {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p>🌟</p>
                        ))}
                    </div>
                    <button onClick={removeFromBasket}>Remove from Basket</button>
                </div>
            </div>
    )
}
