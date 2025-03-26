import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc, collection, arrayUnion } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {




  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

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
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);


  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [isOpenSkillsAdd, setIsOpenSkillsAdd] = useState(false);
  const [isOpenEducationAdd, setIsOpenEducationAdd] = useState(false);
  const [scroll, setScroll] = useState(true);

  const scrollToggle = () => {
    setScroll(!scroll);
  };

  const openEditProfileToggle = () => {
    setIsOpenEditProfile(!isOpenEditProfile);
  }

  const openEducationToggle = () =>{
    setIsOpenEducationAdd(!isOpenEducationAdd);
  }
  const openSkillsAddToggle = () => {
    setIsOpenSkillsAdd(!isOpenSkillsAdd);
  }
  { scroll ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden" }


  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p className="mt-[100px]">No user data found.</p>;
  }

  return (
    <>
    {
      user
      ?
      <div className='mt-[68px] p-4 flex flex-col items-center justify-start'>


      <div id="profile-main" className='px-4 flex flex-col md:flex-row md:h-[200px] w-full md:w-[90%] justify-between items-center'>
        <div id='profile-and-info' className='flex md:h-full flex-col  md:flex-row justify-center items-center gap-4'>
          {user.profile 
          ?
          <div style={{ backgroundImage: `url(${user.profile})` }} id="profie-photo" className='h-[150px] w-[150px] rounded-full bg-cover bg-center'>
          </div>
          :
          <div id="profie-photo" className='h-[150px] w-[150px] rounded-full bg-[url(https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png)] bg-cover bg-center'>
          </div>
}
          
          <div id='name-and-email' className='flex flex-col items-center md:items-start'>
            <p className='font-bold text-2xl'>{user.name}</p>
            <p className='font-semibold text-lg'>{user.email}</p>
          </div>
        </div>

        <div className='w-full md:w-[150px] flex justify-center items-center'>
              <button onClick={() => { openEditProfileToggle(); setScroll(!scroll); }} className=' h-[50px] w-[90%] md:w-[150px] rounded-md mt-4 font-semibold text-lg  md:mt-0 bg-[#0B65C2] text-white'>Edit Profile</button>
        </div>

      </div>
      <BasicInfo user={user} />
      {isOpenEditProfile ? <EditProfile  user = {user} scrollToggle={scrollToggle} openEditProfileToggle={openEditProfileToggle} /> : null }
      <Education education={user.education} openEditEducationToggle = {openEducationToggle} scrollToggle = {scrollToggle}/>
      {isOpenEducationAdd ? <EditEducation  user={user} openEditEducationToggle = {openEducationToggle} scrollToggle = {scrollToggle} /> : null }
      <Skills skills={user.skills} openSkillsAddToggle={openSkillsAddToggle} scrollToggle={scrollToggle} />
      { isOpenSkillsAdd ? <SkillsAdd user={user} skills={user.skills} openSkillsAddToggle={openSkillsAddToggle} scrollToggle={scrollToggle} /> : null }


    </div>
      :
      <p className='mt-[68px] p-4 text-3xl flex flex-col items-center justify-center h-screen w-screen'> Loading...</p>
    }
    </>
  );
}


function BasicInfo(props) {
  return (
    <div className='mt-10 px-2 md:px-4 w-[100%] md:w-[90%] gap-1 md:gap-4 rounded-md md:rounded-lg bg-[white] border-[1px] border-[#5d5d5d] flex flex-col justify-start items-center'>
      <h3 className='font-semibold py-2 md:py-2 md:font-bold text-2xl w-full text-center border-b-[1px] border-black'>User Info</h3>
      <div className='pl-4 md:pl-4 w-full gap-2 py-4 rounded-lg  bg-[white] flex flex-col justify-start items-start'>
        <p className='font-bold text-sm md:text-xl'>Role: {props.user.role}</p>
        {props.user.domain !== "" ? <p className='font-bold text-sm md:text-lg'>Domain: {props.user.domain}</p> : null}
        {props.user.location !== "" ? <p className='font-semibold text-sm md:text-lg'>Location: {props.user.location}</p> : null}
        {props.user.gender !== "" ? <p className='font-semibold text-sm md:text-lg'>Gender: {props.user.gender}</p> : null}
        {props.user.age !== "" ? <p className='font-semibold text-sm md:text-lg'>Age: {props.user.age}</p> : null}

        
      </div>

    </div>
  )
}


