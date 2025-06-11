import React, { memo } from 'react'
import Avatar from 'react-avatar';

const Client = memo(({ username = '', color = ''}) => {

  return (
    <div className='flex items-center space-x-2 bg-slate-700/50 rounded-full px-3 py-1 backdrop-blur-sm border border-slate-600/50'>
        <Avatar name={username} size={32} round='50%' color={color} className="ring-2 ring-slate-600/50"/>
        <span className="text-sm font-medium text-slate-200 truncate max-w-20">{username}</span>
    </div>
  )
});

export default Client