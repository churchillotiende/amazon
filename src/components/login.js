import React, { useState } from 'react';
import {Link , useHistory} from 'react-router-dom';
import '../static/scss/_login.css';
import {auth} from '../firebase';

export default function Login() {
  const[email , setEmail] = useState('');
  const[password , setPassword] = useState('');
  const history = useHistory();

  const login = (e) =>
  {
    auth
    .signInWithEmailAndPassword(email , password)
    .then(auth =>{
      if(auth){
        history.push('/')
      }
    })
    e.preventDefault();
  }

  const register = (e) =>
  {
    auth.createUserWithEmailAndPassword(email , password)
      .then((auth) =>{
        if(auth){
          history.push('/')
        }
      })
      .catch(error =>alert(error.message));
    e.preventDefault();
  }

  return (
    <div className='login'>
      <div className='login__container'>
        <Link to='/' >
          <img
              className="login__logo"
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
          />
        </Link>
        <h1>Sign-In</h1>
        <form>
          <h4>E-mail</h4>
          <input type='text' value={email} onChange ={e =>setEmail(e.target.value)} placeholder='Enter email'/>
          <h4>Password</h4>
          <input type='password' value={password} onChange = {e =>setPassword(e.target.value)} placeholder='Enter password'/>
          <button onClick={login} className='login__signInButton' >
            Login
          </button> <br />
          <small>Dont have an account ?</small>
          <button onClick = {register} className='login__registerButton'>Register</button>
        </form>
      </div>
    </div>
  )
}
