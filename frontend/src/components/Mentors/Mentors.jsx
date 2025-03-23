import React from 'react'

function Mentors() {
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


    return (
        <div id='about' className='p-4 flex h-[100vh] flex-col items-center justify-center'>
            <button onClick={() => {
                localStorage.setItem('user', JSON.stringify(user))
                const data = localStorage.getItem('user')
                const user1 = JSON.parse(data)
            }} className='text-2xl font-bold'>add user</button>



        </div>
    )
}

export default Mentors