import React from 'react';
import { 
  Squares2X2Icon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ isCollapsed, onToggleCollapse, activePanel, onPanelChange }) => {
  const panels = [
    { id: 'explorer', icon: Squares2X2Icon, label: 'Explorer', shortcut: 'Ctrl+Shift+E' },
    { id: 'search', icon: MagnifyingGlassIcon, label: 'Search', shortcut: 'Ctrl+Shift+F' },
    { id: 'source-control', icon: ArrowPathIcon, label: 'Source Control', shortcut: 'Ctrl+Shift+G' },
    { id: 'settings', icon: Cog6ToothIcon, label: 'Settings', shortcut: 'Ctrl+,' },
  ];

  return (
    <div className="flex">
      {/* Icon bar */}
      <div className="w-12 bg-[#1a1a1a] border-r border-[#2d2d2d] flex flex-col">
        <div className="flex-1 py-2">
          {panels.map((panel) => (
            <button
              key={panel.id}
              onClick={() => onPanelChange(panel.id)}
              className={`w-full h-12 flex items-center justify-center relative group transition-all duration-200 ${
                activePanel === panel.id 
                  ? 'text-white bg-[#2d2d2d] border-l-2 border-l-[#ff6b35]' 
                  : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
              }`}
              title={`${panel.label} (${panel.shortcut})`}
            >
              <panel.icon className="w-5 h-5" />
              
              {/* Tooltip */}
              <div className="absolute left-12 bg-[#2d2d2d] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-[#3e3e3e] shadow-lg">
                <div className="font-medium">{panel.label}</div>
                <div className="text-gray-400 text-xs">{panel.shortcut}</div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="h-10 flex items-center justify-center text-gray-400 hover:text-white border-t border-[#2d2d2d] transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;