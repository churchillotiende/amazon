import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../static/scss/_subtotal.css'
import { getBasketTotal } from './reducer';
import { useStateValue } from './stateprovider';

export default function Subtotal() {
    const[{basket} , dispatch] = useStateValue();
    const history = useHistory();
  return (
    <div className='subtotal'>
        <CurrencyFormat 
            renderText = {(value) =>(
                <>
                <p>
                    Subtotal ({basket.length} items):<strong>{value}</strong>
                </p>
                <small className='order_gift' >
                    <input type='checkbox'/>
                    This order comes with a gift
                </small>
                </>
            )} 
            decimalScale= {2}
            value = {getBasketTotal(basket)}
            displayType = {'text'}
            thousandSeparator = {true}
            prefix = {'$'} 
        /> 
        <button onClick={e => history.push('/payment')}>Proceed to checkout</button> 
    </div>  
  )
}
