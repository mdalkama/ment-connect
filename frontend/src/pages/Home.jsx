import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from 'react-icons/io';


export default function Home() {

  const [openProfile, setOpenProfile] = useState(false);
  const [scroll, setScroll] = useState(true);

  const scrollToggle = () => {
    setScroll(!scroll);
  };

  const openProfileToggle = () => {
    setOpenProfile(!openProfile);
  }

  { scroll ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden" }

  const isActiveLink = (path) => {
    return location.pathname === path ? 'text-[black] bg-[#F5DEB3] rounded-md px-3 py-2' : 'text-[black]';
  };

  return (
    <>
      {/* <div className='pt-[68px] flex h-[100vh] flex-col items-center justify-center'>
        <div className='bg-cover bg-center w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-[url("https://images.unsplash.com/photo-1630332457231-3f276a81a0a2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
          <p className='text-[7vw] text-center text-white leading-[1] font-bold'>Every student deserves a <br /> champion.</p>
          <button className='mt-8 bg-[#F4CB41] text-black px-8 py-4 rounded-lg font-bold md:h-[80px] md:text-[1.5rem] flex justify-center items-center' ><Link to="/mentors" className={isActiveLink('/mentors')}>Search for Mentor</Link></button>
        </div>
      </div> */}

      <div className='min-h-[100vh] pt-[68px] bg-white'>
        <div className='p-6'>
          <div className='flex justify-between'>
            <h1 className='md:text-3xl text-2xl font-bold'>My Goals</h1>
            <button onClick={() => {
              openProfileToggle()
              scrollToggle()
            }} className='bg-black text-white sm:px-4 sm:py-3 px-2 py-1 flex items-center gap-2 md:rounded-lg rounded sm:font-medium text-sm md:text-xl'>Add a goal <span><FaPlus /></span></button>
          </div>
          <div className='flex justify-between items-center mt-10 '>
            <h3 className='sm:text-2xl text-lg font-medium'>Daily progress bar</h3>
            <p className='sm:font-bold font-semibold text-xs sm:text-sm'> 50 out of 100</p>
          </div>
          <div className='sm:h-8 h-6 w-full bg-gray-200 mt-2 rounded-full'>
            <div className='h-full w-[50%] bg-black rounded-full'></div>
          </div>
          <div className='flex justify-center'>
            <div className='mt-10 grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 p-4 grid-cols-1 gap-4'>

              <div className='shadow-lg bg-zinc-100 flex flex-col p-4 sm:min-w-[250px] md:min-w-[230px] max-sm:w-[300px] lg:min-w-[250px] overflow-auto rounded-lg'>
                <h3 className='font-semibold text-xl'>complete js project</h3>
                <p className='font-semibold text-md'>Status: <span className='text-sm text-red-600'>Pending</span></p>
                <p className='font-semibold'>Description: <span className='font-normal text-sm56r5tr'>octetur sequi fuint quae dolore architecto itaque quia! repudiandae.</span></p>
                <div className='flex justify-end mt-4 gap-6'>
                  <button className='bg-red-500 text-white font-semibold text-sm md:px-2 md:py-2 px-3 py-2 rounded'>Delete Goal</button>
                  <button className='bg-green-500 text-white font-semibold text-sm md:px-2 md:py-2 px-3 py-2 rounded'>Edit Goal</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {openProfile
        ?
        <div className='w-full h-[100vh] fixed top-0 left-0 bg-[#0000005a] flex justify-center items-center z-[100]'>
          <div className='bg-white w-full md:w-[50%] md:h-[90%] rounded overflow-hidden relative'>
          <button className=' absolute top-0 right-0 h-[65px] w-[65px] rounded-tr-xl text-3xl flex justify-center items-center' onClick={() => {
              scrollToggle();
              openProfileToggle();
            }}><IoMdClose />
            </button>
            <h3 className='text-center py-4 text-xl font-bold border-b-2'>Add goals</h3>
            <div className='w-full flex flex-col items-center'>
              
              <form
                className='my-4 md:flex flex-col items-center justify-start grow h-[100%] w-[90%]'
              >
                {/* name input box */}
                <div className='flex flex-col w-[100%] '>
                  <label htmlFor="name" className='text-sm font-normal'> Task Title</label>
                  <input
                    required
                    type="text"
                    id='name'
                    name='name'
                    placeholder='Task title'
                    className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
                </div>


                {/* email input box */}
                <div className='flex flex-col w-[100%] mt-4'>
                  <h3 className='text-sm font-normal'> Task Description </h3>
                  <textarea rows="4" cols="50" placeholder='Task Description' className='border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'></textarea>
                </div>

                <div className='flex flex-col w-[100%] mt-4'>
                  <label htmlFor="name" className='text-sm font-normal'> Date</label>
                  <input
                    required
                    type="date"
                    id='name'
                    name='name'
                    className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
                </div>

                {/* save button */}
                <button type='submit' className='mt-8 bg-[#0468BF] text-white p-2 w-[100%] rounded-xl font-normal'>Save Changes</button>
              </form>
            </div>
          </div>
        </div>
        :
        null
      }


    </>
  )
}







{/* <div className='pt-[68px] flex justify-center mt-5 bg-[#111] text-white h-[100vh]'>
        <div className='w-[90%] bg-[#1c1c1c] h-[50%]'>
          <h1 className='text-center py-2'>Create Task</h1>
          <div className='w-[40%] px-6'>
            <div className='flex flex-col'>
              <h3 className='text-sm text-gray-300 mb-2'> Task Title</h3>
              <input className='w-[80%] text-sm py-1 px-2 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='Task Title' />
            </div>
            <div>
              <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
              <input
                className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="date" />
            </div>
          </div>
        </div>
      </div> */}