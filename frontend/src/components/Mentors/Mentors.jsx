import React, { useState, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";

export default function Mentors() {

  const [userData, setUserData] = useState(null);
  const [mentors, setMentors] = useState([]);

useEffect(() => {
}, [mentors]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser; // Get logged-in user
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    fetchUserData();
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


    const [openProfile, setOpenProfile] = useState(false);
    const [scroll, setScroll] = useState(true);
    const [showProfile, setShowProfile] = useState({});
    const det = 1;
    const user = {
        id: 1,
        name: "Md Alkama",
        email: "mdalkamadad@gmail.com",
        phone: "1234567890",
        age: 22,
        role: "Mentor",
        profile: "https://i.pinimg.com/564x/3c/1c/73/3c1c7364ed3445e25235b032ebc1dfe5.jpg",
        location: "Patna, Bihar",
        gender: "Male",
        skills: {
            0: "React",
            1: "Node.js",
            2: "JavaScript",
            3: "Python",
            4: "Django",
            5: "HTML",
            6: "CSS",
            7: "MongoDB"
        },
        education: {
            0: {
                name: "Maulana Azad College Of Engineering And Technlogy",
                degree: "B.Tech",
                field: "Computer Science Engineering",
                startYear: "2020",
                endYear: "2024",
                location: "Patna, Bihar"
            }
        }
    }
    const users = [
        {
            id: 1,
            name: "Md Alkama",
            email: "mdalkamadad@gmail.com",
            phone: "1234567890",
            age: 22,
            role: "Mentor",
            profile: "https://i.pinimg.com/564x/3c/1c/73/3c1c7364ed3445e25235b032ebc1dfe5.jpg",
            location: "Patna, Bihar",
            gender: "Male",
            skills: ["React", "Node.js", "JavaScript", "Python", "Django", "HTML", "CSS", "MongoDB"],
            education: [{
                name: "Maulana Azad College Of Engineering And Technology",
                degree: "B.Tech",
                field: "Computer Science Engineering",
                startYear: "2020",
                endYear: "2024",
                location: "Patna, Bihar"
            }]
        },
        {
            id: 2,
            name: "Aisha Khan",
            email: "aisha.khan@example.com",
            phone: "9876543210",
            age: 24,
            role: "Developer",
            profile: "https://i.pinimg.com/564x/aa/8f/c2/aa8fc2c63e5e084e9b7c9f6a43e24cbf.jpg",
            location: "Delhi, India",
            gender: "Female",
            skills: ["Angular", "TypeScript", "JavaScript", "Node.js", "Bootstrap"],
            education: [{
                name: "Delhi Technological University",
                degree: "B.Tech",
                field: "Information Technology",
                startYear: "2018",
                endYear: "2022",
                location: "Delhi, India"
            }]
        },
        {
            id: 3,
            name: "Rahul Sharma",
            email: "rahul.sharma@example.com",
            phone: "9998887777",
            age: 25,
            role: "Backend Developer",
            profile: "https://i.pinimg.com/564x/2e/37/24/2e3724d6e68c2a8d0f75fc5ae9e26771.jpg",
            location: "Mumbai, Maharashtra",
            gender: "Male",
            skills: ["Node.js", "Express", "MongoDB", "SQL", "Python"],
            education: [{
                name: "Mumbai University",
                degree: "B.E",
                field: "Computer Engineering",
                startYear: "2017",
                endYear: "2021",
                location: "Mumbai, Maharashtra"
            }]
        },
        {
            id: 4,
            name: "Sneha Gupta",
            email: "sneha.gupta@example.com",
            phone: "8887776666",
            age: 23,
            role: "Frontend Developer",
            profile: "https://i.pinimg.com/564x/6b/79/e7/6b79e7cf31f77a3a2a7333e4de41b2a2.jpg",
            location: "Lucknow, Uttar Pradesh",
            gender: "Female",
            skills: ["React", "Redux", "CSS", "HTML", "SASS"],
            education: [{
                name: "Amity University",
                degree: "B.Tech",
                field: "Software Engineering",
                startYear: "2019",
                endYear: "2023",
                location: "Noida, Uttar Pradesh"
            }]
        },
        {
            id: 5,
            name: "Vikram Singh",
            email: "vikram.singh@example.com",
            phone: "7776665555",
            age: 26,
            role: "Full Stack Developer",
            profile: "https://i.pinimg.com/564x/fd/57/2d/fd572d86d1f39ae1fa09e9bb20c4af8e.jpg",
            location: "Jaipur, Rajasthan",
            gender: "Male",
            skills: ["React", "Node.js", "Python", "Django", "PostgreSQL"],
            education: [{
                name: "JECRC University",
                degree: "B.Tech",
                field: "Computer Science",
                startYear: "2016",
                endYear: "2020",
                location: "Jaipur, Rajasthan"
            }]
        },
        {
            id: 6,
            name: "Neha Kumari",
            email: "neha.kumari@example.com",
            phone: "6665554444",
            age: 24,
            role: "UI/UX Designer",
            profile: "https://i.pinimg.com/564x/f4/9f/bc/f49fbc740dc44f74191ec6f70178a2c5.jpg",
            location: "Kolkata, West Bengal",
            gender: "Female",
            skills: ["Figma", "Adobe XD", "HTML", "CSS", "JavaScript"],
            education: [{
                name: "Jadavpur University",
                degree: "B.Des",
                field: "Design",
                startYear: "2017",
                endYear: "2021",
                location: "Kolkata, West Bengal"
            }]
        },
        {
            id: 7,
            name: "Aman Verma",
            email: "aman.verma@example.com",
            phone: "5554443333",
            age: 28,
            role: "Data Scientist",
            profile: "https://i.pinimg.com/564x/c7/65/f7/c765f7405d0f91765e6b3d52bd3b4b78.jpg",
            location: "Bangalore, Karnataka",
            gender: "Male",
            skills: ["Python", "Machine Learning", "TensorFlow", "Pandas", "NumPy"],
            education: [{
                name: "IISc Bangalore",
                degree: "M.Tech",
                field: "Data Science",
                startYear: "2018",
                endYear: "2020",
                location: "Bangalore, Karnataka"
            }]
        },
        {
            id: 8,
            name: "Priya Singh",
            email: "priya.singh@example.com",
            phone: "4443332222",
            age: 21,
            role: "Intern",
            profile: "https://i.pinimg.com/564x/44/0c/b3/440cb302f71aef5bc49a0704d5eaaf20.jpg",
            location: "Chandigarh, Punjab",
            gender: "Female",
            skills: ["HTML", "CSS", "JavaScript", "React"],
            education: [{
                name: "Punjab University",
                degree: "BCA",
                field: "Computer Applications",
                startYear: "2021",
                endYear: "2024",
                location: "Chandigarh, Punjab"
            }]
        },
        {
            id: 9,
            name: "Rohit Mehra",
            email: "rohit.mehra@example.com",
            phone: "3332221111",
            age: 27,
            role: "Software Engineer",
            profile: "https://i.pinimg.com/564x/8c/8f/4c/8c8f4cb98a769e15ed7d15cbfa52df0f.jpg",
            location: "Hyderabad, Telangana",
            gender: "Male",
            skills: ["Java", "Spring Boot", "MySQL", "AWS", "Docker"],
            education: [{
                name: "IIIT Hyderabad",
                degree: "B.Tech",
                field: "Computer Science",
                startYear: "2015",
                endYear: "2019",
                location: "Hyderabad, Telangana"
            }]
        },
        {
            id: 10,
            name: "Simran Kaur",
            email: "simran.kaur@example.com",
            phone: "2221110000",
            age: 23,
            role: "Project Manager",
            profile: "https://i.pinimg.com/564x/b0/b8/e1/b0b8e1f7d37a073d545e6c755321d2e3.jpg",
            location: "Amritsar, Punjab",
            gender: "Female",
            skills: ["Agile", "Scrum", "Leadership", "Communication"],
            education: [{
                name: "Lovely Professional University",
                degree: "MBA",
                field: "Project Management",
                startYear: "2019",
                endYear: "2021",
                location: "Jalandhar, Punjab"
            }]
        }
    ];


    const scrollToggle = () => {
        setScroll(!scroll);
    };

    const openProfileToggle = () => {
        setOpenProfile(!openProfile);
    }
    const showProfileUpdate = (user) => {
        setShowProfile(user);
    }


    { scroll ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden" }




    return (
        <>
            <div id='about' className='min-h-[100vh] pt-[68px] w-[100%] flex justify-evenly flex-wrap bg-[#f5f8f1]'>
                {mentors.map((user, index) => {
                    return (
                        <Mentor key={index} user={user} openProfileToggle={openProfileToggle} scrollToggle={scrollToggle} showProfileUpdate={showProfileUpdate} />
                    )
                })}


            </div>
            {openProfile
                ?
                <Profile showProfile={showProfile} openProfileToggle={openProfileToggle} scrollToggle={scrollToggle} user={user} det={det} />
                :
                null
            }

        </>
    )
}


function Mentor(props) {
    return (
        <div className='py-4 px-2'>
            <div className="bg-white rounded-2xl shadow-md min-w-[300px] max-w-[500px] p-6 hover:scale-105 transition-transform flex flex-col items-center shrink-0">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
                    <img
                        src="https://img.freepik.com/free-photo/business-finance-employment-female-successful-entrepreneurs-concept-confident-smiling-asian-businesswoman-office-worker-white-suit-glasses-using-laptop-help-clients_1258-59126.jpg"
                        alt="{title}"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="text-xl font-bold">{props.user.name}</h2>
                <p className="text-gray-600 font-light text-sm text-center mb-6">{props.user.email}</p>
                <h3 className='text-center mb-4 font-medium text-sm'>{props.user.role}</h3>
                <div className='flex gap-6'>
                    <button className='bg-black text-white px-3 py-2 rounded text-sm hover:bg-zinc-700'>Message</button>
                    <button onClick={() => {
                        props.openProfileToggle()
                        props.scrollToggle()
                        props.showProfileUpdate(props.user)
                    }} className='bg-black text-white px-3 py-2 rounded text-sm hover:bg-zinc-700'>See profile</button>
                </div>
            </div>
        </div>
    )
}


function Profile(props) {
    const education = props.showProfile.education[0];
    const user = props.showProfile;
    const skills = Object.values(user.skills);
    return (
        <div className='w-full h-[100vh] fixed top-0 left-0 bg-[#0000005a] flex justify-center items-center z-[100]'>
            <div className='w-full  md:w-[80%] z-[120] bg-white absolute md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-xl border-[1px] border-[#5d5d5d] flex flex-col justify-start items-center shadow-lg'>
                <button className=' absolute top-0 right-0 h-[65px] w-[65px] rounded-tr-xl text-3xl flex justify-center items-center' onClick={() => {
                    props.scrollToggle();
                    props.openProfileToggle();
                }}><IoMdClose />
                </button>
                <div className='overflow-y-auto p-4 w-full h-[100vh] md:h-[90vh] flex flex-col items-center justify-start'>
                    <div id="profile-main" className='px-4 flex flex-col md:flex-row md:h-[200px] w-full md:w-[90%] justify-between items-center'>
                        <div id='profile-and-info' className='flex md:h-full md:flex-row w-full gap-4 md:gap-6 items-center'>
                            <div style={{ backgroundImage: `url(${user.profile})` }} id="profie-photo" className='md:h-[150px] shrink-0 md:w-[150px] h-28 w-28 rounded-full bg-cover bg-center'>
                            </div>
                            <div id='name-and-email' className='flex flex-col md:items-start'>
                                <p className='font-bold text-xl md:text-2xl'>{user.name}</p>
                                <p className='text-gray-600 font-medium text-sm md:text-lg'>{user.email}</p>
                            </div>
                        </div>
                        <div className='w-full md:w-[150px] flex justify-center items-center'>
                            <button className=' h-[50px] w-full md:w-[150px] rounded-md mt-4 md:mt-0 font-semibold bg-[#04AA6D] text-white'>Send Message</button>
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


        </div>
    )
}