import React from 'react'
import { FaPhone } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";




function Message() {
  const chatsData = {
    0:{
      id: 0,
      name: 'Md Alkama',
      lastSeen: '1 min ago',
      image: 'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    1:{
      id: 1,
      name: 'Mohammad Zaid Khan',
      lastSeen: '1 hours ago',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    2:{
      id: 2,
      name: 'Shivangi Gupta',
      lastSeen: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    3:{
      id: 3,
      name: 'Md Al Fahad Ahmad',
      lastSeen: '8 hours ago',
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  }
const chats = Object.values(chatsData);
  const data = localStorage.getItem('user')
  const user = JSON.parse(data)
  return (
    <div id='message' className='pt-[68px] h-[100vh] flex items-start justify-center'>

    <Chats chats = {chats}/>

      {/* message */}
      <div id="chat" className='w-[100%] md:w-[calc(100%_-_400px)] min-h-[calc(100vh_-_68px)] flex flex-col h-[100%] border-[1px] border-gray-300 bg-white'>
        <div className='border-b-[1px] border-[#646464] text-[black] h-[60px] w-[100%] flex  justify-start items-center px-4'>         
          <IoIosArrowRoundBack className='w-[46px] h-[46px] cursor-pointer mr-4'/>
        <div className=''>
        <p className='text-[16px] font-bold'>Md Alkama</p>
        <p className='text-[12px] font-normal'>Last seen 2 hours ago</p>
        </div>

    </div>
    <div className='h-[calc(100vh_-_188px)] w-[100%] overflow-y-auto bg-cover bg-center'></div>
    <div className='h-[80px] w-[100%] flex justify-start items-center'>
      <textarea className='h-[100%] w-[calc(100%_-_56px)] md:w-[calc(100%_-_100px)])] border-[1px] border-[#646464] pt-[20px] p-2 outline-0 bg-white' name="message" id="message" placeholder="write a message..."></textarea>
      <button className='bg-black text-white h-[100%] w-[100px]'>Send</button>
    </div>

      </div>
    </div>
  )
}




function Chats(props){
  return(
      <div id="chats" className='w-[100%] md:w-[400px] min-h-[calc(100vh_-_68px)] flex flex-col h-[100%] border-[1px] border-gray-300 bg-white  overflow-y-auto'>
        <div className='border-b-[0.5px] border-black text-black shrink-0 h-[60px] w-[100%] flex justify-start items-center pl-4 font-bold'> Messaging </div>
        {props.chats.map((chats) => {
          return (
            <Chat chats= {chats}/>
          )
        })}


      </div>
  )
}


function Chat(props){
  console.log(props.chats)
  return (
    <div className='border-[#646464] text-[black] h-[92px] w-[100%] gap-4 shrink-0 flex justify-start items-center pl-4 hover:bg-gray-100 transition duration-200 ease-in-out cursor-pointer'>          
      <button 
      className='h-[56px] w-[56px] rounded-full bg-gray-100 bg-center bg-cover'
      style={{backgroundImage: `url(${props.chats.image})`}}
      ></button>
      
      <div
      className='flex flex-col w-[calc(100%_-_70px)] h-[100%] justify-center items-start border-b-[1px] border-gray-300'>
        <p className='text-[16px] font-bold'>{props.chats.name}</p>
        <p className='text-[12px] font-normal'>{props.chats.lastSeen}</p>
      </div>
    </div>
  )
}



export default Message