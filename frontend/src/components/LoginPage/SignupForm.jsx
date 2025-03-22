import React from 'react'
import { useState } from 'react';
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

export default function SignupForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');


  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = { name, email, phone, password };

    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('User registered successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
      } else {
        alert(result.error || 'Registration failed');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        submitHandler(e);
      }}
      action='/register'
      method='post'
      className='mt-[20px]  md:flex flex-col items-center justify-center grow h-[100%] min-w-[300px] max-w-[60%]'>

      {/* signup page heading */}
      <div className='w-[100%] '>
        <p className='font-bold text-xl'>Get Started</p>
        <p className='mb-6 text-gray-500'>Welcome to Ment Connect - Let's Create your account</p>
        <hr />
      </div>

      {/* signup data */}
      <div className='w-[100%] mt-6'>

        {/* name input box */}
        <div className='flex flex-col w-[100%] '>
          <label htmlFor="name" className='text-s font-normal'> Full Name</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            type="text"
            id='name'
            name='name'
            placeholder='Full Name'
            className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
        </div>


        {/* email input box */}
        <div className='flex flex-col w-[100%] mt-4'>
          <label htmlFor="signUpEmail" className='text-s font-normal'> Email </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            type="email"
            id='signUpEmail'
            name='email'
            placeholder='Email' className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
        </div>

        {/* phone input box */}
        <div className='flex flex-col w-[100%] mt-4'>
          <label htmlFor="phone" className='text-s font-normal'> Phone Number</label>
          <input
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            required
            type="number"
            id='phone'
            name='phone'
            placeholder='Phone Number'
            className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
        </div>
        

        {/* password input box */}
        <div className='flex flex-col mt-4'>
          <label htmlFor="signUpPassword" className='text-s font-normal'> Password </label>
          <div className='w-full relative flex items-center'>
            <input
              value={password}
              onChange={(e) => { setPassword(e.target.value); }}
              required
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              placeholder='Password'
              className='h-[42px] w-full border-[1px] border-gray-300 p-2 rounded-xl
                      focus:outline-none focus:border-green-900'/>
            <div className='absolute right-3 '>
              {showPassword ? <BiHide className='text-2xl' onClick={() => { setShowPassword(!showPassword) }} /> : <BiShow className='text-2xl' onClick={() => { setShowPassword(!showPassword) }} />}
            </div>
          </div>
        </div>


        {/* signup button */}
        <button type='submit' className='mt-8 bg-green-950 text-white p-2 w-[100%] rounded-xl font-normal' onClick={submitHandler}>Sign Up</button>
        <p className='text-center mt-3'>Already have an account?
          <span
            onClick={() => {
              props.loginStatus();
            }}
            className='text-green-900 cursor-pointer' > Log In</span>
        </p>
      </div>
    </form>
  )
}
