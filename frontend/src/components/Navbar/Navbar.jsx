import React, { useState, useEffect } from 'react';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // fetch the logged in user data from the firebase

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                        setRole(userDoc.data().role);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // check if the link is active then it will give this style that element which is active

    const isActiveLink = (path) => {
        return location.pathname === path
            ? 'text-[#131417] transition duration-1 border-black border-b-[3px] px-3 py-2'
            : 'text-[#6F757A]';
    };

    // when user click on logout then it will run

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.info("Logged out successfully!", { position: "top-right" });
            navigate("/login");
        } catch (error) {
            toast.error("Logout failed! " + error.message, { position: "top-right" });
        }
    };

    return (
        <div className='relative z-50'>
            <div className='h-[68px] flex justify-between items-center p-4 bg-[#F8F5F1] text-[#131417] fixed top-0 right-0 w-full border-b border-gray-400'>
                <div className='flex items-center gap-3'>
                    {isOpen ? <RxCross2 className='md:hidden cursor-pointer text-2xl' onClick={() => setIsOpen(false)} />
                        : <RxHamburgerMenu className='md:hidden cursor-pointer text-2xl' onClick={() => setIsOpen(true)} />}
                    <Link to="/" className='text-2xl font-bold'>Ment-Connect</Link>
                </div>

                <div className='flex items-center gap-7'>
                    {/* Desktop view Menu */}
                    <ul className='hidden md:flex gap-4 lg:gap-8 text-l'>
                        <li><Link to="/" className={`font-[400] ${isActiveLink('/')}`}>Home</Link></li>
                        <li><Link to="/goals" className={`font-[400] ${isActiveLink('/goals')}`}>Goals</Link></li>
                        {role === "mentor" && null}
                        {role === "student" && <li><Link to="/mentors" className={`font-[400] ${isActiveLink('/mentors')}`}>Mentors</Link></li>}
                        {user && (
                            <>
                                <li><Link to="/message" className={`font-[400] ${isActiveLink('/message')}`}>Message</Link></li>
                                <li><Link to="/profile" className={`font-[400] ${isActiveLink('/profile')}`}>Profile</Link></li>
                                <li><button onClick={handleLogout} className="font-[400] text-red-500">Logout</button></li>
                            </>
                        )}
                        {!user && <li><Link to="/login" className={`font-[400] ${isActiveLink('/login')}`}>Login</Link></li>}
                    </ul>

                    {/* Mobile view Menu */}
                    {isOpen && (
                        <ul className='md:hidden absolute top-16 left-0 w-full bg-[#F8F5F1] shadow-md py-2 px-4 z-50 border-black-400 flex flex-col  justify-center items-center'>
                            <li className='py-2'><Link to="/" onClick={() => setIsOpen(false)} className={isActiveLink('/')}>Home</Link></li>
                            <li className='py-2'><Link to="/goals" onClick={() => setIsOpen(false)} className={isActiveLink('/goals')}>Goals</Link></li>
                            {role === "mentor" && null}
                            {role === "student" && <li className='py-2'><Link to="/mentors" onClick={() => setIsOpen(false)} className={isActiveLink('/mentors')}>Mentors</Link></li>}
                            {user && (
                                <>
                                    <li className='py-2'><Link to="/message" onClick={() => setIsOpen(false)} className={isActiveLink('/message')}>Message</Link></li>
                                    <li className='py-2'><Link to="/profile" onClick={() => setIsOpen(false)} className={isActiveLink('/profile')}>Profile</Link></li>
                                    <li className='py-2 pb-6'><button onClick={() => { setIsOpen(false); handleLogout(); }} className="font-[400] text-red-500">Logout</button></li>
                                </>
                            )}
                            {!user && <li className='py-2'><Link to="/login" onClick={() => setIsOpen(false)} className={isActiveLink('/login')}>Login</Link></li>}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
