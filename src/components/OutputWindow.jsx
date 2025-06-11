import React from "react";

const OutputWindow = ({ outputDetails }) => {

  return (
    <div className='h-full'>
      <div className="h-64 bg-slate-900/50 rounded-lg border border-slate-700/50 text-slate-200 font-mono text-sm overflow-y-auto backdrop-blur-sm">
        {outputDetails ? 
        <>
          <pre className="p-4 whitespace-pre-wrap break-words">
            {outputDetails?.output || 'No output'}
          </pre>
        </> : 
        <div className="p-4 text-slate-500 italic">
          Run your code to see the output here...
        </div>
        }
      </div>
    </div>
  );
};

export default OutputWindow;