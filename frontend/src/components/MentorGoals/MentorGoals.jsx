import React from 'react'

function mentorGoals() {
    const data = [
        [
            {
                id: 1,
                name: "Alice",
                mentorId: "M101",
                mentorName: "Dr. Smith",
                title: "Software Engineer",
                description: "Alice is a backend developer specializing in Node.js."
            }
        ],
        [
            {
                id: 2,
                name: "Bob",
                mentorId: "M102",
                mentorName: "Ms. Johnson",
                title: "Data Scientist",
                description: "Bob is an expert in machine learning and AI."
            }
        ],
        [
            {
                id: 3,
                name: "Charlie",
                mentorId: "M103",
                mentorName: "Prof. Williams",
                title: "Cybersecurity Analyst",
                description: "Charlie focuses on network security and ethical hacking."
            }
        ],
        [
            {
                id: 4,
                name: "David",
                mentorId: "M104",
                mentorName: "Dr. Brown",
                title: "Cloud Architect",
                description: "David specializes in AWS and cloud infrastructure."
            }
        ]
    ];

    console.log(data);

    console.log(data);



    return (
        <div>{
            data.map((MentorGoals) => (
                MentorGoals.map((mentorGoal) => (
                        <div key ={mentorGoal.id}>
                            <h1>{mentorGoal.name}</h1>
                            <h2>{mentorGoal.title}</h2>
                            <p>{mentorGoal.description}</p>
                        <hr />
                        </div>
                        
                ))
            ))
        }
        </div>
    )
}

export default mentorGoals;