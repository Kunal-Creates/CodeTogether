import React, { memo } from 'react'
import Avatar from 'react-avatar';

const Client = memo(({ username = '', color = ''}) => {

  return (
    <div className='flex items-center space-x-2 bg-slate-700/50 rounded-full px-3 py-2 backdrop-blur-sm border border-slate-600/50 hover:bg-slate-600/50 transition-colors'>
        <Avatar name={username} size={28} round='50%' color={color} className="ring-2 ring-slate-500/30"/>
        <span className="text-xs font-medium text-slate-200 truncate max-w-16">{username}</span>
    </div>
  )
});

export default Client