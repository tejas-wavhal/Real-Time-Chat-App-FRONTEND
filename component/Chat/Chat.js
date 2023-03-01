import React, { useEffect, useState } from 'react'
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import logo from "../../images/logo.png";

let socket;

const ENDPOINT = "https://messanger-cvb3.onrender.com/";

const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([])

  const send = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', { message, id });
    document.getElementById('chatInput').value = "";
  }

  // console.log(messages);
  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ['websocket'] }); //SOCKET CREATED

    socket.on('connect', () => { //IF SOCKET IS CONNECTED THEN DO THIS
      // alert('Connected');
      setid(socket.id);

    })
    // console.log(socket);
    socket.emit('joined', { user }) //EMIT MEANS SEND MESSAGE TO SERVER FROM HERE & ON MEANS RECIEVING DATA
    socket.on('welcome', (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    })

    socket.on('userJoined', (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    })



    return () => {
      socket.emit('disconnected');
      socket.off();
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    socket.on('sendMessage', (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message, data.id);
    })
    return () => {
      socket.off();
    }
  }, [messages])

  // console.log(messages)

  return (
    <>
      <section className='h-[100vh] w-[100vw] relative bg-slate-600 lg:mx-auto flex flex-col justify-center items-center' >
        <div className=' h-[100%] w-[100%] lg:w-[30%]'>
          <header className=' bg-blue-600 text-white px-3 flex items-center font-medium h-[7%]'>
            <img src={logo} className='h-8 ' alt="logo" />
            <h1 className='text-2xl'>Messanger </h1>
          </header>
          <ReactScrollToBottom className='overflow-y-auto bg-slate-300 h-[83%] p-4 '>
            <div className='flex flex-col space-y-4'>
              {messages.map((item, i) => <Message key={i} user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? '' : ''} />)}
            </div>
          </ReactScrollToBottom>
          <div className='px-2 h-[10%] bg-slate-300 flex flex-col justify-center mb-10'>
            <div className="relative bottom-10 lg:bottom-0">
              <input type="text" id="chatInput" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type a Message..." />
              <button onClick={send} className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Send</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Chat