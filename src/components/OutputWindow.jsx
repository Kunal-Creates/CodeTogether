import React from "react";

const OutputWindow = ({ outputDetails }) => {

  return (
    <div className='h-full'>
      <div className="h-64 bg-slate-900/50 rounded-lg border border-slate-700/50 text-slate-200 font-mono text-sm overflow-y-auto backdrop-blur-sm">
        {outputDetails ? 
        <>
          <pre className="p-4 whitespace-pre-wrap break-words leading-relaxed">
            {outputDetails?.output || 'No output'}
          </pre>
        </> : 
        <div className="p-4 text-slate-500 italic flex items-center justify-center h-full">
          <div className="text-center">
            <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Run your code to see the output here...
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default OutputWindow;