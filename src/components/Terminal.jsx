import React, { useState, useRef, useEffect } from 'react';
import { 
  XMarkIcon, 
  ChevronUpIcon, 
  ChevronDownIcon,
  PlayIcon,
  StopIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const Terminal = ({ isOpen, onToggle, output, isRunning, onRun, onStop, onClear }) => {
  const [activeTab, setActiveTab] = useState('output');
  const [input, setInput] = useState('');
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const tabs = [
    { id: 'output', label: 'Output', count: output ? 1 : 0 },
    { id: 'terminal', label: 'Terminal', count: 0 },
    { id: 'debug', label: 'Debug Console', count: 0 },
  ];

  const formatOutput = (outputData) => {
    if (!outputData) return '';
    
    if (typeof outputData === 'string') {
      return outputData;
    }
    
    if (outputData.output) {
      return outputData.output;
    }
    
    if (outputData.error) {
      return `Error: ${outputData.error}`;
    }
    
    return JSON.stringify(outputData, null, 2);
  };

  const getStatusColor = () => {
    if (isRunning) return 'text-yellow-400';
    if (output?.error) return 'text-red-400';
    if (output?.output) return 'text-green-400';
    return 'text-gray-400';
  };

  const getStatusText = () => {
    if (isRunning) return 'Running...';
    if (output?.error) return 'Error';
    if (output?.output) return 'Success';
    return 'Ready';
  };

  if (!isOpen) {
    return (
      <div className="h-8 bg-[#1a1a1a] border-t border-[#2d2d2d] flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
            <div className="w-2 h-2 rounded-full bg-current"></div>
            <span className="text-sm font-medium">{getStatusText()}</span>
          </div>
          {output?.cpuTime && (
            <span className="text-xs text-gray-500">
              CPU: {output.cpuTime}s
            </span>
          )}
          {output?.memory && (
            <span className="text-xs text-gray-500">
              Memory: {output.memory} KB
            </span>
          )}
        </div>
        <button
          onClick={onToggle}
          className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronUpIcon className="w-4 h-4" />
          <span className="text-sm">Terminal</span>
        </button>
      </div>
    );
  }

  return (
    <div className="h-80 bg-[#1a1a1a] border-t border-[#2d2d2d] flex flex-col">
      {/* Terminal Header */}
      <div className="h-10 bg-[#2d2d2d] border-b border-[#3e3e3e] flex items-center justify-between px-4">
        <div className="flex items-center space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#1a1a1a] text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#3e3e3e]'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-[#ff6b35] text-white rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
            <div className="w-2 h-2 rounded-full bg-current"></div>
            <span className="text-sm font-medium">{getStatusText()}</span>
          </div>
          
          {output?.cpuTime && (
            <span className="text-xs text-gray-500">
              CPU: {output.cpuTime}s
            </span>
          )}
          {output?.memory && (
            <span className="text-xs text-gray-500">
              Memory: {output.memory} KB
            </span>
          )}
          
          <div className="flex items-center space-x-1 ml-4">
            {isRunning ? (
              <button
                onClick={onStop}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-[#3e3e3e] rounded transition-colors"
                title="Stop"
              >
                <StopIcon className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onRun}
                className="p-1.5 text-green-400 hover:text-green-300 hover:bg-[#3e3e3e] rounded transition-colors"
                title="Run"
              >
                <PlayIcon className="w-4 h-4" />
              </button>
            )}
            
            <button
              onClick={onClear}
              className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#3e3e3e] rounded transition-colors"
              title="Clear"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
            
            <button
              onClick={onToggle}
              className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#3e3e3e] rounded transition-colors"
              title="Minimize"
            >
              <ChevronDownIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'output' && (
          <div className="flex-1 flex flex-col">
            <div 
              ref={outputRef}
              className="flex-1 p-4 font-mono text-sm text-gray-200 overflow-y-auto bg-[#1a1a1a] whitespace-pre-wrap"
            >
              {output ? (
                <div>
                  {output.error && (
                    <div className="text-red-400 mb-2">
                      <span className="text-red-500 font-bold">ERROR:</span> {output.error}
                    </div>
                  )}
                  {formatOutput(output) || (
                    <div className="text-gray-500 italic">
                      No output to display. Run your code to see results here.
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-500 italic flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-4xl mb-4">⚡</div>
                    <div>Run your code to see output here</div>
                    <div className="text-sm mt-2">Press Ctrl+` to toggle terminal</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-4 font-mono text-sm text-gray-200 overflow-y-auto bg-[#1a1a1a]">
              <div className="text-gray-500 italic">
                Interactive terminal coming soon...
              </div>
            </div>
            <div className="border-t border-[#2d2d2d] p-2">
              <div className="flex items-center space-x-2">
                <span className="text-green-400 font-mono text-sm">$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-gray-200 font-mono text-sm focus:outline-none"
                  placeholder="Enter command..."
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'debug' && (
          <div className="flex-1 p-4 font-mono text-sm text-gray-200 overflow-y-auto bg-[#1a1a1a]">
            <div className="text-gray-500 italic">
              Debug console coming soon...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;