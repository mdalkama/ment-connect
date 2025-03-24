import React from 'react'
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";



export default function Profile() {
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
  const skill = Object.values(user.skills);
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [isOpenSkillsAdd, setIsOpenSkillsAdd] = useState(false);
  const [scroll, setScroll] = useState(true);

  const scrollToggle = () => {
    setScroll(!scroll);
  };

  const openEditProfileToggle = () => {
    setIsOpenEditProfile(!isOpenEditProfile);
  }
  const openSkillsAddToggle = () => {
    setIsOpenSkillsAdd(!isOpenSkillsAdd);
  }
  { scroll ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden" }

  return (
    <div className='mt-[68px] p-4 flex flex-col items-center justify-start'>
      {/* profile main */}
      <div id="profile-main" className='px-4 flex flex-col md:flex-row md:h-[200px] w-full md:w-[90%] justify-between items-center'>
        <div id='profile-and-info' className='flex md:h-full flex-col  md:flex-row justify-center items-center gap-4'>
          <div style={{ backgroundImage: `url(${user.profile})` }} id="profie-photo" className='h-[150px] w-[150px] rounded-full bg-cover bg-center'>
          </div>
          <div id='name-and-email' className='flex flex-col items-center md:items-start'>
            <p className='font-bold text-2xl'>{user.name}</p>
            <p className='font-semibold text-lg'>{user.email}</p>
          </div>
        </div>

        <div className='w-full md:w-[150px] flex justify-center items-center'>
          {
            det === 1
              ?
              <button onClick={() => { openEditProfileToggle(); setScroll(!scroll); }} className=' h-[50px] w-[90%] md:w-[150px] rounded-md mt-4 font-semibold text-lg  md:mt-0 bg-[#0B65C2] text-white'>Edit Profile</button>
              :
              det === 2
                ?
                <button className=' h-[50px] w-[90%] md:w-[150px] rounded-md mt-4  md:mt-0 bg-[#0B65C2] text-white'>Connect</button>
                :
                <button className=' h-[50px] w-[90%] md:w-[150px] rounded-md mt-4  md:mt-0 bg-[#04AA6D] text-white'>Send Message</button>
          }
        </div>

      </div>

      {/* basic info section */}
      <BasicInfo user={user} />


      {/* education section */}
      <Education education={user.education} education1={user.education} />


      {/* edit profile popup */}
      {
        isOpenEditProfile
          ?
          <EditProfile scrollToggle={scrollToggle} openEditProfileToggle={openEditProfileToggle} />
          :
          null
      }


      {/* Skills section */}
      <Skills skills={skill} openSkillsAddToggle={openSkillsAddToggle} scrollToggle={scrollToggle} />


      {/* skills add popup */}
      {
        isOpenSkillsAdd
          ?
          <SkillsAdd skills={skill} openSkillsAddToggle={openSkillsAddToggle} scrollToggle={scrollToggle} />
          :
          null
      }
    </div>
  )
}

function BasicInfo(props) {
  return (
    <div className='mt-10 px-2 md:px-4 w-[100%] md:w-[90%] gap-1 md:gap-4 rounded-md md:rounded-lg bg-[white] border-[1px] border-[#5d5d5d] flex flex-col justify-start items-center'>
      <h3 className='font-semibold py-2 md:py-2 md:font-bold text-2xl w-full text-center border-b-[1px] border-black'>User Info</h3>
      <div className='pl-4 md:pl-4 w-full gap-2 py-4 rounded-lg  bg-[white] flex flex-col justify-start items-start'>
        <p className='font-bold text-sm md:text-xl'>Role: {props.user.role}</p>
        <p className='font-semibold text-sm md:text-lg'>Location: {props.user.location}</p>
        <p className='font-semibold text-sm md:text-lg'>gender: {props.user.gender}</p>
      </div>

    </div>
  )
}

function EditProfile(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = { name, email, phone, age, gender, location };

    try {
      const response = await fetch('http://127.0.0.1:5000/editprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Profile saved successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setAge('');
        setGender('');
        setLocation('');
      } else {
        alert(result.error || 'Saving failed');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className='w-full h-[100vh] fixed top-0 left-0 bg-[#0000005a] flex justify-center items-center z-[100]'>
      <div className='w-full  md:w-[50%] z-[120] bg-white absolute md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-xl border-[1px] border-[#5d5d5d] flex flex-col justify-start items-center shadow-lg'>
        <button className=' absolute top-0 right-0 h-[65px] w-[65px] rounded-tr-xl text-3xl flex justify-center items-center' onClick={() => {
          props.scrollToggle();
          props.openEditProfileToggle();
        }}><IoMdClose />
        </button>
        <p className='w-full h-[50px] pl-4 text-2xl font-bold mt-[15px] border-b-[1px] border-[#5d5d5d]'>Edit Profile</p>

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          action='/editprofile'
          method='post'
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
            <label htmlFor="signUpEmail" className='text-s font-normal'> Email </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              type="email"
              id='signUpEmail'
              name='email'
              placeholder='Email' className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900' />
          </div>

          {/* phone input box */}
          <div className='flex flex-col w-[100%] mt-4'>
            <label htmlFor="phone" className='text-s font-normal'> Phone Number</label>
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              required
              type="number"
              id='phone'
              name='phone'
              placeholder='Phone Number'
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
            <select name="gender" id="gender" className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'>
              <option value="select Gender">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* name input box */}
          <div className='flex flex-col w-[100%] mt-4'>
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

          {/* save button */}
          <button type='submit' className='mt-8 bg-green-950 text-white p-2 w-[100%] rounded-xl font-normal' onClick={submitHandler}>Save Changes</button>
        </form>


      </div>
    </div>

  )
}

function Education(props) {

  const education = props.education;
  return (

    <div className='mt-10 px-2 md:px-4 w-[100%] md:w-[90%] gap-1 md:gap-4 rounded-md md:rounded-lg bg-[white] border-[1px] border-[#5d5d5d] flex flex-col justify-start items-center'>

      <h3 className='font-semibold py-2 md:py-2 md:font-bold text-2xl w-full text-center border-b-[1px] border-black'>Education</h3>

      {
        education
          ?
          <div className='pl-2 md:pl-4 w-full gap-4 py-8 rounded-lg  bg-[white] flex justify-start items-center'>
            <div className='h-[50px] w-[50px] sm:h-[80px] shrink-0 sm:w-[80px] md:h-[150px] md:w-[150px] bg-[url(https://cdn-icons-png.freepik.com/256/4981/4981453.png?semt=ais_hybrid)] bg-cover bg-center '></div>
            <div>
              <p className='font-bold text-sm md:text-xl'>{education[0].name}</p>
              <p className='font-semibold text-xs md:text-lg'> {education[0].degree} - {education[0].field}</p>
              <p className='font-semibold text-sm md:text-lg'>{education[0].startYear} - {education[0].endYear}</p>
              <p className='font-semibold text-sm md:text-lg text-[#616161]'>{education[0].location}</p>
            </div>
          </div>
          :
          <div className='w-[90%] my-8 h-[50px] md:h-[100px] rounded-lg border-1 outline-dashed bg-[#0b67c25a]
        flex justify-center items-center text-[#0B65C2] font-semibold text-xl text-center'>+ Add Education</div>
      }
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
              props.skills.map((skills) => {

                return (
                  <p className='h-[40px] bg-[#0B65C2] p-2 text-white rounded-lg'>{skills}</p>
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
          <button className='w-[90%] my-8 h-[50px] md:h-[100px] rounded-lg border-1 outline-dashed bg-[#0b67c25a]
        flex justify-center items-center text-[#0B65C2] font-semibold text-xl text-center'>+ Add Skills</button>
      }
    </div>
  )
}

function SkillsAdd(props) {
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
            props.skills.map((skills) => {
              return (
                <div>
                  <p className='h-[40px] bg-[#0B65C2] p-2 text-white rounded-lg'>{skills}</p>
                </div>
              )

            })
          }
        </div>

      </div>
    </div>
  )
}