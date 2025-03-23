import React, { useState } from 'react'
// import { LuUser2 } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [showAccountMenu, setShowAccountMenu] = useState(false);
  const location = useLocation();
  const role = "student"; // This should be dynamically set based on user role
  const [user, setUser ] = useState(1); // This should be dynamically set based on user authentication
  const isActiveLink = (path) => {
    return location.pathname === path ? 'text-[#131417] bg-[#F6F6F6] rounded-md px-3 py-2' : 'text-[#6F757A]';
  };

const handleLogout = async () => {
    try {
        const response = await fetch("http://127.0.0.1:5000/logout", {
            method: "POST",  // Correct method
            credentials: "include",  // Ensures session cookies are sent
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message); // Show success message
            // Redirect user to login or update UI
        } else {
            alert(data.error); // Show error message
        }
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative z-50'>
      <div className='h-[68px] flex justify-between items-center p-4 bg-[#ffffff] text-[#131417] fixed top-0 right-0 z-99 w-full border-b border-gray-400'>
        <div className='flex items-center gap-3'>
          {isOpen ? <RxCross2 className='md:hidden cursor-pointer text-2xl' onClick={toggleMenu} /> : <RxHamburgerMenu className='md:hidden cursor-pointer text-2xl' onClick={toggleMenu} />}
          <Link to="/" className='text-2xl font-[400]'>Ment Connect</Link>
        </div>
        <div className='flex items-center gap-7'>
          {/* Desktop Menu */}
          <ul className='hidden md:flex gap-4 lg:gap-8 text-l'>
            <li><Link to="/" className={`font-[400] ${isActiveLink('/')}`}>Home</Link></li>
            {
            role === "mentor" ?
            <li><Link to="/mentees" className={`font-[400] ${isActiveLink('/mentees')}`}>Mentees</Link></li> 
            :
            role === "student" ? <li><Link to="/mentors" className={`font-[400] ${isActiveLink('/about')}`}>Mentors</Link></li>
            : null}
            <li><Link to="/message" className={`font-[400] ${isActiveLink('/message')}`}>Message</Link></li>
            <li><Link to="/contact" className={`font-[400] ${isActiveLink('/contact')}`}>Contact</Link></li>
            {
              user 
              ?
              <li><Link to="/profile" className={`font-[400] ${isActiveLink('/profile')}`}>Profile</Link></li>
              :
              <li><Link to="/login" className={`font-[400] ${isActiveLink('/login')}`}>Login</Link></li>
            }
            {
              user
              ? <li><Link to="/logout" onClick = { handleLogout}  className={`font-[400] ${isActiveLink('/logout')}`}>Logout</Link></li>
              : null
            }
          </ul>

          {/* Mobile Menu */}
          {isOpen && (
            <ul className='md:hidden absolute top-16 text-center left-0 w-full bg-[#ffffff] shadow-md py-2 px-4 z-50 border-black-400'>
              <li className='py-2 font-[400] text-ll pt-5'><Link to="/" onClick={toggleMenu} className={isActiveLink('/')}>Home</Link></li>
              {role === "mentor" ?
              <li className='py-2 font-[400] text-l pt-5'><Link to="/mentees" onClick={toggleMenu} className={isActiveLink('/mentees')}>Mentees</Link></li> 
              :
              role === "student" ? <li className='py-2 font-[400] text-l pt-5'><Link to="/mentors" onClick={toggleMenu} className={isActiveLink('/mentors')}>Mentors</Link></li>
              : null
              }
              <li className='py-2 font-[400] text-l pt-5'><Link to="/message" onClick={toggleMenu} className={isActiveLink('/message')}>Message</Link></li>
              <li className='py-2 font-[400] text-l pt-5'><Link to="/contact" onClick={toggleMenu} className={isActiveLink('/contact')}>Contact</Link></li>
              {
              user 
              ?
              <li className='py-2 font-[400] text-l pt-5'><Link to="/profile" onClick={toggleMenu} className={isActiveLink('/profile')}>Profile</Link></li>
              :
              <li className='py-2 font-[400] text-l pt-5'><Link to="/login" onClick={toggleMenu} className={isActiveLink('/login')}>Login</Link></li>
            }
            {
              user
              ? 
              <li className='py-2 pb-6 font-[400] text-l pt-5'><Link to="/login" onClick={()=>{toggleMenu(); handleLogout()}} className={isActiveLink('/login')}>Logout</Link></li> 
              : null
            }

            </ul>
          )}
        {/* Account Menu */}
        {/* <div className="relative"
            onMouseEnter={() => setShowAccountMenu(true)}
            onMouseLeave={() => setShowAccountMenu(false)}>
          <Link to="/login">
            <LuUser2 className='text-2xl hover:text-gray-600 transition-colors' />
          </Link>
        
          <div className={`absolute right-0 w-48 bg-[#FBFBFB] shadow-lg rounded-md py-2 transform transition-all duration-300 ease-in-out ${
            showAccountMenu ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}>
            <Link to="/profile" className="block px-4 py-2 text-[#131417]">Profile</Link>
            <hr className="my-2 border-gray-300" />
            <Link to="/logout" className="block px-4 py-2 text-red-700">Logout</Link>
        </div>
        </div> */}

        
        </div>
      </div>
      
    </div>
  )
}

export default Navbar