import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const EditorTabs = ({ tabs, activeTab, onTabSelect, onTabClose }) => {
  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.jsx') || fileName.endsWith('.js')) {
      return <div className="w-3 h-3 bg-yellow-500 rounded-sm flex items-center justify-center text-xs font-bold text-black">JS</div>;
    }
    if (fileName.endsWith('.css')) {
      return <div className="w-3 h-3 bg-blue-500 rounded-sm flex items-center justify-center text-xs font-bold text-white">CSS</div>;
    }
    if (fileName.endsWith('.html')) {
      return <div className="w-3 h-3 bg-orange-500 rounded-sm flex items-center justify-center text-xs font-bold text-white">HTML</div>;
    }
    if (fileName.endsWith('.json')) {
      return <div className="w-3 h-3 bg-green-500 rounded-sm flex items-center justify-center text-xs font-bold text-white">JSON</div>;
    }
    if (fileName.endsWith('.md')) {
      return <div className="w-3 h-3 bg-gray-500 rounded-sm flex items-center justify-center text-xs font-bold text-white">MD</div>;
    }
    return <div className="w-3 h-3 bg-gray-500 rounded-sm"></div>;
  };

  return (
    <div className="flex bg-[#1a1a1a] border-b border-[#2d2d2d] overflow-x-auto">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex items-center space-x-2 px-4 py-2 border-r border-[#2d2d2d] cursor-pointer group min-w-0 ${
            activeTab === tab.id 
              ? 'bg-[#2d2d2d] text-white border-t-2 border-t-[#ff6b35]' 
              : 'text-gray-400 hover:text-gray-200 hover:bg-[#252525]'
          }`}
          onClick={() => onTabSelect(tab.id)}
        >
          {getFileIcon(tab.name)}
          <span className="text-sm truncate max-w-32">{tab.name}</span>
          {tab.modified && <div className="w-2 h-2 bg-white rounded-full"></div>}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.id);
            }}
            className="opacity-0 group-hover:opacity-100 hover:bg-[#3e3e3e] rounded p-0.5 transition-opacity"
          >
            <XMarkIcon className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default EditorTabs;