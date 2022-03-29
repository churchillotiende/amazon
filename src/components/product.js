import React from 'react'
import '../static/scss/_product.css'
import { useStateValue } from './stateprovider'

export default function Product({id , title , price, image , rating }) {
    const[{basket} , dispatch] = useStateValue();
    console.log(basket)
    const addToBasket = () =>{
        dispatch({
            type:'ADD_TO_BASKET',
            item:{
                id:id,
                title:title,
                image:image,
                rating:rating,
                price:price
            }
        })
    }
  return (
    <div className='product'>
        <div className='product_info'>
            <p>{title}</p>
            <p className='product_price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className='product_rating'>
                {
                    Array(rating) 
                    .fill()
                    .map((_,i) =>(
                        <p>🌟</p>
                    )
                    )
                }
            </div>
        </div>
        {image} 
        <button onClick={addToBasket}>
            Add to Basket
        </button>
    </div>

  )
}