function EditProfile(props) {
  const [name, setName] = useState(props.user.name);
  const [domain, setDomain] = useState(props.user.domain);
  const [profile, setProfile] = useState(props.user.profile);
  const [age, setAge] = useState(props.user.age);
  const [gender, setGender] = useState(props.user.gender||"Male");
  const [location, setLocation] = useState(props.user.location);


    const updateUserProfile = async (uid, updatedData) => {
    if (!uid) {
      toast.error("User ID is missing!");
      return;
    }

    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, updatedData);
      toast.success("Profile updated successfully!");
          props.scrollToggle();
          props.openEditProfileToggle();
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Update failed:", error);
    }
  };

  // 🔹 Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!props.user || !props.user.userid) {
      toast.error("User not found!");
      return;
    }

    const newData = {
      name,
      profile,
      age,
      domain,
      gender,
      location,
    };

    updateUserProfile(props.user.userid, newData);
  };


  return (
    <div className='w-full h-[100vh] fixed top-0 left-0 bg-[#0000005a] flex justify-center items-center z-[100]'>
      <div className='w-full  md:w-[50%] z-[120] bg-white absolute md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-xl border-[1px] border-[#5d5d5d] flex flex-col justify-start items-center shadow-lg'>
        <button className=' absolute top-0 right-0 h-[65px] w-[65px] rounded-tr-xl text-3xl flex justify-center items-center' 
        onClick={() => {
          props.scrollToggle();
          props.openEditProfileToggle();
        }}><IoMdClose />
        </button>
        <p className='w-full h-[50px] pl-4 text-2xl font-bold mt-[15px] border-b-[1px] border-[#5d5d5d]'>Edit Profile</p>

        <form
          onSubmit={handleSubmit}
          className='my-8 md:flex flex-col items-center justify-start grow h-[100%] w-[90%]'
        >
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
            <label htmlFor="domain" className='text-s font-normal'> Domain </label>
            <input
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
              }}
              required
              type="text"
              id='domain'
              name='domain'
              placeholder='Eg: Software Engineer' className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
          </div>

          {/* profile input box */}
          <div className='flex flex-col w-[100%] mt-4'>
            <label htmlFor="profile" className='text-s font-normal'>Profile</label>
            <input
              value={profile}
              onChange={(e) => {
                setProfile(e.target.value);
              }}
              required
              type="text"
              id='profile'
              name='profile'
              placeholder='Upload URL'
              className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
          </div>

          {/* age input box */}
          <div className='flex flex-col w-[100%] mt-4'>
            <label htmlFor="age" className='text-s font-normal'> Age</label>
            <input
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              required
              type="number"
              id='age'
              name='age'
              placeholder='Age'
              className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
          </div>

          {/* gender input box */}
          <div className='flex flex-col w-[100%] mt-4'>
            <label htmlFor="gender" className='text-s font-normal'>Gender</label>
            <select name="gender" id="gender"
            value={gender} // Controlled input
            onChange={(e) => setGender(e.target.value)}
            className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* location input box */}
          <div className='flex flex-col w-[100%] mt-4'>
            <label htmlFor="name" className='text-s font-normal'>Location</label>
            <input
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              required
              type="text"
              id='location'
              name='location'
              placeholder='Location'
              className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
          </div>

          {/* save button */}
          <button type='submit' className='mt-8 bg-green-950 text-white p-2 w-[100%] rounded-xl font-normal'>Save Changes</button>
        </form>


      </div>
    </div>

  )
}

