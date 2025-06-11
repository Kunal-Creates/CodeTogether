import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  ShareIcon, 
  PlayIcon
} from '@heroicons/react/24/outline';
import { UserGroupIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

const Header = ({ users, roomID, onShare, onRun, onLivePreview }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleShare = () => {
    const roomUrl = window.location.href;
    navigator.clipboard.writeText(roomUrl).then(() => {
      onShare?.();
    });
  };

  return (
    <div className="h-12 bg-[#1a1a1a] border-b border-[#2d2d2d] flex items-center px-4 relative z-10">
      {/* Logo and project name */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b35] to-[#f7931e] rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">G</span>
        </div>
        
        <div className="bg-[#2d2d2d] rounded-md px-3 py-1.5">
          <span className="text-sm font-medium text-gray-200">Granite</span>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex-1 max-w-md mx-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search files, commands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2d2d2d] text-gray-200 placeholder-gray-500 rounded-md pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#4a90e2] focus:border-[#4a90e2] border border-transparent"
          />
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center space-x-4">
        {/* Online users */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <UserGroupIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Online: {users.length}</span>
          </div>
          <div className="flex -space-x-1">
            {users.slice(0, 4).map((user, index) => (
              <div
                key={user.clientId}
                className="w-7 h-7 rounded-full border-2 border-[#1a1a1a] flex items-center justify-center text-xs font-medium text-white shadow-sm"
                style={{ backgroundColor: user.color }}
                title={user.name}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            ))}
            {users.length > 4 && (
              <div className="w-7 h-7 rounded-full border-2 border-[#1a1a1a] bg-gray-600 flex items-center justify-center text-xs font-medium text-white shadow-sm">
                +{users.length - 4}
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onRun}
            className="flex items-center space-x-2 px-3 py-1.5 bg-[#4a90e2] hover:bg-[#357abd] text-white rounded-md text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <PlayIcon className="w-4 h-4" />
            <span>Run</span>
          </button>
          
          <button
            onClick={onLivePreview}
            className="flex items-center space-x-2 px-3 py-1.5 bg-[#2d2d2d] hover:bg-[#3e3e3e] text-gray-200 rounded-md text-sm font-medium transition-all duration-200 border border-[#3e3e3e] hover:border-[#4a4a4a]"
          >
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            <span>Preview</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-3 py-1.5 bg-[#ff6b35] hover:bg-[#e55a2b] text-white rounded-md text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ShareIcon className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;