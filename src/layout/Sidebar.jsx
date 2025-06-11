import { HomeIcon, MagnifyingGlassIcon, Squares2X2Icon, Cog6ToothIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const icons = [
  { id: 'explorer', icon: Squares2X2Icon, tooltip: 'Explorer' },
  { id: 'search', icon: MagnifyingGlassIcon, tooltip: 'Search' },
  { id: 'git', icon: ArrowLeftStartOnRectangleIcon, tooltip: 'Source Control' },
  { id: 'settings', icon: Cog6ToothIcon, tooltip: 'Settings' }
];

export default function Sidebar () {
  return (
    <aside className="h-full w-12 bg-[#1e1e1e] flex flex-col items-center py-2 space-y-3 border-r border-[#2a2a2a]">
      {icons.map(({ id, icon: Icon }) => (
        <button
          key={id}
          className={clsx(
            'group relative flex items-center justify-center h-10 w-10 text-gray-400 hover:text-white',
            'hover:bg-[#252526] rounded'
          )}
        >
          <Icon className="h-5 w-5" />
          <span className="absolute left-12 whitespace-nowrap bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </span>
        </button>
      ))}
    </aside>
  );
}
