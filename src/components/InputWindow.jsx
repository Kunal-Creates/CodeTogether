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
        className='w-full h-full p-3 bg-[#2d2d2d] text-gray-200 placeholder-gray-500 rounded border border-[#3e3e3e] focus:border-[#4a90e2] focus:outline-none resize-none font-mono text-sm'
        onChange={handleInputChange}
      />
    </div>
  )
}

export default InputWindow