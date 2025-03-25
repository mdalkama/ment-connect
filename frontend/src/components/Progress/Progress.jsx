import React from 'react'
import { FaPlus } from 'react-icons/fa6';

function Progress() {

    const task = [
        {
            title: 'Task title',
            status: 'Pending',
            description: 'Task descriptionTask descriptionTask descriptionTask descriptionTask descriptionTask descriptionTask description sjcbjsdvjhgskjgvjktext-ellipsistext-ellipsis'
        },
        {
            title: 'Task title',
            status: 'Pending',
            description: 'Task descriptionTask descriptionTask descriptionTask descriptionTask descriptionTask descriptionTask description sjcbjsdvjhgskjgvjktext-ellipsistext-ellipsis'
        },
        {
            title: 'Task title',
            status: 'Pending',
            description: 'Task descriptionTask descriptionTask descriptionTask descriptionTask descriptionTask descriptionTask description sjcbjsdvjhgskjgvjktext-ellipsistext-ellipsis'
        },
        {
            title: 'Task title',
            status: 'Pending',
            description: 'Task descriptionTask descriptionTask descriptionTask descriptionTask descriptionTask descriptionTask description sjcbjsdvjhgskjgvjktext-ellipsistext-ellipsis'
        }
    ]

    return (
        <>
            <div className='min-h-[100vh] w-[100vw]'>
                <div className='p-6'>
                    <div className='w-[100%] flex justify-between items-center py-2 border-b-2 border-black'>
                        <h1 className='md:text-3xl text-2xl font-bold'>My Goals</h1>
                        <button onClick={() => {
                            openProfileToggle()
                            scrollToggle()
                        }} className='bg-black text-white sm:px-4 sm:py-3 px-2 py-1 flex items-center gap-2 md:rounded-lg rounded sm:font-medium text-sm md:text-xl'>
                            Add a goal <FaPlus />
                        </button>
                    </div>

                    <div className='w-full max-h-[100vh] overflow-auto'>
                        <div className='md:flex items-center justify-between mt-10'>
                            <p className='md:text-2xl -mb-[20px] text-lg font-semibold text-nowrap'>Daily Task</p>
                            <div className='md:w-[75%] w-full'>
                                <h3 className='text-end text-xs font-semibold'>50% out of 100%</h3>
                                <div className='h-5 w-full bg-gray-200 mt-2 rounded-full'>
                                    <div className='h-full w-[16%] bg-black rounded-full'></div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full grid sm:grid-cols-2 max-sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 max-h-[100vh] mt-10 p-2 gap-4'>
                            {
                                task.map((task, index) => {
                                    return <div key={index} className='flex justify-center'>
                                        <div className='max-sm:w-[300px] max-md:min-w-[240px]  xl:min-w[300px] p-4 rounded-lg flex flex-col gap-1 bg-white shadow-lg'>
                                            <h2 className='text-xl font-medium'>{task.title}</h2>
                                            <h3 className='font-semibold'>Status : <span className='text-red-600 font-medium'>{task.status}</span></h3>
                                            <p className='text-sm h-[60px] overflow-hidden'>{task.description}</p>
                                            <div className='mt-2 w-full flex justify-end gap-8'>
                                                <button className='bg-[#f44336] font-bold text-sm text-white px-4 py-2 rounded-lg'>Delete</button>
                                                <button className='bg-[#04AA6D] font-bold text-sm text-white px-4 py-2 rounded-lg'>Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>

                    <div className='w-full max-h-[100vh] overflow-auto'>
                        <div className='md:flex items-center justify-between mt-10'>
                            <p className='md:text-2xl -mb-[20px] text-lg font-semibold text-nowrap'>Monthly Task</p>
                            <div className='md:w-[75%] w-full'>
                                <h3 className='text-end text-xs font-semibold'>50% out of 100%</h3>
                                <div className='h-5 w-full bg-gray-200 mt-2 rounded-full'>
                                    <div className='h-full w-[16%] bg-black rounded-full'></div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-h-[100vh] mt-10 p-2 gap-4'>

                            {
                                task.map((task, index) => {
                                    return <div key={index} className='flex justify-center'>
                                        <div className='max-sm:w-[300px]  xl:min-w[300px] p-4 rounded-lg flex flex-col gap-1 bg-white shadow-lg'>
                                            <h2 className='text-xl font-medium'>{task.title}</h2>
                                            <h3 className='font-semibold'>Status : <span className='text-red-600 font-medium'>{task.status}</span></h3>
                                            <p className='text-sm h-[60px] overflow-hidden'>{task.description}</p>
                                            <div className='mt-2 w-full flex justify-end gap-8'>
                                                <button className='bg-[#f44336] font-bold text-sm text-white px-4 py-2 rounded-lg'>Delete</button>
                                                <button className='bg-[#04AA6D] font-bold text-sm text-white px-4 py-2 rounded-lg'>Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* {openProfile && 
          <AddGoal resetForm={resetForm} editIndex={editIndex} handleSubmit={handleSubmit} title={title}  description={description} status={status} tag={tag} />} */}
        </>
    )
}

export default Progress








function AddGoal(props) {
    return (
        <div className='w-full h-[100vh] fixed top-0 left-0 bg-[#0000005a] flex justify-center items-center z-[100]'>
            <div className='bg-white w-full md:w-[50%] md:h-[90%] h-full rounded overflow-hidden relative'>
                <button className='absolute top-0 right-0 h-[65px] w-[65px] rounded-tr-xl text-3xl flex justify-center items-center' onClick={props.resetForm}>
                    <IoMdClose />
                </button>
                <h3 className='text-center py-4 text-xl font-bold border-b-2'>{props.editIndex !== null ? 'Edit Goal' : 'Add Goal'}</h3>

                <div className='w-full flex flex-col items-center'>
                    <form className='my-4 md:flex flex-col items-center grow h-[100%] w-[90%]' onSubmit={props.handleSubmit}>
                        <div className='flex flex-col w-[100%]'>
                            <label htmlFor="name" className='text-sm font-normal'>Task Title</label>
                            <input
                                type="text"
                                id='name'
                                name='name'
                                value={props.title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Task title'
                                className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'
                            />
                        </div>

                        <div className='flex flex-col w-[100%] mt-4'>
                            <label className='text-sm font-normal'>Task Description</label>
                            <textarea
                                value={props.description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                                cols="50"
                                placeholder='Task Description'
                                className='border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'>
                            </textarea>
                        </div>

                        {props.editIndex !== null ? <div className='flex flex-col w-full mt-4'>
                            <label htmlFor="status" className='text-sm font-normal'>Status</label>
                            <select id="status"
                                value={props.status} // Controlled input
                                onChange={(e) => setStatus(e.target.value)}
                                className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div> : ''}

                        {props.editIndex !== null ? '' : <div className='flex flex-col w-full mt-4'>
                            <label htmlFor="status" className='text-sm font-normal'>Tag</label>
                            <select id="tag"
                                value={props.tag} // Controlled input
                                onChange={(e) => setTag(e.target.value)}
                                className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'>
                                <option>Daily</option>
                                <option>Monthly</option>
                            </select>
                        </div>}

                        <button type='submit' className='mt-8 bg-[#0468BF] text-white p-2 w-[100%] rounded-xl font-normal'>
                            {props.editIndex !== null ? 'Update Goal' : 'Save Goal'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}


function Task(props) {
    return (
        <div key={props.index} className='shadow-lg bg-zinc-100 flex flex-col p-4 sm:min-w-[250px] md:min-w-[230px] max-sm:w-[300px] lg:min-w-[250px] rounded-lg'>
            <h3 className='font-semibold text-lg capitalize'>{props.goal.title}</h3>
            <p className='font-semibold text-gray-700 text-md'>Status: <span className='text-sm text-red-600'>{props.goal.status}</span></p>
            <p className='font-semibold'>Description: <span className='font-normal text-sm'>{props.goal.description}</span></p>
            <p className='font-semibold'><span className='font-normal text-sm'>{props.goal.tag}</span></p>
            <div className='flex justify-end mt-4 gap-4'>
                <button onClick={() => deleteGoal(index)} className='bg-red-500 text-white font-semibold text-sm px-3 py-2 rounded'>Delete</button>
                <button onClick={() => editGoal(index)} className='bg-green-500 text-white font-semibold text-sm px-3 py-2 rounded'>Edit</button>
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