import React from 'react'

const Ratings = () => {

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
        <div className='min-h-[60vh] w-full bg-[#F7F5F0] py-8 px-6'>
            <h1 className='text-center text-2xl md:text-4xl font-bold mb-8'>Mentees ratings</h1>
            <div className='w-full overflow-x-auto no-scrollbar'>
                <div className='flex space-x-6 px-4 w-max'>
                    {studentReviews.map((review, index) => {
                        return (
                            <div key={index}
                                className='
                            flex flex-col justify-between overflow-hidden w-[250px] h-[300px] bg-white rounded-lg 
                            '
                            >
                                <div className='py-4 px-2'>
                                    <img src="../../public/star.png" alt="" />
                                    <p className='text-center mt-4'>{review.review}</p>
                                </div>
                                <div className='p-3 bg-gray-800 gap-6 flex justify-center items-center'>
                                    <img className='h-[60px] w-[60px] rounded-full' src={review.profilePic} alt="" />
                                    <div className='flex flex-col text-white'>
                                        <h3 className='font-bold'>{review.name}</h3>
                                        <p className='text-sm'>{review.city}</p>
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

export default Ratings