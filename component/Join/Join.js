import React, { useState } from 'react'
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

let user;


const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}


const Join = () => {

    const [name, setname] = useState("");
    // console.log("🚀 ~ file: Join.js:18 ~ Join ~ name", name)

    return (
        <>
            <section>
                <div className='bg-slate-300 h-[100vh] w-[100vw] flex flex-col justify-center space-y-10 lg:'>
                    <div>
                        <img src={logo} className="h-20 mx-auto" alt="logo" />
                        <h1 className='text-center text-2xl m-3 text-blue-600 font-semibold'>Messanger</h1>
                    </div>
                    <div className='px-10 flex flex-col justify-center space-y-4 w-auto lg:mx-96'>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Name" required onChange={(e) => setname(e.target.value)} id="joinInput" />
                        <Link className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center ' required onClick={sendUser} to="/chat" > Login
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Join
export { user }