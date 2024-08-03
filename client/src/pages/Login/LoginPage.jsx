// src/components/LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useLogin from '../../hooks/useLogin';
import Loader from '../../components/Loader/Loader'


const LoginPage = () => {
  const [inputs,setInputs] = useState({
    email : '',
    password : '',
});

const {loading,login} = useLogin();



const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs)
}


  return (
    <div className="login-page">
    <div className="login-container">
      <h1>Login</h1><br/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            value={inputs.email}
            onChange={(e) => setInputs({...inputs,email:e.target.value})}
            placeholder='Email'
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={inputs.password}
            onChange={(e) => setInputs({...inputs,password:e.target.value})}
            placeholder='Password'
          />
        </div>
        <button className='btn' type="submit">
          {
            loading ? <Loader/> : 'Login'
          }
        </button>
        <p className='link'>Don't have an account..? <Link to='/register'>Register</Link></p>
      </form>
    </div>
    <Toaster style={{margin:'50px 100px'}}/>
    </div>
  );
};

export default LoginPage;
