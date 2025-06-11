import { useState } from 'react';
import { ShareIcon } from '@heroicons/react/24/solid';

export default function Header () {
  const [search, setSearch] = useState('');

  return (
    <header className="h-10 flex items-center px-4 bg-[#2a2a2a] border-b border-[#333] text-sm select-none">
      <div className="font-semibold mr-4">Granite</div>
      <input
        type="search"
        placeholder="Search command or file"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="flex-1 bg-[#1e1e1e] text-gray-200 placeholder-gray-500 rounded px-3 py-1 focus:outline-none"
      />
      <button className="ml-4 bg-[#2196f3] hover:bg-[#1e88e5] text-white flex items-center px-3 py-1 rounded">
        <ShareIcon className="h-4 w-4 mr-1" /> Share
      </button>
    </header>
  );
}
