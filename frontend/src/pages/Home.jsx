import React from 'react'
import { Link, useLocation } from 'react-router-dom';


function Home() {

  const isActiveLink = (path) => {
    return location.pathname === path ? 'text-[black] bg-[#F5DEB3] rounded-md px-3 py-2' : 'text-[black]';
  };

  return (
    <>
      <div className='pt-[68px] flex h-[100vh] flex-col items-center justify-center'>
        <div className='bg-cover bg-center w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-[url("https://images.unsplash.com/photo-1630332457231-3f276a81a0a2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
        <p className='text-[7vw] text-center text-white leading-[1] font-bold'>Every student deserves a <br /> champion.</p>
        <button className='mt-8 bg-[#F4CB41] text-black px-8 py-4 rounded-lg font-bold md:h-[80px] md:text-[1.5rem] flex justify-center items-center' ><Link to="/mentors" className={isActiveLink('/mentors')}>Search for Mentor</Link></button>
        </div>
      </div>
    </>
  )
}

export default Home