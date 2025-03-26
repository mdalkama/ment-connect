import React, { useState, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io';
import { collection, doc, query, where, getDoc, getDocs, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";


export default function Mentors() {

    const [user, setUser] = useState({})
    const [userData, setUserData] = useState(null);
    const [mentor, setMentor] = useState({});
    const [mentors, setMentors] = useState([]);
    const [openProfile, setOpenProfile] = useState(false);
    const [scroll, setScroll] = useState(true);
    const [showProfile, setShowProfile] = useState({});
    const navigate = useNavigate();



    useEffect(() => {
    }, [mentors]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                    if (userDoc.exists()) {
                        setUser(userDoc.data());
                        console.log("User data:", userDoc.data());
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const q = query(collection(db, "users"), where("role", "==", "mentor")); // 🔹 Query mentors
                const querySnapshot = await getDocs(q);

                const mentorList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMentors(mentorList);
            } catch (error) {
                console.error("Error fetching mentors:", error);
            }
        };

        fetchMentors();
    }, []);



    const scrollToggle = () => {
        setScroll(!scroll);
    };

    const openProfileToggle = () => {
        setOpenProfile(!openProfile);
    }
    const showProfileUpdate = (user) => {
        setShowProfile(user);
    }



    const handleSelectChat = async () => {
        if (!user || !user.userid || !showProfile || !showProfile.userid) {
            console.error("User or Mentor data is missing!");
            return;
        }

        const combinedId = user.userid > showProfile.userid
            ? user.userid + showProfile.userid
            : showProfile.userid + user.userid;

        try {
            const chatRef = doc(db, "chats", combinedId);
            const chatSnap = await getDoc(chatRef);

            if (!chatSnap.exists()) {
                // Create new chat document
                await setDoc(chatRef, { messages: [] });

                // Ensure userChats exist before updating
                await setDoc(doc(db, "userChats", user.userid), {}, { merge: true });
                await setDoc(doc(db, "userChats", showProfile.userid), {}, { merge: true });

                // Update userChats for both users
                await updateDoc(doc(db, "userChats", user.userid), {
                    [combinedId + ".userInfo"]: {
                        userid: showProfile.userid,
                        name: showProfile.name || "Unknown",
                        profile: showProfile.profile || "",
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", showProfile.userid), {
                    [combinedId + ".userInfo"]: {
                        userid: user.userid,
                        name: user.name || "Unknown",
                        profile: user.profile || "",
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) {
            console.error("Error creating chat:", err);
        }
    };




    { scroll ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden" }


    return (
        <>

            <div id='about' className='min-h-[100vh] pt-[68px] px-4 w-[100%] grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2  grid-cols-1  bg-[#f5f8f1]'>
                {mentors.map((user, index) => (
                    <Mentor
                        key={index}
                        user={user}
                        setMentor={setMentor}  // Ensure this is passed
                        handleSelectChat={handleSelectChat}
                        openProfileToggle={openProfileToggle}
                        scrollToggle={scrollToggle}
                        showProfileUpdate={showProfileUpdate}
                    />
                ))}


            </div>
            {openProfile
                ?
                <Profile navigate={navigate} setMentor={setMentor} handleSelectChat={handleSelectChat} showProfile={showProfile} openProfileToggle={openProfileToggle} scrollToggle={scrollToggle} />
                :
                null
            }

        </>
    )
}


function Mentor(props) {
    return (
        <div key={props.index} className='py-4 px-2 h-fit flex justify-center'>
            <div className="bg-white  rounded-2xl shadow-md md:min-w-[230px] lg:min-w-[280px] w-[320px] p-6  flex flex-col items-center ">
                {props.user.profile
                    ?
                    <div style={{ backgroundImage: `url(${props.user.profile})` }} className="w-28 h-28 bg-cover bg-center rounded-full overflow-hidden mb-4">
                    </div>
                    :
                    <div style={{ backgroundImage: `url(https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png)` }} className="w-28 h-28 bg-cover bg-center rounded-full overflow-hidden mb-4">
                    </div>
                }
                <h2 className="text-xl font-bold">{props.user.name}</h2>
                <p className="text-gray-600 font-light text-sm text-center mb-6">{props.user.email}</p>
                <h3 className='text-center mb-4 font-semibold text-lg '>{props.user.domain}</h3>
                <div className='flex sm:gap-4 md:gap-2 lg:gap-6 gap-8 w-[100%]'>
                    <button onClick={() => {
                        props.openProfileToggle()
                        props.scrollToggle()
                        props.showProfileUpdate(props.user)
                    }} className='bg-[#152340] w-[100%] text-white px-3 py-2 rounded text-sm'>See profile</button>
                </div>
            </div>
        </div>
    )
}


function Profile(props) {
    const education = props.showProfile.education;
    const user = props.showProfile;
    const skills = Object.values(user.skills);
    return (
        <div key={user.id} className='w-full h-[100vh] fixed top-0 left-0 bg-[#0000005a] flex justify-center items-center z-[100]'>
            <div className='w-full  md:w-[80%] z-[120] bg-white absolute md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-xl border-[1px] border-[#5d5d5d] flex flex-col justify-start items-center shadow-lg'>
                <button className=' absolute top-0 right-0 h-[65px] w-[65px] rounded-tr-xl text-3xl flex justify-center items-center' onClick={() => {
                    props.scrollToggle();
                    props.openProfileToggle();
                }}><IoMdClose />
                </button>
                <div className='overflow-y-auto p-4 w-full h-[100vh] md:h-[90vh] flex flex-col items-center justify-start'>
                    <div id="profile-main" className='px-4 flex flex-col md:flex-row md:h-[200px] w-full md:w-[90%] justify-between items-center'>
                        <div id='profile-and-info' className='flex md:h-full md:flex-row w-full gap-4 md:gap-6 items-center'>
                            {user.profile
                                ?
                                <div style={{ backgroundImage: `url(${user.profile})` }} id="profie-photo" className='md:h-[150px] shrink-0 md:w-[150px] h-28 w-28 rounded-full bg-cover bg-center'>
                                </div>
                                :
                                <div style={{ backgroundImage: `url(https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png)` }} id="profie-photo" className='md:h-[150px] shrink-0 md:w-[150px] h-28 w-28 rounded-full bg-cover bg-center'>
                                </div>
                            }

                            <div id='name-and-email' className='flex flex-col md:items-start'>
                                <p className='font-bold text-xl md:text-2xl'>{user.name}</p>
                                <p className='text-gray-600 font-medium text-sm md:text-lg'>{user.email}</p>
                            </div>
                        </div>
                        <div className='w-full md:w-[150px] flex justify-center items-center'>
                            <button onClick={() => {
                                props.setMentor(user); // Set mentor state first
                                setTimeout(() => props.handleSelectChat(), 0); // Ensure state update before function call
                                props.navigate("/message");
                            }} className=' h-[50px] w-full md:w-[150px] rounded-md mt-4 md:mt-0 font-semibold bg-[#04AA6D] text-white'>Send Message</button>
                        </div>


                    </div>


                    <div className='mt-10 px-2 md:px-4 w-[100%] md:w-[90%] gap-1 md:gap-4 rounded-md md:rounded-lg bg-[white] border-[1px] border-[#5d5d5d] flex flex-col justify-start items-center'>
                        <h3 className='font-semibold py-2 md:py-2 md:font-bold text-2xl w-full text-center border-b-[1px] border-black'>User Info</h3>
                        <div className='pl-4 md:pl-4 w-full gap-2 py-4 rounded-lg  bg-[white] flex flex-col justify-start items-start'>
                            <p className='font-bold text-sm md:text-xl'>Role: {user.role}</p>
                            <p className='font-semibold text-sm md:text-lg'>Location: {user.location}</p>
                            <p className='font-semibold text-sm md:text-lg'>gender: {user.gender}</p>
                        </div>

                    </div>

                    <div className='mt-10 px-2 md:px-4 w-[100%] md:w-[90%] gap-1 md:gap-4 rounded-md md:rounded-lg bg-[white] border-[1px] border-[#5d5d5d] flex flex-col justify-start items-center'>
                        <h3 className='font-semibold py-2 md:py-2 md:font-bold text-2xl w-full text-center border-b-[1px] border-black'>Education</h3>
                        {
                            education ?
                                <div className='pl-2 md:pl-4 w-full gap-4 py-8 rounded-lg  bg-[white] flex justify-start items-center'>
                                    <div className='h-[50px] w-[50px] sm:h-[80px] shrink-0 sm:w-[80px] md:h-[150px] md:w-[150px] bg-[url(https://cdn-icons-png.freepik.com/256/4981/4981453.png?semt=ais_hybrid)] bg-cover bg-center '></div>
                                    <div>
                                        <p className='font-bold text-sm md:text-xl'>{education.name}</p>
                                        <p className='font-semibold text-xs md:text-lg'> {education.degree} - {education.field}</p>
                                        <p className='font-semibold text-sm md:text-lg'>{education.startYear} - {education.endYear}</p>
                                        <p className='font-semibold text-sm md:text-lg text-[#616161]'>{education.location}</p>
                                    </div>
                                </div>

                                :
                                <div className='pb-6 pt-2 md:text-lg md:font-bold text-red-500'>
                                    <p>No Education added</p>
                                </div>
                        }
                    </div>

                    <div className='mt-10 px-2 md:px-4 w-[100%] md:w-[90%] gap-1 md:gap-4 rounded-md md:rounded-lg bg-[white] border-[1px] border-[#5d5d5d] flex flex-col justify-start items-center'>
                        <h3 className='font-semibold py-2 md:py-2 md:font-bold text-2xl w-full text-center border-b-[1px] border-black'>Skills</h3>
                        {
                            skills.length > 0
                                ?
                                <div className='px-2 md:px-4 w-full gap-4 py-8 rounded-lg  bg-[white] flex justify-start items-center flex-wrap'>
                                    {
                                        skills.map((skills) => {

                                            return (
                                                <p className='h-[40px] bg-[#0B65C2] p-2 text-white rounded-lg'>{skills}</p>
                                            )
                                        })
                                    }
                                </div>

                                :
                                <div className='pb-6 pt-2 md:text-lg md:font-bold text-red-500'>
                                    <p>No skills added</p>
                                </div>
                        }
                    </div>
                </div>



            </div>


        </div >
    )
}