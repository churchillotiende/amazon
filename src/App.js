import './App.css';
import Header from './components/header';
import Home from './components/home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Checkout from './components/checkout';
import Login from './components/login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './components/stateprovider';
import Payment from './components/payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51KZ9OELCAo7YWPSS6RcArKKA7qfBdcrv2ZqT6LiSXddr1BywdNo3DkTbMVsOeVQ8YvfFuWuNhindfnF7kMa5WzgO00ClJF6BFt');

function App() {
  const[{} , dispatch] = useStateValue();
  useEffect(() =>{
    // Will only run once when the app component loads
    auth.onAuthStateChanged(authUser =>{
      if(authUser){
        dispatch({
          type:'SET_USER',
          user:authUser
        })
      }
      else{
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
  },[])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path = '/payment'>
            <Header />
            <Elements stripe = {promise}>
              <Payment />
            </Elements>
          </Route>
          <Route exact path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route exact path='/'>
            <Header />
            <Home />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
