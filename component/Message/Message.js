import React from 'react'

const Message = ({ user, message, classs }) => {
    if (user) {
        return (
            <span className='bg-slate-600 text-white p-2 rounded-md shadow-md shadow-slate-400 w-max '>
                {`${user}: ${message}`}
            </span>
        )
    } else {
        return (
            <span className='bg-blue-600 text-white p-2 rounded-md shadow-md shadow-slate-400 w-max self-end'>
                {`You: ${message}`}
            </span>
        )
    }
}

export default Message