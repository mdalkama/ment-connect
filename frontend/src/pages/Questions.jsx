import React, { useState } from 'react'
import { TiArrowSortedDown } from "react-icons/ti";

const Questions = () => {

    const [openIndex, setOpenIndex] = useState(null);

    const mentorQnA = [
        {
            id: 1,
            question: "What key skills should I focus on to advance in my career?",
            answer: "Focus on both technical skills relevant to your field and soft skills like communication, problem-solving, and adaptability. Continuous learning and networking are also essential for career growth."
        },
        {
            id: 2,
            question: "Can you share a challenge you faced in your career and how you overcame it?",
            answer: "Early in my career, I struggled with time management. I overcame this by prioritizing tasks, setting realistic deadlines, and using productivity tools to stay organized. Learning to delegate also made a huge difference."
        },
        {
            id: 3,
            question: "How do you approach goal-setting and staying motivated in your field?",
            answer: "I set SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals and break them into smaller tasks. Tracking progress and celebrating small wins keeps me motivated. Surrounding myself with inspiring professionals also helps."
        },
        {
            id: 4,
            question: "What are some common mistakes professionals make early in their careers?",
            answer: "Some common mistakes include not seeking feedback, fearing failure, neglecting networking, and focusing only on technical skills. Being open to learning and building relationships can significantly impact career growth."
        },
        {
            id: 5,
            question: "Do you have any book, course, or resource recommendations for my growth?",
            answer: "For personal growth, I recommend ‘Atomic Habits’ by James Clear. For career development, ‘The Lean Startup’ by Eric Ries is great. Online platforms like Coursera, Udemy, and LinkedIn Learning offer valuable courses too."
        }
    ];

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='min-h-[100vh] w-full flex justify-center py-10 md:py-14 bg-white'>
            <div className="w-[90%] md:w-[60%] flex flex-col">
                <h1 className='uppercase text-lg md:text-4xl font-bold text-center'>frequently asked questions</h1>
                <div className='w-full flex flex-col gap-8 mt-8 md:mt-16'>
                    {
                        mentorQnA.map((item,idx) => (
                            <div key={item.id} className='border-2 border-black py-8 px-6'>
                                <div className='flex items-center justify-between cursor-pointer' onClick={() => toggleQuestion(idx)}>
                                    <h3 className='uppercase md:text-lg font-semibold text-gray-800'>{item.question}</h3>
                                    <TiArrowSortedDown
                                        className={`text-3xl transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                                    />
                                </div>
                                <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-[200px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                    <p className='text-gray-600'>{item.answer}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Questions;
