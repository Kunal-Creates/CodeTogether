import React from "react";

const OutputWindow = ({ outputDetails }) => {

  return (
    <div className='h-full'>
      <div className="h-full bg-[#2d2d2d] rounded border border-[#3e3e3e] text-gray-200 font-mono text-sm overflow-y-auto">
        {outputDetails ? 
        <>
          <pre className="p-3 whitespace-pre-wrap break-words leading-relaxed">
            {outputDetails?.output || 'No output'}
          </pre>
        </> : 
        <div className="p-3 text-gray-500 italic flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-2xl mb-2">⚡</div>
            Run your code to see the output here...
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default OutputWindow;