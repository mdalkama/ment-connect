import React, { useState } from 'react';
import { BiShow, BiHide } from "react-icons/bi";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";  // Import Firestore
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mentor');
  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        userid: user.uid,
        name: name,
        email: email,
        phone: phone,
        role: role,
        verified: false,
        profile: "",
        location: "",
        gender: "",
        age: "",
        domain: "",
        education: {
          name: "",
          degree: "",
          field: "",
          startYear: "",
          endYear: "",
          location: ""
        },
        skills: [],
        dayTask: [],
        monthTask: [],
        connections: [],
        chats: []
      });
      await setDoc(doc(db, "userChats", user.uid), {})

      toast.success("Sign up successful!", { position: "top-right" });

      // 🚀 Sign out the user immediately after signup
      await signOut(auth);

      // Redirect to login page
      navigate("/login");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("mentor");
      props.loginStatus();

    } catch (error) {
      toast.error("Sign up failed!", { position: "top-right" });
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className='mt-[20px] md:flex flex-col items-center justify-center grow h-[100%] min-w-[300px] max-w-[60%]'>

      <div className='w-[100%]'>
        <p className='font-bold text-xl'>Get Started</p>
        <p className='mb-6 text-gray-500'>Welcome to MentorConnect - Let's Create your account</p>
        <hr />
      </div>

      <div className='w-[100%] mt-6'>

        {/* Mentor Mentee select */}
        <div className='flex flex-col w-[100%]'>
          <label htmlFor="role" className='text-s font-normal'> Select Role</label>
          <select
            className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'
            name="role"
            id="role"
            value={role} // Controlled input
            onChange={(e) => setRole(e.target.value)} // Fixed onChange
          >
            <option value="mentor">Mentor</option>
            <option value="student">Student</option>
          </select>
        </div>

        {/* Name input */}
        <div className='flex flex-col w-[100%] mt-4'>
          <label htmlFor="name" className='text-s font-normal'> Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            type="text"
            id='name'
            name='name'
            placeholder='Full Name'
            className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
        </div>

        {/* Email input */}
        <div className='flex flex-col w-[100%] mt-4'>
          <label htmlFor="signUpEmail" className='text-s font-normal'> Email </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            id='signUpEmail'
            name='email'
            placeholder='Email'
            className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
        </div>

        {/* Phone input */}
        <div className='flex flex-col w-[100%] mt-4'>
          <label htmlFor="phone" className='text-s font-normal'> Phone Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            type="number"
            id='phone'
            name='phone'
            placeholder='Phone Number'
            className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
        </div>

        {/* Password input */}
        <div className='flex flex-col mt-4'>
          <label htmlFor="password" className='text-s font-normal'> Password </label>
          <div className='w-full relative flex items-center'>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              placeholder='Password'
              className='h-[42px] w-full border-[1px] border-gray-300 p-2 rounded-xl
                      focus:outline-none focus:border-green-900'/>
            <div className='absolute right-3 '>
              {showPassword ?
                <BiHide className='text-2xl cursor-pointer' onClick={() => setShowPassword(!showPassword)} /> :
                <BiShow className='text-2xl cursor-pointer' onClick={() => setShowPassword(!showPassword)} />}
            </div>
          </div>
        </div>

        {/* Signup button */}
        <button type='submit' className='mt-8 bg-green-950 text-white p-2 w-[100%] rounded-xl font-normal'>Sign Up</button>

        <p className='text-center mt-3'>Already have an account?
          <span onClick={() => props.loginStatus()} className='text-green-900 cursor-pointer'> Log In</span>
        </p>
      </div>

    </form>
  );
}
