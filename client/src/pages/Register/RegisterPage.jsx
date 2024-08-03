// src/components/RegisterPage.js
import React, { useState } from 'react';
import './RegisterPage.css';
import { Link } from 'react-router-dom';
import useRegister from '../../hooks/useRegister'
import { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader'


const RegisterPage = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender:'',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const {loading,register} = useRegister();

  const handleRegister = async (e) => {
    e.preventDefault();
    register(inputs);
    setInputs({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender:'',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    });
  };

  return (
    <div className="register-page">
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
          <input
            type="text"
            value={inputs.username}
            onChange={(e) => setInputs({...inputs,username:e.target.value})}
            placeholder='Name'
          />
       
          <input
            type="email"
            value={inputs.email}
            onChange={(e) => setInputs({...inputs,email:e.target.value})}
            placeholder='Email'
          />
      
          <input
            type="password"
            value={inputs.password}
            onChange={(e) => setInputs({...inputs,password:e.target.value})}
            placeholder='Password'
          />
        
          <input
            type="password"
            value={inputs.confirmPassword}
            onChange={(e) => setInputs({...inputs,confirmPassword:e.target.value})}
            placeholder='Confirm Password'
          />
        <div className="address">
         <select value={inputs.gender} onChange={(e)=> setInputs({...inputs,gender:e.target.value})}>
          <option value="null">Select Gender</option>
          <option value="male">Male</option>
          <option value="demale">Female</option>
         </select>
          <input
            type="text"
            value={inputs.street}
            onChange={(e) => setInputs({...inputs,street:e.target.value})}
            placeholder='Street'
          />
          <input
            type="text"
            value={inputs.city}
            onChange={(e) => setInputs({...inputs,city:e.target.value})}
            placeholder='City'
          />
     
          <input
            type="text"
            value={inputs.state}
            onChange={(e) => setInputs({...inputs,state:e.target.value})}
            placeholder='State'
          />
 
          <input
            type="text"
            value={inputs.postalCode}
            onChange={(e) => setInputs({...inputs,postalCode:e.target.value})}
            placeholder='Postal Code'
          />
        
          <input
            type="text"
            value={inputs.country}
            onChange={(e) => setInputs({...inputs,country:e.target.value})}
            placeholder='Country'
          />
        </div>

        <button type="submit">
          {
            loading ? <Loader/> : 'Register'
          }
        </button>
        <p className='link'>Already have an account..? <Link to='/login'>Login</Link></p>
      </form>
    </div>
    <Toaster style={{margin:'50px 100px'}}/>
    </div>
  );
};

export default RegisterPage;
