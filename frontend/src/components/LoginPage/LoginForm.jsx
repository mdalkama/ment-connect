import React, { useState } from 'react';
import { BiShow, BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function LoginForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      // Store user data in localStorage or React Context
      localStorage.setItem("userData", JSON.stringify(userData));
      toast.success("Logged in successfully!", { position: "top-right" });
      navigate("/profile"); // Redirect user
    } else {
      console.log("User data not found in Firestore");
    }
  } catch (error) {
    setError(error.message);
    toast.error("Login failed! ", { position: "top-right" });
  }
};

  return (
    <form onSubmit={handleLogin} className='flex flex-col items-center justify-center grow h-[100%] min-w-[300px] max-w-[60%]'>

      {/* Login Page Heading */}
      <div className='w-[100%]'>
        <p className='font-bold text-xl'>Get Started Now</p>
        <p className='mb-6 text-gray-500'>Welcome to Mentor Connect - Let's log in to your account</p>
        <hr />
      </div>

      {/* Login Fields */}
      <div className='w-[100%] mt-6'>

        {/* Email Input */}
        <div className='flex flex-col w-[100%]'>
          <label htmlFor="loginEmail" className='text-s font-normal'>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            id='email'
            name='email'
            placeholder='Email'
            className='border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'
          />
        </div>

        {/* Password Input */}
        <div className='flex flex-col mt-4'>
          <label htmlFor="password" className='text-s font-normal'>Password</label>
          <div className='w-full relative flex items-center'>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              placeholder='Password'
              className='h-[42px] w-full border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'
            />
            <div className='absolute right-3'>
              {showPassword ? <BiHide className='text-2xl cursor-pointer' onClick={() => setShowPassword(!showPassword)} /> : <BiShow className='text-2xl cursor-pointer' onClick={() => setShowPassword(!showPassword)} />}
            </div>
          </div>
        </div>

        {/* Login Button */}
        <button type='submit' className='mt-8 bg-green-950 text-white p-2 w-[100%] rounded-xl font-normal'>Log in</button>

        {/* Signup Redirect */}
        <p className='text-center mt-3'>Don't have an account?
          <span onClick={props.loginStatus} className='text-green-900 cursor-pointer'> Sign Up</span>
        </p>
      </div>
    </form>
  );
}
