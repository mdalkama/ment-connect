import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

export default function Progress() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('daily');
    const [status, setStatus] = useState('Pending');
    const [dailyTask, setDailyTask] = useState([]);
    const [monthlyTask, setMonthlyTask] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editTag, setEditTag] = useState(null);
    const [dailyCompletedTask, setDailyCompletedTask] = useState(0);
    const [monthlyCompletedTask, setMonthlyCompletedTask] = useState(0);

    console.log(`daily completed task ${dailyCompletedTask}`);
    // console.log(`monthly completed task ${monthlyCompletedTask}`);

    const editGoal = (task, index, tag) => {
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setEditIndex(index);
        setEditTag(tag);
    }

    const handleTaskSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            title: title,
            description: description,
            tag: tag,
            status: status
        }

        if (editIndex !== null) {
            if (editTag === 'daily') {
                const updatedDailyTask = [...dailyTask];
                updatedDailyTask[editIndex] = newTask;
                setDailyTask(updatedDailyTask);
                if (status === 'completed') {
                    setDailyCompletedTask(dailyCompletedTask + 1);
                }
            } else if (editTag === 'monthly') {
                const updatedMonthlyTask = [...monthlyTask];
                updatedMonthlyTask[editIndex] = newTask;
                setMonthlyTask(updatedMonthlyTask);
                if (status === 'completed') {
                    setMonthlyCompletedTask(monthlyCompletedTask + 1);
                }
            }
            setEditIndex(null);
            setEditTag(null);
        } else {
            if (tag === 'daily') {
                setDailyTask([...dailyTask, newTask]);
            }
            else if (tag === "monthly") {
                setMonthlyTask([...monthlyTask, newTask]);
            }

        }

        setTitle('');
        setDescription('');
        setTag('daily');
        setStatus('Pending');
        setEditIndex(null);
        setEditTag('daily');

    }
    if (dailyTask.length != 0) {
        const width = (dailyCompletedTask / dailyTask.length) * 100
        console.log(width)
    }

    else {
        const width = 0;
        console.log(width)
    }

    const handleDeleteDaily = (index) => {
        const updatedDaily = dailyTask.filter((_, i) => i !== index);
        setDailyTask(updatedDaily);
        setDailyCompletedTask(dailyCompletedTask - 1);
    }

    const handleDeleteMonthly = (index) => {
        const updatedMonthly = monthlyTask.filter((_, i) => i !== index);
        setMonthlyTask(updatedMonthly);
        setMonthlyCompletedTask(monthlyCompletedTask - 1);
    }

    const [openProfile, setOpenProfile] = useState(false);
    const [scroll, setScroll] = useState(true);
    const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);

    const scrollToggle = () => {
        setScroll(!scroll);
    };

    const openProfileToggle = () => {
        setOpenProfile(!openProfile);
    }

    const openEditProfileToggle = () => {
        setIsOpenEditProfile(!isOpenEditProfile);
    }


    { scroll ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden" }

    return (
        <>
            <div className='min-h-[100vh] w-[100vw]'>
                <div className='p-6'>
                    <div className='w-[100%] flex justify-between items-center py-2 border-b-2 border-black'>
                        <h1 className='md:text-3xl text-2xl font-bold'>My Goals</h1>
                        <button onClick={() => {
                            openProfileToggle()
                            scrollToggle()
                        }} className='bg-gray-800 text-white sm:px-4 sm:py-3 px-2 py-1 flex items-center gap-2 md:rounded-lg rounded sm:font-medium text-sm md:text-xl'>
                            Add a goal <FaPlus />
                        </button>
                    </div>

                    <div className='w-full max-h-[100vh] overflow-auto'>
                        <div className='md:flex items-center justify-between mt-10'>
                            <p className='md:text-2xl -mb-[20px] text-lg font-bold text-nowrap'>Daily Task</p>
                            <div className='md:w-[75%] w-full'>
                                <h3 className='text-end text-xs font-semibold'>50% out of 100%</h3>
                                <div className='h-5 w-full bg-gray-200 mt-2 rounded-full'>
                                    <div style={{ width: `${dailyTask.length > 0 ? dailyCompletedTask / dailyTask.length * 100 : 0}%` }} className="h-full bg-[#04AA6D] rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {dailyTask.length > 0 ? (
                            <div className='w-full grid sm:grid-cols-2 max-sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 max-h-[100vh] mt-10 p-2 gap-4'>
                                {
                                    dailyTask.map((task, index) => {
                                        return <div key={index} className='max-sm:flex max-sm:justify-center'>
                                            <div className='max-sm:w-[300px] max-md:min-w-[240px]  xl:min-w[300px] p-4 rounded-lg flex flex-col gap-1 bg-white shadow-lg'>
                                                <h2 className='text-2xl font-medium'>{task.title}</h2>
                                                <h3 className='font-semibold'>Status : <span className='text-red-600 font-medium'>{task.status}</span></h3>
                                                <p className='text-sm h-[60px] overflow-hidden'>{task.description}</p>
                                                <div className='mt-2 w-full flex justify-end gap-8'>
                                                    <button
                                                        onClick={() => {
                                                            handleDeleteDaily(index)
                                                        }}
                                                        className='bg-[#f44336] font-bold text-sm text-white px-4 py-2 rounded-lg'>Delete</button>
                                                    <button
                                                        onClick={() => {
                                                            openEditProfileToggle()
                                                            editGoal(task, index, "daily")
                                                            scrollToggle()
                                                        }}
                                                        className={`bg-[#04AA6D] font-bold text-sm text-white px-4 py-2 rounded-lg`}>Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        ) :
                            <div className='w-full h-[100px] bg-gray-100 rounded-lg md:h-[200px] mt-5 flex items-center justify-center'>
                                <h3 className='md:text-2xl text-lg font-semibold'>No daily task available</h3>
                            </div>}
                    </div>

                    <div className='w-full max-h-[100vh] overflow-auto'>
                        <div className='md:flex items-center justify-between mt-10'>
                            <p className='md:text-2xl -mb-[20px] text-lg font-bold text-nowrap'>Monthly Task</p>
                            <div className='md:w-[75%] w-full'>
                                <h3 className='text-end text-xs font-semibold'>50% out of 100%</h3>
                                <div className='h-5 w-full bg-gray-200 mt-2 rounded-full'>
                                    <div className='h-full w-[16%] bg-[#04AA6D] rounded-full'></div>
                                </div>
                            </div>
                        </div>

                        {monthlyTask.length > 0 ? (
                            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-h-[100vh] mt-10 p-2 gap-4'>

                                {
                                    monthlyTask.map((task, index) => {
                                        return <div key={index} className=' max-sm:flex max-sm:justify-center'>
                                            <div className='max-sm:w-[300px]  xl:min-w[300px] p-4 rounded-lg flex flex-col gap-1 bg-white shadow-lg'>
                                                <h2 className='text-2xl font-medium'>{task.title}</h2>
                                                <h3 className='font-semibold'>Status : <span className='text-red-600 font-medium'>{task.status}</span></h3>
                                                <p className='text-sm h-[60px] overflow-hidden'>{task.description}</p>
                                                <div className='mt-2 w-full flex justify-end gap-8'>
                                                    <button
                                                        onClick={() => {
                                                            handleDeleteMonthly(index);
                                                        }}
                                                        className='bg-[#f44336] font-bold text-sm text-white px-4 py-2 rounded-lg'>Delete</button>
                                                    <button
                                                        onClick={() => {
                                                            openEditProfileToggle()
                                                            editGoal(task, index, "monthly")
                                                            scrollToggle()
                                                        }}
                                                        className='bg-[#04AA6D] font-bold text-sm text-white px-4 py-2 rounded-lg'>Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        ) :
                            <div className='w-full bg-gray-100 rounded-lg h-[100px] md:h-[200px] mt-5 flex items-center justify-center'>
                                <h3 className='md:text-2xl text-lg font-semibold'>No monthly task available</h3>
                            </div>}
                    </div>
                </div>
            </div>

            {openProfile ?
                <AddGoal
                    openProfileToggle={openProfileToggle}
                    openProfile={openProfile}
                    scrollToggle={scrollToggle}
                    title={title} setTitle={setTitle}
                    description={description} setDescription={setDescription}
                    tag={tag} setTag={setTag}
                    status={status} setStatus={setStatus}
                    handleTaskSubmit={handleTaskSubmit}
                /> : null}

            {isOpenEditProfile ?
                <EditGoal
                    openEditProfileToggle={openEditProfileToggle}
                    isOpenEditProfile={isOpenEditProfile}
                    scrollToggle={scrollToggle}
                    title={title} setTitle={setTitle}
                    description={description} setDescription={setDescription}
                    tag={tag} setTag={setTag}
                    status={status} setStatus={setStatus}
                    handleTaskSubmit={handleTaskSubmit}
                /> : null
            }
        </>
    )
}

function AddGoal(props) {
    return (
        <div className='w-full h-[100vh] fixed top-0 left-0 bg-[#0000005a] flex justify-center items-center z-[100]'>
            <div className='bg-white w-full md:w-[50%] md:h-[90%] h-full rounded overflow-hidden relative'>
                <button
                    onClick={() => {
                        props.openProfileToggle()
                        props.scrollToggle()
                    }}
                    className='absolute top-0 right-0 h-[65px] w-[65px] rounded-tr-xl text-3xl flex justify-center items-center' >
                    <IoMdClose />
                </button>
                <h3 className='text-center py-4 text-xl font-bold border-b-2'>Add Goal</h3>

                <div className='w-full flex flex-col items-center'>
                    <form className='my-4 md:flex flex-col items-center grow h-[100%] w-[90%]' onSubmit={props.handleSubmit}>
                        <div className='flex flex-col w-[100%]'>
                            <label htmlFor="name" className='text-sm font-normal'>Task Title</label>
                            <input
                                type="text"
                                id='name'
                                name='name'
                                value={props.title}
                                onChange={(e) => props.setTitle(e.target.value)}
                                placeholder='Task title'
                                className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'
                            />
                        </div>

                        <div className='flex flex-col w-[100%] mt-4'>
                            <label className='text-sm font-normal'>Task Description</label>
                            <textarea
                                value={props.description}
                                onChange={(e) => props.setDescription(e.target.value)}
                                rows="4"
                                cols="50"
                                placeholder='Task Description'
                                className='border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'>
                            </textarea>
                        </div>

                        <div className='flex flex-col w-full mt-4'>
                            <label htmlFor="status" className='text-sm font-normal'>Tag</label>
                            <select id="tag"
                                defaultValue="daily"
                                value={props.tag} // Controlled input
                                onChange={(e) => props.setTag(e.target.value)}
                                className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'>
                                <option>daily</option>
                                <option>monthly</option>
                            </select>
                        </div>

                        <button onClick={(e) => {
                            props.handleTaskSubmit(e)
                            props.openProfileToggle()
                            props.scrollToggle()
                        }} type='submit' className='mt-8 bg-[#0468BF] text-white p-2 w-[100%] rounded-xl font-semibold'>
                            Add Goal
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}


function EditGoal(props) {
    return (
        <div className='w-full h-[100vh] fixed top-0 left-0 flex justify-center bg-[#0000005a] items-center z-[100]'>
            <div className='bg-white w-full md:w-[50%] md:h-[90%] h-full rounded overflow-hidden relative'>
                <button
                    onClick={() => {
                        props.openEditProfileToggle()
                        console.log(props.isOpenEditProfile)
                        props.scrollToggle()
                    }}
                    className='absolute top-0 right-0 h-[65px] w-[65px] rounded-tr-xl text-3xl flex justify-center items-center' >
                    <IoMdClose />
                </button>
                <h3 className='text-center py-4 text-xl font-bold border-b-2'>Edit Goal</h3>
                <div className='w-full flex flex-col items-center'>
                    <form className='my-4 md:flex flex-col items-center grow h-[100%] w-[90%]'>
                        <div className='flex flex-col w-[100%]'>
                            <label htmlFor="name" className='text-sm font-normal'>Task Title</label>
                            <input
                                type="text"
                                id='name'
                                name='name'
                                value={props.title}
                                onChange={(e) => props.setTitle(e.target.value)}
                                placeholder='Task title'
                                className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'
                            />
                        </div>

                        <div className='flex flex-col w-[100%] mt-4'>
                            <label className='text-sm font-normal'>Task Description</label>
                            <textarea
                                value={props.description}
                                onChange={(e) => props.setDescription(e.target.value)}
                                rows="4"
                                cols="50"
                                placeholder='Task Description'
                                className='border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'>
                            </textarea>
                        </div>

                        <div className='flex flex-col w-full mt-4'>
                            <label htmlFor="status" className='text-sm font-normal'>status</label>
                            <select id="status"
                                defaultValue="pending"
                                value={props.status} // Controlled input
                                onChange={(e) => props.setStatus(e.target.value)}
                                className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'>
                                <option>pending</option>
                                <option>completed</option>
                            </select>
                        </div>

                        <button onClick={(e) => {
                            props.openEditProfileToggle();
                            props.scrollToggle()
                            props.handleTaskSubmit(e);
                        }} type='submit' className='mt-8 bg-[#0468BF] text-white p-2 w-[100%] rounded-xl font-semibold'>
                            Edit Goal
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}



















// const [openProfile, setOpenProfile] = useState(false);
// const [scroll, setScroll] = useState(true);
// const [goals, setGoals] = useState([]);
// const [title, setTitle] = useState('');
// const [description, setDescription] = useState('');
// const [status, setStatus] = useState("");
// const [tag, setTag] = useState("");
// const [editIndex, setEditIndex] = useState(null);
// const [totalDayLength, setTotalDayLength] = useState(0);

// const scrollToggle = () => setScroll(!scroll);
// const openProfileToggle = () => setOpenProfile(!openProfile);

// scroll ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden";

// const handleSubmit = (e) => {
//   e.preventDefault();

//   if (!title.trim()) return alert("Task title is required!");
//   if (editIndex !== null) {
//     const updatedGoals = [...goals];
//     updatedGoals[editIndex] = newGoal;
//     setGoals(updatedGoals);
//     setEditIndex(null);
//   } else {
//     setGoals([...goals, newGoal]);
//   }

//   resetForm();
// };




// const newGoal = {
//   day: [
//     {
//       title: "task1",
//       description: "task2",
//       status: "pending",
//       tag: "day",
//     },
//     {
//       title: "task2",
//       description: "task2",
//       status: "pending",
//       tag: "day",
//     },
//     {
//       title: "task3",
//       description: "task3",
//       status: "pending",
//       tag: "day",
//     },
//     {
//       title: "task4",
//       description: "task4",
//       status: "pending",
//       tag: "day",
//     },
//     {
//       title: "task5",
//       description: "task5",
//       status: "pending",
//       tag: "day",
//     }
//   ],
//   month: [
//     {
//       title: "task1",
//       description: "task2",
//       status: "pending",
//       tag: "month",
//     },
//     {
//       title: "task2",
//       description: "task2",
//       status: "pending",
//       tag: "month",
//     },
//     {
//       title: "task3",
//       description: "task3",
//       status: "pending",
//       tag: "month",
//     },
//     {
//       title: "task4",
//       description: "task4",
//       status: "pending",
//       tag: "month",
//     },
//     {
//       title: "task5",
//       description: "task5",
//       status: "pending",
//       tag: "month",
//     }
//   ]
// }


// const resetForm = () => {
//   setTitle('');
//   setDescription('');
//   setStatus('');
//   setTag('');
//   setOpenProfile(false);
//   setScroll(true);
// };

// const deleteGoal = (index) => {
//   const updatedGoals = goals.filter((_, i) => i !== index);
//   setGoals(updatedGoals);
// };

// const editGoal = (index) => {
//   const goal = goals[index];
//   setTitle(goal.title);
//   setDescription(goal.description);
//   setStatus(goal.status);
//   setTag(goal.tag);
//   setEditIndex(index);
//   setOpenProfile(true);
//   setScroll(false);
// };