function Education(props) {
  const education = props.education;
  return (

    <div className=' relative mt-10 px-2 md:px-4 w-[100%] md:w-[90%] gap-1 md:gap-4 rounded-md md:rounded-lg bg-[white] border-[1px] border-[#5d5d5d] flex flex-col justify-start items-center'>
      
      <h3 className='font-semibold py-2 md:py-2 md:font-bold text-2xl w-full text-center border-b-[1px] border-black'>Education</h3>
    <button className=' absolute top-0 right-0 p-2 rounded-tr-xl text-3xl flex justify-center items-center' 
        onClick={() => {
          props.scrollToggle();
          props.openEditEducationToggle();
        }}><MdModeEdit />
        </button>
      {
        education.name !== ""
          ?
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
          <button onClick={()=>{
            props.scrollToggle();
            props.openEditEducationToggle();
          }} className='w-[90%] my-8 h-[50px] md:h-[100px] rounded-lg border-1 outline-dashed bg-[#0b67c25a]
        flex justify-center items-center text-[#0B65C2] font-semibold text-xl text-center cursor-pointer'>+ Add Education</button>
      }
    </div>
  )
}



function EditEducation(props) {
  const education = props.user.education;
  const [name, setName] = useState(education.name);
  const [degree, setDegree] = useState(education.degree);
  const [field, setField] = useState(education.field);
  const [startYear, setStartYear] = useState(education.startYear);
  const [endYear, setEndYear] = useState(education.endYear);
  const [location, setLocation] = useState(education.location);

const updateUserEducation = async (uid, updatedEducation) => {
  if (!uid) {
    toast.error("User ID is missing!");
    return;
  }

  try {
    const userRef = doc(db, "users", uid); // Reference to the user document

    await updateDoc(userRef, {
      education: updatedEducation, // 🔹 Updating only the education field
    });

    toast.success("Education updated successfully!");
    props.scrollToggle();
    props.openEditEducationToggle();
  } catch (error) {
    toast.error("Error updating education");
    console.error("Update failed:", error);
  }
};

// 🔹 Handle Form Submit
const handleSubmit = (e) => {
  e.preventDefault();

  if (!props.user || !props.user.userid) {
    toast.error("User not found!");
    return;
  }

  const updatedEducation = {
    name,
    degree,
    field,
    startYear,
    endYear,
    location
  };

  updateUserEducation(props.user.userid, updatedEducation);
};

  return (
    <div className='w-full h-[100vh] fixed top-0 left-0 bg-[#0000005a] flex justify-center items-center z-[100]'>
      <div className='w-full  md:w-[50%] z-[120] bg-white absolute md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-xl border-[1px] border-[#5d5d5d] flex flex-col justify-start items-center shadow-lg'>
        <button className=' absolute top-0 right-0 h-[65px] w-[65px] rounded-tr-xl text-3xl flex justify-center items-center' 
        onClick={() => {
          props.scrollToggle();
          props.openEditEducationToggle();
        }}><IoMdClose />
        </button>
        <p className='w-full h-[50px] pl-4 text-2xl font-bold mt-[15px] border-b-[1px] border-[#5d5d5d]'>EditEducation</p>

        <form
        onSubmit={handleSubmit}
          className='my-8 md:flex flex-col items-center justify-start grow h-[100%] w-[90%]'
        >
          {/* name input box */}
          <div className='flex flex-col w-[100%] '>
            <label htmlFor="name" className='text-s font-normal'>Collage name</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              type="text"
              id='name'
              name='name'
              placeholder='College name'
              className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
          </div>


          {/* branch input box */}
          <div className='flex flex-col w-[100%] mt-4'>
            <label htmlFor="degree" className='text-s font-normal'> Branch </label>
            <input
              value={degree}
              onChange={(e) => {
                setDegree(e.target.value);
              }}
              required
              type="text"
              id='degree'
              name='degree'
              placeholder='Eg: B.Tech B.Com B.sc' className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
          </div>

          {/* profile input box */}
          <div className='flex flex-col w-[100%] mt-4'>
            <label htmlFor="profile" className='text-s font-normal'>Field</label>
            <input
              value={field}
              onChange={(e) => {
                setField(e.target.value);
              }}
              required
              type="text"
              id='profile'
              name='profile'
              placeholder='Eg: CSE ECE EEE'
              className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
          </div>

          {/* start year input box */}
          <div className='flex flex-col w-[100%] mt-4'>
            <label htmlFor="startYear" className='text-s font-normal'> Start Year</label>
            <input
              value={startYear}
              onChange={(e) => {
                setStartYear(e.target.value);
              }}
              required
              type="number"
              id='startYear'
              name='startYear'
              placeholder='eg: 2018 2019 2020'
              className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
          </div>

          {/* end year input box */}
          <div className='flex flex-col w-[100%] mt-4'>
            <label htmlFor="endYear" className='text-s font-normal'> End Year</label>
            <input
              value={endYear}
              onChange={(e) => {
                setEndYear(e.target.value);
              }}
              required
              type="number"
              id='endYear'
              name='endYear'
              placeholder='eg: 2026 2027 2028'
              className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
          </div>

          {/* location input box */}
          <div className='flex flex-col w-[100%] mt-4'>
            <label htmlFor="name" className='text-s font-normal'>Location</label>
            <input
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              required
              type="text"
              id='location'
              name='location'
              placeholder='Location'
              className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
          </div>

          {/* save button */}
          <button type='submit' className='mt-8 bg-green-950 text-white p-2 w-[100%] rounded-xl font-normal'>Save Changes</button>
        </form>


      </div>
    </div>

  )
}


function Skills(props) {
  return (
    <div className='mt-10 px-2 md:px-4 w-[100%] md:w-[90%] gap-1 md:gap-4 rounded-md md:rounded-lg bg-[white] border-[1px] border-[#5d5d5d] flex flex-col justify-start items-center'>
      <h3 className='font-semibold py-2 md:py-2 md:font-bold text-2xl w-full text-center border-b-[1px] border-black'>Skills</h3>
      {
        props.skills.length > 0
          ?
          <div className='pl-0 md:pl-4 w-full gap-4 py-8 rounded-lg  bg-[white] flex justify-start items-center flex-wrap'>
            {
              props.skills.map((skills,index) => {

                return (
                  <p key={index} className='h-[40px] bg-[#0B65C2] p-2 text-white rounded-lg'>{skills}</p>
                )
              })
            }
            <button onClick={() => {
              props.openSkillsAddToggle();
              props.scrollToggle();
            }} className='h-[40px] p-2 rounded-lg border-1 outline-dashed bg-[#0b67c25a]
            flex justify-center items-center text-[#0B65C2] font-semibold text-xl text-center'>+ Add Skills</button>
          </div>

          :
          <button
          onClick={() => {
              props.openSkillsAddToggle();
              props.scrollToggle();
            }} 
          className='w-[90%] my-8 h-[50px] md:h-[100px] rounded-lg border-1 outline-dashed bg-[#0b67c25a]
        flex justify-center items-center text-[#0B65C2] font-semibold text-xl text-center'>+ Add Skills</button>
      }
    </div>
  )
}

function SkillsAdd(props) {
  const [skill, setSkill] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!skill.trim()) {
      alert("Please enter a skill!"); // Check if input is empty
      return;
    }
    console.log(props.user.userid)
    const userRef = doc(db, "users", props.user.userid); // Reference to user's document

    try {
      await updateDoc(userRef, {
        skills: arrayUnion(skill), // Add skill to Firestore array
      });
      console.log(`Skill "${skill}" added successfully!`);
      setSkill(""); // Clear input field after submission
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  return (
    <div className='w-full h-[100vh] fixed top-0 left-0 bg-[#0000005a] flex justify-center items-center z-[100]'>
      <div className='w-[95%] rounded-lg md:w-[50%] z-[120] bg-white absolute md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-xl border-[1px] border-[#5d5d5d] flex flex-col justify-start items-center shadow-lg'>
        <button onClick={() => {
          props.openSkillsAddToggle();
          props.scrollToggle();
        }} className=' absolute top-0 right-0 h-[65px] w-[65px] rounded-tr-xl text-3xl flex justify-center items-center'><IoMdClose />
        </button>
        <p className='w-full h-[50px] pl-4 text-2xl font-bold mt-[15px] border-b-[1px] border-[#5d5d5d]'>Add Skills</p>

        <div className='px-2 md:px-4 w-full gap-4 py-6 rounded-lg bg-[white] flex justify-start items-center flex-wrap'>
          {
            props.skills.map((skills,index) => {
              return (
                <div key={index}>
                  <p  className='h-[40px] bg-[#0B65C2] p-2 text-white rounded-lg'>{skills}</p>
                </div>
              )

            })
          }
        </div>

          <form
          onSubmit={handleSubmit}
          className='my-8 md:flex flex-col items-center justify-start grow h-[100%] w-[90%]'
        >
          <div className='flex flex-col w-[100%] '>
            <input
              value={skill}
              onChange={(e) => {
                setSkill(e.target.value);
              }}
              required
              type="text"
              id='skill'
              name='skill'
              placeholder='Add Skill'
              className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
          </div>

          {/* save button */}
          <button onSubmit={handleSubmit} type='submit' className='mt-8 bg-green-950 text-white p-2 w-[100%] rounded-xl font-normal'>Save Changes</button>
        </form>

      </div>
    </div>
  )
}