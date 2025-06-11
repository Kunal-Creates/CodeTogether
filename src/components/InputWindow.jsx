import React from 'react'

const InputWindow = ({ setInput }) => {

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className='h-full'>
      <textarea 
        aria-label="Input Window"
        placeholder="Enter your input here..."
        className='w-full h-64 p-4 bg-slate-900/50 text-slate-200 placeholder-slate-500 rounded-lg border border-slate-700/50 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 resize-none font-mono text-sm backdrop-blur-sm transition-colors'
        onChange={handleInputChange}
      />
    </div>
  )
}

export default InputWindow