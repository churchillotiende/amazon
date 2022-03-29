import React from 'react';
import '../static/scss/_home.css';
import { ImageSlider } from './ImageSlider/image_slider';
import Product from './product';

export default function Home() {
  return (
    <div>
      <ImageSlider />
      <div className='home_row'>
        <Product
          id = '0'
          title='Gionee' 
          price={11.99} 
          image = {<img src = {require(`../static/images/15382d1b8f8821551e45.jpeg`)} />}
          rating = {5} 

        />
        <Product
          id = '1'
          title='Gionee' 
          price={11.99} 
          image = {<img src= {require('../static/images/d7d6abdb303bb70206d9.jpg')} alt='' />}
          rating = {5}
        />
        <Product
          id = '2'
          title='Gionee' 
          price={11.99}  
          image = {<img src={require('../static/images/c9eec7ba997ec682e02b.png')} />}
          rating = {5}
        />
      </div>
      <div className='home_row'>
        <Product
          id = '3'
          title='Gionee' 
          price={11.99} 
          image = {<img src= {require('../static/images/index.jpg')} alt='' />}
          rating = {5}
        />
        <Product
          id = '4' 
          title='Gionee' 
          price={11.99} 
          image = {<img src= {require('../static/images/d9a37a2dbecd202777dd.jpg')} alt='' />}
          rating = {5}
        />
      </div>
      <div className='home_row'>
        <Product 
          id = '5'
          title='Gionee' 
          price={11.99} 
          image = {<img src= {require('../static/images/c5f5ad79fbcbc1dc6641.jpeg')} alt='' />}
          rating = {5}
        />
      </div>
    </div>
  )
}
