import React, { useState, useEffect, useMemo } from 'react'
import { IoMdClose } from 'react-icons/io';
import { collection, doc, query, where, getDoc, getDocs, setDoc, updateDoc, serverTimestamp, arrayUnion, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Mentors() {

    const [user, setUser] = useState({})
    const [userData, setUserData] = useState(null);
    const [mentor, setMentor] = useState({});
    const [currentMentorSelected, setCurrentMentorSelected] = useState(null);
    const [mentors, setMentors] = useState([]);
    const [openProfile, setOpenProfile] = useState(false);
    const [scroll, setScroll] = useState(true);
    const [showProfile, setShowProfile] = useState({});
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState([]);
    const [isOpenFeedback, setIsOpenFeedback] = useState(false);
    const [searchMentor, setSearchMentor] = useState("");
    const [filterMentors, setFilterMentors] = useState([]);

    const openFeedbackToggle = () => {
        setIsOpenFeedback(!isOpenFeedback);
    }

    useEffect(() => {
        if (!user || !user.userid) return;

        const unsub = onSnapshot(doc(db, "feedbacks", showProfile.userid), (docSnap) => {
            if (docSnap.exists()) {
                setFeedbacks(docSnap.data());
            } else {
                console.warn("No feedback data found.");
                setFeedbacks([]);
            }
        });

        return () => unsub();
    }, [showProfile]);
    useEffect(() => {
    }, [mentors]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                    if (userDoc.exists()) {
                        setUser(userDoc.data());
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
    // fetch user from database if user role will be mentor
    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const q = query(collection(db, "users"), where("role", "==", "mentor"));
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

    function filteredMentors() {
        return useMemo(
            () => mentors.filter((mentor) => (searchMentor ? mentor.domain == searchMentor : true)),
            [mentors, searchMentor]
        );
    }

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

                // confirms userChats exist before updating
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


    const handleSendFeedback = async (feedback) => {
        if (!showProfile.userid) {
            console.error("Mentor ID or Feedback Data is missing!");
            return;
        }

        try {
            const feedbackRef = doc(db, "feedbacks", currentMentorSelected);

            // Update or create feedback document
            await setDoc(
                feedbackRef,
                {
                    feedback: arrayUnion({
                        id: uuid(),
                        senderId: user.userid,
                        name: user.name,
                        feedbackText: feedback,
                        profile: user.profile,
                    })
                },
                { merge: true } // Ensures it doesn't overwrite existing feedbacks
            );

            console.log("Feedback successfully stored!");
        } catch (err) {
            console.error("Error storing feedback:", err);
        }
    };




    { scroll ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden" }


    return (
        <>
            <div className=' bg-[#F8F5F1] mt-[68px] h-[80px] w-full'>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        console.log("All mentors:", mentors);

                        if (mentors.length === 0) {
                            console.warn("Mentors data not loaded yet.");
                            return;
                        }

                        // Normalize both values for an exact match
                        const mentorFiltered = mentors.filter((mentor) =>
                            mentor.domain?.toLowerCase().trim() === searchMentor.toLowerCase().trim()
                        );
                        setFilterMentors(mentorFiltered);

                        console.log("Filtered Mentors:", mentorFiltered);
                    }}
                    className='my-8 flex flex-row items-center  justify-center grow h-[100%] w-full'
                >
                    <div className='flex justify-center items-center'>
                        <select
                            id="role"
                            value={searchMentor}
                            onChange={(e) => setSearchMentor(e.target.value)}
                            className="border p-2 rounded-md w-full"
                        >
                            <option value="">Select a Role</option>
                            <option value="MERN Stack Developer">MERN Stack Developer</option>
                            <option value="Blockchain Developer">Blockchain Developer</option>
                            <option value="Product Manager">Product Manager</option>
                            <option value="Event Organizer">Event Organizer</option>
                            <option value="Android Developer">Android Developer</option>
                            <option value="React Developer">React Developer</option>
                        </select>
                    </div>

                    {/* Search button */}
                    <div className=' md: mb-6 flex justify-center w-[250px] h-[80px]'>
                        <button type='submit' className='mt-8 bg-green-950 text-white p-2 w-[200px] h-[45px] rounded-xl font-normal'>
                            Search Mentor
                        </button>
                    </div>
                </form>
            </div>

            {/* Show mentors section only if filterMentors has data */}
            {filterMentors?.length > 0 && (
                <div id='about' className='min-h-[100vh] px-4 w-[100%] grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 bg-[#f5f8f1]'>
                    {filterMentors.map((user, index) => (
                        <Mentor
                            key={index}
                            user={user}
                            setMentor={setMentor}
                            handleSelectChat={handleSelectChat}
                            openProfileToggle={openProfileToggle}
                            scrollToggle={scrollToggle}
                            showProfileUpdate={showProfileUpdate}
                        />
                    ))}
                </div>
            )}


            <div id='about' className='min-h-[100vh]  px-4 w-[100%] grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2  grid-cols-1  bg-[#f5f8f1]'>
                {mentors.map((user, index) => (
                    <Mentor
                        key={index}
                        user={user}
                        setMentor={setMentor}
                        handleSelectChat={handleSelectChat}
                        openProfileToggle={openProfileToggle}
                        scrollToggle={scrollToggle}
                        showProfileUpdate={showProfileUpdate}
                    />
                ))}


            </div>
            {openProfile
                ?
                <Profile feedbacks={feedbacks} navigate={navigate} setCurrentMentorSelected={setCurrentMentorSelected} setMentor={setMentor} openFeedbackToggle={openFeedbackToggle} handleSendFeedback={handleSendFeedback} handleSelectChat={handleSelectChat} showProfile={showProfile} openProfileToggle={openProfileToggle} scrollToggle={scrollToggle} />
                :
                null
            }
            {isOpenFeedback ? <FeedbackAdd mentor={showProfile.userid} openFeedbackToggle={openFeedbackToggle} handleSendFeedback={handleSendFeedback} /> : null}
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
                <div className='w-full flex gap-2 justify-center items-center'>
                    <h2 className="text-xl font-bold">{props.user.name}</h2>
                    {props.user.verified ? <img className="h-[25px] w-[25px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/1200px-Twitter_Verified_Badge.svg.png" alt="" />
                        : null}
                </div>
                {!props.user.verified ? <p className='w-full text-center font-light text-sm text-red-500'>User Not Verified</p>
                    : null}
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
                        <div className='w-full md:w-[150px] flex flex-col gap-2 justify-center items-center'>
                            <button onClick={() => {
                                props.setMentor(user);
                                setTimeout(() => props.handleSelectChat(), 0);
                                props.navigate("/message");
                            }} className=' h-[50px] w-full md:w-[150px] rounded-md mt-4 md:mt-0 font-semibold bg-[#04AA6D] text-white'>Send Message</button>
                            <button onClick={() => {
                                props.setCurrentMentorSelected(user.userid)
                                props.openFeedbackToggle();
                            }} className='h-[30px] p-2 rounded-lg bg-[#0b67c25a] whitespace-nowrap
                                flex justify-center items-center text-[#0B65C2] font-semibold text-xl text-center'>Send Feedback</button>
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
                                        skills.map((skills, index) => {

                                            return (
                                                <p key={index} className='h-[40px] bg-[#0B65C2] p-2 text-white rounded-lg'>{skills}</p>
                                            )
                                        })
                                    }
                                </div>

                                :
                                // if skill is not adden then it it will show no skill added 
                                <div className='pb-6 pt-2 md:text-lg md:font-bold text-red-500'>
                                    <p>No skills added</p>
                                </div>
                        }
                    </div>


                    <Feedback feedbacks={props.feedbacks} />
                </div>



            </div>


        </div >
    )
}

function FeedbackAdd(props) {
    const [feedback, setFeedback] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        props.handleSendFeedback(feedback);
        props.openFeedbackToggle(feedback);
        toast.success("Feedback Sent!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div className='w-full h-[100vh] fixed top-0 left-0 bg-[#0000005a] flex justify-center items-center z-[100]'>
            <div className='w-[95%] rounded-lg md:w-[50%] z-[120] bg-white absolute md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-xl border-[1px] border-[#5d5d5d] flex flex-col justify-start items-center shadow-lg'>
                <button onClick={() => {
                    props.openFeedbackToggle(feedback);
                }} className=' absolute top-0 right-0 h-[65px] w-[65px] rounded-tr-xl text-3xl flex justify-center items-center'><IoMdClose />
                </button>
                <form
                    onSubmit={(e) => {
                        handleSubmit(e)
                    }}
                    className='my-8 md:flex  flex-col items-center justify-start grow h-[100%] w-[90%]'
                >
                    <div className='flex flex-col w-[100%] '>
                        <input
                            value={feedback}
                            onChange={(e) => {
                                setFeedback(e.target.value);
                            }}
                            required
                            type="text"
                            id='feedback'
                            name='feedback'
                            placeholder='Write Feedback....'
                            className='h-[80px] mt-8 border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
                    </div>

                    {/* save button */}
                    <button onSubmit={handleSubmit} type='submit' className='mt-8 bg-green-950 text-white p-2 w-[100%] rounded-xl font-normal'>Send feedback</button>
                </form>

            </div>
        </div>
    )
}


const Feedback = (props) => {

    const studentReviews = [
        {
            profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
            name: "Aarav Sharma",
            city: "Mumbai",
            review: "This mentorship program has been a game-changer for me. My mentor provided great insights into my career path!"
        },
        {
            profilePic: "https://randomuser.me/api/portraits/women/45.jpg",
            name: "Priya Verma",
            city: "Delhi",
            review: "I learned so much in just a few weeks. My mentor was patient and very knowledgeable."
        },
        {
            profilePic: "https://randomuser.me/api/portraits/men/51.jpg",
            name: "Rohan Iyer",
            city: "Bangalore",
            review: "The guidance I received was invaluable. I now feel confident about my career choices!"
        },
        {
            profilePic: "https://randomuser.me/api/portraits/women/29.jpg",
            name: "Ananya Nair",
            city: "Chennai",
            review: "Amazing experience! My mentor helped me develop crucial skills and set clear career goals."
        },
        {
            profilePic: "https://randomuser.me/api/portraits/men/40.jpg",
            name: "Vikram Desai",
            city: "Pune",
            review: "Highly recommend this platform! My mentor gave me industry insights I wouldn’t have gotten anywhere else."
        },
        {
            profilePic: "https://randomuser.me/api/portraits/women/33.jpg",
            name: "Neha Gupta",
            city: "Kolkata",
            review: "My mentor gave me the confidence to pursue my dreams and provided excellent career advice."
        },
        {
            profilePic: "https://randomuser.me/api/portraits/men/48.jpg",
            name: "Karan Mehta",
            city: "Hyderabad",
            review: "I improved my technical skills significantly with my mentor’s help. The best decision I ever made!"
        },
        {
            profilePic: "https://randomuser.me/api/portraits/women/38.jpg",
            name: "Simran Kaur",
            city: "Chandigarh",
            review: "My mentor was incredibly supportive and helped me refine my resume and interview skills."
        },
        {
            profilePic: "https://randomuser.me/api/portraits/men/57.jpg",
            name: "Arjun Reddy",
            city: "Visakhapatnam",
            review: "I got real-world insights from my mentor, which helped me land a great internship!"
        },
        {
            profilePic: "https://randomuser.me/api/portraits/women/50.jpg",
            name: "Ishita Sen",
            city: "Ahmedabad",
            review: "My mentor’s guidance was invaluable. I now have a clear roadmap for my career!"
        }
    ]


    return (
        <div className='min-h-[60vh] w-full py-8 px-6'>
            <h1 className='text-center text-2xl md:text-4xl font-bold mb-8'>Mentees Feedback</h1>
            <div className='w-full overflow-x-auto no-scrollbar'>
                <div className='flex space-x-6 px-4 w-max'>
                    {/* {console.log(props.feedbacks)} */}
                    {props.feedbacks.feedback?.map((feedback, index) => {
                        return (
                            <div key={index}
                                className='
                            flex flex-col border-[1px] border-gray-200 justify-between overflow-hidden w-[250px] h-[300px] bg-white rounded-lg 
                            '
                            >
                                <div className='py-4 px-2'>
                                    <p className='text-center align-center text-l mt-4'>{feedback.feedbackText}</p>
                                </div>
                                <div className='p-3 bg-gray-800 gap-6 flex justify-start items-center'>
                                    {feedback.profile ? <img className='h-[60px] w-[60px] rounded-full' src={feedback.profile} alt="" /> : <img className='h-[60px] w-[60px] rounded-full' src="https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png" alt="" />}

                                    <div className='flex flex-col text-white'>
                                        <h3 className='font-bold'>{feedback.name}</h3>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
