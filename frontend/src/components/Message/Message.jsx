import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from '../../firebase';
import { doc, getDoc, onSnapshot, updateDoc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { v4 as uuid } from 'uuid';



function Message() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState({});
  const [chatss, setChatss] = useState([])

  // this is done because of a problem when we send message it do not show the last message so now if user sends any message then then tit will show the last message
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  // it fetch the current user data from firebase 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);


  // it will fetch the chats data fof the current loggedin user from firebase

  useEffect(() => {
    if (!user || !user.userid) return;

    const unsub = onSnapshot(doc(db, "userChats", user.userid), (docSnap) => {
      if (docSnap.exists()) {
        setChats(docSnap.data());
      } else {
        console.warn("No chat data found.");
        setChats({});
      }
    });

    return () => unsub();
  }, [user]);


  // it will show the particurlar chat for selected user

  useEffect(() => {
    if (!selectedChat) return;

    const unSub = onSnapshot(doc(db, "chats", selectedChat[0]), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
      } else {
        setMessages([]);
      }
    });

    return () => {
      unSub();
    };
  }, [selectedChat]);

  // when we click on messaege send button then it will handle the message sending 

  const handleSendMessage = async () => {
    if (!message) return;

    try {
      const chatRef = doc(db, "chats", selectedChat[0]);

      await updateDoc(chatRef, {
        messages: arrayUnion({
          id: uuid(),
          text: message,
          senderId: user.userid,
          date: Timestamp.now(),
        }),
      });


      await updateDoc(doc(db, "userChats", user.userid), {
        [selectedChat[0] + ".lastMessage"]: {
          message,
        },
        [selectedChat[0] + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", selectedChat[1].userInfo.userid), {
        [selectedChat[0] + ".lastMessage"]: {
          message,
        },
        [selectedChat[0] + ".date"]: serverTimestamp(),
      });
      // Clear input after sending
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div id='message' className='pt-[68px] bg-[#F7F5F0] h-[100vh] flex items-start justify-center'>
      <div id="chats" className='w-[100%] md:w-[400px] min-h-[calc(100vh_-_68px)] flex flex-col h-[100%] border-[1px] border-gray-300 bg-[#F7F5F0] overflow-y-auto'>
        <div className='border-b-[0.5px] border-black text-black shrink-0 h-[60px] w-[100%] flex justify-start items-center pl-4 font-bold'>
          Messaging
        </div>
        {/* load chays */}
        {/* if there is no user then it display normal no chat available otheriwse it will fetch the data and show in chats section  */}
        {Object.entries(chats)?.length === 0 && <p className='text-[16px] font-bold text-center mt-[25px]'>No Chats Available</p>}
        {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
          <Chat key={chat[0]} chat={chat} onClick={() => {
            setSelectedChat(chat);
          }
          } />
        ))}
      </div>

      {/* chats Window For Private user*/}
      {/* if user select the people to chat then this windown will open or fetch */}
      {selectedChat
        ?
        <div id="chat" className='fixed w-[100%] sm:static md:w-[calc(100%_-_400px)] min-h-[calc(100vh_-_68px)] flex flex-col h-[100%] border-[1px] border-gray-300 bg-[#F7F5F0]'>
          <div className='border-b-[1px] border-[#646464] text-[black] h-[60px] w-[100%] flex justify-start items-center px-4'>
            <IoIosArrowRoundBack className=' sm:hidden w-[46px] h-[46px] cursor-pointer mr-4' onClick={() => setSelectedChat(null)} />
            <div>
              <p className='text-[16px] font-bold'>{selectedChat[1].userInfo.name}</p>
            </div>
          </div>

          {/* Messages Display */}
          <div className='h-[calc(100vh_-_188px)]  md:h-[calc(100vh_-_168px)] w-[100%] overflow-y-auto p-4 flex flex-col gap-4'>

            {messages?.map((m) => (
              <div
                key={m.id}
              >
                {m.senderId === user.userid ? <p className="text-xs w-[100%] text-end pr-2"  >{user.name}</p> : <p className="text-xs w-[100%] text-start pr-2"  >{selectedChat[1].userInfo.name}</p>}

                <p

                  className={`max-w-[80 lg:max-w-[45%] flex items-center px-2 rounded-lg p-3
                ${m.senderId === user.userid ? "justify-start justify-self-end bg-[#3CCE92] text-black pr-2 md:pr-20" : "justify-start justify-self-start bg-[#3CCE92] text-black pl-2  md:pr-20 md:pl-4"}`}
                >
                  {m.text}
                </p>
              </div>
            ))}
            <div ref={ref} />
          </div>

          {/* Message Input */}
          <div className='h-[60px] w-[100%] flex justify-start items-center'>
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
              onClick={() => {
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

          {/* if user is not selected then it will show this */}
          <div className='h-[calc(100vh_-_188px)] w-[100%] overflow-y-auto p-4 flex justify-center items-center flex-col gap-2'>
            Open a chat to start messaging.
          </div>
        </div>
      }
    </div>
  );
}

// Chat Component
function Chat({ chat, onClick, key }) {
  return (
    <div
      key={key}
      className='border-[#646464] text-[black] h-[92px] w-[100%] gap-4 shrink-0 flex justify-start items-center pl-4 hover:bg-gray-100 transition duration-200 ease-in-out cursor-pointer'
      onClick={onClick}
    >
      {chat[1].userInfo.profile ? <button
        className='h-[56px] w-[56px] rounded-full bg-gray-100 bg-center bg-cover'
        style={{ backgroundImage: `url(${chat[1].userInfo.profile})` }}

      ></button> :
        <button
          className='h-[56px] w-[56px] rounded-full bg-gray-100 bg-center bg-cover bg-[url(https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png)]'

        ></button>}


      <div className='flex flex-col w-[calc(100%_-_70px)] h-[100%] justify-center items-start border-b-[1px] border-gray-300'>
        <p className='text-[16px] font-bold'>{chat[1].userInfo.name}</p>
        {chat[1].lastMessage ?
          <p className='text-[12px] font-normal'>{chat[1].lastMessage.message}</p>

          :
          null
        }
      </div>
    </div>
  );
}

export default Message;