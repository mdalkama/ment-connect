import React from 'react'
import { FaChalkboardTeacher } from "react-icons/fa"
import { GoGoal } from "react-icons/go";
import { GiProgression } from "react-icons/gi";
import { LuMessageSquareText } from "react-icons/lu";



const Features = () => {


    const features = [
        {
            icon: <div className='h-[90px] w-[90px] rounded-full bg-[#F3F7FF] flex items-center justify-center mt-4'><h3><FaChalkboardTeacher className='text-2xl text-[#2F6BF3]' /></h3></div>,
            title: 'Connect with Mentors',
            description: 'Find mentors who can help you with your career goals and interests'
        },
        {
            icon: <div className='h-[90px] w-[90px] rounded-full bg-[#F9F3FF] flex items-center justify-center mt-4'><h3><GiProgression className='text-2xl text-[#DC64D3]' /></h3></div>,
            title: 'Track your Progress',
            description: 'See how far you\'ve come and how much further you can go'
        },
        {
            icon: <div className='h-[90px] w-[90px] rounded-full bg-[#FFF1F2] flex items-center justify-center mt-4'><h3><GoGoal className='text-2xl text-[#E55D5D]' /></h3></div>,
            title: 'Set Your Goals',
            description: 'Set goals for your career and see how you can achieve them'
        },
        {
            icon: <div className='h-[90px] w-[90px] rounded-full bg-[#E8FAF2] flex items-center justify-center mt-4'><h3><LuMessageSquareText className='text-2xl text-[#42A778]' /></h3></div>,
            title: "Communicate with Mentors",
            description: "Communicate with mentors and get advice on your career goals"
        }
    ]

    return (
        <div className='h-auto md:min-h-[100vh] py-10 w-full bg-[#F7F8FC] flex flex-col items-center justify-center px-6'>
            <p className='  text-4xl md:text-5xl mb-2 md:mb-5'>Our features</p>
            <p className=' mb-7 text-xs md:text-base md:mb-20 text-center'>Unlock the power of mentorship with features designed to elevate your growth.

            </p>
            <div className=''>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full'>
                    {
                        features.map((feature, index) => {
                            return <div key={index} className={`w-[300px] xl:w-[300px] lg:w-[245px] md:w-[240px] md:h-[300px] lg:h-[350px] h-[350px] bg-white gap-4 flex flex-col items-center text-center rounded-md py-8 px-6 hover:shadow-lg hover:scale-[103%] cursor-pointer transition-transform 
                        ${index === 3 ? "md:col-span-3 md:mx-auto lg:col-span-1" : ""}`}>
                                {feature.icon}
                                <h2 className='text-nowrap mt-4 font-semibold text-lg text-gray-700' >{feature.title}</h2>
                                <p className='text-sm text-gray-500'>{feature.description}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Features


