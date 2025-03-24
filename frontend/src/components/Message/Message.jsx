import React, { useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';


function Message() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({}); // Stores messages for each chat

  const chatsData = {
    0: { id: 0, name: 'Md Alkama', lastSeen: '1 min ago', image: 'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2725&auto=format&fit=crop' },
    1: { id: 1, name: 'Mohammad Zaid Khan', lastSeen: '2 min ago', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop' },
    2: { id: 2, name: 'Shivangi Gupta', lastSeen: '3 mins ago', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=3087&auto=format&fit=crop' },
    3: { id: 3, name: 'Md Al Fahad Ahmad', lastSeen: '5 mins ago', image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2960&auto=format&fit=crop' },
    4:{ id: 4, name: 'Amir Siddiqui', lastSeen: '20 mins ago', image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=2732&auto=format&fit=crop' },
    5:{ id: 5, name: 'Priya Sharma', lastSeen: '30 mins ago', image: 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?q=80&w=2760&auto=format&fit=crop' },
    6:{ id: 6, name: 'Rahul Verma', lastSeen: '3 hours ago', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2760&auto=format&fit=crop' },
    7:{ id: 7, name: 'Ankit Raj', lastSeen: '6 hours ago', image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=2732&auto=format&fit=crop' },
    8:{ id: 8, name: 'Sneha Kumari', lastSeen: '12 hours ago', image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=2732&auto=format&fit=crop' }
  };

  const chats = Object.values(chatsData);

  // Function to send message
  const handleSendMessage = () => {
    if (message.trim() === "" || !selectedChat) return;

    setMessages(prevMessages => ({
      ...prevMessages,
      [selectedChat.id]: [...(prevMessages[selectedChat.id] || []), { text: message, sender: "You" }]
    }));

    setMessage("");
  };

  return (
    <div id='message' className='pt-[68px] bg-[#F7F5F0] h-[100vh] flex items-start justify-center'>
      <Chats chats={chats} onSelectChat={setSelectedChat} />

      {/* Chat Window */}
      {selectedChat 
      ?
        <div id="chat" className='fixed w-[100%] sm:static md:w-[calc(100%_-_400px)] min-h-[calc(100vh_-_68px)] flex flex-col h-[100%] border-[1px] border-gray-300 bg-[#F7F5F0]'>
          <div className='border-b-[1px] border-[#646464] text-[black] h-[60px] w-[100%] flex justify-start items-center px-4'>
            <IoIosArrowRoundBack className=' sm:hidden w-[46px] h-[46px] cursor-pointer mr-4' onClick={() => setSelectedChat(null)} />
            <div>
              <p className='text-[16px] font-bold'>{selectedChat.name}</p>
              <p className='text-[12px] font-normal'>Last seen {selectedChat.lastSeen}</p>
            </div>
          </div>

          {/* Messages Display */}
          <div className='h-[calc(100vh_-_188px)] w-[100%] overflow-y-auto p-4 flex flex-col gap-2'>
            {messages[selectedChat.id]?.map((msg, index) => (
              <div key={index} className={`p-2 rounded-md max-w-[80%] ${msg.sender === "You" ? "bg-blue-500 text-white self-end" : "bg-gray-200 self-start"}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className='h-[80px] w-[100%] flex justify-start items-center'>
            <textarea 
              className='h-[100%] w-[calc(100%_-_56px)] md:w-[calc(100%_-_100px)] border-[1px] border-[#646464] pt-[20px] p-2 outline-0 bg-white' 
              placeholder="Write a message..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' ? handleSendMessage()
                : null
              }
            ></textarea>
            <button 
              className='bg-black text-white h-[100%] w-[100px]' 
              onClick={()=>{
                handleSendMessage();
                toast.success("Message Sent!", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }}
            >
              Send
            </button>
            <ToastContainer />
          </div>
        </div>
        :
        <div className=' hidden fixed w-[100%] sm:static md:w-[calc(100%_-_400px)] min-h-[calc(100vh_-_68px)] sm:flex flex-col h-[100%] border-[1px] border-gray-300 bg-[#F7F5F0]'>
          <div className='border-b-[1px] border-[#646464] text-[black] h-[60px] w-[100%] flex justify-start items-center px-4'>
            <div>
              <p className='text-[16px] font-bold'>Chat</p>
            </div>
          </div>

          {/* Messages Display */}
          <div className='h-[calc(100vh_-_188px)] w-[100%] overflow-y-auto p-4 flex justify-center items-center flex-col gap-2'>
            Open a chat to start messaging.
          </div>
        </div>
      }
    </div>
  );
}

// Chats Component
function Chats({ chats, onSelectChat }) {
  return (
    <div id="chats" className='w-[100%] md:w-[400px] min-h-[calc(100vh_-_68px)] flex flex-col h-[100%] border-[1px] border-gray-300 bg-[#F7F5F0] overflow-y-auto'>
      <div className='border-b-[0.5px] border-black text-black shrink-0 h-[60px] w-[100%] flex justify-start items-center pl-4 font-bold'>
        Messaging
      </div>
      {chats.map((chat) => (
        <Chat key={chat.id} chat={chat} onClick={() => onSelectChat(chat)} />
      ))}
    </div>
  );
}

// Chat Component
function Chat({ chat, onClick }) {
  return (
    <div 
      className='border-[#646464] text-[black] h-[92px] w-[100%] gap-4 shrink-0 flex justify-start items-center pl-4 hover:bg-gray-100 transition duration-200 ease-in-out cursor-pointer'
      onClick={onClick}
    >          
      <button 
        className='h-[56px] w-[56px] rounded-full bg-gray-100 bg-center bg-cover'
        style={{ backgroundImage: `url(${chat.image})` }}
      ></button>
      
      <div className='flex flex-col w-[calc(100%_-_70px)] h-[100%] justify-center items-start border-b-[1px] border-gray-300'>
        <p className='text-[16px] font-bold'>{chat.name}</p>
        <p className='text-[12px] font-normal'>{chat.lastSeen}</p>
      </div>
    </div>
  );
}

export default Message;
