import React from 'react'


function Profile() {
  const user = 2;
  const profile = "https://i.pinimg.com/564x/3c/1c/73/3c1c7364ed3445e25235b032ebc1dfe5.jpg";
  const name = "Md Alkama";
  const email = "mdalkamadad@gmail.com";
  const education = 1;
  const education1 = {
    name: "Maulana Azad College Of Engineering And Technlogy",
    degree: "B.Tech",
    field: "Computer Science Engineering",
    startYear: "2020",
    endYear: "2024"
  }



  return (
    <div className='mt-[68px] pt-4 flex h-[calc(100vh)] flex-col items-center justify-start'>
      {/* profile main */}
        <div id="profile-main" className='px-4 flex flex-col md:flex-row md:h-[200px] w-full md:w-[90%] justify-between items-center'>
          <div id='profile-and-info' className='flex md:h-full flex-col  md:flex-row justify-center items-center gap-4'>
            <div style={{backgroundImage: `url(${profile})`}} id="profie-photo" className='h-[150px] w-[150px] rounded-full bg-cover bg-center'>
            </div>
            <div id='name-and-email' className='flex flex-col items-center md:items-start'>
              <p className='font-bold text-2xl'>{name}</p>
              <p className='font-semibold text-lg'>{email}</p>
            </div>
          </div>
          <div className='w-full md:w-[150px] flex justify-center items-center'>
            {
              user === 1 ? <button className=' h-[50px] w-[90%] md:w-[150px] rounded-md mt-4  md:mt-0 bg-[#052E16] text-white'>Edit Profile</button> : user === 2 ? <button className=' h-[50px] w-[90%] md:w-[150px] rounded-md mt-4  md:mt-0 bg-[#0B65C2] text-white'>Connect</button> : <button className=' h-[50px] w-[90%] md:w-[150px] rounded-md mt-4  md:mt-0 bg-[#0FC206] text-white'>Send Message</button>
            }
          </div>
          
        </div>

        <Education education = {education} education1 = {education1} />
        
        
    </div>
  )
}


function Education (props){
  
const education = props.education;
const education1 = props.education1;
  return (
        
        <div className='mt-10 pt-1 md:pt-4 pl-4 w-[100%] md:w-[90%] gap:1 md:gap-4 md:rounded-lg  bg-[white] border-[1px] border-[#5d5d5d] flex flex-col justify-start items-center'>

        <h3 className='font-semibold md:font-bold text-xl w-full pl-1 md:pl-4'>Education</h3>

        {
        education
        ? 
        <div className='pl-0 md:pl-4 w-full gap-4 py-8 rounded-lg  bg-[white] flex justify-start items-center'>
          <div className='h-[50px] w-[50px] sm:h-[80px] sm:w-[80px] md:h-[150px] md:w-[150px] bg-[url(https://cdn-icons-png.freepik.com/256/4981/4981453.png?semt=ais_hybrid)] bg-cover bg-center '></div>
          <div>
            <p className='font-bold text-sm md:text-xl'>{education1.name}</p>
            <p className='font-semibold text-xs md:text-lg'> {education1.degree} - {education1.field}</p>
            <p className='font-semibold text-sm md:text-lg'>{education1.startYear} - {education1.endYear}</p>
          </div>
        </div>
        :
        <div className='w-[90%] my-8 h-[50px] md:h-[100px] rounded-lg border-1 outline-dashed bg-[#0b67c25a]
        flex justify-center items-center text-[#0B65C2] font-semibold text-xl text-center'>+ Add Education</div> 
        }
        </div>
)
}


export default Profile